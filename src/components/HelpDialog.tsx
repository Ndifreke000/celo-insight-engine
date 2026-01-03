import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle, Search, Brain, Shield, TrendingUp } from "lucide-react";

const HelpDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <HelpCircle className="w-4 h-4 mr-2" />
          How to Use
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>How to Use Sentinel-X</DialogTitle>
          <DialogDescription>
            Your guide to exploring Celo blockchain with AI-powered insights
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Blockchain Explorer */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-lg">Blockchain Explorer</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Browse real-time Celo blockchain data:
            </p>
            <ul className="text-sm space-y-1 ml-6 list-disc text-muted-foreground">
              <li><strong>Latest Blocks:</strong> Click "Latest Blocks" to see the most recent blocks on Celo mainnet</li>
              <li><strong>Search Block:</strong> Enter a block number (e.g., 55553000) and click "Search Block"</li>
              <li><strong>Transactions:</strong> Click "Transactions" to view recent blockchain transactions</li>
              <li><strong>Auto-refresh:</strong> Data updates automatically every 10 seconds</li>
            </ul>
          </div>

          {/* AI Query */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-lg">AI Query Engine</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Ask questions about Celo blockchain:
            </p>
            <ul className="text-sm space-y-1 ml-6 list-disc text-muted-foreground">
              <li><strong>Type your question:</strong> e.g., "What is Celo?" or "How does Celo's stability mechanism work?"</li>
              <li><strong>Click "Run AI Query":</strong> The AI analyzes current blockchain data and provides intelligent answers</li>
              <li><strong>View reasoning:</strong> See how the AI reached its conclusion</li>
              <li><strong>Note:</strong> Requires AI model (vLLM, HuggingFace, or OpenAI) to be configured</li>
            </ul>
          </div>

          {/* Contract Analyzer */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-gold-light" />
              <h3 className="font-semibold text-lg">Smart Contract Analyzer</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Analyze Celo smart contracts:
            </p>
            <ul className="text-sm space-y-1 ml-6 list-disc text-muted-foreground">
              <li><strong>Enter contract address:</strong> Paste a Celo contract address (starts with 0x...)</li>
              <li><strong>Click "Analyze Contract":</strong> AI examines the contract's code and functionality</li>
              <li><strong>Get insights:</strong> View security analysis, functionality overview, and gas optimization tips</li>
              <li><strong>Note:</strong> Requires AI model to be configured</li>
            </ul>
          </div>

          {/* Price Predictor */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <h3 className="font-semibold text-lg">Price Predictor</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Get real-time prices and AI predictions:
            </p>
            <ul className="text-sm space-y-1 ml-6 list-disc text-muted-foreground">
              <li><strong>Enter asset:</strong> Type CELO, cUSD, or cEUR</li>
              <li><strong>Click "Predict Price":</strong> See current market data from CoinGecko</li>
              <li><strong>View prediction:</strong> AI analyzes blockchain activity and market trends to predict future price</li>
              <li><strong>Real data:</strong> Current price, 24h change, and market cap are always live</li>
            </ul>
          </div>

          {/* Tips */}
          <div className="space-y-2 pt-4 border-t">
            <h3 className="font-semibold text-lg">💡 Tips</h3>
            <ul className="text-sm space-y-1 ml-6 list-disc text-muted-foreground">
              <li>All blockchain data is real-time from Celo mainnet</li>
              <li>Price data comes from CoinGecko API (live market data)</li>
              <li>AI features require setup - see documentation for details</li>
              <li>Dashboard auto-refreshes every 10 seconds</li>
              <li>Works on mobile and desktop devices</li>
            </ul>
          </div>

          {/* Setup AI */}
          <div className="space-y-2 pt-4 border-t">
            <h3 className="font-semibold text-lg">🧠 Enable AI Features</h3>
            <p className="text-sm text-muted-foreground">
              To use AI Query, Contract Analyzer, and Price Predictions:
            </p>
            <ol className="text-sm space-y-1 ml-6 list-decimal text-muted-foreground">
              <li>Run: <code className="bg-secondary px-1 rounded">./setup_vllm.sh</code></li>
              <li>Start: <code className="bg-secondary px-1 rounded">vllm serve deepseek-ai/DeepSeek-OCR</code></li>
              <li>Or add HuggingFace/OpenAI API key to backend/.env</li>
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
