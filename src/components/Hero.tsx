import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Brain, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const handleReadWhitepaper = () => {
    const roadmapSection = document.getElementById('roadmap');
    if (roadmapSection) {
      roadmapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      
      {/* Floating Elements */}
      <div className="absolute top-32 right-20 hidden lg:block animate-float">
        <div className="w-16 h-16 rounded-xl bg-secondary/50 backdrop-blur border border-border/50 flex items-center justify-center">
          <Zap className="w-8 h-8 text-primary" />
        </div>
      </div>
      <div className="absolute bottom-40 left-20 hidden lg:block animate-float" style={{ animationDelay: "2s" }}>
        <div className="w-14 h-14 rounded-xl bg-secondary/50 backdrop-blur border border-border/50 flex items-center justify-center">
          <Brain className="w-7 h-7 text-accent" />
        </div>
      </div>
      <div className="absolute top-1/2 right-32 hidden lg:block animate-float" style={{ animationDelay: "4s" }}>
        <div className="w-12 h-12 rounded-xl bg-secondary/50 backdrop-blur border border-border/50 flex items-center justify-center">
          <Shield className="w-6 h-6 text-gold-light" />
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-secondary/50 backdrop-blur border border-border/50 mb-6 sm:mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs sm:text-sm text-muted-foreground">Built on Celo L2</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6">
            Giving Blockchain Data{" "}
            <span className="text-gradient-gold">a Brain</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
            The AI-Enhanced Real-Time Data Inference Indexer. We transform raw blockchain data 
            into actionable intelligence for AI agents—delivering conclusions, not just numbers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4">
            <Link to="/app" className="w-full sm:w-auto">
              <Button 
                variant="hero" 
                size="xl" 
                className="w-full group"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button 
              variant="glass" 
              size="xl" 
              className="w-full sm:w-auto"
              onClick={handleReadWhitepaper}
            >
              Read Whitepaper
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto px-4">
            <div className="text-center p-4 sm:p-6 rounded-xl bg-secondary/30 backdrop-blur border border-border/30">
              <div className="text-3xl sm:text-4xl font-bold text-gradient-gold mb-2">&lt;1s</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Inference Latency</div>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-xl bg-secondary/30 backdrop-blur border border-border/30">
              <div className="text-3xl sm:text-4xl font-bold text-gradient-cyan mb-2">50GB+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Training Data</div>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-xl bg-secondary/30 backdrop-blur border border-border/30">
              <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2">zkML</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Verified Proofs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
