# 📋 Structra — Canonical Output Schema

Canonical Output Schema adalah **single source of truth** untuk seluruh proses AI di Structra.

Semua proses AI **WAJIB** menghasilkan schema ini sebelum:
- Penjelasan
- Code generation
- Evaluasi kualitas

Tanpa schema ini, output dianggap **tidak valid**.

---

## 📐 Schema Structure (v1)

```json
{
  "meta": {
    "schemaVersion": "1.0",
    "inputType": ["image", "text"],
    "frameworkTarget": ["tailwind", "react"],
    "confidenceLevel": "high | medium | low"
  },

  "sections": [
    {
      "id": "hero",
      "role": "primary",
      "layout": "grid | flex | hybrid",
      "asymmetric": true,
      "description": "Hero section with left-aligned content and right background shape"
    }
  ],

  "components": [
    {
      "name": "HeroContent",
      "type": "container | presentational",
      "responsibility": "Text content and CTA",
      "reusable": true,
      "parentSection": "hero"
    }
  ],

  "layoutStrategy": {
    "mainApproach": "grid",
    "reason": "Asymmetric layout with clear column separation"
  },

  "backgroundStrategy": {
    "type": "svg | css-gradient | pseudo-element | css-mask | clip-path | css-only | css-pattern | css-filter",
    "shape": "blob | wave | curve | flower | triangle | starburst | polygon | ribbon | subtract | custom | none",
    "position": "right | left | full | top | bottom",
    "technique": {
      "usesMask": false,
      "usesAspectRatio": null,
      "usesCalc": false,
      "usesClipPath": false,
      "usesCustomProperties": false
    },
    "reason": "Complex organic shape better handled by SVG"
  },

  "layering": {
    "zIndexStrategy": "minimal",
    "positioning": "relative-with-absolute-children",
    "reason": "Maintain predictable stacking context"
  },

  "responsiveRules": [
    {
      "breakpoint": "mobile",
      "action": "restructure",
      "description": "Background blob simplified and moved behind content"
    }
  ],

  "assumptions": [],
  "ambiguities": [],
  
  "cssAnimations": [
    {
      "name": "fadeIn",
      "type": "keyframe | transition",
      "duration": "300ms",
      "timingFunction": "ease-in-out",
      "target": "component | section | element",
      "properties": ["opacity", "transform"]
    }
  ],
  
  "cssEffects": {
    "filters": {
      "blur": null,
      "brightness": null,
      "contrast": null,
      "dropShadow": null,
      "grayscale": null,
      "hueRotate": null,
      "invert": null,
      "saturate": null,
      "sepia": null
    },
    "backdropFilter": {
      "blur": null,
      "brightness": null,
      "saturate": null
    },
    "transforms": {
      "translate": null,
      "rotate": null,
      "scale": null,
      "skew": null
    }
  },
  
  "cssVariables": {
    "colors": {
      "--primary-color": "#000000",
      "--secondary-color": "#ffffff"
    },
    "spacing": {
      "--spacing-base": "4px"
    },
    "typography": {
      "--font-family-sans": "Inter, sans-serif"
    }
  },
  
  "modernCSS": {
    "containerQueries": {
      "enabled": false,
      "containerType": "inline-size | normal | size",
      "containerName": null
    },
    "hasSelector": {
      "enabled": false,
      "useCases": []
    },
    "cssLayers": {
      "enabled": false,
      "layers": []
    },
    "cssNesting": {
      "enabled": false
    }
  },
  
  "sourceCode": {
    "original": null,
    "framework": null,
    "language": null
  },
  
  "frameworkDetected": null,
  
  "codeQuality": {
    "score": null,
    "issues": [],
    "suggestions": []
  },
  
  "collectionMetadata": {
    "tags": [],
    "category": null,
    "usageCount": 0,
    "createdAt": null,
    "updatedAt": null
  },
  
  "revisionHistory": []
}
```

---

## ⚙️ Rules

* Schema **HARUS dihasilkan lengkap** sebelum code generation
* Code output **HARUS berasal dari schema**
* Schema **BOLEH diedit manual oleh user** sebelum regenerate code

---

## 📖 Schema Fields Explanation

### `meta`
Metadata tentang schema dan input:
- `schemaVersion`: Versi schema yang digunakan
- `inputType`: Jenis input yang diterima (image, text, atau keduanya)
- `frameworkTarget`: Framework target untuk output (tailwind, react, dll)
- `confidenceLevel`: Tingkat kepercayaan AI terhadap analisis

### `sections`
Daftar section utama dalam desain:
- `id`: Identifier unik untuk section
- `role`: Peran section (primary, secondary, etc.)
- `layout`: Pendekatan layout yang digunakan
- `asymmetric`: Apakah layout asimetris
- `description`: Deskripsi section

### `components`
Daftar komponen yang teridentifikasi:
- `name`: Nama komponen
- `type`: Tipe komponen (container atau presentational)
- `responsibility`: Tanggung jawab komponen
- `reusable`: Apakah komponen dapat digunakan ulang
- `parentSection`: Section yang menjadi parent komponen

### `layoutStrategy`
Strategi layout yang dipilih:
- `mainApproach`: Pendekatan utama (grid, flex, hybrid)
- `reason`: Alasan pemilihan pendekatan

### `backgroundStrategy`
Strategi untuk background dan shape abstrak:
- `type`: Teknologi yang digunakan (svg, css-gradient, pseudo-element, css-mask, clip-path, css-only, css-pattern, css-filter)
- `shape`: Jenis shape (blob, wave, curve, flower, triangle, starburst, polygon, ribbon, subtract, custom, none)
- `position`: Posisi shape (right, left, full, top, bottom)
- `technique`: Teknik CSS lanjutan yang digunakan:
  - `usesMask`: Apakah CSS mask digunakan
  - `usesAspectRatio`: Nilai aspect ratio (contoh: "1 / 1", "16 / 9") atau null
  - `usesCalc`: Apakah fungsi calc() digunakan
  - `usesClipPath`: Apakah clip-path digunakan
  - `usesCustomProperties`: Apakah CSS custom properties digunakan
- `reason`: Alasan pemilihan strategi

### `layering`
Strategi untuk layering dan z-index:
- `zIndexStrategy`: Strategi z-index (minimal, moderate, complex)
- `positioning`: Strategi positioning yang digunakan
- `reason`: Alasan pemilihan strategi

### `responsiveRules`
Aturan responsif untuk berbagai breakpoint:
- `breakpoint`: Breakpoint target (mobile, tablet, desktop)
- `action`: Aksi yang dilakukan (restructure, simplify, hide)
- `description`: Deskripsi perubahan

### `assumptions`
Daftar asumsi yang dibuat oleh AI

### `ambiguities`
Daftar area yang memiliki ambiguitas dan bagaimana AI menanganinya

### `cssAnimations`
Array dari CSS animations dan transitions:
- `name`: Nama animasi (untuk keyframes) atau target transition
- `type`: "keyframe" untuk @keyframes animations atau "transition" untuk CSS transitions
- `duration`: Durasi animasi/transition (contoh: "300ms", "1s")
- `timingFunction`: Timing function (contoh: "ease-in-out", "cubic-bezier(...)")
- `target`: Elemen apa yang dianimasikan (component, section, element)
- `properties`: Array dari properti CSS yang dianimasikan (contoh: ["opacity", "transform"])

### `cssEffects`
CSS effects dan filter yang diterapkan:
- `filters`: Object dengan properti filter (blur, brightness, contrast, dropShadow, dll)
- `backdropFilter`: Object dengan properti backdrop-filter
- `transforms`: Object dengan properti transform (translate, rotate, scale, skew)

### `cssVariables`
CSS custom properties (CSS variables) yang digunakan:
- `colors`: Variabel warna (contoh: "--primary-color": "#000000")
- `spacing`: Variabel spacing (contoh: "--spacing-base": "4px")
- `typography`: Variabel typography (contoh: "--font-family-sans": "Inter, sans-serif")

### `modernCSS`
Fitur CSS modern yang digunakan:
- `containerQueries`: Konfigurasi container query:
  - `enabled`: Apakah container queries digunakan
  - `containerType`: Tipe container (inline-size, normal, size)
  - `containerName`: Nama container opsional
- `hasSelector`: Penggunaan selector :has():
  - `enabled`: Apakah selector :has() digunakan
  - `useCases`: Array dari deskripsi use case
- `cssLayers`: Penggunaan CSS @layer:
  - `enabled`: Apakah CSS layers digunakan
  - `layers`: Array dari nama layer
- `cssNesting`: Apakah CSS nesting digunakan

### `sourceCode` (Baru)
Kode asli jika input berbasis kode:
- `original`: String kode asli (jika dari code input)
- `framework`: Framework dari kode asli (tailwind, bootstrap, css-manual, scss, dll)
- `language`: Bahasa dari kode asli (css, scss, html, dll)

### `frameworkDetected` (Baru)
Framework yang terdeteksi otomatis dari code input:
- `null` jika input bukan berbasis kode
- Nilai string: "tailwind", "bootstrap", "css-manual", "scss", "css-modules", "postcss", dll

### `codeQuality` (Baru)
Analisis kualitas kode input (hanya ada untuk code input):
- `score`: Skor kualitas (0-100) atau null
- `issues`: Array dari masalah kualitas kode yang ditemukan:
  - `type`: Tipe masalah (magic-number, nested-absolute, deep-dom, inline-style, non-semantic, dll)
  - `severity`: "high", "medium", "low"
  - `description`: Deskripsi masalah
  - `location`: Lokasi masalah (nomor baris, selector, dll)
- `suggestions`: Array dari saran refactoring

### `collectionMetadata` (Baru)
Metadata untuk manajemen koleksi:
- `tags`: Array dari tag untuk pencarian dan kategorisasi
- `category`: Nama kategori (contoh: "hero-sections", "buttons", "shapes", dll)
- `usageCount`: Jumlah kali CSS ini digunakan/dicopy
- `createdAt`: Timestamp ISO saat ditambahkan ke koleksi
- `updatedAt`: Timestamp ISO saat terakhir diperbarui

### `revisionHistory` (Baru)
Array dari objek revisi yang melacak perubahan:
- Setiap objek revisi berisi:
  - `id`: ID revisi unik
  - `timestamp`: Timestamp ISO dari revisi
  - `action`: Tipe aksi ("created", "edited", "converted", "refactored")
  - `changes`: Deskripsi perubahan yang dibuat
  - `schemaVersion`: Versi schema pada saat revisi

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: MVP](02%20MVP.md)**  
*Core System Prompt*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: AI Roles →](04%20AI%20Roles.md)**  
*Internal AI Roles*

</td>
</tr>
</table>

---

</div>

