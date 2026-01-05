#!/bin/bash

# Sentinel-X vLLM Setup Script
# Sets up OpenAI's gpt-oss-20b model for local AI inference

set -e

echo "🚀 Sentinel-X vLLM Setup"
echo "========================"
echo ""
echo "Setting up OpenAI gpt-oss-20b (21B parameters, runs on 16GB RAM)"
echo "Apache 2.0 licensed - perfect for blockchain AI applications"
echo ""

# Check if uv is installed
if ! command -v uv &> /dev/null; then
    echo "📦 Installing uv (Python package manager)..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
    export PATH="$HOME/.cargo/bin:$PATH"
fi

echo "✅ uv is installed"
echo ""

# Install vLLM with gpt-oss support
echo "📦 Installing vLLM with gpt-oss support..."
uv pip install --pre vllm==0.10.1+gptoss \
    --extra-index-url https://wheels.vllm.ai/gpt-oss/ \
    --extra-index-url https://download.pytorch.org/whl/nightly/cu128 \
    --index-strategy unsafe-best-match

echo ""
echo "✅ vLLM installed successfully!"
echo ""
echo "🎯 To start the AI model server, run:"
echo ""
echo "   vllm serve openai/gpt-oss-20b"
echo ""
echo "Or for faster startup with lower memory:"
echo ""
echo "   vllm serve openai/gpt-oss-20b --max-model-len 4096"
echo ""
echo "The model will be available at: http://localhost:8000"
echo ""
echo "💡 Tips:"
echo "  - First run will download the model (~40GB)"
echo "  - Requires 16GB+ RAM"
echo "  - GPU recommended but not required"
echo "  - Set reasoning level in prompts: 'Reasoning: low/medium/high'"
echo ""
