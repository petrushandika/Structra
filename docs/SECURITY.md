# 🔒 Structra — Security Policy

Security best practices, vulnerability reporting, and security considerations for Structra.

---

## 📋 Table of Contents

- [Security Best Practices](#security-best-practices)
- [API Key Management](#api-key-management)
- [Data Privacy](#data-privacy)
- [Input Validation](#input-validation)
- [Authentication & Authorization](#authentication--authorization)
- [Vulnerability Reporting](#vulnerability-reporting)
- [Security Considerations](#security-considerations)

---

## 🛡️ Security Best Practices

### General Guidelines

1. **Never commit secrets** to version control
2. **Use environment variables** for sensitive data
3. **Rotate API keys** regularly
4. **Use HTTPS** for all API requests
5. **Validate all inputs** before processing
6. **Keep dependencies updated** for security patches
7. **Monitor for suspicious activity**

### Code Security

```typescript
// ✅ Good: Use environment variables
const apiKey = process.env.GEMINI_API_KEY;

// ❌ Bad: Hardcode secrets
const apiKey = "AIzaSyC...";
```

```typescript
// ✅ Good: Validate inputs
function validateImage(image: string): boolean {
  if (!image.startsWith('data:image/')) return false;
  if (image.length > 10 * 1024 * 1024) return false;
  return true;
}

// ❌ Bad: Trust user input
function processImage(image: string) {
  // No validation
}
```

---

## 🔑 API Key Management

### Generating API Keys

1. **Use strong, random keys**:
```javascript
const crypto = require('crypto');
const apiKey = crypto.randomBytes(32).toString('hex');
```

2. **Store keys securely**:
   - Use environment variables
   - Use secret management services (AWS Secrets Manager, etc.)
   - Never log keys

3. **Set expiration dates**:
```typescript
interface ApiKey {
  key: string;
  expiresAt: Date;
  userId: string;
}
```

### Key Rotation

**Best practices:**
- Rotate keys every 90 days
- Support multiple active keys during rotation
- Notify users before expiration
- Revoke compromised keys immediately

**Implementation:**
```typescript
async function rotateApiKey(userId: string) {
  // Generate new key
  const newKey = generateApiKey();
  
  // Keep old key active for 7 days
  await db.apiKey.update({
    where: { userId },
    data: {
      active: false,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  });
  
  // Create new key
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

### Key Storage

**Server-side:**
```env
# .env file (never commit)
GEMINI_API_KEY=your_key_here
DATABASE_URL=postgresql://...
```

**Client-side:**
```javascript
// ✅ Good: Store in secure storage
localStorage.setItem('apiKey', encryptedKey);

// ❌ Bad: Store in plain text
localStorage.setItem('apiKey', 'plain-text-key');
```

---

## 🔐 Data Privacy

### Data Handling

1. **Minimize data collection**:
   - Only collect necessary data
   - Delete data when no longer needed
   - Anonymize data when possible

2. **Encrypt sensitive data**:
```typescript
import crypto from 'crypto';

function encrypt(data: string, key: string): string {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}
```

3. **Secure data transmission**:
   - Always use HTTPS
   - Use TLS 1.2 or higher
   - Validate SSL certificates

### Image Data

**Storage:**
- Store images in secure S3 buckets
- Use signed URLs for temporary access
- Set appropriate access policies

**Processing:**
- Process images in isolated environments
- Delete images after processing (if not needed)
- Don't log image data

### User Data

**Protection:**
- Hash passwords (never store plain text)
- Encrypt sensitive user information
- Implement data retention policies
- Comply with GDPR/CCPA requirements

---

## ✅ Input Validation

### Image Validation

```typescript
function validateImage(image: string): ValidationResult {
  // Check format
  if (!image.match(/^data:image\/(png|jpeg|jpg);base64,/)) {
    return { valid: false, error: 'Invalid image format' };
  }
  
  // Check size
  const size = Buffer.from(image, 'base64').length;
  if (size > 10 * 1024 * 1024) {
    return { valid: false, error: 'Image too large' };
  }
  
  // Check for malicious content
  if (containsMaliciousContent(image)) {
    return { valid: false, error: 'Image contains malicious content' };
  }
  
  return { valid: true };
}
```

### Schema Validation

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
  // ... more validation
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

### SQL Injection Prevention

```typescript
// ✅ Good: Use parameterized queries
const projects = await prisma.project.findMany({
  where: { userId: userInput }
});

// ❌ Bad: String concatenation
const query = `SELECT * FROM projects WHERE user_id = '${userInput}'`;
```

---

## 🔐 Authentication & Authorization

### API Authentication

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
    throw new Error('Insufficient permissions');
  }
}
```

---

## 🚨 Vulnerability Reporting

### Reporting Process

If you discover a security vulnerability:

1. **Do NOT** create a public GitHub issue
2. **Email** security@structra.com with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

3. **Wait for response** (within 48 hours)
4. **Allow time** for fix before disclosure

### Response Timeline

- **Initial response**: Within 48 hours
- **Status update**: Within 7 days
- **Fix timeline**: Depends on severity
- **Public disclosure**: After fix is deployed

### Severity Levels

- **Critical**: Remote code execution, data breach
- **High**: Authentication bypass, privilege escalation
- **Medium**: Information disclosure, CSRF
- **Low**: Minor information leaks, best practice violations

---

## 🔒 Security Considerations

### Deployment Security

1. **Use secure defaults**:
```env
# Production settings
NODE_ENV=production
HTTPS_ONLY=true
SECURE_COOKIES=true
```

2. **Enable security headers**:
```typescript
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  next();
});
```

3. **Use secure cookies**:
```typescript
app.use(session({
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: 'strict'
  }
}));
```

### Dependency Security

**Regular updates:**
```bash
# Check for vulnerabilities
npm audit
bun audit

# Update dependencies
npm update
bun update

# Use automated tools
# Dependabot, Snyk, etc.
```

### Monitoring

**Security monitoring:**
- Log authentication failures
- Monitor API usage patterns
- Alert on suspicious activity
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

## 📚 Additional Resources

- **[API Documentation](10%20API%20Documentation.md)** — API security
- **[Deployment](DEPLOYMENT.md)** — Secure deployment practices
- **[Architecture](09%20Architecture.md)** — Security architecture

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Troubleshooting](TROUBLESHOOTING.md)**  
*Common Issues and Solutions*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: Deployment →](DEPLOYMENT.md)**  
*Production Deployment Guide*

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
API security practices

</td>
<td>

**[Deployment](DEPLOYMENT.md)**  
Secure deployment guide

</td>
</tr>
</table>

</details>

</div>

