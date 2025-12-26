# 🔧 Structra — Engineering Constraints & Design System

Dokumen ini mendefinisikan **constraints dan aturan engineering** yang harus diikuti oleh AI di Structra.

---

## 🎯 Simplicity First Principle

AI **WAJIB** memilih solusi **paling sederhana** yang memenuhi kebutuhan.

### Priority Order

1. **Native layout** (flex / grid)
   - Gunakan CSS native layout capabilities
   - Paling maintainable dan performant

2. **Utility classes**
   - Tailwind utility classes
   - Konsisten dan mudah dipahami

3. **CSS-only solutions** (mask, clip-path, pseudo-elements)
   - Prioritaskan CSS-only shapes jika memungkinkan
   - Performa lebih baik daripada SVG untuk bentuk sederhana
   - Gunakan mask untuk cutout kompleks
   - Gunakan clip-path untuk bentuk geometris
   - Pertimbangkan kompatibilitas browser

4. **Modern CSS features** (container queries, :has(), @layer)
   - Gunakan ketika tepat untuk maintainability yang lebih baik
   - Periksa dukungan browser
   - Sediakan fallback jika diperlukan

5. **SVG shapes**
   - Untuk bentuk kompleks yang tidak bisa dicapai dengan CSS-only
   - Scalable dan maintainable
   - Gunakan ketika CSS-only tidak feasible

6. **Pseudo-elements**
   - Untuk efek dekoratif sederhana
   - Hindari jika bisa dicapai dengan layout native

7. **Background images**
   - Pilihan terakhir untuk bentuk yang sangat kompleks
   - Pertimbangkan performa dan maintainability

---

## 🚫 Forbidden Patterns

AI **DILARANG** menggunakan pattern berikut:

### Magic Numbers

❌ **DILARANG:**
```css
width: 347px;
margin-left: 23px;
```

✅ **DIPERBOLEHKAN:**
```css
width: 100%;
max-width: 28rem; /* atau menggunakan Tailwind spacing scale */
margin-left: auto; /* dengan konteks yang jelas */
```

### Nested Absolute Positioning

❌ **DILARANG:**
```html
<div style="position: absolute">
  <div style="position: absolute">
    <div style="position: absolute">
      <!-- Deep nesting -->
    </div>
  </div>
</div>
```

✅ **DIPERBOLEHKAN:**
```html
<div class="relative">
  <div class="absolute top-0 right-0">
    <!-- Single level absolute positioning dengan konteks jelas -->
  </div>
</div>
```

### Deep DOM Tree

❌ **DILARANG:**
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

✅ **DIPERBOLEHKAN:**
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

❌ **DILARANG:**
```html
<div style="color: red; padding: 10px;">
```

✅ **DIPERBOLEHKAN:**
- Tailwind classes
- CSS modules
- Inline style **HANYA** untuk SVG attributes yang dinamis

---

## 🎨 Design System Awareness

Jika design system diberikan, AI **WAJIB**:

### Follow Design Tokens

* Menggunakan token warna dari design system
* Mengikuti spacing scale yang ditentukan
* Menggunakan typography scale yang konsisten
* Menghormati border radius, shadow, dan efek lainnya

### Use Available Components

* Menggunakan komponen yang sudah ada di design system
* Tidak menciptakan komponen baru jika sudah ada yang serupa
* Mengikuti pattern komponen yang sudah ditetapkan

### No Custom Styles Outside System

* **TIDAK menciptakan style baru** di luar design system
* Jika perlu style baru, dokumentasikan dan minta persetujuan
* Mengutamakan konsistensi dibanding kebebasan visual

---

## ✅ Code Quality Rules

### Semantic HTML

✅ **HARUS:**
```html
<header>
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
    </ul>
  </nav>
</header>
```

❌ **TIDAK BOLEH:**
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

* Mulai dari mobile, kemudian expand ke desktop
* Gunakan mobile-first breakpoints
* Hindari desktop-only thinking

### Readability & Structure

* Kode harus mudah dibaca dan dipahami
* Struktur harus logis dan terorganisir
* Naming harus jelas dan deskriptif

### Visual Hierarchy

* Maintain visual hierarchy yang jelas
* Jangan mengorbankan hierarchy untuk styling
* Hierarchy harus terlihat di semua breakpoint

---

## 🎨 Advanced CSS Patterns

### Kapan Menggunakan Mask vs Clip-Path

**Gunakan CSS Mask ketika:**
- Perlu membuat cutout kompleks atau efek transparansi
- Ingin menggabungkan beberapa bentuk dengan mask-composite
- Perlu gradient masks atau image masks
- Membuat efek seperti vignettes atau spotlight effects

**Gunakan Clip-Path ketika:**
- Perlu bentuk geometris (polygon, circle, ellipse)
- Ingin memotong konten ke bentuk tertentu
- Membuat cutout sederhana atau notches
- Dukungan browser yang lebih baik diperlukan

**Contoh:**
```css
/* Mask untuk transparansi kompleks */
.masked-element {
  mask: radial-gradient(circle, transparent 20%, black 20%);
}

/* Clip-path untuk bentuk geometris */
.clipped-element {
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
}
```

### Kapan Menggunakan CSS-only vs SVG

**Prioritaskan CSS-only ketika:**
- Bentuk bisa dicapai dengan mask, clip-path, atau pseudo-elements
- Performa penting (CSS-only lebih cepat)
- Bentuk sederhana atau geometris
- Tidak perlu path kompleks atau animasi

**Gunakan SVG ketika:**
- Bentuk terlalu kompleks untuk CSS-only
- Perlu kontrol presisi atas path
- Bentuk perlu dianimasikan sepanjang path
- Bentuk memerlukan gradient atau pattern yang tidak bisa dicapai CSS

### Pertimbangan Performa untuk Advanced CSS

* **Mask dan Clip-Path**: Bisa mahal, gunakan dengan hemat
* **Backdrop-filter**: Sangat mahal, hindari di perangkat low-end
* **Complex Filters**: Uji dampak performa
* **Multiple Transforms**: Gabungkan ke dalam single transform property
* **Will-change**: Gunakan hanya ketika diperlukan untuk performance hints

### Panduan Kompatibilitas Browser

* Selalu periksa dukungan browser untuk fitur lanjutan
* Sediakan fallback untuk browser yang tidak didukung
* Gunakan feature queries (@supports) jika tepat
* Dokumentasikan requirement browser di schema

---

## 🎬 CSS Animation Rules

### Prioritaskan CSS Animations Dibanding JavaScript

✅ **WAJIB:**
- Gunakan CSS @keyframes untuk animasi
- Gunakan CSS transitions untuk perubahan state
- Animasikan hanya transform dan opacity untuk performa
- Gunakan will-change dengan hemat dan hapus setelah animasi

❌ **TIDAK BOLEH:**
- Gunakan JavaScript untuk animasi sederhana
- Animasikan properti layout (width, height, top, left)
- Buat animasi yang menyebabkan layout shifts

### Best Practices Performa

**Animasikan properti ini (GPU-accelerated):**
- `transform` (translate, rotate, scale, skew)
- `opacity`
- `filter` (gunakan dengan hati-hati)

**Hindari menganimasikan ini (menyebabkan reflow):**
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`
- `border-width`

**Contoh:**
```css
/* ✅ Baik - menganimasikan transform */
.animated {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

/* ❌ Buruk - menganimasikan width */
.animated-bad {
  animation: expand 0.3s ease-out;
}

@keyframes expand {
  from { width: 0; }
  to { width: 100%; }
}
```

### Hormati Prefers-Reduced-Motion

**WAJIB** menghormati preferensi motion pengguna:

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

### Panduan Durasi Animasi

* **Micro-interactions**: 100-200ms
* **Standard transitions**: 200-300ms
* **Complex animations**: 300-500ms
* **Page transitions**: 500ms-1s
* Hindari animasi lebih lama dari 1s kecuali diperlukan

---

## ⚠️ Exception Handling

Jika constraint tidak dapat dipenuhi karena alasan teknis yang valid:

1. **Dokumentasikan** alasan di canonical schema
2. **Jelaskan** trade-off yang terlibat
3. **Berikan alternatif** jika memungkinkan
4. **Tingkatkan risk assessment** jika diperlukan

---

## 💡 Best Practices Summary

* **Simplicity over complexity** — Pilih solusi paling sederhana
* **Maintainability over cleverness** — Kode yang mudah dipelihara lebih baik
* **Consistency over flexibility** — Konsistensi memudahkan maintenance
* **Documentation over assumptions** — Dokumentasikan semua keputusan
* **User control over automation** — Berikan user kontrol untuk menyesuaikan

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

