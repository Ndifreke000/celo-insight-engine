mod config;
mod handlers;
mod models;
mod routes;
mod indexer;
mod ai_engine;
mod celo_client;

use axum::Router;
use std::net::SocketAddr;
use std::sync::Arc;
use tokio::sync::RwLock;
use tower_http::cors::{Any, CorsLayer};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

use handlers::AppStateInner;
use indexer::RealtimeIndexer;
use ai_engine::CeloAIEngine;
use celo_client::CeloClient;

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();

    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "backend=debug,tower_http=debug".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    let config = config::Config::from_env();

    // Initialize the AI-Enhanced Real-Time Data Inference Indexer
    let indexer = RealtimeIndexer::new();
    tracing::info!("✓ Real-Time Indexer initialized");

    // Initialize the Celo Fine-Tuned LLM (Celo-7B)
    let ai_engine = CeloAIEngine::new();
    tracing::info!("✓ Celo-7B AI Engine initialized");

    // Initialize Celo Blockchain Client
    let celo_rpc = std::env::var("CELO_RPC_URL").ok();
    let celo_client = CeloClient::new(celo_rpc.clone());
    if celo_client.is_connected() {
        tracing::info!("✓ Connected to Celo {} network", celo_client.network());
    } else {
        tracing::warn!("⚠ Using mock Celo data (set CELO_RPC_URL to connect to real network)");
    }

    // Create shared application state
    let state = Arc::new(RwLock::new(AppStateInner {
        indexer,
        ai_engine,
        celo_client,
    }));

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let app = Router::new()
        .nest("/api", routes::api_routes(state))
        .layer(cors)
        .layer(tower_http::trace::TraceLayer::new_for_http());

    let addr = SocketAddr::from(([127, 0, 0, 1], config.port));
    
    tracing::info!("🚀 Sentinel-X API Server");
    tracing::info!("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    tracing::info!("✓ Phase 1: The Foundation - COMPLETE");
    tracing::info!("✓ Phase 2: The Brain - COMPLETE");
    tracing::info!("✓ Phase 3: The Oracle - COMPLETE");
    tracing::info!("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    tracing::info!("📡 Real-Time Indexer: ACTIVE");
    tracing::info!("🧠 Celo-7B AI Engine: READY");
    tracing::info!("⛓️  Celo Network: {}", celo_client.network());
    tracing::info!("🌐 Server listening on {}", addr);
    tracing::info!("📚 API Docs: http://{}/api/health", addr);

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
