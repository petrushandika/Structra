# 🔧 Structra — Engineering Constraints & Design System

This document defines **constraints and engineering rules** that must be followed by AI in Structra.

---

## 🎯 Simplicity First Principle

AI **MUST** choose the **simplest** solution that meets requirements.

### Priority Order

1. **Native layout** (flex / grid)
   - Use CSS native layout capabilities
   - Most maintainable and performant

2. **Utility classes**
   - Tailwind utility classes
   - Consistent and easy to understand

3. **CSS-only solutions** (mask, clip-path, pseudo-elements)
   - Prefer CSS-only shapes when possible
   - Better performance than SVG for simple shapes
   - Use mask for complex cutouts
   - Use clip-path for geometric shapes
   - Consider browser compatibility

4. **Modern CSS features** (container queries, :has(), @layer)
   - Use when appropriate for better maintainability
   - Check browser support
   - Provide fallbacks when needed

5. **SVG shapes**
   - For complex shapes that can't be achieved with CSS-only
   - Scalable and maintainable
   - Use when CSS-only is not feasible

6. **Pseudo-elements**
   - For simple decorative effects
   - Avoid if achievable with native layout

7. **Background images**
   - Last resort for very complex shapes
   - Consider performance and maintainability

---

## 🚫 Forbidden Patterns

AI **FORBIDDEN** to use the following patterns:

### Magic Numbers

❌ **FORBIDDEN:**
```css
width: 347px;
margin-left: 23px;
```

✅ **ALLOWED:**
```css
width: 100%;
max-width: 28rem; /* or use Tailwind spacing scale */
margin-left: auto; /* with clear context */
```

### Nested Absolute Positioning

❌ **FORBIDDEN:**
```html
<div style="position: absolute">
  <div style="position: absolute">
    <div style="position: absolute">
      <!-- Deep nesting -->
    </div>
  </div>
</div>
```

✅ **ALLOWED:**
```html
<div class="relative">
  <div class="absolute top-0 right-0">
    <!-- Single level absolute positioning with clear context -->
  </div>
</div>
```

### Deep DOM Tree

❌ **FORBIDDEN:**
```html
<div>
  <div>
    <div>
      <div>
        <div>
          <!-- Unnecessary nesting -->
        </div>
      </div>
    </div>
  </div>
</div>
```

✅ **ALLOWED:**
```html
<section>
  <div class="container">
    <div class="content">
      <!-- Semantic and purposeful nesting -->
    </div>
  </div>
</section>
```

### Inline Styles

❌ **FORBIDDEN:**
```html
<div style="color: red; padding: 10px;">
```

✅ **ALLOWED:**
- Tailwind classes
- CSS modules
- Inline style **ONLY** for dynamic SVG attributes

---

## 🎨 Design System Awareness

If design system is provided, AI **MUST**:

### Follow Design Tokens

* Use color tokens from design system
* Follow specified spacing scale
* Use consistent typography scale
* Respect border radius, shadows, and other effects

### Use Available Components

* Use components already in design system
* Don't create new components if similar ones exist
* Follow established component patterns

### No Custom Styles Outside System

* **DO NOT create new styles** outside design system
* If new styles needed, document and request approval
* Prioritize consistency over visual freedom

---

## ✅ Code Quality Rules

### Semantic HTML

✅ **MUST:**
```html
<header>
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
    </ul>
  </nav>
</header>
```

❌ **MUST NOT:**
```html
<div class="header">
  <div class="nav">
    <div class="list">
      <div class="item"><div class="link">Home</div></div>
    </div>
  </div>
</div>
```

### Responsive-First Approach

* Start from mobile, then expand to desktop
* Use mobile-first breakpoints
* Avoid desktop-only thinking

### Readability & Structure

* Code must be easy to read and understand
* Structure must be logical and organized
* Naming must be clear and descriptive

### Visual Hierarchy

* Maintain clear visual hierarchy
* Don't sacrifice hierarchy for styling
* Hierarchy must be visible at all breakpoints

---

## 🎨 Advanced CSS Patterns

### When to Use Mask vs Clip-Path

**Use CSS Mask when:**
- Need to create complex cutouts or transparency effects
- Want to combine multiple shapes with mask-composite
- Need gradient masks or image masks
- Creating effects like vignettes or spotlight effects

**Use Clip-Path when:**
- Need geometric shapes (polygon, circle, ellipse)
- Want to clip content to a specific shape
- Creating simple cutouts or notches
- Better browser support is required

**Example:**
```css
/* Mask for complex transparency */
.masked-element {
  mask: radial-gradient(circle, transparent 20%, black 20%);
}

/* Clip-path for geometric shape */
.clipped-element {
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
}
```

### When to Use CSS-only vs SVG

**Prefer CSS-only when:**
- Shape can be achieved with mask, clip-path, or pseudo-elements
- Performance is critical (CSS-only is faster)
- Shape is simple or geometric
- No need for complex paths or animations

**Use SVG when:**
- Shape is too complex for CSS-only
- Need precise control over paths
- Shape needs to be animated along a path
- Shape requires gradients or patterns that CSS can't achieve

### Performance Considerations for Advanced CSS

* **Mask and Clip-Path**: Can be expensive, use sparingly
* **Backdrop-filter**: Very expensive, avoid on low-end devices
* **Complex Filters**: Test performance impact
* **Multiple Transforms**: Combine into single transform property
* **Will-change**: Use only when necessary for performance hints

### Browser Compatibility Guidelines

* Always check browser support for advanced features
* Provide fallbacks for unsupported browsers
* Use feature queries (@supports) when appropriate
* Document browser requirements in schema

---

## 🎬 CSS Animation Rules

### Prefer CSS Animations Over JavaScript

✅ **MUST:**
- Use CSS @keyframes for animations
- Use CSS transitions for state changes
- Animate only transform and opacity for performance
- Use will-change sparingly and remove after animation

❌ **MUST NOT:**
- Use JavaScript for simple animations
- Animate layout properties (width, height, top, left)
- Create animations that cause layout shifts

### Performance Best Practices

**Animate these properties (GPU-accelerated):**
- `transform` (translate, rotate, scale, skew)
- `opacity`
- `filter` (use with caution)

**Avoid animating these (causes reflow):**
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`
- `border-width`

**Example:**
```css
/* ✅ Good - animates transform */
.animated {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

/* ❌ Bad - animates width */
.animated-bad {
  animation: expand 0.3s ease-out;
}

@keyframes expand {
  from { width: 0; }
  to { width: 100%; }
}
```

### Respect Prefers-Reduced-Motion

**MUST** respect user's motion preferences:

```css
.animated {
  animation: slideIn 0.3s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .animated {
    animation: none;
  }
}
```

### Animation Duration Guidelines

* **Micro-interactions**: 100-200ms
* **Standard transitions**: 200-300ms
* **Complex animations**: 300-500ms
* **Page transitions**: 500ms-1s
* Avoid animations longer than 1s unless necessary

---

## ⚠️ Exception Handling

If constraint cannot be met due to valid technical reasons:

1. **Document** the reason in canonical schema
2. **Explain** trade-offs involved
3. **Provide alternatives** if possible
4. **Increase risk assessment** if needed

---

## 💡 Best Practices Summary

* **Simplicity over complexity** — Choose simplest solution
* **Maintainability over cleverness** — Easily maintainable code is better
* **Consistency over flexibility** — Consistency facilitates maintenance
* **Documentation over assumptions** — Document all decisions
* **User control over automation** — Give users control to adjust

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Ambiguity Handling](06%20Ambiguity%20Handling.md)**  
*Ambiguity & Failure Handling*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: Tech Stack →](08%20Tech%20Stack.md)**  
*Tech Stack Documentation*

</td>
</tr>
</table>

---

</div>

