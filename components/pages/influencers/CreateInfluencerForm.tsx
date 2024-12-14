"use client";
import Input from "@/components/ui/form/Input";
import Textarea from "@/components/ui/form/Textarea";
import React, { useActionState, useEffect, useState } from "react";
import { ManagerSelect } from "./managerSelect";
import { getAllUsers, getCurrentUser } from "@/app/services/frontend/userService";
import { create } from "@/app/actions/influencers/actions";
import { CreationResponse } from "@/app/types/influencers";
import { AllUsersList } from "@/app/types/users";

const initialState: CreationResponse = {};

export default function CreateInfluencerForm() {
  const [state, formAction, pending] = useActionState(create, initialState);

  const [allManagers, setManagers] = useState([] as AllUsersList);
 

  const [preSelectedManager, setPreSelectedManager] = useState<string>();

  useEffect(() => {
    (async () => {
      const allUsers = await getAllUsers();
      setManagers(allUsers);

      const currentUser = await getCurrentUser();
      setPreSelectedManager(currentUser.id.toString());
    })();
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
        <Input
          name="firstName"
          value={state?.values?.firstName}
          label={{ labelText: "First name" }}
          required
          error={state?.errors?.firstName?.join("<br>")}
        />

        <Input
          name="lastName"
          value={state?.values?.lastName}
          label={{ labelText: "Last name" }}
          required
          error={state?.errors?.lastName?.join("<br>")}
        />

        <Textarea
          name="instagram"
          value={state?.values?.instagram}
          label={{ labelText: "Instagram accounts" }}
          required
          helperNote="Each username on a new line."
          error={state?.errors?.instagram?.join("--")}
        />

        <Textarea
          name="tiktok"
          value={state?.values?.tiktok}
          label={{ labelText: "Tiktok accounts" }}
          required
          helperNote="Each username on a new line."
          error={state?.errors?.tiktok?.join("<br>")}
        />

        <ManagerSelect
          allManagers={allManagers}
          selectName="managerId"
          label={{ labelText: "Manager", isVisible: true }}
          defaultValue={state?.values?.managerId || preSelectedManager}
          error={state?.errors?.managerId?.join("<br>")}
        />

        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
          aria-disabled={pending}
        >
          Save
        </button>
      </form>
    </>
  );
}
