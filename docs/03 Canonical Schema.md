# 📋 Structra — Canonical Output Schema

The Canonical Output Schema is the **single source of truth** for all AI processes in Structra.

All AI processes **MUST** produce this schema before:
- Explanation
- Code generation
- Quality evaluation

Without this schema, output is considered **invalid**.

---

## 📐 Schema Structure (v1)

```json
{
  "meta": {
    "schemaVersion": "1.0",
    "inputType": ["image", "text"],
    "frameworkTarget": ["tailwind", "react"],
    "confidenceLevel": "high | medium | low"
  },

  "sections": [
    {
      "id": "hero",
      "role": "primary",
      "layout": "grid | flex | hybrid",
      "asymmetric": true,
      "description": "Hero section with left-aligned content and right background shape"
    }
  ],

  "components": [
    {
      "name": "HeroContent",
      "type": "container | presentational",
      "responsibility": "Text content and CTA",
      "reusable": true,
      "parentSection": "hero"
    }
  ],

  "layoutStrategy": {
    "mainApproach": "grid",
    "reason": "Asymmetric layout with clear column separation"
  },

  "backgroundStrategy": {
    "type": "svg | css-gradient | pseudo-element",
    "shape": "blob | wave | curve | none",
    "position": "right | left | full",
    "reason": "Complex organic shape better handled by SVG"
  },

  "layering": {
    "zIndexStrategy": "minimal",
    "positioning": "relative-with-absolute-children",
    "reason": "Maintain predictable stacking context"
  },

  "responsiveRules": [
    {
      "breakpoint": "mobile",
      "action": "restructure",
      "description": "Background blob simplified and moved behind content"
    }
  ],

  "assumptions": [],
  "ambiguities": []
}
```

---

## ⚙️ Rules

* Schema **MUST be generated completely** before code generation
* Code output **MUST come from schema**
* Schema **MAY be manually edited by user** before regenerating code

---

## 📖 Schema Fields Explanation

### `meta`
Metadata about schema and input:
- `schemaVersion`: Schema version used
- `inputType`: Input types accepted (image, text, or both)
- `frameworkTarget`: Target framework for output (tailwind, react, etc.)
- `confidenceLevel`: AI's confidence level in the analysis

### `sections`
List of main sections in the design:
- `id`: Unique identifier for section
- `role`: Section role (primary, secondary, etc.)
- `layout`: Layout approach used
- `asymmetric`: Whether layout is asymmetric
- `description`: Section description

### `components`
List of identified components:
- `name`: Component name
- `type`: Component type (container or presentational)
- `responsibility`: Component responsibility
- `reusable`: Whether component can be reused
- `parentSection`: Section that is the component's parent

### `layoutStrategy`
Selected layout strategy:
- `mainApproach`: Main approach (grid, flex, hybrid)
- `reason`: Reasoning for approach selection

### `backgroundStrategy`
Strategy for background and abstract shapes:
- `type`: Technology used (svg, css-gradient, pseudo-element)
- `shape`: Shape type (blob, wave, curve, none)
- `position`: Shape position (right, left, full)
- `reason`: Reasoning for strategy selection

### `layering`
Strategy for layering and z-index:
- `zIndexStrategy`: Z-index strategy (minimal, moderate, complex)
- `positioning`: Positioning strategy used
- `reason`: Reasoning for strategy selection

### `responsiveRules`
Responsive rules for various breakpoints:
- `breakpoint`: Target breakpoint (mobile, tablet, desktop)
- `action`: Action taken (restructure, simplify, hide)
- `description`: Description of changes

### `assumptions`
List of assumptions made by AI

### `ambiguities`
List of areas with ambiguities and how AI handles them

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: MVP](02%20MVP.md)**  
*Core System Prompt*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: AI Roles →](04%20AI%20Roles.md)**  
*Internal AI Roles*

</td>
</tr>
</table>

---

<details>
<summary><b>📚 Quick Navigation</b></summary>

<table>
<tr>
<td>

**Previous:** [MVP](02%20MVP.md)  
Core system prompt and main specifications

</td>
<td>

**Next:** [AI Roles](04%20AI%20Roles.md)  
Internal role-based reasoning

</td>
</tr>
</table>

</details>

</div>

