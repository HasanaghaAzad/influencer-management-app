'use client';
import { Select, SelectedValue } from "@/components/ui/form/select";

export function ManagerSelect({selectedManagerId}: {selectedManagerId: SelectedValue}) {
  const allManagers = [
    {id: 1, name: "Nick Fury"},
    {id: 2, name: "Pepper Potts"},
    {id: 3, name: "Clint Barton"},
    {id: 4, name: "Betty Ross"},
    {id: 5, name: "Odin"},
    {id: 6, name: "Shuri"},
  ];
  return (
    <Select
      label={{labelText: "Select Manager"}}
      preSelectedValue={selectedManagerId}
      options={allManagers.map((manager) => ({
        title: manager.name,
        value: manager.id,
      }))}
    />
  );
}
