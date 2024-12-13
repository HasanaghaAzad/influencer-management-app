import React, { useEffect, useState } from "react";
import { Label } from "../shared/types/formTypes";

export type Options = {
  title: string;
  value: number;
}[];

export type SelectedValue = string | number;

export function Select({
  label = { labelText: "Select", isVisible: true },
  options,
  preSelectedValue,
  selectName,
  onChange,
}: {
  label?: Label;
  options: Options;
  preSelectedValue?: SelectedValue;
  selectName?: string;
  onChange?: (newval: string | number) => void;
}) {
  const [selectedValue, setSelectedValue] = useState(
    preSelectedValue?.toString()
  );

  useEffect(() => {
    if (preSelectedValue !== undefined) {
      setSelectedValue(preSelectedValue.toString());
    }
  }, [preSelectedValue]);

  const onchangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("onchangeHandler");
    setSelectedValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };
  console.log("selectedValue");
  console.log(preSelectedValue);
  console.log(selectedValue);
  console.log("selectedValue");
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

      <select
        className="mt-1 relative z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
        value={selectedValue}
        onChange={onchangeHandler}
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
  );
}
