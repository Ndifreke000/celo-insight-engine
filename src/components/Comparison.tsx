import { Check, X } from "lucide-react";
import { useScrollReveal, getStaggerDelay } from "@/hooks/useScrollReveal";

const Comparison = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal();

  const features = [
    {
      feature: "Data Indexing Speed",
      sentinelX: "Sub-second (Optimistic Parsing)",
      traditional: "Minutes to hours",
      sentinelXAdvantage: true,
    },
    {
      feature: "Data Understanding",
      sentinelX: "Contextual inferences & conclusions",
      traditional: "Raw numbers only",
      sentinelXAdvantage: true,
    },
    {
      feature: "Off-Chain Data",
      sentinelX: "Twitter, Discord, News integrated",
      traditional: "Not supported",
      sentinelXAdvantage: true,
    },
    {
      feature: "AI/LLM Integration",
      sentinelX: "Native Celo-tuned LLM",
      traditional: "Manual integration required",
      sentinelXAdvantage: true,
    },
    {
      feature: "Verification",
      sentinelX: "zkML on-chain proofs",
      traditional: "Trust-based",
      sentinelXAdvantage: true,
    },
    {
      feature: "Real-Time Alerts",
      sentinelX: "WebSocket subscriptions with confidence",
      traditional: "Polling required",
      sentinelXAdvantage: true,
    },
    {
      feature: "Celo Ecosystem",
      sentinelX: "Native understanding (stablecoins, epochs)",
      traditional: "Generic EVM support",
      sentinelXAdvantage: true,
    },
    {
      feature: "Security Analysis",
      sentinelX: "Instant rug-pull detection",
      traditional: "Manual auditing",
      sentinelXAdvantage: true,
    },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative bg-secondary/20">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div 
          ref={sectionRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-xs sm:text-sm text-primary font-medium tracking-wider uppercase mb-3 sm:mb-4 block">
            Comparison
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Sentinel-X vs{" "}
            <span className="text-gradient-gold">Traditional Indexers</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            See how Sentinel-X's AI-powered approach compares to traditional 
            blockchain indexing solutions.
          </p>
        </div>

        <div className={`max-w-6xl mx-auto transition-all duration-700 delay-200 ${
          sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          {/* Desktop Table */}
          <div className="hidden md:block rounded-2xl overflow-hidden border border-border/50 bg-card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-4 lg:p-6 text-sm font-semibold text-muted-foreground">
                    Feature
                  </th>
                  <th className="text-left p-4 lg:p-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-sm">S</span>
                      </div>
                      <span className="text-sm font-semibold text-gradient-gold">Sentinel-X</span>
                    </div>
                  </th>
                  <th className="text-left p-4 lg:p-6">
                    <span className="text-sm font-semibold text-muted-foreground">Traditional Indexers</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((row, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-border/30 last:border-b-0 hover:bg-secondary/30 transition-all duration-500 ${
                      sectionVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    }`}
                    style={getStaggerDelay(index, 50)}
                  >
                    <td className="p-4 lg:p-6 text-sm font-medium text-foreground">
                      {row.feature}
                    </td>
                    <td className="p-4 lg:p-6">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-foreground">{row.sentinelX}</span>
                      </div>
                    </td>
                    <td className="p-4 lg:p-6">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-destructive/60 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{row.traditional}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {features.map((row, index) => (
              <div 
                key={index}
                className={`p-4 rounded-xl bg-card border border-border/50 transition-all duration-500 ${
                  sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={getStaggerDelay(index, 80)}
              >
                <h4 className="font-semibold text-foreground mb-3">{row.feature}</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-primary/10">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-primary font-medium block mb-0.5">Sentinel-X</span>
                      <span className="text-sm text-foreground">{row.sentinelX}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-secondary/50">
                    <X className="w-4 h-4 text-destructive/60 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-muted-foreground font-medium block mb-0.5">Traditional</span>
                      <span className="text-sm text-muted-foreground">{row.traditional}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className={`mt-8 sm:mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 transition-all duration-700 delay-500 ${
            sectionVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h4 className="text-lg sm:text-xl font-bold mb-2">Ready to upgrade your indexing?</h4>
                <p className="text-sm text-muted-foreground">Join the next generation of AI-powered blockchain intelligence.</p>
              </div>
              <div className="flex items-center gap-2 text-primary font-semibold">
                <span className="text-2xl sm:text-3xl">8/8</span>
                <span className="text-sm text-muted-foreground">advantages</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;