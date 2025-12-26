# 💻 Structra — Code Input & Reverse Engineering

Dokumen ini menjelaskan bagaimana Structra menangani code input, reverse engineering, dan code refactoring di berbagai CSS framework.

---

## 🎯 Overview

Structra dapat menganalisis kode CSS/HTML yang sudah ada dari berbagai framework dan melakukan reverse engineering ke Canonical Schema. Ini memungkinkan:

- **Code Analysis** — Memahami struktur kode yang sudah ada
- **Framework Detection** — Mengidentifikasi framework secara otomatis
- **Reverse Engineering** — Mengkonversi kode ke Canonical Schema
- **Code Refactoring** — Meningkatkan kualitas dan maintainability kode
- **Framework Conversion** — Mengkonversi antar framework yang berbeda

---

## 📥 Format Input yang Didukung

### 1. Tailwind CSS

Structra dapat menganalisis utility classes Tailwind dan mengkonversinya ke CSS terstruktur.

**Contoh Input:**
```html
<div class="flex items-center justify-between p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
  <h1 class="text-3xl font-bold text-white">Hero Title</h1>
  <button class="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
    Get Started
  </button>
</div>
```

**Analisis:**
- Mendeteksi utility classes Tailwind
- Mengekstrak layout (flex, items-center, justify-between)
- Mengidentifikasi spacing (p-6, px-4, py-2)
- Mengenali warna dan gradient
- Mendeteksi responsive classes
- Mengidentifikasi hover states dan transitions

### 2. Bootstrap

Structra mendukung Bootstrap 3, 4, dan 5.

**Contoh Input:**
```html
<div class="container">
  <div class="row">
    <div class="col-md-6">
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title">Card Title</h5>
          <p class="card-text">Card content</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Analisis:**
- Mendeteksi grid system Bootstrap (container, row, col-*)
- Mengidentifikasi komponen Bootstrap (card, card-body, dll)
- Mengekstrak spacing dan sizing classes
- Mengenali Bootstrap utilities (shadow-sm, dll)

### 3. CSS Manual (Vanilla CSS)

Structra dapat menganalisis file CSS murni dan mengekstrak strukturnya.

**Contoh Input:**
```css
.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.hero-title {
  font-size: 2rem;
  font-weight: bold;
  color: white;
}
```

**Analisis:**
- Parse CSS selectors dan properties
- Mengekstrak pola layout (flex, grid, dll)
- Mengidentifikasi warna, spacing, dan typography
- Mendeteksi fitur CSS lanjutan (gradients, shadows, dll)
- Mengenali custom properties (CSS variables)

### 4. SCSS/SASS

Structra dapat memparse sintaks SCSS termasuk nesting, variables, dan mixins.

**Contoh Input:**
```scss
$primary-color: #667eea;
$spacing-base: 1rem;

.hero-section {
  display: flex;
  padding: $spacing-base * 2;
  background: linear-gradient(135deg, $primary-color 0%, darken($primary-color, 20%) 100%);
  
  &__title {
    font-size: 2rem;
    color: white;
  }
  
  &:hover {
    transform: scale(1.05);
  }
}
```

**Analisis:**
- Mendeteksi SCSS variables ($variables)
- Parse nested selectors
- Mengidentifikasi mixins dan functions
- Mengekstrak color functions (darken, lighten, dll)
- Mengkonversi SCSS ke struktur CSS standar

### 5. CSS Modules

Structra dapat menganalisis CSS Modules dengan scoped class names.

**Contoh Input:**
```css
/* Hero.module.css */
.heroSection {
  display: flex;
  padding: 2rem;
}

.heroTitle {
  font-size: 2rem;
  color: white;
}
```

**Analisis:**
- Mengenali pola CSS Modules
- Mengekstrak scoped class names
- Mengidentifikasi struktur komponen
- Mempertahankan batas modul

### 6. PostCSS

Structra dapat menganalisis CSS yang diproses PostCSS dengan plugins.

**Contoh Input:**
```css
.hero {
  display: flex;
  padding: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
}
```

**Analisis:**
- Mendeteksi fitur PostCSS
- Parse nested media queries
- Mengidentifikasi plugin PostCSS yang digunakan
- Mengekstrak struktur CSS yang diproses

---

## 🔍 Framework Detection

Structra secara otomatis mendeteksi framework dari code input menggunakan beberapa heuristik:

### Metode Deteksi

1. **Class Name Patterns**
   - Tailwind: Utility classes (flex, p-6, bg-blue-500)
   - Bootstrap: Component classes (card, btn, container)
   - CSS Modules: Scoped class names (ComponentName_className)

2. **File Structure**
   - SCSS: File extension (.scss, .sass)
   - CSS Modules: Naming convention (Component.module.css)
   - PostCSS: Configuration indicators

3. **Code Patterns**
   - Tailwind: Utility-first approach
   - Bootstrap: Grid system usage
   - SCSS: Variables dan nesting
   - CSS Modules: Import statements

4. **Metadata Analysis**
   - Package.json dependencies
   - Build configuration files
   - Import statements

### Detection Confidence

Framework detection memberikan tingkat kepercayaan:

- **High** — Indikator framework jelas (class patterns, file structure)
- **Medium** — Beberapa indikator hadir tapi ambigu
- **Low** — CSS generik, framework tidak jelas

---

## 🔄 Reverse Engineering Process

### Step 1: Code Parsing

Structra memparse kode input untuk mengekstrak:

- **HTML Structure** — Elemen, nesting, semantic tags
- **CSS Rules** — Selectors, properties, values
- **Layout Patterns** — Grid, flex, positioning
- **Styling Strategies** — Colors, spacing, typography
- **Responsive Rules** — Media queries, breakpoints
- **Advanced Features** — Animations, transforms, filters

### Step 2: Structure Extraction

Parser mengekstrak:

- **Sections** — Area konten utama
- **Components** — Elemen UI yang dapat digunakan ulang
- **Layout Strategy** — Grid, flex, atau hybrid approach
- **Background Strategy** — Shapes, gradients, images
- **Responsive Strategy** — Breakpoint behavior

### Step 3: Schema Generation

Struktur yang diekstrak dikonversi ke Canonical Schema:

```json
{
  "meta": {
    "inputType": ["code"],
    "frameworkTarget": ["tailwind"],
    "frameworkDetected": "tailwind",
    "confidenceLevel": "high"
  },
  "sourceCode": {
    "original": "<div class=\"flex p-6\">...</div>",
    "framework": "tailwind",
    "language": "html"
  },
  "sections": [
    {
      "id": "hero",
      "layout": "flex",
      "description": "Hero section with flex layout"
    }
  ],
  "components": [
    {
      "name": "HeroContent",
      "type": "container",
      "parentSection": "hero"
    }
  ]
}
```

---

## 🔧 Code Quality Analysis

Structra menganalisis kualitas kode dan mengidentifikasi masalah:

### Quality Issues yang Terdeteksi

1. **Magic Numbers**
   ```css
   /* Bad */
   .element {
     margin: 37px;
   }
   
   /* Good */
   .element {
     margin: var(--spacing-lg);
   }
   ```

2. **Nested Absolute Positioning**
   ```css
   /* Bad */
   .parent {
     position: relative;
   }
   .child {
     position: absolute;
     top: 20px;
     left: 30px;
   }
   .grandchild {
     position: absolute;
     top: 10px;
     left: 15px;
   }
   ```

3. **Deep DOM Trees**
   - Excessive nesting (lebih dari 5 level)
   - Unnecessary wrapper elements

4. **Inline Styles**
   ```html
   <!-- Bad -->
   <div style="color: red; padding: 10px;">
   
   <!-- Good -->
   <div class="error-message">
   ```

5. **Non-Semantic HTML**
   ```html
   <!-- Bad -->
   <div class="header">
   
   <!-- Good -->
   <header>
   ```

### Quality Score

Structra memberikan skor kualitas (0-100) berdasarkan:

- Code maintainability
- Semantic HTML usage
- CSS organization
- Responsive design implementation
- Performance considerations

### Refactoring Suggestions

Untuk setiap masalah, Structra menyediakan:

- **Issue Type** — Apa masalahnya
- **Severity** — High, medium, atau low
- **Description** — Penjelasan masalah
- **Location** — Di mana masalah terjadi
- **Suggestion** — Cara memperbaikinya

---

## 🔄 Code Refactoring

Structra dapat melakukan refactoring kode untuk meningkatkan kualitas:

### Refactoring Operations

1. **Extract Magic Numbers**
   - Konversi hardcoded values ke CSS variables
   - Gunakan design system tokens

2. **Simplify Nesting**
   - Kurangi DOM depth
   - Hapus unnecessary wrappers

3. **Improve Semantic HTML**
   - Ganti divs dengan semantic tags
   - Tambahkan proper ARIA attributes

4. **Optimize CSS**
   - Hapus redundant rules
   - Konsolidasi similar styles
   - Perbaiki selector specificity

5. **Enhance Responsiveness**
   - Perbaiki breakpoint strategy
   - Gunakan container queries jika tepat

---

## 🔀 Framework Conversion

Structra dapat mengkonversi kode antar framework:

### Supported Conversions

1. **Bootstrap → Tailwind**
   ```html
   <!-- Bootstrap -->
   <div class="container">
     <div class="row">
       <div class="col-md-6">
   
   <!-- Tailwind -->
   <div class="container mx-auto">
     <div class="flex flex-wrap">
       <div class="w-full md:w-1/2">
   ```

2. **Tailwind → CSS Manual**
   ```html
   <!-- Tailwind -->
   <div class="flex items-center p-6 bg-blue-500">
   
   <!-- CSS Manual -->
   <div class="hero-section">
   ```
   ```css
   .hero-section {
     display: flex;
     align-items: center;
     padding: 1.5rem;
     background-color: #3b82f6;
   }
   ```

3. **CSS Manual → SCSS**
   ```css
   /* CSS Manual */
   .hero-section {
     display: flex;
     padding: 2rem;
   }
   ```
   ```scss
   // SCSS
   $spacing-lg: 2rem;
   
   .hero-section {
     display: flex;
     padding: $spacing-lg;
   }
   ```

### Conversion Rules

- **Preserve Functionality** — Kode yang dikonversi mempertahankan hasil visual yang sama
- **Framework Best Practices** — Gunakan pola spesifik framework
- **Optimize Output** — Hapus kode redundant
- **Maintain Structure** — Pertahankan batas komponen

---

## 📊 Code Analysis Output

Saat menganalisis kode, Structra menyediakan:

### Analysis Report

```json
{
  "frameworkDetected": "tailwind",
  "confidence": "high",
  "codeQuality": {
    "score": 85,
    "issues": [
      {
        "type": "magic-number",
        "severity": "medium",
        "description": "Hardcoded spacing value found",
        "location": "line 15, .hero-section",
        "suggestion": "Use CSS variable or design token"
      }
    ],
    "suggestions": [
      "Consider using CSS custom properties for spacing",
      "Reduce nesting depth in component structure"
    ]
  },
  "structure": {
    "sections": 3,
    "components": 5,
    "layoutStrategy": "flex",
    "responsiveBreakpoints": ["mobile", "tablet", "desktop"]
  }
}
```

---

## 🎯 Best Practices

### Untuk Code Input

1. **Berikan Kode Lengkap** — Sertakan semua HTML dan CSS yang relevan
2. **Sertakan Konteks** — Sebutkan framework dan versi jika diketahui
3. **Tentukan Tujuan** — Nyatakan apa yang ingin dicapai (refactor, convert, analyze)

### Untuk Reverse Engineering

1. **Review Schema** — Periksa Canonical Schema yang dihasilkan
2. **Verifikasi Structure** — Pastikan sections dan components teridentifikasi dengan benar
3. **Periksa Quality** — Review analisis kualitas kode dan saran

### Untuk Framework Conversion

1. **Test Output** — Verifikasi kode yang dikonversi bekerja dengan benar
2. **Review Changes** — Periksa apa yang berubah selama konversi
3. **Optimize Further** — Terapkan optimisasi tambahan jika diperlukan

---

## ⚠️ Limitations

### Current Limitations

1. **Complex JavaScript** — Tidak dapat menganalisis logika JavaScript
2. **Dynamic Classes** — Mungkin melewatkan class yang dihasilkan secara dinamis
3. **Build-Time Processing** — Tidak dapat menganalisis transformasi build-time
4. **Framework-Specific Features** — Beberapa fitur framework mungkin tidak dikonversi dengan sempurna

### Workarounds

- Berikan konteks tambahan tentang perilaku dinamis
- Sertakan build configuration jika relevan
- Tentukan versi framework untuk akurasi yang lebih baik

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: CSS Performance & Optimization](19%20CSS%20Performance%20%26%20Optimization.md)**  
*CSS Optimization Techniques*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: Collection & History System →](21%20Collection%20%26%20History%20System.md)**  
*Collection Management*

</td>
</tr>
</table>

---

</div>

