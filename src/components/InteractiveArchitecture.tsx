import { useState, useEffect, useRef } from "react";
import { Layers, Cpu, Shield, Wifi, ArrowRight, Zap, Database, Brain, Lock, Globe, Activity } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface DataPacket {
  id: number;
  from: number;
  to: number;
  progress: number;
  color: string;
}

const InteractiveArchitecture = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [dataPackets, setDataPackets] = useState<DataPacket[]>([]);
  const [isAnimating, setIsAnimating] = useState(true);
  const packetIdRef = useRef(0);

  const layers = [
    {
      id: 0,
      icon: Database,
      title: "Ingestion Pipe",
      tech: "Rust-based",
      shortDesc: "Sub-second data consumption",
      fullDesc: "Custom Rust indexer connecting directly to Celo's Sequencer (OP Stack) with sub-second state change reads. Uses Optimistic Parsing to begin parsing before block finalization.",
      features: ["Direct Sequencer Connection", "Optimistic Parsing", "Sub-second Latency"],
      color: "from-primary to-primary/50",
      glowColor: "shadow-primary/30",
      stats: { throughput: "10K+ TPS", latency: "<100ms" },
    },
    {
      id: 1,
      icon: Brain,
      title: "Inference Engine",
      tech: "Python/PyTorch",
      shortDesc: "Celo-tuned LLM processing",
      fullDesc: "Where the Celo Fine-Tuned LLM lives. Base Model: Llama-3-8b optimized for latency. Produces context-aware transaction embeddings in real-time.",
      features: ["Llama-3-8b Base", "Vector Embeddings", "Context Awareness"],
      color: "from-accent to-accent/50",
      glowColor: "shadow-accent/30",
      stats: { model: "Celo-7B", accuracy: "94.7%" },
    },
    {
      id: 2,
      icon: Lock,
      title: "Verification Layer",
      tech: "zk-ML",
      shortDesc: "Cryptographic proof generation",
      fullDesc: "Zero-Knowledge Machine Learning proofs ensure AI outputs are cryptographically verifiable. When AI says 'This trade is safe,' it generates a cryptographic proof posted on-chain.",
      features: ["zkML Proofs", "On-Chain Verification", "Trustless AI"],
      color: "from-gold-light to-gold-light/50",
      glowColor: "shadow-gold-light/30",
      stats: { proofs: "1M+", verified: "100%" },
    },
    {
      id: 3,
      icon: Globe,
      title: "Delivery API",
      tech: "GraphQL + WebSockets",
      shortDesc: "Real-time inference streaming",
      fullDesc: "Real-time subscription streams for AI agents to receive inferences instantly. Subscribe to specific inference types with confidence thresholds.",
      features: ["GraphQL Subscriptions", "WebSocket Streams", "Filtered Queries"],
      color: "from-cyan-light to-cyan-light/50",
      glowColor: "shadow-cyan-light/30",
      stats: { connections: "50K+", uptime: "99.9%" },
    },
  ];

  // Animate data packets flowing through layers
  useEffect(() => {
    if (!isAnimating || !isVisible) return;

    const interval = setInterval(() => {
      // Create new packet
      const newPacket: DataPacket = {
        id: packetIdRef.current++,
        from: 0,
        to: 3,
        progress: 0,
        color: ["#FCBF49", "#00D9FF", "#FFD700", "#00CED1"][Math.floor(Math.random() * 4)],
      };

      setDataPackets((prev) => [...prev.slice(-5), newPacket]);
    }, 2000);

    return () => clearInterval(interval);
  }, [isAnimating, isVisible]);

  // Update packet positions
  useEffect(() => {
    if (!isAnimating) return;

    const animationFrame = setInterval(() => {
      setDataPackets((prev) =>
        prev
          .map((packet) => ({
            ...packet,
            progress: packet.progress + 2,
          }))
          .filter((packet) => packet.progress <= 100)
      );
    }, 50);

    return () => clearInterval(animationFrame);
  }, [isAnimating]);

  return (
    <section id="architecture" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div
          ref={sectionRef}
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-10 sm:mb-16 px-2">
            <span className="text-xs sm:text-sm text-primary font-medium tracking-wider uppercase mb-2 sm:mb-4 block">
              Interactive Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-6">
              Built for{" "}
              <span className="text-gradient-gold block sm:inline">Speed & Verifiability</span>
            </h2>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Click on any layer to explore. Watch data flow through our real-time pipeline.
            </p>
          </div>

          {/* Interactive Diagram */}
          <div className="max-w-6xl mx-auto">
            {/* Main Pipeline */}
            <div className="relative">
              {/* Connection Lines */}
              <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 hidden lg:block">
                <div className="h-full bg-gradient-to-r from-primary via-accent via-gold-light to-cyan-light opacity-20 rounded-full" />
                {/* Animated Packets */}
                {dataPackets.map((packet) => (
                  <div
                    key={packet.id}
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full animate-pulse"
                    style={{
                      left: `${packet.progress}%`,
                      backgroundColor: packet.color,
                      boxShadow: `0 0 20px ${packet.color}`,
                      transition: "left 50ms linear",
                    }}
                  />
                ))}
              </div>

              {/* Layer Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10 px-1 sm:px-0">
                {layers.map((layer, index) => {
                  const IconComponent = layer.icon;
                  const isActive = activeLayer === layer.id;

                  return (
                    <div
                      key={layer.id}
                      className={`relative cursor-pointer transition-all duration-500 ${
                        isActive ? "scale-105 z-20" : "hover:scale-102"
                      }`}
                      onClick={() => setActiveLayer(isActive ? null : layer.id)}
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      {/* Card */}
                      <div
                        className={`relative p-4 sm:p-6 rounded-2xl border backdrop-blur transition-all duration-500 ${
                          isActive
                            ? `bg-gradient-to-br ${layer.color} border-white/20 ${layer.glowColor} shadow-2xl`
                            : "bg-card/80 border-border/50 hover:border-primary/30"
                        }`}
                      >
                        {/* Layer Number */}
                        <div
                          className={`absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            isActive
                              ? "bg-white text-background"
                              : "bg-gradient-to-br from-primary to-accent text-primary-foreground"
                          }`}
                        >
                          {index + 1}
                        </div>

                        {/* Icon */}
                        <div
                          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300 ${
                            isActive
                              ? "bg-white/20"
                              : `bg-gradient-to-br ${layer.color} opacity-80`
                          }`}
                        >
                          <IconComponent
                            className={`w-6 h-6 sm:w-7 sm:h-7 ${isActive ? "text-white" : "text-white"}`}
                          />
                        </div>

                        {/* Content */}
                        <h3
                          className={`text-base sm:text-lg font-bold mb-1 ${
                            isActive ? "text-white" : "text-foreground"
                          }`}
                        >
                          {layer.title}
                        </h3>
                        <p
                          className={`text-xs font-mono mb-2 sm:mb-3 ${
                            isActive ? "text-white/80" : "text-muted-foreground"
                          }`}
                        >
                          {layer.tech}
                        </p>
                        <p
                          className={`text-xs sm:text-sm leading-relaxed ${
                            isActive ? "text-white/90" : "text-muted-foreground"
                          }`}
                        >
                          {isActive ? layer.fullDesc : layer.shortDesc}
                        </p>

                        {/* Expanded Content */}
                        {isActive && (
                          <div className="mt-4 pt-4 border-t border-white/20 animate-fade-in">
                            {/* Features */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {layer.features.map((feature, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-white/10 rounded-full text-xs text-white"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-3">
                              {Object.entries(layer.stats).map(([key, value]) => (
                                <div key={key} className="text-center">
                                  <div className="text-lg font-bold text-white">{value}</div>
                                  <div className="text-xs text-white/60 capitalize">{key}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Pulse Animation when active */}
                        {isActive && (
                          <div className="absolute inset-0 rounded-2xl animate-ping opacity-20 bg-white pointer-events-none" />
                        )}
                      </div>

                      {/* Connection Arrow (Mobile) */}
                      {index < 3 && (
                        <div className="flex justify-center py-2 lg:hidden">
                          <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={() => setIsAnimating(!isAnimating)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isAnimating
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                }`}
              >
                <Activity className="w-4 h-4 inline mr-2" />
                {isAnimating ? "Pause Flow" : "Resume Flow"}
              </button>
              <button
                onClick={() => setActiveLayer(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-secondary text-foreground hover:bg-secondary/80 transition-all"
              >
                Reset View
              </button>
            </div>

            {/* Code Example */}
            <div className="mt-12 sm:mt-16 max-w-3xl mx-auto">
              <div className="p-4 sm:p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-primary/60" />
                  <div className="w-3 h-3 rounded-full bg-accent/60" />
                  <span className="ml-2 text-xs sm:text-sm text-muted-foreground font-mono">
                    GraphQL Subscription
                  </span>
                </div>
                <pre className="text-xs sm:text-sm font-mono text-accent overflow-x-auto">
                  <code>{`subscription {
  aiInferences(type: "security_alert", confidence: ">90%") {
    txHash
    reasoning
    suggestedAction
    zkProof {
      verified
      proofHash
    }
  }
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveArchitecture;
