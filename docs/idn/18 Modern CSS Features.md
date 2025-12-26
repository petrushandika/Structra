# 🚀 Structra — Modern CSS Features

Dokumen ini mencakup fitur CSS modern termasuk container queries, selector :has(), CSS layers, nesting, viewport units, dan fluid typography.

---

## 📋 Daftar Isi

- [Container Queries](#container-queries)
- [:has() Selector](#has-selector)
- [CSS Layers](#css-layers)
- [CSS Nesting](#css-nesting)
- [Viewport Units](#viewport-units)
- [Container Query Units](#container-query-units)
- [Fluid Typography](#fluid-typography)
- [Browser Support](#browser-support)

---

## 📦 Container Queries

Container queries memungkinkan styling berdasarkan ukuran container, bukan ukuran viewport.

### Setup Dasar

```css
.container {
  container-type: inline-size;
  container-name: card-container;
}

@container card-container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

### Tipe Container

```css
/* Size-based (width dan height) */
.size-container {
  container-type: size;
}

/* Inline-size only (width) */
.inline-container {
  container-type: inline-size;
}

/* Normal (no queries) */
.normal-container {
  container-type: normal;
}
```

### Named Containers

```css
.sidebar {
  container-type: inline-size;
  container-name: sidebar;
}

.main-content {
  container-type: inline-size;
  container-name: main-content;
}

@container sidebar (min-width: 300px) {
  .sidebar-item {
    display: flex;
    align-items: center;
  }
}

@container main-content (min-width: 800px) {
  .article {
    max-width: 700px;
    margin: 0 auto;
  }
}
```

### Container Queries vs Media Queries

**Media Queries:**
```css
/* Berdasarkan viewport */
@media (min-width: 768px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

**Container Queries:**
```css
/* Berdasarkan container */
@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

### Use Cases

- Responsivitas tingkat komponen
- Layout card yang beradaptasi ke container
- Komponen sidebar
- Sistem desain modular
- Responsivitas widget

---

## 🔍 :has() Selector

Selector :has() memungkinkan memilih elemen parent berdasarkan children mereka.

### Penggunaan Dasar

```css
/* Pilih card yang memiliki badge */
.card:has(.badge) {
  border: 2px solid gold;
}

/* Pilih form yang memiliki error */
.form:has(.error) {
  border-color: red;
}
```

### Memilih Berdasarkan Siblings

```css
/* Pilih input yang memiliki error sibling */
.input:has(+ .error) {
  border-color: red;
}

/* Pilih label yang memiliki checked input */
.label:has(input:checked) {
  font-weight: bold;
}
```

### Complex Selectors

```css
/* Pilih nav yang memiliki active link */
nav:has(a.active) {
  background: #667eea;
}

/* Pilih section yang memiliki h2 */
section:has(h2) {
  margin-top: 2rem;
}

/* Pilih div yang memiliki class1 dan class2 */
div:has(.class1):has(.class2) {
  display: flex;
}
```

### Use Cases

- Conditional styling berdasarkan konten
- Parent selection
- Form validation styling
- Dynamic component states
- Content-aware layouts

---

## 📚 CSS Layers

CSS Layers (@layer) menyediakan kontrol cascade dan organisasi style.

### Penggunaan Dasar

```css
@layer base, components, utilities;

@layer base {
  h1 { font-size: 2rem; }
  p { margin: 1rem 0; }
}

@layer components {
  .card { 
    padding: 1rem; 
    border-radius: 8px;
  }
}

@layer utilities {
  .text-center { text-align: center; }
  .mb-4 { margin-bottom: 1rem; }
}
```

### Layer Ordering

Layer diterapkan dalam urutan deklarasi mereka:

```css
@layer reset, base, components, utilities;

/* Layer yang lebih baru mengoverride yang lebih lama */
@layer utilities {
  .important { color: red !important; }
}
```

### Unlayered Styles

Style di luar layer memiliki prioritas tertinggi:

```css
/* Ini memiliki prioritas tertinggi */
.unlayered {
  color: blue;
}

@layer components {
  /* Ini memiliki prioritas lebih rendah */
  .layered {
    color: red;
  }
}
```

### Nested Layers

```css
@layer framework {
  @layer base {
    h1 { font-size: 2rem; }
  }
  
  @layer components {
    .button { padding: 0.5rem 1rem; }
  }
}
```

### Use Cases

- Framework organization
- Style prioritization
- Design system structure
- Override management
- Third-party style integration

---

## 🪢 CSS Nesting

CSS Nesting memungkinkan nesting selector di dalam selector lain.

### Basic Nesting

```css
.card {
  padding: 1rem;
  border-radius: 8px;
  
  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .content {
    margin-top: 1rem;
  }
}
```

### Parent Selector (&)

```css
.button {
  background: #667eea;
  
  &:hover {
    background: #5568d3;
  }
  
  &:active {
    background: #4455b8;
  }
  
  &.primary {
    background: #ff6b6b;
  }
}
```

### Complex Nesting

```css
.card {
  display: flex;
  
  &:hover {
    transform: scale(1.05);
  }
  
  .title {
    font-size: 1.5rem;
    
    &::after {
      content: '';
      display: block;
      width: 50px;
      height: 2px;
      background: #667eea;
    }
  }
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
}
```

### Use Cases

- Component organization
- Reduced selector repetition
- Better code organization
- Scoped styles

---

## 📏 Viewport Units

Modern viewport units menyediakan kontrol yang lebih baik atas responsive sizing.

### Traditional Units

```css
/* Viewport width */
.vw { width: 50vw; }

/* Viewport height */
.vh { height: 100vh; }

/* Viewport minimum */
.vmin { font-size: 5vmin; }

/* Viewport maximum */
.vmax { font-size: 5vmax; }
```

### Dynamic Viewport Units

```css
/* Dynamic viewport width (memperhitungkan browser UI) */
.dvw { width: 50dvw; }

/* Dynamic viewport height */
.dvh { height: 100dvh; }

/* Dynamic viewport minimum */
.dvmin { font-size: 5dvmin; }

/* Dynamic viewport maximum */
.dvmax { font-size: 5dvmax; }
```

### Small/Large Viewport Units

```css
/* Small viewport (ketika browser UI terlihat) */
.svw { width: 50svw; }
.svh { height: 100svh; }

/* Large viewport (ketika browser UI tersembunyi) */
.lvw { width: 50lvw; }
.lvh { height: 100lvh; }
```

### Use Cases

- Full-screen layouts
- Mobile-first design
- Responsive typography
- Hero sections

---

## 📐 Container Query Units

Container query units memungkinkan sizing berdasarkan dimensi container.

### Available Units

```css
.container {
  container-type: inline-size;
}

/* Container query width */
.cqw { width: 50cqw; }

/* Container query height */
.cqh { height: 50cqh; }

/* Container query inline size */
.cqi { width: 50cqi; }

/* Container query block size */
.cqb { height: 50cqb; }

/* Container query minimum */
.cqmin { font-size: 5cqmin; }

/* Container query maximum */
.cqmax { font-size: 5cqmax; }
```

### Contoh Penggunaan

```css
.card {
  container-type: inline-size;
}

.card-title {
  font-size: clamp(1rem, 5cqw, 2rem);
  padding: 2cqi;
}

.card-image {
  width: 100cqw;
  height: 50cqh;
}
```

### Use Cases

- Responsivitas tingkat komponen
- Fluid typography dalam container
- Responsive images dalam container
- Modular component sizing

---

## 📝 Fluid Typography

Fluid typography menskalakan dengan halus di antara breakpoints.

### Menggunakan clamp()

```css
.fluid-text {
  font-size: clamp(1rem, 2.5vw, 2rem);
}
```

### Menggunakan min() dan max()

```css
.responsive-text {
  font-size: min(2rem, 5vw);
  line-height: max(1.5, 1.2);
}
```

### Complex Fluid Typography

```css
:root {
  --min-font-size: 1rem;
  --max-font-size: 2rem;
  --min-viewport: 320px;
  --max-viewport: 1200px;
}

.fluid-heading {
  font-size: clamp(
    var(--min-font-size),
    calc(var(--min-font-size) + (var(--max-font-size) - var(--min-font-size)) * 
        ((100vw - var(--min-viewport)) / (var(--max-viewport) - var(--min-viewport)))),
    var(--max-font-size)
  );
}
```

### Dengan Container Queries

```css
.container {
  container-type: inline-size;
}

.fluid-in-container {
  font-size: clamp(1rem, 5cqw, 2rem);
}
```

### Use Cases

- Responsive headings
- Scalable text
- Better readability
- Modern typography

---

## 🌐 Browser Support

### Dukungan Fitur

| Fitur | Chrome | Firefox | Safari | Edge |
|-------|--------|---------|--------|------|
| Container Queries | ✅ | ✅ | ✅ | ✅ |
| :has() | ✅ | ✅ | ✅ | ✅ |
| CSS Layers | ✅ | ✅ | ✅ | ✅ |
| CSS Nesting | ✅ | ✅ | ✅ | ✅ |
| Dynamic Viewport Units | ✅ | ✅ | ✅ | ✅ |
| Container Query Units | ✅ | ✅ | ✅ | ✅ |
| clamp() | ✅ | ✅ | ✅ | ✅ |

### Strategi Fallback

```css
/* Container queries fallback */
.card {
  /* Fallback dengan media query */
  display: block;
}

@media (min-width: 768px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}

/* Enhanced dengan container query */
@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

---

## 💡 Best Practices

1. **Gunakan container queries untuk komponen** - Lebih baik daripada media queries untuk desain modular
2. **Manfaatkan :has() untuk conditional styling** - Parent selection yang kuat
3. **Organisir dengan CSS layers** - Kontrol cascade yang lebih baik
4. **Gunakan nesting untuk organisasi** - Struktur kode yang lebih bersih
5. **Prioritaskan dynamic viewport units** - Pengalaman mobile yang lebih baik
6. **Gunakan container query units** - Responsivitas tingkat komponen
7. **Implementasikan fluid typography** - Readability yang lebih baik di semua perangkat

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: CSS-only Solutions](17%20CSS-only%20Solutions.md)**  
*Kapan Menggunakan CSS-only vs SVG*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: CSS Performance & Optimization →](19%20CSS%20Performance%20%26%20Optimization.md)**  
*Panduan Optimasi Performa*

</td>
</tr>
</table>

</div>

