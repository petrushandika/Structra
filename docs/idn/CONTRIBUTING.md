# 🤝 Structra — Panduan Kontribusi

Terima kasih atas minat Anda untuk berkontribusi pada Structra! Dokumen ini menyediakan panduan dan instruksi untuk berkontribusi pada project.

---

## 📋 Daftar Isi

- [Code of Conduct](#code-of-conduct)
- [Cara Berkontribusi](#cara-berkontribusi)
- [Development Setup](#development-setup)
- [Panduan Code Style](#panduan-code-style)
- [Konvensi Commit Message](#konvensi-commit-message)
- [Proses Pull Request](#proses-pull-request)
- [Persyaratan Testing](#persyaratan-testing)
- [Dokumentasi](#dokumentasi)

---

## 📜 Code of Conduct

Dengan berpartisipasi dalam project ini, Anda setuju untuk:
- Menghormati dan inklusif
- Menyambut pendatang baru dan membantu mereka belajar
- Fokus pada feedback yang konstruktif
- Menghormati sudut pandang dan pengalaman yang berbeda

---

## 🚀 Cara Berkontribusi

### Melaporkan Bug

1. **Periksa issue yang ada** — Cari GitHub Issues untuk melihat apakah bug sudah dilaporkan
2. **Buat laporan detail**:
   - Judul dan deskripsi yang jelas
   - Langkah untuk mereproduksi
   - Perilaku yang diharapkan vs aktual
   - Pesan error dan logs
   - Informasi sistem (OS, versi Node.js, dll)
   - Screenshot jika berlaku

### Menyarankan Fitur

1. **Periksa roadmap** — Lihat [ROADMAP.md](ROADMAP.md) untuk fitur yang direncanakan
2. **Buat feature request**:
   - Deskripsi fitur yang jelas
   - Use case dan manfaat
   - Pendekatan implementasi yang mungkin
   - Contoh jika berlaku

### Berkontribusi Kode

1. **Fork repository**
2. **Buat feature branch**: `git checkout -b feature/nama-fitur-anda`
3. **Buat perubahan Anda**
4. **Tulis tests** untuk fitur baru
5. **Update dokumentasi** jika diperlukan
6. **Submit pull request**

---

## 🔧 Development Setup

### Prerequisites

- **Node.js** 18+ atau lebih baru
- **Bun** 1.0+ (untuk backend)
- **Docker** dan **Docker Compose**
- **PostgreSQL** 14+ (atau gunakan Docker)
- **Git**

### Setup Awal

1. **Clone fork Anda**:
```bash
git clone https://github.com/username-anda/structra.git
cd structra
```

2. **Tambahkan upstream remote**:
```bash
git remote add upstream https://github.com/your-org/structra.git
```

3. **Install dependencies**:
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
bun install
```

4. **Setup environment variables**:
```bash
# Copy file contoh
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

5. **Start services**:
```bash
docker-compose up -d
```

6. **Jalankan migrations**:
```bash
cd backend
bun run db:migrate
```

7. **Start development servers**:
```bash
# Terminal 1: Backend
cd backend
bun run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

Lihat [11 Getting Started](11%20Getting%20Started.md) untuk instruksi setup detail.

---

## 📝 Panduan Code Style

### TypeScript/JavaScript

- Gunakan **TypeScript** untuk semua kode baru
- Ikuti konfigurasi **ESLint** dan **Prettier**
- Gunakan **nama variabel yang bermakna**
- Tulis **kode yang self-documenting**
- Tambahkan **komentar JSDoc** untuk public APIs

**Contoh:**
```typescript
/**
 * Menganalisis gambar desain dan menghasilkan canonical schema
 * @param image - Base64 encoded image atau image URL
 * @param options - Opsi analisis
 * @returns Promise yang resolve ke canonical schema
 */
async function analyzeDesign(
  image: string,
  options?: AnalysisOptions
): Promise<CanonicalSchema> {
  // Implementasi
}
```

### Organisasi File

- **Satu komponen per file**
- **Kelompokkan file terkait** dalam direktori
- **Gunakan index files** untuk import yang bersih
- **Pisahkan concerns** (UI, logic, types)

### Konvensi Penamaan

- **Files**: `kebab-case.ts` atau `PascalCase.tsx` untuk komponen
- **Variables/Functions**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Types/Interfaces**: `PascalCase`
- **Components**: `PascalCase`

---

## 💬 Konvensi Commit Message

Ikuti format [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: Fitur baru
- `fix`: Perbaikan bug
- `docs`: Perubahan dokumentasi
- `style`: Perubahan style kode (formatting, dll)
- `refactor`: Refactoring kode
- `test`: Menambah atau memperbarui tests
- `chore`: Tugas maintenance

### Contoh

```
feat(api): tambahkan endpoint batch processing

Tambahkan endpoint /analyze/batch baru untuk memproses beberapa desain
dalam satu request. Termasuk rate limiting dan error handling.

Closes #123
```

```
fix(ai): tangani edge case dalam blob detection

Perbaiki issue di mana blob shapes tidak terdeteksi dengan benar ketika
overlapping dengan elemen teks.

Fixes #456
```

```
docs(readme): update instruksi instalasi

Tambahkan instruksi setup Docker Compose dan konfigurasi environment
variable detail.
```

---

## 🔄 Proses Pull Request

### Sebelum Submit

1. **Update branch Anda**:
```bash
git fetch upstream
git rebase upstream/main
```

2. **Jalankan tests**:
```bash
# Frontend
cd frontend
npm test

# Backend
cd ../backend
bun test
```

3. **Periksa linting**:
```bash
npm run lint
bun run lint
```

4. **Update dokumentasi** jika perubahan Anda mempengaruhi:
   - API endpoints
   - Konfigurasi
   - Pola penggunaan
   - Arsitektur

### Template Deskripsi PR

```markdown
## Deskripsi
Deskripsi singkat perubahan

## Jenis Perubahan
- [ ] Perbaikan bug
- [ ] Fitur baru
- [ ] Breaking change
- [ ] Update dokumentasi

## Testing
- [ ] Unit tests ditambahkan/diperbarui
- [ ] Integration tests ditambahkan/diperbarui
- [ ] Manual testing selesai

## Checklist
- [ ] Kode mengikuti style guidelines
- [ ] Self-review selesai
- [ ] Komentar ditambahkan untuk kode kompleks
- [ ] Dokumentasi diperbarui
- [ ] Tidak ada warning baru yang dihasilkan
- [ ] Tests lulus secara lokal
```

### Proses Review

1. **Automated checks** harus lulus (CI/CD)
2. **Code review** oleh maintainers
3. **Tanggapi feedback** dan update PR
4. **Persetujuan** dari setidaknya satu maintainer
5. **Merge** oleh maintainer

---

## 🧪 Persyaratan Testing

### Unit Tests

- **Target coverage**: 80%+
- **Test fitur baru**: Semua kode baru harus memiliki tests
- **Test perbaikan bug**: Sertakan regression tests

**Contoh:**
```typescript
describe('analyzeDesign', () => {
  it('harus menghasilkan canonical schema dari gambar', async () => {
    const image = 'base64...';
    const result = await analyzeDesign(image);
    
    expect(result).toHaveProperty('meta');
    expect(result.meta.schemaVersion).toBe('1.0');
  });
});
```

### Integration Tests

- Test API endpoints
- Test interaksi database
- Test integrasi AI pipeline

### E2E Tests

- Test alur pengguna lengkap
- Test skenario error
- Test edge cases

---

## 📚 Dokumentasi

### Dokumentasi Kode

- **JSDoc** untuk semua fungsi public
- **Definisi tipe** untuk tipe kompleks
- **Komentar inline** untuk logika kompleks

### Dokumentasi Pengguna

- Update dokumen terkait di direktori `docs/`
- Tambahkan contoh untuk fitur baru
- Update dokumentasi API jika endpoints berubah
- Update CHANGELOG.md untuk perubahan yang terlihat pengguna

### Style Dokumentasi

- Gunakan bahasa yang jelas dan ringkas
- Sertakan contoh kode
- Tambahkan diagram untuk konsep kompleks
- Cross-reference dokumen terkait

---

## 🎯 Area untuk Kontribusi

### Prioritas Tinggi

- **Perbaikan bug** — Periksa GitHub Issues
- **Peningkatan dokumentasi** — Perjelas bagian yang tidak jelas
- **Test coverage** — Tambahkan tests yang hilang
- **Optimasi performa** — Tingkatkan waktu respons

### Prioritas Menengah

- **Fitur baru** — Lihat [ROADMAP.md](ROADMAP.md)
- **Peningkatan SDK** — Tingkatkan developer experience
- **Peningkatan UI/UX** — Interface pengguna yang lebih baik
- **Contoh integrasi** — Lebih banyak use cases

### Prioritas Rendah

- **Refactoring kode** — Tingkatkan kualitas kode
- **Peningkatan tooling** — Tools dev yang lebih baik
- **Contoh** — Lebih banyak contoh kode

---

## ❓ Mendapatkan Bantuan

- **Dokumentasi**: Periksa [README.md](README.md) dan docs
- **Issues**: Cari GitHub Issues
- **Discussions**: GitHub Discussions
- **Discord**: Server Discord komunitas

---

## 🙏 Pengakuan

Kontributor akan:
- Daftar di CONTRIBUTORS.md
- Disebutkan dalam release notes untuk kontribusi signifikan
- Dikreditkan dalam dokumentasi jika berlaku

Terima kasih telah berkontribusi pada Structra! 🎉

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: CHANGELOG](CHANGELOG.md)**  
*Version History*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Dokumentasi Overview*

</td>
<td align="right">

**[Next: Troubleshooting →](TROUBLESHOOTING.md)**  
*Masalah Umum dan Solusi*

</td>
</tr>
</table>

---

<details>
<summary><b>📚 Dokumentasi Terkait</b></summary>

<table>
<tr>
<td>

**[Getting Started](11%20Getting%20Started.md)**  
Panduan setup development

</td>
<td>

**[Architecture](09%20Architecture.md)**  
Overview arsitektur sistem

</td>
</tr>
<tr>
<td>

**[Roadmap](ROADMAP.md)**  
Fitur dan peningkatan yang direncanakan

</td>
<td>

**[Code of Conduct](CONTRIBUTING.md#code-of-conduct)**  
Panduan komunitas

</td>
</tr>
</table>

</details>

</div>

