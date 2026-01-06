# Contributing to Sentinel-X

Welcome! We're excited you want to contribute to Sentinel-X, a blockchain intelligence platform for the Celo ecosystem.

---

## 📖 Table of Contents

- [What is Sentinel-X?](#what-is-sentinel-x)
- [Non-Technical Overview](#non-technical-overview)
- [Technical Overview](#technical-overview)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Known Issues](#known-issues)
- [Future Development](#future-development)
- [How to Contribute](#how-to-contribute)

---

## What is Sentinel-X?

Sentinel-X is a real-time blockchain intelligence platform that makes Celo blockchain data accessible and actionable through AI-powered insights.

### The Problem We Solve

Blockchain data is complex and hard to understand. Developers and users need:
- Real-time access to blockchain data
- AI-powered analysis and insights
- Easy-to-use interfaces
- Smart contract security analysis
- Price predictions and market intelligence

### Our Solution

Sentinel-X provides:
- **Live Blockchain Explorer** - Browse Celo blocks and transactions in real-time
- **AI Query Engine** - Ask questions about blockchain data in plain English
- **Smart Contract Analyzer** - Get AI-powered security audits
- **Price Intelligence** - Real-time prices with AI predictions
- **Developer API** - Easy integration for other apps

---

## Non-Technical Overview

### What Does It Do?

Think of Sentinel-X as a "smart assistant" for the Celo blockchain:

1. **Watches the Blockchain** - Constantly monitors Celo for new blocks and transactions
2. **Understands Your Questions** - You can ask "What is this contract doing?" in plain English
3. **Provides Insights** - Uses AI to explain complex blockchain data simply
4. **Predicts Trends** - Analyzes patterns to predict price movements
5. **Keeps You Safe** - Scans smart contracts for security issues

### Who Is It For?

- **Developers** - Building on Celo and need blockchain data
- **Traders** - Want real-time prices and AI predictions
- **Researchers** - Analyzing blockchain patterns and trends
- **Security Auditors** - Checking smart contracts for vulnerabilities
- **Curious Users** - Learning about blockchain technology

### How Does It Work?

```
User Question → AI Engine → Blockchain Data → Smart Answer
     ↓              ↓              ↓              ↓
  "What is      Understands    Fetches real   "This is a
   this           natural       blockchain     token swap
  contract?"     language        data          contract..."
```

---

## Technical Overview

### Tech Stack

**Frontend:**
- React + TypeScript
- Vite (build tool)
- TailwindCSS + shadcn/ui (styling)
- React Router (navigation)

**Backend:**
- Rust (Axum framework)
- Tokio (async runtime)
- ethers-rs (blockchain interaction)
- reqwest (HTTP client)

**Blockchain:**
- Celo Mainnet (via Alchemy RPC)
- Fallback to Forno (Celo's public RPC)

**AI Integration:**
- Ollama (local AI models)
- Groq API (cloud AI)
- OpenAI API (optional)
- Mock responses (fallback)

**Data Sources:**
- Celo blockchain (blocks, transactions)
- CoinGecko API (price data)
- AI models (analysis and predictions)

### Project Structure

```
celo-insight-engine/
├── backend/                 # Rust backend
│   ├── src/
│   │   ├── main.rs         # Entry point
│   │   ├── routes.rs       # API routes
│   │   ├── handlers.rs     # Request handlers
│   │   ├── ai_engine.rs    # AI integration
│   │   ├── celo_client.rs  # Blockchain client
│   │   ├── indexer.rs      # Data indexer
│   │   ├── models.rs       # Data models
│   │   └── config.rs       # Configuration
│   ├── Cargo.toml          # Rust dependencies
│   └── .env                # Environment variables
│
├── src/                     # React frontend
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Landing page
│   │   ├── App.tsx         # Dashboard
│   │   └── Docs.tsx        # Documentation
│   ├── components/         # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── LiveDashboard.tsx
│   │   └── ...
│   ├── lib/
│   │   └── api.ts          # API client
│   └── main.tsx            # Entry point
│
├── start.sh                # Start all services
├── stop.sh                 # Stop all services
└── README.md               # Main documentation
```

---

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     User Interface                       │
│              (React + TypeScript + Vite)                 │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/REST
                     ↓
┌─────────────────────────────────────────────────────────┐
│                   Backend API Server                     │
│                  (Rust + Axum + Tokio)                   │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Routes     │  │   Handlers   │  │   Models     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└────────┬──────────────────┬──────────────────┬─────────┘
         │                  │                  │
         ↓                  ↓                  ↓
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│  Celo Client   │  │   AI Engine    │  │    Indexer     │
│  (ethers-rs)   │  │  (Ollama/API)  │  │  (Real-time)   │
└────────┬───────┘  └────────┬───────┘  └────────┬───────┘
         │                   │                   │
         ↓                   ↓                   ↓
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│ Celo Blockchain│  │   AI Models    │  │  Price APIs    │
│  (Alchemy RPC) │  │ (Local/Cloud)  │  │  (CoinGecko)   │
└────────────────┘  └────────────────┘  └────────────────┘
```

### Data Flow

1. **User Request** → Frontend sends HTTP request
2. **API Router** → Routes to appropriate handler
3. **Handler** → Processes request, calls services
4. **Services** → Fetch blockchain data, run AI, get prices
5. **Response** → JSON data sent back to frontend
6. **UI Update** → React components display data

### Key Components

**Backend Services:**

1. **Celo Client** (`celo_client.rs`)
   - Connects to Celo blockchain via RPC
   - Fetches blocks, transactions, contracts
   - Handles connection failures gracefully

2. **AI Engine** (`ai_engine.rs`)
   - Integrates multiple AI providers
   - Caches responses for performance
   - Falls back to mock data if no AI available

3. **Indexer** (`indexer.rs`)
   - Processes real-time blockchain data
   - Tracks metrics and statistics
   - Manages data feeds

4. **Handlers** (`handlers.rs`)
   - Process API requests
   - Coordinate between services
   - Return formatted responses

**Frontend Components:**

1. **Pages** - Full page views (Index, App, Docs)
2. **Components** - Reusable UI pieces (Navbar, Cards, etc.)
3. **API Client** - Handles all backend communication
4. **State Management** - React hooks for data

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (for frontend)
- **Rust** 1.75+ (for backend)
- **Git** (for version control)

Optional:
- **Ollama** (for local AI)
- **Alchemy API key** (for Celo RPC)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Ndifreke000/celo-insight-engine.git
cd celo-insight-engine

# Start everything (backend + frontend + AI)
./start.sh

# Or start manually:

# Terminal 1: Backend
cd backend
cargo run

# Terminal 2: Frontend
npm install
npm run dev

# Terminal 3: AI (optional)
ollama serve
ollama pull llama3.2:3b
```

### Configuration

Create `backend/.env`:
```bash
PORT=3000
HOST=127.0.0.1
RUST_LOG=debug

# Celo RPC (get from alchemy.com)
CELO_RPC_URL=https://celo-mainnet.g.alchemy.com/v2/YOUR_KEY

# AI (optional)
OLLAMA_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=llama3.2:3b
```

---

## Development Workflow

### Making Changes

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Frontend: Edit files in `src/`
   - Backend: Edit files in `backend/src/`

3. **Test locally**
   ```bash
   # Backend tests
   cd backend
   cargo test
   
   # Frontend (manual testing)
   npm run dev
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "Add: your feature description"
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Describe your changes
   - Wait for review

### Code Style

**Rust:**
- Use `cargo fmt` before committing
- Run `cargo clippy` to catch issues
- Follow Rust naming conventions

**TypeScript/React:**
- Use functional components with hooks
- Keep components small and focused
- Use TypeScript types (no `any`)

### Testing

**Backend:**
```bash
cd backend
cargo test
cargo clippy
```

**Frontend:**
```bash
npm run build  # Check for build errors
```

---

## Known Issues

### Current Limitations

1. **AI Features**
   - Requires external AI service (Ollama/Groq/OpenAI)
   - Falls back to mock responses if not configured
   - No fine-tuned Celo-specific model yet

2. **Blockchain Data**
   - Requires Alchemy API key for full functionality
   - Falls back to mock data without RPC
   - Limited historical data

3. **Performance**
   - First AI query may be slow (model loading)
   - Large blockchain queries can timeout
   - No caching for blockchain data yet

4. **Security**
   - CORS set to allow all origins (needs restriction)
   - No rate limiting implemented
   - No authentication system

### Common Errors

**"Backend not responding"**
- Check if backend is running: `curl http://localhost:3000/api/health`
- Check logs: `tail -f /tmp/backend.log`
- Verify `.env` file exists

**"AI query timeout"**
- AI service not running (start Ollama)
- Network issues (check internet)
- Model not downloaded (run `ollama pull llama3.2:3b`)

**"Blockchain data unavailable"**
- No RPC URL configured (add `CELO_RPC_URL` to `.env`)
- Alchemy API key invalid (check key)
- Network issues (check internet)

**"Build fails"**
- Missing dependencies (run `npm install` or `cargo build`)
- Node/Rust version too old (update)
- Port already in use (change port in `.env`)

---

## Future Development

### Roadmap

**Phase 1: Foundation** ✅ (Complete)
- Real-time blockchain explorer
- Basic AI integration
- Price data integration

**Phase 2: Intelligence** 🚧 (In Progress)
- Fine-tuned Celo AI model
- Advanced contract analysis
- Predictive analytics

**Phase 3: Oracle** 📋 (Planned)
- zkML proof generation
- On-chain AI verification
- Decentralized inference

**Phase 4: Ecosystem** 🔮 (Future)
- Developer SDK
- Mobile app
- Multi-chain support

### Feature Ideas

**High Priority:**
- [ ] User authentication
- [ ] API rate limiting
- [ ] Caching layer for blockchain data
- [ ] WebSocket for real-time updates
- [ ] Fine-tuned AI model for Celo

**Medium Priority:**
- [ ] Historical data analysis
- [ ] Custom alerts and notifications
- [ ] Portfolio tracking
- [ ] Transaction simulation
- [ ] Gas optimization suggestions

**Low Priority:**
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Mobile responsive improvements
- [ ] Export data to CSV
- [ ] Shareable reports

### Technical Debt

- Improve error handling in frontend
- Add comprehensive test coverage
- Implement proper logging system
- Optimize bundle size
- Add database for caching
- Implement proper state management (Redux/Zustand)

---

## How to Contribute

### Ways to Contribute

1. **Code Contributions**
   - Fix bugs
   - Add features
   - Improve performance
   - Write tests

2. **Documentation**
   - Improve README
   - Add code comments
   - Write tutorials
   - Create examples

3. **Design**
   - UI/UX improvements
   - Create mockups
   - Design assets
   - Accessibility improvements

4. **Testing**
   - Report bugs
   - Test new features
   - Write test cases
   - Performance testing

5. **Community**
   - Answer questions
   - Help other contributors
   - Share the project
   - Write blog posts

### Contribution Guidelines

1. **Before Starting**
   - Check existing issues
   - Discuss major changes first
   - Read this guide completely

2. **Code Quality**
   - Write clean, readable code
   - Add comments for complex logic
   - Follow existing patterns
   - Test your changes

3. **Pull Requests**
   - One feature per PR
   - Clear description
   - Link related issues
   - Update documentation

4. **Communication**
   - Be respectful and professional
   - Ask questions if unclear
   - Respond to feedback
   - Help others

### Getting Help

- **Issues**: Open a GitHub issue
- **Discussions**: Use GitHub Discussions
- **Email**: [Your contact email]
- **Discord**: [If you have one]

---

## Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Given credit in documentation
- Invited to maintainer team (for significant contributions)

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Thank You!

Every contribution, no matter how small, makes Sentinel-X better. We appreciate your time and effort in helping build the future of blockchain intelligence! 🚀

---

**Questions?** Open an issue or reach out to the maintainers.

**Ready to contribute?** Check out the [open issues](https://github.com/Ndifreke000/celo-insight-engine/issues) and pick one to work on!
