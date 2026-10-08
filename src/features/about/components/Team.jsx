import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Team() {
  return (
    <section className="max-container bg-light-green padding-container w-full rounded-t-3xl py-10">
      <div className="max-container padding-container">
        <div className="mx-auto">
          <div className="mb-20 flex w-full flex-col text-center">
            <h2 className="font-staatliches text-dark-green text-4xl font-black">
              OUR TEAM
            </h2>
            <p className="font-satoshi mx-auto mt-4 max-w-lg text-xl font-medium text-white sm:text-base md:text-xl">
              Here are the passionate individuals committed to taking meaningful
              actions that contribute to a greener, more environmentally
              conscious world.
            </p>
          </div>
          <div className="-m-4 mx-auto flex flex-wrap">
            <TeamMember />
            <TeamMember />
            <TeamMember />
          </div>
        </div>
      </div>
    </section>
  );
}

export function TeamMember() {
  return (
    <div className="mx-auto p-4 md:w-1/2 lg:w-1/4">
      <div className="flex h-full flex-col items-center text-center">
        <img
          alt="team"
          className="mb-4 h-56 w-full flex-shrink-0 rounded-lg object-cover object-center"
          src="https://placehold.co/300"
        />
        <div className="w-full">
          <h2 className="font-satoshi text-lg font-black text-white">
            Alper Kamu
          </h2>
          <h3 className="font-satoshi mb-3 font-extralight text-gray-200">
            UI Developer
          </h3>
          <p className="font-satoshi mb-4 text-base text-black">
            DIY tote bag drinking vinegar cronut adaptogen squid fanny pack
            vaporware.
          </p>
          <span className="flex items-center justify-center gap-2">
            <FaLinkedin className="size-[1.35rem] text-white" />
            <MdEmail className="size-7 text-white" />
          </span>
        </div>
      </div>
    </div>
  );
}
