# 🚀 Structra — Getting Started

Complete guide to start using Structra, from installation to creating your first analysis.

---

## 📋 Prerequisites

Before starting, ensure you have:

- **Node.js** 18+ or newer
- **Bun** 1.0+ (for backend)
- **Docker** and **Docker Compose** (for local development)
- **PostgreSQL** 14+ (or use Docker)
- **Git** for version control

---

## 🔧 Installation

### Option 1: Local Development Setup

1. **Clone Repository**

```bash
git clone https://github.com/your-org/structra.git
cd structra
```

2. **Install Dependencies**

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
bun install
```

3. **Setup Environment Variables**

Copy example environment files:

```bash
# Frontend
cp frontend/.env.example frontend/.env.local

# Backend
cp backend/.env.example backend/.env
```

Edit environment variables:

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Backend (.env):**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/structra
REDIS_URL=redis://localhost:6379
GEMINI_API_KEY=your_gemini_api_key
OLLAMA_URL=http://localhost:11434
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
```

4. **Start Services with Docker Compose**

```bash
docker-compose up -d
```

This will start:
- PostgreSQL database
- Redis
- MinIO (S3-compatible storage)
- Qdrant (vector database)

5. **Run Database Migrations**

```bash
cd backend
bun run db:migrate
```

6. **Start Development Servers**

```bash
# Terminal 1: Backend
cd backend
bun run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

7. **Access Application**

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Docs: http://localhost:3001/docs

---

### Option 2: Using Structra API (Cloud)

If you only want to use the API without local setup:

1. **Sign Up** at [app.structra.com](https://app.structra.com)
2. **Get API Key** from dashboard
3. **Install SDK** (optional)

```bash
npm install @structra/sdk
```

4. **Start Using API**

See [10 API Documentation](10%20API%20Documentation.md) for details.

---

## 🎯 First Steps

### 1. Create Your First Analysis

**Via Web Interface:**

1. Login to dashboard
2. Click "New Analysis"
3. Upload design image (PNG/JPG)
4. Add optional textual description
5. Select framework target (Tailwind, React, etc.)
6. Click "Analyze"

**Via API:**

```javascript
import { StructraClient } from '@structra/sdk';

const client = new StructraClient({
  apiKey: 'YOUR_API_KEY'
});

const result = await client.analyze({
  image: './design.png',
  frameworkTarget: ['tailwind', 'react']
});

console.log(result.schema);
console.log(result.code);
```

### 2. Review Canonical Schema

After analysis completes, review canonical schema:

```json
{
  "meta": {
    "schemaVersion": "1.0",
    "confidenceLevel": "high"
  },
  "sections": [...],
  "components": [...],
  "layoutStrategy": {...}
}
```

You can:
- Edit schema before generating code
- Review assumptions and ambiguities
- Adjust responsive rules

### 3. Generate Code

After final schema, generate code:

```javascript
const code = await client.generateCode({
  schema: result.schema,
  frameworkTarget: ['tailwind', 'react']
});

console.log(code.html);
console.log(code.css);
console.log(code.react);
```

### 4. Review Quality Assessment

Check quality assessment to understand:
- Confidence levels
- Potential risks
- Manual adjustments needed

```javascript
console.log(result.qualityAssessment);
// {
//   visualConfidence: "high",
//   structuralConfidence: "high",
//   responsiveRisk: "low",
//   maintainabilityRisk: "low",
//   manualAdjustmentNeeded: "minor"
// }
```

---

## ⚙️ Configuration

### Design System Integration

If you have a design system, configure it:

```javascript
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
      },
      typography: {
        fontFamily: {
          sans: ['Inter', 'sans-serif']
        }
      }
    }
  }
});
```

### Custom Prompt Templates

For advanced usage, you can customize prompt templates:

See [13 Prompt Templates](13%20Prompt%20Templates.md) for details.

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Database Connection Error

**Problem:** Cannot connect to PostgreSQL

**Solution:**
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# If not, start it
docker-compose up -d postgres

# Check connection
psql -h localhost -U user -d structra
```

#### 2. Ollama Not Responding

**Problem:** Local LLM (Ollama) not responding

**Solution:**
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# If not, start Ollama
ollama serve

# Pull required models
ollama pull mistral
ollama pull llama2
```

#### 3. Image Upload Fails

**Problem:** Image upload error or format not supported

**Solution:**
- Ensure format is PNG or JPG
- Max size: 10MB
- Check image is not corrupted

#### 4. API Rate Limit Exceeded

**Problem:** Too many requests error

**Solution:**
- Check rate limit headers
- Implement request queuing
- Upgrade plan if needed

---

## 📚 Next Steps

After setup is complete:

1. **Read Documentation**
   - [03 Canonical Schema](03%20Canonical%20Schema.md) - Understand output format
   - [04 AI Roles](04%20AI%20Roles.md) - Learn about role-based reasoning
   - [07 Engineering Constraints](07%20Engineering%20Constraints.md) - Understand constraints

2. **Explore Examples**
   - [12 Examples](12%20Examples.md) - See real-world usage
   - Try different design types
   - Experiment with different frameworks

3. **Integrate with Your Workflow**
   - Setup CI/CD integration
   - Configure webhooks
   - Build custom integrations

---

## 🔗 Resources

- **API Documentation**: [10 API Documentation](10%20API%20Documentation.md)
- **Architecture**: [09 Architecture](09%20Architecture.md)
- **Examples**: [12 Examples](12%20Examples.md)
- **Community**: [Discord](https://discord.gg/structra)
- **GitHub**: [github.com/your-org/structra](https://github.com/your-org/structra)

---

## 💡 Tips

1. **Start Simple** - Start with simple designs to understand workflow
2. **Review Schema** - Always review canonical schema before generating code
3. **Check Quality** - Pay attention to quality assessment to set expectations
4. **Iterate** - Edit schema and regenerate code for refinement
5. **Use Design System** - Integrate design system for consistency

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: API Documentation](10%20API%20Documentation.md)**  
*API Documentation*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: Examples →](12%20Examples.md)**  
*Examples & Use Cases*

</td>
</tr>
</table>

---

<details>
<summary><b>📚 Quick Navigation</b></summary>

<table>
<tr>
<td>

**Previous:** [API Documentation](10%20API%20Documentation.md)  
API endpoints, request/response formats, examples

</td>
<td>

**Next:** [Examples](12%20Examples.md)  
Usage examples, use cases, and best practices

</td>
</tr>
</table>

</details>

</div>

