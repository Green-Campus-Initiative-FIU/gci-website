export default function MissionStatement() {
  return (
    <section className="max-container padding-container mb-16 mt-5 md:my-16">
      <div className="flex w-full flex-col flex-wrap gap-5 py-5 md:flex-row md:gap-0 md:py-0">
        {/* Text Container */}
        <div className="flex w-full basis-1/2 flex-col space-y-5 md:px-5 lg:items-start">
          <h2 className="font-satoshi text-dark-green text-3xl font-black sm:text-2xl md:text-4xl">
            Our Message
          </h2>
        </div>
        {/* Image Container */}
        <div className="flex w-full basis-1/2 items-center justify-center md:px-5">
          <p className="max-w-2xl text-lg/8 font-medium sm:text-base md:text-xl/8">
            As a member of GCI, you will join a community of passionate
            individuals committed to taking meaningful actions that contribute
            to a greener, more environmentally conscious world.
          </p>
        </div>
      </div>
    </section>
  );
}
