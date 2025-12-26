# 🏗️ Backend Architecture

Struktur arsitektur backend Structra menggunakan pattern **Controllers → Services → Database**.

---

## 📁 Struktur Folder

```
backend/src/
├── controllers/          # Request handlers (routes)
│   ├── analyze.controller.ts
│   ├── code.controller.ts
│   ├── project.controller.ts
│   ├── collection.controller.ts
│   └── index.ts
├── services/            # Business logic
│   ├── analyze.service.ts
│   ├── code.service.ts
│   ├── project.service.ts
│   ├── collection.service.ts
│   └── auth.service.ts
├── middleware/           # Middleware functions
│   ├── auth.middleware.ts
│   ├── validation.middleware.ts
│   └── rateLimit.middleware.ts
├── ai/                   # AI orchestration
│   └── (AI services)
├── routes/               # Route definitions (optional)
├── utils/                # Utility functions
│   └── redis.ts
├── types/                # TypeScript types
└── index.ts              # Main entry point
```

---

## 🎯 Arsitektur Pattern

### 1. Controllers Layer
**Lokasi:** `src/controllers/`

**Tanggung Jawab:**
- Menangani HTTP requests/responses
- Validasi input (dengan middleware)
- Memanggil services
- Format response

**Contoh:**
```typescript
export const analyzeController = new Elysia({ prefix: '/analyze' })
  .use(authenticate)
  .post('/', async ({ body, user }) => {
    const result = await analyzeService.analyzeDesign({...})
    return { success: true, data: result }
  })
```

### 2. Services Layer
**Lokasi:** `src/services/`

**Tanggung Jawab:**
- Business logic
- Database operations (via Prisma)
- AI orchestration
- Data transformation

**Contoh:**
```typescript
export const analyzeService = {
  async analyzeDesign(params) {
    // Business logic here
    // Call AI services
    // Save to database
    return result
  }
}
```

### 3. Middleware Layer
**Lokasi:** `src/middleware/`

**Tanggung Jawab:**
- Authentication
- Authorization
- Request validation
- Rate limiting
- Error handling

**Contoh:**
```typescript
export const authenticate = new Elysia()
  .derive(async ({ headers }) => {
    const user = await verifyApiKey(token)
    return { user }
  })
```

### 4. Database Layer
**Lokasi:** `prisma/schema.prisma`

**Tanggung Jawab:**
- Database schema
- Migrations
- Prisma Client generation

---

## 🔄 Request Flow

```
Client Request
    ↓
Elysia Router
    ↓
Middleware (Auth, Validation, Rate Limit)
    ↓
Controller (Request Handler)
    ↓
Service (Business Logic)
    ↓
Database (Prisma) / External APIs
    ↓
Service (Transform Data)
    ↓
Controller (Format Response)
    ↓
Client Response
```

---

## 📝 Best Practices

### Controllers
- ✅ Hanya handle HTTP concerns
- ✅ Validasi input dengan middleware
- ✅ Format response konsisten
- ❌ Jangan taruh business logic di controller

### Services
- ✅ Semua business logic di sini
- ✅ Reusable functions
- ✅ Handle errors dengan baik
- ❌ Jangan handle HTTP concerns

### Middleware
- ✅ Reusable across routes
- ✅ Chainable dengan Elysia
- ✅ Early return untuk errors
- ❌ Jangan taruh business logic

---

## 🔌 Integration Points

### External Services
- **Gemini API** - Vision analysis
- **Ollama** - Local LLM
- **Redis** - Caching & rate limiting
- **MinIO/S3** - Image storage
- **Qdrant** - Vector database

### Internal Services
- **Prisma** - Database ORM
- **Elysia.js** - Web framework
- **Zod** - Schema validation

---

## 🚀 Adding New Endpoint

1. **Create Service** (`src/services/`)
   ```typescript
   export const myService = {
     async doSomething(params) {
       // Business logic
     }
   }
   ```

2. **Create Controller** (`src/controllers/`)
   ```typescript
   export const myController = new Elysia({ prefix: '/my' })
     .use(authenticate)
     .post('/', async ({ body, user }) => {
       const result = await myService.doSomething({...})
       return { success: true, data: result }
     })
   ```

3. **Register in index.ts**
   ```typescript
   import { myController } from './controllers'
   app.use(myController)
   ```

---

**Arsitektur ini memastikan separation of concerns dan maintainability yang baik! 🎯**

