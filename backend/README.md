# 🚀 Backend - Structra API

Elysia.js backend API untuk Structra dengan Bun runtime.

---

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Setup database
bunx prisma generate
bunx prisma migrate dev

# Start development server
bun run dev
```

API akan berjalan di: http://localhost:8000

---

## 📁 Struktur Folder

```
backend/
├── src/
│   ├── controllers/       # Request handlers
│   │   ├── analyze.controller.ts
│   │   ├── code.controller.ts
│   │   ├── project.controller.ts
│   │   └── collection.controller.ts
│   ├── services/          # Business logic
│   │   ├── analyze.service.ts
│   │   ├── code.service.ts
│   │   ├── project.service.ts
│   │   ├── collection.service.ts
│   │   └── auth.service.ts
│   ├── middleware/        # Middleware
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── rateLimit.middleware.ts
│   ├── ai/                # AI orchestration
│   ├── utils/             # Utilities
│   │   └── redis.ts
│   ├── types/             # TypeScript types
│   └── index.ts           # Main entry point
├── prisma/
│   └── schema.prisma      # Database schema
├── ARCHITECTURE.md        # Architecture documentation
└── package.json
```

---

## 🛠️ Tech Stack

- **Bun** - JavaScript runtime
- **Elysia.js** - Web framework
- **TypeScript** - Type safety
- **Prisma ORM** - Database ORM
- **PostgreSQL** - Database
- **Redis** - Caching & rate limiting
- **Google Gemini API** - AI vision analysis
- **Ollama** - Local LLM (optional)

---

## 📝 Environment Variables

Copy `env.example` ke `.env`:

```env
PORT=8000
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
GEMINI_API_KEY=your_api_key
```

Lihat `env.example` untuk semua variabel yang diperlukan.

---

## 🏗️ Architecture

Backend menggunakan pattern **Controllers → Services → Database**.

### Request Flow

```
Request → Middleware → Controller → Service → Database/External APIs
```

### Layers

1. **Controllers** - Handle HTTP requests/responses
2. **Services** - Business logic & database operations
3. **Middleware** - Auth, validation, rate limiting
4. **Database** - Prisma ORM dengan PostgreSQL

Lihat [ARCHITECTURE.md](./ARCHITECTURE.md) untuk detail lengkap.

---

## 🔌 API Endpoints

- `GET /` - API info
- `GET /health` - Health check
- `POST /analyze` - Analyze design
- `POST /code/generate` - Generate code
- `POST /code/validate-schema` - Validate schema
- `GET /projects` - List projects
- `GET /projects/:id` - Get project
- `POST /projects` - Create project
- `GET /collections` - List collections
- `POST /collections` - Create collection

API Documentation: http://localhost:8000/swagger

---

## 🗄️ Database

### Setup Database

```bash
# Generate Prisma Client
bunx prisma generate

# Run migrations
bunx prisma migrate dev

# Open Prisma Studio
bunx prisma studio
```

### Models

- **User** - User accounts
- **Project** - User projects
- **Analysis** - Design analyses
- **ApiKey** - API keys
- **Collection** - Saved CSS collections

---

## 🧪 Development

### Menambah Endpoint Baru

1. **Create Service** (`src/services/`)
2. **Create Controller** (`src/controllers/`)
3. **Register di** `src/index.ts`

Lihat [ARCHITECTURE.md](./ARCHITECTURE.md) untuk contoh lengkap.

### Testing

```bash
# Run tests (jika ada)
bun test
```

---

## 📦 Build & Deploy

```bash
# Build
bun run build

# Start production
bun run start
```

---

## 🔗 Links

- **API**: http://localhost:8000
- **Swagger Docs**: http://localhost:8000/swagger
- **Architecture**: [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Frontend**: [../frontend/README.md](../frontend/README.md)

---

## 📚 Documentation

Lihat dokumentasi lengkap di folder `../docs/`:
- [API Documentation](../docs/10%20API%20Documentation.md)
- [Architecture](../docs/09%20Architecture.md)
- [Getting Started](../docs/11%20Getting%20Started.md)

