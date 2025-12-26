# 🧠 Structra — Tech Stack Documentation

Structra is an AI-powered UI structure engine that analyzes visual and textual design inputs
and converts them into clean, scalable, and maintainable frontend architectures.

This document describes the **initial tech stack** used to build Structra,
optimized for **rapid iteration, local-first AI development, and future scalability**.

---

## 🎯 Core Goal

> Analyze visual designs + textual intent  
> → reason about layout & hierarchy  
> → generate structured frontend code with engineering-grade quality

---

## 1️⃣ Frontend Stack (SaaS Dashboard & Playground)

### Core Framework
- **Next.js 16+ (App Router dengan Turbopack)**
  - SEO-ready landing pages
  - Server Actions untuk AI requests
  - Production-ready untuk SaaS B2B
  - Turbopack sebagai default bundler untuk build lebih cepat
  - Dukungan React 19

- **TypeScript**
  - Strong typing for complex AI outputs
  - Safer iteration on layout schema

- **Tailwind CSS**
  - Primary target output for Structra
  - Utility-first, scalable, and maintainable

---

### UI Layer
- **shadcn/ui**
  - Clean, composable UI components
  - Ideal for dashboards and playgrounds

- **Radix UI**
  - Accessibility-first primitives
  - Predictable behavior across browsers

---

### UX & Developer Experience
- **React Hook Form + Zod**
  - Typed form validation
- **Framer Motion**
  - Layout & component preview animation
- **Monaco Editor**
  - Code preview for generated output

---

## 2️⃣ Backend Stack (AI Orchestration Layer)

> This is the **core intelligence layer** of Structra.

### Runtime
- **Bun**
  - Fast startup
  - Native TypeScript support
  - Excellent for AI orchestration services

### Framework
- **Elysia.js**
  - Lightweight and high-performance
  - Strong typing
  - Ideal for API-first AI services

**Why Elysia + Bun?**
- Minimal overhead
- Fast iteration
- Clean architecture for AI pipelines

---

## 3️⃣ AI / LLM Stack (Initial Phase)

Structra is designed as a **multi-model system**, but the initial phase focuses on:

### ☁️ Gemini API (Cloud LLM)

- **Gemini Pro / Gemini Vision**
  - Visual design analysis
  - Layout interpretation
  - Textual reasoning

Used for:
- Screenshot & design image understanding
- High-level layout hypothesis
- Component and hierarchy inference

---

### 🖥️ Ollama (Local LLM)

- **Mistral / LLaMA / DeepSeek**
- Runs locally or on private servers

Used for:
- Layout reasoning refinement
- Code generation
- Cost-efficient iteration
- Prompt experimentation

**Benefits**
- No vendor lock-in
- Full prompt control
- Ideal for R&D and experimentation

---

### AI Reasoning Flow

```

Image Input
↓
Gemini Vision
↓
Layout Hypothesis
↓
Ollama (Reasoning & Structuring)
↓
Code Generator

```

---

## 4️⃣ Prompt & Knowledge Engine (Core Differentiator)

### Prompt System
- Versioned prompt templates
- Role-based prompting:
  - Analyzer
  - Layout Engineer
  - Code Generator
- Internal reasoning chains (not exposed to users)

---

### Knowledge Base
- **PostgreSQL**
  - UI layout patterns
  - Tailwind utility recipes
  - SVG shape strategies
  - Past successful solutions

- **Vector Database (Qdrant)**
  - Similar layout matching
  - Retrieval-augmented prompting
  - Continuous learning from user revisions

---

## 5️⃣ Storage & File Handling

- **S3-compatible Storage**
  - MinIO / Cloudflare R2 / AWS S3
  - Stores uploaded design images

- **Image Processing**
  - Sharp (Node/Bun)
  - Preprocessing for vision models

---

## 6️⃣ Database & State Management

- **PostgreSQL**
  - Users
  - Projects
  - Prompt versions
  - AI output history

- **Prisma ORM 6+**
  - Type-safe database client
  - Schema safety dan validasi
  - Migration management
  - Database introspection
  - Query optimization

- **Redis**
  - Caching AI responses
  - Rate limiting
  - Session support

---

## 7️⃣ Authentication & Billing (Planned)

### Authentication
- **Auth.js** or **Clerk**
- Role-based access:
  - User
  - Team
  - Admin

### Billing
- **Stripe**
  - Credit-based usage
  - Per-image or per-request pricing
  - Team plans

---

## 8️⃣ Infrastructure & Deployment

### Containerization
- **Docker**
- **Docker Compose** (MVP)

### Hosting
- **Frontend:** Vercel
- **Backend:** Fly.io / Railway
- **LLM Runtime:** Local / GPU provider (later)

---

## 9️⃣ Security & Governance

- API rate limiting
- Prompt injection prevention
- Image validation & sanitization
- Request isolation

---

## 🧩 MVP Stack Summary (Initial Phase)

```

Next.js
Tailwind CSS
shadcn/ui
Bun
Elysia.js
Gemini API
Ollama
PostgreSQL
Qdrant
S3-compatible storage
Docker

```

---

## 🧠 Engineering Principle

> Do not chase pixel perfection first.  
> **Win on structure, reasoning, and maintainability.**

Structra treats UI conversion as an **engineering problem**, not a visual one.

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Engineering Constraints](07%20Engineering%20Constraints.md)**  
*Engineering Constraints & Design System*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: Architecture →](09%20Architecture.md)**  
*System Architecture*

</td>
</tr>
</table>

---

</div>

