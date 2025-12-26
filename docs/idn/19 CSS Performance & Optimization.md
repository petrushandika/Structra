# ⚡ Structra — CSS Performance & Optimization

Dokumen ini mencakup teknik optimasi CSS, critical CSS extraction, minification, loading strategies, performance metrics, dan optimasi rendering browser.

---

## 📋 Daftar Isi

- [CSS Optimization Techniques](#css-optimization-techniques)
- [Critical CSS](#critical-css)
- [CSS Minification](#css-minification)
- [CSS Purging](#css-purging)
- [Loading Strategies](#loading-strategies)
- [Performance Metrics](#performance-metrics)
- [Browser Rendering Optimization](#browser-rendering-optimization)
- [Best Practices](#best-practices)

---

## 🎯 CSS Optimization Techniques

### Hapus CSS yang Tidak Digunakan

```css
/* ❌ Tidak digunakan */
.unused-class {
  color: red;
}

/* ✅ Digunakan */
.active-class {
  color: blue;
}
```

### Gabungkan Selectors

```css
/* ❌ Multiple rules */
.button-primary { color: blue; }
.button-secondary { color: blue; }
.button-tertiary { color: blue; }

/* ✅ Digabungkan */
.button-primary,
.button-secondary,
.button-tertiary {
  color: blue;
}
```

### Gunakan Shorthand Properties

```css
/* ❌ Verbose */
.element {
  margin-top: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
}

/* ✅ Shorthand */
.element {
  margin: 1rem;
}
```

### Optimalkan Selectors

```css
/* ❌ Complex selector */
div.container > ul.list > li.item > a.link { }

/* ✅ Simple selector */
.link { }
```

### Kurangi Specificity

```css
/* ❌ High specificity */
div.container div.card div.content p.text { }

/* ✅ Low specificity */
.text { }
```

---

## 🎯 Critical CSS

Critical CSS adalah CSS yang diperlukan untuk merender konten above-the-fold.

### Inline Critical CSS

```html
<head>
  <style>
    /* Critical CSS di sini */
    .hero { }
    .navigation { }
  </style>
  <link rel="stylesheet" href="main.css">
</head>
```

### Extract Critical CSS

```css
/* Critical CSS (above fold) */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.navigation {
  position: fixed;
  top: 0;
  width: 100%;
}

/* Non-critical CSS (below fold) */
.footer {
  padding: 2rem;
}
```

### Tools untuk Critical CSS

- Critical CSS extractors
- Build tools (Webpack, Vite)
- Online tools
- CLI tools

---

## 📦 CSS Minification

Minification mengurangi ukuran file CSS dengan menghapus whitespace dan komentar.

### Sebelum Minification

```css
/* Header styles */
.header {
  padding: 1rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
}

/* Navigation styles */
.navigation {
  display: flex;
  gap: 1rem;
}
```

### Setelah Minification

```css
.header{padding:1rem;background-color:#fff;border-bottom:1px solid #e0e0e0}.navigation{display:flex;gap:1rem}
```

### Minification Tools

- CSSNano
- CleanCSS
- PostCSS
- Build tools (Webpack, Vite, Rollup)

---

## 🗑️ CSS Purging

CSS purging menghapus CSS yang tidak digunakan dari stylesheet Anda.

### PurgeCSS Example

```javascript
// purgecss.config.js
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  css: ['./src/**/*.css'],
  output: './dist/'
}
```

### Tailwind CSS Purging

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './public/index.html'
  ],
  // Purging otomatis di production
}
```

### Benefits

- Ukuran file lebih kecil
- Waktu load lebih cepat
- Performa lebih baik
- Bandwidth berkurang

---

## 📥 Loading Strategies

### Render-Blocking CSS

```html
<!-- ❌ Render-blocking -->
<link rel="stylesheet" href="styles.css">

<!-- ✅ Non-blocking -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>
```

### Async CSS Loading

```html
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
```

### CSS Splitting

```html
<!-- Critical CSS inline -->
<style>
  /* Critical styles */
</style>

<!-- Non-critical CSS deferred -->
<link rel="preload" href="non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### Preload Critical Resources

```html
<link rel="preload" href="fonts.css" as="style">
<link rel="preload" href="critical.css" as="style">
```

---

## 📊 Performance Metrics

### Key Metrics

**First Contentful Paint (FCP)**
- Waktu ke konten yang dirender pertama
- Target: < 1.8s

**Largest Contentful Paint (LCP)**
- Waktu ke render konten terbesar
- Target: < 2.5s

**Cumulative Layout Shift (CLS)**
- Ukuran stabilitas visual
- Target: < 0.1

**Time to Interactive (TTI)**
- Waktu hingga halaman interaktif
- Target: < 3.8s

### Mengukur Dampak CSS

```javascript
// Performance API
const perfData = performance.getEntriesByType('resource');
const cssFiles = perfData.filter(entry => entry.name.endsWith('.css'));

cssFiles.forEach(css => {
  console.log(`CSS: ${css.name}`);
  console.log(`Load time: ${css.duration}ms`);
  console.log(`Size: ${css.transferSize} bytes`);
});
```

---

## 🎨 Browser Rendering Optimization

### Hindari Layout Thrashing

```css
/* ❌ Menyebabkan layout recalculation */
.element {
  width: 100px;
  height: 100px;
}

.element:hover {
  width: 200px; /* Layout shift */
  height: 200px; /* Layout shift */
}

/* ✅ Gunakan transform instead */
.element {
  width: 100px;
  height: 100px;
}

.element:hover {
  transform: scale(2); /* GPU-accelerated */
}
```

### Gunakan Contain Property

```css
.container {
  contain: layout style paint;
}
```

### Optimalkan Animations

```css
/* ✅ GPU-accelerated */
.animated {
  transform: translateX(0);
  transition: transform 0.3s ease-out;
}

.animated:hover {
  transform: translateX(100px);
}

/* ❌ Tidak GPU-accelerated */
.animated-bad {
  left: 0;
  transition: left 0.3s ease-out;
}

.animated-bad:hover {
  left: 100px; /* Menyebabkan reflow */
}
```

### Kurangi Repaints

```css
/* ✅ Batch DOM reads/writes */
.element {
  transform: translateX(0) translateY(0);
}

/* ❌ Multiple repaints */
.element {
  transform: translateX(0);
  transform: translateY(0);
}
```

---

## 💡 Best Practices

### 1. Minimalkan Ukuran CSS

- Hapus CSS yang tidak digunakan
- Gunakan CSS purging
- Minify CSS
- Gabungkan file jika memungkinkan

### 2. Optimalkan Loading

- Inline critical CSS
- Defer non-critical CSS
- Gunakan preload untuk resource penting
- Split CSS berdasarkan route/page

### 3. Optimalkan Selectors

- Jaga selector sederhana
- Hindari nesting dalam
- Kurangi specificity
- Gunakan classes daripada tags

### 4. Optimalkan Properties

- Gunakan shorthand properties
- Hindari properti mahal (filter, backdrop-filter)
- Prioritaskan transform daripada position
- Gunakan will-change dengan hemat

### 5. Monitor Performa

- Ukur waktu load CSS
- Lacak ukuran file
- Monitor performa render
- Uji di perangkat nyata

---

## 🔧 Optimization Checklist

- [ ] Hapus CSS yang tidak digunakan
- [ ] Minify file CSS
- [ ] Extract critical CSS
- [ ] Optimalkan selectors
- [ ] Gunakan shorthand properties
- [ ] Gabungkan rules yang serupa
- [ ] Defer non-critical CSS
- [ ] Preload resource penting
- [ ] Optimalkan animations
- [ ] Uji performance metrics

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Modern CSS Features](18%20Modern%20CSS%20Features.md)**  
*Container Queries, :has(), CSS Layers*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: Examples →](12%20Examples.md)**  
*Contoh Penggunaan dan Use Cases*

</td>
</tr>
</table>

</div>

