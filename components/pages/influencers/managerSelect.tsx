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
  preSelectedManagerId,
  influencerId,
  onSave,
}: {
  selectName?: string;
  label?: Label;
  influencerId?: number;
  preSelectedManagerId?: SelectedValue;
  onSave?: OnSaveFunction;
}) {
  const [allManagersList, setManagers] = useState([] as AllUsersList);
  const [selectedManagerId, setSelectedManagerId] =
    useState(preSelectedManagerId);
  const [showSaveButton, setShowSaveButton] = useState(
    preSelectedManagerId !== selectedManagerId
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

  return (
    <>
      <Select
        selectName={selectName}
        label={label || { labelText: "Select Manager", isVisible: false }}
        onChange={(m) => {
          setSelectedManagerId(m);
          setShowSaveButton(preSelectedManagerId === selectedManagerId);
         } }
        preSelectedValue={selectedManagerId}
        options={allManagersList.map((manager) => ({
          title: manager.first_name + " " + manager.last_name,
          value: manager.id,
        }))}
      />
      <div
        className={
          showSaveButton ? "block" : "hidden"
        }
      >
        <Button
          text="Save"
          onClick={() => {
            const savedNewManager = onSave && influencerId && selectedManagerId
              ? onSave(influencerId, selectedManagerId)
              : undefined;
            
            if(savedNewManager) setShowSaveButton(false);
          }}
        />
      </div>
    </>
  );
}
