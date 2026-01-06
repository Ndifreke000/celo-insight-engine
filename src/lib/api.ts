// Sentinel-X API Client
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

console.log('🔗 API Base URL:', API_BASE_URL);

// ============ Phase 1: The Foundation ============

export interface BlockData {
  block_number: number;
  block_hash: string;
  timestamp: number;
  transaction_count: number;
  gas_used: number;
}

export interface TransactionData {
  tx_hash: string;
  from_address: string;
  to_address?: string;
  value: string;
  gas_price: string;
  block_number: number;
  timestamp: number;
}

export const getBlocks = async (limit = 10, offset = 0) => {
  const response = await fetch(`${API_BASE_URL}/blocks?limit=${limit}&offset=${offset}`);
  return response.json();
};

export const getBlock = async (blockNumber: number) => {
  const response = await fetch(`${API_BASE_URL}/blocks/${blockNumber}`);
  return response.json();
};

export const getTransactions = async (limit = 10) => {
  const response = await fetch(`${API_BASE_URL}/transactions?limit=${limit}`);
  return response.json();
};

// ============ Phase 2: The Brain ============

export interface InferenceRequest {
  prompt: string;
  task_type?: string;
  context?: string[];
  max_tokens?: number;
  temperature?: number;
}

export interface InferenceResponse {
  model: string;
  output: string;
  confidence: number;
  latency_ms: number;
}

export const runInference = async (request: InferenceRequest): Promise<InferenceResponse> => {
  const response = await fetch(`${API_BASE_URL}/ai/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  return response.json();
};

export interface SentimentData {
  source: string;
  text: string;
  sentiment: string;
  score: number;
  timestamp: number;
}

export const getSentiment = async (source = 'twitter') => {
  const response = await fetch(`${API_BASE_URL}/sentiment?source=${source}`);
  return response.json();
};

export interface ContractExplanation {
  contract_address: string;
  explanation: string;
  security_analysis: string[];
  gas_optimization_tips: string[];
}

export const explainContract = async (contractAddress: string): Promise<ContractExplanation> => {
  const response = await fetch(`${API_BASE_URL}/contract/explain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contract_address: contractAddress }),
  });
  return response.json();
};

export const securityAudit = async (code: string) => {
  const response = await fetch(`${API_BASE_URL}/ai/security/audit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
  return response.json();
};

// ============ Phase 3: The Oracle ============

export const verifyZkmlProof = async (proof: any) => {
  const response = await fetch(`${API_BASE_URL}/zkml/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(proof),
  });
  return response.json();
};

export const deployMicroModel = async (model: any) => {
  const response = await fetch(`${API_BASE_URL}/models/deploy`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(model),
  });
  return response.json();
};

export const predictPrice = async (asset: string) => {
  const response = await fetch(`${API_BASE_URL}/ai/price/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ asset }),
  });
  return response.json();
};

export const getIndexerMetrics = async () => {
  const response = await fetch(`${API_BASE_URL}/indexer/metrics`);
  return response.json();
};

// Health check
export const healthCheck = async () => {
  const response = await fetch(`${API_BASE_URL}/health`);
  return response.json();
};

// Price Data
export const getPriceData = async (asset: string) => {
  const response = await fetch(`${API_BASE_URL}/price/${asset}`);
  return response.json();
};
