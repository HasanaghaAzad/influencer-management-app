import React from "react";
import {Label} from "../shared/types/formTypes";

const Input = ({name, type = "text", label = {labelText: "Name", isVisible: true}, required = true}: {name: string; type?: string; label: Label; required: boolean}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label.labelText}
      </label>
      <input type={type} id={name} name={name} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required={required} />
    </div>
  );
};

export default Input;
