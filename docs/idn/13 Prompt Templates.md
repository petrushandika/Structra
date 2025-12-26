# 📝 Structra — Prompt Templates

Dokumen ini menjelaskan prompt templates yang digunakan oleh Structra untuk role-based reasoning dan bagaimana mereka bekerja.

---

## 🎯 Overview

Structra menggunakan **versioned prompt templates** dengan **role-based prompting** untuk memastikan konsistensi dan kualitas output. Setiap role memiliki template khusus yang dioptimalkan untuk tugasnya.

---

## 👥 Role-Based Templates

### 1. Analyzer Role Template

**Purpose:** Observasi dan identifikasi desain visual

**Template Structure:**

```
You are an Analyzer in the Structra AI system.

Your responsibility:
- Understand visual design and textual input
- Identify sections, hierarchy, and visual intent
- Assess visual complexity

Rules:
- DO NOT generate code
- DO NOT make final styling decisions
- Focus on observation and identification

Input:
- Image: [DESIGN_IMAGE]
- Textual Description: [TEXTUAL_INPUT]

Analyze the design and provide:
1. Draft sections with descriptions
2. Initial component candidates
3. Visual complexity assessment (low/medium/high)
4. Notable visual patterns (blobs, waves, gradients, etc.)

Output format:
{
  "sections": [...],
  "componentCandidates": [...],
  "visualComplexity": "medium",
  "visualPatterns": [...]
}
```

---

### 2. Layout Engineer Role Template

**Purpose:** Keputusan struktural dan layout strategy

**Template Structure:**

```
You are a Layout Engineer in the Structra AI system.

Your responsibility:
- Make layout and structural decisions
- Determine CSS and responsive behavior strategy
- Create final canonical schema

Rules:
- Prioritize maintainability
- Explain every structural decision
- Consider trade-offs between complexity and maintainability

Context:
- Analyzer Output: [ANALYZER_OUTPUT]
- Framework Target: [FRAMEWORK_TARGET]
- Design System: [DESIGN_SYSTEM] (if provided)

Create canonical schema with:
1. Layout strategy (grid/flex/hybrid) with reason
2. Background and shape approach with reason
3. Layering strategy with reason
4. Responsive rules for each breakpoint
5. Document all assumptions
6. Document any ambiguities and how you resolved them

Output: Complete canonical schema following schema v1.0 specification.
```

---

### 3. Code Generator Role Template

**Purpose:** Generate code dari canonical schema

**Template Structure:**

```
You are a Code Generator in the Structra AI system.

Your responsibility:
- Generate code from canonical schema
- Maintain semantics and readability
- Ensure code matches specification

Rules:
- DO NOT modify schema structure
- DO NOT make new decisions outside schema
- Code must be production-ready

Input:
- Canonical Schema: [CANONICAL_SCHEMA]
- Framework Target: [FRAMEWORK_TARGET]
- Options: [GENERATION_OPTIONS]

Generate code following:
1. Engineering constraints (see constraints documentation)
2. Design system tokens (if provided)
3. Semantic HTML
4. Responsive-first approach
5. Clean, maintainable code structure

Output:
- HTML (semantic)
- CSS/Tailwind classes
- React/Next.js component (if requested)
```

---

## 🔄 Prompt Chaining

Templates digunakan secara berurutan dalam reasoning chain:

```
[Analyzer Template] 
  → Analyzer Output
    → [Layout Engineer Template]
      → Canonical Schema
        → [Code Generator Template]
          → Final Code
```

Setiap template menerima output dari role sebelumnya sebagai context.

---

## 📋 Template Variables

Templates menggunakan variables yang diisi saat runtime:

### Common Variables

- `[DESIGN_IMAGE]` - Base64 encoded image atau image URL
- `[TEXTUAL_INPUT]` - User's textual description
- `[FRAMEWORK_TARGET]` - Target framework (tailwind, react, etc.)
- `[DESIGN_SYSTEM]` - Design system tokens (if provided)
- `[ANALYZER_OUTPUT]` - Output from Analyzer role
- `[CANONICAL_SCHEMA]` - Canonical schema from Layout Engineer
- `[GENERATION_OPTIONS]` - Code generation options

### Context Variables

- `[SCHEMA_VERSION]` - Current schema version (e.g., "1.0")
- `[KNOWLEDGE_BASE_CONTEXT]` - Relevant patterns from knowledge base
- `[SIMILAR_LAYOUTS]` - Similar layouts from vector database

---

## 🔧 Template Customization

### Customizing for Specific Use Cases

Anda dapat customize templates untuk use case spesifik:

**Example: E-commerce Focus**

```javascript
const customTemplate = {
  analyzer: {
    ...baseAnalyzerTemplate,
    focus: "Identify product cards, pricing displays, and checkout flows",
    patterns: ["product-grid", "pricing-table", "cart-summary"]
  }
};
```

### Adding Domain-Specific Context

```javascript
const template = {
  layoutEngineer: {
    ...baseLayoutEngineerTemplate,
    domainContext: {
      industry: "e-commerce",
      commonPatterns: ["product-grid", "filter-sidebar"],
      constraints: ["accessibility-required", "seo-optimized"]
    }
  }
};
```

---

## 📚 Knowledge Base Integration

Templates dapat include context dari knowledge base:

```
Context from Knowledge Base:
- Similar layouts: [SIMILAR_LAYOUTS]
- Successful patterns: [SUCCESSFUL_PATTERNS]
- Common solutions: [COMMON_SOLUTIONS]

Use these as reference but adapt to current design.
```

---

## 🔄 Versioning Strategy

### Template Versioning

Templates di-version untuk:
- Track changes
- A/B testing
- Rollback jika perlu
- Gradual rollout

**Version Format:**
```
analyzer-v1.2.0
layout-engineer-v1.3.1
code-generator-v1.1.0
```

### Schema Version Compatibility

Templates harus compatible dengan schema version:

- Template v1.x → Schema v1.0
- Template v2.x → Schema v2.0 (future)

---

## 🎨 Prompt Engineering Best Practices

### 1. Clear Instructions

- Use explicit instructions
- Avoid ambiguity
- Provide examples when helpful

### 2. Structured Output

- Request structured output (JSON)
- Define output format clearly
- Include validation rules

### 3. Context Management

- Provide sufficient context
- Include relevant examples
- Reference documentation

### 4. Error Prevention

- Explicitly state what NOT to do
- Include common pitfalls
- Provide fallback instructions

---

## 📊 Template Performance

### Optimization Tips

1. **Minimize Token Usage**
   - Remove redundant instructions
   - Use concise language
   - Reference external docs

2. **Improve Accuracy**
   - Add examples
   - Include edge cases
   - Specify output format

3. **Reduce Latency**
   - Parallel processing where possible
   - Cache common patterns
   - Optimize context size

---

## 🔍 Example: Complete Prompt Flow

### Step 1: Analyzer Prompt

```
You are an Analyzer...

[Image and text input]

Analyze and provide draft sections and components.
```

### Step 2: Layout Engineer Prompt

```
You are a Layout Engineer...

Analyzer found:
- Sections: hero, features, testimonials
- Components: HeroContent, FeatureCard, TestimonialCard
- Visual complexity: medium

Create canonical schema with layout decisions.
```

### Step 3: Code Generator Prompt

```
You are a Code Generator...

Canonical Schema:
{
  "sections": [...],
  "layoutStrategy": {...}
}

Generate production-ready code.
```

---

## 🛠️ Template Management

### Storing Templates

Templates disimpan di:
- **Database** (PostgreSQL) untuk versioning
- **File System** untuk development
- **Version Control** untuk tracking

### Template Updates

1. Create new version
2. Test dengan sample inputs
3. Compare dengan previous version
4. Gradual rollout
5. Monitor performance

---

## 📖 Related Documentation

- [04 AI Roles](04%20AI%20Roles.md) - Understand role responsibilities
- [03 Canonical Schema](03%20Canonical%20Schema.md) - Schema specification
- [06 Ambiguity Handling](06%20Ambiguity%20Handling.md) - How templates handle ambiguity
- [09 Architecture](09%20Architecture.md) - System architecture

---

## 🔗 Resources

- **Prompt Engineering Guide**: Best practices for LLM prompting
- **Template Library**: Collection of proven templates
- **Version History**: Track template changes over time

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Examples](12%20Examples.md)**  
*Examples & Use Cases*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: Advanced CSS Techniques →](14%20Advanced%20CSS%20Techniques.md)**  
*Advanced CSS Techniques*

</td>
</tr>
</table>

---

</div>

