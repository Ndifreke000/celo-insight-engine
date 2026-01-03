import { Layers, Cpu, Shield, Wifi } from "lucide-react";
import { useScrollReveal, getStaggerDelay } from "@/hooks/useScrollReveal";

const Architecture = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal();
  const { ref: codeRef, isVisible: codeVisible } = useScrollReveal();

  const layers = [
    {
      icon: Layers,
      title: "Layer 1: Ingestion Pipe",
      tech: "Rust-based",
      description: "Custom Rust indexer connecting directly to Celo's Sequencer (OP Stack) with sub-second state change reads.",
      feature: "Optimistic Parsing",
      featureDesc: "Begin parsing before block finalization, correcting only on reorg.",
      color: "from-primary/20 to-primary/5",
      borderColor: "border-primary/30",
    },
    {
      icon: Cpu,
      title: "Layer 2: Inference Engine",
      tech: "Python/PyTorch",
      description: "Where the Celo Fine-Tuned LLM lives. Base Model: Llama-3-8b optimized for latency.",
      feature: "Vector Embeddings",
      featureDesc: "Produces context-aware transaction embeddings in real-time.",
      color: "from-accent/20 to-accent/5",
      borderColor: "border-accent/30",
    },
    {
      icon: Shield,
      title: "Layer 3: Verification Layer",
      tech: "zk-ML",
      description: "Zero-Knowledge Machine Learning proofs ensure AI outputs are cryptographically verifiable.",
      feature: "On-Chain Proofs",
      featureDesc: 'When AI says "This trade is safe," it generates a cryptographic proof.',
      color: "from-gold-light/20 to-gold-light/5",
      borderColor: "border-gold-light/30",
    },
    {
      icon: Wifi,
      title: "Layer 4: Delivery API",
      tech: "GraphQL + WebSockets",
      description: "Real-time subscription streams for AI agents to receive inferences instantly.",
      feature: "Filtered Subscriptions",
      featureDesc: "Subscribe to specific inference types with confidence thresholds.",
      color: "from-cyan-light/20 to-cyan-light/5",
      borderColor: "border-cyan-light/30",
    },
  ];

  return (
    <section id="architecture" className="py-16 sm:py-24 lg:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div 
          ref={sectionRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-xs sm:text-sm text-primary font-medium tracking-wider uppercase mb-3 sm:mb-4 block">
            Technical Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Built for{" "}
            <span className="text-gradient-gold">Speed & Verifiability</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            A modularized architecture ensuring sub-second latency with 
            cryptographic proof of every inference.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connection Line */}
            <div className={`absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-gold-light hidden md:block transition-all duration-1000 ${
              sectionVisible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
            }`} style={{ transformOrigin: 'top' }} />

            <div className="space-y-6 sm:space-y-8">
              {layers.map((layer, index) => (
                <div 
                  key={index} 
                  className={`relative pl-0 md:pl-20 transition-all duration-700 ${
                    sectionVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}
                  style={getStaggerDelay(index, 150)}
                >
                  {/* Connection Dot */}
                  <div className={`absolute left-4 sm:left-6 top-8 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent hidden md:block transition-all duration-500 ${
                    sectionVisible ? "scale-100" : "scale-0"
                  }`} style={getStaggerDelay(index, 150)} />
                  
                  <div className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${layer.color} border ${layer.borderColor} backdrop-blur hover:scale-[1.02] transition-transform duration-300`}>
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4 sm:gap-6">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-secondary/50 flex items-center justify-center flex-shrink-0">
                          <layer.icon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                        </div>
                        <div className="lg:hidden">
                          <h3 className="text-lg sm:text-xl font-bold">{layer.title}</h3>
                          <span className="text-xs sm:text-sm text-muted-foreground font-mono">{layer.tech}</span>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="hidden lg:block mb-2">
                          <h3 className="text-xl font-bold">{layer.title}</h3>
                          <span className="text-sm text-muted-foreground font-mono">{layer.tech}</span>
                        </div>
                        <p className="text-sm sm:text-base text-muted-foreground mb-4">{layer.description}</p>
                        <div className="p-3 sm:p-4 rounded-lg bg-background/50">
                          <div className="text-xs sm:text-sm text-primary font-semibold mb-1">{layer.feature}</div>
                          <div className="text-xs sm:text-sm text-muted-foreground">{layer.featureDesc}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div 
          ref={codeRef}
          className={`mt-12 sm:mt-16 max-w-3xl mx-auto px-4 transition-all duration-700 ${
            codeVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="p-4 sm:p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-primary/60" />
              <div className="w-3 h-3 rounded-full bg-accent/60" />
              <span className="ml-2 text-xs sm:text-sm text-muted-foreground font-mono">GraphQL Subscription</span>
            </div>
            <pre className="text-xs sm:text-sm font-mono text-foreground overflow-x-auto">
              <code>{`subscription {
  aiInferences(type: "security_alert", confidence: ">90%") {
    txHash
    reasoning
    suggestedAction
  }
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;