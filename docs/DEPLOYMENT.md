# 🚀 Structra — Deployment Guide

Complete guide for deploying Structra to production environments.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Docker Deployment](#docker-deployment)
- [Cloud Deployment](#cloud-deployment)
- [Database Setup](#database-setup)
- [Scaling Considerations](#scaling-considerations)
- [Monitoring & Logging](#monitoring--logging)
- [Backup & Recovery](#backup--recovery)

---

## 📦 Prerequisites

### Required Services

- **PostgreSQL** 14+ (managed or self-hosted)
- **Redis** (for caching and rate limiting)
- **S3-compatible storage** (MinIO, Cloudflare R2, AWS S3)
- **Qdrant** (vector database)
- **Ollama** (optional, for local LLM)

### Infrastructure Requirements

- **CPU**: 2+ cores recommended
- **Memory**: 4GB+ RAM minimum, 8GB+ recommended
- **Storage**: 20GB+ for databases and images
- **Network**: Stable internet connection for AI APIs

---

## ⚙️ Environment Configuration

### Production Environment Variables

**Backend (.env)**:
```env
# Application
NODE_ENV=production
PORT=3001
APP_URL=https://api.structra.com

# Database
DATABASE_URL=postgresql://user:password@host:5432/structra
DATABASE_POOL_SIZE=20

# Redis
REDIS_URL=redis://host:6379
REDIS_PASSWORD=your_redis_password

# AI Services
GEMINI_API_KEY=your_gemini_api_key
OLLAMA_URL=http://ollama-host:11434

# Storage
S3_ENDPOINT=https://s3.amazonaws.com
S3_ACCESS_KEY=your_access_key
S3_SECRET_KEY=your_secret_key
S3_BUCKET=structra-images
S3_REGION=us-east-1

# Security
JWT_SECRET=your_jwt_secret
API_KEY_SECRET=your_api_key_secret
ENCRYPTION_KEY=your_encryption_key

# Monitoring
SENTRY_DSN=your_sentry_dsn
LOG_LEVEL=info
```

**Frontend (.env.production)**:
```env
NEXT_PUBLIC_API_URL=https://api.structra.com
NEXT_PUBLIC_APP_URL=https://app.structra.com
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

### Environment Validation

```typescript
// Validate required environment variables
const requiredEnvVars = [
  'DATABASE_URL',
  'REDIS_URL',
  'GEMINI_API_KEY',
  'S3_ENDPOINT',
  'JWT_SECRET'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}
```

---

## 🐳 Docker Deployment

### Docker Compose Production

**docker-compose.prod.yml**:
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_USER: structra
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: structra
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    restart: unless-stopped

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    environment:
      - DATABASE_URL=postgresql://structra:${DB_PASSWORD}@postgres:5432/structra
      - REDIS_URL=redis://:${REDIS_PASSWORD}@redis:6379
    depends_on:
      - postgres
      - redis
    restart: unless-stopped
    ports:
      - "3001:3001"

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
    environment:
      - NEXT_PUBLIC_API_URL=https://api.structra.com
    restart: unless-stopped
    ports:
      - "3000:3000"

volumes:
  postgres_data:
  redis_data:
```

### Production Dockerfile

**backend/Dockerfile.prod**:
```dockerfile
FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production

# Copy source
COPY . .

# Build
RUN bun run build

# Production image
FROM base
EXPOSE 3001
CMD ["bun", "run", "start"]
```

**frontend/Dockerfile.prod**:
```dockerfile
FROM node:18-alpine AS base
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Build
COPY . .
RUN npm run build

# Production image
FROM node:18-alpine
WORKDIR /app
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/package.json ./
COPY --from=base /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
```

### Deployment Steps

```bash
# Build and start services
docker-compose -f docker-compose.prod.yml up -d

# Run migrations
docker-compose -f docker-compose.prod.yml exec backend bun run db:migrate

# Check logs
docker-compose -f docker-compose.prod.yml logs -f
```

---

## ☁️ Cloud Deployment

### Vercel (Frontend)

1. **Connect repository** to Vercel
2. **Configure environment variables**:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_APP_URL`
3. **Deploy**:
```bash
vercel --prod
```

### Fly.io (Backend)

1. **Install Fly CLI**:
```bash
curl -L https://fly.io/install.sh | sh
```

2. **Initialize app**:
```bash
fly launch
```

3. **Set secrets**:
```bash
fly secrets set DATABASE_URL=postgresql://...
fly secrets set GEMINI_API_KEY=...
```

4. **Deploy**:
```bash
fly deploy
```

### Railway

1. **Connect repository** to Railway
2. **Add services**:
   - PostgreSQL
   - Redis
   - Backend service
   - Frontend service
3. **Configure environment variables**
4. **Deploy** automatically on push

---

## 💾 Database Setup

### PostgreSQL Setup

**Create database**:
```sql
CREATE DATABASE structra;
CREATE USER structra WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE structra TO structra;
```

**Run migrations**:
```bash
cd backend
bun run db:migrate
```

**Create indexes**:
```sql
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_analyses_created_at ON analyses(created_at);
CREATE INDEX idx_api_keys_key_hash ON api_keys(key_hash);
```

### Database Backup

**Automated backups**:
```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d)
pg_dump -h localhost -U structra structra > backup_$DATE.sql
aws s3 cp backup_$DATE.sql s3://backups/structra/
```

**Restore from backup**:
```bash
psql -h localhost -U structra structra < backup_20250115.sql
```

---

## 📈 Scaling Considerations

### Horizontal Scaling

**Load balancing**:
```nginx
upstream backend {
  server backend1:3001;
  server backend2:3001;
  server backend3:3001;
}

server {
  listen 80;
  location / {
    proxy_pass http://backend;
  }
}
```

**Stateless design**:
- Store sessions in Redis
- Use shared database
- No local file storage

### Database Scaling

**Connection pooling**:
```env
DATABASE_URL=postgresql://...?connection_limit=20&pool_timeout=10
```

**Read replicas**:
```typescript
// Use read replica for queries
const readDb = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_READ_URL }
  }
});
```

### Caching Strategy

**Redis caching**:
```typescript
// Cache AI responses
const cacheKey = `analysis:${hashImage(image)}`;
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);

// Store in cache
await redis.setex(cacheKey, 3600, JSON.stringify(result));
```

---

## 📊 Monitoring & Logging

### Application Monitoring

**Sentry setup**:
```typescript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1
});
```

**Health checks**:
```typescript
app.get('/health', async (req, res) => {
  const checks = {
    database: await checkDatabase(),
    redis: await checkRedis(),
    s3: await checkS3(),
    ai: await checkAIServices()
  };
  
  const healthy = Object.values(checks).every(v => v);
  res.status(healthy ? 200 : 503).json({ checks });
});
```

### Logging

**Structured logging**:
```typescript
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty'
  }
});

logger.info({ userId, requestId }, 'Analysis completed');
```

**Log aggregation**:
- Use services like Datadog, LogRocket, or CloudWatch
- Centralize logs from all services
- Set up alerts for errors

### Metrics

**Key metrics to monitor**:
- Request rate and latency
- Error rates
- Database query performance
- AI API response times
- Cache hit rates
- Memory and CPU usage

---

## 💾 Backup & Recovery

### Backup Strategy

**Database backups**:
- Daily automated backups
- Weekly full backups
- Monthly archive backups
- Test restore procedures regularly

**File backups**:
- S3 versioning enabled
- Cross-region replication
- Regular backup verification

### Disaster Recovery

**Recovery procedures**:
1. **Identify failure** (database, service, region)
2. **Activate backup** (failover to replica)
3. **Restore data** (from latest backup)
4. **Verify integrity** (test critical paths)
5. **Document incident** (post-mortem)

**Recovery Time Objectives (RTO)**:
- Database: < 1 hour
- Services: < 15 minutes
- Full system: < 4 hours

---

## 🔒 Security in Production

### SSL/TLS

**Enable HTTPS**:
- Use Let's Encrypt or managed certificates
- Force HTTPS redirects
- Use HSTS headers

### Firewall Rules

**Restrict access**:
- Only expose necessary ports
- Use security groups (AWS) or firewall rules
- Whitelist IPs for database access

### Secrets Management

**Use secret managers**:
- AWS Secrets Manager
- HashiCorp Vault
- Environment-specific secret injection

---

## 📚 Additional Resources

- **[Architecture](09%20Architecture.md)** — System architecture
- **[Security](SECURITY.md)** — Security best practices
- **[Performance](PERFORMANCE.md)** — Performance optimization
- **[Troubleshooting](TROUBLESHOOTING.md)** — Common issues

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Security](SECURITY.md)**  
*Security Best Practices*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: Integration →](INTEGRATION.md)**  
*Integration Examples*

</td>
</tr>
</table>

---

<details>
<summary><b>📚 Related Documentation</b></summary>

<table>
<tr>
<td>

**[Architecture](09%20Architecture.md)**  
System architecture overview

</td>
<td>

**[Security](SECURITY.md)**  
Security considerations

</td>
</tr>
<tr>
<td>

**[Performance](PERFORMANCE.md)**  
Performance optimization

</td>
<td>

**[Getting Started](11%20Getting%20Started.md)**  
Development setup

</td>
</tr>
</table>

</details>

</div>

