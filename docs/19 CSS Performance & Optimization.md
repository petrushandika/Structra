# ⚡ Structra — CSS Performance & Optimization

This document covers CSS optimization techniques, critical CSS extraction, minification, loading strategies, performance metrics, and browser rendering optimization.

---

## 📋 Table of Contents

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

### Remove Unused CSS

```css
/* ❌ Unused */
.unused-class {
  color: red;
}

/* ✅ Used */
.active-class {
  color: blue;
}
```

### Combine Selectors

```css
/* ❌ Multiple rules */
.button-primary { color: blue; }
.button-secondary { color: blue; }
.button-tertiary { color: blue; }

/* ✅ Combined */
.button-primary,
.button-secondary,
.button-tertiary {
  color: blue;
}
```

### Use Shorthand Properties

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

### Optimize Selectors

```css
/* ❌ Complex selector */
div.container > ul.list > li.item > a.link { }

/* ✅ Simple selector */
.link { }
```

### Reduce Specificity

```css
/* ❌ High specificity */
div.container div.card div.content p.text { }

/* ✅ Low specificity */
.text { }
```

---

## 🎯 Critical CSS

Critical CSS is the CSS needed to render above-the-fold content.

### Inline Critical CSS

```html
<head>
  <style>
    /* Critical CSS here */
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

### Tools for Critical CSS

- Critical CSS extractors
- Build tools (Webpack, Vite)
- Online tools
- CLI tools

---

## 📦 CSS Minification

Minification reduces CSS file size by removing whitespace and comments.

### Before Minification

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

### After Minification

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

CSS purging removes unused CSS from your stylesheets.

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
  // Purging is automatic in production
}
```

### Benefits

- Smaller file sizes
- Faster load times
- Better performance
- Reduced bandwidth

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
- Time to first rendered content
- Target: < 1.8s

**Largest Contentful Paint (LCP)**
- Time to largest content render
- Target: < 2.5s

**Cumulative Layout Shift (CLS)**
- Visual stability measure
- Target: < 0.1

**Time to Interactive (TTI)**
- Time until page is interactive
- Target: < 3.8s

### Measuring CSS Impact

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

### Avoid Layout Thrashing

```css
/* ❌ Causes layout recalculation */
.element {
  width: 100px;
  height: 100px;
}

.element:hover {
  width: 200px; /* Layout shift */
  height: 200px; /* Layout shift */
}

/* ✅ Use transform instead */
.element {
  width: 100px;
  height: 100px;
}

.element:hover {
  transform: scale(2); /* GPU-accelerated */
}
```

### Use Contain Property

```css
.container {
  contain: layout style paint;
}
```

### Optimize Animations

```css
/* ✅ GPU-accelerated */
.animated {
  transform: translateX(0);
  transition: transform 0.3s ease-out;
}

.animated:hover {
  transform: translateX(100px);
}

/* ❌ Not GPU-accelerated */
.animated-bad {
  left: 0;
  transition: left 0.3s ease-out;
}

.animated-bad:hover {
  left: 100px; /* Causes reflow */
}
```

### Reduce Repaints

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

### 1. Minimize CSS Size

- Remove unused CSS
- Use CSS purging
- Minify CSS
- Combine files when possible

### 2. Optimize Loading

- Inline critical CSS
- Defer non-critical CSS
- Use preload for important resources
- Split CSS by route/page

### 3. Optimize Selectors

- Keep selectors simple
- Avoid deep nesting
- Reduce specificity
- Use classes over tags

### 4. Optimize Properties

- Use shorthand properties
- Avoid expensive properties (filter, backdrop-filter)
- Prefer transform over position
- Use will-change sparingly

### 5. Monitor Performance

- Measure CSS load time
- Track file sizes
- Monitor render performance
- Test on real devices

---

## 🔧 Optimization Checklist

- [ ] Remove unused CSS
- [ ] Minify CSS files
- [ ] Extract critical CSS
- [ ] Optimize selectors
- [ ] Use shorthand properties
- [ ] Combine similar rules
- [ ] Defer non-critical CSS
- [ ] Preload important resources
- [ ] Optimize animations
- [ ] Test performance metrics

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

**[Next: Glossary →](GLOSSARY.md)**  
*Technical Terms and Definitions*

</td>
</tr>
</table>

</div>

