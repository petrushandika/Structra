# 🎨 Structra — Visual Editor Guide

This document explains Structra's visual editor features, including live preview, real-time editing, parameter tuning, and drag-and-drop functionality.

---

## 🎯 Overview

Structra's Visual Editor provides an intuitive interface for:

- **Live Preview** — See changes in real-time
- **Parameter Tuning** — Adjust colors, spacing, shapes visually
- **Drag-and-Drop** — Reposition elements visually
- **Visual Feedback** — Instant visual feedback on changes
- **Code Sync** — Automatic code generation from visual edits

---

## 🖥️ Visual Editor Interface

### Editor Layout

The visual editor consists of:

1. **Canvas Area** — Main editing area with live preview
2. **Properties Panel** — Parameter controls on the right
3. **Toolbar** — Editing tools at the top
4. **Code Panel** — Generated code view (toggleable)
5. **Schema Panel** — Canonical Schema view (toggleable)

### Canvas Features

- **Zoom Controls** — Zoom in/out for detailed editing
- **Grid Overlay** — Toggle grid for alignment
- **Ruler Guides** — Show rulers for precise positioning
- **Responsive Preview** — Switch between breakpoints
- **Device Preview** — Preview on different device sizes

---

## ⚡ Live Preview System

### Real-Time Updates

Changes in the visual editor update the preview instantly:

1. **Parameter Changes** — Adjust sliders, color pickers
2. **Element Selection** — Click elements to select
3. **Property Editing** — Edit properties in the panel
4. **Layout Adjustments** — Drag elements to reposition

### Preview Modes

1. **Desktop Preview** — Full desktop view
2. **Tablet Preview** — Tablet breakpoint view
3. **Mobile Preview** — Mobile breakpoint view
4. **Custom Breakpoint** — Set custom breakpoint

### Performance

- **Optimized Rendering** — Efficient re-rendering
- **Debounced Updates** — Smooth parameter adjustments
- **Lazy Loading** — Load previews on demand

---

## 🎛️ Parameter Tuning

### Color Parameters

Adjust colors visually:

**Color Picker:**
- Primary colors
- Secondary colors
- Background colors
- Text colors
- Gradient stops

**Example:**
```
Primary Color: #667eea
Secondary Color: #764ba2
Background: linear-gradient(135deg, #667eea, #764ba2)
```

### Spacing Parameters

Adjust spacing with sliders:

- **Padding** — Inner spacing
- **Margin** — Outer spacing
- **Gap** — Space between elements
- **Border Radius** — Corner rounding

**Example:**
```
Padding: 24px
Margin: 16px
Gap: 12px
Border Radius: 8px
```

### Typography Parameters

Adjust typography:

- **Font Size** — Text size
- **Font Weight** — Text weight
- **Line Height** — Line spacing
- **Letter Spacing** — Character spacing

**Example:**
```
Font Size: 32px
Font Weight: 700
Line Height: 1.5
Letter Spacing: 0.02em
```

### Shape Parameters

Adjust shape properties:

**Blob Parameters:**
- Complexity (number of points)
- Smoothness
- Size
- Position

**Wave Parameters:**
- Frequency (waves per unit)
- Amplitude (wave height)
- Phase (wave offset)
- Direction

**Subtract Parameters:**
- Cutout size
- Cutout position
- Cutout shape
- Blend mode

**Example:**
```
Blob:
  Complexity: 8
  Smoothness: 0.5
  Size: 400px
  Position: right
```

### Animation Parameters

Adjust animations:

- **Duration** — Animation duration
- **Timing Function** — Easing function
- **Delay** — Animation delay
- **Iteration Count** — Repeat count

**Example:**
```
Duration: 300ms
Timing Function: ease-in-out
Delay: 0ms
Iteration: infinite
```

---

## 🖱️ Drag-and-Drop Layout Adjustment

### Element Selection

Click elements to select:

- **Single Selection** — Click an element
- **Multi-Selection** — Ctrl/Cmd + Click
- **Area Selection** — Drag to select area

### Dragging Elements

Drag elements to reposition:

1. **Select Element** — Click to select
2. **Drag Handle** — Drag from handle
3. **Drop Position** — Drop at new position
4. **Auto-Align** — Snap to grid or guides

### Layout Constraints

The editor respects layout constraints:

- **Grid Layout** — Snap to grid
- **Flex Layout** — Maintain flex order
- **Absolute Positioning** — Free positioning
- **Container Boundaries** — Stay within container

### Visual Feedback

While dragging:

- **Ghost Preview** — Show where element will be
- **Alignment Guides** — Show alignment lines
- **Distance Indicators** — Show spacing
- **Constraint Indicators** — Show layout constraints

---

## 🎨 Visual Feedback System

### Selection Feedback

When selecting elements:

- **Highlight Border** — Colored border around element
- **Property Panel** — Show element properties
- **Code Highlight** — Highlight corresponding code
- **Schema Highlight** — Highlight in schema view

### Change Feedback

When making changes:

- **Preview Update** — Instant preview update
- **Code Update** — Code panel updates
- **Schema Update** — Schema updates
- **Change Indicator** — Show what changed

### Error Feedback

When errors occur:

- **Error Highlight** — Red border on problematic element
- **Error Message** — Description of error
- **Suggestion** — How to fix the error

### Success Feedback

When changes succeed:

- **Success Indicator** — Green checkmark
- **Change Summary** — Summary of changes
- **Undo Option** — Option to undo

---

## 🔄 Code Synchronization

### Automatic Code Generation

Visual edits automatically generate code:

1. **Visual Edit** — Make change in editor
2. **Schema Update** — Update Canonical Schema
3. **Code Generation** — Generate code from schema
4. **Code Display** — Show in code panel

### Code Panel

The code panel shows:

- **HTML** — Generated HTML structure
- **CSS** — Generated CSS
- **Tailwind Classes** — Utility classes
- **Framework Code** — Framework-specific code

### Code Editing

You can also edit code directly:

1. **Edit Code** — Modify code in code panel
2. **Apply Changes** — Apply to visual editor
3. **Sync Preview** — Update preview
4. **Update Schema** — Update Canonical Schema

---

## 🛠️ Editing Tools

### Selection Tool

Select elements for editing:

- **Click to Select** — Single click
- **Double Click** — Edit element
- **Right Click** — Context menu

### Transform Tool

Transform elements:

- **Move** — Reposition element
- **Resize** — Change size
- **Rotate** — Rotate element
- **Scale** — Scale element

### Shape Tool

Edit shapes:

- **Blob Editor** — Adjust blob points
- **Wave Editor** — Adjust wave parameters
- **Subtract Editor** — Edit cutouts
- **Path Editor** — Edit custom paths

### Text Tool

Edit text:

- **Select Text** — Click text to edit
- **Edit Content** — Change text content
- **Style Text** — Adjust typography
- **Format Text** — Apply formatting

---

## 📐 Alignment & Guides

### Grid System

Toggle grid overlay:

- **Show Grid** — Display grid lines
- **Snap to Grid** — Snap elements to grid
- **Grid Size** — Adjust grid spacing
- **Grid Color** — Customize grid appearance

### Ruler Guides

Show rulers:

- **Horizontal Ruler** — Top ruler
- **Vertical Ruler** — Left ruler
- **Guide Lines** — Drag from rulers
- **Smart Guides** — Auto-alignment guides

### Alignment Tools

Align elements:

- **Align Left** — Align to left
- **Align Center** — Align to center
- **Align Right** — Align to right
- **Distribute** — Distribute evenly

---

## 📱 Responsive Editing

### Breakpoint Switching

Switch between breakpoints:

1. **Desktop** — Edit desktop layout
2. **Tablet** — Edit tablet layout
3. **Mobile** — Edit mobile layout
4. **Custom** — Set custom breakpoint

### Responsive Properties

Some properties are responsive:

- **Spacing** — Different spacing per breakpoint
- **Typography** — Different font sizes
- **Layout** — Different layout strategies
- **Visibility** — Show/hide per breakpoint

### Responsive Preview

Preview at different sizes:

- **Device Frames** — Show device frames
- **Viewport Size** — Adjust viewport
- **Orientation** — Portrait/landscape
- **Zoom Level** — Adjust zoom

---

## 🎯 Best Practices

### Visual Editing

1. **Start with Structure** — Set up layout first
2. **Then Style** — Add styling after structure
3. **Test Responsive** — Check all breakpoints
4. **Refine Details** — Fine-tune parameters

### Parameter Tuning

1. **Use Sliders** — Adjust with sliders for precision
2. **Use Color Pickers** — Visual color selection
3. **Preview Changes** — Check preview before applying
4. **Undo When Needed** — Use undo for mistakes

### Drag-and-Drop

1. **Use Guides** — Enable alignment guides
2. **Snap to Grid** — Use grid for alignment
3. **Check Constraints** — Respect layout constraints
4. **Test Layout** — Verify layout after changes

---

## ⚠️ Limitations

### Current Limitations

1. **Complex Animations** — Some animations may need code editing
2. **JavaScript Logic** — Cannot edit JavaScript in visual editor
3. **Custom Code** — Custom code may not sync perfectly
4. **Performance** — Very large designs may be slower

### Workarounds

- Use code panel for complex edits
- Combine visual and code editing
- Break large designs into components

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Collection & History System](21%20Collection%20%26%20History%20System.md)**  
*Collection Management*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: Complex Layout Handling →](23%20Complex%20Layout%20Handling.md)**  
*Extreme Layouts & Edge Cases*

</td>
</tr>
</table>

---

</div>

