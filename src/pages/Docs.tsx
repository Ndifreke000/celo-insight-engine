import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code, Terminal, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Docs = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
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

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Introduction */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Getting Started</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Sentinel-X is an AI-Enhanced Real-Time Data Inference Indexer for Celo blockchain.
              Access real-time blockchain data, AI-powered insights, and smart contract analysis.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <Code className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-lg">REST API</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Simple HTTP endpoints for blockchain data and AI queries
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="w-8 h-8 text-accent mb-2" />
                  <CardTitle className="text-lg">Real-Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Live data from Celo mainnet with sub-second latency
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Terminal className="w-8 h-8 text-gold-light mb-2" />
                  <CardTitle className="text-lg">AI-Powered</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    DeepSeek AI for intelligent blockchain analysis
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Quick Start */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Quick Start</h2>
            <Card>
              <CardHeader>
                <CardTitle>1. Get Latest Blocks</CardTitle>
                <CardDescription>Fetch real-time Celo blockchain blocks</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                  <code>{`curl http://localhost:3000/api/blocks?limit=10`}</code>
                </pre>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>2. Query AI</CardTitle>
                <CardDescription>Ask questions about Celo blockchain</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-secondary p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`curl -X POST http://localhost:3000/api/ai/query \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "What is Celo?",
    "task_type": "GeneralQuery"
  }'`}</code>
                </pre>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>3. Get Price Data</CardTitle>
                <CardDescription>Real-time CELO price from CoinGecko</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                  <code>{`curl http://localhost:3000/api/price/celo`}</code>
                </pre>
              </CardContent>
            </Card>
          </section>

          {/* API Reference */}
          <section>
            <h2 className="text-3xl font-bold mb-4">API Reference</h2>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Blockchain Endpoints</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <code className="text-sm bg-secondary px-2 py-1 rounded">GET /api/blocks</code>
                    <p className="text-sm text-muted-foreground mt-2">Get latest blocks from Celo mainnet</p>
                  </div>
                  <div>
                    <code className="text-sm bg-secondary px-2 py-1 rounded">GET /api/blocks/:number</code>
                    <p className="text-sm text-muted-foreground mt-2">Get specific block by number</p>
                  </div>
                  <div>
                    <code className="text-sm bg-secondary px-2 py-1 rounded">GET /api/transactions</code>
                    <p className="text-sm text-muted-foreground mt-2">Get recent transactions</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Endpoints</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <code className="text-sm bg-secondary px-2 py-1 rounded">POST /api/ai/query</code>
                    <p className="text-sm text-muted-foreground mt-2">Query AI with blockchain context</p>
                  </div>
                  <div>
                    <code className="text-sm bg-secondary px-2 py-1 rounded">POST /api/ai/contract/analyze</code>
                    <p className="text-sm text-muted-foreground mt-2">Analyze smart contracts</p>
                  </div>
                  <div>
                    <code className="text-sm bg-secondary px-2 py-1 rounded">POST /api/ai/price/predict</code>
                    <p className="text-sm text-muted-foreground mt-2">AI-powered price predictions</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Price Data</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <code className="text-sm bg-secondary px-2 py-1 rounded">GET /api/price/:asset</code>
                    <p className="text-sm text-muted-foreground mt-2">Get real-time price (CELO, cUSD, cEUR)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* SDKs */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Official SDKs</h2>
            <p className="text-muted-foreground mb-6">
              Use our official libraries for easier integration (Coming Soon)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>TypeScript/JavaScript</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-secondary p-3 rounded text-sm">
                    <code>npm install @sentinel-x/sdk</code>
                  </pre>
                  <p className="text-xs text-muted-foreground mt-2">Coming Soon</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Python</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-secondary p-3 rounded text-sm">
                    <code>pip install sentinel-x</code>
                  </pre>
                  <p className="text-xs text-muted-foreground mt-2">Coming Soon</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Rust</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-secondary p-3 rounded text-sm">
                    <code>cargo add sentinel-x</code>
                  </pre>
                  <p className="text-xs text-muted-foreground mt-2">Coming Soon</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Resources */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Resources</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">GitHub Repository</h3>
                      <p className="text-sm text-muted-foreground">View source code and contribute</p>
                    </div>
                    <Button variant="outline" asChild>
                      <a href="https://github.com/yourusername/celo-insight-engine" target="_blank" rel="noopener noreferrer">
                        View on GitHub
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">API Health Check</h3>
                      <p className="text-sm text-muted-foreground">Test if the API is running</p>
                    </div>
                    <Button variant="outline" asChild>
                      <a href="http://localhost:3000/api/health" target="_blank" rel="noopener noreferrer">
                        Test API
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Docs;
