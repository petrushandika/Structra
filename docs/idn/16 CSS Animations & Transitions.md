# 🎬 Structra — CSS Animations & Transitions

Dokumen ini mencakup CSS animations dan transitions yang dapat dihasilkan oleh Structra, termasuk @keyframes, animation properties, transitions, performance best practices, dan pertimbangan aksesibilitas.

---

## 📋 Daftar Isi

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

CSS transitions menyediakan perubahan state yang halus antara nilai properti CSS.

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

CSS animations menyediakan kontrol lebih daripada transitions, memungkinkan animasi multi-step yang kompleks.

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

@keyframes mendefinisikan urutan animasi.

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

Transform animations di-accelerate oleh GPU dan performant.

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

### Animasikan Properti GPU-Accelerated

✅ **ANIMASIKAN:**
- `transform` (translate, rotate, scale, skew)
- `opacity`
- `filter` (gunakan dengan hati-hati)

❌ **JANGAN ANIMASIKAN:**
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`
- `border-width`

### Contoh: Baik vs Buruk

```css
/* ✅ Baik - menganimasikan transform */
.good-animation {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

/* ❌ Buruk - menganimasikan width */
.bad-animation {
  animation: expand 0.3s ease-out;
}

@keyframes expand {
  from { width: 0; }
  to { width: 100%; }
}
```

### Will-Change

Gunakan `will-change` dengan hemat untuk memberi hint browser tentang animasi yang akan datang:

```css
.animated-element {
  will-change: transform, opacity;
}

/* Hapus setelah animasi */
.animated-element.animation-complete {
  will-change: auto;
}
```

### Gabungkan Transforms

```css
/* ✅ Baik - single transform */
.element {
  transform: translateX(50px) rotate(45deg) scale(1.2);
}

/* ❌ Buruk - multiple transforms */
.element {
  transform: translateX(50px);
  transform: rotate(45deg);
  transform: scale(1.2);
}
```

---

## ♿ Accessibility

### Prefers-Reduced-Motion

Selalu hormati preferensi motion pengguna:

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

### Panduan Durasi Animasi

- **Micro-interactions**: 100-200ms
- **Standard transitions**: 200-300ms
- **Complex animations**: 300-500ms
- **Page transitions**: 500ms-1s
- Hindari animasi lebih lama dari 1s kecuali diperlukan

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

## 🔗 Menggabungkan Animations

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

## 📊 Tips Performa Animasi

1. **Gunakan transform dan opacity** - Ini di-accelerate oleh GPU
2. **Hindari properti layout** - Jangan animasikan width, height, margin, padding
3. **Gabungkan transforms** - Gunakan single transform property
4. **Batasi animasi simultan** - Terlalu banyak bisa menyebabkan jank
5. **Uji di perangkat low-end** - Pastikan performa halus
6. **Gunakan will-change dengan hemat** - Hanya ketika diperlukan
7. **Hapus will-change setelah animasi** - Bersihkan hints

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: CSS Shapes & Patterns](15%20CSS%20Shapes%20%26%20Patterns.md)**  
*Semua Jenis Shape dan Patterns*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: CSS-only Solutions →](17%20CSS-only%20Solutions.md)**  
*Kapan Menggunakan CSS-only vs SVG*

</td>
</tr>
</table>

</div>

