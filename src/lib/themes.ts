// Themes supported by github-readme-stats (anuraghazra) — shared across
// stats / top-langs / streak / trophy cards so widgets stay coherent.
export interface ThemeDef {
  id: string
  label: string
  accent: string // default accent hex (no '#') used for typing/visitors/badges
  swatch: [string, string, string] // bg, title, text — for the picker preview
}

export const THEMES: ThemeDef[] = [
  { id: 'default', label: 'Default', accent: '2f80ed', swatch: ['ffffff', '2f80ed', '434d58'] },
  { id: 'dark', label: 'Dark', accent: '58a6ff', swatch: ['141321', 'fff', '9f9f9f'] },
  { id: 'radical', label: 'Radical', accent: 'fe428e', swatch: ['141321', 'fe428e', 'a9fef7'] },
  { id: 'tokyonight', label: 'Tokyo Night', accent: '70a5fd', swatch: ['1a1b27', '70a5fd', '38bdae'] },
  { id: 'merko', label: 'Merko', accent: 'abd200', swatch: ['0a0f0b', 'abd200', '68b587'] },
  { id: 'gruvbox', label: 'Gruvbox', accent: 'fabd2f', swatch: ['282828', 'fabd2f', '8ec07c'] },
  { id: 'onedark', label: 'One Dark', accent: 'e4bf7a', swatch: ['282c34', 'e4bf7a', 'df6d74'] },
  { id: 'cobalt', label: 'Cobalt', accent: 'e683d9', swatch: ['193549', 'e683d9', '75eeb2'] },
  { id: 'synthwave', label: 'Synthwave', accent: 'e2e9ec', swatch: ['2b213a', 'e2e9ec', 'e5289e'] },
  { id: 'highcontrast', label: 'High Contrast', accent: 'e7f216', swatch: ['000', 'e7f216', 'fff'] },
  { id: 'dracula', label: 'Dracula', accent: 'ff6e96', swatch: ['282a36', 'ff6e96', 'f8f8f2'] },
  { id: 'prussian', label: 'Prussian', accent: 'bddfff', swatch: ['172f45', 'bddfff', 'a5d6ff'] },
  { id: 'monokai', label: 'Monokai', accent: 'eb1f6a', swatch: ['272822', 'eb1f6a', 'f1f1eb'] },
  { id: 'vue', label: 'Vue', accent: '41b883', swatch: ['fffefe', '41b883', '273849'] },
  { id: 'vue-dark', label: 'Vue Dark', accent: '41b883', swatch: ['273849', '41b883', 'fffefe'] },
  { id: 'shades-of-purple', label: 'Shades of Purple', accent: 'fad000', swatch: ['2d2b55', 'fad000', 'a599e9'] },
  { id: 'nightowl', label: 'Night Owl', accent: 'c792ea', swatch: ['011627', 'c792ea', 'acb8c2'] },
  { id: 'buefy', label: 'Buefy', accent: '7957d5', swatch: ['ffffff', '7957d5', '24292e'] },
  { id: 'blue-green', label: 'Blue Green', accent: '2f97c1', swatch: ['040f0f', '2f97c1', '0cf574'] },
  { id: 'algolia', label: 'Algolia', accent: '00aeff', swatch: ['050f2c', '00aeff', 'ffffff'] },
  { id: 'great-gatsby', label: 'Great Gatsby', accent: 'ffa726', swatch: ['000000', 'ffa726', 'fff7e1'] },
  { id: 'darcula', label: 'Darcula', accent: 'ba5f17', swatch: ['242b2e', 'ba5f17', 'b0bec5'] },
  { id: 'aura', label: 'Aura', accent: 'a277ff', swatch: ['15141b', 'a277ff', 'edecee'] },
  { id: 'aura-dark', label: 'Aura Dark', accent: 'ffca85', swatch: ['100e17', 'ffca85', 'a5d6ff'] },
  { id: 'panda', label: 'Panda', accent: '19f9d8', swatch: ['31353a', '19f9d8', 'A3B8C2'] },
  { id: 'github_dark', label: 'GitHub Dark', accent: '58a6ff', swatch: ['0d1117', '58a6ff', 'c9d1d9'] },
  { id: 'github_dark_dimmed', label: 'GitHub Dimmed', accent: '539bf5', swatch: ['22272e', '539bf5', 'adbac7'] },
  { id: 'discord_old_blurple', label: 'Discord Blurple', accent: '7289da', swatch: ['7289da', 'ffffff', 'ffffff'] },
  { id: 'transparent', label: 'Transparent', accent: '58a6ff', swatch: ['00000000', '006aff', '417e87'] },
]

// activity-graph (Ashutosh00710) has its own theme set; map our themes to the
// closest activity-graph theme so the chart matches the rest of the card stack.
export const ACTIVITY_THEME: Record<string, string> = {
  default: 'github',
  dark: 'github-compact',
  radical: 'redical',
  tokyonight: 'tokyo-night',
  gruvbox: 'gruvbox',
  dracula: 'dracula',
  'shades-of-purple': 'react-dark',
  nightowl: 'nord',
  synthwave: 'high-contrast',
  highcontrast: 'high-contrast',
  github_dark: 'github-compact',
  github_dark_dimmed: 'github-compact',
  merko: 'merko',
  cobalt: 'cobalt',
  aura: 'react-dark',
  'aura-dark': 'react-dark',
}

export function themeById(id: string): ThemeDef {
  return THEMES.find((t) => t.id === id) ?? THEMES[1]
}
