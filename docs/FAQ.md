# ❓ Structra — Frequently Asked Questions

Common questions and answers about Structra, its features, usage, and integration.

---

## 🎯 General Questions

### What is Structra?

Structra is an AI-powered UI structure engine that analyzes visual and textual design inputs and converts them into clean, scalable, and maintainable frontend architectures. It's **not a designer** and **not a code generator**—it's a **UI Structure Engineering Engine** that treats every design input as an engineering problem.

### How is Structra different from other AI code generators?

Structra focuses on:
- **Structure and maintainability** over pixel-perfect accuracy
- **Explainable decisions** with documented reasoning
- **Engineering-grade quality** with canonical schema as single source of truth
- **Role-based reasoning** for consistent, high-quality output

### What types of designs can Structra analyze?

Structra can analyze:
- UI screenshots and design exports (PNG/JPG)
- Figma and Sketch designs
- Complex layouts with blobs, waves, gradients, and asymmetric structures
- Textual descriptions of layouts
- Conceptual sketches and references

---

## 📋 Canonical Schema

### What is a Canonical Schema?

The Canonical Schema is the **single source of truth** for all AI processes in Structra. It's a structured JSON representation of the design analysis that includes:
- Sections and components
- Layout strategies
- Background and shape approaches
- Responsive rules
- Assumptions and ambiguities

See [03 Canonical Schema](03%20Canonical%20Schema.md) for details.

### Can I edit the Canonical Schema?

Yes! You can edit the schema before code generation. This allows you to:
- Adjust assumptions
- Modify responsive rules
- Change layout strategies
- Fix ambiguities

### Why is the schema required before code generation?

The schema ensures:
- **Transparency** — All decisions are documented
- **Consistency** — Code generation is deterministic
- **Control** — Users can review and modify before implementation
- **Quality** — Structured approach reduces errors

---

## 🤖 AI System

### What are AI Roles?

Structra uses internal role-based reasoning with three roles:
- **Analyzer** — Observes and identifies design elements
- **Layout Engineer** — Makes structural decisions and creates schema
- **Code Generator** — Implements code from schema

These roles are not visible to users but ensure quality and consistency. See [04 AI Roles](04%20AI%20Roles.md).

### How does quality assessment work?

Every non-trivial output includes quality assessment covering:
- Visual Confidence (High/Medium/Low)
- Structural Confidence (High/Medium/Low)
- Responsive Risk (Low/Medium/High)
- Maintainability Risk (Low/Medium/High)
- Manual Adjustment Needed (None/Minor/Moderate/Significant)

See [05 Quality Assessment](05%20Quality%20Assessment.md) for details.

### What happens when there's ambiguity in the design?

Structra documents all ambiguities and assumptions in the canonical schema. The AI:
- Detects unclear areas
- Documents alternatives considered
- Explains chosen solution
- Allows user review and modification

See [06 Ambiguity Handling](06%20Ambiguity%20Handling.md) for details.

---

## 🔌 API Usage

### How do I get an API key?

1. Register at Structra dashboard
2. Navigate to Settings → API Keys
3. Generate a new API key
4. Save it securely (it's only shown once)

See [10 API Documentation](10%20API%20Documentation.md) for details.

### What are the rate limits?

- **Free Tier**: 100 requests/hour
- **Pro Tier**: 1000 requests/hour
- **Enterprise**: Custom limits

Rate limit information is included in response headers.

### What image formats are supported?

Structra supports:
- PNG
- JPG/JPEG
- Maximum file size: 10MB

### How do I handle errors?

Check the error code in the response:
- `INVALID_IMAGE` — Image format not supported
- `IMAGE_TOO_LARGE` — File exceeds size limit
- `INVALID_SCHEMA` — Schema validation failed
- `AI_SERVICE_ERROR` — AI model service error
- `QUOTA_EXCEEDED` — Monthly quota exceeded

See [10 API Documentation](10%20API%20Documentation.md) for complete error codes.

---

## 💻 Code Generation

### What frameworks are supported?

Currently supported:
- **Tailwind CSS** (primary target)
- **React** components
- **Next.js** components
- **HTML + CSS** (semantic)

### Can I customize the generated code?

Yes! You can:
- Edit the canonical schema before code generation
- Modify generated code after generation
- Use design system tokens for consistency
- Customize prompt templates (advanced)

### Is the generated code production-ready?

The code is structured and maintainable, but you may need to:
- Adjust spacing and colors for pixel-perfect match
- Fine-tune responsive breakpoints
- Integrate with your design system
- Add animations or interactions

Quality assessment helps you understand what adjustments are needed.

---

## 🎨 Design System Integration

### Can I use my own design system?

Yes! Structra supports design system integration:
- Color tokens
- Spacing scales
- Typography systems
- Component libraries

Provide your design system in the API request options.

### How does Structra handle design system constraints?

When a design system is provided:
- AI follows design tokens strictly
- Uses existing components when available
- Maintains consistency over visual freedom
- Documents any deviations

See [07 Engineering Constraints](07%20Engineering%20Constraints.md).

---

## 🚀 Getting Started

### What do I need to get started?

**For API usage:**
- API key from Structra dashboard
- Image or design to analyze

**For local development:**
- Node.js 20.9+ (required for Next.js 16)
- Bun 1.0+ (for backend)
- Docker and Docker Compose
- PostgreSQL 15+ (or use Docker)
- Prisma 6+ (ORM for database management)

See [11 Getting Started](11%20Getting%20Started.md) for complete setup guide.

### How long does analysis take?

Analysis time depends on:
- Image complexity
- Design complexity
- Current system load

Typically:
- Simple designs: 5-15 seconds
- Complex designs: 15-30 seconds
- Very complex designs: 30-60 seconds

---

## 🔧 Technical Questions

### What AI models does Structra use?

Structra uses:
- **Gemini API** (Cloud LLM) for visual analysis
- **Ollama** (Local LLM) for reasoning and code generation

See [08 Tech Stack](08%20Tech%20Stack.md) for details.

### Can I use Structra offline?

Local development setup allows offline usage with:
- Local Ollama instance
- Local database and services
- Docker Compose setup

Cloud API requires internet connection.

### How does Structra handle large files?

- Images are processed and optimized
- Large files may take longer to process
- Maximum file size: 10MB
- Consider optimizing images before upload

---

## 💰 Pricing & Limits

### Is there a free tier?

Yes! Free tier includes:
- 100 requests/hour
- Basic features
- Community support

### What's included in paid tiers?

**Pro Tier:**
- 1000 requests/hour
- Priority support
- Advanced features
- Design system integration

**Enterprise:**
- Custom limits
- Dedicated support
- Custom integrations
- SLA guarantees

### How is usage calculated?

Usage is calculated per API request:
- Each `/analyze` call = 1 request
- Each `/generate-code` call = 1 request
- Schema validation doesn't count toward limits

---

## 🔗 Integration

### Can I integrate with CI/CD?

Yes! Structra can be integrated into CI/CD pipelines:
- Use API for automated analysis
- Webhooks for async processing
- SDKs for easy integration

See [INTEGRATION.md](INTEGRATION.md) for examples.

### Does Structra support webhooks?

Yes! Structra can send webhook events:
- `analysis.completed` — Analysis finished
- `analysis.failed` — Analysis failed
- `code.generated` — Code generation completed

See [10 API Documentation](10%20API%20Documentation.md) for webhook setup.

### Are there SDKs available?

Official SDKs:
- **JavaScript/TypeScript**: `@structra/sdk`
- **Python**: `structra-python`
- **Go**: Coming soon

See [10 API Documentation](10%20API%20Documentation.md) for SDK usage.

---

## 🎨 CSS Generation

### Can Structra generate CSS-only shapes?

Yes! Structra can generate CSS-only shapes using mask, clip-path, and pseudo-elements. The system automatically detects when CSS-only is appropriate vs SVG and generates optimized CSS accordingly.

**Supported CSS-only shapes:**
- Flower, triangle, starburst, polygon, ribbon
- Blob, wave, curve, subtract
- Custom corners and borders
- Section dividers
- Tooltips and speech bubbles
- Loaders and spinners

See [CSS-only Solutions](17%20CSS-only%20Solutions.md) for more details.

### Does Structra support CSS animations?

Yes! Structra can generate CSS animations and transitions including:
- @keyframes animations
- CSS transitions
- Transform animations
- Hover effects
- Loading animations

All animations are performance-optimized using GPU-accelerated properties (transform, opacity) and respect `prefers-reduced-motion` for accessibility.

See [CSS Animations & Transitions](16%20CSS%20Animations%20%26%20Transitions.md) for more details.

### What advanced CSS features are supported?

Structra supports a wide range of advanced CSS features:

**Advanced Techniques:**
- CSS Mask (mask, mask-image, mask-composite)
- Aspect Ratio (aspect-ratio property)
- Calc (calc() function)
- Clip Path (clip-path, polygon, circle, ellipse)
- CSS Custom Properties (--variables)

**Modern Features:**
- Container Queries (@container)
- Modern Selectors (:has(), :is(), :where())
- CSS Layers (@layer)
- CSS Nesting
- Backdrop Filter (backdrop-filter)
- CSS Filters (filter: blur(), drop-shadow(), etc.)

See [Advanced CSS Techniques](14%20Advanced%20CSS%20Techniques.md) and [Modern CSS Features](18%20Modern%20CSS%20Features.md) for complete documentation.

### Can I generate standalone CSS files?

Yes! Structra can generate standalone CSS files. The system supports:
- Pure CSS output (no framework dependencies)
- CSS file generation
- CSS module generation
- SCSS/SASS support (planned)
- PostCSS plugins integration (planned)

The generated CSS is optimized, minified, and includes browser compatibility considerations.

### How does Structra decide between CSS-only and SVG?

Structra uses a decision matrix based on:
- Shape complexity (simple shapes → CSS-only, complex → SVG)
- Performance requirements (CSS-only is faster)
- Browser compatibility needs
- Animation requirements (path animations → SVG)

The system prioritizes CSS-only solutions when appropriate but falls back to SVG for complex shapes that can't be achieved with CSS.

See [CSS-only Solutions](17%20CSS-only%20Solutions.md) for the complete decision guide.

## 🐛 Troubleshooting

### Analysis fails with "INVALID_IMAGE"

**Possible causes:**
- Unsupported image format (use PNG or JPG)
- Corrupted image file
- File too large (>10MB)

**Solutions:**
- Convert image to PNG or JPG
- Check file integrity
- Compress image if too large

### Code doesn't match design exactly

**This is normal!** Structra focuses on structure, not pixel-perfect accuracy. Use quality assessment to understand:
- What adjustments are needed
- Confidence levels
- Risk areas

Then make manual adjustments as needed.

### API returns 429 (Rate Limit)

**Solutions:**
- Check rate limit headers
- Implement request queuing
- Upgrade to higher tier
- Wait for rate limit reset

### Ollama not responding (local setup)

**Solutions:**
- Check if Ollama is running: `curl http://localhost:11434/api/tags`
- Start Ollama: `ollama serve`
- Pull required models: `ollama pull mistral`

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for more solutions.

---

## 📚 Learning Resources

### Where can I learn more?

- **[Getting Started](11%20Getting%20Started.md)** — Setup and first steps
- **[Examples](12%20Examples.md)** — Real-world usage examples
- **[API Documentation](10%20API%20Documentation.md)** — Complete API reference
- **[Architecture](09%20Architecture.md)** — System architecture
- **[Glossary](GLOSSARY.md)** — Technical terms and definitions

### How can I contribute?

See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Contribution guidelines
- Development setup
- Code style guidelines
- Pull request process

---

## 🤝 Support

### Where can I get help?

- **Documentation**: Check relevant docs first
- **FAQ**: This document
- **Troubleshooting**: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Community**: Discord or GitHub Discussions
- **Email**: support@structra.com (for Pro/Enterprise)

### How do I report bugs?

1. Check if issue is already reported
2. Create detailed bug report:
   - Steps to reproduce
   - Expected vs actual behavior
   - Error messages
   - System information
3. Submit via GitHub Issues

### How do I request features?

Feature requests can be submitted via:
- GitHub Issues (with "feature request" label)
- Community discussions
- Direct email (for Enterprise customers)

See [ROADMAP.md](ROADMAP.md) for planned features.

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Back to Index](README.md)**  
*Documentation Overview*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: CHANGELOG →](CHANGELOG.md)**  
*Version History*

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
Setup and first steps

</td>
<td>

**[API Documentation](10%20API%20Documentation.md)**  
Complete API reference

</td>
</tr>
<tr>
<td>

**[Troubleshooting](TROUBLESHOOTING.md)**  
Common issues and solutions

</td>
<td>

**[Examples](12%20Examples.md)**  
Real-world usage examples

</td>
</tr>
</table>

</details>

</div>

