import { TrendingUp, Shield, Scale, ArrowRight } from "lucide-react";
import { useScrollReveal, getStaggerDelay } from "@/hooks/useScrollReveal";

const UseCases = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal();

  const useCases = [
    {
      icon: TrendingUp,
      title: "AI Hedge Funds",
      persona: "The Trader",
      before: "The bot sees a swap.",
      after: '"Whale wallet accumulated CELO. Correlated with positive governance vote passed 5 mins ago. Bullish sentiment inferred."',
      gradient: "from-primary/10 to-transparent",
      iconColor: "text-primary",
    },
    {
      icon: Shield,
      title: "Security & Auditing",
      persona: "The Police",
      before: "A new contract is deployed.",
      after: "LLM instantly reads bytecode, compares to known rug-pull patterns, flags as \"High Risk\" within the same block.",
      gradient: "from-accent/10 to-transparent",
      iconColor: "text-accent",
    },
    {
      icon: Scale,
      title: "Regulatory Compliance",
      persona: "The Lawyer",
      before: "Stablecoin issuer interacts with unknown wallets.",
      after: "Real-time tagging based on on-chain behavior graphs, alerting before transactions settle.",
      gradient: "from-gold-light/10 to-transparent",
      iconColor: "text-gold-light",
    },
  ];

  return (
    <section id="use-cases" className="py-16 sm:py-24 lg:py-32 relative bg-secondary/20">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div 
          ref={sectionRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-xs sm:text-sm text-primary font-medium tracking-wider uppercase mb-3 sm:mb-4 block">
            Use Cases
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Who Uses{" "}
            <span className="text-gradient-cyan">Sentinel-X</span>?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            From trading to security to compliance—any AI agent that needs 
            to understand blockchain context, not just read data.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className={`group p-6 sm:p-8 rounded-2xl bg-card border border-border/50 hover:border-border transition-all duration-700 overflow-hidden relative ${
                sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={getStaggerDelay(index, 150)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-b ${useCase.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-secondary flex items-center justify-center ${useCase.iconColor}`}>
                    <useCase.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono bg-secondary/50 px-2 py-1 rounded">
                    {useCase.persona}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">{useCase.title}</h3>

                <div className="space-y-4">
                  <div className="p-3 sm:p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                    <div className="text-xs text-destructive font-medium mb-1 sm:mb-2">Without Sentinel-X</div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{useCase.before}</p>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
                  </div>

                  <div className="p-3 sm:p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="text-xs text-primary font-medium mb-1 sm:mb-2">With Sentinel-X</div>
                    <p className="text-xs sm:text-sm text-foreground">{useCase.after}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;