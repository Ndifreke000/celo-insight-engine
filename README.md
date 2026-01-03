# Sentinel-X: AI-Enhanced Celo Blockchain Intelligence

> Giving Blockchain Data a Brain

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Rust](https://img.shields.io/badge/Rust-1.70+-orange.svg)](https://www.rust-lang.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![Celo](https://img.shields.io/badge/Celo-Mainnet-green.svg)](https://celo.org/)

## 🎉 What is Sentinel-X?

Sentinel-X is an **AI-Enhanced Real-Time Data Inference Indexer** for the Celo blockchain. We transform raw blockchain data into actionable intelligence for AI agents—delivering conclusions, not just numbers.

### ✨ Key Features

- 🔍 **Real-Time Blockchain Explorer** - Browse live Celo blocks and transactions
- 🧠 **AI Query Engine** - Ask questions, get intelligent answers powered by DeepSeek
- 🛡️ **Smart Contract Analyzer** - Analyze contracts with AI-powered security insights
- 📈 **Price Predictor** - Real-time prices + AI predictions for CELO, cUSD, cEUR
- ⚡ **Sub-second Latency** - Lightning-fast responses
- 🔗 **Real Data Sources** - Alchemy RPC, CoinGecko API, no mock data

---

## 🚀 Quick Start

### Prerequisites

- **Rust** 1.70+ ([Install](https://rustup.rs/))
- **Node.js** 18+ ([Install](https://nodejs.org/))
- **Python** 3.8+ (for AI features)

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/celo-insight-engine.git
cd celo-insight-engine

# Install frontend dependencies
npm install

# Backend is ready (Rust compiles on first run)
```

### 2. Start Backend

```bash
cd backend
cargo run
```

Backend runs on: **http://localhost:3000**

### 3. Start Frontend

```bash
npm run dev
```

Frontend runs on: **http://localhost:8081**

### 4. Visit Dashboard

Open **http://localhost:8081/app** in your browser!

---

## 🧠 Enable AI Features

### Option 1: Local vLLM (Best Performance)

```bash
# Install vLLM
./setup_vllm.sh

# Start DeepSeek server
vllm serve deepseek-ai/DeepSeek-OCR
```

### Option 2: HuggingFace API (Easiest)

```bash
# Add to backend/.env
HF_API_KEY=hf_your_token_here
HF_MODEL=deepseek-ai/DeepSeek-OCR
```

Get your token: https://huggingface.co/settings/tokens

### Option 3: OpenAI (Fastest Setup)

```bash
# Add to backend/.env
OPENAI_API_KEY=sk-your-key-here
```

---

## 📊 System Status

✅ **FULLY FUNCTIONAL SYSTEM**

### Frontend
- ✅ Landing Page: http://localhost:8081
- ✅ Dashboard: http://localhost:8081/app
- ✅ Auto-refresh: Every 10 seconds
- ✅ Responsive: Mobile + Desktop
- ✅ 4 Tabs: Explorer, AI, Contract, Price

### Backend API
- ✅ Server: http://localhost:3000
- ✅ Health: /api/health
- ✅ Blocks: /api/blocks
- ✅ Transactions: /api/transactions
- ✅ Price: /api/price/:asset
- ✅ AI Query: /api/ai/query
- ✅ Contract: /api/ai/contract/analyze
- ✅ Security: /api/ai/security/audit

### Real Data Sources
- ✅ Blockchain: Celo Mainnet (Alchemy)
- ✅ Fallback: Forno (rate-limited)
- ✅ Blocks: Real-time from mainnet
- ✅ Transactions: Real-time from blocks
- ✅ Prices: CoinGecko API (live)
- ⏳ AI: Ready for vLLM/HF/OpenAI

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  React + TypeScript + Vite + shadcn/ui + Tailwind CSS      │
│                    http://localhost:8081                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ REST API
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                     BACKEND API                              │
│         Rust + Axum + Tokio + ethers-rs                     │
│                http://localhost:3000                         │
└─────┬────────────┬────────────┬────────────┬────────────────┘
      │            │            │            │
      │            │            │            │
┌─────▼────┐ ┌────▼─────┐ ┌───▼──────┐ ┌──▼──────────┐
│  Alchemy │ │  Forno   │ │CoinGecko │ │ vLLM/AI     │
│   RPC    │ │  (Celo)  │ │   API    │ │ DeepSeek    │
│ (Primary)│ │(Fallback)│ │  (Price) │ │  (Brain)    │
└──────────┘ └──────────┘ └──────────┘ └─────────────┘
```

---

## 🧪 Testing

```bash
# Run full test suite
./test_all_features.sh
```

Tests:
- ✅ Backend health
- ✅ Real blockchain data
- ✅ Real price data
- ✅ AI model status
- ✅ Frontend pages

---

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Getting started guide
- **[DEPLOY.md](DEPLOY.md)** - Production deployment
- **[API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md)** - API reference

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| Backend | Rust + Axum + Tokio |
| Frontend | React + TypeScript + Vite |
| UI | shadcn/ui + Tailwind CSS |
| Blockchain | ethers-rs + Alchemy RPC |
| AI | vLLM + DeepSeek-OCR |
| Price Data | CoinGecko API |

---

## 🎯 Features

### ✅ Implemented
- [x] Real-time blockchain explorer
- [x] Live block viewer
- [x] Transaction browser
- [x] Live price data (CELO, cUSD, cEUR)
- [x] AI query interface
- [x] Smart contract analyzer
- [x] Price prediction engine
- [x] Auto-refresh dashboard
- [x] Error handling & fallbacks
- [x] Responsive design

### 🚧 Coming Soon
- [ ] Social sentiment analysis (Twitter/Discord)
- [ ] zkML proof verification
- [ ] Micro-model deployment
- [ ] Historical data analytics
- [ ] Custom alerts & notifications

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Celo** - For the amazing blockchain platform
- **DeepSeek** - For the powerful AI model
- **Alchemy** - For reliable RPC infrastructure
- **CoinGecko** - For real-time price data

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/celo-insight-engine/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/celo-insight-engine/discussions)
- **Email**: support@sentinel-x.io

---

## 🌟 Star History

If you find this project useful, please consider giving it a star ⭐

---

**Built with ❤️ for the Celo ecosystem**
