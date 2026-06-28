import type { Template, ProfileConfig, Options, WidgetToggles, TemplateDemo } from '../types'
import { widgets, cloneConfig } from './defaults'

// A template patch may set any field, but `options` is merged partially.
type Patch = Partial<Omit<ProfileConfig, 'options' | 'widgets'>> & {
  options?: Partial<Options>
  widgets?: WidgetToggles
}

// `demo` = sample content shown ONLY in the gallery card preview (so every card
// looks different). `patch` = the actual restyle applied to the user's config,
// which keeps their real identity (username/name/socials/skills).
function make(
  id: string,
  name: string,
  emoji: string,
  vibe: string,
  blurb: string,
  tags: string[],
  demo: TemplateDemo,
  patch: (b: ProfileConfig) => Patch,
): Template {
  return {
    id,
    name,
    emoji,
    vibe,
    blurb,
    tags,
    demo,
    apply: (b) => {
      const base = cloneConfig(b)
      const p = patch(base)
      return {
        ...base,
        ...p,
        options: { ...base.options, ...(p.options ?? {}) },
        widgets: p.widgets ?? base.widgets,
      }
    },
  }
}

export const TEMPLATES: Template[] = [
  make('developer-pro', 'Developer Pro', '💻', 'Balanced • Tokyo Night', 'The all-rounder. Typing intro, about, skills, full stats + streak + trophies.', ['popular', 'balanced'],
    { name: 'Alex Carter', tagline: 'Full-Stack Engineer', typingLines: ['Full-Stack Engineer 💻', 'Shipping products that scale 🚀'], currentWork: 'a real-time SaaS dashboard', learning: 'Go & gRPC', ask: 'React, Node & system design', funFact: 'I write tests before coffee', location: 'Berlin, DE', skills: ['ts', 'react', 'nodejs', 'postgres', 'docker', 'aws'] },
    () => ({
    theme: 'tokyonight', accent: '70a5fd',
    options: { align: 'center', skillStyle: 'skillicons', langLayout: 'compact', trophyColumns: 7 },
    widgets: widgets({ typing: true, intro: true, about: true, socialsBadges: true, skills: true, stats: true, streak: true, topLangs: true, trophies: true, visitors: true, followBadge: true, footer: true }),
  })),

  make('minimalist', 'Minimalist', '◻️', 'Clean • Left aligned', 'No noise. Short intro, about bullets, stats and top languages. That is it.', ['clean', 'recruiter'],
    { name: 'Jordan Lee', tagline: 'Backend Developer', typingLines: ['Backend Developer'], currentWork: 'a high-throughput API', learning: 'Rust', ask: 'distributed systems', funFact: 'Less is more', location: 'Remote', skills: ['go', 'rust', 'postgres', 'docker'] },
    () => ({
    theme: 'github_dark', accent: '58a6ff',
    options: { align: 'left', skillStyle: 'badges', langLayout: 'compact', hideBorder: true },
    widgets: widgets({ intro: true, about: true, skills: true, stats: true, topLangs: true, footer: true }),
  })),

  make('neon-cyberpunk', 'Neon Cyberpunk', '🌃', 'Loud • Radical', 'Hot pink neon, animated typing, snake, trophies. Built to glow.', ['funky', 'animated'],
    { name: 'Nova Sterling', tagline: 'Creative Technologist', typingLines: ['Creative Technologist ⚡', 'I make the web glow ✨'], currentWork: 'WebGL shader experiments', learning: 'Three.js & GLSL', ask: 'creative coding', funFact: 'Neon is a lifestyle', location: 'Tokyo, JP', skills: ['ts', 'react', 'threejs', 'tailwind'] },
    () => ({
    theme: 'radical', accent: 'fe428e',
    options: { align: 'center', skillStyle: 'skillicons', langLayout: 'compact', trophyColumns: 7 },
    widgets: widgets({ typing: true, intro: true, socialsBadges: true, skills: true, stats: true, streak: true, trophies: true, snake: true, visitors: true, quote: true, footer: true }),
  })),

  make('gamer', 'Gamer', '🎮', 'Playful • Dracula', 'Both arcade graphs — Snake AND Pac-Man — plus trophies and stats.', ['funky', 'games'],
    { name: 'Pixel Knight', tagline: 'Game Developer', typingLines: ['Game Developer 🎮', 'Press START to continue ▶'], currentWork: 'an indie roguelike', learning: 'Unity ECS', ask: 'gameplay programming', funFact: 'Speedrun PRs in under a day', location: 'Austin, TX', skills: ['cpp', 'cs', 'lua', 'python'] },
    () => ({
    theme: 'dracula', accent: 'ff6e96',
    options: { align: 'center', skillStyle: 'skillicons', trophyColumns: 7 },
    widgets: widgets({ typing: true, intro: true, skills: true, stats: true, streak: true, trophies: true, snake: true, pacman: true, visitors: true, followBadge: true, footer: true }),
  })),

  make('arcade', 'Arcade Mania', '👾', 'Retro • High Contrast', 'Pac-Man front and center, high-contrast yellow, trophy wall.', ['games', 'animated'],
    { name: 'Retro Ray', tagline: 'Gameplay Programmer', typingLines: ['Insert coin to start 🪙'], currentWork: 'a pixel-art platformer', learning: 'shaders', ask: 'retro game engines', funFact: 'High score: undefeated', location: 'Osaka, JP', skills: ['cpp', 'c', 'lua'] },
    () => ({
    theme: 'highcontrast', accent: 'e7f216',
    options: { align: 'center', skillStyle: 'skillicons', trophyColumns: 4 },
    widgets: widgets({ intro: true, skills: true, pacman: true, trophies: true, stats: true, visitors: true, footer: true }),
  })),

  make('data-scientist', 'Data Scientist', '📈', 'Analytical • GitHub Dark', 'Donut language breakdown, activity graph, stats. For the notebook crowd.', ['professional', 'data'],
    { name: 'Dr. Maya Chen', tagline: 'Machine Learning Engineer', typingLines: ['ML Engineer 📊', 'Turning data into decisions'], currentWork: 'an ML inference pipeline', learning: 'PyTorch & MLOps', ask: 'deep learning', funFact: 'My notebooks have 0 warnings', location: 'Toronto, CA', skills: ['python', 'pytorch', 'tensorflow', 'pandas', 'numpy'] },
    () => ({
    theme: 'github_dark', accent: '58a6ff',
    options: { align: 'center', skillStyle: 'badges', langLayout: 'donut' },
    widgets: widgets({ typing: true, intro: true, about: true, skills: true, stats: true, topLangs: true, activityGraph: true, streak: true, footer: true }),
  })),

  make('open-source', 'OSS Maintainer', '🧑‍🔧', 'Credible • Merko', 'Trophies, streak, contribution activity graph — show the grind.', ['professional'],
    { name: 'Sam Rivera', tagline: 'Open Source Maintainer', typingLines: ['OSS Maintainer 🌱', 'Merging PRs since dawn'], currentWork: 'a widely-used CLI tool', learning: 'WASM', ask: 'open source governance', funFact: '500+ merged PRs', location: 'Lisbon, PT', skills: ['go', 'rust', 'docker', 'kubernetes'] },
    () => ({
    theme: 'merko', accent: 'abd200',
    options: { align: 'center', skillStyle: 'badges', trophyColumns: 7 },
    widgets: widgets({ intro: true, about: true, socialsBadges: true, skills: true, stats: true, streak: true, activityGraph: true, trophies: true, followBadge: true, footer: true }),
  })),

  make('3d-showcase', '3D Showcase', '🧊', 'Dimensional • Aura', 'Isometric 3D contribution graph as the hero, backed by clean stats.', ['funky', 'animated'],
    { name: 'Kai Tanaka', tagline: 'Graphics Engineer', typingLines: ['Graphics Engineer 🧊', 'Rendering in 3 dimensions'], currentWork: 'a real-time renderer', learning: 'Vulkan', ask: 'computer graphics', funFact: 'I dream in polygons', location: 'Seoul, KR', skills: ['cpp', 'threejs', 'ts'] },
    () => ({
    theme: 'aura-dark', accent: 'ffca85',
    options: { align: 'center', skillStyle: 'skillicons' },
    widgets: widgets({ typing: true, intro: true, skills: true, contrib3d: true, stats: true, topLangs: true, visitors: true, footer: true }),
  })),

  make('everything', 'Everything Bagel', '🎆', 'Maximal • Synthwave', 'Kitchen sink: typing, snake, pac-man, 3D, trophies, quote, stats. Chaos.', ['funky', 'animated', 'games'],
    { name: 'Riley Quinn', tagline: 'Indie Hacker', typingLines: ['Indie Hacker 🚀', 'Building everything, everywhere'], currentWork: 'five side projects at once', learning: 'a bit of everything', ask: 'shipping fast', funFact: 'I never met a feature I didn’t add', location: 'San Francisco, US', skills: ['ts', 'react', 'nodejs', 'python', 'docker', 'aws'] },
    () => ({
    theme: 'synthwave', accent: 'e5289e',
    options: { align: 'center', skillStyle: 'skillicons', trophyColumns: 7 },
    widgets: widgets({ typing: true, intro: true, about: true, socialsBadges: true, skills: true, stats: true, streak: true, topLangs: true, activityGraph: true, trophies: true, snake: true, pacman: true, contrib3d: true, visitors: true, followBadge: true, quote: true, footer: true }),
  })),

  make('terminal', 'Terminal Hacker', '🖥️', 'Mono • Green on black', 'Matrix-green badges, typing prompt, minimal stats. CLI energy.', ['clean', 'funky'],
    { name: 'root', tagline: 'Systems Hacker', typingLines: ['> whoami', '> cat skills.txt', '> sudo make coffee'], currentWork: 'a kernel module', learning: 'assembly', ask: 'the terminal', funFact: 'vim user, btw', location: '/dev/null', skills: ['bash', 'c', 'rust', 'linux'] },
    () => ({
    theme: 'github_dark', accent: '00ff9c',
    typingLines: ['> whoami', '> cat skills.txt', '> sudo make coffee'],
    options: { align: 'left', skillStyle: 'badges', langLayout: 'compact' },
    widgets: widgets({ typing: true, intro: true, about: true, skills: true, stats: true, topLangs: true, footer: true }),
  })),

  make('designer', 'Designer', '🎨', 'Visual • Vue green', 'Banner-first, dribbble/behance links, icon grid skills.', ['clean'],
    { name: 'Aria Moon', tagline: 'Product Designer', typingLines: ['Product Designer 🎨', 'Pixels with purpose'], currentWork: 'a design system', learning: 'motion design', ask: 'UX & prototyping', funFact: 'I have 200 fonts installed', location: 'Amsterdam, NL', skills: ['figma', 'react', 'tailwind', 'css'] },
    () => ({
    theme: 'vue-dark', accent: '41b883',
    options: { align: 'center', skillStyle: 'skillicons', bannerUrl: '' },
    widgets: widgets({ banner: true, typing: true, intro: true, about: true, socialsBadges: true, skills: true, stats: true, visitors: true, footer: true }),
  })),

  make('recruiter', 'Recruiter Ready', '🤝', 'Corporate • Prussian', 'Signal over noise. About, skills, stats, languages. No games.', ['professional', 'recruiter', 'clean'],
    { name: 'Taylor Brooks', tagline: 'Senior Software Engineer', typingLines: ['Senior Software Engineer'], currentWork: 'enterprise platform migration', learning: 'cloud architecture', ask: 'Java, Spring & AWS', funFact: '8 years shipping production code', location: 'London, UK', skills: ['java', 'spring', 'react', 'aws'] },
    () => ({
    theme: 'prussian', accent: 'bddfff',
    options: { align: 'center', skillStyle: 'badges', langLayout: 'compact' },
    widgets: widgets({ intro: true, about: true, socialsBadges: true, skills: true, stats: true, topLangs: true, footer: true }),
  })),

  make('streak-beast', 'Streak Beast', '🔥', 'Focused • Gruvbox', 'Streak card is the star. For people who never miss a day.', ['professional'],
    { name: 'Devon Park', tagline: 'Software Engineer', typingLines: ['Consistency > intensity 🔥'], currentWork: 'my daily commit habit', learning: 'something new each day', ask: 'building habits', funFact: '700-day streak and counting', location: 'Sydney, AU', skills: ['ts', 'python', 'go', 'docker'] },
    () => ({
    theme: 'gruvbox', accent: 'fabd2f',
    options: { align: 'center', skillStyle: 'skillicons' },
    widgets: widgets({ typing: true, intro: true, skills: true, streak: true, stats: true, activityGraph: true, visitors: true, footer: true }),
  })),

  make('trophy-hunter', 'Trophy Hunter', '🏆', 'Achievements • One Dark', 'A full trophy cabinet up top, stats below. Flex your ranks.', ['professional'],
    { name: 'Morgan Yu', tagline: 'Staff Engineer', typingLines: ['Collecting trophies 🏆'], currentWork: 'platform reliability', learning: 'SRE practices', ask: 'scaling teams', funFact: 'All S-rank trophies', location: 'Singapore', skills: ['go', 'kubernetes', 'aws', 'rust'] },
    () => ({
    theme: 'onedark', accent: 'e4bf7a',
    options: { align: 'center', skillStyle: 'skillicons', trophyColumns: 6 },
    widgets: widgets({ intro: true, skills: true, trophies: true, stats: true, streak: true, topLangs: true, footer: true }),
  })),

  make('creator', 'Content Creator', '🎬', 'Social • Radical', 'YouTube + Spotify now-playing + latest blog posts. For builders in public.', ['funky'],
    { name: 'Jamie Fox', tagline: 'DevRel & Creator', typingLines: ['DevRel & Creator 🎬', 'Building in public'], currentWork: 'a YouTube tutorial series', learning: 'video editing', ask: 'content & community', funFact: 'Coffee-powered streamer', location: 'Los Angeles, US', skills: ['ts', 'react', 'nextjs', 'tailwind'] },
    () => ({
    theme: 'radical', accent: 'fe428e',
    options: { align: 'center', skillStyle: 'skillicons', blogFeed: 'https://dev.to/feed/your-username' },
    widgets: widgets({ typing: true, intro: true, about: true, socialsBadges: true, skills: true, spotify: true, blog: true, stats: true, visitors: true, footer: true }),
  })),

  make('aura-glow', 'Aura Glow', '🔮', 'Dreamy • Aura', 'Soft purple aura, 3D graph, dev quote. Aesthetic and calm.', ['funky', 'clean'],
    { name: 'Luna Park', tagline: 'Frontend Developer', typingLines: ['Frontend Developer 🔮', 'Calm code, clean UI'], currentWork: 'a component library', learning: 'Vue 3 & Nuxt', ask: 'frontend architecture', funFact: 'Lo-fi beats keep me coding', location: 'Vancouver, CA', skills: ['vue', 'ts', 'tailwind', 'sass'] },
    () => ({
    theme: 'aura', accent: 'a277ff',
    options: { align: 'center', skillStyle: 'skillicons' },
    widgets: widgets({ typing: true, intro: true, about: true, skills: true, contrib3d: true, stats: true, quote: true, visitors: true, footer: true }),
  })),

  make('polyglot', 'Polyglot', '🗺️', 'Languages • Night Owl', 'Pie language chart, big skill grid, activity graph. Many tongues.', ['data', 'clean'],
    { name: 'Devon Cross', tagline: 'Polyglot Engineer', typingLines: ['Polyglot Engineer 🗺️', 'One problem, many languages'], currentWork: 'a multi-language monorepo', learning: 'Elixir', ask: 'language design', funFact: 'I refactor in 6 languages', location: 'Dublin, IE', skills: ['ts', 'python', 'go', 'rust', 'java', 'cpp'] },
    () => ({
    theme: 'nightowl', accent: 'c792ea',
    options: { align: 'center', skillStyle: 'skillicons', langLayout: 'pie' },
    widgets: widgets({ typing: true, intro: true, skills: true, topLangs: true, activityGraph: true, stats: true, footer: true }),
  })),

  make('shades-purple', 'Purple Reign', '🟣', 'Bold • Shades of Purple', 'Gold-on-purple, snake animation, trophies. Royal and loud.', ['funky', 'animated'],
    { name: 'Violet Hayes', tagline: 'Full-Stack Developer', typingLines: ['Full-Stack Developer 🟣', 'Royalty in every commit'], currentWork: 'a fintech app', learning: 'Next.js 15', ask: 'full-stack TypeScript', funFact: 'Purple is the only color', location: 'New York, US', skills: ['ts', 'react', 'nextjs', 'nodejs', 'postgres'] },
    () => ({
    theme: 'shades-of-purple', accent: 'fad000',
    options: { align: 'center', skillStyle: 'skillicons', trophyColumns: 7 },
    widgets: widgets({ typing: true, intro: true, socialsBadges: true, skills: true, stats: true, streak: true, snake: true, trophies: true, visitors: true, footer: true }),
  })),
]

export function templateById(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id)
}
