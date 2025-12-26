# 🔧 Structra — Panduan Troubleshooting

Masalah umum, solusi, dan tips debugging untuk Structra.

---

## 📋 Daftar Isi

- [Masalah Instalasi](#masalah-instalasi)
- [Error API](#error-api)
- [Masalah Model AI](#masalah-model-ai)
- [Masalah Database](#masalah-database)
- [Masalah Performa](#masalah-performa)
- [Masalah Code Generation](#masalah-code-generation)
- [Tips Debugging](#tips-debugging)

---

## 🔧 Masalah Instalasi

### Docker Services Tidak Start

**Masalah:** Docker Compose services gagal start.

**Solusi:**

1. **Periksa status Docker**:
```bash
docker ps
docker-compose ps
```

2. **Periksa logs**:
```bash
docker-compose logs
docker-compose logs postgres
docker-compose logs redis
```

3. **Restart services**:
```bash
docker-compose down
docker-compose up -d
```

4. **Periksa konflik port**:
```bash
# Periksa apakah port sedang digunakan
netstat -an | grep 5432  # PostgreSQL
netstat -an | grep 6379  # Redis
netstat -an | grep 9000  # MinIO
```

### Dependencies Installation Gagal

**Masalah:** `npm install` atau `bun install` gagal.

**Solusi:**

1. **Bersihkan cache**:
```bash
# npm
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# bun
bun install --force
```

2. **Periksa versi Node.js/Bun**:
```bash
node --version  # Harus 18+
bun --version   # Harus 1.0+
```

3. **Gunakan package manager yang benar**:
```bash
# Frontend menggunakan npm
cd frontend
npm install

# Backend menggunakan bun
cd backend
bun install
```

### Environment Variables Tidak Ter-load

**Masalah:** Environment variables tidak terbaca.

**Solusi:**

1. **Periksa nama file**:
   - Frontend: `.env.local` (bukan `.env`)
   - Backend: `.env`

2. **Verifikasi lokasi file**:
   - Frontend: `frontend/.env.local`
   - Backend: `backend/.env`

3. **Periksa syntax**:
```env
# Format yang benar
DATABASE_URL=postgresql://user:password@localhost:5432/structra
GEMINI_API_KEY=your_key_here

# Tidak ada spasi di sekitar =
# Tidak perlu quotes (kecuali value mengandung spasi)
```

---

## 🔴 Error API

### 401 Unauthorized

**Masalah:** API mengembalikan 401 Unauthorized.

**Solusi:**

1. **Periksa API key**:
```bash
# Verifikasi key benar
curl -H "Authorization: Bearer YOUR_API_KEY" https://api.structra.com/v1/health
```

2. **Periksa format header**:
```http
Authorization: Bearer YOUR_API_KEY
# Bukan: Authorization: YOUR_API_KEY
# Bukan: Bearer: YOUR_API_KEY
```

3. **Regenerate API key** jika terkompromi

### 429 Rate Limit Exceeded

**Masalah:** Error terlalu banyak request.

**Solusi:**

1. **Periksa rate limit headers**:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1640995200
```

2. **Implementasikan request queuing**:
```javascript
// Tunggu sebelum retry
const waitTime = (resetTime - Date.now()) / 1000;
await new Promise(resolve => setTimeout(resolve, waitTime * 1000));
```

3. **Upgrade tier** untuk limit lebih tinggi
4. **Implementasikan caching** untuk mengurangi requests

### 400 Bad Request

**Masalah:** Format request tidak valid.

**Solusi:**

1. **Validasi request body**:
```javascript
// Periksa field yang diperlukan
if (!image && !imageUrl) {
  throw new Error('Image atau imageUrl diperlukan');
}

// Periksa format gambar
if (!image.match(/^data:image\/(png|jpeg|jpg);base64,/)) {
  throw new Error('Format gambar tidak valid');
}
```

2. **Periksa ukuran gambar** (max 10MB):
```javascript
const imageSize = Buffer.from(image, 'base64').length;
if (imageSize > 10 * 1024 * 1024) {
  throw new Error('Gambar terlalu besar (max 10MB)');
}
```

3. **Verifikasi format JSON**:
```bash
# Test dengan curl
curl -X POST https://api.structra.com/v1/analyze \
  -H "Content-Type: application/json" \
  -d @request.json
```

### 500 Internal Server Error

**Masalah:** Server error.

**Solusi:**

1. **Periksa server logs**:
```bash
# Backend logs
cd backend
bun run dev
# Periksa console output

# Docker logs
docker-compose logs backend
```

2. **Verifikasi layanan AI**:
```bash
# Periksa Gemini API
curl https://generativelanguage.googleapis.com/v1/models

# Periksa Ollama
curl http://localhost:11434/api/tags
```

3. **Periksa koneksi database**:
```bash
psql -h localhost -U user -d structra
```

---

## 🤖 Masalah Model AI

### Gemini API Tidak Merespons

**Masalah:** Panggilan Gemini API gagal.

**Solusi:**

1. **Periksa API key**:
```bash
# Test API key
curl "https://generativelanguage.googleapis.com/v1/models?key=YOUR_API_KEY"
```

2. **Periksa quota**:
   - Verifikasi quota di Google Cloud Console
   - Periksa status billing
   - Review usage limits

3. **Tangani rate limits**:
```javascript
// Implementasikan retry dengan exponential backoff
async function callGeminiWithRetry(prompt, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await callGemini(prompt);
    } catch (error) {
      if (error.status === 429 && i < maxRetries - 1) {
        await sleep(Math.pow(2, i) * 1000);
        continue;
      }
      throw error;
    }
  }
}
```

### Ollama Tidak Merespons

**Masalah:** Instance Ollama lokal tidak bekerja.

**Solusi:**

1. **Periksa apakah Ollama berjalan**:
```bash
curl http://localhost:11434/api/tags
```

2. **Start Ollama**:
```bash
ollama serve
```

3. **Pull model yang diperlukan**:
```bash
ollama pull mistral
ollama pull llama2
ollama pull deepseek
```

4. **Periksa ketersediaan model**:
```bash
ollama list
```

5. **Verifikasi OLLAMA_URL** di `.env`:
```env
OLLAMA_URL=http://localhost:11434
```

### Respons AI Lambat

**Masalah:** Analisis AI memakan waktu terlalu lama.

**Solusi:**

1. **Optimalkan ukuran gambar**:
```javascript
// Resize gambar besar sebelum mengirim
const resizedImage = await resizeImage(image, { maxWidth: 1920 });
```

2. **Gunakan caching**:
```javascript
// Cache request serupa
const cacheKey = generateCacheKey(image, options);
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);
```

3. **Periksa pemilihan model**:
   - Gunakan model lebih cepat untuk desain sederhana
   - Gunakan Ollama untuk pemrosesan lokal
   - Pertimbangkan trade-off ukuran model vs kecepatan

---

## 💾 Masalah Database

### Connection Refused

**Masalah:** Tidak dapat terhubung ke PostgreSQL.

**Solusi:**

1. **Periksa apakah PostgreSQL berjalan**:
```bash
docker ps | grep postgres
# atau
ps aux | grep postgres
```

2. **Periksa connection string**:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/structra
# Verifikasi: user, password, host, port, nama database
```

3. **Test koneksi**:
```bash
psql -h localhost -U user -d structra
```

4. **Periksa Docker logs**:
```bash
docker-compose logs postgres
```

### Migration Errors

**Masalah:** Database migrations gagal.

**Solusi:**

1. **Reset database** (development saja):
```bash
cd backend
bun run db:reset
```

2. **Jalankan migrations manual**:
```bash
bun run db:migrate
```

3. **Periksa status migration**:
```bash
bun run db:migrate:status
```

4. **Perbaiki konflik migration**:
```bash
# Review file migration
# Selesaikan konflik
# Jalankan ulang migrations
```

### Query Performance Issues

**Masalah:** Query database lambat.

**Solusi:**

1. **Tambahkan indexes**:
```sql
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_analyses_created_at ON analyses(created_at);
```

2. **Optimalkan queries**:
```typescript
// Gunakan select untuk membatasi field
const projects = await prisma.project.findMany({
  select: { id: true, name: true },
  where: { userId },
});
```

3. **Gunakan connection pooling**:
```env
DATABASE_URL=postgresql://...?connection_limit=10
```

---

## ⚡ Masalah Performa

### API Response Lambat

**Masalah:** API memakan waktu terlalu lama untuk merespons.

**Solusi:**

1. **Aktifkan caching**:
```javascript
// Cache respons AI
const cached = await redis.get(cacheKey);
if (cached) return cached;
```

2. **Optimalkan image processing**:
```javascript
// Proses gambar secara asinkron
const processed = await processImageAsync(image);
```

3. **Gunakan database indexes**:
```sql
CREATE INDEX idx_analyses_project_id ON analyses(project_id);
```

4. **Monitor performa**:
```javascript
// Tambahkan timing logs
const start = Date.now();
const result = await analyzeDesign(image);
console.log(`Analisis memakan waktu ${Date.now() - start}ms`);
```

### Penggunaan Memori Tinggi

**Masalah:** Aplikasi menggunakan terlalu banyak memori.

**Solusi:**

1. **Optimalkan penanganan gambar**:
```javascript
// Stream gambar besar alih-alih memuat ke memori
const stream = fs.createReadStream(imagePath);
```

2. **Batasi concurrent requests**:
```javascript
// Gunakan queue untuk pemrosesan
const queue = new PQueue({ concurrency: 3 });
await queue.add(() => processRequest(request));
```

3. **Bersihkan cache secara berkala**:
```javascript
// Set TTL pada cache entries
await redis.setex(cacheKey, 3600, JSON.stringify(data));
```

---

## 💻 Masalah Code Generation

### Kode yang Dihasilkan Tidak Cocok dengan Desain

**Masalah:** Output tidak sesuai dengan input desain.

**Solusi:**

1. **Review quality assessment**:
```json
{
  "visualConfidence": "medium",
  "manualAdjustmentNeeded": "moderate"
}
```

2. **Edit canonical schema** sebelum code generation:
   - Sesuaikan layout strategy
   - Modifikasi responsive rules
   - Update assumptions

3. **Berikan input yang lebih baik**:
   - Gambar resolusi lebih tinggi
   - Deskripsi desain yang lebih jelas
   - Design system tokens

### Validasi Schema Gagal

**Masalah:** Canonical schema tidak valid.

**Solusi:**

1. **Periksa field yang diperlukan**:
```json
{
  "meta": { "schemaVersion": "1.0" },
  "sections": [],
  "components": []
}
```

2. **Validasi schema**:
```bash
# Gunakan endpoint validasi
curl -X POST /validate-schema \
  -H "Content-Type: application/json" \
  -d @schema.json
```

3. **Perbaiki masalah umum**:
   - Missing `meta.schemaVersion`
   - Empty `sections` array
   - Invalid `layoutStrategy` values

---

## 🐛 Tips Debugging

### Aktifkan Debug Logging

**Set environment variable debug**:
```env
DEBUG=structra:*
LOG_LEVEL=debug
```

### Periksa Logs

**Backend logs**:
```bash
cd backend
bun run dev
# Periksa console output
```

**Frontend logs**:
```bash
cd frontend
npm run dev
# Periksa browser console
```

**Docker logs**:
```bash
docker-compose logs -f
```

### Gunakan API Testing Tools

**Test dengan curl**:
```bash
curl -X POST http://localhost:3001/api/v1/analyze \
  -H "Authorization: Bearer test-key" \
  -H "Content-Type: application/json" \
  -d '{"image": "base64..."}'
```

**Test dengan Postman/Insomnia**:
- Import dokumentasi API
- Setup environment variables
- Test endpoints secara individual

### Perintah Debugging Umum

```bash
# Periksa status service
docker-compose ps

# Lihat logs
docker-compose logs -f service-name

# Restart service
docker-compose restart service-name

# Periksa database
psql -h localhost -U user -d structra

# Test API
curl http://localhost:3001/health

# Periksa Redis
redis-cli ping
```

---

## 📚 Sumber Tambahan

- **[Getting Started](11%20Getting%20Started.md)** — Panduan setup
- **[API Documentation](10%20API%20Documentation.md)** — Referensi API
- **[Architecture](09%20Architecture.md)** — Arsitektur sistem
- **[FAQ](FAQ.md)** — Pertanyaan yang sering diajukan
- **[Performance](PERFORMANCE.md)** — Optimasi performa

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Contributing](CONTRIBUTING.md)**  
*Panduan Kontribusi*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Dokumentasi Overview*

</td>
<td align="right">

**[Next: Security →](SECURITY.md)**  
*Best Practices Keamanan*

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
Panduan setup dan instalasi

</td>
<td>

**[API Documentation](10%20API%20Documentation.md)**  
Referensi API lengkap

</td>
</tr>
<tr>
<td>

**[FAQ](FAQ.md)**  
Pertanyaan umum dan jawaban

</td>
<td>

**[Performance](PERFORMANCE.md)**  
Panduan optimasi performa

</td>
</tr>
</table>

</details>

</div>

