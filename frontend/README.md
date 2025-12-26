# 🎨 Frontend - Structra

Next.js 16+ frontend application untuk Structra dashboard dan playground.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Akses aplikasi di: http://localhost:3000

---

## 📁 Struktur Folder

```
frontend/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/             # React components
│   └── (shadcn/ui components)
├── lib/                    # Utilities & helpers
│   └── utils.ts           # Utility functions
├── public/                 # Static assets
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

---

## 🛠️ Tech Stack

- **Next.js 16+** - React framework dengan App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - UI component library
- **Radix UI** - Accessible primitives
- **Monaco Editor** - Code editor
- **Framer Motion** - Animations
- **React Hook Form + Zod** - Form handling & validation

---

## 📝 Environment Variables

Copy `env.example` ke `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🏗️ Development

### Menambah Component

1. Install shadcn/ui component:
```bash
npx shadcn-ui@latest add button
```

2. Atau buat custom component di `components/`

### Menambah Page

Buat file di `app/` folder:
```typescript
// app/about/page.tsx
export default function AboutPage() {
  return <div>About</div>
}
```

### Styling

- Gunakan Tailwind CSS classes
- Custom styles di `app/globals.css`
- Component styles dengan CSS modules (optional)

---

## 📦 Build & Deploy

```bash
# Build untuk production
npm run build

# Start production server
npm start
```

---

## 🔗 Links

- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/swagger
- **Backend Architecture**: [../backend/ARCHITECTURE.md](../backend/ARCHITECTURE.md)

---

## 📚 Documentation

Lihat dokumentasi lengkap di folder `../docs/`:
- [Getting Started](../docs/11%20Getting%20Started.md)
- [API Documentation](../docs/10%20API%20Documentation.md)
- [Architecture](../docs/09%20Architecture.md)

