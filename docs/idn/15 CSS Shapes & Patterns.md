# 🎨 Structra — CSS Shapes & Patterns

Dokumen ini mencakup semua jenis shape dan patterns yang dapat dihasilkan oleh Structra, termasuk flower, triangle, starburst, polygon, ribbon, blob, wave, curve, custom corners, borders, section dividers, tooltips, dan loaders.

---

## 📋 Daftar Isi

- [Basic Shapes](#basic-shapes)
- [Complex Shapes](#complex-shapes)
- [Custom Corners](#custom-corners)
- [Custom Borders](#custom-borders)
- [Section Dividers](#section-dividers)
- [Tooltips & Speech Bubbles](#tooltips--speech-bubbles)
- [Loaders & Spinners](#loaders--spinners)
- [CSS Patterns](#css-patterns)

---

## 🔷 Basic Shapes

### Blob

```css
.blob {
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
}
```

### Wave

```css
.wave {
  background: linear-gradient(to right, #667eea, #764ba2);
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
}
```

### Curve

```css
.curve {
  border-radius: 50% / 100% 100% 0% 0%;
  background: #667eea;
}
```

---

## 🌸 Complex Shapes

### Flower

```css
.flower {
  aspect-ratio: 1 / 1;
  width: 200px;
  mask: 
    radial-gradient(circle at 30% 30%, black 20%, transparent 20%),
    radial-gradient(circle at 70% 30%, black 20%, transparent 20%),
    radial-gradient(circle at 50% 70%, black 20%, transparent 20%);
  mask-composite: intersect;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
}
```

### Triangle

```css
.triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid #667eea;
}

/* Menggunakan clip-path */
.triangle-clip {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  background: #667eea;
}
```

### Starburst

```css
.starburst {
  clip-path: polygon(
    50% 0%, 61% 35%, 98% 35%, 68% 57%, 
    79% 91%, 50% 70%, 21% 91%, 32% 57%, 
    2% 35%, 39% 35%
  );
  background: linear-gradient(45deg, #ffd700, #ff8c00);
}
```

### Polygon

```css
/* Hexagon */
.hexagon {
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  background: #667eea;
}

/* Octagon */
.octagon {
  clip-path: polygon(
    30% 0%, 70% 0%, 100% 30%, 100% 70%, 
    70% 100%, 30% 100%, 0% 70%, 0% 30%
  );
  background: #4ecdc4;
}
```

### Ribbon

```css
.ribbon {
  position: relative;
  background: #ff6b6b;
  clip-path: polygon(0 0, 100% 0, 95% 50%, 100% 100%, 0 100%, 5% 50%);
}

.ribbon::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-top: 20px solid #cc5555;
}
```

### Subtract

```css
.subtract {
  background: #667eea;
  clip-path: polygon(
    0% 0%, 100% 0%, 100% 100%, 0% 100%,
    20% 20%, 20% 80%, 80% 80%, 80% 20%
  );
}
```

---

## 🔲 Custom Corners

### Scooped Corners

```css
.scooped {
  clip-path: polygon(
    20px 0%, 100% 0%, 100% calc(100% - 20px), 
    calc(100% - 20px) 100%, 0% 100%, 0% 20px
  );
  background: #667eea;
}
```

### Beveled Corners

```css
.beveled {
  clip-path: polygon(
    10px 0%, 100% 0%, 100% calc(100% - 10px), 
    calc(100% - 10px) 100%, 0% 100%, 0% 10px
  );
  background: #4ecdc4;
}
```

### Zig-Zag Corners

```css
.zigzag {
  background: 
    linear-gradient(135deg, transparent 25%, #667eea 25%) 0 0/20px 20px,
    linear-gradient(225deg, transparent 25%, #667eea 25%) 0 0/20px 20px;
  background-position: 0 0, 10px 10px;
}
```

---

## 🎨 Custom Borders

### Wavy Border

```css
.wavy-border {
  position: relative;
  background: #667eea;
}

.wavy-border::before {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 20px;
  background: 
    radial-gradient(circle at 10px 0, transparent 10px, #667eea 10px);
  background-size: 20px 20px;
}
```

### Scalloped Border

```css
.scalloped {
  background: #4ecdc4;
  clip-path: polygon(
    0% 0%, 5% 10%, 10% 0%, 15% 10%, 20% 0%, 
    25% 10%, 30% 0%, 35% 10%, 40% 0%, 45% 10%, 
    50% 0%, 55% 10%, 60% 0%, 65% 10%, 70% 0%, 
    75% 10%, 80% 0%, 85% 10%, 90% 0%, 95% 10%, 
    100% 0%, 100% 100%, 0% 100%
  );
}
```

---

## 📐 Section Dividers

### Wave Divider

```css
.wave-divider {
  position: relative;
  height: 100px;
  background: #667eea;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 80%);
}
```

### Zig-Zag Divider

```css
.zigzag-divider {
  position: relative;
  height: 50px;
  background: #4ecdc4;
  clip-path: polygon(
    0 0, 5% 100%, 10% 0, 15% 100%, 20% 0, 
    25% 100%, 30% 0, 35% 100%, 40% 0, 45% 100%, 
    50% 0, 55% 100%, 60% 0, 65% 100%, 70% 0, 
    75% 100%, 80% 0, 85% 100%, 90% 0, 95% 100%, 
    100% 0, 100% 100%, 0 100%
  );
}
```

### Curved Divider

```css
.curved-divider {
  position: relative;
  height: 100px;
  background: #ff6b6b;
  border-radius: 50% / 100% 100% 0% 0%;
}
```

---

## 💬 Tooltips & Speech Bubbles

### Basic Tooltip

```css
.tooltip {
  position: relative;
  background: #333;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.tooltip::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #333;
}
```

### Speech Bubble

```css
.speech-bubble {
  position: relative;
  background: #667eea;
  color: white;
  padding: 1rem;
  border-radius: 10px;
}

.speech-bubble::before {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 20px;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 15px solid #667eea;
}
```

---

## ⏳ Loaders & Spinners

### Spinning Circle

```css
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

### Pulsing Dot

```css
.pulse-dot {
  width: 20px;
  height: 20px;
  background: #667eea;
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
}
```

### Dots Loader

```css
.dots-loader {
  display: flex;
  gap: 8px;
}

.dots-loader span {
  width: 12px;
  height: 12px;
  background: #667eea;
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite;
}

.dots-loader span:nth-child(2) {
  animation-delay: 0.2s;
}

.dots-loader span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
}
```

---

## 🎨 CSS Patterns

### Dots Pattern

```css
.dots-pattern {
  background-image: radial-gradient(circle, #667eea 1px, transparent 1px);
  background-size: 20px 20px;
}
```

### Grid Pattern

```css
.grid-pattern {
  background-image: 
    linear-gradient(#667eea 1px, transparent 1px),
    linear-gradient(90deg, #667eea 1px, transparent 1px);
  background-size: 20px 20px;
}
```

### Diagonal Lines

```css
.diagonal-pattern {
  background: 
    repeating-linear-gradient(
      45deg,
      #667eea,
      #667eea 10px,
      transparent 10px,
      transparent 20px
    );
}
```

### Checkerboard

```css
.checkerboard {
  background-image: 
    linear-gradient(45deg, #667eea 25%, transparent 25%),
    linear-gradient(-45deg, #667eea 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #667eea 75%),
    linear-gradient(-45deg, transparent 75%, #667eea 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}
```

---

## 🔗 Menggabungkan Shapes

### Flower dengan Gradient

```css
.flower-gradient {
  aspect-ratio: 1 / 1;
  width: 200px;
  mask: 
    radial-gradient(circle at 30% 30%, black 20%, transparent 20%),
    radial-gradient(circle at 70% 30%, black 20%, transparent 20%),
    radial-gradient(circle at 50% 70%, black 20%, transparent 20%);
  mask-composite: intersect;
  background: 
    radial-gradient(circle at 30% 30%, #ff6b6b, transparent),
    radial-gradient(circle at 70% 30%, #4ecdc4, transparent),
    radial-gradient(circle at 50% 70%, #ffe66d, transparent);
}
```

### Animated Blob

```css
.animated-blob {
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  animation: blob 8s ease-in-out infinite;
}

@keyframes blob {
  0%, 100% {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  }
  25% {
    border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
  }
  50% {
    border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
  }
  75% {
    border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
  }
}
```

---

## 📖 Kapan Menggunakan Setiap Shape

### Gunakan CSS-only (Mask/Clip-path) ketika:
- Shape geometris atau bisa dicapai dengan CSS
- Performa penting
- Shape tidak perlu path kompleks
- Dukungan browser memungkinkan

### Gunakan SVG ketika:
- Shape terlalu kompleks untuk CSS
- Perlu kontrol path yang presisi
- Shape memerlukan animasi path
- Gradient atau pattern kompleks diperlukan

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Advanced CSS Techniques](14%20Advanced%20CSS%20Techniques.md)**  
*Advanced CSS Techniques*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: CSS Animations & Transitions →](16%20CSS%20Animations%20%26%20Transitions.md)**  
*Animations and Transitions*

</td>
</tr>
</table>

</div>

