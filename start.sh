#!/bin/bash

# Sentinel-X Startup Script
# Starts all services: Ollama AI, Backend API, and Frontend

set -e

echo "🚀 Starting Sentinel-X Platform"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Ollama is installed
if ! command -v ollama &> /dev/null; then
    echo -e "${YELLOW}⚠️  Ollama not found. Installing...${NC}"
    curl -fsSL https://ollama.com/install.sh | sh
    echo -e "${GREEN}✅ Ollama installed${NC}"
fi

# Start Ollama service in background
echo "🤖 Starting Ollama AI service..."
if pgrep -x "ollama" > /dev/null; then
    echo -e "${GREEN}✅ Ollama already running${NC}"
else
    ollama serve > /tmp/ollama.log 2>&1 &
    OLLAMA_PID=$!
    echo -e "${GREEN}✅ Ollama started (PID: $OLLAMA_PID)${NC}"
    sleep 2
fi

# Check if model is available, if not pull it
echo "📦 Checking AI model..."
if ollama list | grep -q "llama3.2:3b"; then
    echo -e "${GREEN}✅ Model llama3.2:3b ready${NC}"
else
    echo -e "${YELLOW}📥 Downloading llama3.2:3b model (first time only, ~2GB)...${NC}"
    ollama pull llama3.2:3b
    echo -e "${GREEN}✅ Model downloaded${NC}"
fi

# Configure backend to use Ollama
echo "⚙️  Configuring backend..."
if ! grep -q "OLLAMA_URL" backend/.env; then
    cat >> backend/.env << EOF

# Ollama AI Configuration (auto-configured)
OLLAMA_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=llama3.2:3b
EOF
    echo -e "${GREEN}✅ Backend configured for Ollama${NC}"
else
    echo -e "${GREEN}✅ Backend already configured${NC}"
fi

# Start backend
echo "🔧 Starting backend API..."
cd backend
cargo build --release > /tmp/backend-build.log 2>&1
cargo run --release > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
cd ..
echo -e "${GREEN}✅ Backend started (PID: $BACKEND_PID)${NC}"

# Wait for backend to be ready
echo "⏳ Waiting for backend to be ready..."
for i in {1..30}; do
    if curl -s http://localhost:3000/api/health > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Backend is ready${NC}"
        break
    fi
    sleep 1
    if [ $i -eq 30 ]; then
        echo -e "${RED}❌ Backend failed to start. Check /tmp/backend.log${NC}"
        exit 1
    fi
done

# Start frontend
echo "🎨 Starting frontend..."
npm run dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}✅ Frontend started (PID: $FRONTEND_PID)${NC}"

echo ""
echo "================================"
echo -e "${GREEN}🎉 Sentinel-X is running!${NC}"
echo ""
echo "📍 Services:"
echo "   • Frontend:  http://localhost:5173"
echo "   • Backend:   http://localhost:3000"
echo "   • Ollama AI: http://localhost:11434"
echo ""
echo "📝 Logs:"
echo "   • Backend:  tail -f /tmp/backend.log"
echo "   • Frontend: tail -f /tmp/frontend.log"
echo "   • Ollama:   tail -f /tmp/ollama.log"
echo ""
echo "🛑 To stop all services:"
echo "   ./stop.sh"
echo ""
echo "Press Ctrl+C to stop monitoring (services will continue running)"
echo ""

# Monitor services
trap 'echo ""; echo "Services still running. Use ./stop.sh to stop them."; exit 0' INT

# Keep script running and show status
while true; do
    sleep 5
    if ! kill -0 $BACKEND_PID 2>/dev/null; then
        echo -e "${RED}❌ Backend stopped unexpectedly${NC}"
        break
    fi
    if ! kill -0 $FRONTEND_PID 2>/dev/null; then
        echo -e "${RED}❌ Frontend stopped unexpectedly${NC}"
        break
    fi
done
