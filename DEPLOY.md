# Production Deployment Guide

## 🚀 Deploy Sentinel-X to Production

### Prerequisites
- Linux server (Ubuntu 20.04+ recommended)
- 4GB+ RAM
- 20GB+ disk space
- Domain name (optional)
- SSL certificate (optional, recommended)

---

## 📦 Backend Deployment

### 1. Build for Production

```bash
cd backend
cargo build --release
```

Binary will be at: `backend/target/release/backend`

### 2. Configure Environment

```bash
# Create production .env
cat > backend/.env << EOF
PORT=3000
HOST=0.0.0.0
RUST_LOG=info

# Celo RPC
CELO_RPC_URL=https://celo-mainnet.g.alchemy.com/v2/YOUR_KEY

# AI (choose one)
VLLM_URL=http://localhost:8000/v1/completions
VLLM_MODEL=deepseek-ai/DeepSeek-OCR
EOF
```

### 3. Run as Service

```bash
# Create systemd service
sudo tee /etc/systemd/system/sentinel-x.service << EOF
[Unit]
Description=Sentinel-X Backend
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=/path/to/celo-insight-engine/backend
ExecStart=/path/to/celo-insight-engine/backend/target/release/backend
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Enable and start
sudo systemctl enable sentinel-x
sudo systemctl start sentinel-x
sudo systemctl status sentinel-x
```

### 4. Setup Nginx Reverse Proxy

```bash
sudo tee /etc/nginx/sites-available/sentinel-x << EOF
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/sentinel-x /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. Add SSL (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

---

## 🎨 Frontend Deployment

### 1. Build for Production

```bash
npm run build
```

Output will be in: `dist/`

### 2. Deploy to Vercel (Easiest)

```bash
npm install -g vercel
vercel --prod
```

### 3. Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### 4. Deploy to Your Server

```bash
# Copy build to server
scp -r dist/* user@server:/var/www/sentinel-x/

# Configure Nginx
sudo tee /etc/nginx/sites-available/sentinel-x-frontend << EOF
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/sentinel-x;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/sentinel-x-frontend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🧠 Deploy vLLM (Optional)

### Using Docker

```bash
docker run -d \
  --name deepseek-vllm \
  --runtime nvidia \
  --gpus all \
  -v ~/.cache/huggingface:/root/.cache/huggingface \
  -p 8000:8000 \
  --restart always \
  vllm/vllm-openai:latest \
  --model deepseek-ai/DeepSeek-OCR
```

### Using Systemd

```bash
sudo tee /etc/systemd/system/vllm.service << EOF
[Unit]
Description=vLLM DeepSeek Server
After=network.target

[Service]
Type=simple
User=$USER
ExecStart=/usr/local/bin/vllm serve deepseek-ai/DeepSeek-OCR
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable vllm
sudo systemctl start vllm
```

---

## 🔒 Security Checklist

- [ ] Use HTTPS (SSL certificates)
- [ ] Set up firewall (ufw/iptables)
- [ ] Use environment variables for secrets
- [ ] Enable CORS only for your domain
- [ ] Rate limit API endpoints
- [ ] Monitor logs for suspicious activity
- [ ] Keep dependencies updated
- [ ] Use strong API keys
- [ ] Backup database regularly
- [ ] Set up monitoring (Prometheus/Grafana)

---

## 📊 Monitoring

### Setup Prometheus

```bash
# Add to backend/Cargo.toml
[dependencies]
prometheus = "0.13"
```

### Setup Grafana Dashboard

1. Install Grafana
2. Add Prometheus data source
3. Import dashboard for Rust metrics
4. Monitor:
   - Request rate
   - Response time
   - Error rate
   - Memory usage
   - CPU usage

---

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
      - run: cd backend && cargo build --release
      - run: scp target/release/backend user@server:/path/to/deploy
      - run: ssh user@server 'systemctl restart sentinel-x'

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 💰 Cost Estimation

### Minimal Setup (Free Tier)
- **Backend**: Heroku/Railway free tier
- **Frontend**: Vercel/Netlify free tier
- **Database**: None (stateless)
- **AI**: HuggingFace free tier
- **Total**: $0/month

### Production Setup
- **Backend**: DigitalOcean Droplet ($12/month)
- **Frontend**: Vercel Pro ($20/month)
- **AI**: OpenAI API (~$50/month)
- **Monitoring**: Grafana Cloud free tier
- **Total**: ~$82/month

### Enterprise Setup
- **Backend**: AWS EC2 t3.large ($60/month)
- **Frontend**: Cloudflare + S3 ($10/month)
- **AI**: Self-hosted GPU server ($200/month)
- **Database**: PostgreSQL RDS ($50/month)
- **Monitoring**: Datadog ($100/month)
- **Total**: ~$420/month

---

## 🎯 Performance Optimization

1. **Enable Caching**
   - Redis for API responses
   - CDN for static assets

2. **Database Optimization**
   - Add PostgreSQL for persistent data
   - Index frequently queried fields

3. **Load Balancing**
   - Multiple backend instances
   - Nginx load balancer

4. **Compression**
   - Enable gzip in Nginx
   - Compress API responses

---

## 📈 Scaling Strategy

### Phase 1: Single Server (0-1k users)
- 1 backend instance
- Static frontend on CDN
- Shared AI API

### Phase 2: Horizontal Scaling (1k-10k users)
- 3+ backend instances
- Load balancer
- Dedicated AI server
- Redis cache

### Phase 3: Distributed (10k+ users)
- Kubernetes cluster
- Multiple regions
- Database replication
- Auto-scaling

---

## 🆘 Support

For deployment issues:
1. Check logs: `journalctl -u sentinel-x -f`
2. Test endpoints: `curl http://localhost:3000/api/health`
3. Verify environment: `cat backend/.env`
4. Check firewall: `sudo ufw status`
