import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhatWeBuild from "@/components/WhatWeBuild";
import CaseStudies from "@/components/CaseStudies";
import AIThesis from "@/components/AIThesis";
import HowWeEngage from "@/components/HowWeEngage";
import TechStack from "@/components/TechStack";
import Team from "@/components/Team";
import Research from "@/components/Research";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <div className="section-divider" />
        <WhatWeBuild />
        <CaseStudies />
        <div className="section-divider" />
        <AIThesis />
        <HowWeEngage />
        <div className="section-divider" />
        <TechStack />
        <Team />
        <div className="section-divider" />
        <Research />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
