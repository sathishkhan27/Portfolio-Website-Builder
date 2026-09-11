# 🚀 WB — Modern Portfolio Website Builder

A state-of-the-art, interactive portfolio website builder designed for developers, designers, engineers, and creators. Build, customize, and export production-ready, ultra-responsive portfolio websites with zero code in minutes.

![WB Studio Preview](public/logo.png)

[![React 19](https://img.shields.io/badge/React-19.3.0-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/State-Zustand_5-443e38?style=for-the-badge)](https://zustand-demo.pmnd.rs/)

---

## ✨ Features at a Glance

### 🎨 9 High-Converting Design Templates
- **Modern Developer**: Dark glassmorphic aesthetic with animated gradient accents, skill chips, and timeline view.
- **Minimal Clean**: High-contrast, typography-first layout for senior architects and minimalist creators.
- **Creative Designer / Terracotta 3D Avatar**: Warm editorial palettes with 3D avatar showcases and bold headings.
- **Executive Leader**: Sleek, corporate credibility architecture suited for VP, CTO, and Engineering Leads.
- **Clean Designer & Creator**: Scandinavian design with soft shadows and card layouts.
- **Terminal / Hacker Console**: Retro hacker CLI interface with command prompt interactions.
- **Bento Grid Showcase**: Modern Apple-style modular bento cards for projects, metrics, and stacks.
- **3D Cyber Card**: Neon cybernetic borders with interactive depth and hover tilt physics.
- **Brutalist Editorial**: Raw borders, high-impact typography, and bold monochromatic contrast.

---

### 🌈 Real-Time Visual Theme & Styling Engine
- **In-App 2D Color Spectrum Picker**: Integrated smooth drag-and-drop saturation/lightness canvas, rainbow hue slider, and modern preset swatches powered by `react-colorful`.
- **Eyedropper API**: Native 1-click eyedropper tool to sample any color directly from your display.
- **Mode Adaptation (Dark ↔ Light)**: 1-click theme mode switching with real-time palette re-calculation (canvas background, surfaces, cards, and high-contrast typography).
- **7 Curated Theme Presets**: Cyberpunk Neon, Emerald Matrix, Obsidian & Gold, Oceanic Azure, Tokyo Violet, Daylight Minimal, and Nordic Frost.
- **Geometry & Effects**: Customize border radii (square, subtle, standard, rounded, pill), button styles (glow, gradient, solid, outline), and glassmorphism frosted-blur effects.

---

### 💻 Real-Time Multi-Device Simulator
- **Viewport Modes**: Instantly test how your portfolio looks on **Desktop (100%)**, **Tablet (768px)**, and **Mobile (375px)**.
- **Zoom & Pan Controls**: Scale canvas from 60% to 120% with 1-click reset.
- **1-Click Fullscreen View**: Expand to a distraction-free 100% full-screen live preview with keyboard shortcut (`Esc` to exit).
- **Quick-Switcher Toolbar**: Switch templates and primary brand colors directly from the live preview toolbar without leaving preview mode.

---

### 📝 Comprehensive Content Management
- **Personal Info**: Full name, professional title, bio, location, availability badge, and custom profile avatar.
- **Metrics & Highlights**: Key achievements (e.g. "10+ Years Exp", "50+ Projects Shipped").
- **Skills & Tech Stack**: Categorized chips (Frontend, Backend, DevOps, AI/ML, Cloud) with proficiency levels.
- **Work Experience**: Interactive career timeline with roles, companies, dates, and bulleted accomplishments.
- **Featured Projects**: Rich project cards with live demo URLs, GitHub repositories, and tech tags.
- **Services & Offerings**: Client engagement models, deliverables, and rates.
- **Education & Certifications**: Degrees, verified credentials, issuing organizations, and badges.
- **Social Links & Contact Details**: GitHub, LinkedIn, Twitter/X, Portfolio, Email, and Calendly meeting booking links.
- **SEO & OpenGraph**: Custom page titles, meta descriptions, canonical URLs, and social share preview cards.
- **Section Manager**: Toggle visibility and reorder any portfolio section on the fly.

---

### 📦 Export & Production Deployment
- **Complete Source Code ZIP**: Download a ready-to-deploy Vite + React 19 + TypeScript + Tailwind CSS project with all components and configuration files included.
- **Standalone HTML Export**: Export a single-file, self-contained HTML/CSS/JS bundle ready to host anywhere.
- **JSON Backup & Migration**: Export your entire portfolio data to a JSON backup file and restore or clone it anytime.
- **VIP Lifetime Membership**: Integrated Razorpay gateway modal for instant membership upgrades.

---

## 📁 Project Structure

```text
Portfolio-Website-Builder/
├── index.html                    # HTML entry point with Google Fonts
├── package.json                  # Dependencies and build scripts
├── vite.config.ts                # Vite 8 configuration with Tailwind v4 plugin
├── tsconfig.json                 # TypeScript strict compiler options
├── render.yaml                   # 1-click Render static site deployment config
├── public/                       # Static public assets (logo, icons, previews)
└── src/
    ├── main.tsx                  # React DOM root render
    ├── App.tsx                   # Main application entry point
    ├── index.css                 # Core design tokens, Tailwind layers & utility classes
    ├── builder/                  # Main studio interface
    │   ├── BuilderLayout.tsx     # Responsive split-screen workspace
    │   ├── BuilderSidebar.tsx    # Multi-tab navigation sidebar
    │   ├── ThemeCustomizer.tsx   # Visual theme & token styling engine
    │   ├── TemplateSelector.tsx  # Interactive template gallery
    │   ├── SectionManager.tsx    # Section toggles & drag-and-drop reordering
    │   ├── ExportPanel.tsx       # ZIP and HTML export controls
    │   ├── JsonImportExport.tsx  # JSON configuration backup & restore
    │   ├── MembershipBadge.tsx   # VIP lifetime membership badge
    │   ├── MembershipModal.tsx   # Razorpay payment gateway checkout modal
    │   └── editors/              # Dedicated forms for each portfolio section
    ├── live-preview/             # Interactive live canvas
    │   ├── LivePreviewBar.tsx    # Viewport switcher, zoom, theme, and full view bar
    │   └── LivePreviewFrame.tsx  # Dynamic device frame with theme provider
    ├── template-engine/          # Registry & template loaders
    │   └── registry.ts           # Dynamic component mapping and metadata
    ├── templates/                # 9 distinct portfolio themes & designs
    │   ├── modern-developer/     # Glassmorphic developer portfolio
    │   ├── minimal-clean/        # Clean typography portfolio
    │   ├── creative-designer/    # Terracotta 3D avatar portfolio
    │   ├── executive-leader/     # Executive leadership showcase
    │   ├── clean-designer/       # Scandinavian creator portfolio
    │   ├── terminal-hacker/      # Interactive CLI/terminal console
    │   ├── bento-grid/           # Modern bento grid layout
    │   ├── cyber-card/           # 3D Cyber tilt card portfolio
    │   └── brutalist-editorial/  # High-contrast brutalist design
    ├── theme-engine/             # Theme tokens & palettes
    │   ├── themePresets.ts       # Curated theme configs
    │   └── ThemeProvider.tsx     # Context & CSS variables provider
    ├── store/                    # State management
    │   └── usePortfolioStore.ts  # Zustand store with persistent LocalStorage
    ├── export-engine/            # Code generation & ZIP bundling
    │   └── projectGenerator.ts   # Standalone Vite project generator
    ├── services/                 # External integrations
    │   └── razorpay.ts           # Razorpay checkout script & order handler
    └── ui/                       # Reusable UI primitives
        ├── ColorPicker.tsx       # In-app 2D spectrum color picker & eyedropper
        ├── Input.tsx             # Styled text inputs
        ├── Select.tsx            # Styled dropdowns
        ├── Switch.tsx            # Animated toggle switches
        └── Textarea.tsx          # Auto-resizing textareas
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or later
- **npm**: `v9.0.0` or later

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/sathishkhan27/Portfolio-Website-Builder.git
   cd Portfolio-Website-Builder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

---

## 🏗️ Production Build

To compile the production build:

```bash
npm run build
```

This validates TypeScript types (`tsc`) and compiles optimized static assets into the `dist/` folder via Vite.

To preview the production build locally:

```bash
npm run preview
```

---

## 🚢 Deployment

### Deploying to Render
This repository includes a `render.yaml` blueprint. Simply link your GitHub repository to [Render](https://render.com) as a **Static Site**:
- **Build Command**: `npm run build`
- **Publish Directory**: `./dist`
- **Rewrite Rule**: `/*` → `/index.html`

### Deploying to Vercel
```bash
npx vercel
```
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Deploying to Netlify
```bash
npx netlify deploy --prod --dir=dist
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check out the [issues page](https://github.com/sathishkhan27/Portfolio-Website-Builder/issues).

---

## 📄 License

This project is licensed under the MIT License — see the repository for details.
