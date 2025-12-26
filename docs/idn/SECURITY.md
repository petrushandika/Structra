# 🔒 Structra — Kebijakan Keamanan

Best practices keamanan, pelaporan kerentanan, dan pertimbangan keamanan untuk Structra.

---

## 📋 Daftar Isi

- [Security Best Practices](#security-best-practices)
- [Manajemen API Key](#manajemen-api-key)
- [Privasi Data](#privasi-data)
- [Validasi Input](#validasi-input)
- [Autentikasi & Otorisasi](#autentikasi--otorisasi)
- [Pelaporan Kerentanan](#pelaporan-kerentanan)
- [Pertimbangan Keamanan](#pertimbangan-keamanan)

---

## 🛡️ Security Best Practices

### Panduan Umum

1. **Jangan commit secrets** ke version control
2. **Gunakan environment variables** untuk data sensitif
3. **Rotate API keys** secara berkala
4. **Gunakan HTTPS** untuk semua API requests
5. **Validasi semua inputs** sebelum pemrosesan
6. **Jaga dependencies tetap ter-update** untuk security patches
7. **Monitor aktivitas mencurigakan**

### Keamanan Kode

```typescript
// ✅ Baik: Gunakan environment variables
const apiKey = process.env.GEMINI_API_KEY;

// ❌ Buruk: Hardcode secrets
const apiKey = "AIzaSyC...";
```

```typescript
// ✅ Baik: Validasi inputs
function validateImage(image: string): boolean {
  if (!image.startsWith('data:image/')) return false;
  if (image.length > 10 * 1024 * 1024) return false;
  return true;
}

// ❌ Buruk: Percaya user input
function processImage(image: string) {
  // Tidak ada validasi
}
```

---

## 🔑 Manajemen API Key

### Membuat API Keys

1. **Gunakan key yang kuat dan random**:
```javascript
const crypto = require('crypto');
const apiKey = crypto.randomBytes(32).toString('hex');
```

2. **Simpan keys dengan aman**:
   - Gunakan environment variables
   - Gunakan layanan manajemen secret (AWS Secrets Manager, dll)
   - Jangan log keys

3. **Set expiration dates**:
```typescript
interface ApiKey {
  key: string;
  expiresAt: Date;
  userId: string;
}
```

### Rotasi Key

**Best practices:**
- Rotate keys setiap 90 hari
- Dukung multiple active keys selama rotasi
- Beri notifikasi user sebelum expiration
- Revoke compromised keys segera

**Implementasi:**
```typescript
async function rotateApiKey(userId: string) {
  // Generate key baru
  const newKey = generateApiKey();
  
  // Jaga key lama aktif selama 7 hari
  await db.apiKey.update({
    where: { userId },
    data: {
      active: false,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  });
  
  // Buat key baru
  await db.apiKey.create({
    data: {
      key: hashKey(newKey),
      userId,
      active: true
    }
  });
  
  return newKey;
}
```

### Penyimpanan Key

**Server-side:**
```env
# File .env (jangan commit)
GEMINI_API_KEY=your_key_here
DATABASE_URL=postgresql://...
```

**Client-side:**
```javascript
// ✅ Baik: Simpan di secure storage
localStorage.setItem('apiKey', encryptedKey);

// ❌ Buruk: Simpan dalam plain text
localStorage.setItem('apiKey', 'plain-text-key');
```

---

## 🔐 Privasi Data

### Penanganan Data

1. **Minimalkan pengumpulan data**:
   - Hanya kumpulkan data yang diperlukan
   - Hapus data ketika tidak lagi diperlukan
   - Anonimkan data jika memungkinkan

2. **Enkripsi data sensitif**:
```typescript
import crypto from 'crypto';

function encrypt(data: string, key: string): string {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}
```

3. **Transmisi data yang aman**:
   - Selalu gunakan HTTPS
   - Gunakan TLS 1.2 atau lebih tinggi
   - Validasi sertifikat SSL

### Data Gambar

**Penyimpanan:**
- Simpan gambar di S3 buckets yang aman
- Gunakan signed URLs untuk akses sementara
- Set kebijakan akses yang sesuai

**Pemrosesan:**
- Proses gambar di lingkungan terisolasi
- Hapus gambar setelah pemrosesan (jika tidak diperlukan)
- Jangan log data gambar

### Data Pengguna

**Perlindungan:**
- Hash passwords (jangan simpan plain text)
- Enkripsi informasi pengguna sensitif
- Implementasikan kebijakan retensi data
- Patuhi persyaratan GDPR/CCPA

---

## ✅ Validasi Input

### Validasi Gambar

```typescript
function validateImage(image: string): ValidationResult {
  // Periksa format
  if (!image.match(/^data:image\/(png|jpeg|jpg);base64,/)) {
    return { valid: false, error: 'Format gambar tidak valid' };
  }
  
  // Periksa ukuran
  const size = Buffer.from(image, 'base64').length;
  if (size > 10 * 1024 * 1024) {
    return { valid: false, error: 'Gambar terlalu besar' };
  }
  
  // Periksa konten berbahaya
  if (containsMaliciousContent(image)) {
    return { valid: false, error: 'Gambar mengandung konten berbahaya' };
  }
  
  return { valid: true };
}
```

### Validasi Schema

```typescript
import { z } from 'zod';

const CanonicalSchemaSchema = z.object({
  meta: z.object({
    schemaVersion: z.string(),
    inputType: z.array(z.string()),
    frameworkTarget: z.array(z.string()),
    confidenceLevel: z.enum(['high', 'medium', 'low'])
  }),
  sections: z.array(z.object({
    id: z.string(),
    role: z.string(),
    layout: z.enum(['grid', 'flex', 'hybrid']),
    asymmetric: z.boolean(),
    description: z.string()
  }))
  // ... validasi lebih lanjut
});

function validateSchema(schema: unknown): boolean {
  try {
    CanonicalSchemaSchema.parse(schema);
    return true;
  } catch (error) {
    return false;
  }
}
```

### Pencegahan SQL Injection

```typescript
// ✅ Baik: Gunakan parameterized queries
const projects = await prisma.project.findMany({
  where: { userId: userInput }
});

// ❌ Buruk: String concatenation
const query = `SELECT * FROM projects WHERE user_id = '${userInput}'`;
```

---

## 🔐 Autentikasi & Otorisasi

### Autentikasi API

**Token-based authentication:**
```typescript
async function authenticateRequest(
  request: Request
): Promise<User | null> {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) return null;
  
  const apiKey = await db.apiKey.findUnique({
    where: { key: hashToken(token) },
    include: { user: true }
  });
  
  if (!apiKey || !apiKey.active) return null;
  if (apiKey.expiresAt < new Date()) return null;
  
  return apiKey.user;
}
```

### Rate Limiting

```typescript
import { RateLimiter } from 'limiter';

const limiter = new RateLimiter({
  tokensPerInterval: 100,
  interval: 'hour'
});

async function checkRateLimit(userId: string): Promise<boolean> {
  const remaining = await limiter.removeTokens(1);
  return remaining >= 0;
}
```

### Role-Based Access Control

```typescript
enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  ENTERPRISE = 'enterprise'
}

function requireRole(user: User, requiredRole: UserRole): void {
  if (user.role !== requiredRole && user.role !== UserRole.ADMIN) {
    throw new Error('Izin tidak cukup');
  }
}
```

---

## 🚨 Pelaporan Kerentanan

### Proses Pelaporan

Jika Anda menemukan kerentanan keamanan:

1. **JANGAN** membuat GitHub issue publik
2. **Email** security@structra.com dengan:
   - Deskripsi kerentanan
   - Langkah untuk mereproduksi
   - Dampak potensial
   - Saran perbaikan (jika ada)

3. **Tunggu respons** (dalam 48 jam)
4. **Berikan waktu** untuk perbaikan sebelum disclosure

### Timeline Respons

- **Respons awal**: Dalam 48 jam
- **Update status**: Dalam 7 hari
- **Timeline perbaikan**: Tergantung tingkat keparahan
- **Public disclosure**: Setelah perbaikan di-deploy

### Tingkat Keparahan

- **Critical**: Remote code execution, data breach
- **High**: Authentication bypass, privilege escalation
- **Medium**: Information disclosure, CSRF
- **Low**: Kebocoran informasi minor, pelanggaran best practice

---

## 🔒 Pertimbangan Keamanan

### Keamanan Deployment

1. **Gunakan default yang aman**:
```env
# Pengaturan production
NODE_ENV=production
HTTPS_ONLY=true
SECURE_COOKIES=true
```

2. **Aktifkan security headers**:
```typescript
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  next();
});
```

3. **Gunakan secure cookies**:
```typescript
app.use(session({
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: 'strict'
  }
}));
```

### Keamanan Dependencies

**Update berkala:**
```bash
# Periksa kerentanan
npm audit
bun audit

# Update dependencies
npm update
bun update

# Gunakan tools otomatis
# Dependabot, Snyk, dll
```

### Monitoring

**Security monitoring:**
- Log authentication failures
- Monitor pola penggunaan API
- Alert pada aktivitas mencurigakan
- Track failed requests

```typescript
// Log security events
logger.warn('Multiple failed auth attempts', {
  ip: request.ip,
  userId: userId,
  timestamp: new Date()
});
```

---

## 📚 Sumber Tambahan

- **[API Documentation](10%20API%20Documentation.md)** — Keamanan API
- **[Deployment](DEPLOYMENT.md)** — Praktik deployment yang aman
- **[Architecture](09%20Architecture.md)** — Arsitektur keamanan

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Troubleshooting](TROUBLESHOOTING.md)**  
*Masalah Umum dan Solusi*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Dokumentasi Overview*

</td>
<td align="right">

**[Next: Deployment →](DEPLOYMENT.md)**  
*Panduan Deployment Production*

</td>
</tr>
</table>

---

<details>
<summary><b>📚 Dokumentasi Terkait</b></summary>

<table>
<tr>
<td>

**[API Documentation](10%20API%20Documentation.md)**  
Praktik keamanan API

</td>
<td>

**[Deployment](DEPLOYMENT.md)**  
Panduan deployment yang aman

</td>
</tr>
</table>

</details>

</div>

