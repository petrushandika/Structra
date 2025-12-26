# ✅ Structra — Quality & Confidence Assessment

Every non-trivial output **MUST** include quality assessment.

This assessment helps users understand:
* AI's confidence level in the output
* Areas that may require manual adjustment
* Risks associated with implementation

---

## 📊 Quality Assessment Format

```markdown
## Quality Assessment

- Visual Confidence: High | Medium | Low
- Structural Confidence: High | Medium | Low
- Responsive Risk: Low | Medium | High
- Maintainability Risk: Low | Medium | High
- Manual Adjustment Needed: None | Minor | Moderate | Significant
```

---

## 📏 Assessment Criteria

### Visual Confidence

AI's confidence level in visual design interpretation:

* **High**: Design is clear, unambiguous, all elements well identified
* **Medium**: Most of design is clear, some areas require assumptions
* **Low**: Design is unclear, many ambiguities, many assumptions needed

### Structural Confidence

AI's confidence level in structure and layout:

* **High**: Layout strategy is clear, components well identified, hierarchy clear
* **Medium**: Layout strategy generally clear, some structural decisions require assumptions
* **Low**: Layout is unclear, much uncertainty in structure

### Responsive Risk

Risk associated with responsive implementation:

* **Low**: Layout easily adaptable, responsive strategy clear, no special complexity
* **Medium**: Some areas require special attention, may have trade-offs
* **High**: Complex layout, responsive adaptation requires significant restructuring

### Maintainability Risk

Risk associated with code maintainability:

* **Low**: Simple code, clear structure, easy to understand and modify
* **Medium**: Some complexity, but still manageable
* **High**: Complex code, complicated structure, difficult to understand or modify

### Manual Adjustment Needed

Estimate of how much manual adjustment is needed:

* **None**: Output ready to use without modification
* **Minor**: Small adjustments needed (spacing, colors, etc.)
* **Moderate**: Significant adjustments needed in some areas
* **Significant**: Major revision or restructuring needed

---

## 📖 Interpretation Rules

### High Confidence ≠ Pixel-Perfect

* **High Confidence** means AI is confident in interpretation and structure, not that output is 100% design-accurate
* Users still need to make adjustments to achieve pixel-perfect

### Low Risk = Easy to Adjust

* **Low Risk** means easy to adjust by developers
* Doesn't mean no adjustment needed, but adjustment is easy to do

### Manual Adjustment is Normal

* **Manual adjustment is ALLOWED and NORMAL**
* AI focuses on structure and maintainability, not pixel-perfect
* Manual adjustment is part of normal workflow

---

## 📘 Usage Guidelines

### For Users

* Use quality assessment to set expectations
* Focus on high-risk areas for more detailed review
* Don't hesitate to make manual adjustments as needed

### For AI System

* **Be honest** in assessment — Don't overestimate confidence
* **Be consistent** in criteria — Use same standards for all outputs
* **Be transparent** — Explain reasoning behind each assessment if needed

---

## 💡 Example

```markdown
## Quality Assessment

- Visual Confidence: High
  - All elements clearly identified
  - Shapes and layout unambiguous
  
- Structural Confidence: High
  - Layout strategy clear (grid-based)
  - Components well identified
  
- Responsive Risk: Medium
  - Desktop layout clear
  - Mobile requires background blob restructuring
  
- Maintainability Risk: Low
  - Code simple and structured
  - Uses common patterns
  
- Manual Adjustment Needed: Minor
  - Spacing adjustment needed on mobile
  - Colors may need to match design system
```

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: AI Roles](04%20AI%20Roles.md)**  
*Internal AI Roles*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: Ambiguity Handling →](06%20Ambiguity%20Handling.md)**  
*Ambiguity & Failure Handling*

</td>
</tr>
</table>

---

</div>

