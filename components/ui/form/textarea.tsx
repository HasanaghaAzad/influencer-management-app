import React from "react";
import { Label } from "../shared/types/formTypes";

const Textarea = ({
  name,
  label = { labelText: "Name", isVisible: true },
  required = true,
  helperNote,
}: {
  name: string;
  label: Label;
  required: boolean;
  helperNote?: string;
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
      ></textarea>
      <p className="mt-1 text-sm text-gray-500">{helperNote}</p>
    </div>
  );
};

export default Textarea;
