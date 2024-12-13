"use client";
import { getAllUsers } from "@/app/services/userService";
import Button from "@/components/ui/button";
import { Select, SelectedValue } from "@/components/ui/form/select";
import { Label } from "@/components/ui/shared/types/formTypes";
import { useEffect, useState } from "react";

type AllUsersList = {
  id: number;
  first_name: string;
  last_name: string;
}[];
type OnSaveFunction = (
  influencerId: number | string,
  selectedManagerId: number | string
) => Promise<boolean>;

export function ManagerSelect({
  selectName,
  label,
  defaultValue,
  influencerId,
  error,
  onSave,
}: {
  selectName?: string;
  label?: Label;
  influencerId?: number;
  defaultValue?: SelectedValue;
  error?: string;
  onSave?: OnSaveFunction;
}) {
  const [allManagersList, setManagers] = useState([] as AllUsersList);
  const [selectedManager, setSelectedManager] = useState(defaultValue);
  const [savedManager, setSavedManager] = useState(defaultValue);
  const [showSaveButton, setShowSaveButton] = useState(
    defaultValue !== savedManager
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const allUsers = await getAllUsers();
        setManagers(allUsers);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const handleSave = async () => {
    if (onSave && influencerId) {
      const savedNewManager = await onSave(influencerId, selectedManager || 0);

      if (savedNewManager) {
        setSavedManager(selectedManager);
        setShowSaveButton(false);
      }
    }
  };
  return (
    <>
      <Select
        selectName={selectName}
        label={label || { labelText: "Select Manager", isVisible: false }}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          const { value } = event.target;
          setSelectedManager(value);
          setShowSaveButton(
            Boolean(onSave) && value.toString() !== savedManager?.toString()
          );
        }}
        defaultValue={selectedManager}
        options={[
          { title: "Unassigned", value: 0 },
          ...allManagersList.map((manager) => ({
            title: manager.first_name + " " + manager.last_name,
            value: manager.id,
          })),
        ]}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {showSaveButton && <Button text="Save" onClick={handleSave} />}
    </>
  );
}
