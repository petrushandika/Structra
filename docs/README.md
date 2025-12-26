# 🧠 Structra — Documentation

Welcome to the Structra documentation. Structra is an AI-powered UI structure engine that analyzes visual and textual design inputs and converts them into clean, scalable, and maintainable frontend architectures.

---

## 📚 Documentation Structure

This documentation is organized into numbered sections that guide you through understanding and using Structra:

### Core Concepts
1. **[01 Core Objective](01%20Core%20Objective.md)** — Core objective and engineering philosophy of Structra
2. **[02 MVP](02%20MVP.md)** — Core system prompt and main specifications
3. **[03 Canonical Schema](03%20Canonical%20Schema.md)** — Output schema that serves as single source of truth

### AI System
4. **[04 AI Roles](04%20AI%20Roles.md)** — Internal role-based reasoning (Analyzer, Layout Engineer, Code Generator)
5. **[05 Quality Assessment](05%20Quality%20Assessment.md)** — Quality assessment system and confidence signals
6. **[06 Ambiguity Handling](06%20Ambiguity%20Handling.md)** — Ambiguity and failure handling

### Engineering Guidelines
7. **[07 Engineering Constraints](07%20Engineering%20Constraints.md)** — Constraints, forbidden patterns, and design system awareness
8. **[08 Tech Stack](08%20Tech%20Stack.md)** — Technologies used to build Structra

### Technical Documentation
9. **[09 Architecture](09%20Architecture.md)** — System architecture, components, and data flow
10. **[10 API Documentation](10%20API%20Documentation.md)** — API endpoints, request/response formats, and usage examples
11. **[11 Getting Started](11%20Getting%20Started.md)** — Installation, setup, and first steps guide

### Examples & Reference
12. **[12 Examples](12%20Examples.md)** — Usage examples, use cases, and best practices
13. **[13 Prompt Templates](13%20Prompt%20Templates.md)** — Prompt templates for role-based reasoning

### CSS Generation
14. **[14 Advanced CSS Techniques](14%20Advanced%20CSS%20Techniques.md)** — Mask, aspect-ratio, calc, clip-path, custom properties, container queries, modern selectors, layers, filters
15. **[15 CSS Shapes & Patterns](15%20CSS%20Shapes%20%26%20Patterns.md)** — All shape types (flower, triangle, starburst, polygon, ribbon, etc.) and patterns
16. **[16 CSS Animations & Transitions](16%20CSS%20Animations%20%26%20Transitions.md)** — @keyframes, animation properties, transitions, performance best practices
17. **[17 CSS-only Solutions](17%20CSS-only%20Solutions.md)** — When to use CSS-only vs SVG, pure CSS shapes, performance comparison
18. **[18 Modern CSS Features](18%20Modern%20CSS%20Features.md)** — Container queries, :has(), CSS layers, nesting, viewport units, fluid typography
19. **[19 CSS Performance & Optimization](19%20CSS%20Performance%20%26%20Optimization.md)** — Optimization techniques, critical CSS, minification, loading strategies

### Advanced Features
20. **[20 Code Input & Reverse Engineering](20%20Code%20Input%20%26%20Reverse%20Engineering.md)** — Code input modes, framework detection, parsing, reverse engineering, code refactoring
21. **[21 Collection & History System](21%20Collection%20%26%20History%20System.md)** — Collection management, history, versioning, copy-paste functionality, export/import
22. **[22 Visual Editor Guide](22%20Visual%20Editor%20Guide.md)** — Visual editor features, live preview, real-time editing, parameter tuning, drag-and-drop
23. **[23 Complex Layout Handling](23%20Complex%20Layout%20Handling.md)** — Extreme layouts, multi-layer shapes, nested subtracts, complex cutouts, edge cases
24. **[24 Framework Support](24%20Framework%20Support.md)** — Comprehensive support for Tailwind, Bootstrap, CSS manual, SCSS, CSS Modules, PostCSS, framework conversion
25. **[25 Advanced Effects Library](25%20Advanced%20Effects%20Library.md)** — Creative CSS effects, experimental CSS, effect library, custom effects, effect combinations

### Additional Documentation
- **[PRD](PRD.md)** — Product Requirements Document
- **[FAQ](FAQ.md)** — Frequently asked questions
- **[CHANGELOG](CHANGELOG.md)** — Version history and changes
- **[CONTRIBUTING](CONTRIBUTING.md)** — Contribution guidelines
- **[TROUBLESHOOTING](TROUBLESHOOTING.md)** — Common issues and solutions
- **[SECURITY](SECURITY.md)** — Security best practices
- **[DEPLOYMENT](DEPLOYMENT.md)** — Production deployment guide
- **[INTEGRATION](INTEGRATION.md)** — Integration examples
- **[ROADMAP](ROADMAP.md)** — Development roadmap
- **[GLOSSARY](GLOSSARY.md)** — Technical terms and definitions
- **[PERFORMANCE](PERFORMANCE.md)** — Performance optimization guide

---

## 🎯 What is Structra?

Structra is **not a designer**.  
Structra is **not a code generator**.  
**Structra is a UI Structure Engineering Engine.**

Structra treats every design input as an **engineering problem**, not just a visual conversion. It focuses on:

- **Structure** — Logical component and layout organization
- **Hierarchy** — Clear and structured visual hierarchy
- **Maintainability** — Code that's easy to maintain and modify
- **Explainability** — Every decision can be explained and justified
- **Scalability** — Architecture that can grow with needs

---

## 📖 Reading Guide

### For Developers
- Start with [01 Core Objective](01%20Core%20Objective.md) and [02 MVP](02%20MVP.md)
- Review [03 Canonical Schema](03%20Canonical%20Schema.md) to understand the output format
- Check [11 Getting Started](11%20Getting%20Started.md) for implementation
- Reference [10 API Documentation](10%20API%20Documentation.md) for integration

### For AI Engineers
- Study [04 AI Roles](04%20AI%20Roles.md) for role-based reasoning
- Review [13 Prompt Templates](13%20Prompt%20Templates.md) for prompt engineering
- Understand [06 Ambiguity Handling](06%20Ambiguity%20Handling.md) for error management
- Check [05 Quality Assessment](05%20Quality%20Assessment.md) for quality metrics

### For System Architects
- Read [09 Architecture](09%20Architecture.md) for system design
- Review [08 Tech Stack](08%20Tech%20Stack.md) for technology choices
- Understand [07 Engineering Constraints](07%20Engineering%20Constraints.md) for guidelines

---

## 🔗 Key Concepts

### Canonical Output Schema
The **single source of truth** for all AI processes. Every analysis must produce this schema before code generation. See [03 Canonical Schema](03%20Canonical%20Schema.md).

### Role-Based Reasoning
Internal AI roles that ensure quality and consistency:
- **Analyzer** — Observes and identifies
- **Layout Engineer** — Makes structural decisions
- **Code Generator** — Implements code

Learn more in [04 AI Roles](04%20AI%20Roles.md).

### Quality Assessment
Every non-trivial output must include quality assessment covering:
- Visual Confidence
- Structural Confidence
- Responsive Risk
- Maintainability Risk
- Manual Adjustment Needed

Details in [05 Quality Assessment](05%20Quality%20Assessment.md).

---

## 📝 Document Conventions

- **MUST** / **WAJIB** — Mandatory requirements
- **MAY** / **BOLEH** — Optional but recommended
- **MUST NOT** / **TIDAK BOLEH** — Forbidden patterns
- **SHOULD** / **HARUS** — Strong recommendations

---

## 🆘 Support & Help

- **[FAQ](FAQ.md)** — Find answers to common questions
- **[TROUBLESHOOTING](TROUBLESHOOTING.md)** — Solutions to common issues
- **[CONTRIBUTING](CONTRIBUTING.md)** — How to contribute to Structra

---

## 🤝 Contributing

This documentation is part of the Structra project. For questions, suggestions, or contributions, please refer to the project repository.

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

---

## 📄 License

This documentation is part of the Structra project and follows the same license terms.

---

**Start Reading:** [01 Core Objective →](01%20Core%20Objective.md)
