use axum::{
    routing::{get, post},
    Router,
};

use crate::handlers::{self, AppState};

pub fn api_routes(state: AppState) -> Router {
    Router::new()
        // Health check
        .route("/health", get(handlers::health_check))
        
        // ============ Real-Time Indexer ============
        .route("/indexer/metrics", get(handlers::get_indexer_metrics))
        .route("/indexer/feeds", get(handlers::get_data_feeds))
        .route("/indexer/ingest", post(handlers::ingest_data_feed))
        .route("/indexer/agents/decisions", 
            get(handlers::get_agent_decisions)
            .post(handlers::submit_agent_decision))
        
        // ============ Celo-7B AI Engine ============
        .route("/ai/query", post(handlers::celo_llm_query))
        .route("/ai/model", get(handlers::get_model_info))
        .route("/ai/contract/analyze", post(handlers::analyze_contract_ai))
        .route("/ai/security/audit", post(handlers::security_audit_ai))
        .route("/ai/price/predict", post(handlers::predict_price_ai))
        
        // ============ Phase 1: Blockchain Data ============
        .route("/blocks", get(handlers::get_blocks))
        .route("/blocks/:block_number", get(handlers::get_block))
        .route("/transactions", get(handlers::get_transactions))
        
        // ============ Price Data ============
        .route("/price/:asset", get(handlers::get_price_data))
        
        // ============ Phase 2: AI Inference ============
        .route("/sentiment", get(handlers::analyze_sentiment))
        .route("/contract/explain", post(handlers::explain_contract))
        
        // ============ Phase 3: zkML & Deployment (Coming Soon) ============
        .route("/zkml/verify", post(handlers::verify_zkml_proof))
        .route("/models/deploy", post(handlers::deploy_micro_model))
        
        .with_state(state)
}
