"use client";
import { AllUsersList } from "@/app/types/users";
import Button from "@/components/ui/button";
import { Select } from "@/components/ui/form/Select";
import { Label, SelectedValue } from "@/components/ui/shared/types/formTypes";
import { useState } from "react";

type OnSaveFunction = (
  influencerId: number | string,
  selectedManagerId: number | string
) => Promise<boolean>;

export function ManagerSelect({
  allManagers,
  selectName,
  label,
  defaultValue,
  influencerId,
  error,
  onSave,
}: {
  allManagers: AllUsersList;
  selectName?: string;
  label?: Label;
  influencerId?: number;
  defaultValue?: SelectedValue;
  error?: string;
  onSave?: OnSaveFunction;
}) {
  const [selectedManager, setSelectedManager] = useState(defaultValue);
  const [savedManager, setSavedManager] = useState(defaultValue);
  const [showSaveButton, setShowSaveButton] = useState(
    defaultValue !== savedManager
  );

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
          ...allManagers.map((manager) => ({
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
