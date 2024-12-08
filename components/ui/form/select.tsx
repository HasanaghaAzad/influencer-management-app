import React, {useState} from "react";
import {Label} from "../shared/types/formTypes";

export type Options = {
  title: string;
  value: number;
}[];

export type SelectedValue = number;

export function Select({label = {labelText: "Select", isVisible: true}, options, preSelectedValue}: {label?: Label; options: Options; preSelectedValue?: SelectedValue}) {
  const [selectedValue, setSelectedValue] = useState(preSelectedValue?.toString());

  const onchangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  return (
    <>
      <label className={`mb-[10px] block text-base font-medium text-dark dark:text-white` + (label.isVisible === false ? " hidden" : "")}>{label.labelText}</label>
      <div className="relative z-20">
        <select className="relative z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2" value={selectedValue} onChange={onchangeHandler}>
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.title}
            </option>
          ))}
        </select>
        <span className="absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-body-color"></span>
      </div>
    </>
  );
}
