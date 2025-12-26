# 🧠 Structra

**AI-powered UI Structure Engineering Engine**

Structra adalah sistem AI yang menganalisis desain visual dan input tekstual, kemudian mengkonversinya menjadi struktur frontend yang bersih, scalable, dan mudah dirawat.

---

## 🎯 Apa itu Structra?

Structra **bukan designer**.  
Structra **bukan code generator**.  
**Structra adalah UI Structure Engineering Engine.**

Structra memperlakukan setiap input desain sebagai **masalah engineering**, bukan hanya konversi visual. Fokus pada:

- **Structure** — Organisasi komponen dan layout yang logis
- **Hierarchy** — Hierarki visual yang jelas dan terstruktur
- **Maintainability** — Kode yang mudah dirawat dan dimodifikasi
- **Explainability** — Setiap keputusan dapat dijelaskan dan dijustifikasi
- **Scalability** — Arsitektur yang dapat berkembang sesuai kebutuhan

---

## ✨ Features

- 🎨 **Visual Design Analysis** — Analisis desain dari gambar (PNG/JPG)
- 📝 **Textual Input** — Input deskripsi tekstual untuk konteks tambahan
- 💻 **Code Input & Reverse Engineering** — Analisis dan reverse engineering kode CSS/HTML
- 🎯 **Canonical Schema** — Single source of truth untuk semua proses AI
- 🤖 **Role-Based Reasoning** — AI dengan 3 role: Analyzer, Layout Engineer, Code Generator
- 📊 **Quality Assessment** — Penilaian kualitas dengan confidence levels
- 🎨 **Multi-Framework Support** — Tailwind, Bootstrap, CSS manual, SCSS, CSS Modules, PostCSS
- 📦 **Collection Management** — Simpan, organisasi, dan reuse CSS patterns
- 🎬 **Advanced CSS Generation** — Mask, clip-path, container queries, modern CSS features
- 🎭 **CSS-only Shapes** — Generate shapes tanpa SVG (blob, wave, subtract, dll)
- 🎪 **Animation Support** — CSS animations dan transitions dengan accessibility support

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20.9+
- Bun 1.0+
- Docker & Docker Compose
- PostgreSQL 15+ (atau gunakan Docker)
- Git

### Installation

1. **Clone repository:**
```bash
git clone https://github.com/your-org/structra.git
cd structra
```

2. **Setup environment variables:**
```bash
# Frontend
cd frontend
cp .env.example .env.local

# Backend
cd ../backend
cp .env.example .env
```

3. **Start services dengan Docker:**
```bash
docker-compose up -d
```

4. **Setup database:**
```bash
cd backend
bunx prisma generate
bunx prisma migrate dev
```

5. **Install dependencies:**
```bash
# Frontend
cd ../frontend
npm install

# Backend
cd ../backend
bun install
```

6. **Start development servers:**
```bash
# Terminal 1 - Backend
cd backend
bun run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

7. **Access application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

**Untuk panduan lengkap, lihat [INSTALLATION.md](INSTALLATION.md)**

---

## 📚 Documentation

Dokumentasi lengkap tersedia di folder `docs/`:

- **[README](docs/README.md)** — Overview dokumentasi
- **[Core Objective](docs/01%20Core%20Objective.md)** — Filosofi dan tujuan
- **[Tech Stack](docs/08%20Tech%20Stack.md)** — Teknologi yang digunakan
- **[Architecture](docs/09%20Architecture.md)** — Arsitektur sistem
- **[API Documentation](docs/10%20API%20Documentation.md)** — Dokumentasi API
- **[Getting Started](docs/11%20Getting%20Started.md)** — Panduan memulai

**Lihat [docs/README.md](docs/README.md) untuk daftar lengkap dokumentasi.**

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16+** (App Router dengan Turbopack)
- **React 19+**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** + **Radix UI**
- **Monaco Editor** (code preview)
- **Framer Motion** (animations)

### Backend
- **Bun** (runtime)
- **Elysia.js** (web framework)
- **TypeScript**
- **Prisma ORM 6+** (database)
- **PostgreSQL 15+** (database)
- **Redis** (caching)
- **Qdrant** (vector database)

### AI/ML
- **Google Gemini API** (vision analysis)
- **Ollama** (local LLM untuk reasoning)

### Infrastructure
- **Docker** & **Docker Compose**
- **MinIO** (S3-compatible storage)

---

## 📖 Usage Examples

### Via Web Dashboard

1. Login ke dashboard
2. Klik "New Analysis"
3. Upload design image (PNG/JPG)
4. Tambahkan deskripsi tekstual (optional)
5. Pilih framework target (Tailwind, React, dll)
6. Klik "Analyze"
7. Review canonical schema
8. Generate code

### Via API

```javascript
import { StructraClient } from '@structra/sdk';

const client = new StructraClient({
  apiKey: 'YOUR_API_KEY'
});

const result = await client.analyze({
  image: './design.png',
  frameworkTarget: ['tailwind', 'react']
});

console.log(result.schema);
console.log(result.code);
```

---

## 🏗️ Project Structure

```
structra/
├── docs/                 # Documentation
├── frontend/             # Next.js frontend application
│   ├── app/             # App router pages
│   ├── components/      # React components
│   └── lib/             # Utilities
├── backend/              # Elysia.js backend API
│   ├── src/
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   └── ai/          # AI orchestration
│   └── prisma/          # Prisma schema & migrations
├── docker-compose.yml    # Docker services
└── INSTALLATION.md       # Installation guide
```

---

## 🤝 Contributing

Kami menyambut kontribusi! Silakan baca [CONTRIBUTING.md](docs/CONTRIBUTING.md) untuk panduan.

---

## 📄 License

[License information]

---

## 🔗 Links

- **Documentation**: [docs/README.md](docs/README.md)
- **API Docs**: [docs/10 API Documentation.md](docs/10%20API%20Documentation.md)
- **Installation Guide**: [INSTALLATION.md](INSTALLATION.md)

---

## 🆘 Support

- **FAQ**: [docs/FAQ.md](docs/FAQ.md)
- **Troubleshooting**: [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)
- **Issues**: GitHub Issues

---

**Made with ❤️ by the Structra team**

