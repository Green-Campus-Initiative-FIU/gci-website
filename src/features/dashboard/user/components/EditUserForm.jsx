"use client";

import React from "react";
import { updatePersonalInfo } from "@/app/(protected)/dashboard/actions";
import { useUser } from "@/context/UserContext";
import { useFormStatus } from "react-dom";

export default function EditUserForm() {
  const user = useUser();
  return (
    <form
      action={updatePersonalInfo.bind(null, user?.uid)}
      className="flex flex-col px-4"
    >
      {/* TODO: User Name and Email Inline */}
      <div className="mt-3.5 flex w-full gap-2">
        <div className="flex w-5/12 flex-col">
          <label
            htmlFor="name"
            className="font-satoshi text-dark-green px-0.5 font-bold"
          >
            Name:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={user.user?.profile.name ?? ""}
            placeholder="Set a name"
            className="input mt-1.5"
            required
          />
        </div>
        <div className="flex w-7/12 flex-col">
          {/* TODO: Email (SHOULD WE UPDATE THIS? and from authentication or users collection) */}
          <label
            htmlFor="email"
            className="font-satoshi text-dark-green px-0.5 font-bold"
          >
            Email:
          </label>
          <input
            id="email"
            readOnly={true}
            name="email"
            type="text"
            defaultValue={user?.profile.email ?? ""}
            placeholder="Set an email"
            className="input mt-1.5 cursor-not-allowed border-gray-400 bg-gray-300 text-gray-500"
            required
          />
        </div>
      </div>
      {/* TODO: Bio */}
      <label
        htmlFor="bio"
        className="font-satoshi text-dark-green mt-5 px-0.5 font-bold"
      >
        Bio:
      </label>
      <textarea
        id="bio"
        name="bio"
        type="text"
        defaultValue={user?.profile.bio ?? ""}
        placeholder="You don't have a bio yet"
        className="input mt-1.5 max-h-44 min-h-40"
      />
      {/* TODO: Save Personal Info Button */}
      <SubmitButton />
    </form>
  );
}

export function SubmitButton() {
  const status = useFormStatus();
  return (
    <button
      type="submit"
      className="bg-light-green hover:bg-dark-green active:bg-celadon active:text-dark-green active:border-dark-green mt-5 self-end rounded border-2 border-transparent px-4 py-3 font-medium text-white transition-all active:border-2"
    >
      {status.pending ? "Saving..." : "Save Personal Info"}
    </button>
  );
}
