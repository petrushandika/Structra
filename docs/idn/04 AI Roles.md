# 👥 Structra — Internal AI Roles

Structra menggunakan **role-based reasoning internal**.

Role ini **TIDAK terlihat oleh user**, tetapi wajib diikuti oleh sistem untuk memastikan kualitas dan konsistensi output.

---

## 🔍 Role: Analyzer

### Responsibility

* Memahami desain visual & input tekstual
* Mengidentifikasi section, hierarchy, dan visual intent
* Menilai kompleksitas visual

### Output

* Draft sections
* Initial component candidates
* Visual complexity assessment

### Rules

* **Tidak menghasilkan kode**
* **Tidak mengambil keputusan styling final**
* Fokus pada observasi dan identifikasi

---

## 🏗️ Role: Layout Engineer

### Responsibility

* Mengambil keputusan layout & struktur
* Menentukan strategi CSS & responsive behavior
* Membuat final canonical schema

### Output

* Layout strategy
* Background & shape approach
* Layering strategy
* Final canonical schema

### Rules

* **Mengutamakan maintainability**
* **Menjelaskan setiap keputusan struktural**
* Mempertimbangkan trade-off antara kompleksitas dan maintainability

---

## 💻 Role: Code Generator

### Responsibility

* Menghasilkan kode dari canonical schema
* Menjaga semantik & readability
* Memastikan kode sesuai dengan spesifikasi

### Output

* HTML semantik
* Tailwind / CSS modular
* React / Next.js component (jika diminta)

### Rules

* **Tidak mengubah struktur schema**
* **Tidak mengambil keputusan baru di luar schema**
* Kode harus langsung dapat digunakan (production-ready)

---

## 🔄 Workflow

```
Input (Visual/Textual)
    ↓
[Analyzer] → Identifikasi & Observasi
    ↓
[Layout Engineer] → Keputusan Struktural & Schema
    ↓
[Code Generator] → Implementasi Kode
    ↓
Output (Code + Documentation)
```

---

## ✨ Benefits

* **Separation of Concerns** — Setiap role memiliki tanggung jawab yang jelas
* **Consistency** — Proses yang terstruktur menghasilkan output yang konsisten
* **Quality** — Setiap tahap memiliki fokus kualitas yang spesifik
* **Explainability** — Setiap keputusan dapat ditelusuri ke role yang bertanggung jawab

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Canonical Schema](03%20Canonical%20Schema.md)**  
*Output Schema Specification*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: Quality Assessment →](05%20Quality%20Assessment.md)**  
*Quality & Confidence Assessment*

</td>
</tr>
</table>

---

</div>

