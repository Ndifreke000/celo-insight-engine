// AI-Enhanced Real-Time Data Inference Indexer
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::RwLock;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DataFeed {
    pub feed_id: String,
    pub source: FeedSource,
    pub data_type: DataType,
    pub timestamp: u64,
    pub raw_data: serde_json::Value,
    pub cleaned_data: Option<serde_json::Value>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum FeedSource {
    OnChain(String),      // blockchain address
    OffChain(String),     // API endpoint
    Social(String),       // twitter, discord, etc
    Oracle(String),       // price feeds, etc
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum DataType {
    Transaction,
    Block,
    Price,
    Sentiment,
    Event,
    Custom(String),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IndexerMetrics {
    pub total_feeds_processed: u64,
    pub feeds_per_second: f64,
    pub average_latency_ms: f64,
    pub active_feeds: u32,
    pub last_update: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AgentDecision {
    pub agent_id: String,
    pub decision_type: DecisionType,
    pub confidence: f32,
    pub reasoning: String,
    pub timestamp: u64,
    pub data_sources: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum DecisionType {
    Trade { action: String, asset: String, amount: f64 },
    Alert { severity: String, message: String },
    Monitor { metric: String, threshold: f64 },
}

pub struct RealtimeIndexer {
    feeds: Arc<RwLock<HashMap<String, DataFeed>>>,
    metrics: Arc<RwLock<IndexerMetrics>>,
    agent_decisions: Arc<RwLock<Vec<AgentDecision>>>,
}

impl RealtimeIndexer {
    pub fn new() -> Self {
        Self {
            feeds: Arc::new(RwLock::new(HashMap::new())),
            metrics: Arc::new(RwLock::new(IndexerMetrics {
                total_feeds_processed: 0,
                feeds_per_second: 0.0,
                average_latency_ms: 0.0,
                active_feeds: 0,
                last_update: 0,
            })),
            agent_decisions: Arc::new(RwLock::new(Vec::new())),
        }
    }

    pub async fn ingest_feed(&self, feed: DataFeed) -> Result<(), String> {
        let start = std::time::Instant::now();
        
        // Clean the data
        let cleaned_feed = self.clean_data(feed).await?;
        
        // Store in memory
        let mut feeds = self.feeds.write().await;
        feeds.insert(cleaned_feed.feed_id.clone(), cleaned_feed.clone());
        
        // Update metrics
        let mut metrics = self.metrics.write().await;
        metrics.total_feeds_processed += 1;
        metrics.active_feeds = feeds.len() as u32;
        metrics.average_latency_ms = start.elapsed().as_millis() as f64;
        metrics.last_update = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs();
        
        Ok(())
    }

    async fn clean_data(&self, mut feed: DataFeed) -> Result<DataFeed, String> {
        // Data cleaning logic
        let cleaned = match feed.data_type {
            DataType::Transaction => {
                // Normalize transaction data
                serde_json::json!({
                    "normalized": true,
                    "data": feed.raw_data
                })
            }
            DataType::Price => {
                // Validate and normalize price data
                serde_json::json!({
                    "validated": true,
                    "data": feed.raw_data
                })
            }
            _ => feed.raw_data.clone(),
        };
        
        feed.cleaned_data = Some(cleaned);
        Ok(feed)
    }

    pub async fn get_metrics(&self) -> IndexerMetrics {
        self.metrics.read().await.clone()
    }

    pub async fn get_feeds(&self, limit: usize) -> Vec<DataFeed> {
        let feeds = self.feeds.read().await;
        feeds.values().take(limit).cloned().collect()
    }

    pub async fn process_agent_decision(&self, decision: AgentDecision) {
        let mut decisions = self.agent_decisions.write().await;
        decisions.push(decision);
        
        // Keep only last 1000 decisions
        let len = decisions.len();
        if len > 1000 {
            decisions.drain(0..len - 1000);
        }
    }

    pub async fn get_agent_decisions(&self, limit: usize) -> Vec<AgentDecision> {
        let decisions = self.agent_decisions.read().await;
        let total = decisions.len();
        if total > limit {
            decisions[total - limit..].iter().rev().cloned().collect()
        } else {
            decisions.iter().rev().cloned().collect()
        }
    }
}

impl Default for RealtimeIndexer {
    fn default() -> Self {
        Self::new()
    }
}
