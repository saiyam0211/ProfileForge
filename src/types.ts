export type Align = 'center' | 'left' | 'right'
export type LangLayout = 'compact' | 'normal' | 'donut' | 'donut-vertical' | 'pie'
export type SkillStyle = 'skillicons' | 'badges'
export type BadgeStyle = 'for-the-badge' | 'flat' | 'flat-square' | 'plastic' | 'social'
export type AboutIconSet = 'emoji' | 'symbols' | 'minimal' | 'animated'
export type SocialStyle = BadgeStyle | 'icon'

export interface Socials {
  github?: string
  twitter?: string
  linkedin?: string
  instagram?: string
  youtube?: string
  devto?: string
  medium?: string
  hashnode?: string
  dribbble?: string
  behance?: string
  discord?: string
  stackoverflow?: string
  codepen?: string
  twitch?: string
  telegram?: string
  facebook?: string
  mastodon?: string
  threads?: string
  bluesky?: string
  gitlab?: string
  reddit?: string
  tiktok?: string
  pinterest?: string
  whatsapp?: string
  leetcode?: string
  kaggle?: string
  email?: string
  website?: string
}

export interface WidgetToggles {
  banner: boolean
  typing: boolean
  intro: boolean
  about: boolean
  socialsBadges: boolean
  skills: boolean
  stats: boolean
  topLangs: boolean
  streak: boolean
  trophies: boolean
  activityGraph: boolean
  snake: boolean
  pacman: boolean
  contrib3d: boolean
  visitors: boolean
  followBadge: boolean
  spotify: boolean
  blog: boolean
  quote: boolean
  support: boolean
  footer: boolean
}

export interface Options {
  align: Align
  langLayout: LangLayout
  statsCompact: boolean
  hideBorder: boolean
  privateCommits: boolean
  includeAllCommits: boolean
  skillStyle: SkillStyle
  trophyColumns: number
  spotifyUser: string
  blogFeed: string
  buymeacoffee: string
  bannerUrl: string
  // intro
  greeting: string
  // typing animation
  typingAlign: Align
  typingSize: number
  typingColor: string
  typingFont: string
  typingWeight: number
  typingDuration: number
  // about
  aboutIconSet: AboutIconSet
  // socials
  socialStyle: SocialStyle
  websiteTitle: string
  // dividers between sections
  dividers: boolean
  // which trophy categories to show (empty = all)
  trophyTitles: string[]
  // counters
  countersInline: boolean
  counterStyle: 'flat' | 'flat-square' | 'plastic' | 'for-the-badge'
  // stats cards side-by-side (max 2 per row)
  statsInline: boolean
  statsHide: string[] // stars,commits,prs,issues,contribs
  // 3D contribution graph output variant (filename produced by the Action)
  contrib3dVariant: string
  // snake palette variant + pac-man game variant
  snakeVariant: string
  pacmanVariant: string
}

export interface ProfileConfig {
  username: string
  name: string
  tagline: string
  typingLines: string[]
  about: string[]
  location: string
  company: string
  currentWork: string
  learning: string
  collab: string
  ask: string
  funFact: string
  socials: Socials
  skills: string[]
  theme: string
  accent: string
  widgets: WidgetToggles
  order: (keyof WidgetToggles)[]
  options: Options
  // per-section heading: icon ('' = no icon) + title text
  headings: Record<string, { icon: string; title: string }>
}

export type WidgetKey = keyof WidgetToggles

export interface TemplateDemo {
  name: string
  tagline: string
  typingLines: string[]
  currentWork: string
  learning: string
  ask: string
  funFact: string
  location: string
  skills: string[]
}

export interface Template {
  id: string
  name: string
  emoji: string
  vibe: string
  blurb: string
  tags: string[]
  demo: TemplateDemo
  apply: (base: ProfileConfig) => ProfileConfig
}
