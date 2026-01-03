import { Smartphone, Layers, Globe } from "lucide-react";
import { useScrollReveal, getStaggerDelay } from "@/hooks/useScrollReveal";

const WhyCelo = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal();

  const reasons = [
    {
      icon: Smartphone,
      title: "Mobile-First Identity",
      description: "Celo's social connect features allow our AI to map complex wallet addresses to human-readable identities, giving the AI better context on who is trading.",
    },
    {
      icon: Layers,
      title: "L2 Transition (OP Stack)",
      description: "As Celo transitions to an Ethereum L2, we get the security of Ethereum with the low fees required to process thousands of AI inferences per minute.",
    },
    {
      icon: Globe,
      title: "Real-World Assets (RWA)",
      description: "Celo is the home of ReFi. AI is critical for ingesting real-world weather or credit data to trigger smart contracts for regenerative finance.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div 
          ref={sectionRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-xs sm:text-sm text-primary font-medium tracking-wider uppercase mb-3 sm:mb-4 block">
            Why Celo?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Built on{" "}
            <span className="text-gradient-gold">Celo's Foundation</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            We chose Celo as our home base because it's uniquely positioned 
            for AI-powered blockchain intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`text-center p-6 sm:p-8 rounded-2xl bg-card/50 backdrop-blur border border-border/50 hover:border-primary/30 transition-all duration-700 hover:scale-105 ${
                sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={getStaggerDelay(index, 150)}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <reason.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{reason.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCelo;