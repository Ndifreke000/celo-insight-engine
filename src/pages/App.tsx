import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, Search, Shield, TrendingUp, Activity, ArrowLeft, 
  Zap, Database, Lock, Globe, Cpu, BarChart3, Sparkles,
  ArrowUpRight, ArrowDownRight, Clock, CheckCircle2
} from "lucide-react";
import * as api from "@/lib/api";
import { Link } from "react-router-dom";
import HelpDialog from "@/components/HelpDialog";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
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

  // Stats - Real data from backend
  const [stats, setStats] = useState({
    totalInferences: 0,
    activeConnections: 0,
    avgLatency: 0,
    successRate: 99.7,
  });
  const [metrics, setMetrics] = useState<any>(null);

  // Helper function to format timestamp correctly
  const formatTimestamp = (timestamp: number) => {
    // If timestamp is in seconds (< 10 billion), convert to milliseconds
    // If already in milliseconds (> 10 billion), use as-is
    const ms = timestamp < 10000000000 ? timestamp * 1000 : timestamp;
    return new Date(ms).toLocaleString();
  };

  useEffect(() => {
    fetchHealth();
    fetchBlocks();
    fetchMetrics();
    
    const interval = setInterval(() => {
      fetchHealth();
      fetchMetrics();
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchMetrics = async () => {
    try {
      const data = await api.getIndexerMetrics();
      setMetrics(data);
      
      // Update stats from real metrics
      setStats(prev => ({
        totalInferences: data.total_feeds_processed || prev.totalInferences,
        activeConnections: data.active_feeds || prev.activeConnections,
        avgLatency: Math.round(data.average_latency_ms || prev.avgLatency),
        successRate: 99.7, // Keep this static for now
      }));
    } catch (error) {
      console.error("Failed to fetch metrics:", error);
    }
  };

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
      const data = await api.getBlocks(5);
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
      const response = await api.runInference({
        model: "celo-7b",
        input: aiPrompt,
      });
      setAiResponse(response);
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
      const realPrice = await api.getPriceData(priceAsset);
      setPriceData(realPrice);
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
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-gold-light/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-accent to-gold-light flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
                  <Zap className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold hidden sm:block">
                  Sentinel<span className="text-gradient-gold">-X</span>
                </span>
              </Link>
              <div className="h-6 w-px bg-border hidden sm:block" />
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <HelpDialog />
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium">{health?.status === "ok" ? "System Online" : "Connecting..."}</span>
              </div>
              <Badge variant="outline" className="hidden md:flex bg-secondary/50">
                <Brain className="w-3 h-3 mr-1" />
                {health?.ai_model?.model_name || "Celo-7B"}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-8 relative z-10">
        {/* Hero Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Inferences", value: stats.totalInferences.toLocaleString(), icon: Brain, change: "+12.5%", positive: true, color: "from-primary/20 to-primary/5" },
            { label: "Active Connections", value: stats.activeConnections.toLocaleString(), icon: Globe, change: "+8.2%", positive: true, color: "from-accent/20 to-accent/5" },
            { label: "Avg Latency", value: `${stats.avgLatency}ms`, icon: Zap, change: "-5.3%", positive: true, color: "from-gold-light/20 to-gold-light/5" },
            { label: "Success Rate", value: `${stats.successRate}%`, icon: CheckCircle2, change: "+0.2%", positive: true, color: "from-green-500/20 to-green-500/5" },
          ].map((stat, index) => (
            <Card key={index} className={`relative overflow-hidden border-border/50 bg-gradient-to-br ${stat.color} backdrop-blur-sm hover:scale-[1.02] transition-transform cursor-default`}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className={`flex items-center mt-2 text-xs ${stat.positive ? "text-green-500" : "text-red-500"}`}>
                  {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  <span>{stat.change} from last hour</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto bg-secondary/50 backdrop-blur">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BarChart3 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="explorer" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Search className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Explorer</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Brain className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">AI Query</span>
            </TabsTrigger>
            <TabsTrigger value="contract" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Shield className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Audit</span>
            </TabsTrigger>
            <TabsTrigger value="price" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Predict</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Activity Feed */}
              <Card className="lg:col-span-2 border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Live Inference Feed
                  </CardTitle>
                  <CardDescription>Real-time AI inferences from the network</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { type: "Security Alert", confidence: 94, action: "Flagged suspicious contract", time: "2s ago", icon: Shield, color: "text-red-400" },
                    { type: "Trade Signal", confidence: 87, action: "Bullish sentiment detected", time: "15s ago", icon: TrendingUp, color: "text-green-400" },
                    { type: "Contract Analysis", confidence: 92, action: "Verified safe deployment", time: "32s ago", icon: CheckCircle2, color: "text-accent" },
                    { type: "Whale Alert", confidence: 89, action: "Large CELO accumulation", time: "1m ago", icon: Sparkles, color: "text-gold-light" },
                    { type: "Risk Assessment", confidence: 96, action: "Low-risk DeFi interaction", time: "2m ago", icon: Lock, color: "text-primary" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center ${item.color}`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{item.type}</span>
                          <Badge variant="outline" className="text-xs">{item.confidence}%</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{item.action}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* System Status */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-accent" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Indexer", status: "Operational", color: "bg-green-500" },
                    { label: "Inference Engine", status: "Operational", color: "bg-green-500" },
                    { label: "zkML Prover", status: "Operational", color: "bg-green-500" },
                    { label: "API Gateway", status: "Operational", color: "bg-green-500" },
                  ].map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                      <span className="text-sm">{service.label}</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${service.color} animate-pulse`} />
                        <span className="text-xs text-muted-foreground">{service.status}</span>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-border/50">
                    <h4 className="text-sm font-medium mb-3">Latest Blocks</h4>
                    {blocks.slice(0, 3).map((block, i) => (
                      <div key={i} className="flex items-center justify-between py-2 text-xs">
                        <span className="font-mono text-primary">#{block.block_number || block.number}</span>
                        <span className="text-muted-foreground">{block.transaction_count} txs</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Explorer Tab */}
          <TabsContent value="explorer" className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" />
                  Celo Blockchain Explorer
                </CardTitle>
                <CardDescription>Search and explore real-time Celo blockchain data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Input
                    placeholder="Enter block number..."
                    value={blockNumber}
                    onChange={(e) => setBlockNumber(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchBlock()}
                    className="flex-1 min-w-[200px] bg-secondary/50"
                  />
                  <Button onClick={searchBlock} disabled={loading} className="bg-primary hover:bg-primary/90">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                  <Button onClick={fetchBlocks} variant="outline" disabled={loading}>
                    Latest Blocks
                  </Button>
                  <Button onClick={fetchTransactions} variant="outline" disabled={loading}>
                    Transactions
                  </Button>
                </div>

                {loading && (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center gap-2 text-muted-foreground">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      Loading...
                    </div>
                  </div>
                )}

                {blocks.length > 0 && !loading && (
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Database className="w-4 h-4 text-primary" />
                      Blocks
                    </h3>
                    {blocks.map((block, i) => (
                      <Card key={i} className="bg-secondary/20 border-border/30 hover:border-primary/30 transition-colors">
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Block:</span>
                              <span className="ml-2 font-mono text-primary">{block.block_number || block.number}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Transactions:</span>
                              <span className="ml-2 font-bold">{block.transaction_count}</span>
                            </div>
                            <div className="col-span-2">
                              <span className="text-muted-foreground">Hash:</span>
                              <span className="ml-2 font-mono text-xs break-all text-accent">{block.block_hash || block.hash}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Gas Used:</span>
                              <span className="ml-2">{block.gas_used?.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Timestamp:</span>
                              <span className="ml-2">{formatTimestamp(block.timestamp)}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {transactions.length > 0 && !loading && (
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Activity className="w-4 h-4 text-accent" />
                      Transactions
                    </h3>
                    {transactions.map((tx, i) => (
                      <Card key={i} className="bg-secondary/20 border-border/30 hover:border-accent/30 transition-colors">
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="col-span-2">
                              <span className="text-muted-foreground">Hash:</span>
                              <span className="ml-2 font-mono text-xs break-all text-accent">{tx.tx_hash}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Block:</span>
                              <span className="ml-2 font-mono text-primary">{tx.block_number}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Value:</span>
                              <span className="ml-2 font-bold">{(parseInt(tx.value) / 1e18).toFixed(4)} CELO</span>
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

          {/* AI Query Tab */}
          <TabsContent value="ai" className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-accent" />
                  AI Query Engine
                </CardTitle>
                <CardDescription>Ask questions about Celo blockchain, smart contracts, or DeFi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Ask anything about Celo... (e.g., 'Explain how Celo's stability mechanism works')"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  rows={4}
                  className="bg-secondary/50 resize-none"
                />
                <Button onClick={runAIQuery} disabled={loading} className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Run AI Query
                </Button>

                {aiResponse && (
                  <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                    <CardContent className="pt-6 space-y-4">
                      <div>
                        <p className="text-sm leading-relaxed">{aiResponse.output}</p>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-primary" />
                          Confidence: {(aiResponse.confidence * 100).toFixed(0)}%
                        </span>
                        {aiResponse.verifiable && (
                          <Badge variant="outline" className="text-xs bg-primary/10">
                            <Lock className="w-3 h-3 mr-1" />
                            zkML Verified
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contract Analysis Tab */}
          <TabsContent value="contract" className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gold-light" />
                  Smart Contract Analyzer
                </CardTitle>
                <CardDescription>Analyze and audit Celo smart contracts with AI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Enter contract address (0x...)"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  className="bg-secondary/50"
                />
                <Button onClick={analyzeContract} disabled={loading} className="w-full bg-gradient-to-r from-gold-light to-primary hover:opacity-90">
                  <Shield className="w-4 h-4 mr-2" />
                  Analyze Contract
                </Button>

                {contractAnalysis && (
                  <div className="space-y-4">
                    <Card className="bg-secondary/20 border-border/30">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Brain className="w-4 h-4 text-primary" />
                          Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{contractAnalysis.explanation}</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-red-500/10 border-red-500/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2 text-red-400">
                          <Shield className="w-4 h-4" />
                          Security Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-2">
                          {contractAnalysis.security_analysis?.map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-accent/10 border-accent/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2 text-accent">
                          <Zap className="w-4 h-4" />
                          Gas Optimization Tips
                        </CardTitle>
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

          {/* Price Prediction Tab */}
          <TabsContent value="price" className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  AI Price Prediction
                </CardTitle>
                <CardDescription>Get AI-powered price predictions for Celo assets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Asset symbol (e.g., CELO, cUSD)"
                  value={priceAsset}
                  onChange={(e) => setPriceAsset(e.target.value)}
                  className="bg-secondary/50"
                />
                <Button onClick={predictPrice} disabled={loading} className="w-full bg-gradient-to-r from-green-500 to-accent hover:opacity-90">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Predict Price
                </Button>

                {priceData && (
                  <Card className="bg-gradient-to-br from-green-500/10 to-accent/10 border-green-500/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Current Market Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-xs text-muted-foreground">Price</span>
                          <p className="text-2xl font-bold text-green-500">${priceData.price_usd?.toFixed(4)}</p>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">24h Change</span>
                          <p className={`text-lg font-bold ${priceData.price_change_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                            {priceData.price_change_24h >= 0 ? "+" : ""}{priceData.price_change_24h?.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {pricePrediction && (
                  <Card className="bg-secondary/20 border-border/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Brain className="w-4 h-4 text-primary" />
                        AI Prediction
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{pricePrediction.output}</p>
                      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <Lock className="w-3 h-3" />
                        Confidence: {(pricePrediction.confidence * 100).toFixed(0)}%
                      </div>
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

export default Dashboard;
