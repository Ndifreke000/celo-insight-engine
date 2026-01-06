# AI Setup Guide for Sentinel-X

The Sentinel-X platform currently uses mock AI responses. This guide shows you how to add real AI capabilities using local models.

## Option 1: Ollama (Easiest - Recommended)

Ollama is the simplest way to run local AI models.

### Installation

```bash
# Linux
curl -fsSL https://ollama.com/install.sh | sh

# macOS
brew install ollama

# Or download from: https://ollama.com/download
```

### Start Ollama

```bash
# Start Ollama service
ollama serve

# In another terminal, pull a model
ollama pull llama3.2:3b  # Small, fast model (2GB)
# or
ollama pull llama3.1:8b  # Better quality (4.7GB)
```

### Configure Backend

Add to `backend/.env`:

```bash
# Ollama runs on port 11434 by default
VLLM_URL=http://localhost:11434/v1/chat/completions
VLLM_MODEL=llama3.2:3b
```

### Restart Backend

```bash
cd backend
cargo run --release
```

---

## Option 2: LM Studio (GUI - User Friendly)

LM Studio provides a nice GUI for managing local models.

### Installation

1. Download from: https://lmstudio.ai/
2. Install and open LM Studio
3. Search and download a model (e.g., "Llama 3.2 3B")
4. Click "Start Server" in the Local Server tab
5. Note the server URL (usually `http://localhost:1234`)

### Configure Backend

Add to `backend/.env`:

```bash
VLLM_URL=http://localhost:1234/v1/chat/completions
VLLM_MODEL=llama-3.2-3b-instruct
```

---

## Option 3: vLLM (Advanced - Best Performance)

vLLM offers the best performance but requires more setup.

### Requirements

- Python 3.8+
- CUDA-capable GPU (recommended)
- 8GB+ RAM

### Installation

```bash
# Create virtual environment
python3 -m venv vllm-env
source vllm-env/bin/activate

# Install vLLM
pip install vllm

# Start server with a model
vllm serve microsoft/Phi-3-mini-4k-instruct --port 8000
```

### Configure Backend

Add to `backend/.env`:

```bash
VLLM_URL=http://localhost:8000/v1/completions
VLLM_MODEL=microsoft/Phi-3-mini-4k-instruct
```

---

## Recommended Models

### Small & Fast (2-4GB RAM)
- `llama3.2:3b` - Good balance of speed and quality
- `phi3:mini` - Microsoft's efficient model
- `qwen2.5:3b` - Excellent for coding tasks

### Medium Quality (8-16GB RAM)
- `llama3.1:8b` - Better reasoning
- `mistral:7b` - Strong general purpose
- `gemma2:9b` - Google's model

### Large & Powerful (16GB+ RAM, GPU recommended)
- `llama3.1:70b` - Best quality
- `mixtral:8x7b` - Mixture of experts
- `qwen2.5:32b` - Excellent for technical tasks

---

## Testing Your Setup

Once configured, test the AI:

```bash
# Test the API endpoint
curl -X POST http://localhost:3000/api/ai/query \
  -H "Content-Type: application/json" \
  -d '{"prompt":"What is Celo blockchain?","task_type":"GeneralQuery"}'
```

Or use the web interface:
1. Open http://localhost:5173
2. Go to the "AI Query" tab
3. Ask a question about Celo

---

## Troubleshooting

### Model not responding
- Check if the model server is running: `curl http://localhost:11434/api/tags` (Ollama)
- Verify the URL in `.env` matches your server
- Check backend logs for connection errors

### Out of memory
- Use a smaller model (3B instead of 7B)
- Close other applications
- Consider using quantized models (Q4 or Q5)

### Slow responses
- Use a smaller model
- Enable GPU acceleration if available
- Reduce `max_tokens` in requests

---

## Backend Code Integration

The backend automatically detects and uses configured AI services in this order:

1. Groq API (if `GROQ_API_KEY` is set)
2. Local vLLM/Ollama (if `VLLM_URL` is set)
3. HuggingFace API (if `HF_API_KEY` is set)
4. OpenAI API (if `OPENAI_API_KEY` is set)
5. Mock responses (fallback)

No code changes needed - just set the environment variables!

---

## Performance Tips

1. **Use quantized models**: Q4 or Q5 versions use less RAM
2. **Adjust context length**: Smaller context = faster responses
3. **Enable GPU**: Dramatically faster with CUDA
4. **Cache responses**: The backend caches AI responses automatically
5. **Use appropriate model size**: Don't use 70B when 3B works fine

---

## Security Notes

- Local models run entirely on your machine
- No data sent to external services
- API keys (if used) should be kept in `.env` (already in `.gitignore`)
- Never commit API keys to version control

---

## Next Steps

After setting up AI:

1. Test basic queries in the AI Query tab
2. Try contract analysis features
3. Use price prediction with AI insights
4. Explore the AI Playground for custom prompts

For questions or issues, check the main README.md or open an issue on GitHub.
