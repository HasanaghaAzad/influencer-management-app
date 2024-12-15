import { Label } from "../shared/types/formTypes";
import Image from "next/image";

export function FilterInput({
  label = { labelText: "Name", isVisible: true },
  name,
  value,
  defaultValue,
}: {
  label?: Label;
  name?: string;
  value?: string;
  defaultValue?: string;
}) {
  return (
    <>
      <label
        className={
          "mb-[3px] block text-base font-medium text-gray-700 dark:text-white" +
          (label.isVisible === false ? " hidden" : "")
        }
      >
        {label.labelText}
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="Tony"
          className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] pr-3 pl-12 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
          name={name}
          value={value}
          defaultValue={defaultValue}
        />
        <span className="absolute top-1/2 left-4 -translate-y-1/2">
          <Image width={20} height={20} src="/icons/user.svg" alt="User Icon" />
        </span>
      </div>
    </>
  );
}
