# 🔗 Structra — Panduan Integrasi

Contoh dan best practices untuk mengintegrasikan Structra dengan berbagai tools dan layanan.

---

## 📋 Daftar Isi

- [Integrasi CI/CD](#integrasi-cicd)
- [Integrasi Design Tool](#integrasi-design-tool)
- [Setup Webhook](#setup-webhook)
- [Integrasi SDK](#integrasi-sdk)
- [Integrasi Kustom](#integrasi-kustom)
- [Best Practices](#best-practices)

---

## 🔄 Integrasi CI/CD

### GitHub Actions

**Contoh workflow**:
```yaml
name: Analyze Design

on:
  push:
    paths:
      - 'designs/**'

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Analyze design
        uses: actions/github-script@v6
        with:
          script: |
            const { StructraClient } = require('@structra/sdk');
            const client = new StructraClient({
              apiKey: process.env.STRUCTRA_API_KEY
            });
            
            const result = await client.analyze({
              image: './designs/hero.png',
              frameworkTarget: ['tailwind', 'react']
            });
            
            // Simpan schema
            fs.writeFileSync('schema.json', JSON.stringify(result.schema, null, 2));
            
            // Generate code
            const code = await client.generateCode({
              schema: result.schema,
              frameworkTarget: ['tailwind', 'react']
            });
            
            // Simpan code
            fs.writeFileSync('components/Hero.tsx', code.react);
```

### GitLab CI

**Contoh pipeline**:
```yaml
analyze_design:
  image: node:18
  script:
    - npm install @structra/sdk
    - node analyze-design.js
  only:
    - main
  variables:
    STRUCTRA_API_KEY: $STRUCTRA_API_KEY
```

### CircleCI

**Contoh config**:
```yaml
version: 2.1
jobs:
  analyze:
    docker:
      - image: node:18
    steps:
      - checkout
      - run: npm install @structra/sdk
      - run: node scripts/analyze-design.js
```

---

## 🎨 Integrasi Design Tool

### Figma Plugin

**Struktur plugin dasar**:
```typescript
// figma-plugin.ts
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'analyze-design') {
    // Export frame saat ini
    const image = await figma.exportAsync(figma.currentPage.selection[0], {
      format: 'PNG',
      constraint: { type: 'SCALE', value: 2 }
    });
    
    // Konversi ke base64
    const base64 = figma.base64Encode(image);
    
    // Kirim ke Structra API
    const response = await fetch('https://api.structra.com/v1/analyze', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${msg.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: `data:image/png;base64,${base64}`,
        frameworkTarget: ['tailwind', 'react']
      })
    });
    
    const result = await response.json();
    
    // Tampilkan hasil di plugin UI
    figma.ui.postMessage({
      type: 'analysis-complete',
      schema: result.data.schema,
      code: result.data.code
    });
  }
};
```

### Sketch Plugin

**Contoh integrasi**:
```javascript
// sketch-plugin.js
const StructraClient = require('@structra/sdk');

export default function(context) {
  const selection = context.selection;
  if (selection.length === 0) {
    context.document.showMessage('Silakan pilih artboard');
    return;
  }
  
  // Export artboard
  const artboard = selection[0];
  const image = artboard.export('png');
  
  // Analisis dengan Structra
  const client = new StructraClient({
    apiKey: context.apiKey
  });
  
  client.analyze({
    image: image,
    frameworkTarget: ['tailwind']
  }).then(result => {
    // Tampilkan code di panel
    context.document.showMessage('Analisis selesai!');
  });
}
```

---

## 🔔 Setup Webhook

### Konfigurasi Webhook

**Daftarkan webhook**:
```javascript
const response = await fetch('https://api.structra.com/v1/webhooks', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://your-app.com/webhooks/structra',
    events: ['analysis.completed', 'analysis.failed'],
    secret: 'your_webhook_secret'
  })
});
```

### Webhook Handler

**Contoh Express.js**:
```javascript
const express = require('express');
const crypto = require('crypto');
const app = express();

app.post('/webhooks/structra', express.raw({ type: 'application/json' }), (req, res) => {
  // Verifikasi signature
  const signature = req.headers['x-structra-signature'];
  const hmac = crypto.createHmac('sha256', process.env.WEBHOOK_SECRET);
  const digest = hmac.update(JSON.stringify(req.body)).digest('hex');
  
  if (signature !== digest) {
    return res.status(401).send('Signature tidak valid');
  }
  
  const event = req.body;
  
  switch (event.type) {
    case 'analysis.completed':
      handleAnalysisComplete(event.data);
      break;
    case 'analysis.failed':
      handleAnalysisFailed(event.data);
      break;
  }
  
  res.status(200).send('OK');
});

function handleAnalysisComplete(data) {
  // Proses analisis yang selesai
  console.log('Analisis selesai:', data.requestId);
  // Simpan schema, generate code, dll
}
```

### Webhook Events

**Events yang tersedia**:
- `analysis.completed` — Analisis selesai dengan sukses
- `analysis.failed` — Analisis gagal
- `code.generated` — Code generation selesai

**Event payload**:
```json
{
  "event": "analysis.completed",
  "timestamp": "2025-01-15T10:00:00Z",
  "data": {
    "requestId": "req_1234567890",
    "projectId": "proj_123",
    "schema": {...},
    "code": {...}
  }
}
```

---

## 📦 Integrasi SDK

### JavaScript/TypeScript

**Instalasi**:
```bash
npm install @structra/sdk
```

**Penggunaan dasar**:
```typescript
import { StructraClient } from '@structra/sdk';

const client = new StructraClient({
  apiKey: process.env.STRUCTRA_API_KEY
});

// Analisis desain
const result = await client.analyze({
  image: './design.png',
  frameworkTarget: ['tailwind', 'react'],
  options: {
    includeCode: true,
    includeQualityAssessment: true
  }
});

// Gunakan schema
console.log(result.schema);

// Gunakan kode yang dihasilkan
console.log(result.code.react);
```

**Dengan design system**:
```typescript
const result = await client.analyze({
  image: './design.png',
  options: {
    designSystem: {
      colors: {
        primary: '#000000',
        secondary: '#ffffff'
      },
      spacing: {
        base: '4px',
        scale: [0, 4, 8, 16, 32, 64]
      }
    }
  }
});
```

### Python

**Instalasi**:
```bash
pip install structra-python
```

**Penggunaan**:
```python
from structra import StructraClient

client = StructraClient(api_key=os.getenv('STRUCTRA_API_KEY'))

# Analisis desain
with open('design.png', 'rb') as f:
    image_data = f.read()

result = client.analyze(
    image=image_data,
    framework_target=['tailwind', 'react']
)

# Akses hasil
print(result.schema)
print(result.code.react)
```

---

## 🛠️ Integrasi Kustom

### Next.js API Route

**Contoh API route**:
```typescript
// app/api/analyze/route.ts
import { StructraClient } from '@structra/sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { image, options } = await request.json();
  
  const client = new StructraClient({
    apiKey: process.env.STRUCTRA_API_KEY
  });
  
  try {
    const result = await client.analyze({
      image,
      frameworkTarget: ['tailwind', 'react'],
      options
    });
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

### Express.js Middleware

**Contoh middleware**:
```javascript
const { StructraClient } = require('@structra/sdk');

function structraMiddleware(req, res, next) {
  req.structra = new StructraClient({
    apiKey: process.env.STRUCTRA_API_KEY
  });
  next();
}

app.use(structraMiddleware);

app.post('/analyze', async (req, res) => {
  const result = await req.structra.analyze({
    image: req.body.image,
    frameworkTarget: ['tailwind']
  });
  
  res.json(result);
});
```

### Serverless Function (Vercel)

**Contoh function**:
```typescript
// api/analyze.ts
import { StructraClient } from '@structra/sdk';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method tidak diizinkan' });
  }
  
  const client = new StructraClient({
    apiKey: process.env.STRUCTRA_API_KEY
  });
  
  const result = await client.analyze({
    image: req.body.image,
    frameworkTarget: req.body.frameworkTarget || ['tailwind']
  });
  
  res.json(result);
}
```

---

## ✅ Best Practices

### Error Handling

```typescript
try {
  const result = await client.analyze({ image });
} catch (error) {
  if (error.status === 429) {
    // Tangani rate limit
    await waitForRateLimit();
    return retry();
  } else if (error.status === 401) {
    // Tangani authentication error
    throw new Error('API key tidak valid');
  } else {
    // Tangani error lainnya
    logger.error('Analisis gagal', error);
    throw error;
  }
}
```

### Retry Logic

```typescript
async function analyzeWithRetry(image: string, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await client.analyze({ image });
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(Math.pow(2, i) * 1000); // Exponential backoff
    }
  }
}
```

### Caching

```typescript
const cacheKey = `analysis:${hashImage(image)}`;
const cached = await redis.get(cacheKey);

if (cached) {
  return JSON.parse(cached);
}

const result = await client.analyze({ image });
await redis.setex(cacheKey, 3600, JSON.stringify(result));

return result;
```

### Rate Limiting

```typescript
import { RateLimiter } from 'limiter';

const limiter = new RateLimiter({
  tokensPerInterval: 100,
  interval: 'hour'
});

async function analyzeWithLimit(image: string) {
  await limiter.removeTokens(1);
  return await client.analyze({ image });
}
```

---

## 📚 Sumber Tambahan

- **[API Documentation](10%20API%20Documentation.md)** — Referensi API lengkap
- **[Examples](12%20Examples.md)** — Lebih banyak contoh integrasi
- **[SDK Documentation](https://docs.structra.com/sdk)** — Referensi SDK

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Deployment](DEPLOYMENT.md)**  
*Panduan Deployment Production*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Dokumentasi Overview*

</td>
<td align="right">

**[Next: Roadmap →](ROADMAP.md)**  
*Roadmap Pengembangan*

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
Referensi API lengkap

</td>
<td>

**[Examples](12%20Examples.md)**  
Contoh real-world

</td>
</tr>
<tr>
<td>

**[Getting Started](11%20Getting%20Started.md)**  
Panduan setup

</td>
<td>

**[Troubleshooting](TROUBLESHOOTING.md)**  
Masalah umum

</td>
</tr>
</table>

</details>

</div>

