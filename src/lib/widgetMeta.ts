import type { WidgetKey } from '../types'

export type WidgetGroup = 'Essentials' | 'Skills & Social' | 'Stats & Graphs' | 'Animations' | 'Extras'

export const WIDGET_GROUPS: WidgetGroup[] = ['Essentials', 'Skills & Social', 'Stats & Graphs', 'Animations', 'Extras']

export interface WidgetMeta {
  key: WidgetKey
  label: string
  emoji: string
  group: WidgetGroup
  desc: string // plain-language explanation for the wizard
  hint?: string // e.g. needs a GitHub Action
}

export const WIDGET_META: WidgetMeta[] = [
  { key: 'banner', label: 'Banner image', emoji: '🖼️', group: 'Essentials', desc: 'A wide cover image at the very top of your profile.' },
  { key: 'typing', label: 'Typing animation', emoji: '⌨️', group: 'Essentials', desc: 'Animated text that types itself out and cycles through your taglines — like a typewriter.' },
  { key: 'intro', label: 'Intro heading', emoji: '👋', group: 'Essentials', desc: '“Hi 👋, I’m <name>” heading with your role underneath.' },
  { key: 'about', label: 'About me', emoji: '🧑‍💻', group: 'Essentials', desc: 'A short bullet list: what you’re working on, learning, and a fun fact.' },
  { key: 'footer', label: 'Footer', emoji: '⭐', group: 'Essentials', desc: 'A small credit line at the bottom of your README.' },
  { key: 'skills', label: 'Tech stack', emoji: '🛠️', group: 'Skills & Social', desc: 'A grid of logos (or badges) for the languages and tools you use.' },
  { key: 'socialsBadges', label: 'Social badges', emoji: '🌐', group: 'Skills & Social', desc: 'Clickable badges linking to your LinkedIn, X, YouTube, etc.' },
  { key: 'stats', label: 'GitHub stats card', emoji: '📊', group: 'Stats & Graphs', desc: 'Your total stars, commits, PRs and a rank — pulled live from GitHub.' },
  { key: 'streak', label: 'Streak card', emoji: '🔥', group: 'Stats & Graphs', desc: 'Current and longest daily contribution streak.' },
  { key: 'topLangs', label: 'Top languages', emoji: '🧬', group: 'Stats & Graphs', desc: 'A breakdown of the languages you use most across your repos.' },
  { key: 'activityGraph', label: 'Activity graph', emoji: '📈', group: 'Stats & Graphs', desc: 'A line chart of your contribution activity over the past months.' },
  { key: 'trophies', label: 'Trophies', emoji: '🏆', group: 'Stats & Graphs', desc: 'Achievement trophies based on your GitHub activity.' },
  { key: 'visitors', label: 'Profile view counter', emoji: '👀', group: 'Stats & Graphs', desc: 'A little badge that counts how many people viewed your profile.' },
  { key: 'followBadge', label: 'Followers counter', emoji: '➕', group: 'Stats & Graphs', desc: 'A badge showing your GitHub follower count, with a follow link.' },
  { key: 'snake', label: 'Contribution snake', emoji: '🐍', group: 'Animations', desc: 'A snake that slithers across your contribution grid eating the squares.', hint: 'Action' },
  { key: 'pacman', label: 'Pac-Man graph', emoji: '👾', group: 'Animations', desc: 'Pac-Man munches through your contribution grid. Pure fun.', hint: 'Action' },
  { key: 'contrib3d', label: '3D contribution graph', emoji: '🧊', group: 'Animations', desc: 'Your contribution calendar rendered as an isometric 3D city.', hint: 'Action' },
  { key: 'spotify', label: 'Spotify now-playing', emoji: '🎧', group: 'Extras', desc: 'Shows the track you’re currently listening to on Spotify.' },
  { key: 'blog', label: 'Latest blog posts', emoji: '✍️', group: 'Extras', desc: 'Auto-pulls your most recent blog posts from an RSS feed.', hint: 'Action' },
  { key: 'quote', label: 'Dev quote', emoji: '💬', group: 'Extras', desc: 'A random programming quote that changes on each load.' },
  { key: 'support', label: 'Buy me a coffee', emoji: '☕', group: 'Extras', desc: 'A donation button linking to your Buy Me a Coffee page.' },
]

export const WIDGET_LABEL: Record<WidgetKey, WidgetMeta> = Object.fromEntries(
  WIDGET_META.map((m) => [m.key, m]),
) as Record<WidgetKey, WidgetMeta>
