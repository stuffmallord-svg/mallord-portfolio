# devfolio

> A blazing-fast, animated personal portfolio built with **Next.js 14**, **Framer Motion**, and **Tailwind CSS**. Designed for developers who want to make a lasting impression.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-purple?style=flat-square&logo=framer)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-cyan?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## 🔗 Live Demo

> **[https://creative-portfolio-ten-pi.vercel.app/](https://creative-portfolio-ten-pi.vercel.app/)**

---

## 📸 Screenshots

| Hero Section | Skills Section |
|---|---|
| ![Hero](https://via.placeholder.com/500x300/060608/ff4d00?text=Hero+Section) | ![Skills](https://via.placeholder.com/500x300/060608/ff4d00?text=Skills+Section) |

| Projects Section | Contact Section |
|---|---|
| ![Projects](https://via.placeholder.com/500x300/060608/ff4d00?text=Projects+Section) | ![Contact](https://via.placeholder.com/500x300/060608/ff4d00?text=Contact+Section) |

> 💡 Replace placeholders with real screenshots once deployed.

---

## ✨ Features

- 🎬 **Cinematic Animations** — Staggered text reveals, parallax scroll, and smooth page transitions powered by Framer Motion
- 🖱️ **Custom Cursor Glow** — Radial gradient that follows the mouse for an immersive feel
- 📊 **Animated Skill Bars** — Progress bars that animate into view on scroll
- 🗂️ **Project Showcase** — Hover-interactive project rows with color-coded tech tags
- 📱 **Fully Responsive** — Works seamlessly on mobile, tablet, and desktop
- 🌑 **Dark Theme** — Deep black (`#060608`) with an orange (`#ff4d00`) accent palette
- 🔢 **Scroll Progress Bar** — Fixed top bar showing reading progress
- 🎨 **Noise Texture Overlay** — Subtle grain effect for a premium look
- 🚫 **Zero External Icon Libraries** — All icons are inline SVGs (no bloat)
- ⚡ **Optimized Performance** — Static generation, minimal JS bundle, fast load times

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Fonts | [Syne](https://fonts.google.com/specimen/Syne) + [DM Sans](https://fonts.google.com/specimen/DM+Sans) (Google Fonts) |
| Deployment | [Vercel](https://vercel.com/) |

---

## 🚀 Installation & Setup

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) `v18+`
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### 1. Clone the Repository

```bash
git clone https://github.com/saadTkxon/creative-portfolio-next-js
cd devfolio
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
devfolio/
├── src/
│   └── app/
│       ├── layout.tsx       # Root layout
│       ├── page.tsx         # Main portfolio page (all sections)
│       └── globals.css      # Global styles
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind configuration
├── next.config.js           # Next.js configuration
└── package.json
```

---

## ✏️ Customization

### Update Your Info

Open `src/app/page.tsx` and edit the following:

```tsx
// Hero Section — apna naam likho
"FULL STACK", "DEVELOPER &", "DESIGNER"

// Stats — apni stats update karo
["5+", "Years Exp."], ["40+", "Projects"], ["98%", "Satisfaction"]

// Skills — apni skills add karo
{ name: "React / Next.js", level: 92, icon: "⚛️", cat: "Frontend" }

// Projects — apne projects add karo
{ title: "My Project", desc: "Description here", tags: ["Next.js"] }
```

### Change Accent Color

The primary accent color is `#ff4d00`. To change it, find-and-replace all instances of `#ff4d00` with your preferred color.

---

## 🚢 Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or simply push to GitHub and import the repo on [vercel.com](https://vercel.com).

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.

---

## 🙌 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

<p align="center">Made with ❤️ and too much coffee</p>