"use client";

import { useState } from "react";
import { updateAvatar } from "@/app/(protected)/dashboard/actions";

export default function UserProfilePicture({ avatarUrl, uid }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleUpload = async () => {
    if (file && uid) {
      await updateAvatar(file, uid);
      setIsModalOpen(false);
      setFile(null);
      setPreview(null);

      // optional: reload/revalidate for instant UI update
      window.location.reload();
    }
  };

  return (
    <>
      {/* Avatar wrapper with hover pencil */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="group relative cursor-pointer"
      >
        <img
          src={avatarUrl ?? "/default-pfp.png"}
          alt="profile"
          className="h-20 w-20 rounded-full border-2 border-stone-400 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition group-hover:opacity-100">
          ✏️
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="border-light-green bg-dark-green space-y-4 rounded-xl border-2 p-6">
            <h2 className="text-4xl font-bold text-white">
              Update Profile Picture
            </h2>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {preview && (
              <img
                src={preview}
                className="mx-auto h-32 w-32 rounded-full object-cover"
              />
            )}
            <div className="flex justify-end gap-2">
              <button
                className="rounded border px-3 py-1"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-light-green rounded px-3 py-1 text-white"
                onClick={handleUpload}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
