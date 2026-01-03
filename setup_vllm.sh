#!/bin/bash

echo "=== DeepSeek vLLM Setup ==="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

echo "✓ Python found: $(python3 --version)"
echo ""

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is not installed. Please install pip first."
    exit 1
fi

echo "✓ pip found"
echo ""

# Install vLLM
echo "📦 Installing vLLM..."
pip3 install vllm

if [ $? -eq 0 ]; then
    echo "✓ vLLM installed successfully"
else
    echo "❌ Failed to install vLLM"
    exit 1
fi

echo ""
echo "=== Setup Complete ==="
echo ""
echo "To start the DeepSeek server:"
echo "  vllm serve deepseek-ai/DeepSeek-OCR"
echo ""
echo "Or run in background:"
echo "  nohup vllm serve deepseek-ai/DeepSeek-OCR > vllm.log 2>&1 &"
echo ""
echo "The server will run on: http://localhost:8000"
echo ""
echo "Your backend is already configured to use it!"
echo "Just restart: cd backend && cargo run"
