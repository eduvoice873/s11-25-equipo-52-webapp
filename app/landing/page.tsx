import HeaderLanding from "./components/Header";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Features from "./components/Features";
import ApiSection from "./components/ApiSection";
import UseCases from "./components/UseCases";
import Stats from "./components/Stats";
import Cta from "./components/Cta";
import Footer from "./components/Footer";
import WallOfLovePreview from "./components/WallOfLovePreview";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background font-sans text-gray-900">
      <HeaderLanding />
      <main>
        <Hero />
        <Problem />
        <Features />
        <WallOfLovePreview />
        <ApiSection />
        <UseCases />
        <Stats />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}