import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
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
      <Problem />
      <Solution />
      <Architecture />
      <UseCases />
      <WhyCelo />
      <Roadmap />
      <Footer />
    </div>
  );
};

export default Index;
