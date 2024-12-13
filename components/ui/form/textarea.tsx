import React from "react";
import { Label } from "../shared/types/formTypes";

const Textarea = ({
  name,
  value,
  label = { labelText: "Name", isVisible: true },
  required = true,
  helperNote,
  error,
}: {
  name: string;
  value?: string;
  label: Label;
  required: boolean;
  helperNote?: string;
  error?: string;
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label.labelText}
      </label>
      <textarea
        id={name}
        name={name}
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required={required}
        defaultValue={value || ""}
      ></textarea>
      <div className="flex">
        <p className="mt-1 text-sm text-gray-500 flex-1">{helperNote}</p>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default Textarea;
