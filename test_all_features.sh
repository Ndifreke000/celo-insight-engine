#!/bin/bash

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║           SENTINEL-X FEATURE TEST SUITE                     ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

test_endpoint() {
    local name=$1
    local url=$2
    local expected=$3
    
    echo -n "Testing $name... "
    response=$(curl -s "$url")
    
    if echo "$response" | grep -q "$expected"; then
        echo -e "${GREEN}✓ PASS${NC}"
        return 0
    else
        echo -e "${RED}✗ FAIL${NC}"
        return 1
    fi
}

echo "=== Backend API Tests ==="
echo ""

test_endpoint "Health Check" "http://localhost:3000/api/health" "ok"
test_endpoint "Blockchain Blocks" "http://localhost:3000/api/blocks?limit=1" "celo-rpc"
test_endpoint "Transactions" "http://localhost:3000/api/transactions?limit=1" "celo-rpc"
test_endpoint "Price Data (CELO)" "http://localhost:3000/api/price/celo" "coingecko"
test_endpoint "AI Model Info" "http://localhost:3000/api/ai/model" "deepseek"

echo ""
echo "=== Frontend Tests ==="
echo ""

test_endpoint "Landing Page" "http://localhost:8081" "root"
test_endpoint "Dashboard" "http://localhost:8081/app" "root"

echo ""
echo "=== Summary ==="
echo ""

# Count real vs mock data
blocks_source=$(curl -s "http://localhost:3000/api/blocks?limit=1" | grep -o '"source":"[^"]*"' | cut -d'"' -f4)
tx_source=$(curl -s "http://localhost:3000/api/transactions?limit=1" | grep -o '"source":"[^"]*"' | cut -d'"' -f4)
price_source=$(curl -s "http://localhost:3000/api/price/celo" | grep -o '"source":"[^"]*"' | cut -d'"' -f4)

echo "Data Sources:"
echo "  Blocks: $blocks_source"
echo "  Transactions: $tx_source"
echo "  Price: $price_source"
echo ""

if [ "$blocks_source" = "celo-rpc" ] && [ "$tx_source" = "celo-rpc" ] && [ "$price_source" = "coingecko" ]; then
    echo -e "${GREEN}✓ All data sources are REAL!${NC}"
else
    echo -e "${YELLOW}⚠ Some data sources are mock${NC}"
fi

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    TEST COMPLETE                             ║"
echo "╚══════════════════════════════════════════════════════════════╝"
