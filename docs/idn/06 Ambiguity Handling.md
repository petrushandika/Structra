# ⚠️ Structra — Ambiguity & Failure Handling

Dokumen ini mendefinisikan bagaimana AI di Structra menangani ambiguitas, ketidakpastian, dan kegagalan dalam analisis desain.

---

## 🔍 Ambiguity Detection

AI **WAJIB** mendeteksi dan mencatat jika:

* Shape visual tidak jelas
* Overlapping tidak terdefinisi
* Informasi desain tidak lengkap
* Responsiveness tidak dapat disimpulkan
* Konflik antara input visual dan tekstual

---

## 📝 Assumption Declaration

Setiap asumsi yang dibuat oleh AI **HARUS** dicatat dalam canonical schema:

```json
"assumptions": [
  "Background shape assumed decorative, not interactive",
  "Mobile breakpoint assumed at 768px based on common practice",
  "Color contrast assumed sufficient for accessibility"
]
```

### Rules

* Asumsi harus **eksplisit dan dapat dipertanggungjawabkan**
* Asumsi **BOLEH** diubah oleh user sebelum code generation
* Asumsi yang tidak tercatat dianggap sebagai **kegagalan sistem**

---

## ⚠️ Ambiguity Declaration

Ketika AI menemukan ambiguitas, harus dicatat dengan format berikut:

```json
"ambiguities": [
  {
    "area": "hero-background",
    "issue": "Exact shape contour unclear",
    "alternatives": ["svg-blob", "css-gradient"],
    "chosen": "svg-blob",
    "reason": "SVG provides better control for organic shapes"
  }
]
```

### Format Fields

* `area`: Area desain yang memiliki ambiguitas
* `issue`: Deskripsi masalah atau ketidakpastian
* `alternatives`: Daftar alternatif solusi yang dipertimbangkan
* `chosen`: Solusi yang dipilih
* `reason`: Alasan pemilihan solusi

---

## 📋 Behavior Rules

### AI TIDAK BOLEH:
* **Diam jika ragu** — Harus menyatakan ketidakpastian
* **Mengabaikan ambiguitas** — Semua ambiguitas harus dicatat
* **Membuat asumsi tanpa dokumentasi** — Semua asumsi harus eksplisit

### AI HARUS:
* **Menyatakan ketidakpastian** — Jujur tentang batasan analisis
* **Mencatat semua asumsi** — Transparansi penuh
* **Memberikan alternatif** — Jika memungkinkan, berikan beberapa opsi

### AI BOLEH:
* **Meminta klarifikasi** — Jika ambiguitas kritis dan mempengaruhi output
* **Menggunakan heuristik** — Berdasarkan best practices industri
* **Membuat keputusan dengan dokumentasi** — Selama didokumentasikan dengan baik

---

## 🚨 Failure Handling

### Kapan Output Dianggap Gagal?

* Schema tidak lengkap atau tidak valid
* Asumsi kritis tidak tercatat
* Ambiguity kritis tidak ditangani
* Kode tidak sesuai dengan schema

### Response Strategy

1. **Deteksi dini** — Identifikasi masalah sebelum code generation
2. **Dokumentasi** — Catat semua masalah dalam schema
3. **Fallback** — Gunakan solusi konservatif jika diperlukan
4. **Transparansi** — Komunikasikan masalah kepada user

---

## 💡 Best Practices

* **When in doubt, document** — Lebih baik mencatat terlalu banyak daripada terlalu sedikit
* **Conservative choices** — Pilih solusi yang lebih mudah diubah jika ragu
* **User empowerment** — Berikan user kontrol untuk mengubah asumsi dan keputusan
* **Iterative refinement** — Schema dapat diperbaiki melalui iterasi

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Quality Assessment](05%20Quality%20Assessment.md)**  
*Quality & Confidence Assessment*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: Engineering Constraints →](07%20Engineering%20Constraints.md)**  
*Engineering Constraints & Design System*

</td>
</tr>
</table>

---

</div>

