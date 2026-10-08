import { PiArrowCircleRight } from "react-icons/pi";
import Button from "@/components/ui/Button";
import storyData from "../constants/storyData";
import { FiArrowUpRight } from "react-icons/fi";

export default function Stories() {
  return (
    <section className="max-container padding-container border-2 border-red-500 py-10">
      <div className="flex flex-col gap-5 lg:flex-row">
        {/* Highlighted Story */}
        <StoryHighlightCard
          title={storyData.highlight.title}
          image={storyData.highlight.image}
          description={storyData.highlight.description}
        />

        {/* Story List */}
        <div className="flex w-full flex-col gap-2">
          {storyData.stories.map((story) => (
            <StoryCard key={story.id} title={story.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function StoryHighlightCard({ title, description, image }) {
  return (
    <div className="bg-light-green flex h-auto w-full flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 lg:flex-row">
      {/* Left Side */}
      <div className="h-full w-full lg:w-20 lg:min-w-[45%]">
        <img
          src={image}
          alt="highlight"
          className="h-full w-full rounded-md object-cover"
        />
      </div>
      {/* Right Side */}
      <div className="flex h-full grow flex-col items-center justify-between">
        {/* Overview of Post */}
        <div className="flex h-full w-full flex-col items-start justify-start gap-2 border-yellow-500">
          <h3 className="self-center pt-4 text-4xl font-bold text-white">
            {title}
          </h3>
          <p className="p-2 text-white">{description}</p>
        </div>
        {/* Link to Full Story */}
        <Button
          type="button"
          title="Read Full Story"
          icon={FiArrowUpRight}
          variant="tertiary-btn"
          textsize="text-lg"
        />
      </div>
    </div>
  );
}

export function StoryCard({ title }) {
  return (
    <div className="bg-dark-green flex h-20 w-full items-center justify-between rounded-xl border-2 px-4 py-2">
      <div className="flex items-end justify-center gap-2">
        <span className="font-satoshi pr-10 text-xl font-light lowercase text-white">
          {" "}
          Feb 2025
        </span>
        <h2 className="font-satoshi text-2xl text-white">{title}</h2>
      </div>
      <div>
        <PiArrowCircleRight className="size-10 text-white" />
      </div>
    </div>
  );
}
