# AI Document Search & Q&A System - Frontend

A production-grade Next.js frontend application for an AI-powered document search and question-answering SaaS platform. Built with modern web technologies and best practices.

## 🚀 Project Overview

This frontend application provides a clean, intuitive interface for users to search and ask questions over large volumes of documents. The system supports PDFs, spreadsheets, and presentations with AI-powered hybrid retrieval (semantic + keyword search).

### Key Features

- **AI-Powered Search**: Natural language queries with instant, accurate answers
- **Hybrid Retrieval**: Combines vector search and BM25 keyword matching
- **Document Processing**: Asynchronous upload and processing of documents
- **Multi-Tenant Support**: Workspace isolation and role-based access control
- **Enterprise Security**: JWT authentication, RBAC, and audit logs
- **Responsive Design**: Clean, minimal UI that works on all devices

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: [ShadCN UI](https://ui.shadcn.com)
- **State Management**: Redux Toolkit + RTK Query
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Zod
- **Font**: DM Sans (Google Fonts)

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

## 🏃 Getting Started

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build

```bash
# Create production build
npm run build
# or
yarn build
# or
pnpm build
```

### Start Production Server

```bash
npm start
# or
yarn start
# or
pnpm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── (marketing)/          # Public marketing pages
│   │   ├── layout.tsx       # Marketing layout (Navigation + Footer)
│   │   ├── page.tsx         # Home page
│   │   ├── about/           # About page
│   │   ├── pricing/         # Pricing page
│   │   └── contact/         # Contact page
│   ├── (dashboard)/         # Authenticated dashboard pages
│   │   └── layout.tsx       # Dashboard layout (no Navigation/Footer)
│   ├── (auth)/              # Authentication pages
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # ShadCN UI primitives
│   ├── common/              # Shared app components
│   ├── layout/              # Layout components (Navigation, Footer)
│   └── home/                # Home page components
├── features/                # Feature-based modules
│   └── <feature-name>/
│       ├── components/
│       ├── hooks/
│       ├── services/        # RTK Query endpoints
│       └── types.ts
├── store/                   # Redux store
│   ├── index.ts
│   ├── rootReducer.ts
│   ├── baseApi.ts
│   └── slices/
├── lib/
│   └── axios.ts             # Axios instance configuration
└── hooks/                   # Shared React hooks
```

## 🎨 Design Principles

- **Clean & Minimal**: Plenty of whitespace, clear visual hierarchy
- **Consistent**: Unified spacing, typography, and component usage
- **Accessible**: WCAG compliant, keyboard navigation support
- **Fast**: Optimized performance with Server Components by default
- **Responsive**: Mobile-first design that scales to all screen sizes

## 📝 Code Standards

### Naming Conventions

- **Folders**: kebab-case (`about-page`, `user-profile`)
- **Files**: PascalCase (`Navigation.tsx`, `ContactForm.tsx`)
- **Components**: PascalCase (`Navigation`, `ContactForm`)
- **Hooks**: camelCase with `use` prefix (`useAuth`, `useDocument`)
- **Redux Slices**: camelCase with `Slice` suffix (`authSlice.ts`)
- **RTK Endpoints**: camelCase with `.api.ts` suffix (`document.api.ts`)

### Component Guidelines

- Prefer Server Components by default
- Use Client Components only when necessary (interactivity, hooks)
- One responsibility per component
- Extract repeated UI into reusable components
- Pages should only compose components, no business logic

### State Management

- **RTK Query**: Only way to fetch server data
- **Redux Toolkit**: For global application state
- **Local State**: React hooks for component-specific state
- No direct `fetch()` calls in components
- No Axios calls inside components

## 🔐 Authentication & Security

- Route protection using Next.js middleware
- Role-based rendering
- JWT token handling via secure cookies/headers
- Sensitive data never rendered on client

## 🚢 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

This Next.js application can be deployed to any platform that supports Node.js:
- AWS Amplify
- Netlify
- Railway
- DigitalOcean App Platform

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [ShadCN UI Documentation](https://ui.shadcn.com)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🤝 Contributing

This is a production-grade SaaS application. Code should be:
- Clean and maintainable
- Well-documented
- Tested where applicable
- Following the established patterns

## 📄 License

[Add your license here]

---

Built with ❤️ for enterprise document intelligence
