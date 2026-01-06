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

## Backend Deep Dive (Rust)

### Why Rust?

We chose Rust for the backend because:
- **Performance** - Near C++ speed, crucial for real-time blockchain data
- **Safety** - Memory safety without garbage collection
- **Concurrency** - Excellent async/await support via Tokio
- **Type System** - Catches bugs at compile time
- **Ecosystem** - Great libraries for blockchain (ethers-rs) and web (Axum)

### Backend Architecture

```
backend/
├── src/
│   ├── main.rs           # Application entry point & server setup
│   ├── config.rs         # Configuration management
│   ├── routes.rs         # API route definitions
│   ├── handlers.rs       # Request handlers (business logic)
│   ├── models.rs         # Data structures & types
│   ├── celo_client.rs    # Blockchain RPC client
│   ├── ai_engine.rs      # AI integration layer
│   ├── indexer.rs        # Real-time data indexer
│   └── lib.rs            # Library exports
├── Cargo.toml            # Dependencies & project config
└── .env                  # Environment variables
```

### Initialization Flow

When you run `cargo run`, here's what happens:

**1. main.rs - Application Bootstrap**

```rust
#[tokio::main]
async fn main() {
    // Load environment variables from .env file
    dotenv::dotenv().ok();
    
    // Initialize logging system
    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::try_from_default_env()
            .unwrap_or_else(|_| "backend=debug,tower_http=debug".into()))
        .init();
    
    // Load configuration from environment
    let config = config::Config::from_env();
    
    // Initialize core services
    let indexer = RealtimeIndexer::new();
    let ai_engine = CeloAIEngine::new();
    let celo_client = CeloClient::new(celo_rpc_url);
    
    // Create shared application state
    let state = Arc::new(RwLock::new(AppStateInner {
        indexer,
        ai_engine,
        celo_client,
    }));
    
    // Setup CORS and routes
    let app = Router::new()
        .nest("/api", routes::api_routes(state))
        .layer(cors)
        .layer(tower_http::trace::TraceLayer::new_for_http());
    
    // Start server
    axum::serve(listener, app).await.unwrap();
}
```

**Key Points:**
- Uses `tokio::main` for async runtime
- Loads `.env` file for configuration
- Initializes all services before starting server
- Uses `Arc<RwLock<>>` for thread-safe shared state
- Axum handles HTTP routing and middleware

**2. State Management**

The backend uses shared state wrapped in `Arc<RwLock<>>`:

```rust
pub struct AppStateInner {
    pub indexer: RealtimeIndexer,
    pub ai_engine: CeloAIEngine,
    pub celo_client: CeloClient,
}

pub type AppState = Arc<RwLock<AppStateInner>>;
```

- `Arc` - Atomic Reference Counting (thread-safe sharing)
- `RwLock` - Read-Write lock (multiple readers, single writer)
- Allows concurrent access to services across requests

**3. Dependency Injection**

Services are injected into handlers via Axum's `State` extractor:

```rust
pub async fn get_blocks(
    State(state): State<AppState>,  // Injected by Axum
    Query(params): Query<BlockQuery>,
) -> impl IntoResponse {
    let state = state.read().await;  // Acquire read lock
    let blocks = state.celo_client.get_blocks().await;
    Json(blocks)
}
```

### RPC Integration (celo_client.rs)

The Celo client handles all blockchain interactions:

**Structure:**

```rust
pub struct CeloClient {
    provider: Option<Provider<Http>>,  // ethers-rs provider
    network: String,                   // "mainnet-alchemy" or "mock"
}

pub struct CeloBlock {
    pub number: u64,
    pub hash: String,
    pub timestamp: u64,
    pub transaction_count: usize,
    pub gas_used: String,
    pub miner: String,
}
```

**Initialization:**

```rust
impl CeloClient {
    pub fn new(rpc_url: Option<String>) -> Self {
        match rpc_url {
            Some(url) => {
                // Try to connect to real RPC
                match Provider::<Http>::try_from(&url) {
                    Ok(provider) => {
                        tracing::info!("✓ Connected to Celo via {}", url);
                        Self {
                            provider: Some(provider),
                            network: "mainnet-alchemy".to_string(),
                        }
                    }
                    Err(e) => {
                        tracing::warn!("Failed to connect: {}", e);
                        Self::mock_client()
                    }
                }
            }
            None => {
                tracing::warn!("No RPC URL provided, using mock data");
                Self::mock_client()
            }
        }
    }
}
```

**Key Features:**

1. **Graceful Degradation**
   - If RPC connection fails, falls back to mock data
   - App continues working even without blockchain access
   - Useful for development and testing

2. **Connection Management**
   ```rust
   pub fn is_connected(&self) -> bool {
       self.provider.is_some()
   }
   
   pub fn network(&self) -> &str {
       &self.network
   }
   ```

3. **Data Fetching**
   ```rust
   pub async fn get_latest_block(&self) -> Result<CeloBlock, String> {
       if let Some(provider) = &self.provider {
           // Fetch from real blockchain
           match provider.get_block(BlockNumber::Latest).await {
               Ok(Some(block)) => Ok(CeloBlock {
                   number: block.number.unwrap_or_default().as_u64(),
                   hash: format!("{:?}", block.hash.unwrap_or_default()),
                   timestamp: block.timestamp.as_u64(),
                   transaction_count: block.transactions.len(),
                   gas_used: block.gas_used.to_string(),
                   miner: format!("{:?}", block.author.unwrap_or_default()),
               }),
               _ => Err("Failed to fetch block".to_string()),
           }
       } else {
           // Return mock data
           Ok(self.mock_block())
       }
   }
   ```

**RPC Configuration:**

The RPC URL is set in `backend/.env`:

```bash
# Primary: Alchemy (fast, reliable)
CELO_RPC_URL=https://celo-mainnet.g.alchemy.com/v2/YOUR_API_KEY

# Alternative: Forno (Celo's public RPC)
# CELO_RPC_URL=https://forno.celo.org

# For testing: Leave empty to use mock data
# CELO_RPC_URL=
```

**Why Alchemy?**
- Faster than public RPCs
- Better reliability and uptime
- Enhanced APIs for blockchain data
- Free tier available (300M compute units/month)

**Fallback Strategy:**
1. Try Alchemy RPC (if configured)
2. If fails, try Forno (could be added)
3. If all fail, use mock data
4. Log warnings but keep app running

### Request Handling Flow

**Example: Fetching Blocks**

```rust
// 1. Route Definition (routes.rs)
Router::new()
    .route("/blocks", get(handlers::get_blocks))

// 2. Handler (handlers.rs)
pub async fn get_blocks(
    State(state): State<AppState>,
    Query(params): Query<BlockQuery>,
) -> impl IntoResponse {
    // Acquire read lock on shared state
    let state = state.read().await;
    
    // Try to fetch from real blockchain
    if state.celo_client.is_connected() {
        match state.celo_client.get_blocks(params.limit).await {
            Ok(blocks) => {
                return Json(json!({
                    "blocks": blocks,
                    "source": "celo-rpc",
                    "network": state.celo_client.network()
                }));
            }
            Err(e) => {
                tracing::error!("RPC error: {}", e);
                // Fall through to mock data
            }
        }
    }
    
    // Fallback to mock data
    let mock_blocks = generate_mock_blocks(params.limit);
    Json(json!({
        "blocks": mock_blocks,
        "source": "mock",
    }))
}

// 3. Client Method (celo_client.rs)
pub async fn get_blocks(&self, limit: usize) -> Result<Vec<CeloBlock>> {
    if let Some(provider) = &self.provider {
        let latest = provider.get_block_number().await?;
        let mut blocks = Vec::new();
        
        for i in 0..limit {
            let block_num = latest - i as u64;
            if let Some(block) = provider.get_block(block_num).await? {
                blocks.push(self.convert_block(block));
            }
        }
        
        Ok(blocks)
    } else {
        Err("Not connected to RPC".into())
    }
}
```

### Error Handling

The backend uses Rust's `Result` type for error handling:

```rust
// Function returns Result<T, E>
pub async fn get_block(&self, number: u64) -> Result<CeloBlock, String> {
    match self.provider {
        Some(ref provider) => {
            // Try to fetch block
            match provider.get_block(number).await {
                Ok(Some(block)) => Ok(self.convert_block(block)),
                Ok(None) => Err(format!("Block {} not found", number)),
                Err(e) => Err(format!("RPC error: {}", e)),
            }
        }
        None => Err("Not connected to RPC".to_string()),
    }
}

// Handler converts Result to HTTP response
pub async fn get_block_handler(
    State(state): State<AppState>,
    Path(block_number): Path<u64>,
) -> impl IntoResponse {
    let state = state.read().await;
    
    match state.celo_client.get_block(block_number).await {
        Ok(block) => {
            // Success: Return 200 with data
            (StatusCode::OK, Json(json!({ "block": block })))
        }
        Err(e) => {
            // Error: Return 500 with error message
            (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({ "error": e })))
        }
    }
}
```

### Async/Await with Tokio

All I/O operations are async to avoid blocking:

```rust
// Concurrent requests example
pub async fn get_dashboard_data(&self) -> DashboardData {
    // Fetch multiple things concurrently
    let (blocks, metrics, price) = tokio::join!(
        self.celo_client.get_latest_blocks(5),
        self.indexer.get_metrics(),
        self.get_celo_price(),
    );
    
    DashboardData {
        blocks: blocks.unwrap_or_default(),
        metrics: metrics.unwrap_or_default(),
        price: price.unwrap_or_default(),
    }
}
```

**Benefits:**
- Non-blocking I/O
- Handle thousands of concurrent connections
- Efficient resource usage
- Better performance than threads

### Dependencies (Cargo.toml)

Key dependencies and their purposes:

```toml
[dependencies]
# Web framework
axum = "0.7"              # Modern, fast web framework
tower-http = "0.5"        # Middleware (CORS, logging)
tokio = { version = "1", features = ["full"] }  # Async runtime

# Blockchain
ethers = "2.0"            # Ethereum/Celo interaction
ethers-providers = "2.0"  # RPC providers

# Serialization
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"

# HTTP client
reqwest = { version = "0.11", features = ["json"] }

# Utilities
dotenv = "0.15"           # Load .env files
tracing = "0.1"           # Logging
tracing-subscriber = "0.3"
```

### Testing the Backend

```bash
# Run all tests
cargo test

# Run specific test
cargo test test_celo_client

# Run with output
cargo test -- --nocapture

# Check code without building
cargo check

# Lint code
cargo clippy

# Format code
cargo fmt
```

### Common Backend Tasks

**Adding a New Endpoint:**

1. Define route in `routes.rs`:
   ```rust
   .route("/new-endpoint", get(handlers::new_handler))
   ```

2. Create handler in `handlers.rs`:
   ```rust
   pub async fn new_handler(
       State(state): State<AppState>,
   ) -> impl IntoResponse {
       // Your logic here
       Json(json!({ "data": "value" }))
   }
   ```

3. Add types in `models.rs` if needed:
   ```rust
   #[derive(Serialize, Deserialize)]
   pub struct NewData {
       pub field: String,
   }
   ```

**Adding RPC Methods:**

1. Add method to `celo_client.rs`:
   ```rust
   pub async fn get_transaction(&self, hash: String) -> Result<Transaction> {
       if let Some(provider) = &self.provider {
           let tx = provider.get_transaction(hash).await?;
           Ok(self.convert_transaction(tx))
       } else {
           Ok(self.mock_transaction())
       }
   }
   ```

2. Use in handler:
   ```rust
   let tx = state.celo_client.get_transaction(hash).await?;
   ```

**Debugging:**

```bash
# Enable debug logs
export RUST_LOG=debug
cargo run

# Or in .env
RUST_LOG=debug

# View specific module logs
RUST_LOG=backend::celo_client=debug cargo run
```

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
