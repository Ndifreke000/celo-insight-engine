import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Brain, Database, TrendingUp } from "lucide-react";
import * as api from "@/lib/api";

const LiveDashboard = () => {
  const [health, setHealth] = useState<any>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [healthData, metricsData] = await Promise.all([
        api.healthCheck(),
        api.getIndexerMetrics(),
      ]);
      setHealth(healthData);
      setMetrics(metricsData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const runPrediction = async () => {
    try {
      const result = await api.predictPrice("CELO");
      setPrediction(result);
    } catch (error) {
      console.error("Failed to run prediction:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section className="py-16 sm:py-24 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Connecting to Sentinel-X API...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="dashboard" className="py-16 sm:py-24 relative bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm text-primary font-medium tracking-wider uppercase mb-3 sm:mb-4 block">
            Live System Status
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Real-Time <span className="text-gradient-gold">Intelligence</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Connected to live Sentinel-X backend. All data is real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* System Status */}
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {health?.status === "ok" ? "Online" : "Offline"}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {health?.phase || "Loading..."}
              </p>
            </CardContent>
          </Card>

          {/* AI Model */}
          <Card className="border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Brain className="w-4 h-4 text-accent" />
                AI Model
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {health?.ai_model?.model_name || "N/A"}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {health?.ai_model?.parameters 
                  ? `${(health.ai_model.parameters / 1e9).toFixed(1)}B params`
                  : "Loading..."}
              </p>
            </CardContent>
          </Card>

          {/* Indexer */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Database className="w-4 h-4" />
                Feeds Processed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics?.total_feeds_processed || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {metrics?.feeds_per_second?.toFixed(2) || 0} feeds/sec
              </p>
            </CardContent>
          </Card>

          {/* Active Feeds */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Active Feeds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics?.active_feeds || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Real-time streams
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI Prediction Demo */}
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              AI Price Prediction Demo
            </CardTitle>
            <CardDescription>
              Test the Celo-7B model with real-time price predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={runPrediction} 
              variant="hero" 
              className="w-full sm:w-auto mb-4"
            >
              Run CELO Price Prediction
            </Button>

            {prediction && (
              <div className="mt-4 p-4 rounded-lg bg-secondary/50 border border-border/50">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-1">
                    <p className="text-sm text-foreground leading-relaxed">
                      {prediction.output}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Confidence: {(prediction.confidence * 100).toFixed(0)}%</span>
                  <span>•</span>
                  <span>Latency: {prediction.latency_ms}ms</span>
                  {prediction.verifiable && (
                    <>
                      <span>•</span>
                      <span className="text-primary">✓ Verifiable</span>
                    </>
                  )}
                </div>
                <div className="mt-3 pt-3 border-t border-border/30">
                  <p className="text-xs font-medium mb-2">Reasoning Steps:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {prediction.reasoning_steps?.map((step: string, i: number) => (
                      <li key={i}>• {step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LiveDashboard;
