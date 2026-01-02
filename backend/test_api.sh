#!/bin/bash

echo "🚀 Testing Sentinel-X API"
echo "================================"
echo ""

echo "✅ Health Check:"
curl -s http://localhost:3000/api/health | jq '.status, .phase'
echo ""

echo "🧠 Celo-7B Model Info:"
curl -s http://localhost:3000/api/ai/model | jq '.model_name, .parameters'
echo ""

echo "📊 Indexer Metrics:"
curl -s http://localhost:3000/api/indexer/metrics | jq '.'
echo ""

echo "💰 AI Price Prediction:"
curl -s -X POST http://localhost:3000/api/ai/price/predict \
  -H "Content-Type: application/json" \
  -d '{"asset":"CELO"}' | jq '.output, .confidence'
echo ""

echo "🔍 Smart Contract Analysis:"
curl -s -X POST http://localhost:3000/api/ai/contract/analyze \
  -H "Content-Type: application/json" \
  -d '{"contract_address":"0x1234567890abcdef"}' | jq '.output, .confidence'
echo ""

echo "🔐 Security Audit:"
curl -s -X POST http://localhost:3000/api/ai/security/audit \
  -H "Content-Type: application/json" \
  -d '{"code":"contract MyToken {}"}' | jq '.output, .confidence'
echo ""

echo "📈 Get Blocks:"
curl -s "http://localhost:3000/api/blocks?limit=3" | jq '.blocks | length'
echo ""

echo "✅ All tests complete!"
