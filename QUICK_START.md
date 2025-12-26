# ⚡ Quick Start Guide

Panduan cepat untuk memulai Structra dalam 5 menit.

---

## 🚀 Quick Setup (Windows)

### 1. Run Setup Script

```powershell
.\setup.ps1
```

Script ini akan:
- ✅ Check prerequisites (Node.js, Bun, Docker)
- ✅ Setup environment files
- ✅ Start Docker services
- ✅ Install dependencies
- ✅ Setup database

### 2. Configure API Keys

Edit `backend/.env` dan tambahkan:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Dapatkan API key: https://makersuite.google.com/app/apikey

### 3. Start Development

**Terminal 1 - Backend:**
```powershell
cd backend
bun run dev
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

### 4. Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

---

## 🚀 Quick Setup (Linux/Mac)

### 1. Run Setup Script

```bash
chmod +x setup.sh
./setup.sh
```

### 2. Configure API Keys

Edit `backend/.env` dan tambahkan:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Start Development

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

### 4. Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

---

## 📋 Manual Setup (Jika Script Gagal)

### 1. Prerequisites

Install:
- Node.js 20.9+
- Bun 1.0+
- Docker & Docker Compose

### 2. Environment Setup

```bash
# Frontend
cp frontend/env.example frontend/.env.local

# Backend
cp backend/env.example backend/.env
```

### 3. Start Services

```bash
docker-compose up -d
```

### 4. Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
bun install
```

### 5. Setup Database

```bash
cd backend
bunx prisma generate
bunx prisma migrate dev
```

### 6. Start Development

```bash
# Terminal 1
cd backend && bun run dev

# Terminal 2
cd frontend && npm run dev
```

---

## ✅ Verification

Check semua services running:

```bash
# Docker services
docker-compose ps

# Backend health
curl http://localhost:8000/health

# Frontend
curl http://localhost:3000
```

---

## 🐛 Troubleshooting

### Port Already in Use

Edit `docker-compose.yml` dan ubah port mapping.

### Database Connection Error

```bash
docker-compose restart postgres
cd backend
bunx prisma generate
```

### Prisma Client Not Found

```bash
cd backend
bunx prisma generate
```

---

## 📚 Next Steps

1. **Read Documentation**: [docs/README.md](docs/README.md)
2. **API Guide**: [docs/10 API Documentation.md](docs/10%20API%20Documentation.md)
3. **Architecture**: [docs/09 Architecture.md](docs/09%20Architecture.md)

---

**Selamat! Structra siap digunakan! 🎉**

