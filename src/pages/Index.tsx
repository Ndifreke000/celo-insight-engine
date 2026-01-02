import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import LiveDashboard from "@/components/LiveDashboard";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Comparison from "@/components/Comparison";
import Architecture from "@/components/Architecture";
import UseCases from "@/components/UseCases";
import WhyCelo from "@/components/WhyCelo";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Products />
      <LiveDashboard />
      <Problem />
      <Solution />
      <Comparison />
      <Architecture />
      <UseCases />
      <WhyCelo />
      <Roadmap />
      <Footer />
    </div>
  );
};

export default Index;
