#!/bin/bash

# Sentinel-X Fly.io Deployment Script

set -e

echo "🚀 Deploying Sentinel-X to Fly.io"
echo "=================================="
echo ""

# Check if flyctl is installed
if ! command -v flyctl &> /dev/null; then
    echo "📦 Installing flyctl..."
    curl -L https://fly.io/install.sh | sh
    export PATH="$HOME/.fly/bin:$PATH"
fi

echo "✅ flyctl installed"
echo ""

# Check if logged in
if ! flyctl auth whoami &> /dev/null; then
    echo "🔐 Please log in to Fly.io..."
    flyctl auth login
fi

echo "✅ Logged in to Fly.io"
echo ""

# Check if app exists
APP_NAME="sentinel-x-backend"
if flyctl apps list | grep -q "$APP_NAME"; then
    echo "📱 App '$APP_NAME' already exists"
    read -p "Deploy to existing app? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Deployment cancelled"
        exit 0
    fi
else
    echo "📱 Creating new app '$APP_NAME'..."
    flyctl apps create "$APP_NAME"
fi

echo ""
echo "🔑 Setting up secrets..."
echo ""

# Prompt for Alchemy API key
read -p "Enter your Alchemy API key (or press Enter to skip): " ALCHEMY_KEY
if [ ! -z "$ALCHEMY_KEY" ]; then
    flyctl secrets set CELO_RPC_URL="https://celo-mainnet.g.alchemy.com/v2/$ALCHEMY_KEY" -a "$APP_NAME"
    echo "✅ Celo RPC configured"
fi

# Optional: AI API keys
read -p "Enter Groq API key (optional, press Enter to skip): " GROQ_KEY
if [ ! -z "$GROQ_KEY" ]; then
    flyctl secrets set GROQ_API_KEY="$GROQ_KEY" -a "$APP_NAME"
    echo "✅ Groq API configured"
fi

echo ""
echo "🏗️  Building and deploying..."
echo ""

# Deploy
flyctl deploy -a "$APP_NAME"

echo ""
echo "=================================="
echo "✅ Deployment complete!"
echo ""
echo "📍 Your backend is live at:"
flyctl info -a "$APP_NAME" | grep Hostname
echo ""
echo "🔍 View logs:"
echo "   flyctl logs -a $APP_NAME"
echo ""
echo "📊 Open dashboard:"
echo "   flyctl dashboard -a $APP_NAME"
echo ""
echo "🌐 Test your API:"
echo "   curl https://$APP_NAME.fly.dev/api/health"
echo ""
