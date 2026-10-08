import CommiteeCard from "../../features/committees/components/CommitteeCard";
import { committeeData } from "../../features/committees/constants/committeeData.js"; // Import the data

export default function Committees() {
  return (
    <>
      <section className="max-container padding-container mt-16 pb-20">
        <CommitteesHeader />
        <div className="flex w-full flex-wrap">
          {committeeData.map((committee) => (
            <CommiteeCard key={committee.id} committee={committee} />
          ))}
        </div>
      </section>
    </>
  );
}

export function CommitteesHeader() {
  return (
    <div className="pb-10">
      <h2 className="font-staatliches text-dark-green text-center text-4xl font-black md:text-5xl">
        Our Committees
      </h2>
      <p className="font-satoshi mx-auto mt-2 max-w-lg text-balance text-center text-xl font-medium tracking-tight text-gray-950 sm:text-base md:text-xl">
        Explore some of the committees that make up the Green Campus Initiative
      </p>
    </div>
  );
}
