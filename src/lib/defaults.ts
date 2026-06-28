import type { ProfileConfig, WidgetToggles, WidgetKey } from '../types'

// Default heading icon + title for each section that renders an "## …" heading.
export const DEFAULT_HEADINGS: Record<string, { icon: string; title: string }> = {
  about: { icon: '👨‍💻', title: 'About Me' },
  socialsBadges: { icon: '🌐', title: 'Connect With Me' },
  skills: { icon: '🛠️', title: 'Tech Stack' },
  stats: { icon: '📊', title: 'GitHub Stats' },
  trophies: { icon: '🏆', title: 'GitHub Trophies' },
  contrib3d: { icon: '🧊', title: '3D Contribution Graph' },
  snake: { icon: '🐍', title: 'Contribution Snake' },
  pacman: { icon: '👾', title: 'Pac-Man Contribution Graph' },
  spotify: { icon: '🎧', title: 'Now Playing' },
  blog: { icon: '✍️', title: 'Latest Blog Posts' },
  support: { icon: '☕', title: 'Support' },
}

// Canonical top-to-bottom render order of every section. The drag-and-drop
// builder reorders this; generate.ts renders enabled widgets in this sequence.
export const DEFAULT_ORDER: WidgetKey[] = [
  'banner',
  'typing',
  'intro',
  'about',
  'socialsBadges',
  'skills',
  'visitors',
  'followBadge',
  'stats',
  'streak',
  'topLangs',
  'activityGraph',
  'trophies',
  'contrib3d',
  'snake',
  'pacman',
  'spotify',
  'blog',
  'quote',
  'support',
  'footer',
]

export const ALL_OFF: WidgetToggles = {
  banner: false,
  typing: false,
  intro: false,
  about: false,
  socialsBadges: false,
  skills: false,
  stats: false,
  topLangs: false,
  streak: false,
  trophies: false,
  activityGraph: false,
  snake: false,
  pacman: false,
  contrib3d: false,
  visitors: false,
  followBadge: false,
  spotify: false,
  blog: false,
  quote: false,
  support: false,
  footer: false,
}

export function widgets(on: Partial<WidgetToggles>): WidgetToggles {
  return { ...ALL_OFF, ...on }
}

export const DEFAULT_CONFIG: ProfileConfig = {
  username: '',
  name: '',
  tagline: 'Full-Stack Developer',
  typingLines: [
    'Full-Stack Developer 💻',
    'Open Source Enthusiast 🌱',
    'Always learning something new 🚀',
  ],
  about: [],
  location: '',
  company: '',
  currentWork: 'cool side projects',
  learning: 'new technologies',
  collab: 'open source projects',
  ask: 'web development',
  funFact: 'I love building things people use',
  socials: {},
  skills: ['ts', 'react', 'nextjs', 'nodejs', 'python', 'tailwind', 'postgres', 'docker', 'git', 'aws'],
  theme: 'tokyonight',
  accent: '70a5fd',
  widgets: widgets({
    typing: true,
    intro: true,
    about: true,
    socialsBadges: true,
    skills: true,
    stats: true,
    topLangs: true,
    streak: true,
    trophies: true,
    visitors: true,
    followBadge: true,
    footer: true,
  }),
  order: DEFAULT_ORDER,
  headings: {},
  options: {
    align: 'center',
    langLayout: 'compact',
    statsCompact: false,
    hideBorder: true,
    privateCommits: true,
    includeAllCommits: true,
    skillStyle: 'skillicons',
    trophyColumns: 7,
    spotifyUser: '',
    blogFeed: '',
    buymeacoffee: '',
    bannerUrl: '',
    greeting: "Hi 👋, I'm",
    typingAlign: 'center',
    typingSize: 28,
    typingColor: '70a5fd',
    typingFont: 'Fira Code',
    typingWeight: 600,
    typingDuration: 4000,
    aboutIconSet: 'emoji',
    socialStyle: 'for-the-badge',
    websiteTitle: 'Portfolio',
    dividers: true,
    trophyTitles: [],
    countersInline: true,
    counterStyle: 'flat',
    statsInline: true,
    statsHide: [],
  },
}

export function cloneConfig(c: ProfileConfig): ProfileConfig {
  return JSON.parse(JSON.stringify(c))
}

// "Build from scratch": empty canvas, sensible identity, nothing rendered yet.
export const SCRATCH_CONFIG: ProfileConfig = {
  ...cloneConfig(DEFAULT_CONFIG),
  name: '',
  tagline: '',
  about: [],
  currentWork: '',
  learning: '',
  collab: '',
  ask: '',
  funFact: '',
  widgets: { ...ALL_OFF, intro: true, footer: true },
  order: DEFAULT_ORDER,
}
