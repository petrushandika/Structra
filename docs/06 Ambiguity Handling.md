# ⚠️ Structra — Ambiguity & Failure Handling

This document defines how AI in Structra handles ambiguities, uncertainties, and failures in design analysis.

---

## 🔍 Ambiguity Detection

AI **MUST** detect and record if:

* Visual shape is unclear
* Overlapping is undefined
* Design information is incomplete
* Responsiveness cannot be inferred
* Conflict between visual and textual input

---

## 📝 Assumption Declaration

Every assumption made by AI **MUST** be recorded in the canonical schema:

```json
"assumptions": [
  "Background shape assumed decorative, not interactive",
  "Mobile breakpoint assumed at 768px based on common practice",
  "Color contrast assumed sufficient for accessibility"
]
```

### Rules

* Assumptions must be **explicit and accountable**
* Assumptions **MAY** be changed by user before code generation
* Unrecorded assumptions are considered **system failure**

---

## ⚠️ Ambiguity Declaration

When AI finds ambiguity, it must be recorded in the following format:

```json
"ambiguities": [
  {
    "area": "hero-background",
    "issue": "Exact shape contour unclear",
    "alternatives": ["svg-blob", "css-gradient"],
    "chosen": "svg-blob",
    "reason": "SVG provides better control for organic shapes"
  }
]
```

### Format Fields

* `area`: Design area with ambiguity
* `issue`: Description of problem or uncertainty
* `alternatives`: List of alternative solutions considered
* `chosen`: Solution chosen
* `reason`: Reasoning for solution selection

---

## 📋 Behavior Rules

### AI MUST NOT:
* **Stay silent when uncertain** — Must state uncertainty
* **Ignore ambiguities** — All ambiguities must be recorded
* **Make assumptions without documentation** — All assumptions must be explicit

### AI MUST:
* **State uncertainty** — Be honest about analysis limitations
* **Record all assumptions** — Full transparency
* **Provide alternatives** — If possible, provide several options

### AI MAY:
* **Request clarification** — If ambiguity is critical and affects output
* **Use heuristics** — Based on industry best practices
* **Make decisions with documentation** — As long as well documented

---

## 🚨 Failure Handling

### When is Output Considered Failed?

* Schema is incomplete or invalid
* Critical assumptions not recorded
* Critical ambiguity not handled
* Code doesn't match schema

### Response Strategy

1. **Early detection** — Identify problems before code generation
2. **Documentation** — Record all problems in schema
3. **Fallback** — Use conservative solution if needed
4. **Transparency** — Communicate problems to user

---

## 💡 Best Practices

* **When in doubt, document** — Better to record too much than too little
* **Conservative choices** — Choose solutions easier to change if uncertain
* **User empowerment** — Give users control to change assumptions and decisions
* **Iterative refinement** — Schema can be improved through iteration

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Quality Assessment](05%20Quality%20Assessment.md)**  
*Quality & Confidence Assessment*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: Engineering Constraints →](07%20Engineering%20Constraints.md)**  
*Engineering Constraints & Design System*

</td>
</tr>
</table>

---

<details>
<summary><b>📚 Quick Navigation</b></summary>

<table>
<tr>
<td>

**Previous:** [Quality Assessment](05%20Quality%20Assessment.md)  
Quality assessment system and confidence signals

</td>
<td>

**Next:** [Engineering Constraints](07%20Engineering%20Constraints.md)  
Constraints, forbidden patterns, design system awareness

</td>
</tr>
</table>

</details>

</div>

