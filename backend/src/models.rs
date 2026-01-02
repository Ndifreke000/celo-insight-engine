use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Item {
    pub id: u32,
    pub name: String,
    pub description: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct CreateItemRequest {
    pub name: String,
    pub description: Option<String>,
}

// Celo Blockchain Data Models
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct BlockData {
    pub block_number: u64,
    pub block_hash: String,
    pub timestamp: u64,
    pub transaction_count: u32,
    pub gas_used: u64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct TransactionData {
    pub tx_hash: String,
    pub from_address: String,
    pub to_address: Option<String>,
    pub value: String,
    pub gas_price: String,
    pub block_number: u64,
    pub timestamp: u64,
}

// AI/ML Models
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct InferenceRequest {
    pub model: String,
    pub input: String,
    pub parameters: Option<InferenceParameters>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct InferenceParameters {
    pub temperature: Option<f32>,
    pub max_tokens: Option<u32>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct InferenceResponse {
    pub model: String,
    pub output: String,
    pub confidence: f32,
    pub latency_ms: u64,
}

// Sentiment Analysis
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SentimentData {
    pub source: String, // "twitter" or "discord"
    pub text: String,
    pub sentiment: String, // "positive", "negative", "neutral"
    pub score: f32,
    pub timestamp: u64,
}

// Smart Contract Explanation
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ContractExplanationRequest {
    pub contract_address: String,
    pub function_name: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ContractExplanationResponse {
    pub contract_address: String,
    pub explanation: String,
    pub security_analysis: Vec<String>,
    pub gas_optimization_tips: Vec<String>,
}
