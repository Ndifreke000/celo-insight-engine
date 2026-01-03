import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";

const DeveloperAPI = () => {
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  const apiEndpoints = [
    {
      category: "AI Engine",
      endpoints: [
        {
          method: "POST",
          path: "/api/ai/query",
          description: "Query Celo-7B AI model",
          example: `curl -X POST http://localhost:3000/api/ai/query \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Explain Celo stability mechanism",
    "task_type": "GeneralQuery"
  }'`,
        },
        {
          method: "POST",
          path: "/api/ai/contract/analyze",
          description: "Analyze smart contract",
          example: `curl -X POST http://localhost:3000/api/ai/contract/analyze \\
  -H "Content-Type: application/json" \\
  -d '{"contract_address": "0x..."}'`,
        },
        {
          method: "POST",
          path: "/api/ai/security/audit",
          description: "Security audit for smart contracts",
          example: `curl -X POST http://localhost:3000/api/ai/security/audit \\
  -H "Content-Type: application/json" \\
  -d '{"code": "contract MyToken { ... }"}'`,
        },
        {
          method: "POST",
          path: "/api/ai/price/predict",
          description: "AI-powered price predictions",
          example: `curl -X POST http://localhost:3000/api/ai/price/predict \\
  -H "Content-Type: application/json" \\
  -d '{"asset": "CELO"}'`,
        },
      ],
    },
    {
      category: "Real-Time Indexer",
      endpoints: [
        {
          method: "GET",
          path: "/api/indexer/metrics",
          description: "Get indexer performance metrics",
          example: `curl http://localhost:3000/api/indexer/metrics`,
        },
        {
          method: "POST",
          path: "/api/indexer/ingest",
          description: "Ingest new data feed",
          example: `curl -X POST http://localhost:3000/api/indexer/ingest \\
  -H "Content-Type: application/json" \\
  -d '{
    "feed_id": "feed_123",
    "source": {"OnChain": "0x..."},
    "data_type": "Transaction",
    "timestamp": 1704067200,
    "raw_data": {...}
  }'`,
        },
        {
          method: "GET",
          path: "/api/indexer/feeds",
          description: "Get processed data feeds",
          example: `curl "http://localhost:3000/api/indexer/feeds?limit=10"`,
        },
      ],
    },
    {
      category: "Blockchain Data",
      endpoints: [
        {
          method: "GET",
          path: "/api/blocks",
          description: "Get recent blocks",
          example: `curl "http://localhost:3000/api/blocks?limit=5"`,
        },
        {
          method: "GET",
          path: "/api/blocks/:number",
          description: "Get specific block",
          example: `curl http://localhost:3000/api/blocks/1000000`,
        },
        {
          method: "GET",
          path: "/api/transactions",
          description: "Get recent transactions",
          example: `curl "http://localhost:3000/api/transactions?limit=10"`,
        },
      ],
    },
  ];

  return (
    <section id="api" className="py-16 sm:py-24 relative bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm text-primary font-medium tracking-wider uppercase mb-3 sm:mb-4 block">
            For Developers
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Public <span className="text-gradient-gold">API Access</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Integrate Sentinel-X AI and blockchain intelligence into your applications.
            Free tier available for developers.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Quick Start */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Quick Start
              </CardTitle>
              <CardDescription>
                Get started with the Sentinel-X API in minutes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                  <div className="text-2xl font-bold text-primary mb-2">1</div>
                  <h4 className="font-medium mb-1">Base URL</h4>
                  <code className="text-xs text-muted-foreground">
                    http://localhost:3000/api
                  </code>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                  <div className="text-2xl font-bold text-accent mb-2">2</div>
                  <h4 className="font-medium mb-1">Authentication</h4>
                  <p className="text-xs text-muted-foreground">
                    Currently open (API keys coming soon)
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                  <div className="text-2xl font-bold text-foreground mb-2">3</div>
                  <h4 className="font-medium mb-1">Rate Limits</h4>
                  <p className="text-xs text-muted-foreground">
                    100 req/min (standard tier)
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="hero" asChild>
                  <a href="https://github.com/yourusername/sentinel-x" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Full Docs
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/api/health" target="_blank" rel="noopener noreferrer">
                    Test API
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* API Endpoints */}
          {apiEndpoints.map((category, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{category.category}</CardTitle>
                <CardDescription>
                  {category.endpoints.length} endpoints available
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {category.endpoints.map((endpoint, endpointIdx) => (
                  <div key={endpointIdx} className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            endpoint.method === "GET" 
                              ? "bg-blue-500/20 text-blue-400" 
                              : "bg-green-500/20 text-green-400"
                          }`}>
                            {endpoint.method}
                          </span>
                          <code className="text-sm text-foreground">
                            {endpoint.path}
                          </code>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {endpoint.description}
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <pre className="p-4 rounded-lg bg-black/50 border border-border/30 overflow-x-auto text-xs">
                        <code className="text-green-400">{endpoint.example}</code>
                      </pre>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(endpoint.example, `${idx}-${endpointIdx}`)}
                      >
                        {copied === `${idx}-${endpointIdx}` ? (
                          "Copied!"
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          {/* SDKs */}
          <Card>
            <CardHeader>
              <CardTitle>Official SDKs</CardTitle>
              <CardDescription>
                Use our official libraries for easier integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                  <h4 className="font-medium mb-2">TypeScript/JavaScript</h4>
                  <code className="text-xs text-muted-foreground block mb-3">
                    npm install @sentinel-x/sdk
                  </code>
                  <Button size="sm" variant="outline" className="w-full">
                    Coming Soon
                  </Button>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                  <h4 className="font-medium mb-2">Python</h4>
                  <code className="text-xs text-muted-foreground block mb-3">
                    pip install sentinel-x
                  </code>
                  <Button size="sm" variant="outline" className="w-full">
                    Coming Soon
                  </Button>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                  <h4 className="font-medium mb-2">Rust</h4>
                  <code className="text-xs text-muted-foreground block mb-3">
                    cargo add sentinel-x
                  </code>
                  <Button size="sm" variant="outline" className="w-full">
                    Coming Soon
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DeveloperAPI;
