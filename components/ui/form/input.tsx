import React from "react";
import { Label } from "../shared/types/formTypes";

export default function Input({
  name,
  defaultValue,
  type = "text",
  label = { labelText: "Name", isVisible: true },
  required = true,
  error,
}: {
  name: string;
  defaultValue?: string;
  type?: string;
  label: Label;
  required: boolean;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label.labelText}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue || ""}
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required={required}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
