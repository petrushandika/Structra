# 🚀 Structra — Modern CSS Features

This document covers modern CSS features including container queries, :has() selector, CSS layers, nesting, viewport units, and fluid typography.

---

## 📋 Table of Contents

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

Container queries allow styling based on container size, not viewport size.

### Basic Setup

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
/* Size-based (both width and height) */
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
/* Based on viewport */
@media (min-width: 768px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

**Container Queries:**
```css
/* Based on container */
@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

### Use Cases

- Component-level responsiveness
- Card layouts that adapt to container
- Sidebar components
- Modular design systems
- Widget responsiveness

---

## 🔍 :has() Selector

The :has() selector allows selecting parent elements based on their children.

### Basic Usage

```css
/* Select card that has a badge */
.card:has(.badge) {
  border: 2px solid gold;
}

/* Select form that has an error */
.form:has(.error) {
  border-color: red;
}
```

### Selecting Based on Siblings

```css
/* Select input that has error sibling */
.input:has(+ .error) {
  border-color: red;
}

/* Select label that has checked input */
.label:has(input:checked) {
  font-weight: bold;
}
```

### Complex Selectors

```css
/* Select nav that has active link */
nav:has(a.active) {
  background: #667eea;
}

/* Select section that has h2 */
section:has(h2) {
  margin-top: 2rem;
}

/* Select div that has both class1 and class2 */
div:has(.class1):has(.class2) {
  display: flex;
}
```

### Use Cases

- Conditional styling based on content
- Parent selection
- Form validation styling
- Dynamic component states
- Content-aware layouts

---

## 📚 CSS Layers

CSS Layers (@layer) provide cascade control and style organization.

### Basic Usage

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

Layers are applied in the order they're declared:

```css
@layer reset, base, components, utilities;

/* Later layers override earlier ones */
@layer utilities {
  .important { color: red !important; }
}
```

### Unlayered Styles

Styles outside layers have the highest priority:

```css
/* This has highest priority */
.unlayered {
  color: blue;
}

@layer components {
  /* This has lower priority */
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

CSS Nesting allows nesting selectors within other selectors.

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

Modern viewport units provide better control over responsive sizing.

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
/* Dynamic viewport width (accounts for browser UI) */
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
/* Small viewport (when browser UI is visible) */
.svw { width: 50svw; }
.svh { height: 100svh; }

/* Large viewport (when browser UI is hidden) */
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

Container query units allow sizing based on container dimensions.

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

### Example Usage

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

- Component-level responsiveness
- Fluid typography in containers
- Responsive images in containers
- Modular component sizing

---

## 📝 Fluid Typography

Fluid typography scales smoothly between breakpoints.

### Using clamp()

```css
.fluid-text {
  font-size: clamp(1rem, 2.5vw, 2rem);
}
```

### Using min() and max()

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

### With Container Queries

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

### Feature Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Container Queries | ✅ | ✅ | ✅ | ✅ |
| :has() | ✅ | ✅ | ✅ | ✅ |
| CSS Layers | ✅ | ✅ | ✅ | ✅ |
| CSS Nesting | ✅ | ✅ | ✅ | ✅ |
| Dynamic Viewport Units | ✅ | ✅ | ✅ | ✅ |
| Container Query Units | ✅ | ✅ | ✅ | ✅ |
| clamp() | ✅ | ✅ | ✅ | ✅ |

### Fallback Strategies

```css
/* Container queries fallback */
.card {
  /* Fallback with media query */
  display: block;
}

@media (min-width: 768px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}

/* Enhanced with container query */
@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

---

## 💡 Best Practices

1. **Use container queries for components** - Better than media queries for modular design
2. **Leverage :has() for conditional styling** - Powerful parent selection
3. **Organize with CSS layers** - Better cascade control
4. **Use nesting for organization** - Cleaner code structure
5. **Prefer dynamic viewport units** - Better mobile experience
6. **Use container query units** - Component-level responsiveness
7. **Implement fluid typography** - Better readability across devices

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: CSS-only Solutions](17%20CSS-only%20Solutions.md)**  
*When to Use CSS-only vs SVG*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: CSS Performance & Optimization →](19%20CSS%20Performance%20%26%20Optimization.md)**  
*Performance Optimization Guide*

</td>
</tr>
</table>

</div>

