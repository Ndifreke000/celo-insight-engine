# Sentinel-X Quick Start Guide

## 🚀 What's Running

Your Celo Insight Engine is fully operational with:

✅ **Frontend**: http://localhost:8081
✅ **Dashboard**: http://localhost:8081/app
✅ **Backend API**: http://localhost:3000
✅ **Real Blockchain Data**: Celo Mainnet (Alchemy + Forno fallback)
✅ **Real Price Data**: CoinGecko API
⏳ **AI Engine**: Ready for vLLM (gpt-oss-20b)

---

## 📊 Current Features

### 1. Interactive Dashboard (`/app`)
- **Blockchain Explorer**: Browse real Celo blocks and transactions
- **AI Query Engine**: Ask questions about Celo (needs vLLM)
- **Contract Analyzer**: Analyze smart contracts (needs vLLM)
- **Price Predictor**: Real-time CELO price + AI predictions

### 2. Real Data Sources
- **Blocks**: Live from Celo mainnet via Alchemy
- **Transactions**: Real transaction data from blocks
- **Prices**: Live from CoinGecko (CELO, cUSD, cEUR)
- **AI**: Ready for gpt-oss-20b (see below)

---

## 🧠 Enable AI (DeepSeek)

### Option 1: Local vLLM (Best Performance)

```bash
# 1. Install vLLM
./setup_vllm.sh

# 2. Start DeepSeek server (new terminal)
vllm serve deepseek-ai/DeepSeek-OCR

# 3. Backend auto-detects it!
```

### Option 2: HuggingFace API (Easiest)

```bash
# Add to backend/.env
HF_API_KEY=hf_your_token_here
HF_MODEL=deepseek-ai/DeepSeek-OCR

# Restart backend
cargo run
```

### Option 3: OpenAI (Fastest Setup)

```bash
# Add to backend/.env
OPENAI_API_KEY=sk-your-key-here

# Restart backend
cargo run
```

---

## 🧪 Test Everything

```bash
./test_all_features.sh
```

This tests:
- ✅ Backend health
- ✅ Real blockchain data
- ✅ Real price data
- ✅ AI model status
- ✅ Frontend pages

---

## 📡 API Endpoints

### Blockchain
```bash
# Get latest blocks
curl http://localhost:3000/api/blocks?limit=10

# Get specific block
curl http://localhost:3000/api/blocks/55553000

# Get transactions
curl http://localhost:3000/api/transactions?limit=10
```

### Price Data
```bash
# Get CELO price
curl http://localhost:3000/api/price/celo

# Get cUSD price
curl http://localhost:3000/api/price/cusd
```

### AI (requires vLLM/HF/OpenAI)
```bash
# Ask AI a question
curl -X POST http://localhost:3000/api/ai/query \
  -H "Content-Type: application/json" \
  -d '{"prompt":"What is Celo?","task_type":"GeneralQuery"}'

# Predict price
curl -X POST http://localhost:3000/api/ai/price/predict \
  -H "Content-Type: application/json" \
  -d '{"asset":"CELO"}'
```

---

## 🔧 Development

### Start Everything
```bash
# Terminal 1: Backend
cd backend && cargo run

# Terminal 2: Frontend
npm run dev

# Terminal 3 (optional): vLLM
vllm serve deepseek-ai/DeepSeek-OCR
```

### Stop Everything
```bash
# Kill all processes
pkill -f cargo
pkill -f vite
pkill -f vllm
```

---

## 📁 Project Structure

```
celo-insight-engine/
├── backend/              # Rust backend
│   ├── src/
│   │   ├── main.rs      # Server entry
│   │   ├── handlers.rs  # API endpoints
│   │   ├── ai_engine.rs # AI integration
│   │   ├── celo_client.rs # Blockchain client
│   │   └── ...
│   └── .env             # Configuration
├── src/                 # React frontend
│   ├── pages/
│   │   ├── Index.tsx    # Landing page
│   │   └── App.tsx      # Dashboard
│   ├── components/      # UI components
│   └── lib/api.ts       # API client
├── setup_vllm.sh        # vLLM installer
└── test_all_features.sh # Test suite
```

---

## 🎯 Next Steps

1. **Try the Dashboard**: Visit http://localhost:8081/app
2. **Explore Blockchain**: Browse real Celo blocks
3. **Check Prices**: See live CELO price from CoinGecko
4. **Enable AI**: Run `./setup_vllm.sh` for full AI features
5. **Build Features**: Add your own endpoints and UI

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 8081
lsof -ti:8081 | xargs kill -9
```

### Backend Won't Start
```bash
# Check logs
cd backend && cargo run

# Verify .env file exists
cat backend/.env
```

### Frontend Shows Errors
```bash
# Clear cache and rebuild
rm -rf node_modules
npm install
npm run dev
```

### No Real Data
```bash
# Check backend logs for connection errors
# Verify CELO_RPC_URL in backend/.env
# Test manually:
curl http://localhost:3000/api/blocks?limit=1
```

---

## 📚 Resources

- **Celo Docs**: https://docs.celo.org
- **DeepSeek**: https://huggingface.co/deepseek-ai/DeepSeek-OCR
- **vLLM**: https://docs.vllm.ai
- **CoinGecko API**: https://www.coingecko.com/api

---

## ✨ What's Working Right Now

✅ Real Celo blockchain data (Alchemy + Forno)
✅ Real price data (CoinGecko)
✅ Interactive dashboard with 4 tabs
✅ Auto-refresh every 10 seconds
✅ Responsive design
✅ Error handling and fallbacks
✅ Production-ready API
✅ Type-safe TypeScript frontend
✅ Rust backend with async/await

**Ready for AI**: Just add vLLM, HuggingFace, or OpenAI key!
