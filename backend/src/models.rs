use serde::{Deserialize, Serialize};

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
