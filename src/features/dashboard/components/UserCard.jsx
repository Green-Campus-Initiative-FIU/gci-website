"use client";

import { useUser } from "@/context/UserContext";
import { formatTextDate } from "@/utils/date";
import UserProfilePicture from "./UserProfilePicture";

export default function UserCard() {
  const user = useUser();

  const avatarUrl = user?.profile?.avatarUrl ?? "/placeholder.jpg";
  const uid = user?.uid;
  const name = user?.profile?.name ?? "Guest";
  const email = user?.profile?.email ?? "Email Not Set";
  const createdAt = user?.profile?.createdAt ?? null;
  const role = user?.profile?.role ?? "No Role Set";

  return (
    <section className="border-dark-green bg-light-green flex-col rounded-lg border-2 p-5 text-white">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <UserProfilePicture avatarUrl={avatarUrl} uid={uid} />

          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-sm text-gray-300">{email}</p>
            <div className="mt-1 inline-flex items-center gap-1 rounded-sm border border-dashed border-stone-400 px-2 py-0.5 text-xs text-gray-200">
              <span>📅 Joined {formatTextDate(createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="font-satoshi bg-dark-green flex items-center justify-center rounded-sm border border-dashed border-stone-400 px-3 py-0.5 text-sm font-medium capitalize">
          {role}
        </div>
      </div>
    </section>
  );
}
