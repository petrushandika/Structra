# 📖 Structra — Glossary

Technical terms, definitions, and key concepts used throughout Structra documentation.

---

## 📋 Table of Contents

- [Core Concepts](#core-concepts)
- [AI & Machine Learning](#ai--machine-learning)
- [Technical Terms](#technical-terms)
- [Acronyms & Abbreviations](#acronyms--abbreviations)

---

## 🎯 Core Concepts

### Canonical Schema

A structured JSON representation that serves as the **single source of truth** for all AI processes in Structra. It includes sections, components, layout strategies, responsive rules, assumptions, and ambiguities.

**Related**: [03 Canonical Schema](03%20Canonical%20Schema.md)

### Role-Based Reasoning

An internal AI reasoning system that uses three distinct roles working sequentially:
- **Analyzer** — Observes and identifies design elements
- **Layout Engineer** — Makes structural decisions
- **Code Generator** — Implements code from schema

**Related**: [04 AI Roles](04%20AI%20Roles.md)

### Quality Assessment

A mandatory evaluation system that provides confidence levels and risk assessments for all non-trivial outputs, including:
- Visual Confidence
- Structural Confidence
- Responsive Risk
- Maintainability Risk
- Manual Adjustment Needed

**Related**: [05 Quality Assessment](05%20Quality%20Assessment.md)

### Ambiguity Handling

The process of detecting, documenting, and resolving uncertainties in design analysis. All ambiguities and assumptions must be explicitly recorded in the canonical schema.

**Related**: [06 Ambiguity Handling](06%20Ambiguity%20Handling.md)

### Engineering Constraints

Rules and guidelines that ensure generated code follows best practices:
- Simplicity First Principle
- Forbidden Patterns (magic numbers, deep nesting, etc.)
- Design System Awareness
- Code Quality Rules

**Related**: [07 Engineering Constraints](07%20Engineering%20Constraints.md)

---

## 🤖 AI & Machine Learning

### Analyzer Role

The first role in Structra's reasoning chain. Responsible for:
- Understanding visual design and textual input
- Identifying sections, hierarchy, and visual intent
- Assessing visual complexity
- **Does not** generate code or make final styling decisions

**Related**: [04 AI Roles](04%20AI%20Roles.md)

### Layout Engineer Role

The second role in Structra's reasoning chain. Responsible for:
- Making layout and structural decisions
- Determining CSS and responsive behavior strategy
- Creating the final canonical schema
- Prioritizing maintainability

**Related**: [04 AI Roles](04%20AI%20Roles.md)

### Code Generator Role

The third role in Structra's reasoning chain. Responsible for:
- Generating code from canonical schema
- Maintaining semantics and readability
- Ensuring code matches specification
- **Does not** modify schema structure

**Related**: [04 AI Roles](04%20AI%20Roles.md)

### Gemini API

Google's cloud-based LLM (Large Language Model) used by Structra for:
- Visual design analysis
- Layout interpretation
- Textual reasoning
- Image understanding

**Related**: [08 Tech Stack](08%20Tech%20Stack.md)

### Ollama

A local LLM runtime used by Structra for:
- Layout reasoning refinement
- Code generation
- Cost-efficient iteration
- Prompt experimentation

**Related**: [08 Tech Stack](08%20Tech%20Stack.md)

### RAG (Retrieval-Augmented Generation)

A technique used by Structra to enhance AI responses by:
- Searching similar layouts from knowledge base
- Using proven patterns
- Continuously learning from user revisions

**Related**: [09 Architecture](09%20Architecture.md)

---

## 💻 Technical Terms

### Framework Target

The target framework for code generation. Currently supported:
- `tailwind` — Tailwind CSS utility classes
- `react` — React components
- `nextjs` — Next.js components
- `html` — Semantic HTML + CSS

**Related**: [10 API Documentation](10%20API%20Documentation.md)

### Design System

A collection of reusable components, design tokens, and guidelines that ensure consistency. Structra can integrate with design systems to:
- Use color tokens
- Follow spacing scales
- Use existing components
- Maintain consistency

**Related**: [07 Engineering Constraints](07%20Engineering%20Constraints.md)

### Responsive Rules

Rules defined in the canonical schema that specify how layouts adapt at different breakpoints:
- `mobile` — Mobile devices (< 768px)
- `tablet` — Tablet devices (768px - 1024px)
- `desktop` — Desktop devices (> 1024px)

Actions: `restructure`, `simplify`, `hide`

**Related**: [03 Canonical Schema](03%20Canonical%20Schema.md)

### Layout Strategy

The approach chosen for organizing content:
- `grid` — CSS Grid layout
- `flex` — Flexbox layout
- `hybrid` — Combination of grid and flex

**Related**: [03 Canonical Schema](03%20Canonical%20Schema.md)

### Background Strategy

The approach for handling abstract shapes and backgrounds:
- `svg` — SVG shapes (for complex organic shapes)
- `css-gradient` — CSS gradients (for simple gradients)
- `pseudo-element` — CSS pseudo-elements (for decorative effects)
- `background-image` — Background images (last resort)

**Related**: [03 Canonical Schema](03%20Canonical%20Schema.md)

### Z-Index Strategy

The approach for managing element layering:
- `minimal` — Minimal z-index usage (preferred)
- `moderate` — Moderate z-index usage
- `complex` — Complex z-index usage (avoided)

**Related**: [03 Canonical Schema](03%20Canonical%20Schema.md)

### CSS Mask

CSS property that allows creating complex transparency effects and cutouts using mask images or gradients.

**Use Cases:**
- Creating flower shapes
- Complex cutouts
- Vignette effects
- Combining multiple shapes

**Related**: [14 Advanced CSS Techniques](14%20Advanced%20CSS%20Techniques.md)

### Aspect Ratio

CSS property that maintains consistent proportions of elements, especially useful for responsive containers.

**Example**: `aspect-ratio: 16 / 9` maintains 16:9 ratio regardless of width.

**Related**: [14 Advanced CSS Techniques](14%20Advanced%20CSS%20Techniques.md)

### Clip Path

CSS property that creates geometric cutouts and shapes using polygon, circle, or ellipse functions.

**Use Cases:**
- Geometric shapes (triangle, hexagon, star)
- Notches and cutouts
- Decorative elements
- Image cropping

**Related**: [14 Advanced CSS Techniques](14%20Advanced%20CSS%20Techniques.md), [15 CSS Shapes & Patterns](15%20CSS%20Shapes%20%26%20Patterns.md)

### Container Queries

CSS feature that allows styling based on container size rather than viewport size, enabling component-level responsiveness.

**Syntax**: `@container (min-width: 400px) { ... }`

**Related**: [18 Modern CSS Features](18%20Modern%20CSS%20Features.md)

### CSS Layers

CSS feature (@layer) that provides cascade control and style organization, allowing better management of style priorities.

**Use Cases:**
- Framework organization
- Style prioritization
- Design system structure
- Override management

**Related**: [18 Modern CSS Features](18%20Modern%20CSS%20Features.md)

### :has() Selector

Modern CSS selector that allows selecting parent elements based on their children or siblings.

**Example**: `.card:has(.badge)` selects cards that contain a badge element.

**Related**: [18 Modern CSS Features](18%20Modern%20CSS%20Features.md)

### CSS-only

Approach of creating shapes, effects, and patterns using pure CSS (mask, clip-path, pseudo-elements) without SVG or images.

**Advantages:**
- Better performance
- Easier to maintain
- More responsive
- Smaller file size

**Related**: [17 CSS-only Solutions](17%20CSS-only%20Solutions.md)

### Assumptions

Explicitly documented assumptions made by AI during analysis. All assumptions must be recorded in the canonical schema and can be modified by users.

**Related**: [06 Ambiguity Handling](06%20Ambiguity%20Handling.md)

### Ambiguities

Areas of uncertainty in design analysis that are documented with:
- `area` — Design area with ambiguity
- `issue` — Description of problem
- `alternatives` — Alternative solutions considered
- `chosen` — Solution chosen
- `reason` — Reasoning for choice

**Related**: [06 Ambiguity Handling](06%20Ambiguity%20Handling.md)

### Code Input

The ability to input existing CSS/HTML code for analysis and reverse engineering. Structra supports code input from multiple frameworks including Tailwind, Bootstrap, CSS manual, SCSS, CSS Modules, and PostCSS.

**Related**: [20 Code Input & Reverse Engineering](20%20Code%20Input%20%26%20Reverse%20Engineering.md)

### Reverse Engineering

The process of analyzing existing code and extracting its structure to the Canonical Schema. This enables understanding, refactoring, and converting code between frameworks.

**Related**: [20 Code Input & Reverse Engineering](20%20Code%20Input%20%26%20Reverse%20Engineering.md)

### Collection

A saved CSS pattern that can be organized, searched, and reused. Collections include metadata such as tags, categories, usage count, and revision history.

**Related**: [21 Collection & History System](21%20Collection%20%26%20History%20System.md)

### History

A record of all CSS generations, including timestamps, input types, frameworks used, and generated schemas. History enables revisiting and editing previous generations.

**Related**: [21 Collection & History System](21%20Collection%20%26%20History%20System.md)

### Visual Editor

An interactive interface that provides live preview, real-time editing, parameter tuning, and drag-and-drop functionality for modifying CSS visually.

**Related**: [22 Visual Editor Guide](22%20Visual%20Editor%20Guide.md)

### Framework Conversion

The process of converting code from one CSS framework to another while preserving functionality. Supported conversions include Bootstrap ↔ Tailwind, CSS Manual ↔ SCSS, and more.

**Related**: [24 Framework Support](24%20Framework%20Support.md)

---

## 🔤 Acronyms & Abbreviations

### API
**Application Programming Interface** — The RESTful API provided by Structra for programmatic access.

**Related**: [10 API Documentation](10%20API%20Documentation.md)

### SDK
**Software Development Kit** — Libraries provided by Structra for easier integration:
- `@structra/sdk` — JavaScript/TypeScript SDK
- `structra-python` — Python SDK

**Related**: [10 API Documentation](10%20API%20Documentation.md)

### LLM
**Large Language Model** — AI models used for natural language processing and code generation:
- Gemini (Cloud LLM)
- Ollama (Local LLM)

**Related**: [08 Tech Stack](08%20Tech%20Stack.md)

### RAG
**Retrieval-Augmented Generation** — Technique for enhancing AI responses with knowledge base retrieval.

**Related**: [09 Architecture](09%20Architecture.md)

### ORM
**Object-Relational Mapping** — Prisma ORM used for database interactions.

**Related**: [08 Tech Stack](08%20Tech%20Stack.md)

### S3
**Simple Storage Service** — S3-compatible storage for design images (MinIO, Cloudflare R2, AWS S3).

**Related**: [08 Tech Stack](08%20Tech%20Stack.md)

### CI/CD
**Continuous Integration/Continuous Deployment** — Automated testing and deployment pipelines.

**Related**: [INTEGRATION.md](INTEGRATION.md)

### JWT
**JSON Web Token** — Token-based authentication mechanism.

**Related**: [SECURITY.md](SECURITY.md)

### CORS
**Cross-Origin Resource Sharing** — Mechanism for allowing cross-origin requests.

**Related**: [10 API Documentation](10%20API%20Documentation.md)

### REST
**Representational State Transfer** — Architectural style for web services (Structra uses RESTful API).

**Related**: [10 API Documentation](10%20API%20Documentation.md)

### WCAG
**Web Content Accessibility Guidelines** — Standards for web accessibility (future feature).

**Related**: [ROADMAP.md](ROADMAP.md)

---

## 📚 Related Documentation

- **[Core Objective](01%20Core%20Objective.md)** — Core concepts
- **[Canonical Schema](03%20Canonical%20Schema.md)** — Schema structure
- **[AI Roles](04%20AI%20Roles.md)** — Role-based reasoning
- **[Architecture](09%20Architecture.md)** — System architecture

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Roadmap](ROADMAP.md)**  
*Development Roadmap*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: Performance →](PERFORMANCE.md)**  
*Performance Optimization Guide*

</td>
</tr>
</table>

---

<details>
<summary><b>📚 Related Documentation</b></summary>

<table>
<tr>
<td>

**[Core Objective](01%20Core%20Objective.md)**  
Core concepts and philosophy

</td>
<td>

**[Canonical Schema](03%20Canonical%20Schema.md)**  
Schema structure and fields

</td>
</tr>
<tr>
<td>

**[AI Roles](04%20AI%20Roles.md)**  
Role-based reasoning system

</td>
<td>

**[Architecture](09%20Architecture.md)**  
System architecture overview

</td>
</tr>
</table>

</details>

</div>

