#!/bin/bash

# Sentinel-X Stop Script
# Stops all running services

echo "🛑 Stopping Sentinel-X Platform"
echo "================================"

# Stop frontend (Vite dev server)
if pgrep -f "vite" > /dev/null; then
    pkill -f "vite"
    echo "✅ Frontend stopped"
else
    echo "ℹ️  Frontend not running"
fi

# Stop backend (Rust/Cargo)
if pgrep -f "target.*backend" > /dev/null; then
    pkill -f "target.*backend"
    echo "✅ Backend stopped"
else
    echo "ℹ️  Backend not running"
fi

# Stop Ollama (optional - you might want to keep it running)
read -p "Stop Ollama AI service? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if pgrep -x "ollama" > /dev/null; then
        pkill -x "ollama"
        echo "✅ Ollama stopped"
    else
        echo "ℹ️  Ollama not running"
    fi
else
    echo "ℹ️  Ollama left running"
fi

echo ""
echo "✅ Sentinel-X stopped"
