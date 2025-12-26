# 📡 Structra — API Documentation

Dokumen ini menjelaskan API endpoints Structra, format request/response, dan contoh penggunaan.

---

## 🔑 Authentication

Structra menggunakan API key authentication. Sertakan API key di header setiap request:

```http
Authorization: Bearer YOUR_API_KEY
```

### Getting API Key

1. Register di Structra dashboard
2. Navigate ke Settings → API Keys
3. Generate new API key
4. Simpan key dengan aman (hanya ditampilkan sekali)

---

## 🌐 Base URL

```
Production: https://api.structra.com/v1
Staging: https://api-staging.structra.com/v1
Local: http://localhost:3000/api/v1
```

---

## 📊 Rate Limiting

- **Free Tier**: 100 requests/hour
- **Pro Tier**: 1000 requests/hour
- **Enterprise**: Custom limits

Rate limit headers:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

---

## 📤 Endpoints

### 1. Analyze Design

Menganalisis desain visual dan menghasilkan canonical schema.

**Endpoint:** `POST /analyze`

**Request:**

```json
{
  "image": "base64_encoded_image_or_url",
  "textualDescription": "Hero section dengan background blob di kanan",
  "frameworkTarget": ["tailwind", "react"],
  "options": {
    "includeCode": true,
    "includeQualityAssessment": true,
    "designSystem": {
      "colors": ["#000", "#fff"],
      "spacing": "4px base"
    }
  }
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "schema": {
      "meta": {
        "schemaVersion": "1.0",
        "inputType": ["image", "text"],
        "frameworkTarget": ["tailwind", "react"],
        "confidenceLevel": "high"
      },
      "sections": [...],
      "components": [...],
      "layoutStrategy": {...},
      "backgroundStrategy": {...},
      "layering": {...},
      "responsiveRules": [...],
      "assumptions": [...],
      "ambiguities": []
    },
    "code": {
      "html": "<section>...</section>",
      "css": "...",
      "react": "export function Hero() {...}"
    },
    "qualityAssessment": {
      "visualConfidence": "high",
      "structuralConfidence": "high",
      "responsiveRisk": "low",
      "maintainabilityRisk": "low",
      "manualAdjustmentNeeded": "minor"
    }
  },
  "requestId": "req_1234567890"
}
```

**Error Response:**

```json
{
  "success": false,
  "error": {
    "code": "INVALID_IMAGE",
    "message": "Image format not supported",
    "details": "Only PNG and JPG are supported"
  }
}
```

---

### 2. Generate Code from Schema

Generate code dari canonical schema yang sudah ada.

**Endpoint:** `POST /generate-code`

**Request:**

```json
{
  "schema": {
    "meta": {...},
    "sections": [...],
    "components": [...]
  },
  "frameworkTarget": ["tailwind", "react"],
  "options": {
    "format": "react-component",
    "includeComments": true
  }
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "code": {
      "html": "...",
      "css": "...",
      "react": "..."
    },
    "warnings": [
      "Some assumptions were made about spacing"
    ]
  }
}
```

---

### 3. Validate Schema

Validasi canonical schema sebelum code generation.

**Endpoint:** `POST /validate-schema`

**Request:**

```json
{
  "schema": {
    "meta": {...},
    "sections": [...]
  }
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "valid": true,
    "errors": [],
    "warnings": [
      "Missing responsive rules for tablet breakpoint"
    ]
  }
}
```

---

### 4. Get Project

Mengambil informasi project dan history.

**Endpoint:** `GET /projects/{projectId}`

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "proj_123",
    "name": "Landing Page",
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-01-15T11:30:00Z",
    "analyses": [
      {
        "id": "analysis_456",
        "createdAt": "2025-01-15T10:00:00Z",
        "schemaVersion": "1.0",
        "confidenceLevel": "high"
      }
    ]
  }
}
```

---

### 5. List Projects

Mendapatkan daftar semua projects.

**Endpoint:** `GET /projects`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `sort` (optional): Sort by `createdAt` or `updatedAt` (default: `updatedAt`)

**Response:**

```json
{
  "success": true,
  "data": {
    "projects": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "totalPages": 3
    }
  }
}
```

---

## 🔴 Error Codes

### Client Errors (4xx)

| Code | Description |
|------|-------------|
| `400` | Bad Request - Invalid request format |
| `401` | Unauthorized - Missing or invalid API key |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found - Resource doesn't exist |
| `429` | Too Many Requests - Rate limit exceeded |

### Server Errors (5xx)

| Code | Description |
|------|-------------|
| `500` | Internal Server Error |
| `503` | Service Unavailable - AI service temporarily down |

### Application Errors

| Error Code | Description |
|------------|-------------|
| `INVALID_IMAGE` | Image format not supported or corrupted |
| `IMAGE_TOO_LARGE` | Image exceeds size limit (10MB) |
| `INVALID_SCHEMA` | Canonical schema validation failed |
| `AI_SERVICE_ERROR` | AI model service error |
| `QUOTA_EXCEEDED` | Monthly quota exceeded |

---

## 📝 Example Requests

### cURL Example

```bash
curl -X POST https://api.structra.com/v1/analyze \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "image": "https://example.com/design.png",
    "textualDescription": "Hero section dengan background blob",
    "frameworkTarget": ["tailwind"],
    "options": {
      "includeCode": true
    }
  }'
```

### JavaScript Example

```javascript
const response = await fetch('https://api.structra.com/v1/analyze', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    image: imageBase64,
    textualDescription: 'Hero section dengan background blob di kanan',
    frameworkTarget: ['tailwind', 'react'],
    options: {
      includeCode: true,
      includeQualityAssessment: true
    }
  })
});

const data = await response.json();
console.log(data.data.schema);
console.log(data.data.code);
```

### Python Example

```python
import requests

url = "https://api.structra.com/v1/analyze"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "image": image_base64,
    "textualDescription": "Hero section dengan background blob",
    "frameworkTarget": ["tailwind"],
    "options": {
        "includeCode": True
    }
}

response = requests.post(url, json=payload, headers=headers)
data = response.json()
print(data["data"]["schema"])
```

---

## 🔄 Webhooks

Structra dapat mengirim webhook events untuk notifikasi async.

### Events

- `analysis.completed` - Analysis selesai
- `analysis.failed` - Analysis gagal
- `code.generated` - Code generation selesai

### Webhook Payload

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

## 📚 SDKs

### Official SDKs

- **JavaScript/TypeScript**: `@structra/sdk`
- **Python**: `structra-python`
- **Go**: `structra-go` (coming soon)

### Installation

```bash
# JavaScript
npm install @structra/sdk

# Python
pip install structra-python
```

### Usage Example (JavaScript)

```javascript
import { StructraClient } from '@structra/sdk';

const client = new StructraClient({
  apiKey: 'YOUR_API_KEY'
});

const result = await client.analyze({
  image: imageFile,
  frameworkTarget: ['tailwind', 'react']
});

console.log(result.schema);
console.log(result.code);
```

---

## 🔐 Security Best Practices

1. **Jangan commit API key** ke version control
2. **Gunakan environment variables** untuk API keys
3. **Rotate API keys** secara berkala
4. **Gunakan HTTPS** untuk semua requests
5. **Validate input** sebelum mengirim ke API
6. **Handle errors** dengan proper error handling

---

## 📞 Support

- **Documentation**: [docs.structra.com](https://docs.structra.com)
- **Email**: api-support@structra.com
- **Status Page**: [status.structra.com](https://status.structra.com)

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Architecture](09%20Architecture.md)**  
*System Architecture*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: Getting Started →](11%20Getting%20Started.md)**  
*Getting Started Guide*

</td>
</tr>
</table>

---

</div>

