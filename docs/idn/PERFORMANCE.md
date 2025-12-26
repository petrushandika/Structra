# ⚡ Structra — Panduan Optimasi Performa

Best practices dan strategi untuk mengoptimalkan performa Structra.

---

## 📋 Daftar Isi

- [Strategi Caching](#strategi-caching)
- [Optimasi Gambar](#optimasi-gambar)
- [Optimasi Database](#optimasi-database)
- [Optimasi Respons API](#optimasi-respons-api)
- [Performa Model AI](#performa-model-ai)
- [Monitoring Performa](#monitoring-performa)

---

## 💾 Strategi Caching

### Response Caching

**Cache hasil analisis AI**:
```typescript
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

async function analyzeWithCache(image: string) {
  // Generate cache key dari hash gambar
  const imageHash = crypto.createHash('sha256')
    .update(image)
    .digest('hex');
  const cacheKey = `analysis:${imageHash}`;
  
  // Periksa cache
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Lakukan analisis
  const result = await analyzeDesign(image);
  
  // Cache selama 1 jam
  await redis.setex(cacheKey, 3600, JSON.stringify(result));
  
  return result;
}
```

### Schema Caching

**Cache canonical schemas**:
```typescript
async function getCachedSchema(schemaId: string) {
  const cacheKey = `schema:${schemaId}`;
  const cached = await redis.get(cacheKey);
  
  if (cached) {
    return JSON.parse(cached);
  }
  
  const schema = await db.schema.findUnique({ where: { id: schemaId } });
  await redis.setex(cacheKey, 7200, JSON.stringify(schema));
  
  return schema;
}
```

### Code Generation Caching

**Cache kode yang dihasilkan**:
```typescript
async function generateCodeWithCache(schema: CanonicalSchema) {
  const schemaHash = hashSchema(schema);
  const cacheKey = `code:${schemaHash}`;
  
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  
  const code = await generateCode(schema);
  await redis.setex(cacheKey, 3600, JSON.stringify(code));
  
  return code;
}
```

### Cache Invalidation

**Invalidate cache pada update**:
```typescript
async function updateSchema(schemaId: string, updates: Partial<CanonicalSchema>) {
  // Update database
  const schema = await db.schema.update({
    where: { id: schemaId },
    data: updates
  });
  
  // Invalidate cache
  await redis.del(`schema:${schemaId}`);
  await redis.del(`code:${hashSchema(schema)}`);
  
  return schema;
}
```

---

## 🖼️ Optimasi Gambar

### Kompresi Gambar

**Kompres gambar sebelum pemrosesan**:
```typescript
import sharp from 'sharp';

async function optimizeImage(imageBuffer: Buffer): Promise<Buffer> {
  return await sharp(imageBuffer)
    .resize(1920, null, { withoutEnlargement: true })
    .jpeg({ quality: 85 })
    .toBuffer();
}
```

### Pemilihan Format Gambar

**Pilih format optimal**:
```typescript
function getOptimalFormat(image: Buffer): 'png' | 'jpeg' {
  // PNG untuk gambar dengan transparansi
  if (hasTransparency(image)) {
    return 'png';
  }
  // JPEG untuk foto dan gambar kompleks
  return 'jpeg';
}
```

### Lazy Loading

**Load gambar on demand**:
```typescript
async function processImageLazy(imageUrl: string) {
  // Fetch gambar hanya ketika diperlukan
  const response = await fetch(imageUrl);
  const imageBuffer = await response.arrayBuffer();
  
  return await processImage(Buffer.from(imageBuffer));
}
```

---

## 🗄️ Optimasi Database

### Optimasi Query

**Gunakan select untuk membatasi field**:
```typescript
// ✅ Baik: Pilih hanya field yang diperlukan
const projects = await prisma.project.findMany({
  select: {
    id: true,
    name: true,
    createdAt: true
  },
  where: { userId }
});

// ❌ Buruk: Fetch semua field
const projects = await prisma.project.findMany({
  where: { userId }
});
```

### Indexing

**Tambahkan indexes untuk query yang sering**:
```sql
-- Index pada user_id untuk query project
CREATE INDEX idx_projects_user_id ON projects(user_id);

-- Index pada created_at untuk sorting
CREATE INDEX idx_analyses_created_at ON analyses(created_at);

-- Composite index untuk query kompleks
CREATE INDEX idx_analyses_user_created ON analyses(user_id, created_at);
```

### Connection Pooling

**Konfigurasi connection pool**:
```env
DATABASE_URL=postgresql://...?connection_limit=20&pool_timeout=10
```

```typescript
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});
```

### Batch Operations

**Batch operasi database**:
```typescript
// ✅ Baik: Batch insert
await prisma.analysis.createMany({
  data: analyses
});

// ❌ Buruk: Insert individual
for (const analysis of analyses) {
  await prisma.analysis.create({ data: analysis });
}
```

---

## 🚀 Optimasi Respons API

### Kompresi Respons

**Aktifkan kompresi gzip**:
```typescript
import compression from 'compression';

app.use(compression({
  level: 6,
  threshold: 1024
}));
```

### Pagination

**Implementasikan pagination untuk dataset besar**:
```typescript
async function getProjects(userId: string, page: number = 1, limit: number = 20) {
  const skip = (page - 1) * limit;
  
  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where: { userId },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.project.count({ where: { userId } })
  ]);
  
  return {
    projects,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
}
```

### Async Processing

**Proses operasi berat secara asinkron**:
```typescript
// Queue untuk pemrosesan berat
import { Queue } from 'bull';

const analysisQueue = new Queue('analysis', {
  redis: { host: 'localhost', port: 6379 }
});

// Tambahkan job ke queue
await analysisQueue.add('analyze', {
  image,
  options
});

// Proses job
analysisQueue.process('analyze', async (job) => {
  return await analyzeDesign(job.data.image, job.data.options);
});
```

### Response Streaming

**Stream respons besar**:
```typescript
app.get('/api/analyses/stream', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Transfer-Encoding', 'chunked');
  
  const stream = await getAnalysesStream(req.user.id);
  stream.pipe(res);
});
```

---

## 🤖 Performa Model AI

### Pemilihan Model

**Pilih model yang sesuai untuk tugas**:
```typescript
async function selectModel(complexity: 'low' | 'medium' | 'high') {
  switch (complexity) {
    case 'low':
      // Gunakan model lebih cepat dan lebih kecil
      return 'mistral:7b';
    case 'medium':
      return 'llama2:13b';
    case 'high':
      // Gunakan model lebih powerful
      return 'deepseek:32b';
  }
}
```

### Optimasi Prompt

**Optimalkan prompt untuk kecepatan**:
```typescript
// ✅ Baik: Prompt ringkas
const prompt = `Analisis desain: ${imageDescription}. Output: schema.`;

// ❌ Buruk: Prompt verbose
const prompt = `Silakan analisis gambar desain berikut dengan hati-hati. Pertimbangkan semua aspek...`;
```

### Parallel Processing

**Proses beberapa request secara paralel**:
```typescript
async function analyzeMultiple(images: string[]) {
  // Proses dalam batch 3
  const batchSize = 3;
  const results = [];
  
  for (let i = 0; i < images.length; i += batchSize) {
    const batch = images.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(img => analyzeDesign(img))
    );
    results.push(...batchResults);
  }
  
  return results;
}
```

### Request Batching

**Batch API requests**:
```typescript
// Gunakan batch endpoint ketika tersedia
const results = await client.analyzeBatch({
  images: [image1, image2, image3],
  frameworkTarget: ['tailwind']
});
```

---

## 📊 Monitoring Performa

### Pengumpulan Metrics

**Track metrics utama**:
```typescript
import { metrics } from '@opentelemetry/api';

const requestDuration = metrics.getMeter('structra').createHistogram('request_duration');
const requestCount = metrics.getMeter('structra').createCounter('request_count');

app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    requestDuration.record(duration);
    requestCount.add(1, { method: req.method, status: res.statusCode });
  });
  
  next();
});
```

### Performance Logging

**Log data performa**:
```typescript
logger.info('Analisis selesai', {
  requestId,
  duration: Date.now() - start,
  imageSize: image.length,
  schemaSize: JSON.stringify(schema).length,
  cacheHit: cached !== null
});
```

### Alerting

**Setup performance alerts**:
```typescript
// Alert pada request lambat
if (duration > 30000) {
  await sendAlert({
    level: 'warning',
    message: `Request lambat terdeteksi: ${duration}ms`,
    requestId
  });
}

// Alert pada error rate tinggi
if (errorRate > 0.05) {
  await sendAlert({
    level: 'critical',
    message: `Error rate tinggi: ${errorRate * 100}%`
  });
}
```

### Performance Dashboard

**Metrics utama untuk dimonitor**:
- Request latency (p50, p95, p99)
- Error rates
- Cache hit rates
- Database query times
- AI model response times
- Memory dan CPU usage
- Queue lengths

---

## 🎯 Ringkasan Best Practices

### Do's

✅ **Cache secara agresif** — Cache AI responses, schemas, dan generated code
✅ **Optimalkan gambar** — Kompres dan resize sebelum pemrosesan
✅ **Gunakan indexes** — Tambahkan database indexes untuk query yang sering
✅ **Batch operations** — Kelompokkan operasi database
✅ **Monitor metrics** — Track performa secara terus-menerus
✅ **Gunakan connection pooling** — Konfigurasi ukuran pool yang sesuai
✅ **Implementasikan pagination** — Untuk dataset besar
✅ **Proses secara asinkron** — Untuk operasi berat

### Don'ts

❌ **Jangan fetch data yang tidak perlu** — Gunakan select untuk membatasi field
❌ **Jangan proses secara sinkron** — Gunakan queues untuk tugas berat
❌ **Jangan abaikan caching** — Cache data yang sering diakses
❌ **Jangan skip indexes** — Index kolom yang digunakan di WHERE clauses
❌ **Jangan load semua data** — Implementasikan pagination
❌ **Jangan abaikan monitoring** — Track performance metrics

---

## 📚 Sumber Tambahan

- **[Architecture](09%20Architecture.md)** — Arsitektur sistem
- **[Deployment](DEPLOYMENT.md)** — Pertimbangan deployment
- **[Troubleshooting](TROUBLESHOOTING.md)** — Masalah performa

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Glossary](GLOSSARY.md)**  
*Istilah Teknis dan Definisi*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Dokumentasi Overview*

</td>
<td align="right">

*Akhir Dokumentasi Tambahan*

</td>
</tr>
</table>

---

<details>
<summary><b>📚 Dokumentasi Terkait</b></summary>

<table>
<tr>
<td>

**[Architecture](09%20Architecture.md)**  
Arsitektur sistem dan komponen

</td>
<td>

**[Deployment](DEPLOYMENT.md)**  
Deployment dan scaling

</td>
</tr>
<tr>
<td>

**[Troubleshooting](TROUBLESHOOTING.md)**  
Troubleshooting performa

</td>
<td>

**[API Documentation](10%20API%20Documentation.md)**  
Pertimbangan performa API

</td>
</tr>
</table>

</details>

</div>

