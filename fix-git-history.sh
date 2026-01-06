#!/bin/bash

# Script to remove sensitive data from git history

echo "🔒 Removing sensitive data from git history"
echo "==========================================="
echo ""

echo "⚠️  WARNING: This will rewrite git history!"
echo "   Make sure you have a backup of your repo."
echo ""
read -p "Continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled"
    exit 0
fi

echo ""
echo "📦 Installing BFG Repo Cleaner..."

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is required but not installed"
    echo "   Install with: sudo apt install default-jre"
    exit 1
fi

# Download BFG if not present
if [ ! -f "bfg.jar" ]; then
    wget https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar -O bfg.jar
fi

echo "✅ BFG ready"
echo ""

# Create a backup
echo "💾 Creating backup..."
cd ..
tar -czf celo-insight-engine-backup-$(date +%Y%m%d-%H%M%S).tar.gz celo-insight-engine/
cd celo-insight-engine
echo "✅ Backup created"
echo ""

# Remove the file from history
echo "🧹 Cleaning git history..."
java -jar bfg.jar --delete-files backend/.env

# Clean up
echo "🗑️  Cleaning up..."
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo ""
echo "✅ Git history cleaned!"
echo ""
echo "📤 Now force push to GitHub:"
echo "   git push --force origin main"
echo ""
echo "⚠️  Note: Anyone who has cloned the repo will need to re-clone"
echo ""
