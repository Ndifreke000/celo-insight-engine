# Vercel Frontend + Fly.io Backend Setup

This guide shows you how to deploy your frontend to Vercel and connect it to your Fly.io backend.

## Architecture

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Vercel    │ ──────> │   Fly.io     │ ──────> │    Celo     │
│  (Frontend) │  HTTPS  │  (Backend)   │   RPC   │ Blockchain  │
└─────────────┘         └──────────────┘         └─────────────┘
```

---

## Step 1: Deploy Backend to Fly.io

### 1.1 Deploy Backend

```bash
# Deploy backend
./deploy-fly.sh

# Or manually
flyctl deploy
```

### 1.2 Get Your Backend URL

After deployment, your backend will be at:
```
https://sentinel-x-backend.fly.dev
```

Test it:
```bash
curl https://sentinel-x-backend.fly.dev/api/health
```

---

## Step 2: Deploy Frontend to Vercel

### 2.1 Push to GitHub

```bash
git add .
git commit -m "Add Vercel configuration"
git push
```

### 2.2 Deploy to Vercel

#### Option A: Vercel Dashboard (Easiest)

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repo: `Ndifreke000/celo-insight-engine`
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add Environment Variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://sentinel-x-backend.fly.dev/api`

6. Click "Deploy"

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: sentinel-x
# - Directory: ./
# - Override settings? No

# Set environment variable
vercel env add VITE_API_URL production
# Enter: https://sentinel-x-backend.fly.dev/api

# Deploy to production
vercel --prod
```

---

## Step 3: Verify Connection

### 3.1 Test Backend

```bash
curl https://sentinel-x-backend.fly.dev/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Sentinel-X API is running",
  "ai_model": {...},
  "indexer": {...}
}
```

### 3.2 Test Frontend

1. Open your Vercel URL (e.g., `https://sentinel-x.vercel.app`)
2. Check browser console for: `🔗 API Base URL: https://sentinel-x-backend.fly.dev/api`
3. Navigate to "Live Dashboard" - should show real data
4. Try "AI Query" - should work with mock responses

---

## Configuration Files

### vercel.json

Already created with:
- Build configuration
- Environment variables
- Security headers
- SPA routing

### .env.production

Contains production API URL:
```
VITE_API_URL=https://sentinel-x-backend.fly.dev/api
```

### Backend CORS

Backend already configured to accept requests from any origin (including Vercel).

---

## Environment Variables

### Vercel (Frontend)

Set in Vercel Dashboard → Settings → Environment Variables:

```
VITE_API_URL=https://sentinel-x-backend.fly.dev/api
```

### Fly.io (Backend)

Set via flyctl:

```bash
flyctl secrets set CELO_RPC_URL="https://celo-mainnet.g.alchemy.com/v2/YOUR_KEY"
flyctl secrets set GROQ_API_KEY="your_groq_key" # Optional
```

---

## Custom Domains

### Add Custom Domain to Vercel

1. Go to Vercel Dashboard → Settings → Domains
2. Add your domain: `yourdomain.com`
3. Configure DNS:
   ```
   CNAME  @    cname.vercel-dns.com
   CNAME  www  cname.vercel-dns.com
   ```

### Add Custom Domain to Fly.io

```bash
flyctl certs add api.yourdomain.com
```

Configure DNS:
```
A     api  66.241.124.100
AAAA  api  2a09:8280:1::1:1
```

Update Vercel environment variable:
```
VITE_API_URL=https://api.yourdomain.com/api
```

---

## Troubleshooting

### Frontend Can't Connect to Backend

**Check CORS:**
```bash
curl -H "Origin: https://your-vercel-app.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS \
     https://sentinel-x-backend.fly.dev/api/health
```

Should return CORS headers.

**Check Environment Variable:**
```bash
# In Vercel dashboard, verify VITE_API_URL is set
# Or check in browser console: it should log the API URL
```

**Check Backend Health:**
```bash
curl https://sentinel-x-backend.fly.dev/api/health
```

### Build Fails on Vercel

**Check Node Version:**
Add to `package.json`:
```json
"engines": {
  "node": ">=18.0.0"
}
```

**Check Build Command:**
Vercel should use: `npm run build`

**Check Dependencies:**
```bash
npm install
npm run build
```

### API Requests Fail

**Check Network Tab:**
- Open browser DevTools → Network
- Look for failed requests
- Check if URL is correct

**Check Backend Logs:**
```bash
flyctl logs
```

---

## Performance Optimization

### Enable Caching

Add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Enable Compression

Vercel automatically enables gzip/brotli compression.

### CDN

Vercel automatically serves your app via their global CDN.

---

## Monitoring

### Vercel Analytics

Enable in Vercel Dashboard → Analytics

### Backend Monitoring

```bash
# View logs
flyctl logs

# View metrics
flyctl dashboard
```

---

## CI/CD

### Automatic Deployments

Vercel automatically deploys on:
- Push to `main` → Production
- Push to other branches → Preview

Fly.io can auto-deploy via GitHub Actions:

Create `.github/workflows/deploy-backend.yml`:
```yaml
name: Deploy Backend to Fly.io

on:
  push:
    branches: [main]
    paths:
      - 'backend/**'
      - 'Dockerfile'
      - 'fly.toml'

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

Get token: `flyctl auth token`
Add to GitHub Secrets as `FLY_API_TOKEN`

---

## Costs

### Vercel
- **Hobby (Free)**: 
  - 100GB bandwidth/month
  - Unlimited deployments
  - Perfect for this project!

### Fly.io
- **Free Tier**: 
  - 3 shared VMs
  - 160GB bandwidth
  - Enough for development

### Total Monthly Cost
- **Development**: $0 (both free tiers)
- **Production**: ~$6-13 (Fly.io paid tier)

---

## Security Checklist

- [x] HTTPS enabled (automatic on both platforms)
- [x] CORS configured
- [x] Environment variables for secrets
- [x] Security headers in vercel.json
- [x] No secrets in git
- [ ] Rate limiting (add if needed)
- [ ] API authentication (add if needed)

---

## Next Steps

1. ✅ Deploy backend to Fly.io
2. ✅ Deploy frontend to Vercel
3. ✅ Test connection
4. ⬜ Add custom domain (optional)
5. ⬜ Enable monitoring
6. ⬜ Set up CI/CD (optional)

Your full-stack app is now live! 🚀

- Frontend: `https://your-app.vercel.app`
- Backend: `https://sentinel-x-backend.fly.dev`
