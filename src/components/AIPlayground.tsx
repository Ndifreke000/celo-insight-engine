import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Code, Shield, TrendingUp, Loader2 } from "lucide-react";
import * as api from "@/lib/api";

const AIPlayground = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [contractCode, setContractCode] = useState("");
  const [customQuery, setCustomQuery] = useState("");
  const [asset, setAsset] = useState("CELO");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleContractAnalysis = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await api.explainContract(contractAddress);
      setResult(response);
    } catch (error) {
      setResult({ error: "Failed to analyze contract" });
    } finally {
      setLoading(false);
    }
  };

  const handleSecurityAudit = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await api.securityAudit(contractCode);
      setResult(response);
    } catch (error) {
      setResult({ error: "Failed to audit contract" });
    } finally {
      setLoading(false);
    }
  };

  const handlePricePrediction = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await api.predictPrice(asset);
      setResult(response);
    } catch (error) {
      setResult({ error: "Failed to predict price" });
    } finally {
      setLoading(false);
    }
  };

  const handleCustomQuery = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await api.runInference({
        model: "celo-7b",
        input: customQuery,
        task_type: "GeneralQuery",
      });
      setResult(response);
    } catch (error) {
      setResult({ error: "Failed to process query" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="playground" className="py-16 sm:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm text-primary font-medium tracking-wider uppercase mb-3 sm:mb-4 block">
            Interactive Demo
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Try <span className="text-gradient-gold">Celo-7B</span> AI
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the power of our AI-enhanced blockchain intelligence. 
            All queries run on real backend infrastructure.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="contract" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="contract">
                <Code className="w-4 h-4 mr-2" />
                Contract
              </TabsTrigger>
              <TabsTrigger value="security">
                <Shield className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="price">
                <TrendingUp className="w-4 h-4 mr-2" />
                Price
              </TabsTrigger>
              <TabsTrigger value="custom">
                <Brain className="w-4 h-4 mr-2" />
                Custom
              </TabsTrigger>
            </TabsList>

            {/* Contract Analysis */}
            <TabsContent value="contract">
              <Card>
                <CardHeader>
                  <CardTitle>Smart Contract Analysis</CardTitle>
                  <CardDescription>
                    Analyze any Celo smart contract with AI-powered insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Input
                      placeholder="Enter contract address (e.g., 0x1234...)"
                      value={contractAddress}
                      onChange={(e) => setContractAddress(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={handleContractAnalysis} 
                    disabled={loading || !contractAddress}
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Contract"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Audit */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Audit</CardTitle>
                  <CardDescription>
                    Get AI-powered security analysis of your smart contract code
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Textarea
                      placeholder="Paste your Solidity code here..."
                      value={contractCode}
                      onChange={(e) => setContractCode(e.target.value)}
                      rows={8}
                      className="font-mono text-sm"
                    />
                  </div>
                  <Button 
                    onClick={handleSecurityAudit} 
                    disabled={loading || !contractCode}
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Auditing...
                      </>
                    ) : (
                      "Run Security Audit"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Price Prediction */}
            <TabsContent value="price">
              <Card>
                <CardHeader>
                  <CardTitle>Price Prediction</CardTitle>
                  <CardDescription>
                    AI-powered price predictions using on-chain data and sentiment analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Input
                      placeholder="Asset symbol (e.g., CELO, cUSD)"
                      value={asset}
                      onChange={(e) => setAsset(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={handlePricePrediction} 
                    disabled={loading || !asset}
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Predicting...
                      </>
                    ) : (
                      "Predict Price"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Custom Query */}
            <TabsContent value="custom">
              <Card>
                <CardHeader>
                  <CardTitle>Custom AI Query</CardTitle>
                  <CardDescription>
                    Ask anything about Celo blockchain, DeFi, or smart contracts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Textarea
                      placeholder="Ask me anything about Celo blockchain..."
                      value={customQuery}
                      onChange={(e) => setCustomQuery(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <Button 
                    onClick={handleCustomQuery} 
                    disabled={loading || !customQuery}
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Ask AI"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Results Display */}
          {result && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  AI Response
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result.error ? (
                  <div className="text-destructive">{result.error}</div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {result.output || result.explanation}
                      </p>
                    </div>

                    {result.confidence && (
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">
                          Confidence: <span className="text-primary font-medium">
                            {(result.confidence * 100).toFixed(0)}%
                          </span>
                        </span>
                        {result.latency_ms && (
                          <>
                            <span>•</span>
                            <span className="text-muted-foreground">
                              Latency: {result.latency_ms}ms
                            </span>
                          </>
                        )}
                      </div>
                    )}

                    {result.security_analysis && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Security Analysis:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {result.security_analysis.map((item: string, i: number) => (
                            <li key={i}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.gas_optimization_tips && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Gas Optimization Tips:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {result.gas_optimization_tips.map((tip: string, i: number) => (
                            <li key={i}>• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.reasoning_steps && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Reasoning Steps:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {result.reasoning_steps.map((step: string, i: number) => (
                            <li key={i}>• {step}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default AIPlayground;
