# 🚀 Structra — Panduan Deployment

Panduan lengkap untuk mendeploy Structra ke lingkungan production.

---

## 📋 Daftar Isi

- [Prerequisites](#prerequisites)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Docker Deployment](#docker-deployment)
- [Cloud Deployment](#cloud-deployment)
- [Setup Database](#setup-database)
- [Pertimbangan Scaling](#pertimbangan-scaling)
- [Monitoring & Logging](#monitoring--logging)
- [Backup & Recovery](#backup--recovery)

---

## 📦 Prerequisites

### Layanan yang Diperlukan

- **PostgreSQL** 14+ (managed atau self-hosted)
- **Redis** (untuk caching dan rate limiting)
- **S3-compatible storage** (MinIO, Cloudflare R2, AWS S3)
- **Qdrant** (vector database)
- **Ollama** (opsional, untuk local LLM)

### Persyaratan Infrastruktur

- **CPU**: 2+ cores direkomendasikan
- **Memory**: 4GB+ RAM minimum, 8GB+ direkomendasikan
- **Storage**: 20GB+ untuk database dan gambar
- **Network**: Koneksi internet stabil untuk AI APIs

---

## ⚙️ Konfigurasi Environment

### Environment Variables Production

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

### Validasi Environment

```typescript
// Validasi environment variables yang diperlukan
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

### Langkah Deployment

```bash
# Build dan start services
docker-compose -f docker-compose.prod.yml up -d

# Jalankan migrations
docker-compose -f docker-compose.prod.yml exec backend bun run db:migrate

# Periksa logs
docker-compose -f docker-compose.prod.yml logs -f
```

---

## ☁️ Cloud Deployment

### Vercel (Frontend)

1. **Hubungkan repository** ke Vercel
2. **Konfigurasi environment variables**:
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

1. **Hubungkan repository** ke Railway
2. **Tambahkan services**:
   - PostgreSQL
   - Redis
   - Backend service
   - Frontend service
3. **Konfigurasi environment variables**
4. **Deploy** otomatis saat push

---

## 💾 Setup Database

### Setup PostgreSQL

**Buat database**:
```sql
CREATE DATABASE structra;
CREATE USER structra WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE structra TO structra;
```

**Jalankan migrations**:
```bash
cd backend
bun run db:migrate
```

**Buat indexes**:
```sql
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_analyses_created_at ON analyses(created_at);
CREATE INDEX idx_api_keys_key_hash ON api_keys(key_hash);
```

### Backup Database

**Backup otomatis**:
```bash
# Script backup harian
#!/bin/bash
DATE=$(date +%Y%m%d)
pg_dump -h localhost -U structra structra > backup_$DATE.sql
aws s3 cp backup_$DATE.sql s3://backups/structra/
```

**Restore dari backup**:
```bash
psql -h localhost -U structra structra < backup_20250115.sql
```

---

## 📈 Pertimbangan Scaling

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
- Simpan sessions di Redis
- Gunakan database bersama
- Tidak ada local file storage

### Database Scaling

**Connection pooling**:
```env
DATABASE_URL=postgresql://...?connection_limit=20&pool_timeout=10
```

**Read replicas**:
```typescript
// Gunakan read replica untuk queries
const readDb = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_READ_URL }
  }
});
```

### Strategi Caching

**Redis caching**:
```typescript
// Cache AI responses
const cacheKey = `analysis:${hashImage(image)}`;
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);

// Simpan di cache
await redis.setex(cacheKey, 3600, JSON.stringify(result));
```

---

## 📊 Monitoring & Logging

### Monitoring Aplikasi

**Setup Sentry**:
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

logger.info({ userId, requestId }, 'Analisis selesai');
```

**Log aggregation**:
- Gunakan layanan seperti Datadog, LogRocket, atau CloudWatch
- Pusatkan logs dari semua services
- Setup alerts untuk errors

### Metrics

**Metrics utama untuk dimonitor**:
- Request rate dan latency
- Error rates
- Database query performance
- AI API response times
- Cache hit rates
- Memory dan CPU usage

---

## 💾 Backup & Recovery

### Strategi Backup

**Database backups**:
- Backup otomatis harian
- Backup penuh mingguan
- Archive backup bulanan
- Test prosedur restore secara berkala

**File backups**:
- S3 versioning diaktifkan
- Cross-region replication
- Verifikasi backup secara berkala

### Disaster Recovery

**Prosedur recovery**:
1. **Identifikasi kegagalan** (database, service, region)
2. **Aktifkan backup** (failover ke replica)
3. **Restore data** (dari backup terbaru)
4. **Verifikasi integritas** (test critical paths)
5. **Dokumentasikan insiden** (post-mortem)

**Recovery Time Objectives (RTO)**:
- Database: < 1 jam
- Services: < 15 menit
- Full system: < 4 jam

---

## 🔒 Keamanan di Production

### SSL/TLS

**Aktifkan HTTPS**:
- Gunakan Let's Encrypt atau managed certificates
- Paksa redirect HTTPS
- Gunakan HSTS headers

### Firewall Rules

**Batasi akses**:
- Hanya expose port yang diperlukan
- Gunakan security groups (AWS) atau firewall rules
- Whitelist IPs untuk akses database

### Manajemen Secrets

**Gunakan secret managers**:
- AWS Secrets Manager
- HashiCorp Vault
- Environment-specific secret injection

---

## 📚 Sumber Tambahan

- **[Architecture](09%20Architecture.md)** — Arsitektur sistem
- **[Security](SECURITY.md)** — Pertimbangan keamanan
- **[Performance](PERFORMANCE.md)** — Optimasi performa
- **[Troubleshooting](TROUBLESHOOTING.md)** — Masalah umum

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Security](SECURITY.md)**  
*Best Practices Keamanan*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Dokumentasi Overview*

</td>
<td align="right">

**[Next: Integration →](INTEGRATION.md)**  
*Contoh Integrasi*

</td>
</tr>
</table>

---

<details>
<summary><b>📚 Dokumentasi Terkait</b></summary>

<table>
<tr>
<td>

**[Architecture](09%20Architecture.md)**  
Overview arsitektur sistem

</td>
<td>

**[Security](SECURITY.md)**  
Pertimbangan keamanan

</td>
</tr>
<tr>
<td>

**[Performance](PERFORMANCE.md)**  
Optimasi performa

</td>
<td>

**[Getting Started](11%20Getting%20Started.md)**  
Setup development

</td>
</tr>
</table>

</details>

</div>

