import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Brain, Search, Shield, TrendingUp, Activity, ArrowLeft } from "lucide-react";
import * as api from "@/lib/api";
import { Link } from "react-router-dom";
import HelpDialog from "@/components/HelpDialog";

const App = () => {
  const [activeTab, setActiveTab] = useState("blocks");
  const [loading, setLoading] = useState(false);
  const [health, setHealth] = useState<any>(null);

  // Blockchain Explorer State
  const [blocks, setBlocks] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [blockNumber, setBlockNumber] = useState("");

  // AI Query State
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState<any>(null);

  // Contract Analysis State
  const [contractAddress, setContractAddress] = useState("");
  const [contractAnalysis, setContractAnalysis] = useState<any>(null);

  // Price Prediction State
  const [priceAsset, setPriceAsset] = useState("CELO");
  const [pricePrediction, setPricePrediction] = useState<any>(null);
  const [priceData, setPriceData] = useState<any>(null);

  useEffect(() => {
    fetchHealth();
    fetchBlocks();
    
    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      fetchHealth();
      if (activeTab === "blocks") {
        fetchBlocks();
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, [activeTab]);

  const fetchHealth = async () => {
    try {
      const data = await api.healthCheck();
      setHealth(data);
    } catch (error) {
      console.error("Failed to fetch health:", error);
    }
  };

  const fetchBlocks = async () => {
    setLoading(true);
    try {
      const data = await api.getBlocks(10);
      setBlocks(data.blocks || []);
    } catch (error) {
      console.error("Failed to fetch blocks:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const data = await api.getTransactions(10);
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchBlock = async () => {
    if (!blockNumber) return;
    setLoading(true);
    try {
      const data = await api.getBlock(parseInt(blockNumber));
      setBlocks([data.block]);
    } catch (error) {
      console.error("Failed to fetch block:", error);
    } finally {
      setLoading(false);
    }
  };

  const runAIQuery = async () => {
    if (!aiPrompt) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/ai/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiPrompt,
          task_type: "GeneralQuery",
          max_tokens: 500,
          temperature: 0.7
        })
      });
      const data = await response.json();
      setAiResponse(data);
    } catch (error) {
      console.error("Failed to run AI query:", error);
    } finally {
      setLoading(false);
    }
  };

  const analyzeContract = async () => {
    if (!contractAddress) return;
    setLoading(true);
    try {
      const data = await api.explainContract(contractAddress);
      setContractAnalysis(data);
    } catch (error) {
      console.error("Failed to analyze contract:", error);
    } finally {
      setLoading(false);
    }
  };

  const predictPrice = async () => {
    setLoading(true);
    try {
      // Fetch real price data first
      const realPrice = await api.getPriceData(priceAsset);
      setPriceData(realPrice);
      
      // Then get AI prediction
      const data = await api.predictPrice(priceAsset);
      setPricePrediction(data);
    } catch (error) {
      console.error("Failed to predict price:", error);
    } finally {
      setLoading(false);
    }
  };

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
              <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <HelpDialog />
              <Badge variant={health?.status === "ok" ? "default" : "destructive"}>
                <Activity className="w-3 h-3 mr-1" />
                {health?.status === "ok" ? "Online" : "Offline"}
              </Badge>
              <Badge variant="outline" className="hidden sm:flex">
                {health?.ai_model?.model_name || "Loading..."}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="blocks">
              <Search className="w-4 h-4 mr-2" />
              Explorer
            </TabsTrigger>
            <TabsTrigger value="ai">
              <Brain className="w-4 h-4 mr-2" />
              AI Query
            </TabsTrigger>
            <TabsTrigger value="contract">
              <Shield className="w-4 h-4 mr-2" />
              Contract
            </TabsTrigger>
            <TabsTrigger value="price">
              <TrendingUp className="w-4 h-4 mr-2" />
              Price
            </TabsTrigger>
          </TabsList>

          {/* Blockchain Explorer */}
          <TabsContent value="blocks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Celo Blockchain Explorer</CardTitle>
                <CardDescription>Search and explore real-time Celo blockchain data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter block number..."
                    value={blockNumber}
                    onChange={(e) => setBlockNumber(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchBlock()}
                  />
                  <Button onClick={searchBlock} disabled={loading}>
                    Search Block
                  </Button>
                  <Button onClick={fetchBlocks} variant="outline" disabled={loading}>
                    Latest Blocks
                  </Button>
                  <Button onClick={fetchTransactions} variant="outline" disabled={loading}>
                    Transactions
                  </Button>
                </div>

                {loading && <div className="text-center py-8">Loading...</div>}

                {blocks.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold">Blocks</h3>
                    {blocks.map((block, i) => (
                      <Card key={i} className="bg-secondary/20">
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Block:</span>
                              <span className="ml-2 font-mono">{block.block_number || block.number}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Transactions:</span>
                              <span className="ml-2">{block.transaction_count}</span>
                            </div>
                            <div className="col-span-2">
                              <span className="text-muted-foreground">Hash:</span>
                              <span className="ml-2 font-mono text-xs break-all">{block.block_hash || block.hash}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Gas Used:</span>
                              <span className="ml-2">{block.gas_used?.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Timestamp:</span>
                              <span className="ml-2">{new Date(block.timestamp * 1000).toLocaleString()}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {transactions.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold">Transactions</h3>
                    {transactions.map((tx, i) => (
                      <Card key={i} className="bg-secondary/20">
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="col-span-2">
                              <span className="text-muted-foreground">Hash:</span>
                              <span className="ml-2 font-mono text-xs break-all">{tx.tx_hash}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Block:</span>
                              <span className="ml-2">{tx.block_number}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Value:</span>
                              <span className="ml-2">{(parseInt(tx.value) / 1e18).toFixed(4)} CELO</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Query */}
          <TabsContent value="ai" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Query Engine</CardTitle>
                <CardDescription>Ask questions about Celo blockchain, smart contracts, or DeFi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Ask anything about Celo... (e.g., 'Explain how Celo's stability mechanism works')"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  rows={4}
                />
                <Button onClick={runAIQuery} disabled={loading} className="w-full">
                  <Brain className="w-4 h-4 mr-2" />
                  Run AI Query
                </Button>

                {aiResponse && (
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6 space-y-4">
                      <div>
                        <p className="text-sm leading-relaxed">{aiResponse.output}</p>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Confidence: {(aiResponse.confidence * 100).toFixed(0)}%</span>
                        {aiResponse.verifiable && <Badge variant="outline" className="text-xs">✓ Verifiable</Badge>}
                      </div>
                      {aiResponse.reasoning_steps && (
                        <div className="pt-3 border-t">
                          <p className="text-xs font-medium mb-2">Reasoning:</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {aiResponse.reasoning_steps.map((step: string, i: number) => (
                              <li key={i}>• {step}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contract Analysis */}
          <TabsContent value="contract" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Smart Contract Analyzer</CardTitle>
                <CardDescription>Analyze and audit Celo smart contracts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Enter contract address (0x...)"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                />
                <Button onClick={analyzeContract} disabled={loading} className="w-full">
                  <Shield className="w-4 h-4 mr-2" />
                  Analyze Contract
                </Button>

                {contractAnalysis && (
                  <div className="space-y-4">
                    <Card className="bg-secondary/20">
                      <CardHeader>
                        <CardTitle className="text-base">Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{contractAnalysis.explanation}</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-secondary/20">
                      <CardHeader>
                        <CardTitle className="text-base">Security Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-2">
                          {contractAnalysis.security_analysis?.map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-secondary/20">
                      <CardHeader>
                        <CardTitle className="text-base">Gas Optimization Tips</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-2">
                          {contractAnalysis.gas_optimization_tips?.map((tip: string, i: number) => (
                            <li key={i}>• {tip}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Price Prediction */}
          <TabsContent value="price" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Price Prediction</CardTitle>
                <CardDescription>Get AI-powered price predictions for Celo assets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Asset symbol (e.g., CELO, cUSD)"
                  value={priceAsset}
                  onChange={(e) => setPriceAsset(e.target.value)}
                />
                <Button onClick={predictPrice} disabled={loading} className="w-full">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Predict Price
                </Button>

                {priceData && (
                  <Card className="bg-secondary/20">
                    <CardHeader>
                      <CardTitle className="text-base">Current Market Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Price:</span>
                          <span className="ml-2 font-bold text-lg">${priceData.price_usd?.toFixed(4)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">24h Change:</span>
                          <span className={`ml-2 font-semibold ${priceData.change_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {priceData.change_24h?.toFixed(2)}%
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Market Cap:</span>
                          <span className="ml-2">${(priceData.market_cap / 1e6).toFixed(2)}M</span>
                        </div>
                        <div className="col-span-2">
                          <Badge variant="outline" className="text-xs">
                            Source: {priceData.source}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {pricePrediction && (
                  <Card className="bg-accent/5 border-accent/20">
                    <CardHeader>
                      <CardTitle className="text-base">AI Prediction</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm leading-relaxed">{pricePrediction.output}</p>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Confidence: {(pricePrediction.confidence * 100).toFixed(0)}%</span>
                        {pricePrediction.verifiable && <Badge variant="outline" className="text-xs">✓ On-chain Proof</Badge>}
                      </div>
                      {pricePrediction.reasoning_steps && (
                        <div className="pt-3 border-t">
                          <p className="text-xs font-medium mb-2">Analysis Steps:</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {pricePrediction.reasoning_steps.map((step: string, i: number) => (
                              <li key={i}>• {step}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default App;
