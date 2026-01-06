# Fly.io Deployment Guide for Sentinel-X

## Quick Deploy

### Option 1: Automated Script (Recommended)

```bash
./deploy-fly.sh
```

This script will:
1. Install flyctl if needed
2. Log you in to Fly.io
3. Create the app
4. Set up secrets
5. Deploy your backend

### Option 2: Manual Deployment

Follow the steps below for manual control.

---

## Prerequisites

1. **Fly.io Account**: Sign up at https://fly.io
2. **flyctl CLI**: Install with:
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```
3. **Alchemy API Key**: Get from https://alchemy.com

---

## Step-by-Step Deployment

### 1. Install and Login

```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Add to PATH
export PATH="$HOME/.fly/bin:$PATH"

# Login
flyctl auth login
```

### 2. Create App

```bash
# Create app (choose a unique name)
flyctl apps create sentinel-x-backend

# Or let Fly.io generate a name
flyctl apps create
```

### 3. Set Secrets

```bash
# Required: Celo RPC
flyctl secrets set CELO_RPC_URL="https://celo-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY"

# Optional: AI API (if not using local Ollama)
flyctl secrets set GROQ_API_KEY="your_groq_key"
# or
flyctl secrets set OPENAI_API_KEY="your_openai_key"
```

### 4. Deploy

```bash
# Deploy from root directory
flyctl deploy

# Or specify app name
flyctl deploy -a sentinel-x-backend
```

### 5. Verify Deployment

```bash
# Check status
flyctl status

# View logs
flyctl logs

# Test API
curl https://sentinel-x-backend.fly.dev/api/health
```

---

## Fly.io Dashboard Configuration

When using the Fly.io web dashboard, fill in:

### Basic Settings

- **App name**: `sentinel-x-backend` (or your choice)
- **Organization**: Personal (or your org)
- **Branch to deploy**: `main`
- **Current Working Directory**: Leave empty (root)
- **Config path**: Leave empty (uses `fly.toml`)

### Environment Variables (Secrets)

Set these in the Fly.io dashboard under "Secrets":

```
CELO_RPC_URL=https://celo-mainnet.g.alchemy.com/v2/YOUR_KEY
GROQ_API_KEY=your_key_here (optional)
```

---

## Configuration Files

### fly.toml

Already created in your repo. Key settings:

```toml
app = "sentinel-x-backend"
primary_region = "iad"  # Change to your region

[http_service]
  internal_port = 8080
  force_https = true
```

### Dockerfile

Multi-stage build for optimal size:
- Build stage: Compiles Rust backend
- Runtime stage: Minimal Debian image
- Final size: ~100MB

---

## Regions

Choose a region close to your users:

```bash
# List available regions
flyctl platform regions

# Common regions:
# iad - Ashburn, Virginia (US East)
# lax - Los Angeles, California (US West)
# lhr - London, United Kingdom
# fra - Frankfurt, Germany
# sin - Singapore
# syd - Sydney, Australia
```

Update `primary_region` in `fly.toml`.

---

## Scaling

### Vertical Scaling (Machine Size)

```bash
# Upgrade to 2GB RAM
flyctl scale memory 2048

# Upgrade to 2 CPUs
flyctl scale vm shared-cpu-2x
```

### Horizontal Scaling (Multiple Machines)

```bash
# Scale to 2 machines
flyctl scale count 2

# Auto-scale based on load
flyctl autoscale set min=1 max=3
```

---

## Monitoring

### View Logs

```bash
# Real-time logs
flyctl logs

# Last 100 lines
flyctl logs --lines 100

# Filter by level
flyctl logs --level error
```

### Metrics

```bash
# Open Grafana dashboard
flyctl dashboard

# Check machine status
flyctl status

# View machine metrics
flyctl machine list
```

### Health Checks

Fly.io automatically monitors `/api/health`:
- Interval: 30 seconds
- Timeout: 5 seconds
- Restarts unhealthy machines

---

## Costs

### Free Tier
- 3 shared-cpu-1x machines (256MB RAM each)
- 160GB outbound data transfer
- Perfect for testing!

### Paid Plans
- **Hobby**: $1.94/month (shared-cpu-1x, 256MB)
- **Standard**: $5.69/month (shared-cpu-1x, 1GB)
- **Performance**: $12.74/month (shared-cpu-2x, 2GB)

### Estimated Monthly Cost
- **Development**: Free (within free tier)
- **Production**: ~$6-13/month (1GB-2GB RAM)

---

## Troubleshooting

### Build Fails

```bash
# Check Dockerfile syntax
docker build -t test .

# View build logs
flyctl logs --app sentinel-x-backend
```

### App Won't Start

```bash
# Check machine status
flyctl status

# View detailed logs
flyctl logs --level debug

# SSH into machine
flyctl ssh console
```

### Health Check Failing

```bash
# Test health endpoint locally
curl http://localhost:8080/api/health

# Check if port is correct in fly.toml
# internal_port should match PORT in .env (8080)
```

### Out of Memory

```bash
# Upgrade RAM
flyctl scale memory 1024  # 1GB
flyctl scale memory 2048  # 2GB
```

---

## CI/CD with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Fly.io

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: superfly/flyctl-actions/setup-flyctl@master
      
      - run: flyctl deploy --remote-only
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

Get your API token:
```bash
flyctl auth token
```

Add it to GitHub Secrets as `FLY_API_TOKEN`.

---

## Custom Domain

### Add Domain

```bash
# Add your domain
flyctl certs add yourdomain.com

# Add www subdomain
flyctl certs add www.yourdomain.com
```

### DNS Configuration

Add these records to your DNS:

```
A     @     66.241.124.100
AAAA  @     2a09:8280:1::1:1
CNAME www   sentinel-x-backend.fly.dev
```

### Verify

```bash
# Check certificate status
flyctl certs show yourdomain.com

# Test
curl https://yourdomain.com/api/health
```

---

## Database (Optional)

If you need persistent storage:

```bash
# Create Postgres database
flyctl postgres create

# Attach to app
flyctl postgres attach --app sentinel-x-backend

# Connection string automatically added as DATABASE_URL secret
```

---

## Backup & Recovery

### Backup

```bash
# Export secrets
flyctl secrets list > secrets-backup.txt

# Backup fly.toml (already in git)
```

### Recovery

```bash
# Restore secrets
flyctl secrets import < secrets-backup.txt

# Redeploy
flyctl deploy
```

---

## Updates

### Deploy New Version

```bash
# Pull latest code
git pull origin main

# Deploy
flyctl deploy
```

### Rollback

```bash
# List releases
flyctl releases

# Rollback to previous
flyctl releases rollback
```

---

## Security Best Practices

1. **Never commit secrets**: Use `flyctl secrets set`
2. **Enable HTTPS**: Already configured in `fly.toml`
3. **Use private networking**: For multi-app setups
4. **Regular updates**: Keep dependencies updated
5. **Monitor logs**: Watch for suspicious activity

---

## Support

- **Fly.io Docs**: https://fly.io/docs
- **Community**: https://community.fly.io
- **Status**: https://status.fly.io

---

## Next Steps

After deployment:

1. ✅ Test API: `curl https://your-app.fly.dev/api/health`
2. ✅ Configure frontend to use your backend URL
3. ✅ Set up custom domain (optional)
4. ✅ Enable monitoring and alerts
5. ✅ Set up CI/CD for automatic deployments

Your backend is now live and ready to serve blockchain data! 🚀
