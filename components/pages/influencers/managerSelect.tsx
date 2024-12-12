"use client";
import { getAllUsers } from "@/app/services/userService";
import { Select, SelectedValue } from "@/components/ui/form/select";
import { Label } from "@/components/ui/shared/types/formTypes";
import { useEffect, useState } from "react";

type AllUsersList = {
  id: number;
  first_name: string;
  last_name: string;
}[];
export function ManagerSelect({
  selectName,
  label,
  selectedManagerId,
}: {
  selectName?: string;
  label?: Label;
  selectedManagerId?: SelectedValue;
}) {
  const [allManagersList, setManagers] = useState([] as AllUsersList);

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
    <Select
      selectName={selectName}
      label={label || { labelText: "Select Manager", isVisible: false }}
      preSelectedValue={selectedManagerId}
      options={allManagersList.map((manager) => ({
        title: manager.first_name + " " + manager.last_name,
        value: manager.id,
      }))}
    />
  );
}
