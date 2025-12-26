# 🔗 Structra — Integration Guide

Examples and best practices for integrating Structra with various tools and services.

---

## 📋 Table of Contents

- [CI/CD Integration](#cicd-integration)
- [Design Tool Integration](#design-tool-integration)
- [Webhook Setup](#webhook-setup)
- [SDK Integration](#sdk-integration)
- [Custom Integrations](#custom-integrations)
- [Best Practices](#best-practices)

---

## 🔄 CI/CD Integration

### GitHub Actions

**Example workflow**:
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
            
            // Save schema
            fs.writeFileSync('schema.json', JSON.stringify(result.schema, null, 2));
            
            // Generate code
            const code = await client.generateCode({
              schema: result.schema,
              frameworkTarget: ['tailwind', 'react']
            });
            
            // Save code
            fs.writeFileSync('components/Hero.tsx', code.react);
```

### GitLab CI

**Example pipeline**:
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

**Example config**:
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

## 🎨 Design Tool Integration

### Figma Plugin

**Basic plugin structure**:
```typescript
// figma-plugin.ts
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'analyze-design') {
    // Export current frame
    const image = await figma.exportAsync(figma.currentPage.selection[0], {
      format: 'PNG',
      constraint: { type: 'SCALE', value: 2 }
    });
    
    // Convert to base64
    const base64 = figma.base64Encode(image);
    
    // Send to Structra API
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
    
    // Show result in plugin UI
    figma.ui.postMessage({
      type: 'analysis-complete',
      schema: result.data.schema,
      code: result.data.code
    });
  }
};
```

### Sketch Plugin

**Example integration**:
```javascript
// sketch-plugin.js
const StructraClient = require('@structra/sdk');

export default function(context) {
  const selection = context.selection;
  if (selection.length === 0) {
    context.document.showMessage('Please select an artboard');
    return;
  }
  
  // Export artboard
  const artboard = selection[0];
  const image = artboard.export('png');
  
  // Analyze with Structra
  const client = new StructraClient({
    apiKey: context.apiKey
  });
  
  client.analyze({
    image: image,
    frameworkTarget: ['tailwind']
  }).then(result => {
    // Show code in panel
    context.document.showMessage('Analysis complete!');
  });
}
```

---

## 🔔 Webhook Setup

### Webhook Configuration

**Register webhook**:
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

**Express.js example**:
```javascript
const express = require('express');
const crypto = require('crypto');
const app = express();

app.post('/webhooks/structra', express.raw({ type: 'application/json' }), (req, res) => {
  // Verify signature
  const signature = req.headers['x-structra-signature'];
  const hmac = crypto.createHmac('sha256', process.env.WEBHOOK_SECRET);
  const digest = hmac.update(JSON.stringify(req.body)).digest('hex');
  
  if (signature !== digest) {
    return res.status(401).send('Invalid signature');
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
  // Process completed analysis
  console.log('Analysis completed:', data.requestId);
  // Save schema, generate code, etc.
}
```

### Webhook Events

**Available events**:
- `analysis.completed` — Analysis finished successfully
- `analysis.failed` — Analysis failed
- `code.generated` — Code generation completed

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

## 📦 SDK Integration

### JavaScript/TypeScript

**Installation**:
```bash
npm install @structra/sdk
```

**Basic usage**:
```typescript
import { StructraClient } from '@structra/sdk';

const client = new StructraClient({
  apiKey: process.env.STRUCTRA_API_KEY
});

// Analyze design
const result = await client.analyze({
  image: './design.png',
  frameworkTarget: ['tailwind', 'react'],
  options: {
    includeCode: true,
    includeQualityAssessment: true
  }
});

// Use schema
console.log(result.schema);

// Use generated code
console.log(result.code.react);
```

**With design system**:
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

**Installation**:
```bash
pip install structra-python
```

**Usage**:
```python
from structra import StructraClient

client = StructraClient(api_key=os.getenv('STRUCTRA_API_KEY'))

# Analyze design
with open('design.png', 'rb') as f:
    image_data = f.read()

result = client.analyze(
    image=image_data,
    framework_target=['tailwind', 'react']
)

# Access results
print(result.schema)
print(result.code.react)
```

---

## 🛠️ Custom Integrations

### Next.js API Route

**Example API route**:
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

**Example middleware**:
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

**Example function**:
```typescript
// api/analyze.ts
import { StructraClient } from '@structra/sdk';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
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
    // Handle rate limit
    await waitForRateLimit();
    return retry();
  } else if (error.status === 401) {
    // Handle authentication error
    throw new Error('Invalid API key');
  } else {
    // Handle other errors
    logger.error('Analysis failed', error);
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

## 📚 Additional Resources

- **[API Documentation](10%20API%20Documentation.md)** — Complete API reference
- **[Examples](12%20Examples.md)** — More integration examples
- **[SDK Documentation](https://docs.structra.com/sdk)** — SDK reference

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Deployment](DEPLOYMENT.md)**  
*Production Deployment Guide*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: Roadmap →](ROADMAP.md)**  
*Development Roadmap*

</td>
</tr>
</table>

---

<details>
<summary><b>📚 Related Documentation</b></summary>

<table>
<tr>
<td>

**[API Documentation](10%20API%20Documentation.md)**  
Complete API reference

</td>
<td>

**[Examples](12%20Examples.md)**  
Real-world examples

</td>
</tr>
<tr>
<td>

**[Getting Started](11%20Getting%20Started.md)**  
Setup guide

</td>
<td>

**[Troubleshooting](TROUBLESHOOTING.md)**  
Common issues

</td>
</tr>
</table>

</details>

</div>

