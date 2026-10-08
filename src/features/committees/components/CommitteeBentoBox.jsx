import MySwiper from "./MySwiper";

export default function CommitteeBentoBox({ committee }) {
  return (
    <div className="max-container padding-container grid w-full gap-4 pb-10 pt-5 lg:grid-cols-3 lg:grid-rows-2">
      {/* Grid Item 1 */}
      <About committee={committee} />
      {/* Grid Item 2 */}
      <Goals committee={committee} />
      {/* Grid Item 3 */}
      <SwiperGridItem />
      {/* Grid Item 4 */}
      <InterestForm />
    </div>
  );
}

function About({ committee }) {
  return (
    <div className="relative lg:row-span-2">
      <div className="bg-light-green absolute inset-px rounded-lg lg:rounded-l-[2rem]"></div>
      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
        <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
          <p className="font-staatliches mt-2 text-3xl tracking-tight text-white max-lg:text-center">
            About our committee
          </p>
          <p className="font-satoshi mt-2 max-w-lg text-sm/6 text-white max-lg:text-center">
            {committee.description}
          </p>
          <p className="font-staatliches mt-2 text-3xl tracking-tight text-white max-lg:text-center">
            Our Goals
          </p>
          <div className="font-satoshi mb-4 mt-5 flex max-w-lg flex-col border-2 text-sm/6 text-white max-lg:text-center">
            {committee.goals.map((goal, index) => (
              <p key={index}> - {goal}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
    </div>
  );
}

function Goals({ committee }) {
  return (
    <div className="relative max-lg:row-start-1">
      <div className="bg-light-green absolute inset-px overflow-hidden rounded-lg max-lg:rounded-t-[2rem]"></div>

      <div className="@container relative h-auto w-full grow overflow-hidden max-lg:mx-auto max-lg:max-w-sm">
        <div className="z-10 w-full shadow-2xl">
          <img
            className="size-full max-h-[250px] object-cover"
            src="https://placehold.co/300"
            alt=""
          />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
    </div>
  );
}

function SwiperGridItem() {
  return (
    <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
      <div className="absolute inset-px rounded-lg bg-white"></div>
      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
        {/* ✅ Swiper replaces the entire grid item */}
        <div className="flex w-full flex-1 items-center">
          <MySwiper />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5"></div>
    </div>
  );
}

function InterestForm() {
  return (
    <div className="relative lg:row-span-2">
      <div className="bg-light-green absolute inset-px rounded-lg max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
        <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
          <h1 className="text-md bg-light-green font-staatliches w-full justify-self-start rounded-md border-2 px-5 py-3 text-center text-white">
            Sign Up Now
          </h1>
          <p className="py-5 text-left text-sm text-gray-600 max-lg:text-center">
            Become part of a passionate group of students making a difference on
            campus.
          </p>

          <h2 className="text-md font-staatliches w-full py-2 text-left text-gray-950">
            Fill out the Interest Form
          </h2>
          <button className="bg-mint text-dark-green mx-auto w-4/5 rounded-md py-3">
            Link to form
          </button>

          <h2 className="text-md font-staatliches w-full py-2 text-left text-gray-950">
            Benefits:
          </h2>
          <ul className="font-satoshi space-y-1 text-sm text-gray-600 max-lg:text-center">
            <li>✅ Collaborate with fellow students</li>
            <li>✅ Contribute to conservation projects</li>
            <li>✅ Learn leadership and management skills</li>
          </ul>

          <h2 className="text-md font-staatliches w-full py-2 text-left text-gray-950">
            Questions?
          </h2>
          <ul className="font-satoshi space-y-1 text-sm text-gray-600 max-lg:text-center">
            <li>
              ✉️ <span className="underline">gci@fiu.edu</span>
            </li>
            <li>🌱 Visit us: GC 122 Wednesdays 2-4pm</li>
          </ul>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
    </div>
  );
}
