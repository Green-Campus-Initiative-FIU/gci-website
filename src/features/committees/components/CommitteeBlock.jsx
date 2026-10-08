import React from "react";

export default function CommitteeBlock() {
  return (
    <div className="flex w-9/12 items-stretch">
      {/* Committee */}
      <div className="bg-dark-green flex min-h-full w-full flex-col items-center justify-center rounded-lg p-5">
        <div className="bg-light-green self-start rounded-md border-2 px-5 py-3">
          <h1 className="text-md font-staatliches text-white">
            About Our Committee
          </h1>
        </div>

        <div className="flex w-full border-2 border-red-500 p-5">
          <img src="https://placehold.co/40" className="size-72" />
          <div className="border-2 border-blue-500 px-10 py-5">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              vulputate auctor egestas. Donec ut ligula eros. Quisque quis
              porttitor justo. Ut sit amet sollicitudin nisi. Suspendisse vitae
              leo viverra, pharetra erat sit amet, vulputate ante. Aliquam
              tristique ex in efficitur sagittis. Morbi vel dolor lacus. Morbi
              mattis mauris in mauris bibendum pulvinar. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>

        <div className="bg-light-green self-start rounded-md border-2 px-5 py-3">
          <h1 className="text-md font-staatliches text-white">Our Goals</h1>
        </div>
        <div className="border-2 border-blue-500 px-10 py-5">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            vulputate auctor egestas. Donec ut ligula eros. Quisque quis
            porttitor justo. Ut sit amet sollicitudin nisi. Suspendisse vitae
            leo viverra, pharetra erat sit amet, vulputate ante. Aliquam
            tristique ex in efficitur sagittis. Morbi vel dolor lacus. Morbi
            mattis mauris in mauris bibendum pulvinar. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
    </div>
  );
}
