import type { ProfileConfig } from '../types'
import { ACTIVITY_THEME } from './themes'

// Every "dynamic" element in a GitHub README is an <img> pointing at a service
// that returns image/svg+xml — GitHub strips scripts/iframes/styles. These
// builders produce those URLs. Snake/Pacman/3D are different: they are rendered
// by a scheduled GitHub Action and committed to the `output` branch, so here we
// only build the raw.githubusercontent URL that the committed file lives at.

const u = (c: ProfileConfig) => encodeURIComponent(c.username || 'octocat')

export function typingUrl(c: ProfileConfig): string {
  const o = c.options
  const lines = (c.typingLines.length ? c.typingLines : [c.tagline || 'Software Developer'])
    .map((l) => l.trim())
    .filter(Boolean)
    .join(';')
  const font = (o.typingFont || 'Fira Code').replace(/ /g, '+')
  const p = new URLSearchParams({
    weight: String(o.typingWeight || 600),
    size: String(o.typingSize || 28),
    duration: String(o.typingDuration || 4000),
    pause: '1000',
    color: o.typingColor || c.accent,
    center: String(o.typingAlign === 'center'),
    vCenter: 'true',
    width: '600',
    height: '60',
    lines,
  })
  return `https://readme-typing-svg.demolab.com?font=${font}&${p.toString()}`
}

export function statsUrl(c: ProfileConfig): string {
  const p = new URLSearchParams({
    username: c.username,
    show_icons: 'true',
    theme: c.theme,
    hide_border: String(c.options.hideBorder),
    count_private: String(c.options.privateCommits),
    include_all_commits: String(c.options.includeAllCommits),
    rank_icon: 'github',
  })
  if (c.options.statsCompact) p.set('card_width', '450')
  if (c.options.statsHide?.length) p.set('hide', c.options.statsHide.join(','))
  return `https://github-readme-stats.vercel.app/api?${p}`
}

export function topLangsUrl(c: ProfileConfig): string {
  const p = new URLSearchParams({
    username: c.username,
    layout: c.options.langLayout,
    theme: c.theme,
    hide_border: String(c.options.hideBorder),
    langs_count: '8',
  })
  return `https://github-readme-stats.vercel.app/api/top-langs/?${p}`
}

export function streakUrl(c: ProfileConfig): string {
  const p = new URLSearchParams({
    user: c.username,
    theme: c.theme,
    hide_border: String(c.options.hideBorder),
  })
  return `https://streak-stats.demolab.com?${p}`
}

export function trophyUrl(c: ProfileConfig): string {
  const p = new URLSearchParams({
    username: c.username,
    theme: c.theme === 'default' ? 'flat' : c.theme,
    column: String(c.options.trophyColumns),
    margin_w: '4',
    margin_h: '4',
    no_bg: String(c.theme === 'transparent'),
  })
  if (c.options.trophyTitles?.length) p.set('title', c.options.trophyTitles.join(','))
  return `https://github-profile-trophy.vercel.app/?${p}`
}

export function activityGraphUrl(c: ProfileConfig): string {
  const p = new URLSearchParams({
    username: c.username,
    theme: ACTIVITY_THEME[c.theme] ?? 'github-compact',
    hide_border: String(c.options.hideBorder),
    area: 'true',
  })
  return `https://github-readme-activity-graph.vercel.app/graph?${p}`
}

export function visitorsUrl(c: ProfileConfig): string {
  const p = new URLSearchParams({
    username: c.username,
    label: 'Profile Views',
    color: c.accent,
    style: c.options.counterStyle || 'flat',
  })
  return `https://komarev.com/ghpvc/?${p}`
}

export function followBadgeUrl(c: ProfileConfig): string {
  const style = c.options.counterStyle === 'flat' ? 'social' : c.options.counterStyle || 'social'
  const p = new URLSearchParams({ label: 'Followers', style })
  if (style !== 'social') p.set('color', c.accent)
  return `https://img.shields.io/github/followers/${u(c)}?${p}`
}

export function starsBadgeUrl(c: ProfileConfig): string {
  const p = new URLSearchParams({ label: 'Total Stars', color: c.accent, style: 'flat' })
  // dynamic shields endpoint summing a user's stars via a community API
  return `https://img.shields.io/github/stars/${u(c)}?${p}`
}

// Files produced by the GitHub Actions (output branch / repo path).
export function snakeUrls(c: ProfileConfig) {
  const base = `https://raw.githubusercontent.com/${c.username}/${c.username}/output`
  return { light: `${base}/github-snake.svg`, dark: `${base}/github-snake-dark.svg` }
}

export function pacmanUrls(c: ProfileConfig) {
  const base = `https://raw.githubusercontent.com/${c.username}/${c.username}/output`
  return { light: `${base}/pacman-contribution-graph.svg`, dark: `${base}/pacman-contribution-graph-dark.svg` }
}

export function contrib3dUrl(c: ProfileConfig): string {
  // yoshi389111 commits to the default branch under profile-3d-contrib/
  return `https://raw.githubusercontent.com/${c.username}/${c.username}/main/profile-3d-contrib/profile-night-rainbow.svg`
}

export function spotifyUrl(c: ProfileConfig): string {
  const uid = c.options.spotifyUser || 'spotify'
  return `https://spotify-github-profile.kittinanx.com/api/view?uid=${encodeURIComponent(uid)}&cover_image=true&theme=novatorem&show_offline=true`
}

export function skillIconsUrl(ids: string[], skillSlugs: string[]): string {
  const i = skillSlugs.filter(Boolean).join(',')
  return `https://skillicons.dev/icons?i=${i}&theme=dark`
}
