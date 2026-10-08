import { committeeData } from "@/features/committees/constants/committeeData";
import CommitteeBentoBox from "@/features/committees/components/CommitteeBentoBox";
import Link from "next/link";

export default function Committee({ params }) {
  const committee = committeeData.find((c) => c.id === params.id);

  return (
    <div className="mt-[4.5rem] flex flex-col items-center justify-center border-2 border-red-500">
      <CommitteeHeader committee={committee} />
      <CommitteeBentoBox committee={committee} />
    </div>
  );
}

export function CommitteeHeader({ committee }) {
  return (
    <div className="max-container padding-container w-full py-10">
      <Link
        href="/committees"
        className="text-light-green inline-block hover:underline"
      >
        Back to all committees
      </Link>
      <h1 className="font-satoshi text-dark-green text-4xl font-black">
        {committee.name}
      </h1>
      <p className="mt-4 text-lg text-gray-700">{committee.description}</p>
    </div>
  );
}
