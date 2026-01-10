import { useScrollReveal, getStaggerDelay } from "@/hooks/useScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is Sentinel-X?",
    answer:
      "Sentinel-X is an AI-Enhanced Real-Time Data Inference Indexer built for the Celo blockchain. It sits between raw blockchain data and AI Agents, transforming raw numbers into actionable intelligence. Think of it as a 24/7 News Analyst for blockchain data—it reads every transaction, connects it with off-chain data (news, social media), and instantly delivers conclusions, not just raw numbers.",
  },
  {
    question: "How is Sentinel-X different from The Graph or other indexers?",
    answer:
      "Traditional indexers like The Graph are like a library—you walk in, find the book, and draw your own conclusions. Sentinel-X is different: it actively reads every piece of data as it arrives, enriches it with off-chain context (Twitter, governance forums), runs it through our Celo-optimized LLM, and pushes actionable inferences in real-time. We deliver conclusions, they deliver data.",
  },
  {
    question: "What is the Celo-7B model?",
    answer:
      "Celo-7B is our proprietary Large Language Model fine-tuned specifically on Celo's ecosystem. It's trained on 50GB+ of Celo developer documentation, 1M+ verified smart contracts, historical transaction patterns, and stablecoin logic (cUSD/cEUR). This specialization means it understands Celo-specific nuances like epoch rewards, Ultragreen money, and OP Stack architecture—something general-purpose LLMs like GPT-4 often get wrong.",
  },
  {
    question: "What is zkML verification?",
    answer:
      "Zero-Knowledge Machine Learning (zkML) is how we make AI trustworthy on-chain. When our AI says 'This trade is safe' or 'This contract is risky,' it generates a cryptographic proof that the specific model was run correctly on the data. This proof is posted on-chain, allowing anyone to verify the AI's conclusion without trusting a centralized authority.",
  },
  {
    question: "Who should use Sentinel-X?",
    answer:
      "Sentinel-X is built for three main audiences: (1) AI Hedge Funds & Trading Bots that need real-time intelligence beyond raw data, (2) Security & Auditing Agents that want instant risk detection for new contracts, and (3) Regulatory Compliance teams that need real-time wallet tagging and interaction monitoring. Anyone building AI agents on Celo will benefit from our infrastructure.",
  },
  {
    question: "What data sources does Sentinel-X index?",
    answer:
      "We ingest both on-chain and off-chain data. On-chain: Celo L2 block data, mempool transactions, smart contract events, and state changes directly from Celo's Sequencer. Off-chain: Twitter/X sentiment, governance forum discussions, Discord announcements, and news feeds. This combined data gives our AI the full context needed for accurate inferences.",
  },
  {
    question: "Why did you choose to build on Celo?",
    answer:
      "Three reasons: (1) Mobile-First Identity—Celo's social connect features let our AI map wallet addresses to human-readable identities for better context. (2) L2 Transition—As Celo moves to an OP Stack L2, we get Ethereum security with low fees needed for high-frequency AI inferences. (3) Real-World Assets—Celo is the home of ReFi and RWAs, where AI is critical for ingesting real-world data to trigger smart contracts.",
  },
  {
    question: "What is the inference latency?",
    answer:
      "Our target is sub-second inference latency. Our Rust-based indexer uses 'Optimistic Parsing'—we begin parsing blocks before they're fully finalized, correcting only on reorgs (rare on L2). Combined with our optimized Llama-3-8b-based model and direct Sequencer connection, we achieve real-time intelligence delivery.",
  },
  {
    question: "Is there an API I can use?",
    answer:
      "Yes! We provide a comprehensive API with both GraphQL and WebSocket support for real-time subscriptions. You can subscribe to filtered inference streams (e.g., only security alerts with >90% confidence), query historical data, run custom AI queries, and integrate contract analysis into your applications. Check our documentation for full API reference.",
  },
  {
    question: "When will Sentinel-X be available on mainnet?",
    answer:
      "Our roadmap has three phases: Phase 1 (Q1-Q2) focuses on the Rust indexer and Celo-7B training on Alfajores testnet. Phase 2 (Q3) deploys the Inference Engine with sentiment analysis. Phase 3 (Q4) is mainnet launch with zkML proofs and the ability for developers to deploy their own micro-models on our infrastructure.",
  },
];

const FAQ = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal();

  return (
    <section id="faq" className="py-16 sm:py-24 relative">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div
          ref={sectionRef}
          className={`transition-all duration-700 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm text-primary font-medium tracking-wider uppercase mb-3 sm:mb-4 block">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Frequently Asked <span className="text-gradient-gold">Questions</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about Sentinel-X and how it transforms blockchain data into AI-powered intelligence.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className={`border border-border/50 rounded-lg bg-secondary/20 backdrop-blur px-4 sm:px-6 transition-all duration-500 hover:border-primary/30 ${
                    sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={getStaggerDelay(index, 50)}
                >
                  <AccordionTrigger className="text-left py-4 sm:py-5 hover:no-underline group">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-primary mt-0.5 shrink-0 group-hover:text-accent transition-colors" />
                      <span className="text-sm sm:text-base font-medium">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed pb-4 sm:pb-5 pl-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Still have questions? Check our documentation or reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/docs"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Read Documentation
              </a>
              <a
                href="https://discord.gg/sentinelx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border/50 bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                Join Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
