# Sentinel-X Backend Dockerfile for Fly.io

# Build stage
FROM rust:1.75-slim AS builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy Cargo files first for caching
COPY backend/Cargo.toml backend/Cargo.lock ./

# Copy source
COPY backend/src ./src

# Build release binary
RUN cargo build --release

# Runtime stage
FROM debian:bookworm-slim

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    libssl3 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy compiled binary
COPY --from=builder /app/target/release/backend /app/backend

# Copy env template (real values via fly secrets)
COPY backend/.env.example /app/.env

# Expose Fly port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:8080/api/health || exit 1

# Run backend
CMD ["/app/backend"]
