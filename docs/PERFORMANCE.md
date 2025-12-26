# ⚡ Structra — Performance Optimization Guide

Best practices and strategies for optimizing Structra's performance.

---

## 📋 Table of Contents

- [Caching Strategies](#caching-strategies)
- [Image Optimization](#image-optimization)
- [Database Optimization](#database-optimization)
- [API Response Optimization](#api-response-optimization)
- [AI Model Performance](#ai-model-performance)
- [Monitoring Performance](#monitoring-performance)

---

## 💾 Caching Strategies

### Response Caching

**Cache AI analysis results**:
```typescript
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

async function analyzeWithCache(image: string) {
  // Generate cache key from image hash
  const imageHash = crypto.createHash('sha256')
    .update(image)
    .digest('hex');
  const cacheKey = `analysis:${imageHash}`;
  
  // Check cache
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Perform analysis
  const result = await analyzeDesign(image);
  
  // Cache for 1 hour
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

**Cache generated code**:
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

**Invalidate cache on updates**:
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

## 🖼️ Image Optimization

### Image Compression

**Compress images before processing**:
```typescript
import sharp from 'sharp';

async function optimizeImage(imageBuffer: Buffer): Promise<Buffer> {
  return await sharp(imageBuffer)
    .resize(1920, null, { withoutEnlargement: true })
    .jpeg({ quality: 85 })
    .toBuffer();
}
```

### Image Format Selection

**Choose optimal format**:
```typescript
function getOptimalFormat(image: Buffer): 'png' | 'jpeg' {
  // PNG for images with transparency
  if (hasTransparency(image)) {
    return 'png';
  }
  // JPEG for photos and complex images
  return 'jpeg';
}
```

### Lazy Loading

**Load images on demand**:
```typescript
async function processImageLazy(imageUrl: string) {
  // Fetch image only when needed
  const response = await fetch(imageUrl);
  const imageBuffer = await response.arrayBuffer();
  
  return await processImage(Buffer.from(imageBuffer));
}
```

---

## 🗄️ Database Optimization

### Query Optimization

**Use select to limit fields**:
```typescript
// ✅ Good: Select only needed fields
const projects = await prisma.project.findMany({
  select: {
    id: true,
    name: true,
    createdAt: true
  },
  where: { userId }
});

// ❌ Bad: Fetch all fields
const projects = await prisma.project.findMany({
  where: { userId }
});
```

### Indexing

**Add indexes for frequent queries**:
```sql
-- Index on user_id for project queries
CREATE INDEX idx_projects_user_id ON projects(user_id);

-- Index on created_at for sorting
CREATE INDEX idx_analyses_created_at ON analyses(created_at);

-- Composite index for complex queries
CREATE INDEX idx_analyses_user_created ON analyses(user_id, created_at);
```

### Connection Pooling

**Configure connection pool**:
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

**Batch database operations**:
```typescript
// ✅ Good: Batch insert
await prisma.analysis.createMany({
  data: analyses
});

// ❌ Bad: Individual inserts
for (const analysis of analyses) {
  await prisma.analysis.create({ data: analysis });
}
```

---

## 🚀 API Response Optimization

### Response Compression

**Enable gzip compression**:
```typescript
import compression from 'compression';

app.use(compression({
  level: 6,
  threshold: 1024
}));
```

### Pagination

**Implement pagination for large datasets**:
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

**Process heavy operations asynchronously**:
```typescript
// Queue for heavy processing
import { Queue } from 'bull';

const analysisQueue = new Queue('analysis', {
  redis: { host: 'localhost', port: 6379 }
});

// Add job to queue
await analysisQueue.add('analyze', {
  image,
  options
});

// Process job
analysisQueue.process('analyze', async (job) => {
  return await analyzeDesign(job.data.image, job.data.options);
});
```

### Response Streaming

**Stream large responses**:
```typescript
app.get('/api/analyses/stream', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Transfer-Encoding', 'chunked');
  
  const stream = await getAnalysesStream(req.user.id);
  stream.pipe(res);
});
```

---

## 🤖 AI Model Performance

### Model Selection

**Choose appropriate model for task**:
```typescript
async function selectModel(complexity: 'low' | 'medium' | 'high') {
  switch (complexity) {
    case 'low':
      // Use faster, smaller model
      return 'mistral:7b';
    case 'medium':
      return 'llama2:13b';
    case 'high':
      // Use more powerful model
      return 'deepseek:32b';
  }
}
```

### Prompt Optimization

**Optimize prompts for speed**:
```typescript
// ✅ Good: Concise prompt
const prompt = `Analyze design: ${imageDescription}. Output: schema.`;

// ❌ Bad: Verbose prompt
const prompt = `Please analyze the following design image carefully. Consider all aspects...`;
```

### Parallel Processing

**Process multiple requests in parallel**:
```typescript
async function analyzeMultiple(images: string[]) {
  // Process in batches of 3
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
// Use batch endpoint when available
const results = await client.analyzeBatch({
  images: [image1, image2, image3],
  frameworkTarget: ['tailwind']
});
```

---

## 📊 Monitoring Performance

### Metrics Collection

**Track key metrics**:
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

**Log performance data**:
```typescript
logger.info('Analysis completed', {
  requestId,
  duration: Date.now() - start,
  imageSize: image.length,
  schemaSize: JSON.stringify(schema).length,
  cacheHit: cached !== null
});
```

### Alerting

**Set up performance alerts**:
```typescript
// Alert on slow requests
if (duration > 30000) {
  await sendAlert({
    level: 'warning',
    message: `Slow request detected: ${duration}ms`,
    requestId
  });
}

// Alert on high error rate
if (errorRate > 0.05) {
  await sendAlert({
    level: 'critical',
    message: `High error rate: ${errorRate * 100}%`
  });
}
```

### Performance Dashboard

**Key metrics to monitor**:
- Request latency (p50, p95, p99)
- Error rates
- Cache hit rates
- Database query times
- AI model response times
- Memory and CPU usage
- Queue lengths

---

## 🎯 Best Practices Summary

### Do's

✅ **Cache aggressively** — Cache AI responses, schemas, and generated code
✅ **Optimize images** — Compress and resize before processing
✅ **Use indexes** — Add database indexes for frequent queries
✅ **Batch operations** — Group database operations
✅ **Monitor metrics** — Track performance continuously
✅ **Use connection pooling** — Configure appropriate pool size
✅ **Implement pagination** — For large datasets
✅ **Process asynchronously** — For heavy operations

### Don'ts

❌ **Don't fetch unnecessary data** — Use select to limit fields
❌ **Don't process synchronously** — Use queues for heavy tasks
❌ **Don't ignore caching** — Cache frequently accessed data
❌ **Don't skip indexes** — Index columns used in WHERE clauses
❌ **Don't load all data** — Implement pagination
❌ **Don't ignore monitoring** — Track performance metrics

---

## 📚 Additional Resources

- **[Architecture](09%20Architecture.md)** — System architecture
- **[Deployment](DEPLOYMENT.md)** — Deployment considerations
- **[Troubleshooting](TROUBLESHOOTING.md)** — Performance issues

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Glossary](GLOSSARY.md)**  
*Technical Terms and Definitions*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

*End of Additional Documentation*

</td>
</tr>
</table>

---

<details>
<summary><b>📚 Related Documentation</b></summary>

<table>
<tr>
<td>

**[Architecture](09%20Architecture.md)**  
System architecture and components

</td>
<td>

**[Deployment](DEPLOYMENT.md)**  
Deployment and scaling

</td>
</tr>
<tr>
<td>

**[Troubleshooting](TROUBLESHOOTING.md)**  
Performance troubleshooting

</td>
<td>

**[API Documentation](10%20API%20Documentation.md)**  
API performance considerations

</td>
</tr>
</table>

</details>

</div>

