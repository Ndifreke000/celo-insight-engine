// Celo Blockchain Client
use ethers::prelude::*;
use serde::{Deserialize, Serialize};
use std::sync::Arc;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CeloBlock {
    pub number: u64,
    pub hash: String,
    pub timestamp: u64,
    pub transaction_count: usize,
    pub gas_used: String,
    pub miner: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CeloTransaction {
    pub hash: String,
    pub from: String,
    pub to: Option<String>,
    pub value: String,
    pub gas_price: String,
    pub gas_used: Option<String>,
    pub block_number: u64,
    pub status: Option<u64>,
}

pub struct CeloClient {
    provider: Option<Arc<Provider<Http>>>,
    network: String,
}

impl CeloClient {
    pub fn new(rpc_url: Option<String>) -> Self {
        let network = if rpc_url.is_some() {
            "alfajores"
        } else {
            "mock"
        };

        let provider = rpc_url.and_then(|url| {
            Provider::<Http>::try_from(url).ok().map(Arc::new)
        });

        Self {
            provider,
            network: network.to_string(),
        }
    }

    pub async fn get_latest_block(&self) -> Result<CeloBlock, String> {
        if let Some(provider) = &self.provider {
            match provider.get_block(BlockNumber::Latest).await {
                Ok(Some(block)) => Ok(CeloBlock {
                    number: block.number.unwrap_or_default().as_u64(),
                    hash: format!("{:?}", block.hash.unwrap_or_default()),
                    timestamp: block.timestamp.as_u64(),
                    transaction_count: block.transactions.len(),
                    gas_used: block.gas_used.to_string(),
                    miner: format!("{:?}", block.author.unwrap_or_default()),
                }),
                Ok(None) => Err("Block not found".to_string()),
                Err(e) => Err(format!("Failed to fetch block: {}", e)),
            }
        } else {
            // Return mock data
            Ok(self.mock_block())
        }
    }

    pub async fn get_block_by_number(&self, block_number: u64) -> Result<CeloBlock, String> {
        if let Some(provider) = &self.provider {
            match provider.get_block(block_number).await {
                Ok(Some(block)) => Ok(CeloBlock {
                    number: block.number.unwrap_or_default().as_u64(),
                    hash: format!("{:?}", block.hash.unwrap_or_default()),
                    timestamp: block.timestamp.as_u64(),
                    transaction_count: block.transactions.len(),
                    gas_used: block.gas_used.to_string(),
                    miner: format!("{:?}", block.author.unwrap_or_default()),
                }),
                Ok(None) => Err("Block not found".to_string()),
                Err(e) => Err(format!("Failed to fetch block: {}", e)),
            }
        } else {
            Ok(self.mock_block_with_number(block_number))
        }
    }

    pub async fn get_transaction(&self, tx_hash: &str) -> Result<CeloTransaction, String> {
        if let Some(provider) = &self.provider {
            let hash: H256 = tx_hash.parse().map_err(|e| format!("Invalid hash: {}", e))?;
            
            match provider.get_transaction(hash).await {
                Ok(Some(tx)) => {
                    let receipt = provider.get_transaction_receipt(hash).await.ok().flatten();
                    
                    Ok(CeloTransaction {
                        hash: format!("{:?}", tx.hash),
                        from: format!("{:?}", tx.from),
                        to: tx.to.map(|addr| format!("{:?}", addr)),
                        value: tx.value.to_string(),
                        gas_price: tx.gas_price.unwrap_or_default().to_string(),
                        gas_used: receipt.as_ref().map(|r| r.gas_used.unwrap_or_default().to_string()),
                        block_number: tx.block_number.unwrap_or_default().as_u64(),
                        status: receipt.as_ref().and_then(|r| r.status.map(|s| s.as_u64())),
                    })
                }
                Ok(None) => Err("Transaction not found".to_string()),
                Err(e) => Err(format!("Failed to fetch transaction: {}", e)),
            }
        } else {
            Ok(self.mock_transaction(tx_hash))
        }
    }

    pub async fn get_balance(&self, address: &str) -> Result<String, String> {
        if let Some(provider) = &self.provider {
            let addr: Address = address.parse().map_err(|e| format!("Invalid address: {}", e))?;
            
            match provider.get_balance(addr, None).await {
                Ok(balance) => Ok(balance.to_string()),
                Err(e) => Err(format!("Failed to fetch balance: {}", e)),
            }
        } else {
            Ok("1000000000000000000".to_string()) // 1 CELO
        }
    }

    pub fn is_connected(&self) -> bool {
        self.provider.is_some()
    }

    pub fn network(&self) -> &str {
        &self.network
    }

    // Mock data generators
    fn mock_block(&self) -> CeloBlock {
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs();

        CeloBlock {
            number: 20000000,
            hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef".to_string(),
            timestamp: now,
            transaction_count: 42,
            gas_used: "8500000".to_string(),
            miner: "0xabcdef1234567890abcdef1234567890abcdef12".to_string(),
        }
    }

    fn mock_block_with_number(&self, number: u64) -> CeloBlock {
        let mut block = self.mock_block();
        block.number = number;
        block
    }

    fn mock_transaction(&self, hash: &str) -> CeloTransaction {
        CeloTransaction {
            hash: hash.to_string(),
            from: "0x1234567890abcdef1234567890abcdef12345678".to_string(),
            to: Some("0xabcdef1234567890abcdef1234567890abcdef12".to_string()),
            value: "1000000000000000000".to_string(),
            gas_price: "20000000000".to_string(),
            gas_used: Some("21000".to_string()),
            block_number: 20000000,
            status: Some(1),
        }
    }
}
