import Hero from "./components/Hero";
import ProblemStrip from "./components/ProblemStrip";
import ServicesGrid from "./components/ServicesGrid";
import HowItWorks from "./components/HowItWorks";
import TransformationStories from "./components/TransformationStories";
import FAQ from "./components/FAQ";
import OriginStory from "./components/OriginStory";
import Pricing from "./components/Pricing";
import SocialProof from "./components/SocialProof";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <ProblemStrip />
        <ServicesGrid />
        <HowItWorks />
        <TransformationStories />
        <FAQ />
        <OriginStory />
        <Pricing />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
