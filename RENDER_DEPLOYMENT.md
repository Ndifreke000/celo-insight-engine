# Render Deployment Guide

## Quick Deploy Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

### 2. Deploy on Render

#### Option A: Using Blueprint (Recommended)
1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository: `Ndifreke000/celo-insight-engine`
4. Render will automatically read `render.yaml` and create both services

#### Option B: Manual Setup
1. Create Backend Service:
   - Click **"New +"** → **"Web Service"**
   - Connect GitHub repo
   - Name: `celo-insight-backend`
   - Environment: **Docker**
   - Dockerfile Path: `./backend/Dockerfile`
   - Docker Context: `./backend`
   - Plan: **Free**

2. Create Frontend Service:
   - Click **"New +"** → **"Static Site"**
   - Connect same GitHub repo
   - Name: `celo-insight-frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

### 3. Configure Environment Variables

#### Backend Service Environment Variables:
Go to your backend service → **Environment** tab → Add:

**Required:**
```
HOST=0.0.0.0
RUST_LOG=info
```

**Optional (for real blockchain data):**
```
CELO_RPC_URL=https://celo-mainnet.g.alchemy.com/v2/YOUR_KEY
```

**Optional (for real AI - highly recommended):**
```
GROQ_API_KEY=gsk_your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

#### Frontend Environment Variables:
```
VITE_API_URL=https://celo-insight-backend.onrender.com/api
```
(Replace with your actual backend URL from Render)

### 4. Get Groq API Key (Free)
1. Go to https://console.groq.com
2. Sign up (free)
3. Create API key
4. Add to Render backend environment variables
5. Redeploy

## Troubleshooting

### Issue: "No open ports detected on 0.0.0.0"
**Solution:** Make sure `HOST=0.0.0.0` is set in environment variables

### Issue: "Mock AI responses"
**Solution:** Add `GROQ_API_KEY` environment variable

### Issue: "Cannot connect to Celo network"
**Solution:** Add `CELO_RPC_URL` with Alchemy or Infura endpoint

### Issue: Frontend can't reach backend
**Solution:** Update `VITE_API_URL` in frontend environment variables to match your backend URL

## Expected Deployment Time
- Backend: ~5-7 minutes (Rust compilation)
- Frontend: ~2-3 minutes (Node build)

## Free Tier Limits
- Backend: 750 hours/month
- Frontend: Unlimited bandwidth
- Both services sleep after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up

## URLs After Deployment
- Backend: `https://celo-insight-backend.onrender.com`
- Frontend: `https://celo-insight-frontend.onrender.com`
- API Health: `https://celo-insight-backend.onrender.com/api/health`

## Post-Deployment Testing
```bash
# Test backend health
curl https://celo-insight-backend.onrender.com/api/health

# Test contract analysis
curl -X POST https://celo-insight-backend.onrender.com/api/contract/explain \
  -H "Content-Type: application/json" \
  -d '{"contract_address":"0x471EcE3750Da237f93B8E339c536989b8978a438"}'
```

## Notes
- Render automatically sets `PORT` environment variable (usually 10000)
- Don't override `PORT` - let Render manage it
- Services auto-deploy on git push to main branch
- Check logs in Render dashboard if deployment fails
