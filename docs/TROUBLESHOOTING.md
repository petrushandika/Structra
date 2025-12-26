# 🔧 Structra — Troubleshooting Guide

Common issues, solutions, and debugging tips for Structra.

---

## 📋 Table of Contents

- [Installation Issues](#installation-issues)
- [API Errors](#api-errors)
- [AI Model Issues](#ai-model-issues)
- [Database Issues](#database-issues)
- [Performance Problems](#performance-problems)
- [Code Generation Issues](#code-generation-issues)
- [Debugging Tips](#debugging-tips)

---

## 🔧 Installation Issues

### Docker Services Not Starting

**Problem:** Docker Compose services fail to start.

**Solutions:**

1. **Check Docker status**:
```bash
docker ps
docker-compose ps
```

2. **Check logs**:
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

4. **Check port conflicts**:
```bash
# Check if ports are in use
netstat -an | grep 5432  # PostgreSQL
netstat -an | grep 6379  # Redis
netstat -an | grep 9000  # MinIO
```

### Dependencies Installation Fails

**Problem:** `npm install` or `bun install` fails.

**Solutions:**

1. **Clear cache**:
```bash
# npm
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# bun
bun install --force
```

2. **Check Node.js/Bun versions**:
```bash
node --version  # Should be 18+
bun --version   # Should be 1.0+
```

3. **Use correct package manager**:
```bash
# Frontend uses npm
cd frontend
npm install

# Backend uses bun
cd backend
bun install
```

### Environment Variables Not Loading

**Problem:** Environment variables not being read.

**Solutions:**

1. **Check file names**:
   - Frontend: `.env.local` (not `.env`)
   - Backend: `.env`

2. **Verify file location**:
   - Frontend: `frontend/.env.local`
   - Backend: `backend/.env`

3. **Check syntax**:
```env
# Correct format
DATABASE_URL=postgresql://user:password@localhost:5432/structra
GEMINI_API_KEY=your_key_here

# No spaces around =
# No quotes needed (unless value contains spaces)
```

---

## 🔴 API Errors

### 401 Unauthorized

**Problem:** API returns 401 Unauthorized.

**Solutions:**

1. **Check API key**:
```bash
# Verify key is correct
curl -H "Authorization: Bearer YOUR_API_KEY" https://api.structra.com/v1/health
```

2. **Check header format**:
```http
Authorization: Bearer YOUR_API_KEY
# Not: Authorization: YOUR_API_KEY
# Not: Bearer: YOUR_API_KEY
```

3. **Regenerate API key** if compromised

### 429 Rate Limit Exceeded

**Problem:** Too many requests error.

**Solutions:**

1. **Check rate limit headers**:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1640995200
```

2. **Implement request queuing**:
```javascript
// Wait before retrying
const waitTime = (resetTime - Date.now()) / 1000;
await new Promise(resolve => setTimeout(resolve, waitTime * 1000));
```

3. **Upgrade tier** for higher limits
4. **Implement caching** to reduce requests

### 400 Bad Request

**Problem:** Invalid request format.

**Solutions:**

1. **Validate request body**:
```javascript
// Check required fields
if (!image && !imageUrl) {
  throw new Error('Image or imageUrl required');
}

// Check image format
if (!image.match(/^data:image\/(png|jpeg|jpg);base64,/)) {
  throw new Error('Invalid image format');
}
```

2. **Check image size** (max 10MB):
```javascript
const imageSize = Buffer.from(image, 'base64').length;
if (imageSize > 10 * 1024 * 1024) {
  throw new Error('Image too large (max 10MB)');
}
```

3. **Verify JSON format**:
```bash
# Test with curl
curl -X POST https://api.structra.com/v1/analyze \
  -H "Content-Type: application/json" \
  -d @request.json
```

### 500 Internal Server Error

**Problem:** Server error.

**Solutions:**

1. **Check server logs**:
```bash
# Backend logs
cd backend
bun run dev  # Check console output

# Docker logs
docker-compose logs backend
```

2. **Verify AI services**:
```bash
# Check Gemini API
curl https://generativelanguage.googleapis.com/v1/models

# Check Ollama
curl http://localhost:11434/api/tags
```

3. **Check database connection**:
```bash
psql -h localhost -U user -d structra
```

---

## 🤖 AI Model Issues

### Gemini API Not Responding

**Problem:** Gemini API calls fail.

**Solutions:**

1. **Check API key**:
```bash
# Test API key
curl "https://generativelanguage.googleapis.com/v1/models?key=YOUR_API_KEY"
```

2. **Check quota**:
   - Verify quota in Google Cloud Console
   - Check billing status
   - Review usage limits

3. **Handle rate limits**:
```javascript
// Implement retry with exponential backoff
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

### Ollama Not Responding

**Problem:** Local Ollama instance not working.

**Solutions:**

1. **Check if Ollama is running**:
```bash
curl http://localhost:11434/api/tags
```

2. **Start Ollama**:
```bash
ollama serve
```

3. **Pull required models**:
```bash
ollama pull mistral
ollama pull llama2
ollama pull deepseek
```

4. **Check model availability**:
```bash
ollama list
```

5. **Verify OLLAMA_URL** in `.env`:
```env
OLLAMA_URL=http://localhost:11434
```

### Slow AI Responses

**Problem:** AI analysis takes too long.

**Solutions:**

1. **Optimize image size**:
```javascript
// Resize large images before sending
const resizedImage = await resizeImage(image, { maxWidth: 1920 });
```

2. **Use caching**:
```javascript
// Cache similar requests
const cacheKey = generateCacheKey(image, options);
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);
```

3. **Check model selection**:
   - Use faster models for simple designs
   - Use Ollama for local processing
   - Consider model size vs speed trade-off

---

## 💾 Database Issues

### Connection Refused

**Problem:** Cannot connect to PostgreSQL.

**Solutions:**

1. **Check if PostgreSQL is running**:
```bash
docker ps | grep postgres
# or
ps aux | grep postgres
```

2. **Check connection string**:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/structra
# Verify: user, password, host, port, database name
```

3. **Test connection**:
```bash
psql -h localhost -U user -d structra
```

4. **Check Docker logs**:
```bash
docker-compose logs postgres
```

### Migration Errors

**Problem:** Database migrations fail.

**Solutions:**

1. **Reset database** (development only):
```bash
cd backend
bun run db:reset
```

2. **Run migrations manually**:
```bash
bun run db:migrate
```

3. **Check migration status**:
```bash
bun run db:migrate:status
```

4. **Fix migration conflicts**:
```bash
# Review migration files
# Resolve conflicts
# Re-run migrations
```

### Query Performance Issues

**Problem:** Slow database queries.

**Solutions:**

1. **Add indexes**:
```sql
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_analyses_created_at ON analyses(created_at);
```

2. **Optimize queries**:
```typescript
// Use select to limit fields
const projects = await prisma.project.findMany({
  select: { id: true, name: true },
  where: { userId },
});
```

3. **Use connection pooling**:
```env
DATABASE_URL=postgresql://...?connection_limit=10
```

---

## ⚡ Performance Problems

### Slow API Responses

**Problem:** API takes too long to respond.

**Solutions:**

1. **Enable caching**:
```javascript
// Cache AI responses
const cached = await redis.get(cacheKey);
if (cached) return cached;
```

2. **Optimize image processing**:
```javascript
// Process images asynchronously
const processed = await processImageAsync(image);
```

3. **Use database indexes**:
```sql
CREATE INDEX idx_analyses_project_id ON analyses(project_id);
```

4. **Monitor performance**:
```javascript
// Add timing logs
const start = Date.now();
const result = await analyzeDesign(image);
console.log(`Analysis took ${Date.now() - start}ms`);
```

### High Memory Usage

**Problem:** Application uses too much memory.

**Solutions:**

1. **Optimize image handling**:
```javascript
// Stream large images instead of loading into memory
const stream = fs.createReadStream(imagePath);
```

2. **Limit concurrent requests**:
```javascript
// Use queue for processing
const queue = new PQueue({ concurrency: 3 });
await queue.add(() => processRequest(request));
```

3. **Clear caches periodically**:
```javascript
// Set TTL on cache entries
await redis.setex(cacheKey, 3600, JSON.stringify(data));
```

---

## 💻 Code Generation Issues

### Generated Code Doesn't Match Design

**Problem:** Output doesn't match input design.

**Solutions:**

1. **Review quality assessment**:
```json
{
  "visualConfidence": "medium",
  "manualAdjustmentNeeded": "moderate"
}
```

2. **Edit canonical schema** before code generation:
   - Adjust layout strategy
   - Modify responsive rules
   - Update assumptions

3. **Provide better input**:
   - Higher resolution images
   - Clearer design descriptions
   - Design system tokens

### Schema Validation Fails

**Problem:** Canonical schema is invalid.

**Solutions:**

1. **Check required fields**:
```json
{
  "meta": { "schemaVersion": "1.0" },
  "sections": [],
  "components": []
}
```

2. **Validate schema**:
```bash
# Use validation endpoint
curl -X POST /validate-schema \
  -H "Content-Type: application/json" \
  -d @schema.json
```

3. **Fix common issues**:
   - Missing `meta.schemaVersion`
   - Empty `sections` array
   - Invalid `layoutStrategy` values

---

## 🐛 Debugging Tips

### Enable Debug Logging

**Set debug environment variable**:
```env
DEBUG=structra:*
LOG_LEVEL=debug
```

### Check Logs

**Backend logs**:
```bash
cd backend
bun run dev
# Check console output
```

**Frontend logs**:
```bash
cd frontend
npm run dev
# Check browser console
```

**Docker logs**:
```bash
docker-compose logs -f
```

### Use API Testing Tools

**Test with curl**:
```bash
curl -X POST http://localhost:3001/api/v1/analyze \
  -H "Authorization: Bearer test-key" \
  -H "Content-Type: application/json" \
  -d '{"image": "base64..."}'
```

**Test with Postman/Insomnia**:
- Import API documentation
- Set up environment variables
- Test endpoints individually

### Common Debugging Commands

```bash
# Check service status
docker-compose ps

# View logs
docker-compose logs -f service-name

# Restart service
docker-compose restart service-name

# Check database
psql -h localhost -U user -d structra

# Test API
curl http://localhost:3001/health

# Check Redis
redis-cli ping
```

---

## 📚 Additional Resources

- **[Getting Started](11%20Getting%20Started.md)** — Setup guide
- **[API Documentation](10%20API%20Documentation.md)** — API reference
- **[Architecture](09%20Architecture.md)** — System architecture
- **[FAQ](FAQ.md)** — Frequently asked questions
- **[Performance](PERFORMANCE.md)** — Performance optimization

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Contributing](CONTRIBUTING.md)**  
*Contribution Guidelines*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: Security →](SECURITY.md)**  
*Security Best Practices*

</td>
</tr>
</table>

---

<details>
<summary><b>📚 Related Documentation</b></summary>

<table>
<tr>
<td>

**[Getting Started](11%20Getting%20Started.md)**  
Setup and installation guide

</td>
<td>

**[API Documentation](10%20API%20Documentation.md)**  
Complete API reference

</td>
</tr>
<tr>
<td>

**[FAQ](FAQ.md)**  
Common questions and answers

</td>
<td>

**[Performance](PERFORMANCE.md)**  
Performance optimization guide

</td>
</tr>
</table>

</details>

</div>

