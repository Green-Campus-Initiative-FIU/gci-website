import Link from "next/link";

export default function CommiteeCard({ committee }) {
  return (
    <div className="w-full p-2 md:w-1/2 lg:w-1/3">
      <Link
        href={`/committees/${committee.id}`}
        className="hover:cursor-pointer"
      >
        <div className="bg-light-green flex h-full items-center space-x-3 rounded-lg border border-gray-800 p-4">
          <img
            alt={committee.name}
            className="size-20 flex-shrink-0 rounded-full border-2 bg-gray-100 object-cover object-center"
            src={committee.image || "https://dummyimage.com/80x80"}
          />
          <div className="mt-1 flex min-h-24 flex-col">
            <h2 className="font-satoshi text-sm font-black text-white hover:underline">
              {committee.name}
            </h2>
            <p className="line-clamp-2 text-sm text-gray-200">
              {committee.description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
