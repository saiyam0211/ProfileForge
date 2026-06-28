import type { ProfileConfig, WidgetKey, Align } from '../types'
import { skillById, type Skill } from './skills'
import { SOCIALS, socialDef } from './socials'
import { DEFAULT_ORDER, DEFAULT_HEADINGS } from './defaults'
import * as W from './widgets'

// ---- icon sources (Iconify — reliable, colourful) ------------------------
export const iconifyUrl = (id: string) => `https://api.iconify.design/${id}.svg`
// a tech skill → its icon URL. skillicons.dev single-icon for supported slugs
// (consistent rounded tiles), Iconify colourful `logos:` for the rest.
export function skillIconSrc(s: Skill): string {
  if (s.si) return `https://skillicons.dev/icons?i=${s.si}`
  if (s.logos) return iconifyUrl(`logos:${s.logos}`)
  return `https://cdn.simpleicons.org/${s.logo}/${s.color}`
}
// colourful app-icon id for a social platform (falls back to simpleicons CDN in render)
export const SOCIAL_LOGOS: Record<string, string> = {
  github: 'github-icon', linkedin: 'linkedin-icon', twitter: 'twitter', instagram: 'instagram-icon',
  youtube: 'youtube-icon', medium: 'medium-icon', gitlab: 'gitlab', dribbble: 'dribbble-icon',
  codepen: 'codepen-icon', twitch: 'twitch', discord: 'discord-icon', telegram: 'telegram',
  whatsapp: 'whatsapp-icon', facebook: 'facebook', mastodon: 'mastodon-icon', reddit: 'reddit-icon',
  tiktok: 'tiktok-icon', email: 'google-gmail', behance: 'behance', stackoverflow: 'stack-overflow-icon',
}

export const headingOf = (c: ProfileConfig, key: string) => ({ ...DEFAULT_HEADINGS[key], ...(c.headings?.[key] || {}) })

function heading(c: ProfileConfig, key: string): string {
  const h = headingOf(c, key)
  const icon = h.icon ? `${h.icon} ` : ''
  return `## ${icon}${h.title}`
}

// Simple Icons removed these brands, so shields renders a blank chip. Supply the
// logo as an inline base64 (white) SVG instead. Keyed by the social `logo` slug.
const BLANK_LOGO_B64: Record<string, string> = {
  linkedin:
    'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0xOSAzYTIgMiAwIDAgMSAyIDJ2MTRhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yem0tLjUgMTUuNXYtNS4zYTMuMjYgMy4yNiAwIDAgMC0zLjI2LTMuMjZjLS44NSAwLTEuODQuNTItMi4zMiAxLjN2LTEuMTFoLTIuNzl2OC4zN2gyLjc5di00LjkzYzAtLjc3LjYyLTEuNCAxLjM5LTEuNGExLjQgMS40IDAgMCAxIDEuNCAxLjR2NC45M3pNNi44OCA4LjU2YTEuNjggMS42OCAwIDAgMCAxLjY4LTEuNjhjMC0uOTMtLjc1LTEuNjktMS42OC0xLjY5YTEuNjkgMS42OSAwIDAgMC0xLjY5IDEuNjljMCAuOTMuNzYgMS42OCAxLjY5IDEuNjhtMS4zOSA5Ljk0di04LjM3SDUuNXY4LjM3eiIvPjwvc3ZnPg==',
  codepen:
    'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Im04LjIxIDEybC0xLjMzLjg5di0xLjc4em0zLjI2LTIuMThWNy4zNGwtNC4xNiAyLjc4bDEuODUgMS4yNHptNS4yMy4zbC00LjE3LTIuNzh2Mi40OGwyLjMxIDEuNTR6bS05LjM5IDMuNzZsNC4xNiAyLjc4di0yLjQ4bC0yLjMxLTEuNTR6bTUuMjIuM3YyLjQ4bDQuMTctMi43OGwtMS44Ni0xLjI0ek0xMiAxMC43NEwxMC4xMiAxMkwxMiAxMy4yNkwxMy44OCAxMnpNMjIgMTJjMCA1LjUtNC41IDEwLTEwIDEwUzIgMTcuNSAyIDEyUzYuNSAyIDEyIDJzMTAgNC41IDEwIDEwbS0zLjgyLTEuODh2LS4wN2wtLjAxLS4wNWwtLjAxLS4wNWMtLjAxLS4wMS0uMDEtLjAyLS4wMi0uMDRsLS4wMS0uMDJsLS4wMi0uMDRsLS4wMS0uMDJsLS4wMi0uMDNsLS4wMi0uMDNsLS4wMy0uMDNsLS4wMy0uMDJWOS43bC0uMDQtLjAybC0uMDEtLjAxbC01LjY1LTMuNzZhLjUzLjUzIDAgMCAwLS41OSAwTDYuMDUgOS42N3YuMDFMNiA5Ljd2LjAybC0uMDMuMDJsLS4wMy4wM2wtLjAxLjAzbC0uMDMuMDNsLS4wMS4wMmwtLjAyLjA0bC0uMDEuMDJsLS4wMi4wNFYxMGgtLjAxbC0uMDEuMDV2My45bC4wMS4wNWguMDF2LjA1Yy4wMS4wMS4wMS4wMi4wMi4wNGwuMDEuMDJsLjAyLjA0bC4wMS4wMmwuMDIuMDNsLjAyLjAzbC4wMy4wM2wuMDMuMDJ2LjAybC4wNC4wMmwuMDEuMDFsNS42NiAzLjc3Yy4wOC4wNi4xOS4wOC4yOS4wOHMuMjEtLjAzLjMtLjA4bDUuNjUtMy43N2wuMDEtLjAxbC4wNC0uMDJ2LS4wMmwuMDMtLjAybC4wMy0uMDNsLjAyLS4wM2wuMDItLjAzbC4wMS0uMDJsLjAyLS4wNGwuMDEtLjAybC4wMi0uMDRWMTRoLjAxbC4wMS0uMDV6bS0xLjA2IDIuNzd2LTEuNzhsLTEuMzMuODl6Ii8+PC9zdmc+',
}

// shields label escaping: '-' -> '--', '_' -> '__', ' ' -> '_'
const esc = (s: string) => s.replace(/-/g, '--').replace(/_/g, '__').replace(/ /g, '_')

function badge(label: string, color: string, logo: string, style: string, href?: string): string {
  const url = `https://img.shields.io/badge/${esc(label)}-${color}.svg?style=${style}&logo=${logo}&logoColor=white`
  return href ? `<a href="${href}" target="_blank"><img src="${url}" alt="${label}" /></a>` : `<img src="${url}" alt="${label}" />`
}

function img(src: string, alt: string, height?: number): string {
  const h = height ? ` height="${height}"` : ''
  return `<img src="${src}" alt="${alt}"${h} />`
}

// colourful single icon from the Simple Icons CDN (used for skills not on
// skillicons.dev — pandas/numpy/openai — and for icon-only social links)
const cdnIcon = (slug: string, color: string, h: number, alt: string) =>
  `<img src="https://cdn.simpleicons.org/${slug}/${color}" height="${h}" alt="${alt}" />`

// Google Noto animated emoji (stable CDN) keyed by about-section role.
// alt = the static emoji so it degrades gracefully if a GIF is unavailable.
// (verified codepoints that exist in the animated set)
const NOTO: Record<string, string> = { work: '1f680', learning: '1f331', collab: '1f91d', ask: '1f4ac', location: '1f30d', company: '1f4bc', fun: '26a1' }
const notoImg = (cp: string, emoji: string) => `<img src="https://fonts.gstatic.com/s/e/notoemoji/latest/${cp}/512.gif" alt="${emoji}" width="22" height="22" />`

// wrap a body for the given alignment (left = no wrapper)
function wrap(align: Align, body: string): string {
  if (!body.trim()) return ''
  return align === 'left' ? body : `<div align="${align}">\n\n${body}\n\n</div>`
}

// about-section icon sets
const ABOUT_ICONS: Record<string, Record<string, string>> = {
  emoji: { work: '🔭', learning: '🌱', collab: '👯', ask: '💬', location: '📍', company: '🏢', fun: '⚡' },
  symbols: { work: '🚀', learning: '📚', collab: '🤝', ask: '💡', location: '🌍', company: '🏢', fun: '✨' },
  minimal: { work: '▹', learning: '▹', collab: '▹', ask: '▹', location: '▹', company: '▹', fun: '▹' },
}

// image-only builders (for side-by-side rows)
const statImg = (c: ProfileConfig) => img(W.statsUrl(c), 'github stats')
const streakImg = (c: ProfileConfig) => img(W.streakUrl(c), 'streak stats')
const langImg = (c: ProfileConfig) => img(W.topLangsUrl(c), 'top languages')

// stat-family cards that can sit side-by-side (and be reordered)
export const STAT_INLINE_KEYS: WidgetKey[] = ['stats', 'streak', 'topLangs']
export function statCardSrc(c: ProfileConfig, key: WidgetKey): string {
  if (key === 'stats') return W.statsUrl(c)
  if (key === 'streak') return W.streakUrl(c)
  if (key === 'topLangs') return W.topLangsUrl(c)
  if (key === 'activityGraph') return W.activityGraphUrl(c)
  if (key === 'trophies') return W.trophyUrl(c)
  return ''
}
const STAT_ALT: Record<string, string> = { stats: 'github stats', streak: 'streak stats', topLangs: 'top languages' }

// HTML table → reliable 2-per-row side-by-side on GitHub (responsive width)
function statsTable(c: ProfileConfig, keys: WidgetKey[]): string {
  const cells = keys.map((k) => `<td>${img(statCardSrc(c, k), STAT_ALT[k] || k)}</td>`)
  const rows: string[] = []
  for (let i = 0; i < cells.length; i += 2) rows.push(`    <tr>\n      ${cells.slice(i, i + 2).join('\n      ')}\n    </tr>`)
  return `<div align="center">\n  <table>\n${rows.join('\n')}\n  </table>\n</div>`
}

const RENDERERS: Record<WidgetKey, (c: ProfileConfig) => string | null> = {
  banner: (c) => (c.options.bannerUrl ? wrap(c.options.align, img(c.options.bannerUrl, 'banner')) : null),

  typing: (c) => wrap(c.options.typingAlign, `<a href="https://github.com/${c.username}"><img src="${W.typingUrl(c)}" alt="typing banner" /></a>`),

  intro: (c) => {
    const al = c.options.align
    const attr = al === 'left' ? '' : ` align="${al}"`
    const name = c.name || c.username || 'Your Name'
    const greet = c.options.greeting ? `${c.options.greeting} ` : ''
    const wave = `<h1${attr}>${greet}${name}</h1>`
    const tag = c.tagline ? `<h3${attr}>${c.tagline}</h3>` : ''
    return [wave, tag].filter(Boolean).join('\n')
  },

  about: (c) => {
    const animated = c.options.aboutIconSet === 'animated'
    const ic = ABOUT_ICONS[c.options.aboutIconSet] ?? ABOUT_ICONS.emoji
    const icon = (role: string) => (animated ? notoImg(NOTO[role], ABOUT_ICONS.emoji[role]) : ic[role])
    const lines: string[] = []
    if (c.currentWork) lines.push(`- ${icon('work')} I'm currently working on **${c.currentWork}**`)
    if (c.learning) lines.push(`- ${icon('learning')} I'm currently learning **${c.learning}**`)
    if (c.collab) lines.push(`- ${icon('collab')} I'm looking to collaborate on **${c.collab}**`)
    if (c.ask) lines.push(`- ${icon('ask')} Ask me about **${c.ask}**`)
    if (c.location) lines.push(`- ${icon('location')} Based in **${c.location}**`)
    if (c.company) lines.push(`- ${icon('company')} Working at **${c.company}**`)
    if (c.funFact) lines.push(`- ${icon('fun')} Fun fact: ${c.funFact}`)
    return lines.length ? [heading(c, 'about'), '', lines.join('\n')].join('\n') : null
  },

  socialsBadges: (c) => {
    const style = c.options.socialStyle
    const active = SOCIALS.filter((s) => c.socials[s.key]?.trim())
    const items = active.map((s) => {
      const href = socialDef(s.key).toUrl(c.socials[s.key]!.trim())
      if (style === 'icon') {
        // brand chip with a white logo — visible on BOTH light and dark backgrounds
        const b64 = BLANK_LOGO_B64[s.logo]
        const logoParam = b64 ? encodeURIComponent(`data:image/svg+xml;base64,${b64}`) : s.logo
        const src = `https://img.shields.io/badge/-${s.color}?style=for-the-badge&logo=${logoParam}&logoColor=white`
        return `<a href="${href}" target="_blank"><img src="${src}" alt="${s.label}" height="32" /></a>&nbsp;`
      }
      const label = s.key === 'website' ? c.options.websiteTitle || 'Website' : s.label
      return badge(label, s.color, s.logo, style, href)
    })
    return items.length ? [heading(c, 'socialsBadges'), '', wrap(c.options.align, items.join('\n'))].join('\n') : null
  },

  skills: (c) => {
    if (!c.skills.length) return null
    let body: string
    if (c.options.skillStyle === 'skillicons') {
      // individual colourful Iconify icons — consistent spacing + per-icon
      body = c.skills
        .map(skillById)
        .filter(Boolean)
        .map((s) => `<img src="${skillIconSrc(s!)}" alt="${s!.label}" width="48" height="48" />`)
        .join('&nbsp;&nbsp;')
    } else {
      body = c.skills.map(skillById).filter(Boolean).map((s) => badge(s!.label, s!.color, s!.logo, 'for-the-badge')).join('\n')
    }
    return [heading(c, 'skills'), '', wrap(c.options.align, body)].join('\n')
  },

  visitors: (c) => wrap(c.options.align, img(W.visitorsUrl(c), 'profile views')),
  followBadge: (c) => wrap(c.options.align, `<a href="https://github.com/${c.username}?tab=followers">${img(W.followBadgeUrl(c), 'followers')}</a>`),

  stats: (c) => [heading(c, 'stats'), '', wrap('center', statImg(c))].join('\n'),
  streak: (c) => wrap('center', streakImg(c)),
  topLangs: (c) => wrap('center', langImg(c)),
  activityGraph: (c) => wrap('center', img(W.activityGraphUrl(c), 'activity graph')),
  trophies: (c) => [heading(c, 'trophies'), '', wrap('center', img(W.trophyUrl(c), 'trophies'))].join('\n'),
  contrib3d: (c) => [heading(c, 'contrib3d'), '', wrap('center', img(W.contrib3dUrl(c), '3d contributions'))].join('\n'),

  snake: (c) => {
    const s = W.snakeUrls(c)
    const pic = `<picture>\n  <source media="(prefers-color-scheme: dark)" srcset="${s.dark}" />\n  <source media="(prefers-color-scheme: light)" srcset="${s.light}" />\n  <img alt="snake animation" src="${s.light}" />\n</picture>`
    return [heading(c, 'snake'), '', wrap('center', pic)].join('\n')
  },
  pacman: (c) => {
    const p = W.pacmanUrls(c)
    const pic = `<picture>\n  <source media="(prefers-color-scheme: dark)" srcset="${p.dark}" />\n  <source media="(prefers-color-scheme: light)" srcset="${p.light}" />\n  <img alt="pacman contribution graph" src="${p.light}" />\n</picture>`
    return [heading(c, 'pacman'), '', wrap('center', pic)].join('\n')
  },

  spotify: (c) => [heading(c, 'spotify'), '', wrap('center', `<a href="https://open.spotify.com/user/${c.options.spotifyUser}"><img src="${W.spotifyUrl(c)}" alt="spotify now playing" /></a>`)].join('\n'),
  blog: (c) => [heading(c, 'blog'), '', '<!-- BLOG-POST-LIST:START -->', '<!-- BLOG-POST-LIST:END -->'].join('\n'),
  quote: (c) => wrap('center', img(`https://quotes-github-readme.vercel.app/api?type=horizontal&theme=${c.theme}`, 'dev quote')),
  support: (c) => (c.options.buymeacoffee ? [heading(c, 'support'), '', wrap(c.options.align, badge('Buy Me A Coffee', 'FFDD00', 'buymeacoffee', 'for-the-badge', `https://www.buymeacoffee.com/${c.options.buymeacoffee}`))].join('\n') : null),
  footer: (c) => {
    const u = c.username || 'your-username'
    return wrap('center', `<sub>⭐️ From [${u}](https://github.com/${u}) · Generated with ProfileForge</sub>`)
  },
}

// ---- block grouping (side-by-side rows) ----------------------------------
const COUNTERS: WidgetKey[] = ['visitors', 'followBadge']
const STAT_INLINE: WidgetKey[] = ['stats', 'streak', 'topLangs']

export interface RenderUnit {
  id: string // stable id for DnD (the lead widget key)
  keys: WidgetKey[]
  md: string
}

export interface Blocks {
  units: RenderUnit[]
  footer: RenderUnit | null
}

export function generateBlocks(c: ProfileConfig): Blocks {
  const ordered = c.order && c.order.length ? c.order : DEFAULT_ORDER
  const seen = new Set(ordered)
  const keys = [...ordered, ...DEFAULT_ORDER.filter((k) => !seen.has(k))].filter((k) => c.widgets[k] && k !== 'footer')

  const consumed = new Set<WidgetKey>()
  const units: RenderUnit[] = []

  for (const k of keys) {
    if (consumed.has(k)) continue

    // counters row
    if (c.options.countersInline && COUNTERS.includes(k)) {
      const group = keys.filter((x) => COUNTERS.includes(x))
      group.forEach((x) => consumed.add(x))
      const imgs = group.map((x) => RENDERERS[x](c)!).filter(Boolean)
      // strip the per-widget wrap, re-wrap together on one line
      const inner = group
        .map((x) => (x === 'visitors' ? img(W.visitorsUrl(c), 'profile views') : `<a href="https://github.com/${c.username}?tab=followers">${img(W.followBadgeUrl(c), 'followers')}</a>`))
        .join('&nbsp;&nbsp;')
      units.push({ id: k, keys: group, md: wrap(c.options.align, inner) })
      if (imgs.length === 0) units.pop()
      continue
    }

    // stats row (stats / streak / top-langs) → 2-per-row table, side by side
    if (c.options.statsInline && STAT_INLINE.includes(k)) {
      const group = keys.filter((x) => STAT_INLINE.includes(x))
      group.forEach((x) => consumed.add(x))
      units.push({ id: group[0], keys: group, md: [heading(c, 'stats'), '', statsTable(c, group)].join('\n') })
      continue
    }

    const md = RENDERERS[k](c)
    if (md && md.trim()) units.push({ id: k, keys: [k], md })
    consumed.add(k)
  }

  const footer = c.widgets.footer ? { id: 'footer', keys: ['footer' as WidgetKey], md: RENDERERS.footer(c)! } : null
  return { units, footer }
}

export interface GenResult {
  markdown: string
  needsSnake: boolean
  needsPacman: boolean
  needs3d: boolean
  needsBlog: boolean
  isEmpty: boolean
}

export function generateReadme(c: ProfileConfig): GenResult {
  const { units, footer } = generateBlocks(c)
  const all = [...units.map((u) => u.md), ...(footer ? [footer.md] : [])]
  const sep = c.options.dividers ? '\n\n---\n\n' : '\n\n<br>\n\n'
  const markdown = all.join(sep) + (all.length ? '\n' : '')
  return {
    markdown,
    needsSnake: c.widgets.snake,
    needsPacman: c.widgets.pacman,
    needs3d: c.widgets.contrib3d,
    needsBlog: c.widgets.blog,
    isEmpty: all.length === 0,
  }
}
