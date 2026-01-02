# Sentinel-X API Documentation

Complete API reference for the AI-Enhanced Real-Time Data Inference Indexer and Celo-7B LLM.

## Base URL
```
http://localhost:3000/api
```

---

## 🏥 Health & Status

### GET /health
Get server health and system status.

**Response:**
```json
{
  "status": "ok",
  "message": "Sentinel-X API is running",
  "version": "1.0.0",
  "phase": "Phase 1-3 Complete",
  "indexer": {
    "feeds_processed": 1234,
    "feeds_per_second": 45.2,
    "active_feeds": 12
  },
  "ai_model": {
    "model_name": "Celo-7B",
    "version": "1.0.0",
    "parameters": 7000000000,
    "fine_tuned_on": [...]
  }
}
```

---

## 📡 Real-Time Indexer API

### GET /indexer/metrics
Get real-time indexer performance metrics.

**Response:**
```json
{
  "total_feeds_processed": 1234567,
  "feeds_per_second": 45.2,
  "average_latency_ms": 12.5,
  "active_feeds": 25,
  "last_update": 1704067200
}
```

### GET /indexer/feeds
Get recent data feeds.

**Query Parameters:**
- `limit` (optional): Number of feeds to return (max 100, default 10)

**Response:**
```json
{
  "feeds": [
    {
      "feed_id": "feed_123",
      "source": { "OnChain": "0x..." },
      "data_type": "Transaction",
      "timestamp": 1704067200,
      "raw_data": {...},
      "cleaned_data": {...}
    }
  ],
  "count": 10
}
```

### POST /indexer/ingest
Ingest a new data feed into the indexer.

**Request Body:**
```json
{
  "feed_id": "feed_456",
  "source": { "OnChain": "0xcontract_address" },
  "data_type": "Transaction",
  "timestamp": 1704067200,
  "raw_data": {
    "tx_hash": "0x...",
    "value": "1000000000000000000"
  }
}
```

**Response:**
```json
{
  "status": "ingested",
  "message": "Data feed processed successfully"
}
```

### GET /indexer/agents/decisions
Get recent AI agent decisions.

**Query Parameters:**
- `limit` (optional): Number of decisions to return (max 100, default 10)

**Response:**
```json
{
  "decisions": [
    {
      "agent_id": "trading_agent_1",
      "decision_type": {
        "Trade": {
          "action": "buy",
          "asset": "CELO",
          "amount": 100.0
        }
      },
      "confidence": 0.92,
      "reasoning": "Strong bullish signals detected",
      "timestamp": 1704067200,
      "data_sources": ["price_feed", "sentiment_analysis"]
    }
  ],
  "count": 10
}
```

### POST /indexer/agents/decisions
Submit an AI agent decision.

**Request Body:**
```json
{
  "agent_id": "my_trading_agent",
  "decision_type": {
    "Alert": {
      "severity": "high",
      "message": "Unusual transaction pattern detected"
    }
  },
  "confidence": 0.88,
  "reasoning": "Transaction volume spike of 300%",
  "timestamp": 1704067200,
  "data_sources": ["blockchain_data", "historical_patterns"]
}
```

---

## 🧠 Celo-7B AI Engine API

### POST /ai/query
Query the Celo-7B LLM with custom prompts.

**Request Body:**
```json
{
  "prompt": "Explain how Celo's stability mechanism works",
  "context": ["celo_whitepaper", "stability_docs"],
  "max_tokens": 500,
  "temperature": 0.7,
  "task_type": "GeneralQuery"
}
```

**Task Types:**
- `ContractAnalysis`
- `SecurityAudit`
- `CodeExplanation`
- `TransactionAnalysis`
- `PricePredict`
- `GeneralQuery`

**Response:**
```json
{
  "output": "Celo's stability mechanism uses...",
  "confidence": 0.94,
  "reasoning_steps": [
    "Analyzed Celo documentation",
    "Retrieved stability protocol details",
    "Generated comprehensive explanation"
  ],
  "sources": ["celo_docs", "whitepaper"],
  "verifiable": true,
  "on_chain_proof": "0xproof..."
}
```

### GET /ai/model
Get Celo-7B model information.

**Response:**
```json
{
  "model_name": "Celo-7B",
  "version": "1.0.0",
  "parameters": 7000000000,
  "fine_tuned_on": [
    "Celo blockchain data",
    "Solidity smart contracts",
    "Celo developer documentation",
    "DeFi protocols",
    "Security audit reports"
  ]
}
```

### POST /ai/contract/analyze
Analyze a smart contract using AI.

**Request Body:**
```json
{
  "contract_address": "0x1234567890abcdef1234567890abcdef12345678"
}
```

**Response:**
```json
{
  "output": "Contract Analysis: This smart contract implements...",
  "confidence": 0.94,
  "reasoning_steps": [...],
  "sources": [...],
  "verifiable": true,
  "on_chain_proof": "0xproof..."
}
```

### POST /ai/security/audit
Perform AI-powered security audit.

**Request Body:**
```json
{
  "code": "contract MyToken { ... }"
}
```

**Response:**
```json
{
  "output": "Security Audit Complete: Found 0 critical, 1 medium...",
  "confidence": 0.91,
  "reasoning_steps": [
    "Scanned for common vulnerabilities",
    "Analyzed access control mechanisms",
    "Checked for proper event emissions"
  ],
  "sources": ["security_db", "audit_reports"],
  "verifiable": true,
  "on_chain_proof": "0xaudit_proof..."
}
```

### POST /ai/price/predict
Get AI-powered price predictions.

**Request Body:**
```json
{
  "asset": "CELO"
}
```

**Response:**
```json
{
  "output": "Price Prediction: Based on historical data...",
  "confidence": 0.73,
  "reasoning_steps": [
    "Analyzed 30-day price history",
    "Evaluated on-chain transaction volume",
    "Processed social sentiment data"
  ],
  "sources": ["price_oracles", "on_chain_metrics"],
  "verifiable": true,
  "on_chain_proof": "0xprice_proof..."
}
```

---

## 🔗 Blockchain Data API

### GET /blocks
Get recent blocks from Celo blockchain.

**Query Parameters:**
- `limit` (optional): Number of blocks (max 100, default 10)
- `offset` (optional): Offset for pagination (default 0)

### GET /blocks/:block_number
Get specific block by number.

### GET /transactions
Get recent transactions.

**Query Parameters:**
- `limit` (optional): Number of transactions (max 100, default 10)
- `address` (optional): Filter by address

---

## 🔮 zkML & Oracle API

### POST /zkml/verify
Verify zero-knowledge machine learning proofs.

**Request Body:**
```json
{
  "proof": "0xproof_data",
  "public_inputs": ["input1", "input2"]
}
```

### POST /models/deploy
Deploy a micro-model to the infrastructure.

**Request Body:**
```json
{
  "model_name": "my-custom-model",
  "model_type": "classification",
  "parameters": {}
}
```

---

## 📊 Example Use Cases

### Trading Agent
```bash
# 1. Ingest price data
curl -X POST http://localhost:3000/api/indexer/ingest \
  -H "Content-Type: application/json" \
  -d '{"feed_id":"price_1","source":{"Oracle":"chainlink"},"data_type":"Price","timestamp":1704067200,"raw_data":{"price":25.5}}'

# 2. Get AI price prediction
curl -X POST http://localhost:3000/api/ai/price/predict \
  -H "Content-Type: application/json" \
  -d '{"asset":"CELO"}'

# 3. Submit trading decision
curl -X POST http://localhost:3000/api/indexer/agents/decisions \
  -H "Content-Type: application/json" \
  -d '{"agent_id":"trader_1","decision_type":{"Trade":{"action":"buy","asset":"CELO","amount":100}},"confidence":0.9,"reasoning":"AI prediction + volume analysis","timestamp":1704067200,"data_sources":["ai_model","price_feed"]}'
```

### Smart Contract Auditor
```bash
# Analyze contract
curl -X POST http://localhost:3000/api/ai/contract/analyze \
  -H "Content-Type: application/json" \
  -d '{"contract_address":"0x..."}'

# Security audit
curl -X POST http://localhost:3000/api/ai/security/audit \
  -H "Content-Type: application/json" \
  -d '{"code":"contract MyToken { ... }"}'
```

---

## 🚀 Rate Limits

- Default: 100 requests/minute per IP
- Indexer ingestion: 1000 feeds/minute
- AI queries: 10 requests/minute (compute-intensive)

## 🔐 Authentication

Currently open for development. Production deployment will require API keys.

## 📝 Error Responses

```json
{
  "error": "Error message here",
  "code": "ERROR_CODE",
  "details": {}
}
```

Common status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `429` - Rate Limit Exceeded
- `500` - Internal Server Error
