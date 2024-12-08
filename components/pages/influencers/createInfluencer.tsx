import Input from "@/components/ui/form/input";
import Textarea from "@/components/ui/form/textarea";
import React from "react";

const FormComponent = () => {
  return (
    <>
      <h2 className="text-xl font-bold tracking-tight text-zinc-700 my-3">Create new Influencer</h2>

      <form className="space-y-4 ">
        <Input name="firstName" label={{labelText: "First name"}} required />

        <Input name="lastName" label={{labelText: "Last name"}} required />

        <Textarea name="instagram" label={{labelText: "Instagram accounts"}} required />

        <Textarea name="tiktok" label={{labelText: "Tiktok accounts"}} required />

        <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500">
          Save
        </button>
      </form>
    </>
  );
};

export default FormComponent;
