# 💻 Structra — Code Input & Reverse Engineering

This document explains how Structra handles code input, reverse engineering, and code refactoring across multiple CSS frameworks.

---

## 🎯 Overview

Structra can analyze existing CSS/HTML code from various frameworks and perform reverse engineering to Canonical Schema. This enables:

- **Code Analysis** — Understand the structure of existing code
- **Framework Detection** — Automatically identify frameworks
- **Reverse Engineering** — Convert code to Canonical Schema
- **Code Refactoring** — Improve code quality and maintainability
- **Framework Conversion** — Convert between different frameworks

---

## 📥 Supported Input Formats

### 1. Tailwind CSS

Structra can analyze Tailwind utility classes and convert them to structured CSS.

**Example Input:**
```html
<div class="flex items-center justify-between p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
  <h1 class="text-3xl font-bold text-white">Hero Title</h1>
  <button class="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
    Get Started
  </button>
</div>
```

**Analysis:**
- Detects Tailwind utility classes
- Extracts layout (flex, items-center, justify-between)
- Identifies spacing (p-6, px-4, py-2)
- Recognizes colors and gradients
- Detects responsive classes
- Identifies hover states and transitions

### 2. Bootstrap

Structra supports Bootstrap 3, 4, and 5.

**Example Input:**
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

**Analysis:**
- Detects Bootstrap grid system (container, row, col-*)
- Identifies Bootstrap components (card, card-body, etc.)
- Extracts spacing and sizing classes
- Recognizes Bootstrap utilities (shadow-sm, etc.)

### 3. CSS Manual (Vanilla CSS)

Structra can analyze pure CSS files and extract their structure.

**Example Input:**
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

**Analysis:**
- Parses CSS selectors and properties
- Extracts layout patterns (flex, grid, etc.)
- Identifies colors, spacing, and typography
- Detects advanced CSS features (gradients, shadows, etc.)
- Recognizes custom properties (CSS variables)

### 4. SCSS/SASS

Structra can parse SCSS syntax including nesting, variables, and mixins.

**Example Input:**
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

**Analysis:**
- Detects SCSS variables ($variables)
- Parses nested selectors
- Identifies mixins and functions
- Extracts color functions (darken, lighten, etc.)
- Converts SCSS to standard CSS structure

### 5. CSS Modules

Structra can analyze CSS Modules with scoped class names.

**Example Input:**
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

**Analysis:**
- Recognizes CSS Modules patterns
- Extracts scoped class names
- Identifies component structure
- Maintains module boundaries

### 6. PostCSS

Structra can analyze PostCSS-processed CSS with plugins.

**Example Input:**
```css
.hero {
  display: flex;
  padding: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
}
```

**Analysis:**
- Detects PostCSS features
- Parses nested media queries
- Identifies PostCSS plugins used
- Extracts processed CSS structure

---

## 🔍 Framework Detection

Structra automatically detects frameworks from code input using several heuristics:

### Detection Methods

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
   - SCSS: Variables and nesting
   - CSS Modules: Import statements

4. **Metadata Analysis**
   - Package.json dependencies
   - Build configuration files
   - Import statements

### Detection Confidence

Framework detection provides confidence levels:

- **High** — Framework indicators are clear (class patterns, file structure)
- **Medium** — Some indicators present but ambiguous
- **Low** — Generic CSS, framework unclear

---

## 🔄 Reverse Engineering Process

### Step 1: Code Parsing

Structra parses input code to extract:

- **HTML Structure** — Elements, nesting, semantic tags
- **CSS Rules** — Selectors, properties, values
- **Layout Patterns** — Grid, flex, positioning
- **Styling Strategies** — Colors, spacing, typography
- **Responsive Rules** — Media queries, breakpoints
- **Advanced Features** — Animations, transforms, filters

### Step 2: Structure Extraction

Parser extracts:

- **Sections** — Main content areas
- **Components** — Reusable UI elements
- **Layout Strategy** — Grid, flex, or hybrid approach
- **Background Strategy** — Shapes, gradients, images
- **Responsive Strategy** — Breakpoint behavior

### Step 3: Schema Generation

Extracted structure is converted to Canonical Schema:

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

Structra analyzes code quality and identifies issues:

### Detected Quality Issues

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
   - Excessive nesting (more than 5 levels)
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

Structra provides a quality score (0-100) based on:

- Code maintainability
- Semantic HTML usage
- CSS organization
- Responsive design implementation
- Performance considerations

### Refactoring Suggestions

For each issue, Structra provides:

- **Issue Type** — What the problem is
- **Severity** — High, medium, or low
- **Description** — Problem explanation
- **Location** — Where the issue occurs
- **Suggestion** — How to fix it

---

## 🔄 Code Refactoring

Structra can refactor code to improve quality:

### Refactoring Operations

1. **Extract Magic Numbers**
   - Convert hardcoded values to CSS variables
   - Use design system tokens

2. **Simplify Nesting**
   - Reduce DOM depth
   - Remove unnecessary wrappers

3. **Improve Semantic HTML**
   - Replace divs with semantic tags
   - Add proper ARIA attributes

4. **Optimize CSS**
   - Remove redundant rules
   - Consolidate similar styles
   - Fix selector specificity

5. **Enhance Responsiveness**
   - Improve breakpoint strategy
   - Use container queries when appropriate

---

## 🔀 Framework Conversion

Structra can convert code between frameworks:

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

- **Preserve Functionality** — Converted code maintains the same visual result
- **Framework Best Practices** — Use framework-specific patterns
- **Optimize Output** — Remove redundant code
- **Maintain Structure** — Preserve component boundaries

---

## 📊 Code Analysis Output

When analyzing code, Structra provides:

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

### For Code Input

1. **Provide Complete Code** — Include all relevant HTML and CSS
2. **Include Context** — Mention framework and version if known
3. **Specify Purpose** — State what you want to achieve (refactor, convert, analyze)

### For Reverse Engineering

1. **Review Schema** — Check the generated Canonical Schema
2. **Verify Structure** — Ensure sections and components are correctly identified
3. **Check Quality** — Review code quality analysis and suggestions

### For Framework Conversion

1. **Test Output** — Verify converted code works correctly
2. **Review Changes** — Check what changed during conversion
3. **Optimize Further** — Apply additional optimizations if needed

---

## ⚠️ Limitations

### Current Limitations

1. **Complex JavaScript** — Cannot analyze JavaScript logic
2. **Dynamic Classes** — May miss dynamically generated classes
3. **Build-Time Processing** — Cannot analyze build-time transformations
4. **Framework-Specific Features** — Some framework features may not convert perfectly

### Workarounds

- Provide additional context about dynamic behavior
- Include build configuration if relevant
- Specify framework version for better accuracy

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

