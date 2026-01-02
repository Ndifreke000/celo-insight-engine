# Sentinel-X Rust Backend API

A production-ready REST API built with Rust and Axum, implementing the complete Sentinel-X roadmap.

## Prerequisites

- Rust (install from [rustup.rs](https://rustup.rs/))

## Getting Started

```bash
# Navigate to backend directory
cd backend

# Run the server
cargo run

# Run in release mode (optimized)
cargo run --release
```

The server will start on `http://127.0.0.1:3000`

---

## 🚀 Phase 1: The Foundation

### Blockchain Data Indexer

**Get Blocks**
```bash
curl "http://localhost:3000/api/blocks?limit=5&offset=0"
```

**Get Single Block**
```bash
curl http://localhost:3000/api/blocks/1000000
```

**Get Transactions**
```bash
curl "http://localhost:3000/api/transactions?limit=10"
```

---

## 🧠 Phase 2: The Brain

### AI Inference Engine

**Run Inference with Celo-7B**
```bash
curl -X POST http://localhost:3000/api/inference \
  -H "Content-Type: application/json" \
  -d '{
    "model": "celo-7b",
    "input": "Analyze this transaction pattern: 0x123..."
  }'
```

### Sentiment Analysis

**Get Social Sentiment**
```bash
# Twitter sentiment
curl "http://localhost:3000/api/sentiment?source=twitter"

# Discord sentiment
curl "http://localhost:3000/api/sentiment?source=discord"
```

### Smart Contract Explainer

**Explain Contract**
```bash
curl -X POST http://localhost:3000/api/contract/explain \
  -H "Content-Type: application/json" \
  -d '{
    "contract_address": "0x1234567890abcdef1234567890abcdef12345678"
  }'
```

---

## 🔮 Phase 3: The Oracle

### zkML Proof Verification

**Verify Proof**
```bash
curl -X POST http://localhost:3000/api/zkml/verify \
  -H "Content-Type: application/json" \
  -d '{
    "proof": "0xproof_data_here",
    "public_inputs": ["input1", "input2"]
  }'
```

### Micro-Model Deployment

**Deploy Model**
```bash
curl -X POST http://localhost:3000/api/models/deploy \
  -H "Content-Type: application/json" \
  -d '{
    "model_name": "my-custom-model",
    "model_type": "classification",
    "parameters": {}
  }'
```

---

## 📊 Complete API Reference

### Health Check
- `GET /api/health` - Server health status

### Blockchain Data (Phase 1)
- `GET /api/blocks` - List blocks (query: limit, offset)
- `GET /api/blocks/:block_number` - Get specific block
- `GET /api/transactions` - List transactions (query: limit, address)

### AI Inference (Phase 2)
- `POST /api/inference` - Run AI inference
- `GET /api/sentiment` - Get sentiment analysis (query: source, limit)
- `POST /api/contract/explain` - Explain smart contract

### zkML & Deployment (Phase 3)
- `POST /api/zkml/verify` - Verify zkML proof
- `POST /api/models/deploy` - Deploy micro-model

---

## 🔧 Configuration

Edit `.env` file:
```env
PORT=3000
HOST=127.0.0.1
RUST_LOG=debug
```

---

## 🏗️ Architecture

```
backend/
├── src/
│   ├── main.rs          # Server entry point
│   ├── config.rs        # Configuration management
│   ├── routes.rs        # API route definitions
│   ├── handlers.rs      # Request handlers (Phase 1-3)
│   └── models.rs        # Data models
├── Cargo.toml           # Dependencies
└── .env                 # Environment config
```

---

## 🚀 Production Deployment

For production, consider:
- Add PostgreSQL for persistent storage
- Implement actual Celo blockchain RPC integration
- Deploy Celo-7B model with GPU inference
- Add authentication/API keys
- Set up rate limiting
- Enable HTTPS/TLS

---

## 📝 Development Notes

Current implementation uses mock data for demonstration. In production:
- Connect to actual Celo Alfajores testnet
- Integrate real AI models
- Add database persistence
- Implement caching layer
- Add comprehensive error handling
