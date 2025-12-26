# ðŸŽ¨ Structra â€” Advanced CSS Techniques

This document covers teknik CSS lanjutan yang dapat dihasilkan oleh Structra, termasuk mask, aspect-ratio, calc, clip-path, custom properties, container queries, modern selectors, CSS layers, dan filters.

---

## ðŸ“‹ Table of Contents

- [CSS Mask](#css-mask)
- [Aspect Ratio](#aspect-ratio)
- [Calc Function](#calc-function)
- [Clip Path](#clip-path)
- [CSS Custom Properties](#css-custom-properties)
- [Container Queries](#container-queries)
- [Modern Selectors](#modern-selectors)
- [CSS Layers](#css-layers)
- [Backdrop Filter](#backdrop-filter)
- [CSS Filters](#css-filters)

---

## ðŸŽ­ CSS Mask

CSS Mask allows you to membuat efek transparansi kompleks dan cutout.

### Basic Usage

```css
.masked-element {
  mask-image: url('mask.png');
  mask-size: cover;
  mask-position: center;
  mask-repeat: no-repeat;
}
```

### Gradient Masks

```css
.gradient-mask {
  mask: linear-gradient(to bottom, black, transparent);
}
```

### Radial Gradient Mask

```css
.radial-mask {
  mask: radial-gradient(circle, transparent 20%, black 20%);
}
```

### Mask Composite

```css
.composite-mask {
  mask-image: 
    radial-gradient(circle at 30% 30%, black 20%, transparent 20%),
    radial-gradient(circle at 70% 30%, black 20%, transparent 20%);
  mask-composite: intersect;
}
```

### Use Cases

- Membuat flower shapes
- Cutout kompleks
- Efek vignette
- Efek spotlight
- Menggabungkan beberapa bentuk

---

## ðŸ“ Aspect Ratio

Properti `aspect-ratio` maintains consistent proportions yang konsisten.

### Basic Usage

```css
.square {
  aspect-ratio: 1 / 1;
  width: 100%;
}

.video-container {
  aspect-ratio: 16 / 9;
  width: 100%;
}
```

### Dengan Calc

```css
.responsive-box {
  aspect-ratio: 1 / 1;
  width: calc(100% - 2rem);
  max-width: 500px;
}
```

### Common Ratios

```css
/* Square */
aspect-ratio: 1 / 1;

/* Video (16:9) */
aspect-ratio: 16 / 9;

/* Photo (4:3) */
aspect-ratio: 4 / 3;

/* Portrait (3:4) */
aspect-ratio: 3 / 4;

/* Wide (21:9) */
aspect-ratio: 21 / 9;
```

### Use Cases

- maintains consistent proportions gambar
- Container responsif
- Layout card
- Video embeds

---

## ðŸ§® Calc Function

Function `calc()` performs calculations dalam CSS.

### Basic Usage

```css
.calculated-width {
  width: calc(100% - 2rem);
}

.calculated-height {
  height: calc(100vh - 80px);
}
```

### Complex Calculations

```css
.complex-calc {
  width: calc((100% - 3rem) / 3);
  margin: calc(1rem + 2px);
}
```

### With CSS Variables

```css
:root {
  --spacing: 1rem;
  --header-height: 80px;
}

.container {
  padding: calc(var(--spacing) * 2);
  height: calc(100vh - var(--header-height));
}
```

### Use Cases

- Spacing responsif
- Centering dengan dimensi yang diketahui
- Grid gaps
- Fluid typography

---

## âœ‚ï¸ Clip Path

Clip-path creates geometric cutouts geometris dan bentuk.

### Basic Shapes

```css
/* Circle */
.circle-clip {
  clip-path: circle(50%);
}

/* Ellipse */
.ellipse-clip {
  clip-path: ellipse(50% 30%);
}

/* Inset */
.inset-clip {
  clip-path: inset(10% 20% 30% 40%);
}
```

### Polygon Shapes

```css
/* Triangle */
.triangle {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

/* Hexagon */
.hexagon {
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}

/* Star */
.star {
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}
```

### Custom Shapes

```css
.custom-shape {
  clip-path: polygon(
    0% 20%,
    60% 20%,
    60% 0%,
    100% 50%,
    60% 100%,
    60% 80%,
    0% 80%
  );
}
```

### Use Cases

- Bentuk geometris
- Notches dan cutouts
- Elemen dekoratif
- Image cropping

---

## ðŸŽ¨ CSS Custom Properties

CSS Custom Properties (CSS Variables) enables dynamic theming dinamis dan nilai yang dapat digunakan kembali.

### Basic Usage

```css
:root {
  --primary-color: #000000;
  --secondary-color: #ffffff;
  --spacing-base: 1rem;
  --font-family-sans: 'Inter', sans-serif;
}

.element {
  color: var(--primary-color);
  padding: var(--spacing-base);
  font-family: var(--font-family-sans);
}
```

### With Fallbacks

```css
.element {
  color: var(--primary-color, #000000);
  padding: var(--spacing-base, 1rem);
}
```

### Scoped Variables

```css
.card {
  --card-padding: 1.5rem;
  --card-radius: 8px;
  padding: var(--card-padding);
  border-radius: var(--card-radius);
}
```

### Dynamic Variables

```css
:root {
  --hue: 200;
}

.element {
  background-color: hsl(var(--hue), 70%, 50%);
}
```

### Use Cases

- Theming
- Design tokens
- Dynamic styling
- Responsive values

---

## ðŸ“¦ Container Queries

Container queries allows styling berdasarkan ukuran container, bukan viewport.

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

### Container Types

```css
/* Size-based */
.size-container {
  container-type: size;
}

/* Inline-size only */
.inline-container {
  container-type: inline-size;
}

/* Normal (no queries) */
.normal-container {
  container-type: normal;
}
```

### Container Query Units

```css
.card {
  container-type: inline-size;
}

.card-title {
  font-size: clamp(1rem, 5cqw, 2rem);
  padding: 2cqi;
}
```

### Use Cases

- Responsivitas tingkat komponen
- Layout card
- Komponen sidebar
- Sistem desain modular

---

## ðŸ” Modern Selectors

Modern CSS selectors provides powerful seleksi yang kuat.

### :has() Selector

```css
/* Select parent berdasarkan child */
.card:has(.badge) {
  border: 2px solid gold;
}

/* Select based on sibling */
.input:has(+ .error) {
  border-color: red;
}
```

### :is() Selector

```css
/* Group selectors */
:is(h1, h2, h3) {
  font-weight: bold;
}

/* Simplified nesting */
.card :is(.title, .subtitle) {
  color: blue;
}
```

### :where() Selector

```css
/* Similar to :is() but with 0 specificity */
:where(h1, h2, h3) {
  margin: 0;
}
```

### :not() Selector (Enhanced)

```css
/* Multiple exclusions */
:not(.disabled, .hidden) {
  display: block;
}
```

### Use Cases

- Parent selection
- Conditional styling
- Simplified selectors
- Specificity control

---

## ðŸ“š CSS Layers

CSS Layers (@layer) provides control cascade dan organisasi.

### Basic Usage

```css
@layer base, components, utilities;

@layer base {
  h1 { font-size: 2rem; }
}

@layer components {
  .card { padding: 1rem; }
}

@layer utilities {
  .text-center { text-align: center; }
}
```

### Layer Ordering

```css
@layer reset, base, components, utilities;

/* Later layers override earlier ones */
@layer utilities {
  .important { color: red !important; }
}
```

### Unlayered Styles

```css
/* Styles outside layers have highest priority */
.unlayered {
  color: blue;
}
```

### Use Cases

- Framework organization
- Style prioritization
- Design system structure
- Override management

---

## ðŸŒ«ï¸ Backdrop Filter

Backdrop-filter applies filters ke konten di belakang elemen.

### Basic Usage

```css
.glass-effect {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
}
```

### Multiple Filters

```css
.complex-backdrop {
  backdrop-filter: blur(10px) saturate(180%);
  background: rgba(255, 255, 255, 0.2);
}
```

### Performance Note

âš ï¸ **Warning**: Backdrop-filter expensive. Use sparingly dan uji performa.

### Use Cases

- Efek glassmorphism
- Frosted glass
- Modal overlays
- Navigation bars

---

## ðŸŽ­ CSS Filters

CSS Filters menerapkan efek visual ke elemen.

### Filter yang Tersedia

```css
/* Blur */
.blurred {
  filter: blur(5px);
}

/* Brightness */
.bright {
  filter: brightness(1.5);
}

/* Contrast */
.high-contrast {
  filter: contrast(1.2);
}

/* Drop Shadow */
.shadowed {
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}

/* Grayscale */
.grayscale {
  filter: grayscale(100%);
}

/* Hue Rotate */
.hue-shifted {
  filter: hue-rotate(90deg);
}

/* Invert */
.inverted {
  filter: invert(100%);
}

/* Saturate */
.saturated {
  filter: saturate(150%);
}

/* Sepia */
.vintage {
  filter: sepia(100%);
}
```

### Multiple Filters

```css
.complex-filter {
  filter: blur(2px) brightness(1.1) contrast(1.2);
}
```

### Use Cases

- Efek gambar
- Hover states
- Loading states
- Theming

---

## ðŸ”— Combining Techniques

### Example: Flower Shape dengan Mask

```css
.flower {
  aspect-ratio: 1 / 1;
  width: calc(100% - 2rem);
  mask: 
    radial-gradient(circle at 30% 30%, black 20%, transparent 20%),
    radial-gradient(circle at 70% 30%, black 20%, transparent 20%),
    radial-gradient(circle at 50% 70%, black 20%, transparent 20%);
  mask-composite: intersect;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
}
```

### Example: Responsive Container dengan Calc

```css
:root {
  --container-padding: 1rem;
  --container-max-width: 1200px;
}

.container {
  width: calc(100% - var(--container-padding) * 2);
  max-width: var(--container-max-width);
  margin: 0 auto;
  container-type: inline-size;
}

@container (min-width: 600px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

---

## ðŸ“– Browser Support

### Modern Feature Support

| Fitur | Chrome | Firefox | Safari | Edge |
|-------|--------|---------|--------|------|
| CSS Mask | âœ… | âœ… | âœ… | âœ… |
| Aspect Ratio | âœ… | âœ… | âœ… | âœ… |
| Calc | âœ… | âœ… | âœ… | âœ… |
| Clip Path | âœ… | âœ… | âœ… | âœ… |
| Custom Properties | âœ… | âœ… | âœ… | âœ… |
| Container Queries | âœ… | âœ… | âœ… | âœ… |
| :has() | âœ… | âœ… | âœ… | âœ… |
| CSS Layers | âœ… | âœ… | âœ… | âœ… |
| Backdrop Filter | âœ… | âœ… | âœ… | âœ… |

### Fallback Strategy

Always provide fallback for unsupported features:

```css
/* Dengan @supports */
@supports (aspect-ratio: 1 / 1) {
  .responsive {
    aspect-ratio: 16 / 9;
  }
}

@supports not (aspect-ratio: 1 / 1) {
  .responsive {
    padding-bottom: 56.25%; /* 16:9 ratio */
  }
}
```

---

<div align="center">

## ðŸ“– Navigation

<table>
<tr>
<td align="left">

**[â† Previous: Prompt Templates](13%20Prompt%20Templates.md)**  
*Prompt Templates for Role-Based Reasoning*

</td>
<td align="center">

**[â†‘ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: CSS Shapes & Patterns â†’](15%20CSS%20Shapes%20%26%20Patterns.md)**  
*All Shape Types dan Patterns*

</td>
</tr>
</table>

</div>

