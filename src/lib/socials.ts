import type { Socials } from '../types'

// Each platform: shields badge (logo + brand color) and a URL builder from the
// stored handle. If the handle already looks like a URL we use it verbatim.
export interface SocialDef {
  key: keyof Socials
  label: string
  logo: string // simpleicons slug
  color: string // brand hex (no '#')
  placeholder: string
  toUrl: (handle: string) => string
}

const asIs = (h: string, base: string) => (/^https?:\/\//i.test(h) ? h : base + h.replace(/^@/, ''))

export const SOCIALS: SocialDef[] = [
  { key: 'github', label: 'GitHub', logo: 'github', color: '181717', placeholder: 'username', toUrl: (h) => asIs(h, 'https://github.com/') },
  { key: 'linkedin', label: 'LinkedIn', logo: 'linkedin', color: '0A66C2', placeholder: 'in/your-name', toUrl: (h) => asIs(h, 'https://linkedin.com/in/') },
  { key: 'twitter', label: 'X / Twitter', logo: 'x', color: '000000', placeholder: 'handle', toUrl: (h) => asIs(h, 'https://x.com/') },
  { key: 'instagram', label: 'Instagram', logo: 'instagram', color: 'E4405F', placeholder: 'handle', toUrl: (h) => asIs(h, 'https://instagram.com/') },
  { key: 'youtube', label: 'YouTube', logo: 'youtube', color: 'FF0000', placeholder: '@channel', toUrl: (h) => asIs(h, 'https://youtube.com/') },
  { key: 'devto', label: 'Dev.to', logo: 'devdotto', color: '0A0A0A', placeholder: 'username', toUrl: (h) => asIs(h, 'https://dev.to/') },
  { key: 'medium', label: 'Medium', logo: 'medium', color: '000000', placeholder: '@username', toUrl: (h) => asIs(h, 'https://medium.com/') },
  { key: 'hashnode', label: 'Hashnode', logo: 'hashnode', color: '2962FF', placeholder: '@username', toUrl: (h) => asIs(h, 'https://hashnode.com/') },
  { key: 'stackoverflow', label: 'Stack Overflow', logo: 'stackoverflow', color: 'F58025', placeholder: 'users/123/name', toUrl: (h) => asIs(h, 'https://stackoverflow.com/') },
  { key: 'leetcode', label: 'LeetCode', logo: 'leetcode', color: 'FFA116', placeholder: 'username', toUrl: (h) => asIs(h, 'https://leetcode.com/') },
  { key: 'kaggle', label: 'Kaggle', logo: 'kaggle', color: '20BEFF', placeholder: 'username', toUrl: (h) => asIs(h, 'https://kaggle.com/') },
  { key: 'gitlab', label: 'GitLab', logo: 'gitlab', color: 'FC6D26', placeholder: 'username', toUrl: (h) => asIs(h, 'https://gitlab.com/') },
  { key: 'dribbble', label: 'Dribbble', logo: 'dribbble', color: 'EA4C89', placeholder: 'username', toUrl: (h) => asIs(h, 'https://dribbble.com/') },
  { key: 'behance', label: 'Behance', logo: 'behance', color: '1769FF', placeholder: 'username', toUrl: (h) => asIs(h, 'https://behance.net/') },
  { key: 'codepen', label: 'CodePen', logo: 'codepen', color: '000000', placeholder: 'username', toUrl: (h) => asIs(h, 'https://codepen.io/') },
  { key: 'twitch', label: 'Twitch', logo: 'twitch', color: '9146FF', placeholder: 'channel', toUrl: (h) => asIs(h, 'https://twitch.tv/') },
  { key: 'discord', label: 'Discord', logo: 'discord', color: '5865F2', placeholder: 'invite or tag', toUrl: (h) => asIs(h, 'https://discord.gg/') },
  { key: 'telegram', label: 'Telegram', logo: 'telegram', color: '26A5E4', placeholder: 'username', toUrl: (h) => asIs(h, 'https://t.me/') },
  { key: 'whatsapp', label: 'WhatsApp', logo: 'whatsapp', color: '25D366', placeholder: '15551234567', toUrl: (h) => asIs(h, 'https://wa.me/') },
  { key: 'facebook', label: 'Facebook', logo: 'facebook', color: '0866FF', placeholder: 'username', toUrl: (h) => asIs(h, 'https://facebook.com/') },
  { key: 'mastodon', label: 'Mastodon', logo: 'mastodon', color: '6364FF', placeholder: '@user@server', toUrl: (h) => (/^https?:\/\//i.test(h) ? h : 'https://mastodon.social/' + h.replace(/^@/, '')) },
  { key: 'threads', label: 'Threads', logo: 'threads', color: '000000', placeholder: '@username', toUrl: (h) => asIs(h, 'https://threads.net/@') },
  { key: 'bluesky', label: 'Bluesky', logo: 'bluesky', color: '0285FF', placeholder: 'handle.bsky.social', toUrl: (h) => asIs(h, 'https://bsky.app/profile/') },
  { key: 'reddit', label: 'Reddit', logo: 'reddit', color: 'FF4500', placeholder: 'username', toUrl: (h) => asIs(h, 'https://reddit.com/user/') },
  { key: 'tiktok', label: 'TikTok', logo: 'tiktok', color: '000000', placeholder: '@username', toUrl: (h) => asIs(h, 'https://tiktok.com/@') },
  { key: 'pinterest', label: 'Pinterest', logo: 'pinterest', color: 'BD081C', placeholder: 'username', toUrl: (h) => asIs(h, 'https://pinterest.com/') },
  { key: 'email', label: 'Email', logo: 'gmail', color: 'EA4335', placeholder: 'you@gmail.com', toUrl: (h) => (/^mailto:/.test(h) ? h : 'mailto:' + h) },
  { key: 'website', label: 'Website', logo: 'googlechrome', color: '4285F4', placeholder: 'https://you.dev', toUrl: (h) => (/^https?:\/\//i.test(h) ? h : 'https://' + h) },
]

export function socialDef(key: keyof Socials): SocialDef {
  return SOCIALS.find((s) => s.key === key)!
}
