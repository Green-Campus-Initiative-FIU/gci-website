import About from "@/features/about/components/About";
import Goals from "@/features/about/components/Goals";
import Team from "@/features/about/components/Team";
import FAQ from "@/features/about/components/FAQ";
import ContentLayout from "@/components/ui/ContentLayout";

export default function AboutPage() {
  return (
    <>
      <ContentLayout
        className="pb-8 pt-16"
        title="What is The GCI"
        description="The Green Campus Initiative (GCI) is a student group focused on making our campus a more sustainable institution. Currently, GCI is working towards reducing single-use plastics at the campus, county, and state levels."
        image="/outdoor.jpg"
      />
      <ContentLayout
        className="pb-16 pt-8"
        title="Our Message"
        description="GCI believes that a sustainable future is not only possible, but necessary. Because our research shows that unnecessary single-use plastics harm our health, environment, and economy, actions must be taken to reduce their use. We strive to make FIU a leader in an effort to eliminate unnecessary single-use plastics."
        image="/bamboo.jpeg"
        reverse={true}
      />
      {/* <About />
      <Goals /> */}
      <Team />
      <FAQ />
    </>
  );
}
