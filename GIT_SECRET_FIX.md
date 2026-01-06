# Fix: GitHub Secret Scanning Block

## The Problem

GitHub detected a Groq API key in commit `764f7b9` and blocked your push.

## Quick Solution (Recommended)

Since the API key is already removed from the latest code, you can:

### Option 1: Allow the Secret (One-Time)

1. Click this link from the error message:
   ```
   https://github.com/Ndifreke000/celo-insight-engine/security/secret-scanning/unblock-secret/37qPpkHwPaOKI6pNVjP3b1aHA0F
   ```

2. Click "Allow secret" (it's safe since it's already removed from current code)

3. Push again:
   ```bash
   git push
   ```

### Option 2: Revoke and Remove from History

If you want to completely remove the key from git history:

1. **Revoke the API key first**:
   - Go to https://console.groq.com/keys
   - Delete the exposed key
   - Create a new one

2. **Clean git history**:
   ```bash
   # Use BFG Repo Cleaner
   ./fix-git-history.sh
   
   # Then force push
   git push --force origin main
   ```

## Prevention

The `.env` file is now in `.gitignore`, so this won't happen again.

### Always check before committing:

```bash
# Check what you're about to commit
git status

# Make sure no .env files are listed
git diff --cached
```

### Use git hooks (optional):

Create `.git/hooks/pre-commit`:

```bash
#!/bin/bash
if git diff --cached --name-only | grep -q "\.env$"; then
    echo "❌ Error: Attempting to commit .env file!"
    echo "   Remove it with: git reset HEAD .env"
    exit 1
fi
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

## Current Status

✅ `.env` removed from tracking
✅ `.env` added to `.gitignore`  
✅ `.env.example` created for reference
✅ All secrets should now use environment variables or Fly.io secrets

## For Fly.io Deployment

Never commit secrets! Use:

```bash
# Set secrets in Fly.io
flyctl secrets set GROQ_API_KEY="your_new_key"
flyctl secrets set CELO_RPC_URL="your_alchemy_url"
```

## Summary

**Easiest fix**: Click the GitHub link to allow the secret, then push.

The key is already removed from your current code, so it's safe to allow it for this one-time push.
