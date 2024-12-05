import NameInput from "@/components/form/nameInput";
import React from "react";
export default function Page() {
  return (
    <div className="wrapper">
      <h1 className="mb-5 text-4xl font-bold !leading-[1.208] text-dark dark:text-white sm:text-[42px] lg:text-[40px] xl:text-5xl">Create new influencer</h1>
      <form>
        <NameInput />
      </form>
    </div>
  );
}
