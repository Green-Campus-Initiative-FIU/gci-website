"use client";

import React from "react";
import { logoutClient } from "@/services/auth.client";

export default function AccountDangerZone() {
  return (
    <div>
      <form className="flex flex-col px-4">
        {/* TODO: Change Password */}
        <div className="mt-4 flex flex-col gap-2">
          <label
            htmlFor="oldPassword"
            className="font-satoshi text-dark-green px-0.5 font-bold"
          >
            Old Password:
          </label>
          <input
            id="oldPassword"
            name="oldPassword"
            type="text"
            className="input"
            required
          />
          <label
            htmlFor="newPassword"
            className="font-satoshi text-dark-green px-0.5 font-bold"
          >
            New Password:
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="text"
            className="input"
            required
          />
          <button className="bg-light-green hover:bg-dark-green active:bg-celadon active:text-dark-green active:border-dark-green mt-5 self-end rounded border-2 border-transparent px-4 py-3 font-medium text-white transition-all active:border-2">
            Update Password
          </button>
        </div>
      </form>
      {/* TODO: Delete Account */}
      <div className="mt-5 flex flex-col items-start gap-2 px-4">
        <p className="text-dark-green px-0.5 text-2xl font-bold">
          Account Actions
        </p>
        <div className="mt-3.5 flex w-full gap-2">
          <button
            className="h-20 w-1/2 rounded-lg border-2 border-red-700 bg-red-500 px-6 py-3 text-2xl font-medium text-white hover:bg-red-600"
            onClick={() => logoutClient()}
          >
            Logout
          </button>
          <button className="h-20 w-1/2 rounded-lg border-2 border-red-700 bg-red-500 px-6 py-3 text-2xl font-medium text-white hover:bg-red-600">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
