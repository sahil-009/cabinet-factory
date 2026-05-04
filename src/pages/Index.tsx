import { Hero } from "@/components/Hero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { AboutPreview } from "@/components/AboutPreview";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Testimonials } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";

const Index = () => (
  <>
    <Hero />
    <FeatureGrid />
    <BeforeAfterSection />
    <AboutPreview />
    <WhyChooseUs />
    <ProcessSteps />
    <Testimonials />
    <CTASection />
  </>
);

export default Index;
