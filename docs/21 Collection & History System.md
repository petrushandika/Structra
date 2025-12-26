# 📚 Structra — Collection & History System

This document explains how Structra manages collections, history, versioning, and copy-paste functionality for generated CSS.

---

## 🎯 Overview

Structra's Collection & History System enables you to:

- **Save Generated CSS** — Store CSS patterns in organized collections
- **Organize & Search** — Tag, categorize, and search your collections
- **Track History** — Keep a complete history of all generations
- **Version Control** — Track revisions and changes over time
- **Copy-Paste** — Quickly reuse CSS patterns
- **Export/Import** — Share collections between projects

---

## 📋 Table of Contents

- [Collection Management](#collection-management)
- [Tagging & Categorization](#tagging--categorization)
- [History & Versioning](#history--versioning)
- [Copy-Paste Functionality](#copy-paste-functionality)
- [Edit from History](#edit-from-history)
- [Collection Sharing](#collection-sharing)
- [Export/Import](#exportimport)
- [Best Practices](#best-practices)

---

## 📦 Collection Management

### Creating Collections

Save generated CSS to collections for future use:

**API Request:**
```json
POST /collections
{
  "name": "Hero Section with Blob",
  "description": "Hero section with gradient blob background",
  "tags": ["hero", "blob", "gradient"],
  "category": "hero-sections",
  "schema": { ... },
  "code": "...",
  "framework": "tailwind"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "coll_123",
    "name": "Hero Section with Blob",
    "createdAt": "2025-01-15T10:00:00Z"
  }
}
```

### Collection Structure

Each collection item contains:

```json
{
  "id": "coll_123",
  "name": "Hero Section with Blob",
  "description": "Hero section with gradient blob background",
  "tags": ["hero", "blob", "gradient"],
  "category": "hero-sections",
  "schema": { ... },
  "code": "...",
  "framework": "tailwind",
  "usageCount": 5,
  "createdAt": "2025-01-15T10:00:00Z",
  "updatedAt": "2025-01-15T11:30:00Z",
  "preview": "base64_image"
}
```

### Listing Collections

Get all collections with filtering:

**API Request:**
```
GET /collections?page=1&limit=20&tags=hero,blob&category=hero-sections&framework=tailwind
```

**Response:**
```json
{
  "success": true,
  "data": {
    "collections": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "totalPages": 3
    }
  }
}
```

### Updating Collections

Update collection metadata:

**API Request:**
```json
PUT /collections/:id
{
  "name": "Updated Hero Section",
  "tags": ["hero", "blob", "updated"],
  "schema": { ... }
}
```

### Deleting Collections

Remove collections:

**API Request:**
```
DELETE /collections/:id
```

---

## 🏷️ Tagging & Categorization

### Tags

Organize collections with tags:

- **Purpose Tags** — `hero`, `footer`, `navigation`, `card`
- **Style Tags** — `blob`, `gradient`, `glassmorphism`, `minimal`
- **Framework Tags** — `tailwind`, `bootstrap`, `css-manual`
- **Component Tags** — `button`, `form`, `modal`, `dropdown`

**Example:**
```json
{
  "tags": ["hero", "blob", "gradient", "tailwind", "responsive"]
}
```

### Categories

Group collections by category:

- `hero-sections`
- `navigation`
- `cards`
- `forms`
- `buttons`
- `layouts`
- `effects`
- `animations`

### Search & Filter

Search collections by:

- **Tags** — Filter by one or more tags
- **Category** — Filter by category
- **Framework** — Filter by framework
- **Component Type** — Filter by component type
- **Text Search** — Search in name and description

---

## 📜 History & Versioning

### Generation History

Every CSS generation is automatically saved to history:

**History Entry:**
```json
{
  "id": "hist_456",
  "timestamp": "2025-01-15T10:00:00Z",
  "inputType": "image",
  "framework": "tailwind",
  "schema": { ... },
  "code": "...",
  "preview": "base64_image",
  "metadata": {
    "originalInput": "...",
    "processingTime": 2.5
  }
}
```

### Retrieving History

Get generation history:

**API Request:**
```
GET /history?page=1&limit=20&sort=createdAt&order=desc
```

**Response:**
```json
{
  "success": true,
  "data": {
    "history": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

### Revision Tracking

Track revisions of collections:

**Revision Structure:**
```json
{
  "id": "rev_789",
  "originalId": "hist_456",
  "parentId": "coll_123",
  "timestamp": "2025-01-15T11:00:00Z",
  "changes": {
    "description": "Updated colors and spacing",
    "schema": { ... },
    "code": "..."
  },
  "revisionNumber": 2
}
```

### Creating Revisions

Create a revision from history:

**API Request:**
```json
POST /revise
{
  "historyId": "hist_456",
  "changes": {
    "schema": { ... },
    "description": "Updated colors and spacing"
  }
}
```

---

## 📋 Copy-Paste Functionality

### Quick Copy

Copy CSS code directly from collections:

**Copy Options:**
- **CSS Code** — Copy generated CSS
- **HTML + CSS** — Copy complete HTML and CSS
- **Schema** — Copy Canonical Schema JSON
- **Framework-Specific** — Copy code for specific framework

### Paste & Reuse

Paste from collections to quickly reuse:

1. **Select Collection** — Choose from saved collections
2. **Copy Code** — Copy CSS or HTML+CSS
3. **Paste** — Paste into your project
4. **Customize** — Modify as needed

### Usage Tracking

Collections track usage:

- **Usage Count** — How many times collection was used
- **Last Used** — Timestamp of last usage
- **Popular Collections** — Most frequently used patterns

---

## ✏️ Edit from History

### Loading from History

Load previous generation for editing:

1. **Browse History** — View generation history
2. **Select Item** — Choose generation to edit
3. **Load** — Load schema and code
4. **Edit** — Make modifications
5. **Save** — Save as new collection or update existing

### Revision Workflow

1. **Start from History** — Load previous generation
2. **Make Changes** — Modify schema or code
3. **Create Revision** — Save as new revision
4. **Compare** — Compare with original
5. **Revert** — Revert to previous version if needed

---

## 🔗 Collection Sharing

### Sharing Collections

Share collections with team members:

**Sharing Options:**
- **Public** — Share publicly
- **Team** — Share with team members
- **Private** — Keep private
- **Link Sharing** — Share via link

### Shared Collection Access

Access shared collections:

- **View** — View shared collections
- **Copy** — Copy to your collections
- **Fork** — Create your own version

---

## 💾 Export/Import

### Exporting Collections

Export collections for backup or sharing:

**Export Formats:**
- **JSON** — Complete collection data
- **CSS Files** — Standalone CSS files
- **HTML + CSS** — Complete HTML and CSS
- **Schema** — Canonical Schema JSON

**API Request:**
```
GET /collections/:id/export?format=json
```

### Importing Collections

Import collections from files:

**API Request:**
```json
POST /collections/import
{
  "format": "json",
  "data": { ... }
}
```

---

## 🎯 Best Practices

### Collection Organization

1. **Use Descriptive Names** — Clear, descriptive collection names
2. **Tag Consistently** — Use consistent tagging scheme
3. **Categorize Properly** — Group related collections
4. **Add Descriptions** — Document what each collection does

### History Management

1. **Review Regularly** — Review history to find patterns
2. **Clean Up** — Remove unused history items
3. **Use Revisions** — Create revisions for significant changes
4. **Document Changes** — Add descriptions to revisions

### Copy-Paste Workflow

1. **Save First** — Save to collection before copying
2. **Verify Code** — Check code before pasting
3. **Customize** — Adapt code to your needs
4. **Test** — Test pasted code in your project

---

## ⚠️ Limitations

### Current Limitations

1. **Collection Size** — Large collections may have size limits
2. **History Retention** — History may be retained for limited time
3. **Sharing Permissions** — Sharing permissions may be limited
4. **Export Formats** — Some export formats may have limitations

### Workarounds

- Export important collections regularly
- Use version control for critical patterns
- Document collection purposes clearly
- Organize collections systematically

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: Code Input & Reverse Engineering](20%20Code%20Input%20%26%20Reverse%20Engineering.md)**  
*Code Input & Reverse Engineering*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: Visual Editor Guide →](22%20Visual%20Editor%20Guide.md)**  
*Visual Editor Features*

</td>
</tr>
</table>

---

</div>

