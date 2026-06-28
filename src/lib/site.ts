export const REPO = 'saiyam0211/ProfileForge'
export const REPO_URL = `https://github.com/${REPO}`
export const REPO_API = `https://api.github.com/repos/${REPO}`

// nicely format a star count (1234 -> 1.2k)
export function formatCount(n: number): string {
  if (n < 1000) return String(n)
  return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`
}
