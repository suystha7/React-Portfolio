# 💼 Portfolio SPA — Next.js + Tailwind + Framer Motion + GSAP

An SEO-friendly **single-page portfolio** with light/dark mode, rich Framer Motion
+ GSAP animations, and a clean shadcn-style component structure.

**Design language:** all text is simple **black in light mode / white in dark mode**;
🔵 blue `#2563EB` + 🟠 orange `#F97316` appear only on non-text accents (buttons,
icons, rings, glows, underlines).

---

## ✨ Features

| Section | What's inside |
|---|---|
| **Hero** | Split-text name reveal, typewriter roles, GSAP mouse parallax on the animated profile + orbs, magnetic CTA buttons, CV download, GitHub link |
| **About** | Frontend foundation story, 3D-tilt highlight tiles, staggered checklist, animated stat counters |
| **Journey** | Career / Education timeline with animated tabs + a GSAP scroll-scrubbed progress line |
| **Skills** | Infinite horizontal tech marquee (2 rows, opposite directions, pause on hover) |
| **Projects** | Spring-animated category filter + 3D-tilt **laptop + phone mockups** per project (drop in real screenshots or keep the auto mock UI) |
| **Contact** | Slide-in detail cards with copy-to-clipboard, magnetic send button, animated success state |
| **Global** | Cursor-following ambient glow, hide-on-scroll navbar with scroll-spy, scroll progress bar, 6-style reveal system, back-to-top footer |

**Motion stack:** Framer Motion (springs, staggers, 3D tilt, magnetic hovers,
scroll reveals) + GSAP ScrollTrigger (scrubbed parallax, timeline progress line,
mouse parallax).

**SEO:** SSR App Router, metadata + Open Graph + Twitter cards, auto `sitemap.xml`,
`robots.txt`, JSON-LD Person schema, and an auto-generated OG social image.

---

## 📁 Folder Structure

```
portfolio-spa/
├── public/
│   ├── resume.pdf              # ← replace with YOUR real CV (same filename)
│   └── projects/               # ← optional real screenshots (.jpg/.png)
├── src/
│   ├── app/
│   │   ├── layout.tsx          # fonts, theme provider, SEO metadata, JSON-LD
│   │   ├── page.tsx            # composes all sections (the SPA)
│   │   ├── globals.css         # Tailwind + black/white text tokens + utilities
│   │   ├── sitemap.ts          # auto sitemap.xml
│   │   ├── robots.ts           # auto robots.txt
│   │   ├── icon.svg            # favicon
│   │   └── opengraph-image.tsx # auto social share card
│   ├── components/
│   │   ├── ui/                 # shadcn-style primitives (button, badge, card…)
│   │   ├── layout/             # Navbar, Footer
│   │   ├── sections/           # Hero, About, Timeline, TechMarquee, Projects, Contact
│   │   ├── mockups/            # LaptopMockup + PhoneMockup device frames
│   │   └── shared/             # Typewriter, SplitText, TiltCard, Magnetic,
│   │                           # CursorGlow, Parallax, ThemeToggle, ScrollProgress, Reveal
│   └── lib/
│       ├── data.ts             # ★ EDIT ME — all your content lives here
│       ├── animations.ts       # shared Framer Motion variants
│       └── utils.ts            # cn() class helper
├── tailwind.config.ts          # brand accents, marquee/float/blob keyframes
├── components.json             # shadcn config
├── next.config.js
└── package.json
```

> **Why no `react-router-dom`?** In Next.js, the built-in **App Router replaces
> React Router** — installing `react-router-dom` would break Next.js routing and
> hurt SEO. This SPA feel is done the Next.js way: one server-rendered page with
> smooth-scroll anchor navigation (`#home`, `#about`, …), which is better for
> Google indexing.

---

## 🚀 Getting Started (in your IDE)

**Prerequisites:** Node.js 18+ and npm.

```bash
# 1. Extract the zip / open the folder in VS Code (or any IDE)
cd portfolio-spa

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

Then open **http://localhost:3000** 🎉

Other scripts:

```bash
npm run build   # production build (also validates everything compiles)
npm start       # serve the production build
npm run lint    # lint check
```

---

## 🛠️ Make It Yours (5 minutes)

### 1. Edit one file: `src/lib/data.ts`
Name, role, tagline, email, phone, location, GitHub/LinkedIn/X links, typewriter
words, stats, about highlights, **experience**, **education**, **tech stack**,
**projects**, live domain URL — it's all in this single file with `TODO` comments.

### 2. Add your photo (optional)
Drop a square photo at `public/profile.jpg`, then in `data.ts` set:

```ts
profileImage: "/profile.jpg",
```

Leave it as `""` to keep the animated initials avatar.

### 3. Add your real CV
Export your resume as PDF and **overwrite** `public/resume.pdf` (keep the filename
so the Download CV button keeps working).

### 4. Add real project screenshots (optional)
Save images in `public/projects/`, e.g. `public/projects/shopkart-desktop.jpg`,
then point to them in `data.ts`:

```ts
desktopImage: "/projects/shopkart-desktop.jpg",
mobileImage: "/projects/shopkart-mobile.jpg",
```

Leave them as `""` and the laptop/phone frames render a styled mock UI automatically.

### 5. Change accent colors (optional)
Blue/orange accents live in two places — keep them in sync:

- `src/app/globals.css` → `--primary` / `--secondary` HSL tokens
- `tailwind.config.ts` → gradients & shadows reference the same tokens

---

## 🌙 Light / Dark Mode

Powered by `next-themes` (`class` strategy). Text automatically flips between pure
black and pure white; toggle in the navbar. Respects the visitor's OS preference
on first visit and persists afterwards.

---

## ☁️ Deploy Free (Vercel — recommended for Next.js)

1. Push this folder to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Click **Deploy** — no settings to change.
4. Update `url` in `src/lib/data.ts` to your live domain and redeploy (fixes SEO canonical + sitemap URLs).

---

## 🧰 Tech Stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS 3 · Framer Motion ·
GSAP + ScrollTrigger · Lucide Icons · next-themes · shadcn-style UI (cva + tailwind-merge)

---

Made with 💙 + 🧡 — happy shipping!
