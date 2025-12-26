# 📖 Structra — Glosarium

Istilah teknis, definisi, dan konsep kunci yang digunakan di seluruh dokumentasi Structra.

---

## 📋 Daftar Isi

- [Konsep Inti](#konsep-inti)
- [AI & Machine Learning](#ai--machine-learning)
- [Istilah Teknis](#istilah-teknis)
- [Akronim & Singkatan](#akronim--singkatan)

---

## 🎯 Konsep Inti

### Canonical Schema

Representasi JSON terstruktur yang berfungsi sebagai **single source of truth** untuk seluruh proses AI di Structra. Mencakup sections, components, layout strategies, responsive rules, assumptions, dan ambiguities.

**Terkait**: [03 Canonical Schema](03%20Canonical%20Schema.md)

### Role-Based Reasoning

Sistem reasoning AI internal yang menggunakan tiga role berbeda yang bekerja secara berurutan:
- **Analyzer** — Observasi dan identifikasi elemen desain
- **Layout Engineer** — Membuat keputusan struktural
- **Code Generator** — Implementasi kode dari schema

**Terkait**: [04 AI Roles](04%20AI%20Roles.md)

### Quality Assessment

Sistem evaluasi wajib yang menyediakan tingkat confidence dan risk assessment untuk semua output non-trivial, termasuk:
- Visual Confidence
- Structural Confidence
- Responsive Risk
- Maintainability Risk
- Manual Adjustment Needed

**Terkait**: [05 Quality Assessment](05%20Quality%20Assessment.md)

### Ambiguity Handling

Proses mendeteksi, mendokumentasikan, dan menyelesaikan ketidakpastian dalam analisis desain. Semua ambiguities dan assumptions harus secara eksplisit dicatat dalam canonical schema.

**Terkait**: [06 Ambiguity Handling](06%20Ambiguity%20Handling.md)

### Engineering Constraints

Aturan dan panduan yang memastikan kode yang dihasilkan mengikuti best practices:
- Simplicity First Principle
- Forbidden Patterns (magic numbers, deep nesting, dll)
- Design System Awareness
- Code Quality Rules

**Terkait**: [07 Engineering Constraints](07%20Engineering%20Constraints.md)

---

## 🤖 AI & Machine Learning

### Analyzer Role

Role pertama dalam reasoning chain Structra. Bertanggung jawab untuk:
- Memahami desain visual dan input tekstual
- Mengidentifikasi sections, hierarchy, dan visual intent
- Menilai kompleksitas visual
- **Tidak** menghasilkan kode atau membuat keputusan styling final

**Terkait**: [04 AI Roles](04%20AI%20Roles.md)

### Layout Engineer Role

Role kedua dalam reasoning chain Structra. Bertanggung jawab untuk:
- Membuat keputusan layout dan struktural
- Menentukan strategi CSS dan responsive behavior
- Membuat canonical schema final
- Memprioritaskan maintainability

**Terkait**: [04 AI Roles](04%20AI%20Roles.md)

### Code Generator Role

Role ketiga dalam reasoning chain Structra. Bertanggung jawab untuk:
- Menghasilkan kode dari canonical schema
- Mempertahankan semantik dan readability
- Memastikan kode sesuai spesifikasi
- **Tidak** memodifikasi struktur schema

**Terkait**: [04 AI Roles](04%20AI%20Roles.md)

### Gemini API

LLM (Large Language Model) berbasis cloud milik Google yang digunakan Structra untuk:
- Analisis desain visual
- Interpretasi layout
- Reasoning tekstual
- Pemahaman gambar

**Terkait**: [08 Tech Stack](08%20Tech%20Stack.md)

### Ollama

Runtime LLM lokal yang digunakan Structra untuk:
- Refinement reasoning layout
- Code generation
- Iterasi yang hemat biaya
- Eksperimen prompt

**Terkait**: [08 Tech Stack](08%20Tech%20Stack.md)

### RAG (Retrieval-Augmented Generation)

Teknik yang digunakan Structra untuk meningkatkan respons AI dengan:
- Mencari layout serupa dari knowledge base
- Menggunakan pattern yang terbukti
- Belajar terus-menerus dari revisi pengguna

**Terkait**: [09 Architecture](09%20Architecture.md)

---

## 💻 Istilah Teknis

### Framework Target

Framework target untuk code generation. Saat ini didukung:
- `tailwind` — Tailwind CSS utility classes
- `react` — React components
- `nextjs` — Next.js components
- `html` — Semantic HTML + CSS

**Terkait**: [10 API Documentation](10%20API%20Documentation.md)

### Design System

Koleksi komponen yang dapat digunakan kembali, design tokens, dan panduan yang memastikan konsistensi. Structra dapat mengintegrasikan dengan design systems untuk:
- Menggunakan color tokens
- Mengikuti spacing scales
- Menggunakan komponen yang ada
- Mempertahankan konsistensi

**Terkait**: [07 Engineering Constraints](07%20Engineering%20Constraints.md)

### Responsive Rules

Aturan yang didefinisikan dalam canonical schema yang menentukan bagaimana layout beradaptasi pada breakpoint yang berbeda:
- `mobile` — Perangkat mobile (< 768px)
- `tablet` — Perangkat tablet (768px - 1024px)
- `desktop` — Perangkat desktop (> 1024px)

Actions: `restructure`, `simplify`, `hide`

**Terkait**: [03 Canonical Schema](03%20Canonical%20Schema.md)

### Layout Strategy

Pendekatan yang dipilih untuk mengorganisir konten:
- `grid` — CSS Grid layout
- `flex` — Flexbox layout
- `hybrid` — Kombinasi grid dan flex

**Terkait**: [03 Canonical Schema](03%20Canonical%20Schema.md)

### Background Strategy

Pendekatan untuk menangani abstract shapes dan backgrounds:
- `svg` — SVG shapes (untuk bentuk organik kompleks)
- `css-gradient` — CSS gradients (untuk gradient sederhana)
- `pseudo-element` — CSS pseudo-elements (untuk efek dekoratif)
- `background-image` — Background images (pilihan terakhir)

**Terkait**: [03 Canonical Schema](03%20Canonical%20Schema.md)

### Z-Index Strategy

Pendekatan untuk mengelola layering elemen:
- `minimal` — Penggunaan z-index minimal (disukai)
- `moderate` — Penggunaan z-index sedang
- `complex` — Penggunaan z-index kompleks (dihindari)

**Terkait**: [03 Canonical Schema](03%20Canonical%20Schema.md)

### CSS Mask

Properti CSS yang memungkinkan membuat efek transparansi kompleks dan cutout menggunakan mask images atau gradients.

**Use Cases:**
- Membuat flower shapes
- Cutout kompleks
- Efek vignette
- Menggabungkan beberapa bentuk

**Terkait**: [14 Advanced CSS Techniques](14%20Advanced%20CSS%20Techniques.md)

### Aspect Ratio

Properti CSS yang mempertahankan proporsi konsisten elemen, terutama berguna untuk container responsif.

**Contoh**: `aspect-ratio: 16 / 9` mempertahankan rasio 16:9 terlepas dari lebar.

**Terkait**: [14 Advanced CSS Techniques](14%20Advanced%20CSS%20Techniques.md)

### Clip Path

Properti CSS yang membuat cutout geometris dan bentuk menggunakan fungsi polygon, circle, atau ellipse.

**Use Cases:**
- Bentuk geometris (triangle, hexagon, star)
- Notches dan cutouts
- Elemen dekoratif
- Image cropping

**Terkait**: [14 Advanced CSS Techniques](14%20Advanced%20CSS%20Techniques.md), [15 CSS Shapes & Patterns](15%20CSS%20Shapes%20%26%20Patterns.md)

### Container Queries

Fitur CSS yang memungkinkan styling berdasarkan ukuran container daripada ukuran viewport, memungkinkan responsivitas tingkat komponen.

**Sintaks**: `@container (min-width: 400px) { ... }`

**Terkait**: [18 Modern CSS Features](18%20Modern%20CSS%20Features.md)

### CSS Layers

Fitur CSS (@layer) yang menyediakan kontrol cascade dan organisasi style, memungkinkan manajemen prioritas style yang lebih baik.

**Use Cases:**
- Organisasi framework
- Prioritisasi style
- Struktur design system
- Manajemen override

**Terkait**: [18 Modern CSS Features](18%20Modern%20CSS%20Features.md)

### :has() Selector

Selector CSS modern yang memungkinkan memilih elemen parent berdasarkan children atau siblings mereka.

**Contoh**: `.card:has(.badge)` memilih card yang berisi elemen badge.

**Terkait**: [18 Modern CSS Features](18%20Modern%20CSS%20Features.md)

### CSS-only

Pendekatan membuat shapes, efek, dan patterns menggunakan pure CSS (mask, clip-path, pseudo-elements) tanpa SVG atau images.

**Keuntungan:**
- Performa lebih baik
- Lebih mudah dirawat
- Lebih responsif
- Ukuran file lebih kecil

**Terkait**: [17 CSS-only Solutions](17%20CSS-only%20Solutions.md)

### Assumptions

Asumsi yang secara eksplisit didokumentasikan yang dibuat oleh AI selama analisis. Semua assumptions harus dicatat dalam canonical schema dan dapat dimodifikasi oleh pengguna.

**Terkait**: [06 Ambiguity Handling](06%20Ambiguity%20Handling.md)

### Ambiguities

Area ketidakpastian dalam analisis desain yang didokumentasikan dengan:
- `area` — Area desain dengan ambiguitas
- `issue` — Deskripsi masalah
- `alternatives` — Solusi alternatif yang dipertimbangkan
- `chosen` — Solusi yang dipilih
- `reason` — Alasan untuk pilihan

**Terkait**: [06 Ambiguity Handling](06%20Ambiguity%20Handling.md)

---

## 🔤 Akronim & Singkatan

### API
**Application Programming Interface** — RESTful API yang disediakan Structra untuk akses terprogram.

**Terkait**: [10 API Documentation](10%20API%20Documentation.md)

### SDK
**Software Development Kit** — Library yang disediakan Structra untuk integrasi yang lebih mudah:
- `@structra/sdk` — JavaScript/TypeScript SDK
- `structra-python` — Python SDK

**Terkait**: [10 API Documentation](10%20API%20Documentation.md)

### LLM
**Large Language Model** — Model AI yang digunakan untuk natural language processing dan code generation:
- Gemini (Cloud LLM)
- Ollama (Local LLM)

**Terkait**: [08 Tech Stack](08%20Tech%20Stack.md)

### RAG
**Retrieval-Augmented Generation** — Teknik untuk meningkatkan respons AI dengan retrieval dari knowledge base.

**Terkait**: [09 Architecture](09%20Architecture.md)

### ORM
**Object-Relational Mapping** — Prisma ORM yang digunakan untuk interaksi database.

**Terkait**: [08 Tech Stack](08%20Tech%20Stack.md)

### S3
**Simple Storage Service** — Storage S3-compatible untuk gambar desain (MinIO, Cloudflare R2, AWS S3).

**Terkait**: [08 Tech Stack](08%20Tech%20Stack.md)

### CI/CD
**Continuous Integration/Continuous Deployment** — Pipeline testing dan deployment otomatis.

**Terkait**: [INTEGRATION.md](INTEGRATION.md)

### JWT
**JSON Web Token** — Mekanisme autentikasi berbasis token.

**Terkait**: [SECURITY.md](SECURITY.md)

### CORS
**Cross-Origin Resource Sharing** — Mekanisme untuk mengizinkan cross-origin requests.

**Terkait**: [10 API Documentation](10%20API%20Documentation.md)

### REST
**Representational State Transfer** — Gaya arsitektur untuk layanan web (Structra menggunakan RESTful API).

**Terkait**: [10 API Documentation](10%20API%20Documentation.md)

### WCAG
**Web Content Accessibility Guidelines** — Standar untuk aksesibilitas web (fitur masa depan).

**Terkait**: [ROADMAP.md](ROADMAP.md)

---

## 📚 Dokumentasi Terkait

- **[Core Objective](01%20Core%20Objective.md)** — Konsep inti
- **[Canonical Schema](03%20Canonical%20Schema.md)** — Struktur schema
- **[AI Roles](04%20AI%20Roles.md)** — Role-based reasoning
- **[Architecture](09%20Architecture.md)** — Arsitektur sistem

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Roadmap](ROADMAP.md)**  
*Roadmap Pengembangan*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Dokumentasi Overview*

</td>
<td align="right">

**[Next: Performance →](PERFORMANCE.md)**  
*Panduan Optimasi Performa*

</td>
</tr>
</table>

---

<details>
<summary><b>📚 Dokumentasi Terkait</b></summary>

<table>
<tr>
<td>

**[Core Objective](01%20Core%20Objective.md)**  
Konsep dan filosofi inti

</td>
<td>

**[Canonical Schema](03%20Canonical%20Schema.md)**  
Struktur dan field schema

</td>
</tr>
<tr>
<td>

**[AI Roles](04%20AI%20Roles.md)**  
Sistem reasoning role-based

</td>
<td>

**[Architecture](09%20Architecture.md)**  
Overview arsitektur sistem

</td>
</tr>
</table>

</details>

</div>

