<div align="center">

# 🔨 ProfileForge

### The GitHub profile README generator that doesn't make every profile look the same.

Pick a template, tweak it in a guided editor, drag your sections around, copy the markdown. Snake, Pac-Man, 3D contribution graphs, trophies, streaks, stat cards, animated typing, tech-stack icons — all wired up, all live-previewed, all theme-aware.

<p align="center">
  <a href="https://github.com/saiyam0211/ProfileForge/stargazers"><img src="https://img.shields.io/github/stars/saiyam0211/ProfileForge?style=for-the-badge&logo=github&color=FFDD00&logoColor=black&labelColor=0d1117" alt="Stars" /></a>
  <a href="https://github.com/saiyam0211/ProfileForge/network/members"><img src="https://img.shields.io/github/forks/saiyam0211/ProfileForge?style=for-the-badge&logo=github&color=58a6ff&logoColor=white&labelColor=0d1117" alt="Forks" /></a>
  <a href="https://github.com/saiyam0211/ProfileForge/issues"><img src="https://img.shields.io/github/issues/saiyam0211/ProfileForge?style=for-the-badge&color=7ee787&logoColor=white&labelColor=0d1117" alt="Issues" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/github/license/saiyam0211/ProfileForge?style=for-the-badge&color=d2a8ff&labelColor=0d1117" alt="License" /></a>
  <img src="https://img.shields.io/badge/PRs-welcome-7ee787?style=for-the-badge&labelColor=0d1117" alt="PRs Welcome" />
</p>

<p align="center">
  <b>⭐ If ProfileForge helped you, drop a star — it genuinely keeps the project going.</b>
</p>

</div>

---

## ✨ Features

- **18+ premium templates** — Developer Pro, Neon Cyberpunk, Gamer, Data Scientist, OSS Maintainer, 3D Showcase, Terminal Hacker, Designer, Minimalist and more. Each card shows a **live rendered preview** of a sample persona.
- **Guided 7-step wizard** — Basics → Typing → About → Skills → Social → Widgets → Finish. Every feature is opt-in with a visual thumbnail and an explanation, so you always know what you're adding.
- **Build from scratch** — start empty and add only the blocks you want.
- **Live WYSIWYG preview** — renders exactly like GitHub will, with a **light/dark toggle**.
- **Drag to reorder** — reorder sections, tech-stack icons, and stat cards right in the preview. Footer stays pinned.
- **Every widget, wired up:**

  | Category | Widgets |
  |---|---|
  | Header | Typing animation, intro, banner |
  | Identity | About me (emoji / animated / minimal icons), tech stack (70+ skills), social badges (28 platforms, icon-only or labeled) |
  | Stats | GitHub stats, streak, top languages, activity graph, trophies (pick categories) — side by side, 2 per row |
  | Counters | Profile views, followers |
  | Animations | 🐍 Snake, 👾 Pac-Man, 🧊 3D contribution graph |
  | Extras | Spotify now-playing, latest blog posts, dev quote, Buy Me a Coffee |

- **29 themes** + custom accent, alignment, dividers, per-section heading icons & titles.
- **One-click export** — copy the markdown or download `README.md`. Snake / Pac-Man / 3D / Blog also emit the **GitHub Action workflow** files you need.

## 🚀 Getting Started

```bash
# clone
git clone https://github.com/saiyam0211/ProfileForge.git
cd ProfileForge

# install
npm install

# run dev server → http://localhost:5173
npm run dev

# production build
npm run build
```

## 🧠 How it works

GitHub sanitizes README markdown — no `<script>`, iframes, or CSS. The **only** dynamic channel is an `<img>` pointing at a service that returns `image/svg+xml`. ProfileForge builds those URLs from your config and composes the README. For things that can't be fetched live (the contribution grid isn't in GitHub's API), it generates the scheduled **GitHub Action** that renders and commits them.

A small dev/preview proxy fetches stat-card SVGs server-side to detect rate-limit errors and show a proper empty state instead of a broken "Something went wrong" card.

## 🛠️ Tech Stack

`Vite` · `React 18` · `TypeScript` · `Tailwind CSS v4` · `dnd-kit` (drag & drop) · `react-markdown` (+ remark-gfm, rehype-raw) · `ogl` (WebGL rays) · `motion`

Powered by these wonderful open-source SVG services — please star them too:
[github-readme-stats](https://github.com/anuraghazra/github-readme-stats) ·
[github-readme-streak-stats](https://github.com/DenverCoder1/github-readme-streak-stats) ·
[github-profile-trophy](https://github.com/ryo-ma/github-profile-trophy) ·
[Platane/snk](https://github.com/Platane/snk) (snake) ·
[pacman-contribution-graph](https://github.com/abozanona/pacman-contribution-graph) ·
[github-profile-3d-contrib](https://github.com/yoshi389111/github-profile-3d-contrib) ·
[skillicons.dev](https://skillicons.dev) · [shields.io](https://shields.io) · [Iconify](https://iconify.design)

## 🤝 Contributing

Contributions, ideas, and new templates are welcome!

1. Fork the repo
2. Create a branch: `git checkout -b feat/my-template`
3. Commit your changes
4. Open a Pull Request

New templates live in [`src/lib/templates.ts`](src/lib/templates.ts) — copy an existing entry, give it a distinct `demo` persona, theme, and widget mix.

## 📄 License

[MIT](./LICENSE) © [saiyam0211](https://github.com/saiyam0211)

<div align="center">
<sub>Built with care. If you ship a profile with it, tag the repo — I'd love to see it. ⭐</sub>
</div>
