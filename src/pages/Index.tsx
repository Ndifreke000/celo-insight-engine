import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import LiveDashboard from "@/components/LiveDashboard";
import AIPlayground from "@/components/AIPlayground";
import DeveloperAPI from "@/components/DeveloperAPI";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Comparison from "@/components/Comparison";
import InteractiveArchitecture from "@/components/InteractiveArchitecture";
import UseCases from "@/components/UseCases";
import WhyCelo from "@/components/WhyCelo";
import Roadmap from "@/components/Roadmap";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Navbar />
      <Hero />
      <Products />
      <LiveDashboard />
      <AIPlayground />
      <DeveloperAPI />
      <Problem />
      <Solution />
      <Comparison />
      <InteractiveArchitecture />
      <UseCases />
      <WhyCelo />
      <Roadmap />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
