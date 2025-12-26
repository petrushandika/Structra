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

3. **SVG shapes**
   - For complex shapes that can't be achieved with CSS
   - Scalable and maintainable

4. **Pseudo-elements**
   - For simple decorative effects
   - Avoid if achievable with native layout

5. **Background images**
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

<details>
<summary><b>📚 Quick Navigation</b></summary>

<table>
<tr>
<td>

**Previous:** [Ambiguity Handling](06%20Ambiguity%20Handling.md)  
Ambiguity and failure handling

</td>
<td>

**Next:** [Tech Stack](08%20Tech%20Stack.md)  
Technologies used to build Structra

</td>
</tr>
</table>

</details>

</div>

