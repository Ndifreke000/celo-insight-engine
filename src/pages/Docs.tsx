import { useScrollReveal, getStaggerDelay } from "@/hooks/useScrollReveal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MobileNav from "@/components/MobileNav";
import { 
  ArrowLeft, 
  Code, 
  Terminal, 
  Zap, 
  Database, 
  Brain, 
  Shield, 
  Globe,
  Layers,
  AlertTriangle,
  Clock,
  Eye,
  CheckCircle2,
  Copy,
  ExternalLink,
  BookOpen,
  Cpu,
  Network,
  Lock
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Docs = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: overviewRef, isVisible: overviewVisible } = useScrollReveal();
  const { ref: problemRef, isVisible: problemVisible } = useScrollReveal();
  const { ref: enginesRef, isVisible: enginesVisible } = useScrollReveal();
  const { ref: archRef, isVisible: archVisible } = useScrollReveal();
  const { ref: apiRef, isVisible: apiVisible } = useScrollReveal();
  const { ref: useCasesRef, isVisible: useCasesVisible } = useScrollReveal();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
  };

  const CodeBlock = ({ code, language = "bash" }: { code: string; language?: string }) => (
    <div className="relative group">
      <pre className="bg-secondary/80 p-4 rounded-lg overflow-x-auto border border-border/50">
        <code className="text-sm">{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => copyToClipboard(code)}
      >
        <Copy className="w-4 h-4" />
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-accent to-gold-light flex items-center justify-center shadow-lg">
                  <span className="text-primary-foreground font-bold text-lg">⚡</span>
                </div>
                <span className="text-xl font-bold hidden sm:block">
                  Sentinel<span className="text-gradient-gold">-X</span>
                </span>
              </Link>
              <div className="h-6 w-px bg-border hidden sm:block" />
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-xl sm:text-2xl font-bold">Documentation</h1>
            </div>
            <Link to="/app">
              <Button variant="default">
                Try Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div 
        ref={heroRef}
        className={`py-16 sm:py-20 border-b border-border/30 bg-gradient-to-b from-primary/5 to-transparent transition-all duration-700 ${
          heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Complete Documentation
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Sentinel<span className="text-gradient-gold">-X</span> Docs
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Everything you need to know about the AI-Enhanced Real-Time Data Inference Indexer 
            for the Celo blockchain. From architecture to API reference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <a href="#quick-start">Quick Start</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#api-reference">API Reference</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12">
        <div className="max-w-6xl mx-auto space-y-20">
          
          {/* Overview Section */}
          <section 
            ref={overviewRef}
            id="overview"
            className={`transition-all duration-700 ${
              overviewVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">What is Sentinel-X?</h2>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-muted-foreground mb-6">
                Sentinel-X is an <strong className="text-foreground">AI-Enhanced Real-Time Data Inference Indexer</strong> built 
                specifically for the Celo blockchain. It sits between raw blockchain data and AI Agents, transforming 
                raw numbers into actionable intelligence.
              </p>
              
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-6 rounded-xl border border-primary/20 mb-8">
                <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  The 24/7 News Analyst Analogy
                </h4>
                <p className="text-muted-foreground">
                  Think of Sentinel-X as a 24/7 News Analyst for blockchain data. While traditional indexers 
                  are like a library where you find books and draw your own conclusions, Sentinel-X actively 
                  reads every piece of data as it arrives, connects it with off-chain context (Twitter, governance 
                  forums, news), and instantly delivers <strong className="text-foreground">conclusions, not just data</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Code, title: "REST & GraphQL API", desc: "Simple HTTP endpoints and flexible queries for blockchain data and AI insights" },
                  { icon: Zap, title: "Real-Time Streaming", desc: "WebSocket subscriptions for live inference updates with sub-second latency" },
                  { icon: Terminal, title: "AI-Powered Analysis", desc: "Celo-optimized LLM for intelligent blockchain understanding" },
                ].map((item, i) => (
                  <Card key={i} className="bg-card/50 border-border/50" style={getStaggerDelay(i)}>
                    <CardHeader>
                      <item.icon className="w-8 h-8 text-primary mb-2" />
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* The Problem Section */}
          <section 
            ref={problemRef}
            id="problem"
            className={`transition-all duration-700 ${
              problemVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <h2 className="text-3xl font-bold">The Problem We Solve</h2>
            </div>

            <p className="text-lg text-muted-foreground mb-8">
              AI Agents are the future of blockchain interaction, but they're blind to on-chain data.
              Current solutions fail in three critical ways:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Eye,
                  title: "Data Blindness",
                  desc: "Existing LLMs like GPT-4 are trained on historical data (pre-2023). They have no idea what's happening on Celo right now. Ask about a new DeFi pool or token contract, and they hallucinate.",
                  color: "text-red-400",
                  bg: "from-red-500/10 to-red-500/5"
                },
                {
                  icon: Clock,
                  title: "Latency",
                  desc: "Traditional indexers like The Graph are designed for data retrieval, not intelligence. An AI agent using them must query data, wait, then run its own slow inference loop.",
                  color: "text-yellow-400",
                  bg: "from-yellow-500/10 to-yellow-500/5"
                },
                {
                  icon: AlertTriangle,
                  title: "Hallucinations",
                  desc: "Without grounding in real-time, verified data, AI agents make dangerous errors. A trading bot might execute based on a non-existent token, or a security agent might miss a live exploit.",
                  color: "text-orange-400",
                  bg: "from-orange-500/10 to-orange-500/5"
                }
              ].map((problem, i) => (
                <Card key={i} className={`bg-gradient-to-br ${problem.bg} border-border/50`} style={getStaggerDelay(i)}>
                  <CardHeader>
                    <problem.icon className={`w-10 h-10 ${problem.color} mb-2`} />
                    <CardTitle>{problem.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{problem.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Two Engines Section */}
          <section 
            ref={enginesRef}
            id="engines"
            className={`transition-all duration-700 ${
              enginesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-3xl font-bold">The Two Engines</h2>
            </div>

            <p className="text-lg text-muted-foreground mb-8">
              Sentinel-X solves these problems with two complementary engines working in harmony:
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Engine A */}
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-primary/20 text-primary border-primary/30">Engine A</Badge>
                  <div className="flex items-center gap-3">
                    <Database className="w-10 h-10 text-primary" />
                    <div>
                      <CardTitle className="text-xl">High-Throughput Indexer</CardTitle>
                      <CardDescription>The Body</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    A Rust-based data ingestion pipeline that connects directly to Celo's L2 sequencer 
                    for minimal latency, ingesting both on-chain and off-chain data.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Data Sources:</h4>
                    <ul className="space-y-1">
                      {[
                        "Celo L2 block data via Sequencer",
                        "Mempool transactions",
                        "Smart contract events & state changes",
                        "Twitter/X sentiment analysis",
                        "Governance forums & Discord",
                        "News feeds & announcements"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Engine B */}
              <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-accent/20 text-accent border-accent/30">Engine B</Badge>
                  <div className="flex items-center gap-3">
                    <Brain className="w-10 h-10 text-accent" />
                    <div>
                      <CardTitle className="text-xl">Celo-Fine-Tuned LLM</CardTitle>
                      <CardDescription>The Brain</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    A specialized Large Language Model fine-tuned specifically on Celo's ecosystem 
                    for accurate, contextual blockchain intelligence.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Training Data (50GB+):</h4>
                    <ul className="space-y-1">
                      {[
                        "Celo developer documentation",
                        "1M+ verified smart contracts",
                        "Historical transaction patterns",
                        "cUSD/cEUR stablecoin logic",
                        "Epoch rewards & validator data",
                        "OP Stack architecture"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Technical Architecture */}
          <section 
            ref={archRef}
            id="architecture"
            className={`transition-all duration-700 ${
              archVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gold-light/10 flex items-center justify-center">
                <Layers className="w-5 h-5 text-gold-light" />
              </div>
              <h2 className="text-3xl font-bold">Technical Architecture</h2>
            </div>

            <p className="text-lg text-muted-foreground mb-8">
              Sentinel-X is built on a four-layer architecture, each optimized for its specific function:
            </p>

            <div className="space-y-4">
              {[
                {
                  layer: "Layer 1",
                  title: "The Ingestion Pipe",
                  tech: "Rust-based",
                  icon: Network,
                  desc: "Connects directly to Celo's Sequencer for raw block data. Uses 'Optimistic Parsing' to begin parsing before blocks are finalized, correcting only on reorgs.",
                  color: "primary"
                },
                {
                  layer: "Layer 2",
                  title: "The Inference Engine",
                  tech: "Python/PyTorch",
                  icon: Brain,
                  desc: "Hosts our fine-tuned Llama-3-8b model (Celo-7B). Combines real-time on-chain data with off-chain context for grounded AI responses.",
                  color: "accent"
                },
                {
                  layer: "Layer 3",
                  title: "The Verification Layer",
                  tech: "zk-ML",
                  icon: Shield,
                  desc: "Generates cryptographic proofs that the AI model was run correctly on specific data. Proofs are posted on-chain for trustless verification.",
                  color: "gold-light"
                },
                {
                  layer: "Layer 4",
                  title: "The Delivery API",
                  tech: "GraphQL + WebSockets",
                  icon: Globe,
                  desc: "Exposes all data and inferences through GraphQL queries, REST endpoints, and real-time WebSocket subscriptions.",
                  color: "cyan-light"
                }
              ].map((layer, i) => (
                <Card 
                  key={i} 
                  className={`bg-card/50 border-${layer.color}/30 hover:border-${layer.color}/50 transition-colors`}
                  style={getStaggerDelay(i)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg bg-${layer.color}/10 flex items-center justify-center shrink-0`}>
                        <layer.icon className={`w-6 h-6 text-${layer.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">{layer.layer}</Badge>
                          <h3 className="font-bold text-lg">{layer.title}</h3>
                          <Badge className="text-xs bg-secondary">{layer.tech}</Badge>
                        </div>
                        <p className="text-muted-foreground">{layer.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* API Reference */}
          <section 
            ref={apiRef}
            id="api-reference"
            className={`transition-all duration-700 ${
              apiVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Code className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-3xl font-bold" id="quick-start">API Reference</h2>
            </div>

            <Tabs defaultValue="rest" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="rest">REST API</TabsTrigger>
                <TabsTrigger value="graphql">GraphQL</TabsTrigger>
                <TabsTrigger value="websocket">WebSocket</TabsTrigger>
              </TabsList>

              <TabsContent value="rest" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Blockchain Endpoints</CardTitle>
                    <CardDescription>Access real-time Celo blockchain data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs bg-green-500/10 text-green-400 border-green-500/30">GET</Badge>
                        <code className="text-sm">/api/blocks</code>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Get latest blocks from Celo mainnet</p>
                      <CodeBlock code={`curl http://localhost:3000/api/blocks?limit=10`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs bg-green-500/10 text-green-400 border-green-500/30">GET</Badge>
                        <code className="text-sm">/api/transactions</code>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Get recent transactions</p>
                      <CodeBlock code={`curl http://localhost:3000/api/transactions?limit=20`} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>AI Endpoints</CardTitle>
                    <CardDescription>AI-powered blockchain analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/30">POST</Badge>
                        <code className="text-sm">/api/ai/query</code>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Query the AI with blockchain context</p>
                      <CodeBlock code={`curl -X POST http://localhost:3000/api/ai/query \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "Analyze the latest DeFi activity on Celo"}'`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/30">POST</Badge>
                        <code className="text-sm">/api/ai/contract/analyze</code>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Analyze smart contract for vulnerabilities</p>
                      <CodeBlock code={`curl -X POST http://localhost:3000/api/ai/contract/analyze \\
  -H "Content-Type: application/json" \\
  -d '{"address": "0x..."}'`} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="graphql" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>GraphQL Endpoint</CardTitle>
                    <CardDescription>Flexible queries for complex data needs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Query blocks with transactions</p>
                      <CodeBlock code={`query {
  blocks(limit: 5) {
    number
    hash
    timestamp
    transactions {
      hash
      from
      to
      value
    }
  }
}`} language="graphql" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Get AI inference with context</p>
                      <CodeBlock code={`query {
  inference(
    prompt: "What are the top DeFi protocols on Celo?"
    includeContext: true
  ) {
    response
    confidence
    sources
    latencyMs
  }
}`} language="graphql" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="websocket" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Real-Time Subscriptions</CardTitle>
                    <CardDescription>Stream live data via WebSocket</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Subscribe to live inferences</p>
                      <CodeBlock code={`const ws = new WebSocket('wss://api.sentinelx.io/ws');

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'subscribe',
    channel: 'inferences',
    filters: {
      minConfidence: 0.9,
      types: ['security_alert', 'trade_signal']
    }
  }));
};

ws.onmessage = (event) => {
  const inference = JSON.parse(event.data);
  console.log('New inference:', inference);
};`} language="javascript" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>

          {/* Use Cases */}
          <section 
            ref={useCasesRef}
            id="use-cases"
            className={`transition-all duration-700 ${
              useCasesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-3xl font-bold">Use Cases</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "AI Hedge Funds",
                  desc: "Deploy trading bots that react to market conditions with AI-driven insights. Get real-time trade signals with confidence scores.",
                  features: ["Real-time trade signals", "Risk assessment", "Portfolio optimization"]
                },
                {
                  title: "Security Agents",
                  desc: "Automatically detect vulnerabilities and exploits in smart contracts. Get instant alerts for suspicious activity.",
                  features: ["Contract auditing", "Exploit detection", "Vulnerability scoring"]
                },
                {
                  title: "Compliance Tools",
                  desc: "Monitor wallet interactions and tag addresses for regulatory compliance. Generate automated reports.",
                  features: ["Wallet tagging", "Transaction monitoring", "Compliance reports"]
                }
              ].map((useCase, i) => (
                <Card key={i} className="bg-card/50 border-border/50" style={getStaggerDelay(i)}>
                  <CardHeader>
                    <CardTitle>{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{useCase.desc}</p>
                    <ul className="space-y-2">
                      {useCase.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* SDKs */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Terminal className="w-5 h-5" />
              </div>
              <h2 className="text-3xl font-bold">Official SDKs</h2>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Use our official libraries for easier integration
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "TypeScript/JavaScript", cmd: "npm install @sentinel-x/sdk", status: "Coming Q2 2026" },
                { name: "Python", cmd: "pip install sentinel-x", status: "Coming Q2 2026" },
                { name: "Rust", cmd: "cargo add sentinel-x", status: "Coming Q3 2026" }
              ].map((sdk, i) => (
                <Card key={i} className="bg-card/50">
                  <CardHeader>
                    <CardTitle className="text-lg">{sdk.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock code={sdk.cmd} />
                    <Badge variant="outline" className="mt-3 text-xs">{sdk.status}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Resources */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <ExternalLink className="w-5 h-5" />
              </div>
              <h2 className="text-3xl font-bold">Resources</h2>
            </div>
            
            <div className="space-y-4">
              <Card className="bg-card/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h3 className="font-semibold">GitHub Repository</h3>
                      <p className="text-sm text-muted-foreground">View source code and contribute</p>
                    </div>
                    <Button variant="outline" asChild>
                      <a href="https://github.com/sentinel-x" target="_blank" rel="noopener noreferrer">
                        View on GitHub
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h3 className="font-semibold">Discord Community</h3>
                      <p className="text-sm text-muted-foreground">Join our developer community</p>
                    </div>
                    <Button variant="outline" asChild>
                      <a href="https://discord.gg/sentinelx" target="_blank" rel="noopener noreferrer">
                        Join Discord
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
      <MobileNav />
    </div>
  );
};

export default Docs;