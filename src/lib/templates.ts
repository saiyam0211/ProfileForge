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
  make('developer-pro', 'Developer Pro', '💻', 'Balanced • Tokyo Night', 'The polished all-rounder. Typing intro, about, skills, full stats + streak + trophies.', ['popular', 'balanced'],
    { name: 'Alex Carter', tagline: 'Full-Stack Engineer', typingLines: ['Full-Stack Engineer 💻', 'Shipping products that scale 🚀'], currentWork: 'a real-time SaaS dashboard', learning: 'Go & gRPC', ask: 'React, Node & system design', funFact: 'I write tests before coffee', location: 'Berlin, DE', skills: ['ts', 'react', 'nodejs', 'postgres', 'docker', 'aws'] },
    () => ({
      theme: 'tokyonight', accent: '70a5fd',
      options: { align: 'center', skillStyle: 'skillicons', socialStyle: 'for-the-badge', langLayout: 'compact', trophyColumns: 7, typingColor: '70a5fd', dividers: true },
      widgets: widgets({ typing: true, intro: true, about: true, socialsBadges: true, skills: true, stats: true, streak: true, topLangs: true, trophies: true, visitors: true, followBadge: true, footer: true }),
    })),

  make('minimalist', 'Minimalist', '◻️', 'Clean • Monochrome • No clutter', 'Whitespace and signal. Left aligned, no dividers, no emoji headings — just the essentials.', ['clean', 'recruiter'],
    { name: 'Jordan Lee', tagline: 'Backend Developer', typingLines: ['Backend Developer'], currentWork: 'a high-throughput API', learning: 'Rust', ask: 'distributed systems', funFact: 'Less is more', location: 'Remote', skills: ['go', 'rust', 'postgres', 'docker'] },
    () => ({
      theme: 'github_dark', accent: 'c9d1d9',
      options: { align: 'left', skillStyle: 'badges', socialStyle: 'flat-square', langLayout: 'compact', aboutIconSet: 'minimal', dividers: false, hideBorder: true, typingColor: 'c9d1d9' },
      headings: { about: { icon: '', title: 'About' }, skills: { icon: '', title: 'Stack' }, stats: { icon: '', title: 'Stats' }, socialsBadges: { icon: '', title: 'Links' } },
      widgets: widgets({ intro: true, about: true, skills: true, stats: true, topLangs: true, footer: true }),
    })),

  make('neon-cyberpunk', 'Neon Cyberpunk', '🌃', 'Neon • Synthwave • Glitch', 'Hot magenta on deep purple, Orbitron typing, animated icons, snake. Built to glow.', ['funky', 'animated'],
    { name: 'Nova Sterling', tagline: 'Creative Technologist', typingLines: ['> JACK_IN ⚡', 'Creative Technologist', 'I make the web glow ✨'], currentWork: 'WebGL shader experiments', learning: 'Three.js & GLSL', ask: 'creative coding', funFact: 'Neon is a lifestyle', location: 'Neo-Tokyo', skills: ['ts', 'react', 'threejs', 'tailwind'] },
    () => ({
      theme: 'synthwave', accent: 'e5289e',
      options: { align: 'center', skillStyle: 'skillicons', socialStyle: 'icon', langLayout: 'compact', trophyColumns: 7, aboutIconSet: 'animated', dividers: true, typingColor: 'e5289e', typingFont: 'Orbitron', typingSize: 30 },
      headings: { about: { icon: '⚡', title: 'IDENTITY.exe' }, skills: { icon: '◢◤', title: 'TECH ARSENAL' }, stats: { icon: '▰', title: 'SYSTEM STATS' }, socialsBadges: { icon: '🌐', title: 'JACK IN' }, snake: { icon: '🐍', title: 'DATA STREAM' } },
      widgets: widgets({ typing: true, intro: true, socialsBadges: true, skills: true, stats: true, streak: true, trophies: true, snake: true, visitors: true, quote: true, footer: true }),
    })),

  make('gamer', 'Gamer', '🎮', 'Arcade • Playful • Dracula', 'Player-profile vibes. Snake AND Pac-Man, achievement trophies, game-stats headings.', ['funky', 'games'],
    { name: 'Pixel Knight', tagline: 'Game Developer', typingLines: ['Game Developer 🎮', 'Press START to continue ▶'], currentWork: 'an indie roguelike', learning: 'Unity ECS', ask: 'gameplay programming', funFact: 'Speedruns PRs in under a day', location: 'Player One', skills: ['cpp', 'cs', 'lua', 'python'] },
    () => ({
      theme: 'dracula', accent: 'ff6e96',
      options: { align: 'center', skillStyle: 'skillicons', socialStyle: 'icon', trophyColumns: 7, aboutIconSet: 'symbols', typingColor: 'bd93f9', typingFont: 'Press Start 2P', typingSize: 18, dividers: true },
      headings: { about: { icon: '🎮', title: 'Player Profile' }, skills: { icon: '🕹️', title: 'Loadout' }, stats: { icon: '📊', title: 'Game Stats' }, trophies: { icon: '🏆', title: 'Achievements Unlocked' }, snake: { icon: '🐍', title: 'Snake' }, pacman: { icon: '👾', title: 'Pac-Man' } },
      widgets: widgets({ typing: true, intro: true, about: true, skills: true, stats: true, streak: true, trophies: true, snake: true, pacman: true, visitors: true, followBadge: true, footer: true }),
    })),

  make('arcade', 'Arcade Mania', '👾', 'Retro • 8-bit • High Contrast', 'Insert coin. Pac-Man front and center, neon yellow on black, pixel typing.', ['games', 'animated'],
    { name: 'Retro Ray', tagline: 'Gameplay Programmer', typingLines: ['INSERT COIN 🪙', 'GAME DEVELOPER'], currentWork: 'a pixel-art platformer', learning: 'shaders', ask: 'retro game engines', funFact: 'High score: undefeated', location: 'Arcade', skills: ['cpp', 'c', 'lua'] },
    () => ({
      theme: 'highcontrast', accent: 'e7f216',
      options: { align: 'center', skillStyle: 'skillicons', socialStyle: 'icon', trophyColumns: 4, typingColor: 'e7f216', typingFont: 'Press Start 2P', typingSize: 16, aboutIconSet: 'symbols', dividers: true },
      headings: { skills: { icon: '🕹️', title: 'POWER-UPS' }, pacman: { icon: '👾', title: 'PAC-MAN' }, trophies: { icon: '🏆', title: 'HIGH SCORES' }, stats: { icon: '🎯', title: 'STATS' } },
      widgets: widgets({ typing: true, intro: true, skills: true, pacman: true, trophies: true, stats: true, visitors: true, footer: true }),
    })),

  make('data-scientist', 'Data Scientist', '📈', 'Analytical • Notebook • Donut charts', 'Donut language breakdown, activity trend, Python/ML stack. For the notebook crowd.', ['professional', 'data'],
    { name: 'Dr. Maya Chen', tagline: 'Machine Learning Engineer', typingLines: ['ML Engineer 📊', 'Turning data into decisions'], currentWork: 'an ML inference pipeline', learning: 'PyTorch & MLOps', ask: 'deep learning', funFact: 'My notebooks have 0 warnings', location: 'Toronto, CA', skills: ['python', 'pytorch', 'tensorflow', 'pandas', 'numpy'] },
    () => ({
      theme: 'github_dark', accent: '58a6ff',
      options: { align: 'center', skillStyle: 'badges', socialStyle: 'for-the-badge', langLayout: 'donut', typingColor: '58a6ff', aboutIconSet: 'emoji', dividers: true },
      headings: { about: { icon: '🧪', title: 'About' }, skills: { icon: '📚', title: 'Toolkit' }, stats: { icon: '📊', title: 'GitHub Analytics' }, activityGraph: { icon: '📈', title: 'Contribution Trend' } },
      widgets: widgets({ typing: true, intro: true, about: true, skills: true, stats: true, topLangs: true, activityGraph: true, streak: true, footer: true }),
    })),

  make('open-source', 'OSS Maintainer', '🧑‍🔧', 'Credible • Earthy • Merko', 'Trophies, streak, contribution activity. The grind, made legible.', ['professional'],
    { name: 'Sam Rivera', tagline: 'Open Source Maintainer', typingLines: ['OSS Maintainer 🌱', 'Merging PRs since dawn'], currentWork: 'a widely-used CLI tool', learning: 'WASM', ask: 'open source governance', funFact: '500+ merged PRs', location: 'Lisbon, PT', skills: ['go', 'rust', 'docker', 'kubernetes'] },
    () => ({
      theme: 'merko', accent: 'abd200',
      options: { align: 'center', skillStyle: 'badges', socialStyle: 'for-the-badge', trophyColumns: 7, typingColor: 'abd200', dividers: true },
      headings: { about: { icon: '🌱', title: 'About' }, skills: { icon: '🔧', title: 'Toolbelt' }, stats: { icon: '📊', title: 'Open Source Stats' }, activityGraph: { icon: '📈', title: 'Contribution Activity' }, trophies: { icon: '🏆', title: 'Milestones' } },
      widgets: widgets({ intro: true, about: true, socialsBadges: true, skills: true, stats: true, streak: true, activityGraph: true, trophies: true, followBadge: true, footer: true }),
    })),

  make('3d-showcase', '3D Showcase', '🧊', 'Isometric • Dimensional • Aura', 'The isometric 3D contribution city is the hero, backed by clean stats.', ['funky', 'animated'],
    { name: 'Kai Tanaka', tagline: 'Graphics Engineer', typingLines: ['Graphics Engineer 🧊', 'Rendering in 3 dimensions'], currentWork: 'a real-time renderer', learning: 'Vulkan', ask: 'computer graphics', funFact: 'I dream in polygons', location: 'Seoul, KR', skills: ['cpp', 'threejs', 'ts'] },
    () => ({
      theme: 'aura-dark', accent: 'ffca85',
      options: { align: 'center', skillStyle: 'skillicons', langLayout: 'donut', typingColor: 'ffca85', dividers: true },
      headings: { skills: { icon: '🧊', title: 'Stack' }, contrib3d: { icon: '🌐', title: '3D Contribution City' }, stats: { icon: '📊', title: 'Stats' } },
      widgets: widgets({ typing: true, intro: true, skills: true, contrib3d: true, stats: true, topLangs: true, visitors: true, footer: true }),
    })),

  make('everything', 'Everything Bagel', '🎆', 'Maximal • Synthwave • Kitchen sink', 'Typing, snake, pac-man, 3D, trophies, quote, stats. Glorious chaos.', ['funky', 'animated', 'games'],
    { name: 'Riley Quinn', tagline: 'Indie Hacker', typingLines: ['Indie Hacker 🚀', 'Building everything, everywhere'], currentWork: 'five side projects at once', learning: 'a bit of everything', ask: 'shipping fast', funFact: 'I never met a feature I didn’t add', location: 'San Francisco, US', skills: ['ts', 'react', 'nodejs', 'python', 'docker', 'aws'] },
    () => ({
      theme: 'synthwave', accent: 'e5289e',
      options: { align: 'center', skillStyle: 'skillicons', socialStyle: 'icon', trophyColumns: 7, aboutIconSet: 'animated', typingColor: 'e5289e', dividers: true },
      widgets: widgets({ typing: true, intro: true, about: true, socialsBadges: true, skills: true, stats: true, streak: true, topLangs: true, activityGraph: true, trophies: true, snake: true, pacman: true, contrib3d: true, visitors: true, followBadge: true, quote: true, footer: true }),
    })),

  make('terminal', 'Terminal Hacker', '🖥️', 'Mono • Matrix green • CLI', 'Left-aligned, no dividers, command-line headings ($ whoami), matrix-green typing.', ['clean', 'funky'],
    { name: 'root', tagline: 'Systems Hacker', typingLines: ['$ whoami', '$ cat skills.txt', '$ sudo make coffee'], currentWork: 'a kernel module', learning: 'assembly', ask: 'the terminal', funFact: 'vim user, btw', location: '/dev/null', skills: ['bash', 'c', 'rust', 'linux'] },
    () => ({
      theme: 'github_dark', accent: '00ff9c',
      typingLines: ['$ whoami', '$ cat skills.txt', '$ sudo make coffee'],
      options: { align: 'left', skillStyle: 'badges', socialStyle: 'flat-square', langLayout: 'compact', aboutIconSet: 'minimal', dividers: false, typingColor: '00ff9c', typingFont: 'JetBrains Mono' },
      headings: { about: { icon: '', title: '$ whoami' }, skills: { icon: '', title: '$ cat skills.txt' }, stats: { icon: '', title: '$ git log --stat' }, socialsBadges: { icon: '', title: '$ curl /contacts' } },
      widgets: widgets({ typing: true, intro: true, about: true, skills: true, stats: true, topLangs: true, footer: true }),
    })),

  make('designer', 'Designer', '🎨', 'Elegant • Banner-first • Vue green', 'Cover banner, colorful social app-icons, donut stack. For the visual crowd.', ['clean'],
    { name: 'Aria Moon', tagline: 'Product Designer', typingLines: ['Product Designer 🎨', 'Pixels with purpose'], currentWork: 'a design system', learning: 'motion design', ask: 'UX & prototyping', funFact: 'I have 200 fonts installed', location: 'Amsterdam, NL', skills: ['figma', 'react', 'tailwind', 'css'] },
    () => ({
      theme: 'vue-dark', accent: '41b883',
      options: { align: 'center', skillStyle: 'skillicons', socialStyle: 'icon', langLayout: 'donut', typingColor: '41b883', typingFont: 'Poppins', dividers: true },
      headings: { about: { icon: '🎨', title: 'About' }, skills: { icon: '🧰', title: 'Toolbox' }, socialsBadges: { icon: '🔗', title: 'Find My Work' }, stats: { icon: '📊', title: 'Stats' } },
      widgets: widgets({ banner: true, typing: true, intro: true, about: true, socialsBadges: true, skills: true, stats: true, visitors: true, footer: true }),
    })),

  make('recruiter', 'Recruiter Ready', '🤝', 'Corporate • Calm • Prussian', 'Signal over noise. Professional headings (no emoji), badges, no games.', ['professional', 'recruiter', 'clean'],
    { name: 'Taylor Brooks', tagline: 'Senior Software Engineer', typingLines: ['Senior Software Engineer'], currentWork: 'enterprise platform migration', learning: 'cloud architecture', ask: 'Java, Spring & AWS', funFact: '8 years shipping production code', location: 'London, UK', skills: ['java', 'spring', 'react', 'aws'] },
    () => ({
      theme: 'prussian', accent: 'bddfff',
      options: { align: 'center', skillStyle: 'badges', socialStyle: 'for-the-badge', langLayout: 'compact', aboutIconSet: 'minimal', typingColor: 'bddfff', typingFont: 'Inter', dividers: true },
      headings: { about: { icon: '', title: 'About Me' }, skills: { icon: '', title: 'Core Skills' }, stats: { icon: '', title: 'GitHub Activity' }, socialsBadges: { icon: '', title: 'Contact' } },
      widgets: widgets({ intro: true, about: true, socialsBadges: true, skills: true, stats: true, topLangs: true, footer: true }),
    })),

  make('streak-beast', 'Streak Beast', '🔥', 'Relentless • Gruvbox • On fire', 'The streak card is the star. Activity graph below. For people who never miss a day.', ['professional'],
    { name: 'Devon Park', tagline: 'Software Engineer', typingLines: ['Consistency > intensity 🔥'], currentWork: 'my daily commit habit', learning: 'something new each day', ask: 'building habits', funFact: '700-day streak and counting', location: 'Sydney, AU', skills: ['ts', 'python', 'go', 'docker'] },
    () => ({
      theme: 'gruvbox', accent: 'fabd2f',
      options: { align: 'center', skillStyle: 'skillicons', statsInline: true, typingColor: 'fabd2f', dividers: true },
      headings: { skills: { icon: '🔥', title: 'Daily Stack' }, stats: { icon: '🔥', title: 'The Streak' }, activityGraph: { icon: '📈', title: 'Never Miss a Day' } },
      widgets: widgets({ typing: true, intro: true, skills: true, streak: true, stats: true, activityGraph: true, visitors: true, footer: true }),
    })),

  make('trophy-hunter', 'Trophy Hunter', '🏆', 'Achievements • Gold • One Dark', 'A full trophy cabinet up top, stats below. Flex every rank.', ['professional'],
    { name: 'Morgan Yu', tagline: 'Staff Engineer', typingLines: ['Collecting trophies 🏆'], currentWork: 'platform reliability', learning: 'SRE practices', ask: 'scaling teams', funFact: 'All S-rank trophies', location: 'Singapore', skills: ['go', 'kubernetes', 'aws', 'rust'] },
    () => ({
      theme: 'onedark', accent: 'e4bf7a',
      options: { align: 'center', skillStyle: 'skillicons', trophyColumns: 6, typingColor: 'e4bf7a', dividers: true },
      headings: { trophies: { icon: '🏆', title: 'Trophy Cabinet' }, skills: { icon: '⚔️', title: 'Arsenal' }, stats: { icon: '📊', title: 'Career Stats' } },
      widgets: widgets({ intro: true, skills: true, trophies: true, stats: true, streak: true, topLangs: true, footer: true }),
    })),

  make('creator', 'Content Creator', '🎬', 'Social • Vibrant • Build in public', 'YouTube + Spotify now-playing + latest blog posts. Colorful social app-icons.', ['funky'],
    { name: 'Jamie Fox', tagline: 'DevRel & Creator', typingLines: ['DevRel & Creator 🎬', 'Building in public'], currentWork: 'a YouTube tutorial series', learning: 'video editing', ask: 'content & community', funFact: 'Coffee-powered streamer', location: 'Los Angeles, US', skills: ['ts', 'react', 'nextjs', 'tailwind'] },
    () => ({
      theme: 'radical', accent: 'fe428e',
      options: { align: 'center', skillStyle: 'skillicons', socialStyle: 'icon', aboutIconSet: 'animated', typingColor: 'fe428e', typingFont: 'Poppins', blogFeed: 'https://dev.to/feed/your-username', dividers: true },
      headings: { about: { icon: '🎬', title: 'About' }, socialsBadges: { icon: '🌐', title: 'Find Me Online' }, skills: { icon: '🛠️', title: 'My Setup' }, spotify: { icon: '🎧', title: 'Now Playing' }, blog: { icon: '✍️', title: 'From the Blog' }, stats: { icon: '📊', title: 'Stats' } },
      widgets: widgets({ typing: true, intro: true, about: true, socialsBadges: true, skills: true, spotify: true, blog: true, stats: true, visitors: true, footer: true }),
    })),

  make('aura-glow', 'Aura Glow', '🔮', 'Dreamy • Soft purple • Calm', 'Soft purple aura, no hard dividers, 3D graph, dev quote. Aesthetic and calm.', ['funky', 'clean'],
    { name: 'Luna Park', tagline: 'Frontend Developer', typingLines: ['Frontend Developer 🔮', 'Calm code, clean UI'], currentWork: 'a component library', learning: 'Vue 3 & Nuxt', ask: 'frontend architecture', funFact: 'Lo-fi beats keep me coding', location: 'Vancouver, CA', skills: ['vue', 'ts', 'tailwind', 'sass'] },
    () => ({
      theme: 'aura', accent: 'a277ff',
      options: { align: 'center', skillStyle: 'skillicons', langLayout: 'donut', aboutIconSet: 'animated', dividers: false, typingColor: 'a277ff', typingFont: 'Quicksand' },
      headings: { about: { icon: '🔮', title: 'About' }, skills: { icon: '✨', title: 'Skills' }, contrib3d: { icon: '🌌', title: 'Contributions' }, stats: { icon: '📊', title: 'Stats' } },
      widgets: widgets({ typing: true, intro: true, about: true, skills: true, contrib3d: true, stats: true, quote: true, visitors: true, footer: true }),
    })),

  make('polyglot', 'Polyglot', '🗺️', 'Many tongues • Pie chart • Night Owl', 'Pie language chart front and center, big skill grid, activity trend.', ['data', 'clean'],
    { name: 'Devon Cross', tagline: 'Polyglot Engineer', typingLines: ['Polyglot Engineer 🗺️', 'One problem, many languages'], currentWork: 'a multi-language monorepo', learning: 'Elixir', ask: 'language design', funFact: 'I refactor in 6 languages', location: 'Dublin, IE', skills: ['ts', 'python', 'go', 'rust', 'java', 'cpp'] },
    () => ({
      theme: 'nightowl', accent: 'c792ea',
      options: { align: 'center', skillStyle: 'skillicons', langLayout: 'pie', typingColor: 'c792ea', dividers: true },
      headings: { skills: { icon: '🧬', title: 'Languages I Speak' }, stats: { icon: '🗺️', title: 'Language Stats' }, activityGraph: { icon: '📈', title: 'Activity' } },
      widgets: widgets({ typing: true, intro: true, skills: true, topLangs: true, activityGraph: true, stats: true, footer: true }),
    })),

  make('shades-purple', 'Purple Reign', '🟣', 'Royal • Gold on purple • Bold', 'Gold-on-purple regalia, snake animation, trophy crown. Loud and proud.', ['funky', 'animated'],
    { name: 'Violet Hayes', tagline: 'Full-Stack Developer', typingLines: ['Full-Stack Developer 👑', 'Royalty in every commit'], currentWork: 'a fintech app', learning: 'Next.js 15', ask: 'full-stack TypeScript', funFact: 'Purple is the only color', location: 'New York, US', skills: ['ts', 'react', 'nextjs', 'nodejs', 'postgres'] },
    () => ({
      theme: 'shades-of-purple', accent: 'fad000',
      options: { align: 'center', skillStyle: 'skillicons', socialStyle: 'for-the-badge', trophyColumns: 7, typingColor: 'fad000', dividers: true },
      headings: { about: { icon: '👑', title: 'About' }, skills: { icon: '💎', title: 'Royal Arsenal' }, socialsBadges: { icon: '🌐', title: 'The Court' }, stats: { icon: '📊', title: 'Royal Stats' }, trophies: { icon: '🏆', title: 'Crown Jewels' }, snake: { icon: '🐍', title: 'The Serpent' } },
      widgets: widgets({ typing: true, intro: true, socialsBadges: true, skills: true, stats: true, streak: true, snake: true, trophies: true, visitors: true, footer: true }),
    })),
]

export function templateById(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id)
}
