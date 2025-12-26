# 🎬 Structra — CSS Animations & Transitions

This document covers CSS animations and transitions that Structra can generate, including @keyframes, animation properties, transitions, performance best practices, and accessibility considerations.

---

## 📋 Table of Contents

- [CSS Transitions](#css-transitions)
- [CSS Animations](#css-animations)
- [@keyframes](#keyframes)
- [Animation Properties](#animation-properties)
- [Transform Animations](#transform-animations)
- [Performance Best Practices](#performance-best-practices)
- [Accessibility](#accessibility)
- [Common Animation Patterns](#common-animation-patterns)

---

## 🔄 CSS Transitions

CSS transitions provide smooth state changes between CSS property values.

### Basic Syntax

```css
.element {
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
}

/* Shorthand */
.element {
  transition: background-color 0.3s ease-in-out;
}
```

### Multiple Properties

```css
.element {
  transition: 
    background-color 0.3s ease-in-out,
    transform 0.2s ease-out,
    opacity 0.3s ease-in;
}
```

### All Properties

```css
.element {
  transition: all 0.3s ease-in-out;
}
```

### Timing Functions

```css
/* Ease (default) */
.ease { transition-timing-function: ease; }

/* Linear */
.linear { transition-timing-function: linear; }

/* Ease-in */
.ease-in { transition-timing-function: ease-in; }

/* Ease-out */
.ease-out { transition-timing-function: ease-out; }

/* Ease-in-out */
.ease-in-out { transition-timing-function: ease-in-out; }

/* Cubic Bezier */
.custom { transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); }

/* Steps */
.steps { transition-timing-function: steps(4, end); }
```

### Common Use Cases

```css
/* Hover effects */
.button {
  background-color: #667eea;
  transition: background-color 0.2s ease-out;
}

.button:hover {
  background-color: #5568d3;
}

/* Transform transitions */
.card {
  transform: scale(1);
  transition: transform 0.3s ease-out;
}

.card:hover {
  transform: scale(1.05);
}
```

---

## 🎬 CSS Animations

CSS animations provide more control than transitions, allowing complex multi-step animations.

### Basic Syntax

```css
.element {
  animation-name: fadeIn;
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

/* Shorthand */
.element {
  animation: fadeIn 0.5s ease-in-out;
}
```

### Animation Properties

```css
.element {
  /* Name */
  animation-name: slideIn;
  
  /* Duration */
  animation-duration: 1s;
  
  /* Timing function */
  animation-timing-function: ease-in-out;
  
  /* Delay */
  animation-delay: 0.2s;
  
  /* Iteration count */
  animation-iteration-count: 3; /* or infinite */
  
  /* Direction */
  animation-direction: normal; /* or reverse, alternate, alternate-reverse */
  
  /* Fill mode */
  animation-fill-mode: forwards; /* or backwards, both, none */
  
  /* Play state */
  animation-play-state: running; /* or paused */
}
```

---

## 🎯 @keyframes

@keyframes define the animation sequence.

### Basic Keyframes

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

### Percentage-based Keyframes

```css
@keyframes slideIn {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
```

### Multiple Keyframes

```css
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30px);
  }
}
```

---

## 🎨 Transform Animations

Transform animations are GPU-accelerated and performant.

### Translate

```css
@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
```

### Rotate

```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

### Scale

```css
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
```

### Combined Transforms

```css
@keyframes complex {
  0% {
    transform: translateX(-100%) rotate(0deg) scale(0.8);
  }
  50% {
    transform: translateX(0) rotate(180deg) scale(1.1);
  }
  100% {
    transform: translateX(100%) rotate(360deg) scale(1);
  }
}
```

---

## ⚡ Performance Best Practices

### Animate GPU-Accelerated Properties

✅ **DO animate:**
- `transform` (translate, rotate, scale, skew)
- `opacity`
- `filter` (use with caution)

❌ **DON'T animate:**
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`
- `border-width`

### Example: Good vs Bad

```css
/* ✅ Good - animates transform */
.good-animation {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

/* ❌ Bad - animates width */
.bad-animation {
  animation: expand 0.3s ease-out;
}

@keyframes expand {
  from { width: 0; }
  to { width: 100%; }
}
```

### Will-Change

Use `will-change` sparingly to hint the browser about upcoming animations:

```css
.animated-element {
  will-change: transform, opacity;
}

/* Remove after animation */
.animated-element.animation-complete {
  will-change: auto;
}
```

### Combine Transforms

```css
/* ✅ Good - single transform */
.element {
  transform: translateX(50px) rotate(45deg) scale(1.2);
}

/* ❌ Bad - multiple transforms */
.element {
  transform: translateX(50px);
  transform: rotate(45deg);
  transform: scale(1.2);
}
```

---

## ♿ Accessibility

### Prefers-Reduced-Motion

Always respect user's motion preferences:

```css
.animated {
  animation: slideIn 0.3s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .animated {
    animation: none;
  }
  
  .transitioned {
    transition: none;
  }
}
```

### Animation Duration Guidelines

- **Micro-interactions**: 100-200ms
- **Standard transitions**: 200-300ms
- **Complex animations**: 300-500ms
- **Page transitions**: 500ms-1s
- Avoid animations longer than 1s unless necessary

---

## 🎭 Common Animation Patterns

### Fade In

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}
```

### Slide In

```css
@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in-left {
  animation: slideInLeft 0.4s ease-out;
}
```

### Bounce

```css
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30px);
  }
}

.bounce {
  animation: bounce 0.6s ease-in-out;
}
```

### Pulse

```css
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}
```

### Shake

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
}

.shake {
  animation: shake 0.5s ease-in-out;
}
```

### Rotate

```css
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.rotate {
  animation: rotate 2s linear infinite;
}
```

### Loading Skeleton

```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 0%,
    #e0e0e0 50%,
    #f0f0f0 100%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}
```

---

## 🔗 Combining Animations

### Multiple Animations

```css
.element {
  animation: 
    fadeIn 0.5s ease-out,
    slideIn 0.5s ease-out 0.2s;
}
```

### Staggered Animations

```css
.item:nth-child(1) { animation-delay: 0s; }
.item:nth-child(2) { animation-delay: 0.1s; }
.item:nth-child(3) { animation-delay: 0.2s; }
.item:nth-child(4) { animation-delay: 0.3s; }
```

### Animation Sequences

```css
@keyframes sequence {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  33% {
    transform: translateY(-20px) scale(1.1);
    opacity: 0.8;
  }
  66% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
```

---

## 📊 Animation Performance Tips

1. **Use transform and opacity** - These are GPU-accelerated
2. **Avoid layout properties** - Don't animate width, height, margin, padding
3. **Combine transforms** - Use single transform property
4. **Limit simultaneous animations** - Too many can cause jank
5. **Test on low-end devices** - Ensure smooth performance
6. **Use will-change sparingly** - Only when necessary
7. **Remove will-change after animation** - Clean up hints

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: CSS Shapes & Patterns](15%20CSS%20Shapes%20%26%20Patterns.md)**  
*All Shape Types and Patterns*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: CSS-only Solutions →](17%20CSS-only%20Solutions.md)**  
*When to Use CSS-only vs SVG*

</td>
</tr>
</table>

</div>

