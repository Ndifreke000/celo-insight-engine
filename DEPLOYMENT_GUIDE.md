# Sentinel-X Deployment Guide

## Quick Deploy (Single Server)

### 1. One-Command Startup

```bash
# Clone and start
git clone <your-repo>
cd celo-insight-engine
./start.sh
```

That's it! The script handles everything:
- Installs Ollama AI
- Downloads the model
- Starts backend and frontend
- Configures all services

### 2. Access Your Platform

- Frontend: `http://your-server:5173`
- Backend API: `http://your-server:3000`
- Ollama AI: `http://your-server:11434`

---

## Production Deployment

### Option 1: Systemd Service (Linux)

```bash
# 1. Edit the service file
nano sentinel-x.service
# Update YOUR_USERNAME and paths

# 2. Install service
sudo cp sentinel-x.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable sentinel-x
sudo systemctl start sentinel-x

# 3. Check status
sudo systemctl status sentinel-x

# 4. View logs
sudo journalctl -u sentinel-x -f
```

### Option 2: Docker (Coming Soon)

```bash
# Build and run
docker-compose up -d
```

### Option 3: Cloud Platforms

#### Deploy to Railway

1. Connect your GitHub repo
2. Add environment variables from `backend/.env`
3. Set build command: `cd backend && cargo build --release`
4. Set start command: `./start.sh`

#### Deploy to Render

1. Create new Web Service
2. Connect repository
3. Build: `cd backend && cargo build --release`
4. Start: `./backend/target/release/backend`
5. Add Ollama as separate service

#### Deploy to DigitalOcean

1. Create Droplet (Ubuntu 22.04, 4GB RAM minimum)
2. SSH into server
3. Run deployment script:

```bash
curl -fsSL https://raw.githubusercontent.com/your-repo/main/deploy.sh | bash
```

---

## Environment Configuration

### Required Variables

```bash
# Celo RPC (Required)
CELO_RPC_URL=https://celo-mainnet.g.alchemy.com/v2/YOUR_KEY

# AI Model (Auto-configured by start.sh)
OLLAMA_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=llama3.2:3b
```

### Optional Variables

```bash
# Use cloud AI instead of local
GROQ_API_KEY=your_key_here

# Custom ports
PORT=3000
FRONTEND_PORT=5173
```

---

## Scaling

### Horizontal Scaling

1. **Backend**: Run multiple instances behind load balancer
2. **Ollama**: Deploy on separate GPU server
3. **Frontend**: Serve static build via CDN

### Vertical Scaling

- **2GB RAM**: Mock AI responses only
- **4GB RAM**: Ollama with 3B model
- **8GB RAM**: Ollama with 7B model
- **16GB+ RAM**: Ollama with 13B+ models

---

## Monitoring

### Health Checks

```bash
# Backend health
curl http://localhost:3000/api/health

# Ollama health
curl http://localhost:11434/api/tags

# Frontend (should return HTML)
curl http://localhost:5173
```

### Logs

```bash
# View all logs
tail -f /tmp/backend.log
tail -f /tmp/frontend.log
tail -f /tmp/ollama.log

# Or use the monitoring script
./monitor.sh
```

---

## Security

### Production Checklist

- [ ] Change default ports
- [ ] Enable HTTPS (use Caddy or nginx)
- [ ] Set up firewall rules
- [ ] Use environment variables for secrets
- [ ] Enable CORS only for your domain
- [ ] Set up rate limiting
- [ ] Regular security updates

### Firewall Rules

```bash
# Allow only necessary ports
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

---

## Backup & Recovery

### Backup

```bash
# Backup configuration
tar -czf sentinel-x-backup.tar.gz backend/.env

# Backup Ollama models (optional, can re-download)
tar -czf ollama-models.tar.gz ~/.ollama/models
```

### Recovery

```bash
# Restore configuration
tar -xzf sentinel-x-backup.tar.gz

# Restart services
./start.sh
```

---

## Troubleshooting

### Backend won't start

```bash
# Check logs
cat /tmp/backend.log

# Verify Rust installation
cargo --version

# Rebuild
cd backend && cargo clean && cargo build --release
```

### Ollama not responding

```bash
# Check if running
pgrep ollama

# Restart Ollama
pkill ollama
ollama serve &

# Test directly
curl http://localhost:11434/api/tags
```

### Frontend build fails

```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

---

## Performance Tuning

### Backend

```bash
# Increase worker threads
export TOKIO_WORKER_THREADS=4

# Adjust log level
export RUST_LOG=info  # or warn for production
```

### Ollama

```bash
# Use GPU acceleration
ollama serve --gpu

# Adjust context size
# Edit model parameters in backend/.env
OLLAMA_CONTEXT_SIZE=2048
```

### Frontend

```bash
# Build for production
npm run build

# Serve with nginx or Caddy
```

---

## Updates

### Update Platform

```bash
git pull origin main
./stop.sh
cargo build --release
./start.sh
```

### Update AI Model

```bash
# Pull newer model
ollama pull llama3.2:latest

# Update backend/.env
OLLAMA_MODEL=llama3.2:latest

# Restart
./stop.sh && ./start.sh
```

---

## Support

- Documentation: See `AI_SETUP_GUIDE.md`
- Issues: GitHub Issues
- Community: Discord/Telegram (if available)

---

## Cost Estimates

### Self-Hosted (DigitalOcean)

- **Basic**: $12/month (2GB RAM, mock AI)
- **Standard**: $24/month (4GB RAM, Ollama 3B)
- **Pro**: $48/month (8GB RAM, Ollama 7B)

### Cloud AI (Groq)

- **Free Tier**: 14,400 requests/day
- **Paid**: ~$0.10 per 1M tokens

### Hybrid

- Self-host backend + Celo RPC
- Use Groq for AI
- Total: ~$12/month + API costs
