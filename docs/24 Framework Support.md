# 🎨 Structra — Framework Support

Comprehensive guide to Structra's multi-framework support, including Tailwind CSS, Bootstrap, CSS manual, SCSS, CSS Modules, PostCSS, and framework conversion capabilities.

---

## 🎯 Overview

Structra provides comprehensive support for multiple CSS frameworks:

- **Tailwind CSS** — Full utility-first support
- **Bootstrap** — Support for versions 3, 4, and 5
- **CSS Manual** — Vanilla CSS generation
- **SCSS/SASS** — Preprocessor support
- **CSS Modules** — Scoped CSS support
- **PostCSS** — PostCSS plugin support
- **Framework Conversion** — Convert between frameworks

---

## 📋 Table of Contents

- [Tailwind CSS Support](#tailwind-css-support)
- [Bootstrap Support](#bootstrap-support)
- [CSS Manual Support](#css-manual-support)
- [SCSS/SASS Support](#scsssass-support)
- [CSS Modules Support](#css-modules-support)
- [PostCSS Support](#postcss-support)
- [Framework Detection](#framework-detection)
- [Framework Conversion](#framework-conversion)
- [Hybrid Approaches](#hybrid-approaches)
- [Best Practices](#best-practices)

---

## 🎨 Tailwind CSS Support

### Utility-First Generation

Structra generates Tailwind utility classes:

**Example Output:**
```html
<div class="flex items-center justify-between p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
  <h1 class="text-3xl font-bold text-white">Hero Title</h1>
  <button class="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
    Get Started
  </button>
</div>
```

### Tailwind Features Supported

- **Layout Utilities** — flex, grid, positioning
- **Spacing** — padding, margin, gap
- **Colors** — background, text, border colors
- **Typography** — font size, weight, line height
- **Responsive** — Breakpoint prefixes
- **Hover/Focus States** — State variants
- **Custom Classes** — Custom utility classes

### Tailwind Best Practices

Structra follows Tailwind best practices:

- Uses utility classes efficiently
- Groups related utilities
- Uses responsive prefixes appropriately
- Applies hover/focus states correctly

---

## 🅱️ Bootstrap Support

### Bootstrap Versions

Structra supports Bootstrap 3, 4, and 5:

**Bootstrap 5 Example:**
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

### Bootstrap Components

Supported Bootstrap components:

- **Grid System** — Container, row, columns
- **Cards** — Card components
- **Buttons** — Button variants
- **Forms** — Form components
- **Navigation** — Navbar, nav components
- **Utilities** — Bootstrap utility classes

### Bootstrap Best Practices

- Uses Bootstrap grid system correctly
- Applies Bootstrap component classes
- Uses Bootstrap utilities appropriately
- Maintains Bootstrap conventions

---

## 📝 CSS Manual Support

### Vanilla CSS Generation

Structra generates clean, semantic CSS:

**Example Output:**
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

### CSS Manual Features

- **Semantic Classes** — Meaningful class names
- **Organized Structure** — Well-organized CSS
- **Modern CSS** — Uses modern CSS features
- **Performance Optimized** — Optimized CSS output

---

## 🎨 SCSS/SASS Support

### SCSS Generation

Structra generates SCSS with:

- **Variables** — SCSS variables
- **Nesting** — Nested selectors
- **Mixins** — Reusable mixins
- **Functions** — SCSS functions

**Example Output:**
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

### SCSS Features

- **Variables** — Color, spacing, typography variables
- **Nesting** — Component nesting
- **Mixins** — Reusable style patterns
- **Functions** — Color manipulation functions

---

## 📦 CSS Modules Support

### Scoped CSS Generation

Structra generates CSS Modules:

**Example Output:**
```css
/* Hero.module.css */
.heroSection {
  display: flex;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.heroTitle {
  font-size: 2rem;
  color: white;
}
```

**Usage:**
```jsx
import styles from './Hero.module.css';

<div className={styles.heroSection}>
  <h1 className={styles.heroTitle}>Hero Title</h1>
</div>
```

### CSS Modules Features

- **Scoped Classes** — Automatically scoped class names
- **Component Organization** — Organized by component
- **Type Safety** — TypeScript support
- **Tree Shaking** — Unused styles removed

---

## 🔧 PostCSS Support

### PostCSS Processing

Structra supports PostCSS features:

- **Nested Rules** — CSS nesting
- **Custom Properties** — CSS variables
- **Autoprefixer** — Automatic vendor prefixes
- **PostCSS Plugins** — Plugin support

**Example Output:**
```css
.hero {
  display: flex;
  padding: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
}
```

---

## 🔍 Framework Detection

### Automatic Detection

Structra automatically detects frameworks from code:

**Detection Methods:**
1. **Class Patterns** — Utility vs component classes
2. **File Structure** — File extensions and naming
3. **Code Patterns** — Framework-specific patterns
4. **Metadata** — Package.json, config files

### Detection Confidence

- **High** — Clear framework indicators
- **Medium** — Some indicators present
- **Low** — Generic CSS, unclear framework

---

## 🔀 Framework Conversion

### Supported Conversions

Structra can convert between frameworks:

1. **Bootstrap → Tailwind**
2. **Tailwind → CSS Manual**
3. **CSS Manual → SCSS**
4. **SCSS → CSS Modules**
5. **Any → Any** — Between all supported frameworks

### Conversion Process

1. **Parse Source** — Parse source framework code
2. **Extract Structure** — Extract to Canonical Schema
3. **Generate Target** — Generate target framework code
4. **Optimize** — Optimize output code

### Conversion Rules

- **Preserve Functionality** — Visual result maintained
- **Framework Best Practices** — Uses framework patterns
- **Optimize Output** — Removes redundant code
- **Maintain Structure** — Preserves component boundaries

---

## 🔗 Hybrid Approaches

### Mixed Frameworks

Structra supports hybrid approaches:

- **Tailwind + CSS Modules** — Utility classes with scoped CSS
- **Bootstrap + Custom CSS** — Bootstrap with custom styles
- **SCSS + Tailwind** — SCSS with Tailwind utilities

### Hybrid Best Practices

- Use frameworks for their strengths
- Combine frameworks thoughtfully
- Maintain consistency
- Document hybrid approach

---

## 🎯 Best Practices

### Framework Selection

1. **Project Requirements** — Choose based on project needs
2. **Team Familiarity** — Consider team expertise
3. **Performance** — Consider performance implications
4. **Maintainability** — Consider long-term maintenance

### Framework Usage

1. **Follow Conventions** — Use framework conventions
2. **Optimize Output** — Optimize generated code
3. **Test Thoroughly** — Test across browsers
4. **Document Decisions** — Document framework choices

---

## ⚠️ Limitations

### Current Limitations

1. **Framework-Specific Features** — Some features may not convert perfectly
2. **Build-Time Processing** — Cannot analyze build-time transforms
3. **Dynamic Classes** — May miss dynamically generated classes
4. **Complex JavaScript** — Cannot analyze JavaScript logic

### Workarounds

- Provide context about dynamic behavior
- Include build configuration when relevant
- Specify framework version for accuracy
- Test converted code thoroughly

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Complex Layout Handling](23%20Complex%20Layout%20Handling.md)**  
*Extreme Layouts & Edge Cases*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: Advanced Effects Library →](25%20Advanced%20Effects%20Library.md)**  
*Creative CSS Effects*

</td>
</tr>
</table>

---

</div>

