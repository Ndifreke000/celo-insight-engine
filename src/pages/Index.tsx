import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import UseCases from "@/components/UseCases";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scroll-smooth pb-16 md:pb-0">
      <Navbar />
      <Hero />
      <Products />
      <Problem />
      <Solution />
      <UseCases />
      
      {/* Learn More CTA Section */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs sm:text-sm text-primary font-medium tracking-wider uppercase mb-4 block">
              Go Deeper
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Want to Learn More?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto px-2">
              Explore our technical architecture, see how we compare to existing solutions, 
              dive into the developer API, and check out our roadmap.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 px-4">
              <Button asChild size="lg" className="group">
                <Link to="/learn">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore Technical Details
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/docs">
                  Read Documentation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <FAQ />
      <Footer />
      <MobileNav />
    </div>
  );
};

export default Index;
