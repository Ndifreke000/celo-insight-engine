import { Eye, Clock, AlertTriangle } from "lucide-react";
import { useScrollReveal, getStaggerDelay } from "@/hooks/useScrollReveal";

const Problem = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal();
  const { ref: comparisonRef, isVisible: comparisonVisible } = useScrollReveal();

  const problems = [
    {
      icon: Eye,
      title: "Data Blindness",
      description: "Blockchains only know numbers. They don't understand context or intent. A wallet draining funds looks identical to a normal transfer.",
      color: "text-destructive",
    },
    {
      icon: Clock,
      title: "Latency",
      description: "By the time an AI agent scrapes data sources, processes it, and makes a decision—the trading opportunity or security threat is already over.",
      color: "text-primary",
    },
    {
      icon: AlertTriangle,
      title: "Hallucinations",
      description: "General-purpose LLMs don't understand Celo-specific concepts like epoch rewards, Ultragreen money, or custom smart contract opcodes.",
      color: "text-accent",
    },
  ];

  return (
    <section id="problem" className="py-16 sm:py-24 lg:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div 
          ref={sectionRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-xs sm:text-sm text-primary font-medium tracking-wider uppercase mb-3 sm:mb-4 block">
            The Problem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Why AI Agents Are{" "}
            <span className="text-gradient-gold">Struggling</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Current blockchain infrastructure wasn't built for AI. Agents are forced to work 
            with raw, context-less data that leads to poor decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`group relative p-6 sm:p-8 rounded-2xl bg-card border border-border/50 hover:border-border transition-all duration-700 hover:-translate-y-1 ${
                sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={getStaggerDelay(index, 150)}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-secondary flex items-center justify-center mb-4 sm:mb-6 ${problem.color}`}>
                  <problem.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{problem.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison */}
        <div 
          ref={comparisonRef}
          className="mt-16 sm:mt-20 max-w-4xl mx-auto px-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div 
              className={`p-6 sm:p-8 rounded-2xl bg-destructive/10 border border-destructive/20 transition-all duration-700 ${
                comparisonVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="text-xs sm:text-sm text-destructive font-medium mb-3">Current Indexers</div>
              <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Like a Library</h4>
              <p className="text-sm sm:text-base text-muted-foreground">
                You have to walk in, find the specific book, read it, 
                and draw your own conclusions. Slow and manual.
              </p>
            </div>
            <div 
              className={`p-6 sm:p-8 rounded-2xl bg-primary/10 border border-primary/20 transition-all duration-700 delay-150 ${
                comparisonVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <div className="text-xs sm:text-sm text-primary font-medium mb-3">Sentinel-X</div>
              <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Like a 24/7 News Analyst</h4>
              <p className="text-sm sm:text-base text-muted-foreground">
                It reads every book the second it arrives, connects the dots, 
                and instantly sends you what matters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;