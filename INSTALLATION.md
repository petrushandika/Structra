# 🚀 Structra - Panduan Instalasi Lengkap

Panduan lengkap untuk menginstall dan setup Structra development environment.

---

## 📋 Prerequisites

Sebelum memulai instalasi, pastikan sistem Anda memiliki:

### Required Software

1. **Node.js** 20.9+ atau lebih baru
   - Download: https://nodejs.org/
   - Verifikasi: `node --version`

2. **Bun** 1.0+ (untuk backend)
   - Install: `npm install -g bun`
   - Atau download: https://bun.sh/
   - Verifikasi: `bun --version`

3. **Docker** dan **Docker Compose**
   - Download: https://www.docker.com/get-started
   - Verifikasi: `docker --version` dan `docker-compose --version`

4. **Git**
   - Download: https://git-scm.com/
   - Verifikasi: `git --version`

### Optional (untuk local LLM)

5. **Ollama** (untuk local LLM)
   - Download: https://ollama.ai/
   - Install model: `ollama pull mistral` atau `ollama pull llama2`

---

## 🔧 Step-by-Step Installation

### Step 1: Clone Repository

```bash
git clone https://github.com/your-org/structra.git
cd structra
```

### Step 2: Setup Environment Variables

#### Frontend Environment

```bash
cd frontend
cp .env.example .env.local
```

Edit `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### Backend Environment

```bash
cd ../backend
cp .env.example .env
```

Edit `backend/.env`:
```env
# Application
NODE_ENV=development
PORT=8000
APP_URL=http://localhost:8000

# Database
DATABASE_URL=postgresql://structra:structra_dev_password@localhost:5432/structra

# Redis
REDIS_URL=redis://:structra_redis_password@localhost:6379

# AI Services
GEMINI_API_KEY=your_gemini_api_key_here
OLLAMA_URL=http://localhost:11434

# Storage (MinIO)
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET=structra-images
S3_REGION=us-east-1

# Security
JWT_SECRET=your_jwt_secret_here_change_in_production
API_KEY_SECRET=your_api_key_secret_here
ENCRYPTION_KEY=your_encryption_key_here

# Qdrant
QDRANT_URL=http://localhost:6333
```

### Step 3: Start Services dengan Docker Compose

```bash
# Dari root directory
docker-compose up -d
```

Ini akan start:
- PostgreSQL (port 5432)
- Redis (port 6379)
- MinIO (port 9000, console 9001)
- Qdrant (port 6333)

**Verifikasi services running:**
```bash
docker-compose ps
```

**Check logs:**
```bash
docker-compose logs -f
```

### Step 4: Setup MinIO Bucket

1. Buka MinIO Console: http://localhost:9001
2. Login dengan:
   - Username: `minioadmin`
   - Password: `minioadmin`
3. Create bucket: `structra-images`
4. Set bucket policy untuk public read (jika diperlukan)

### Step 5: Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Step 6: Install Backend Dependencies

```bash
cd ../backend
bun install
```

### Step 7: Setup Database dengan Prisma

```bash
cd backend

# Generate Prisma Client
bunx prisma generate

# Run database migrations
bunx prisma migrate dev

# (Optional) Seed database
bunx prisma db seed
```

### Step 8: Setup Ollama (Optional)

Jika ingin menggunakan local LLM:

```bash
# Install Ollama (jika belum)
# Windows: Download dari https://ollama.ai/
# Mac: brew install ollama
# Linux: curl -fsSL https://ollama.ai/install.sh | sh

# Start Ollama service
ollama serve

# Pull required models (di terminal lain)
ollama pull mistral
# atau
ollama pull llama2
```

### Step 9: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
bun run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 10: Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/swagger (jika menggunakan Elysia Swagger)
- **MinIO Console**: http://localhost:9001
- **Qdrant Dashboard**: http://localhost:6333/dashboard

---

## 🔑 Getting API Keys

### Gemini API Key

1. Go to: https://makersuite.google.com/app/apikey
2. Create new API key
3. Copy key ke `backend/.env` sebagai `GEMINI_API_KEY`

---

## ✅ Verification Checklist

Setelah instalasi, verifikasi semua komponen:

- [ ] Docker services running (`docker-compose ps`)
- [ ] PostgreSQL accessible (`psql -h localhost -U structra -d structra`)
- [ ] Redis accessible (`redis-cli -h localhost -p 6379 ping`)
- [ ] MinIO accessible (http://localhost:9001)
- [ ] Qdrant accessible (http://localhost:6333/health)
- [ ] Frontend running (http://localhost:3000)
- [ ] Backend running (http://localhost:8000/health)
- [ ] Database migrations applied
- [ ] Gemini API key configured
- [ ] Ollama running (jika digunakan)

---

## 🐛 Troubleshooting

### Database Connection Error

```bash
# Check PostgreSQL status
docker-compose ps postgres

# Check logs
docker-compose logs postgres

# Restart PostgreSQL
docker-compose restart postgres
```

### Prisma Client Not Generated

```bash
cd backend
bunx prisma generate
```

### Port Already in Use

Jika port sudah digunakan, edit `docker-compose.yml` dan ubah port mapping.

### Ollama Not Responding

```bash
# Check Ollama status
curl http://localhost:11434/api/tags

# Restart Ollama
ollama serve
```

### MinIO Bucket Not Found

1. Buka MinIO Console: http://localhost:9001
2. Create bucket `structra-images`
3. Set appropriate bucket policy

---

## 📚 Next Steps

Setelah instalasi selesai:

1. **Baca Dokumentasi:**
   - [Getting Started](docs/11%20Getting%20Started.md)
   - [API Documentation](docs/10%20API%20Documentation.md)
   - [Architecture](docs/09%20Architecture.md)

2. **Coba First Analysis:**
   - Upload design image di dashboard
   - Review canonical schema
   - Generate code

3. **Explore Features:**
   - Design system integration
   - Code input & reverse engineering
   - Collection management

---

## 🔄 Update Dependencies

### Update Frontend Dependencies

```bash
cd frontend
npm update
```

### Update Backend Dependencies

```bash
cd backend
bun update
```

### Update Docker Services

```bash
docker-compose pull
docker-compose up -d
```

---

## 🗑️ Cleanup

Untuk menghapus semua data dan containers:

```bash
# Stop dan remove containers
docker-compose down

# Remove volumes (HATI-HATI: ini akan menghapus semua data)
docker-compose down -v
```

---

## 📞 Support

Jika mengalami masalah:

1. Check [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)
2. Check [FAQ.md](docs/FAQ.md)
3. Open issue di GitHub repository

---

**Selamat! Structra sudah siap digunakan! 🎉**

