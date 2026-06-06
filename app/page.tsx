import { HeroSection } from "@/components/home/HeroSection";
import { StatsBar } from "@/components/home/StatsBar";
import { KitsPreview } from "@/components/home/KitsPreview";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <KitsPreview />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </>
  );
}
