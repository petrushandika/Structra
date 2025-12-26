# 📝 Structra — Changelog

Semua perubahan penting pada Structra akan didokumentasikan di file ini.

Format berdasarkan [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
dan project ini mengikuti [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2025-01-20

### Ditambahkan

- **Dukungan Advanced CSS Generation**
  - CSS Mask generation untuk bentuk kompleks
  - Dukungan Aspect Ratio untuk container responsif
  - Penggunaan fungsi Calc() untuk perhitungan dinamis
  - Clip-path generation untuk bentuk geometris
  - Dukungan CSS Custom Properties
  - Implementasi Container Queries
  - Modern Selectors (:has(), :is(), :where())
  - Dukungan CSS Layers (@layer)
  - Backdrop Filter dan CSS Filters

- **CSS-only Shape Generation**
  - Flower, triangle, starburst, polygon, ribbon shapes
  - Custom corners dan borders
  - Section dividers
  - Tooltips dan speech bubbles
  - Loaders dan spinners
  - CSS-only patterns

- **CSS Animations & Transitions**
  - @keyframes animation generation
  - Dukungan CSS transition
  - Transform animations (GPU-accelerated)
  - Dukungan aksesibilitas (prefers-reduced-motion)
  - Animasi yang dioptimalkan performa

- **Modern CSS Features**
  - Container Queries untuk responsivitas tingkat komponen
  - :has() selector untuk parent selection
  - CSS Layers untuk organisasi style
  - Dukungan CSS Nesting
  - Dynamic viewport units
  - Container query units
  - Fluid typography

- **Dokumentasi**
  - [14 Advanced CSS Techniques](14%20Advanced%20CSS%20Techniques.md) - Panduan komprehensif CSS lanjutan
  - [15 CSS Shapes & Patterns](15%20CSS%20Shapes%20%26%20Patterns.md) - Semua jenis shape dan patterns
  - [16 CSS Animations & Transitions](16%20CSS%20Animations%20%26%20Transitions.md) - Panduan animasi
  - [17 CSS-only Solutions](17%20CSS-only%20Solutions.md) - Panduan keputusan CSS-only vs SVG
  - [18 Modern CSS Features](18%20Modern%20CSS%20Features.md) - Panduan fitur CSS modern
  - [19 CSS Performance & Optimization](19%20CSS%20Performance%20%26%20Optimization.md) - Panduan optimasi performa

### Diubah

- Extended Canonical Schema untuk menyertakan:
  - Array `cssAnimations` untuk definisi animasi
  - Object `cssEffects` untuk filters dan transforms
  - Object `cssVariables` untuk custom properties
  - Object `modernCSS` untuk container queries, :has(), @layer
  - Extended `backgroundStrategy` dengan tipe dan shape baru

- Updated MVP system prompt untuk menyertakan:
  - Deteksi semua jenis shape baru
  - Deteksi Advanced CSS (mask, aspect-ratio, calc, clip-path)
  - Deteksi animasi dan transisi

- Updated Engineering Constraints untuk memprioritaskan:
  - Solusi CSS-only sebelum SVG
  - Fitur CSS modern ketika tepat
  - Animasi yang dioptimalkan performa

### Dokumentasi

- Menambahkan contoh komprehensif untuk:
  - Flower shape dengan CSS mask
  - Subtract shape dengan clip-path
  - CSS animations
  - Container query layouts
  - CSS-only pattern backgrounds

- Updated FAQ dengan pertanyaan CSS generation
- Updated Glossary dengan istilah CSS baru
- Updated PRD dengan functional requirements baru (FR-009, FR-010, FR-011)
- Updated ROADMAP dengan timeline fitur CSS

---

## [1.0.0] - 2025-01-15

### Ditambahkan

#### Fitur Inti
- **Canonical Output Schema** — Single source of truth untuk seluruh proses AI
- **Role-Based Reasoning** — Internal AI roles (Analyzer, Layout Engineer, Code Generator)
- **Quality Assessment System** — Tingkat confidence dan risk assessment untuk semua output
- **Ambiguity Handling** — Dokumentasi komprehensif assumptions dan ambiguities

#### Sistem AI
- Analisis desain visual menggunakan Gemini Vision API
- Dukungan input tekstual untuk deskripsi desain
- Layout detection dan component segmentation
- Visual shape interpretation (blob, wave, curve, gradient)
- Responsive strategy analysis
- Design system awareness dan integrasi

#### Code Generation
- Generasi kode Tailwind CSS
- Generasi komponen React
- Dukungan komponen Next.js
- Output HTML semantik
- Pendekatan responsive-first

#### API
- RESTful API dengan autentikasi
- Endpoint `/analyze` untuk analisis desain
- Endpoint `/generate-code` untuk code generation
- Endpoint `/validate-schema` untuk validasi schema
- Dukungan webhook untuk notifikasi async
- Rate limiting dan quota management

#### Dokumentasi
- Suite dokumentasi lengkap (13 dokumen inti)
- Panduan getting started
- Dokumentasi API dengan contoh
- Dokumentasi arsitektur
- Contoh dan use cases
- Dokumentasi prompt templates

#### Developer Experience
- JavaScript/TypeScript SDK (`@structra/sdk`)
- Python SDK (`structra-python`)
- Setup Docker Compose untuk development lokal
- Konfigurasi environment variable
- Database migrations dengan Prisma

#### Infrastruktur
- Frontend Next.js (App Router)
- Backend Elysia.js (Bun runtime)
- Database PostgreSQL
- Vector database Qdrant
- Caching Redis
- Storage S3-compatible (MinIO)
- Containerisasi Docker

### Technical Stack

#### Frontend
- Next.js 16+ (App Router dengan Turbopack)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Radix UI primitives
- React Hook Form + Zod
- Framer Motion
- Monaco Editor

#### Backend
- Bun runtime
- Elysia.js framework
- Prisma ORM
- Sharp (image processing)

#### AI/LLM
- Gemini API (Cloud LLM untuk vision)
- Ollama (Local LLM untuk reasoning)

#### Databases
- PostgreSQL (structured data)
- Qdrant (vector database)
- Redis (caching)

#### Storage
- S3-compatible storage (MinIO/Cloudflare R2/AWS S3)

### Security
- Autentikasi API key
- Validasi dan sanitasi input
- Rate limiting
- Request isolation
- Validasi gambar

### Performance
- Response caching dengan Redis
- Pipeline image processing yang efisien
- Async processing untuk tugas berat
- Database connection pooling

---

## [Unreleased]

### Fitur yang Direncanakan

#### Jangka Pendek (Q1 2025)
- Peningkatan integrasi design system
- Dukungan framework lebih banyak (Vue, Svelte)
- Pesan error yang lebih baik
- Penanganan mobile responsive yang lebih baik
- Batch processing API

#### Jangka Menengah (Q2 2025)
- Fitur kolaborasi real-time
- Version control untuk schemas
- Opsi kustomisasi lanjutan
- Optimasi performa
- Dukungan SDK yang diperluas (Go, Rust)

#### Jangka Panjang (Q3-Q4 2025)
- Dukungan multi-bahasa
- Opsi model AI lanjutan
- Fitur enterprise
- Custom model training
- Marketplace untuk templates

---

## Version History

- **1.0.0** (2025-01-15) — Rilis awal dengan fitur inti

---

## Jenis Perubahan

- **Added** — Fitur baru
- **Changed** — Perubahan pada fungsionalitas yang ada
- **Deprecated** — Fitur yang akan segera dihapus
- **Removed** — Fitur yang dihapus
- **Fixed** — Perbaikan bug
- **Security** — Peningkatan keamanan

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: FAQ](FAQ.md)**  
*Pertanyaan yang Sering Diajukan*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Dokumentasi Overview*

</td>
<td align="right">

**[Next: Contributing →](CONTRIBUTING.md)**  
*Panduan Kontribusi*

</td>
</tr>
</table>

---

<details>
<summary><b>📚 Dokumentasi Terkait</b></summary>

<table>
<tr>
<td>

**[Roadmap](ROADMAP.md)**  
Roadmap pengembangan dan fitur yang direncanakan

</td>
<td>

**[Getting Started](11%20Getting%20Started.md)**  
Setup dan langkah pertama

</td>
</tr>
</table>

</details>

</div>

