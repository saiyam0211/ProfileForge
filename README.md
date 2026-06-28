# 🔨 ProfileForge

A funky, fully-functional **GitHub profile README generator**. Pick a template, tweak everything in a live editor, copy the markdown to your `username/username` repo. Snake, Pac-Man, 3D contribution graphs, trophies, streaks, stat cards, typing banners, badges — all wired up.

![ProfileForge](public/forge.svg)

## ✨ What it does

- **18 ready-made templates** — Developer Pro, Neon Cyberpunk, Gamer, Arcade Mania, Data Scientist, OSS Maintainer, 3D Showcase, Everything Bagel, Terminal Hacker, Designer, Recruiter Ready, Streak Beast, Trophy Hunter, Content Creator, Aura Glow, Polyglot, Purple Reign, Minimalist. Each card shows the **real rendered README** scaled down (lazy-loaded on scroll).
- **Build from scratch** — drag-and-drop section builder (dnd-kit): add/remove/reorder blocks with snappy animations; the order drives the generated README.
- **Live WYSIWYG preview** — renders exactly as GitHub will (HTML-in-markdown, `<picture>` dark mode, real SVG endpoints fetched live).
- **Full editor** — identity, typing lines, about bullets, 17 social platforms, 70+ tech skills, 29 themes, accent color, layout options, and per-section toggles.
- **One-click export** — copy markdown or download `README.md`.
- **GitHub Action generator** — Snake / Pac-Man / 3D / blog widgets can't be fetched live (the contribution grid isn't in the API and GitHub's Camo proxy caches hard), so ProfileForge emits the scheduled-workflow YAML that renders and commits those SVGs for you.

## 🧩 Widgets supported

| Widget | Source | Delivery |
|---|---|---|
| Typing banner | readme-typing-svg | live SVG |
| Stats / Top languages | github-readme-stats | live SVG |
| Streak | github-readme-streak-stats | live SVG |
| Trophies | github-profile-trophy | live SVG |
| Activity graph | github-readme-activity-graph | live SVG |
| Visitor counter | komarev ghpvc | live SVG |
| Tech badges / icons | shields.io + skillicons.dev | live SVG |
| Dev quote | quotes-github-readme | live SVG |
| Snake animation | Platane/snk | GitHub Action → `output` branch |
| Pac-Man graph | abozanona/pacman-contribution-graph | GitHub Action → `output` branch |
| 3D contribution graph | yoshi389111/github-profile-3d-contrib | GitHub Action → repo |
| Latest blog posts | gautamkrishnar/blog-post-workflow | GitHub Action |

## 🚀 Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

## 🏗️ How it works

GitHub sanitizes README markdown — no `<script>`, iframes, or CSS. The **only** dynamic channel is an `<img>` pointing at a service that returns `image/svg+xml`. ProfileForge builds those URLs from your config (`src/lib/widgets.ts`), composes the README (`src/lib/generate.ts`), and for anything that can't be served live, generates the scheduled GitHub Action workflow (`src/lib/workflows.ts`).

## 📦 Stack

Vite · React 18 · TypeScript · Tailwind CSS v4 · react-markdown (+ remark-gfm, rehype-raw).

## 📁 Structure

```
src/
  lib/
    themes.ts       29 github-readme-stats themes + activity-graph mapping
    skills.ts       70+ tech catalog (skillicons + shields)
    socials.ts      17 social platforms
    widgets.ts      SVG endpoint URL builders
    generate.ts     config → README markdown
    workflows.ts    config → GitHub Action YAML
    templates.ts    18 templates
    defaults.ts     base config
  components/
    Gallery.tsx     template picker
    Editor.tsx      controls
    Preview.tsx     live render
    CodePanel.tsx   markdown export
    WorkflowPanel.tsx  action export
```

---

<sub>Generated SVGs are powered by their respective open-source projects — go star them. Snake & Pac-Man have no declared license; they're used via their published Actions, not by copying code.</sub>
