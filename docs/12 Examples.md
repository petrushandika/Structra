# 💡 Structra — Examples & Use Cases

This document contains examples of Structra usage in various real-world scenarios.

---

## 🎨 Example 1: Hero Section with Blob Background

### Input

**Design:** Hero section with organic blob background on the right, text on the left, and CTA button.

**Textual Description:**
```
Hero section with:
- Organic blob background on the right
- Headline and description on the left
- Primary CTA button
- Asymmetric layout
```

### Canonical Schema Output

```json
{
  "meta": {
    "schemaVersion": "1.0",
    "inputType": ["image", "text"],
    "frameworkTarget": ["tailwind", "react"],
    "confidenceLevel": "high"
  },
  "sections": [
    {
      "id": "hero",
      "role": "primary",
      "layout": "grid",
      "asymmetric": true,
      "description": "Hero section with left-aligned content and right background blob"
    }
  ],
  "components": [
    {
      "name": "HeroContent",
      "type": "container",
      "responsibility": "Text content and CTA",
      "reusable": false,
      "parentSection": "hero"
    },
    {
      "name": "HeroBlob",
      "type": "presentational",
      "responsibility": "Decorative background shape",
      "reusable": true,
      "parentSection": "hero"
    }
  ],
  "layoutStrategy": {
    "mainApproach": "grid",
    "reason": "Asymmetric layout with clear column separation, grid facilitates responsive behavior"
  },
  "backgroundStrategy": {
    "type": "svg",
    "shape": "blob",
    "position": "right",
    "reason": "Complex organic shape better handled with SVG for full control and scalability"
  },
  "layering": {
    "zIndexStrategy": "minimal",
    "positioning": "relative-with-absolute-children",
    "reason": "Maintain predictable stacking context with minimal z-index"
  },
  "responsiveRules": [
    {
      "breakpoint": "mobile",
      "action": "restructure",
      "description": "Blob moved behind content, layout becomes single column"
    }
  ],
  "assumptions": [
    "Blob is decorative element, not interactive",
    "Mobile breakpoint at 768px"
  ],
  "ambiguities": []
}
```

### Generated Code

**HTML + Tailwind:**

```html
<section class="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center overflow-hidden">
  <!-- Content -->
  <div class="relative z-10 px-6 py-20 lg:px-12">
    <h1 class="text-4xl lg:text-6xl font-bold mb-6">
      Welcome to Structra
    </h1>
    <p class="text-lg text-gray-600 mb-8">
      Transform your designs into clean, maintainable frontend code.
    </p>
    <button class="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
      Get Started
    </button>
  </div>

  <!-- Blob Background -->
  <div class="absolute right-0 top-0 w-full lg:w-1/2 h-full opacity-20">
    <svg viewBox="0 0 500 500" class="w-full h-full">
      <path d="M250,250 Q300,200 350,250 T450,250 Q400,300 350,250 T250,250 Z" 
            fill="currentColor" 
            class="text-blue-500"/>
    </svg>
  </div>
</section>
```

**React Component:**

```tsx
export function Hero() {
  return (
    <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center overflow-hidden">
      <div className="relative z-10 px-6 py-20 lg:px-12">
        <h1 className="text-4xl lg:text-6xl font-bold mb-6">
          Welcome to Structra
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Transform your designs into clean, maintainable frontend code.
        </p>
        <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
          Get Started
        </button>
      </div>
      <HeroBlob />
    </section>
  );
}
```

### Quality Assessment

```json
{
  "visualConfidence": "high",
  "structuralConfidence": "high",
  "responsiveRisk": "low",
  "maintainabilityRisk": "low",
  "manualAdjustmentNeeded": "minor"
}
```

**Notes:**
- SVG blob path may need fine-tuning to match exact design
- Colors need to be adjusted to design system
- Spacing may need adjustment for pixel-perfect

---

## 🎨 Example 2: Card Grid with Wave Background

### Input

**Design:** Grid of cards with wave background at the bottom.

**Textual Description:**
```
Features section with:
- 3-column card grid
- Wave background at bottom
- Responsive: 1 column mobile, 3 columns desktop
```

### Key Decisions in Schema

```json
{
  "layoutStrategy": {
    "mainApproach": "grid",
    "reason": "Card grid requires consistent spacing and alignment, CSS Grid ideal for this"
  },
  "backgroundStrategy": {
    "type": "svg",
    "shape": "wave",
    "position": "bottom",
    "reason": "Wave shape better with SVG for smooth curves"
  },
  "responsiveRules": [
    {
      "breakpoint": "mobile",
      "action": "restructure",
      "description": "Grid becomes 1 column, wave remains at bottom"
    }
  ]
}
```

### Generated Code

```html
<section class="relative py-20">
  <!-- Cards Grid -->
  <div class="container mx-auto px-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-bold mb-2">Feature 1</h3>
        <p class="text-gray-600">Description of feature 1</p>
      </div>
      <!-- More cards... -->
    </div>
  </div>

  <!-- Wave Background -->
  <div class="absolute bottom-0 left-0 w-full">
    <svg viewBox="0 0 1440 120" class="w-full h-auto">
      <path d="M0,60 Q360,0 720,60 T1440,60 L1440,120 L0,120 Z" 
            fill="currentColor" 
            class="text-blue-100"/>
    </svg>
  </div>
</section>
```

---

## 🎨 Example 3: Complex Asymmetric Layout

### Input

**Design:** Complex layout with multiple overlapping sections, gradient backgrounds, and custom shapes.

### Challenges Identified

```json
{
  "ambiguities": [
    {
      "area": "overlapping-sections",
      "issue": "Exact z-index layering unclear from image",
      "alternatives": ["minimal-z-index", "moderate-z-index"],
      "chosen": "minimal-z-index",
      "reason": "Minimal z-index more maintainable, with relative positioning for children"
    }
  ],
  "assumptions": [
    "Overlapping sections are intentional design choice",
    "Gradient colors approximate from image analysis"
  ]
}
```

### Quality Assessment

```json
{
  "visualConfidence": "medium",
  "structuralConfidence": "high",
  "responsiveRisk": "high",
  "maintainabilityRisk": "medium",
  "manualAdjustmentNeeded": "moderate"
}
```

**Notes:**
- Complex layout requires careful responsive handling
- Z-index strategy needs manual review
- Gradient colors need fine-tuning

---

## 🔄 Before/After Comparison

### Before (Manual Implementation)

**Problems:**
- Trial-and-error for positioning
- Magic numbers in CSS
- Deep nesting without reason
- No decision documentation
- Difficult to maintain and modify

```css
/* ❌ Before */
.hero {
  position: relative;
  width: 100%;
  height: 600px;
  padding: 80px 0 0 120px; /* Magic numbers */
}

.hero-blob {
  position: absolute;
  top: -50px;
  right: -100px;
  width: 700px;
  height: 800px;
  /* Complex SVG inline */
}
```

### After (Structra Generated)

**Benefits:**
- Clear structure with semantic HTML
- Responsive-first approach
- Documented decisions
- Maintainable and scalable

```html
<!-- ✅ After -->
<section class="relative min-h-screen grid grid-cols-1 lg:grid-cols-2">
  <div class="relative z-10 px-6 lg:px-12">
    <!-- Content -->
  </div>
  <HeroBlob />
</section>
```

---

## 💼 Enterprise Use Case: Design System Integration

### Scenario

Large company with established design system wants to use Structra while maintaining consistency.

### Solution

```javascript
const result = await client.analyze({
  image: './design.png',
  options: {
    designSystem: {
      colors: companyDesignSystem.colors,
      spacing: companyDesignSystem.spacing,
      typography: companyDesignSystem.typography,
      components: companyDesignSystem.components
    }
  }
});
```

### Result

- Generated code uses design tokens
- Components from design system are used
- Consistency maintained
- Easy to maintain

---

## 🎯 Best Practices from Examples

### 1. Always Review Schema First

Don't immediately generate code. Review schema to:
- Check assumptions
- Verify ambiguities
- Adjust responsive rules
- Edit layout strategy if needed

### 2. Iterate and Refine

1. Generate initial schema
2. Review and edit
3. Generate code
4. Test and adjust
5. Regenerate if needed

### 3. Use Quality Assessment

Quality assessment helps:
- Set realistic expectations
- Identify areas needing attention
- Plan manual adjustments
- Communicate with team

### 4. Document Customizations

If you modify generated code:
- Document why
- Note deviations from schema
- Update schema if needed

---

## 📚 More Examples

### Example Gallery

- **Landing Pages** - Hero sections, feature grids, testimonials
- **Dashboards** - Complex layouts, data tables, charts
- **E-commerce** - Product cards, checkout flows
- **Portfolios** - Creative layouts, image galleries
- **SaaS Apps** - Settings pages, forms, modals

---

## 🔗 Related Documentation

- [03 Canonical Schema](03%20Canonical%20Schema.md) - Understand schema structure
- [05 Quality Assessment](05%20Quality%20Assessment.md) - Learn about quality metrics
- [07 Engineering Constraints](07%20Engineering%20Constraints.md) - See constraints in action
- [11 Getting Started](11%20Getting%20Started.md) - Start using Structra

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Getting Started](11%20Getting%20Started.md)**  
*Getting Started Guide*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: Prompt Templates →](13%20Prompt%20Templates.md)**  
*Prompt Templates*

</td>
</tr>
</table>

---

<details>
<summary><b>📚 Quick Navigation</b></summary>

<table>
<tr>
<td>

**Previous:** [Getting Started](11%20Getting%20Started.md)  
Installation, setup, and first steps guide

</td>
<td>

**Next:** [Prompt Templates](13%20Prompt%20Templates.md)  
Prompt templates for role-based reasoning

</td>
</tr>
</table>

</details>

</div>

