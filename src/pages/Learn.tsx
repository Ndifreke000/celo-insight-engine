import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Comparison from "@/components/Comparison";
import InteractiveArchitecture from "@/components/InteractiveArchitecture";
import WhyCelo from "@/components/WhyCelo";
import Roadmap from "@/components/Roadmap";
import DeveloperAPI from "@/components/DeveloperAPI";
import Footer from "@/components/Footer";
import { ArrowLeft, BookOpen, Layers, Map, Code2, Coins } from "lucide-react";
import { Link } from "react-router-dom";

const Learn = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: "architecture", icon: Layers, label: "Architecture" },
    { id: "comparison", icon: BookOpen, label: "Comparison" },
    { id: "why-celo", icon: Coins, label: "Why Celo" },
    { id: "api", icon: Code2, label: "Developer API" },
    { id: "roadmap", icon: Map, label: "Roadmap" },
  ];

  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="max-w-3xl">
            <span className="text-xs sm:text-sm text-primary font-medium tracking-wider uppercase mb-4 block">
              Deep Dive
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Learn About{" "}
              <span className="text-gradient-gold">Sentinel-X</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Explore the technical architecture, understand how we compare to existing solutions, 
              and discover our roadmap for bringing trustless AI to the blockchain.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="mt-12 flex flex-wrap gap-3">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 hover:bg-secondary hover:border-primary/30 transition-all text-sm"
              >
                <section.icon className="w-4 h-4 text-primary" />
                {section.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Sections */}
      <div id="architecture">
        <InteractiveArchitecture />
      </div>
      
      <div id="comparison">
        <Comparison />
      </div>
      
      <div id="why-celo">
        <WhyCelo />
      </div>
      
      <div id="api">
        <DeveloperAPI />
      </div>
      
      <div id="roadmap">
        <Roadmap />
      </div>

      <Footer />
    </div>
  );
};

export default Learn;
