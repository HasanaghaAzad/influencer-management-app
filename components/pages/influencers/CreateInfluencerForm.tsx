"use client";
import Input from "@/components/ui/form/input";
import Textarea from "@/components/ui/form/textarea";
import React, { useActionState, useEffect, useState } from "react";
import { ManagerSelect } from "./managerSelect";
import { getCurrentUser } from "@/app/services/userService";
import { create, CreationResponse } from "@/app/actions/influencers/actions";


const initialState: CreationResponse = {};

export default function CreateInfluencerForm() {
  const [state, formAction, pending] = useActionState(create, initialState);

  const [preSelectedManager, setPreSelectedManager] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        const currentUser = await getCurrentUser();
        setPreSelectedManager(currentUser.id);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <h2 className="text-xl font-bold tracking-tight text-zinc-700 my-3">
        Create new Influencer
      </h2>

      {state.success && (
        <div className="mb-4 p-4 text-sm text-green-800 bg-green-100 border border-green-200 rounded-lg">
          Successfully created!
        </div>
      )}

      {state.error && (
        <div className="mb-4 p-4 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg">
          An error occurred: {state.error || "Please try again."}
        </div>
      )}

      <form className="space-y-4" action={formAction}>
        <Input name="firstName" label={{ labelText: "First name" }} required />

        <Input name="lastName" label={{ labelText: "Last name" }} required />

        <Textarea
          name="instagram"
          label={{ labelText: "Instagram accounts" }}
          required
          helperNote="Each username on a new line."
        />

        <Textarea
          name="tiktok"
          label={{ labelText: "Tiktok accounts" }}
          required
          helperNote="Each username on a new line."
        />

        <ManagerSelect
          selectName="managerId"
          label={{ labelText: "Manager", isVisible: true }}
          preSelectedManagerId={preSelectedManager}
        />

        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
          aria-disabled={pending}
        >
          Save
        </button>
        <p aria-live="polite" className="sr-only" role="status">
          {state?.errors?.firstName}
        </p>
      </form>
    </>
  );
}
