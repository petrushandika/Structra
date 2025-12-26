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
    "type": "svg | css-gradient | pseudo-element | css-mask | clip-path | css-only | css-pattern | css-filter",
    "shape": "blob | wave | curve | flower | triangle | starburst | polygon | ribbon | subtract | custom | none",
    "position": "right | left | full | top | bottom",
    "technique": {
      "usesMask": false,
      "usesAspectRatio": null,
      "usesCalc": false,
      "usesClipPath": false,
      "usesCustomProperties": false
    },
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
  "ambiguities": [],
  
  "cssAnimations": [
    {
      "name": "fadeIn",
      "type": "keyframe | transition",
      "duration": "300ms",
      "timingFunction": "ease-in-out",
      "target": "component | section | element",
      "properties": ["opacity", "transform"]
    }
  ],
  
  "cssEffects": {
    "filters": {
      "blur": null,
      "brightness": null,
      "contrast": null,
      "dropShadow": null,
      "grayscale": null,
      "hueRotate": null,
      "invert": null,
      "saturate": null,
      "sepia": null
    },
    "backdropFilter": {
      "blur": null,
      "brightness": null,
      "saturate": null
    },
    "transforms": {
      "translate": null,
      "rotate": null,
      "scale": null,
      "skew": null
    }
  },
  
  "cssVariables": {
    "colors": {
      "--primary-color": "#000000",
      "--secondary-color": "#ffffff"
    },
    "spacing": {
      "--spacing-base": "4px"
    },
    "typography": {
      "--font-family-sans": "Inter, sans-serif"
    }
  },
  
  "modernCSS": {
    "containerQueries": {
      "enabled": false,
      "containerType": "inline-size | normal | size",
      "containerName": null
    },
    "hasSelector": {
      "enabled": false,
      "useCases": []
    },
    "cssLayers": {
      "enabled": false,
      "layers": []
    },
    "cssNesting": {
      "enabled": false
    }
  },
  
  "sourceCode": {
    "original": null,
    "framework": null,
    "language": null
  },
  
  "frameworkDetected": null,
  
  "codeQuality": {
    "score": null,
    "issues": [],
    "suggestions": []
  },
  
  "collectionMetadata": {
    "tags": [],
    "category": null,
    "usageCount": 0,
    "createdAt": null,
    "updatedAt": null
  },
  
  "revisionHistory": []
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
- `type`: Technology used (svg, css-gradient, pseudo-element, css-mask, clip-path, css-only, css-pattern, css-filter)
- `shape`: Shape type (blob, wave, curve, flower, triangle, starburst, polygon, ribbon, subtract, custom, none)
- `position`: Shape position (right, left, full, top, bottom)
- `technique`: Advanced CSS techniques used:
  - `usesMask`: Whether CSS mask is used
  - `usesAspectRatio`: Aspect ratio value (e.g., "1 / 1", "16 / 9") or null
  - `usesCalc`: Whether calc() function is used
  - `usesClipPath`: Whether clip-path is used
  - `usesCustomProperties`: Whether CSS custom properties are used
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

### `cssAnimations`
Array of CSS animations and transitions:
- `name`: Animation name (for keyframes) or transition target
- `type`: "keyframe" for @keyframes animations or "transition" for CSS transitions
- `duration`: Animation/transition duration (e.g., "300ms", "1s")
- `timingFunction`: Timing function (e.g., "ease-in-out", "cubic-bezier(...)")
- `target`: What element is animated (component, section, element)
- `properties`: Array of CSS properties being animated (e.g., ["opacity", "transform"])

### `cssEffects`
CSS effects and filters applied:
- `filters`: Object with filter properties (blur, brightness, contrast, dropShadow, etc.)
- `backdropFilter`: Object with backdrop-filter properties
- `transforms`: Object with transform properties (translate, rotate, scale, skew)

### `cssVariables`
CSS custom properties (CSS variables) used:
- `colors`: Color variables (e.g., "--primary-color": "#000000")
- `spacing`: Spacing variables (e.g., "--spacing-base": "4px")
- `typography`: Typography variables (e.g., "--font-family-sans": "Inter, sans-serif")

### `modernCSS`
Modern CSS features used:
- `containerQueries`: Container query configuration:
  - `enabled`: Whether container queries are used
  - `containerType`: Type of container (inline-size, normal, size)
  - `containerName`: Optional container name
- `hasSelector`: :has() selector usage:
  - `enabled`: Whether :has() selector is used
  - `useCases`: Array of use case descriptions
- `cssLayers`: CSS @layer usage:
  - `enabled`: Whether CSS layers are used
  - `layers`: Array of layer names
- `cssNesting`: Whether CSS nesting is used

### `sourceCode` (New)
Original code if input was code-based:
- `original`: Original code string (if from code input)
- `framework`: Framework of original code (tailwind, bootstrap, css-manual, scss, etc.)
- `language`: Language of original code (css, scss, html, etc.)

### `frameworkDetected` (New)
Auto-detected framework from code input:
- `null` if input was not code-based
- String value: "tailwind", "bootstrap", "css-manual", "scss", "css-modules", "postcss", etc.

### `codeQuality` (New)
Analysis of input code quality (only present for code input):
- `score`: Quality score (0-100) or null
- `issues`: Array of code quality issues found:
  - `type`: Issue type (magic-number, nested-absolute, deep-dom, inline-style, non-semantic, etc.)
  - `severity`: "high", "medium", "low"
  - `description`: Description of the issue
  - `location`: Where the issue occurs (line number, selector, etc.)
- `suggestions`: Array of refactoring suggestions

### `collectionMetadata` (New)
Metadata for collection management:
- `tags`: Array of tags for searching and categorization
- `category`: Category name (e.g., "hero-sections", "buttons", "shapes", etc.)
- `usageCount`: Number of times this CSS has been used/copied
- `createdAt`: ISO timestamp when added to collection
- `updatedAt`: ISO timestamp when last updated

### `revisionHistory` (New)
Array of revision objects tracking changes:
- Each revision object contains:
  - `id`: Unique revision ID
  - `timestamp`: ISO timestamp of revision
  - `action`: Action type ("created", "edited", "converted", "refactored")
  - `changes`: Description of changes made
  - `schemaVersion`: Schema version at time of revision

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

</div>

