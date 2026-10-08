export default function About() {
  return (
    <section className="max-container padding-container py-16">
      <div className="boop flex w-full flex-col flex-wrap gap-5 py-5 md:flex-row md:gap-0 md:py-0">
        {/* Text Container */}
        <div className="boop flex w-full basis-1/2 flex-col space-y-5 md:px-5 lg:items-start">
          <h2 className="font-staatliches text-dark-green text-4xl font-black sm:text-2xl md:text-4xl">
            What is The GCI
          </h2>
          <p className="font-satoshi boop max-w-lg text-xl font-medium text-black sm:text-base md:text-xl">
            The Green Campus Initiative (GCI) is a student group focused on
            making our campus a more sustainable institution. Currently, GCI is
            working towards reducing single-use plastics at the campus, county,
            and state levels.
          </p>
        </div>
        {/* Image Container */}
        <div className="boop flex w-full basis-1/2 items-center justify-end md:px-5">
          <img
            src="/outdoor.jpg"
            // src="https://placehold.co/300"
            alt="image"
            className="max-h-[550px] min-h-[350px] w-full rounded-lg object-cover md:max-w-full"
          />
        </div>
      </div>
    </section>
  );
}
