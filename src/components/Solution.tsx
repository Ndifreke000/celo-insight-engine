import { Database, Brain, ArrowRight, CheckCircle } from "lucide-react";
import { useScrollReveal, getStaggerDelay } from "@/hooks/useScrollReveal";

const Solution = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal();
  const { ref: workflowRef, isVisible: workflowVisible } = useScrollReveal();

  const features = [
    "On-chain block data & mempool transactions",
    "Smart contract events in real-time",
    "Governance forums & Discord announcements",
    "X (Twitter) sentiment analysis",
  ];

  const capabilities = [
    "Trained on 50GB+ of Celo documentation",
    "1M+ verified Celo smart contracts analyzed",
    "Historical governance proposal patterns",
    "Stablecoin logic understanding (cUSD/cEUR)",
  ];

  return (
    <section id="solution" className="py-16 sm:py-24 lg:py-32 relative bg-secondary/20">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div 
          ref={sectionRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-xs sm:text-sm text-primary font-medium tracking-wider uppercase mb-3 sm:mb-4 block">
            The Solution
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Two Engines,{" "}
            <span className="text-gradient-cyan">One Intelligence</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Sentinel-X combines high-throughput indexing with a Celo-optimized LLM 
            to deliver real-time, verified inferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto mb-12 sm:mb-16">
          {/* Engine A */}
          <div 
            className={`group p-6 sm:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-700 ${
              sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={getStaggerDelay(0, 150)}
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Database className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
              </div>
              <div>
                <div className="text-xs sm:text-sm text-muted-foreground mb-1">Engine A</div>
                <h3 className="text-xl sm:text-2xl font-bold">The High-Throughput Indexer</h3>
              </div>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
              A blazing fast data-eater built in Rust that consumes both on-chain and off-chain data 
              with sub-second latency.
            </p>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    sectionVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={getStaggerDelay(index, 100)}
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <span className="text-sm sm:text-base text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Engine B */}
          <div 
            className={`group p-6 sm:p-8 rounded-2xl bg-card border border-border/50 hover:border-accent/50 transition-all duration-700 ${
              sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={getStaggerDelay(1, 150)}
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                <Brain className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
              </div>
              <div>
                <div className="text-xs sm:text-sm text-muted-foreground mb-1">Engine B</div>
                <h3 className="text-xl sm:text-2xl font-bold">The Celo-Fine-Tuned LLM</h3>
              </div>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
              A proprietary AI model trained specifically on Celo's ecosystem to understand 
              blockchain semantics at a deep level.
            </p>
            <div className="space-y-3">
              {capabilities.map((capability, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    sectionVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={getStaggerDelay(index, 100)}
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                  <span className="text-sm sm:text-base text-foreground">{capability}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Workflow */}
        <div 
          ref={workflowRef}
          className="max-w-6xl mx-auto px-4"
        >
          <h3 className={`text-xl sm:text-2xl font-bold text-center mb-8 sm:mb-12 transition-all duration-700 ${
            workflowVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            The Workflow
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { step: "1", title: "Ingest", description: "The Indexer sees a large transfer of cUSD" },
              { step: "2", title: "Enrich", description: "System checks off-chain data (Did a whale tweet?)" },
              { step: "3", title: "Infer", description: 'LLM decides: "This is treasury rebalancing"' },
              { step: "4", title: "Broadcast", description: "Push inference on-chain as verifiable proof" },
            ].map((item, index) => (
              <div 
                key={index} 
                className={`relative transition-all duration-700 ${
                  workflowVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={getStaggerDelay(index, 150)}
              >
                <div className="p-4 sm:p-6 rounded-xl bg-card border border-border/50 text-center h-full hover:border-primary/30 transition-colors">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold mx-auto mb-3 sm:mb-4 text-sm sm:text-base">
                    {item.step}
                  </div>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;