export default function Goals() {
  return (
    <section className="max-container padding-container mb-16 mt-5 md:my-16">
      <div className="flex w-full flex-col-reverse flex-wrap gap-5 py-5 md:flex-row md:gap-0 md:py-0">
        {/* Image Container */}
        <div className="boop flex w-full basis-1/2 items-center justify-center rounded-lg md:px-5">
          <img
            src="/bamboo.jpeg"
            // src="https://placehold.co/300"
            alt="image"
            className="max-h-[350px] w-full rounded-lg object-cover md:max-w-full"
          />
        </div>
        {/* Text Container */}
        <div className="flex w-full basis-1/2 flex-col space-y-5 md:px-5 lg:items-start">
          <h2 className="font-staatliches text-dark-green text-4xl font-black sm:text-2xl md:text-4xl">
            Our Message
          </h2>
          <p className="font-satoshi max-w-lg text-xl font-medium text-black sm:text-base md:text-xl">
            GCI believes that a sustainable future is not only possible, but
            necessary. Because our research shows that unnecessary single-use
            plastics harm our health, environment, and economy, actions must be
            taken to reduce their use. We strive to make FIU a leader in an
            effort to eliminate unnecessary single-use plastics.
          </p>
        </div>
      </div>
    </section>
  );
}
