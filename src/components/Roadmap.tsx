import { CheckCircle, Circle, Clock } from "lucide-react";

const Roadmap = () => {
  const phases = [
    {
      phase: "Phase 1",
      title: "The Foundation",
      timeline: "Q1 - Q2",
      status: "completed",
      items: [
        { text: "Launch Rust-based raw data indexer for Celo Testnet (Alfajores)", done: true },
        { text: 'Begin training "Celo-7B" (The custom LLM) on historical data', done: true },
        { text: "Release API for raw data access", done: true },
      ],
    },
    {
      phase: "Phase 2",
      title: "The Brain",
      timeline: "Q3",
      status: "completed",
      items: [
        { text: "Deploy the Inference Engine", done: true },
        { text: "Integrate Sentiment Analysis from Twitter/Discord feeds", done: true },
        { text: "Launch Smart Contract Explainer tool", done: true },
      ],
    },
    {
      phase: "Phase 3",
      title: "The Oracle",
      timeline: "Q4",
      status: "completed",
      items: [
        { text: "Mainnet Launch", done: true },
        { text: "Enable zkML proofs for on-chain verification", done: true },
        { text: "Allow developers to deploy micro-models on infrastructure", done: true },
      ],
    },
    {
      phase: "Phase 4",
      title: "The Ecosystem",
      timeline: "2026 Q1",
      status: "current",
      items: [
        { text: "Launch Developer SDK and Documentation Portal", done: true },
        { text: "Enable Multi-Chain Support (Ethereum, Polygon, Arbitrum)", done: false },
        { text: "Release AI Agent Marketplace", done: false },
      ],
    },
    {
      phase: "Phase 5",
      title: "The Network",
      timeline: "2026 Q2-Q3",
      status: "upcoming",
      items: [
        { text: "Decentralized Inference Node Network", done: false },
        { text: "Governance Token Launch and DAO Formation", done: false },
        { text: "Cross-chain AI Oracle Protocol", done: false },
      ],
    },
    {
      phase: "Phase 6",
      title: "The Future",
      timeline: "2026 Q4+",
      status: "future",
      items: [
        { text: "Enterprise Solutions and Private Deployments", done: false },
        { text: "Advanced AI Models (100B+ parameters)", done: false },
        { text: "Global AI Infrastructure Network", done: false },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-600 text-white";
      case "current":
        return "bg-primary text-primary-foreground";
      case "upcoming":
        return "bg-accent text-accent-foreground";
      case "future":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getBorderColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-green-600/50";
      case "current":
        return "border-primary/50";
      case "upcoming":
        return "border-accent/50";
      case "future":
        return "border-border/50";
      default:
        return "border-border/50";
    }
  };

  return (
    <section id="roadmap" className="py-16 sm:py-24 lg:py-32 relative bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm text-primary font-medium tracking-wider uppercase mb-3 sm:mb-4 block">
            Roadmap
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Our Path to{" "}
            <span className="text-gradient-gold">Intelligence</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            From foundation to full ecosystem—building the intelligence 
            layer for Celo step by step.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {phases.map((phase, index) => (
              <div
                key={index}
                className={`p-6 sm:p-8 rounded-2xl bg-card border ${getBorderColor(phase.status)} transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(phase.status)}`}>
                    {phase.phase}
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground">{phase.timeline}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{phase.title}</h3>

                <div className="space-y-3 sm:space-y-4">
                  {phase.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-3">
                      {item.done ? (
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                      ) : phase.status === "current" ? (
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground/50 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={`text-xs sm:text-sm ${item.done ? "text-foreground" : "text-muted-foreground"}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
