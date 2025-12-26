# ❓ Structra — Pertanyaan yang Sering Diajukan

Pertanyaan umum dan jawaban tentang Structra, fitur, penggunaan, dan integrasinya.

---

## 🎯 Pertanyaan Umum

### Apa itu Structra?

Structra adalah AI-powered UI structure engine yang menganalisis input desain visual dan tekstual serta mengubahnya menjadi arsitektur frontend yang bersih, scalable, dan maintainable. Structra **bukan designer** dan **bukan code generator**—ini adalah **UI Structure Engineering Engine** yang memperlakukan setiap input desain sebagai masalah engineering.

### Bagaimana Structra berbeda dari AI code generator lainnya?

Structra fokus pada:
- **Struktur dan maintainability** dibanding akurasi pixel-perfect
- **Keputusan yang dapat dijelaskan** dengan dokumentasi reasoning
- **Kualitas engineering-grade** dengan canonical schema sebagai single source of truth
- **Role-based reasoning** untuk output yang konsisten dan berkualitas tinggi

### Jenis desain apa yang bisa dianalisis Structra?

Structra dapat menganalisis:
- Screenshot UI dan export desain (PNG/JPG)
- Desain Figma dan Sketch
- Layout kompleks dengan blob, wave, gradient, dan struktur asimetris
- Deskripsi tekstual layout
- Sketsa konseptual dan referensi

---

## 📋 Canonical Schema

### Apa itu Canonical Schema?

Canonical Schema adalah **single source of truth** untuk seluruh proses AI di Structra. Ini adalah representasi JSON terstruktur dari analisis desain yang mencakup:
- Sections dan components
- Layout strategies
- Background dan shape approaches
- Responsive rules
- Assumptions dan ambiguities

Lihat [03 Canonical Schema](03%20Canonical%20Schema.md) untuk detail.

### Bisakah saya mengedit Canonical Schema?

Ya! Anda dapat mengedit schema sebelum code generation. Ini memungkinkan Anda untuk:
- Menyesuaikan assumptions
- Memodifikasi responsive rules
- Mengubah layout strategies
- Memperbaiki ambiguities

### Mengapa schema diperlukan sebelum code generation?

Schema memastikan:
- **Transparansi** — Semua keputusan didokumentasikan
- **Konsistensi** — Code generation deterministik
- **Kontrol** — User dapat review dan modifikasi sebelum implementasi
- **Kualitas** — Pendekatan terstruktur mengurangi error

---

## 🤖 Sistem AI

### Apa itu AI Roles?

Structra menggunakan internal role-based reasoning dengan tiga role:
- **Analyzer** — Observasi dan identifikasi elemen desain
- **Layout Engineer** — Membuat keputusan struktural dan membuat schema
- **Code Generator** — Implementasi kode dari schema

Role ini tidak terlihat oleh user tetapi memastikan kualitas dan konsistensi. Lihat [04 AI Roles](04%20AI%20Roles.md).

### Bagaimana quality assessment bekerja?

Setiap output non-trivial menyertakan quality assessment yang mencakup:
- Visual Confidence (High/Medium/Low)
- Structural Confidence (High/Medium/Low)
- Responsive Risk (Low/Medium/High)
- Maintainability Risk (Low/Medium/High)
- Manual Adjustment Needed (None/Minor/Moderate/Significant)

Lihat [05 Quality Assessment](05%20Quality%20Assessment.md) untuk detail.

### Apa yang terjadi ketika ada ambiguitas dalam desain?

Structra mendokumentasikan semua ambiguitas dan assumptions dalam canonical schema. AI:
- Mendeteksi area yang tidak jelas
- Mendokumentasikan alternatif yang dipertimbangkan
- Menjelaskan solusi yang dipilih
- Memungkinkan user review dan modifikasi

Lihat [06 Ambiguity Handling](06%20Ambiguity%20Handling.md) untuk detail.

---

## 🔌 Penggunaan API

### Bagaimana cara mendapatkan API key?

1. Daftar di Structra dashboard
2. Navigasi ke Settings → API Keys
3. Generate API key baru
4. Simpan dengan aman (hanya ditampilkan sekali)

Lihat [10 API Documentation](10%20API%20Documentation.md) untuk detail.

### Apa saja rate limits?

- **Free Tier**: 100 requests/hour
- **Pro Tier**: 1000 requests/hour
- **Enterprise**: Custom limits

Informasi rate limit disertakan dalam response headers.

### Format gambar apa yang didukung?

Structra mendukung:
- PNG
- JPG/JPEG
- Ukuran file maksimum: 10MB

### Bagaimana cara menangani error?

Cek error code dalam response:
- `INVALID_IMAGE` — Format gambar tidak didukung
- `IMAGE_TOO_LARGE` — File melebihi batas ukuran
- `INVALID_SCHEMA` — Validasi schema gagal
- `AI_SERVICE_ERROR` — Error layanan AI model
- `QUOTA_EXCEEDED` — Quota bulanan terlampaui

Lihat [10 API Documentation](10%20API%20Documentation.md) untuk kode error lengkap.

---

## 💻 Code Generation

### Framework apa yang didukung?

Saat ini didukung:
- **Tailwind CSS** (target utama)
- **React** components
- **Next.js** components
- **HTML + CSS** (semantic)

### Bisakah saya menyesuaikan kode yang dihasilkan?

Ya! Anda dapat:
- Mengedit canonical schema sebelum code generation
- Memodifikasi kode yang dihasilkan setelah generation
- Menggunakan design system tokens untuk konsistensi
- Menyesuaikan prompt templates (advanced)

### Apakah kode yang dihasilkan production-ready?

Kode terstruktur dan maintainable, tetapi Anda mungkin perlu:
- Menyesuaikan spacing dan warna untuk match pixel-perfect
- Fine-tune responsive breakpoints
- Integrasi dengan design system Anda
- Menambahkan animasi atau interaksi

Quality assessment membantu Anda memahami penyesuaian apa yang diperlukan.

---

## 🎨 Integrasi Design System

### Bisakah saya menggunakan design system sendiri?

Ya! Structra mendukung integrasi design system:
- Color tokens
- Spacing scales
- Typography systems
- Component libraries

Berikan design system Anda dalam opsi request API.

### Bagaimana Structra menangani design system constraints?

Ketika design system disediakan:
- AI mengikuti design tokens dengan ketat
- Menggunakan komponen yang ada jika tersedia
- Mempertahankan konsistensi dibanding kebebasan visual
- Mendokumentasikan setiap penyimpangan

Lihat [07 Engineering Constraints](07%20Engineering%20Constraints.md).

---

## 🚀 Memulai

### Apa yang saya butuhkan untuk memulai?

**Untuk penggunaan API:**
- API key dari Structra dashboard
- Gambar atau desain untuk dianalisis

**Untuk development lokal:**
- Node.js 20.9+ (diperlukan untuk Next.js 16)
- Bun 1.0+ (untuk backend)
- Docker dan Docker Compose
- PostgreSQL 15+ (atau gunakan Docker)
- Prisma 6+ (ORM untuk manajemen database)

Lihat [11 Getting Started](11%20Getting%20Started.md) untuk panduan setup lengkap.

### Berapa lama waktu analisis?

Waktu analisis tergantung pada:
- Kompleksitas gambar
- Kompleksitas desain
- Beban sistem saat ini

Biasanya:
- Desain sederhana: 5-15 detik
- Desain kompleks: 15-30 detik
- Desain sangat kompleks: 30-60 detik

---

## 🔧 Pertanyaan Teknis

### Model AI apa yang digunakan Structra?

Structra menggunakan:
- **Gemini API** (Cloud LLM) untuk analisis visual
- **Ollama** (Local LLM) untuk reasoning dan code generation

Lihat [08 Tech Stack](08%20Tech%20Stack.md) untuk detail.

### Bisakah saya menggunakan Structra offline?

Setup development lokal memungkinkan penggunaan offline dengan:
- Instance Ollama lokal
- Database dan layanan lokal
- Setup Docker Compose

Cloud API memerlukan koneksi internet.

### Bagaimana Structra menangani file besar?

- Gambar diproses dan dioptimalkan
- File besar mungkin memerlukan waktu lebih lama untuk diproses
- Ukuran file maksimum: 10MB
- Pertimbangkan untuk mengoptimalkan gambar sebelum upload

---

## 💰 Harga & Limit

### Apakah ada tier gratis?

Ya! Free tier mencakup:
- 100 requests/hour
- Fitur dasar
- Dukungan komunitas

### Apa yang termasuk dalam tier berbayar?

**Pro Tier:**
- 1000 requests/hour
- Dukungan prioritas
- Fitur lanjutan
- Integrasi design system

**Enterprise:**
- Custom limits
- Dukungan khusus
- Integrasi khusus
- Jaminan SLA

### Bagaimana penggunaan dihitung?

Penggunaan dihitung per API request:
- Setiap panggilan `/analyze` = 1 request
- Setiap panggilan `/generate-code` = 1 request
- Validasi schema tidak dihitung ke limit

---

## 🔗 Integrasi

### Bisakah saya integrasi dengan CI/CD?

Ya! Structra dapat diintegrasikan ke pipeline CI/CD:
- Gunakan API untuk analisis otomatis
- Webhooks untuk pemrosesan async
- SDK untuk integrasi mudah

Lihat [INTEGRATION.md](INTEGRATION.md) untuk contoh.

### Apakah Structra mendukung webhooks?

Ya! Structra dapat mengirim webhook events:
- `analysis.completed` — Analisis selesai
- `analysis.failed` — Analisis gagal
- `code.generated` — Code generation selesai

Lihat [10 API Documentation](10%20API%20Documentation.md) untuk setup webhook.

### Apakah ada SDK yang tersedia?

SDK resmi:
- **JavaScript/TypeScript**: `@structra/sdk`
- **Python**: `structra-python`
- **Go**: Segera hadir

Lihat [10 API Documentation](10%20API%20Documentation.md) untuk penggunaan SDK.

---

## 🎨 CSS Generation

### Apakah Structra bisa generate CSS-only shapes?

Ya! Structra bisa generate CSS-only shapes menggunakan mask, clip-path, dan pseudo-elements. Sistem secara otomatis mendeteksi kapan CSS-only tepat vs SVG dan menghasilkan CSS yang dioptimalkan.

**CSS-only shapes yang didukung:**
- Flower, triangle, starburst, polygon, ribbon
- Blob, wave, curve, subtract
- Custom corners dan borders
- Section dividers
- Tooltips dan speech bubbles
- Loaders dan spinners

Lihat [CSS-only Solutions](17%20CSS-only%20Solutions.md) untuk detail lebih lanjut.

### Apakah Structra mendukung CSS animations?

Ya! Structra bisa generate CSS animations dan transitions termasuk:
- @keyframes animations
- CSS transitions
- Transform animations
- Hover effects
- Loading animations

Semua animasi dioptimalkan performa menggunakan properti GPU-accelerated (transform, opacity) dan menghormati `prefers-reduced-motion` untuk aksesibilitas.

Lihat [CSS Animations & Transitions](16%20CSS%20Animations%20%26%20Transitions.md) untuk detail lebih lanjut.

### Fitur CSS lanjutan apa yang didukung?

Structra mendukung berbagai fitur CSS lanjutan:

**Teknik Lanjutan:**
- CSS Mask (mask, mask-image, mask-composite)
- Aspect Ratio (properti aspect-ratio)
- Calc (fungsi calc())
- Clip Path (clip-path, polygon, circle, ellipse)
- CSS Custom Properties (--variables)

**Fitur Modern:**
- Container Queries (@container)
- Modern Selectors (:has(), :is(), :where())
- CSS Layers (@layer)
- CSS Nesting
- Backdrop Filter (backdrop-filter)
- CSS Filters (filter: blur(), drop-shadow(), dll)

Lihat [Advanced CSS Techniques](14%20Advanced%20CSS%20Techniques.md) dan [Modern CSS Features](18%20Modern%20CSS%20Features.md) untuk dokumentasi lengkap.

### Bisakah saya generate standalone CSS files?

Ya! Structra bisa generate standalone CSS files. Sistem mendukung:
- Pure CSS output (tanpa dependency framework)
- CSS file generation
- CSS module generation
- SCSS/SASS support (direncanakan)
- PostCSS plugins integration (direncanakan)

CSS yang dihasilkan dioptimalkan, diminifikasi, dan termasuk pertimbangan kompatibilitas browser.

### Bagaimana Structra memutuskan antara CSS-only dan SVG?

Structra menggunakan decision matrix berdasarkan:
- Kompleksitas shape (shape sederhana → CSS-only, kompleks → SVG)
- Requirement performa (CSS-only lebih cepat)
- Kebutuhan kompatibilitas browser
- Requirement animasi (path animations → SVG)

Sistem memprioritaskan solusi CSS-only ketika tepat tetapi fallback ke SVG untuk shape kompleks yang tidak bisa dicapai dengan CSS.

Lihat [CSS-only Solutions](17%20CSS-only%20Solutions.md) untuk panduan keputusan lengkap.

## 🐛 Troubleshooting

### Analisis gagal dengan "INVALID_IMAGE"

**Kemungkinan penyebab:**
- Format gambar tidak didukung (gunakan PNG atau JPG)
- File gambar rusak
- File terlalu besar (>10MB)

**Solusi:**
- Konversi gambar ke PNG atau JPG
- Periksa integritas file
- Kompres gambar jika terlalu besar

### Kode tidak sesuai dengan desain persis

**Ini normal!** Structra fokus pada struktur, bukan akurasi pixel-perfect. Gunakan quality assessment untuk memahami:
- Penyesuaian apa yang diperlukan
- Tingkat confidence
- Area risiko

Kemudian lakukan penyesuaian manual sesuai kebutuhan.

### API mengembalikan 429 (Rate Limit)

**Solusi:**
- Periksa rate limit headers
- Implementasikan request queuing
- Upgrade ke tier lebih tinggi
- Tunggu reset rate limit

### Ollama tidak merespons (setup lokal)

**Solusi:**
- Periksa apakah Ollama berjalan: `curl http://localhost:11434/api/tags`
- Start Ollama: `ollama serve`
- Pull model yang diperlukan: `ollama pull mistral`

Lihat [TROUBLESHOOTING.md](TROUBLESHOOTING.md) untuk solusi lebih lanjut.

---

## 📚 Sumber Belajar

### Di mana saya bisa belajar lebih lanjut?

- **[Getting Started](11%20Getting%20Started.md)** — Setup dan langkah pertama
- **[Examples](12%20Examples.md)** — Contoh penggunaan real-world
- **[API Documentation](10%20API%20Documentation.md)** — Referensi API lengkap
- **[Architecture](09%20Architecture.md)** — Arsitektur sistem
- **[Glossary](GLOSSARY.md)** — Istilah teknis dan definisi

### Bagaimana saya bisa berkontribusi?

Lihat [CONTRIBUTING.md](CONTRIBUTING.md) untuk:
- Panduan kontribusi
- Setup development
- Panduan style code
- Proses pull request

---

## 🤝 Dukungan

### Di mana saya bisa mendapatkan bantuan?

- **Dokumentasi**: Periksa dokumen terkait terlebih dahulu
- **FAQ**: Dokumen ini
- **Troubleshooting**: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Komunitas**: Discord atau GitHub Discussions
- **Email**: support@structra.com (untuk Pro/Enterprise)

### Bagaimana cara melaporkan bug?

1. Periksa apakah issue sudah dilaporkan
2. Buat laporan bug detail:
   - Langkah untuk mereproduksi
   - Perilaku yang diharapkan vs aktual
   - Pesan error
   - Informasi sistem
3. Kirim via GitHub Issues

### Bagaimana cara meminta fitur?

Permintaan fitur dapat dikirim melalui:
- GitHub Issues (dengan label "feature request")
- Diskusi komunitas
- Email langsung (untuk pelanggan Enterprise)

Lihat [ROADMAP.md](ROADMAP.md) untuk fitur yang direncanakan.

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Kembali ke Index](README.md)**  
*Dokumentasi Overview*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Dokumentasi Overview*

</td>
<td align="right">

**[Next: CHANGELOG →](CHANGELOG.md)**  
*Version History*

</td>
</tr>
</table>

---

<details>
<summary><b>📚 Dokumentasi Terkait</b></summary>

<table>
<tr>
<td>

**[Getting Started](11%20Getting%20Started.md)**  
Setup dan langkah pertama

</td>
<td>

**[API Documentation](10%20API%20Documentation.md)**  
Referensi API lengkap

</td>
</tr>
<tr>
<td>

**[Troubleshooting](TROUBLESHOOTING.md)**  
Masalah umum dan solusi

</td>
<td>

**[Examples](12%20Examples.md)**  
Contoh penggunaan real-world

</td>
</tr>
</table>

</details>

</div>

