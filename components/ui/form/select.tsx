import React from "react";
import { Label, SelectedValue, SelectOption } from "../shared/types/formTypes";

export function Select({
  label = { labelText: "Select", isVisible: true },
  options,
  defaultValue,
  selectName,
  onChange,
}: {
  label?: Label;
  options: SelectOption[];
  defaultValue?: SelectedValue;
  selectName?: string;
  onChange?: (value: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event);
    }
  };
  return (
    <div>
      <label
        className={
          `block text-sm font-medium text-gray-700` +
          (label.isVisible === false ? " hidden" : "")
        }
      >
        {label.labelText}
      </label>
      <div className="relative z-20">
        <select
          className="mt-1 relative z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
          value={defaultValue || 0}
          onChange={handleChange}
          name={selectName}
        >
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.title}
            </option>
          ))}
        </select>
        <span className="absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-body-color"></span>
      </div>
    </div>
  );
}
