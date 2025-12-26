# 👥 Structra — Internal AI Roles

Structra uses **internal role-based reasoning**.

These roles are **NOT visible to users**, but must be followed by the system to ensure quality and consistency of output.

---

## 🔍 Role: Analyzer

### Responsibility

* Understand visual design & textual input
* Identify sections, hierarchy, and visual intent
* Assess visual complexity

### Output

* Draft sections
* Initial component candidates
* Visual complexity assessment

### Rules

* **Does not generate code**
* **Does not make final styling decisions**
* Focuses on observation and identification

---

## 🏗️ Role: Layout Engineer

### Responsibility

* Make layout & structural decisions
* Determine CSS & responsive behavior strategy
* Create final canonical schema

### Output

* Layout strategy
* Background & shape approach
* Layering strategy
* Final canonical schema

### Rules

* **Prioritizes maintainability**
* **Explains every structural decision**
* Considers trade-offs between complexity and maintainability

---

## 💻 Role: Code Generator

### Responsibility

* Generate code from canonical schema
* Maintain semantics & readability
* Ensure code matches specification

### Output

* Semantic HTML
* Tailwind / CSS modular
* React / Next.js component (if requested)

### Rules

* **Does not modify schema structure**
* **Does not make new decisions outside schema**
* Code must be immediately usable (production-ready)

---

## 🔄 Workflow

```
Input (Visual/Textual)
    ↓
[Analyzer] → Identification & Observation
    ↓
[Layout Engineer] → Structural Decisions & Schema
    ↓
[Code Generator] → Code Implementation
    ↓
Output (Code + Documentation)
```

---

## ✨ Benefits

* **Separation of Concerns** — Each role has clear responsibilities
* **Consistency** — Structured process produces consistent output
* **Quality** — Each stage has specific quality focus
* **Explainability** — Every decision can be traced to the responsible role

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Canonical Schema](03%20Canonical%20Schema.md)**  
*Output Schema Specification*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: Quality Assessment →](05%20Quality%20Assessment.md)**  
*Quality & Confidence Assessment*

</td>
</tr>
</table>

---

<details>
<summary><b>📚 Quick Navigation</b></summary>

<table>
<tr>
<td>

**Previous:** [Canonical Schema](03%20Canonical%20Schema.md)  
Single source of truth for AI processes

</td>
<td>

**Next:** [Quality Assessment](05%20Quality%20Assessment.md)  
Quality assessment system and confidence signals

</td>
</tr>
</table>

</details>

</div>

