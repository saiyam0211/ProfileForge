import { useState } from 'react'
import type { ProfileConfig, LangLayout, WidgetKey } from '../types'
import { THEMES, themeById } from '../lib/themes'
import { SKILLS, SKILL_CATS } from '../lib/skills'
import { SOCIALS } from '../lib/socials'
import { templateById } from '../lib/templates'
import { WIDGET_LABEL } from '../lib/widgetMeta'
import { SNAKE_VARIANTS, PACMAN_VARIANTS } from '../lib/widgets'
import { DEFAULT_HEADINGS } from '../lib/defaults'
import { headingOf } from '../lib/generate'
import WidgetThumb from './WidgetThumb'
import SectionBuilder from './SectionBuilder'

const HEADING_PRESETS = ['👨‍💻', '🧑‍🚀', '🚀', '🛠️', '⚙️', '📊', '📈', '🔥', '🏆', '🌐', '🔗', '💬', '🎮', '🐍', '👾', '🧊', '🎧', '✍️', '☕', '✨', '💡', '🎯']
import LineEditor from './LineEditor'

const GREETINGS = ["Hi 👋, I'm", "Hey, I'm", "Hello World! I'm", 'Yo! I’m', "Namaste 🙏, I'm", 'Greetings, I’m', 'Hi there, this is', '✨ I’m', "What's up! I'm", '(no greeting)']
const FONTS = ['Fira Code', 'JetBrains Mono', 'Poppins', 'Roboto', 'Ubuntu Mono', 'Source Code Pro', 'Pacifico']
const ALIGNS: Array<{ v: 'left' | 'center' | 'right'; label: string }> = [
  { v: 'left', label: '⬅ Left' },
  { v: 'center', label: '⬌ Center' },
  { v: 'right', label: '➡ Right' },
]
const STATS_METRICS: Array<{ k: string; label: string }> = [
  { k: 'stars', label: 'Stars' },
  { k: 'commits', label: 'Commits' },
  { k: 'prs', label: 'PRs' },
  { k: 'issues', label: 'Issues' },
  { k: 'contribs', label: 'Contributed to' },
]
const TROPHY_TITLES: Array<{ k: string; label: string }> = [
  { k: 'Stars', label: 'Stars' },
  { k: 'Commits', label: 'Commits' },
  { k: 'Followers', label: 'Followers' },
  { k: 'Issues', label: 'Issues' },
  { k: 'PullRequest', label: 'Pull Requests' },
  { k: 'Reviews', label: 'Reviews' },
  { k: 'Repositories', label: 'Repositories' },
  { k: 'Experience', label: 'Experience' },
  { k: 'MultipleLang', label: 'Languages' },
]
const CONTRIB3D_VARIANTS: Array<{ v: string; label: string }> = [
  { v: 'profile-night-rainbow', label: 'Night · Rainbow' },
  { v: 'profile-night-green', label: 'Night · Green' },
  { v: 'profile-night-view', label: 'Night · Blue' },
  { v: 'profile-season-animate', label: 'Seasonal (animated)' },
  { v: 'profile-green-animate', label: 'Green (animated)' },
  { v: 'profile-gitblock', label: 'Git Block' },
]

type Props = {
  config: ProfileConfig
  setConfig: React.Dispatch<React.SetStateAction<ProfileConfig>>
  activeTpl: string
  onFinish: () => void
}

const STEPS = [
  { id: 'basics', label: 'Basics', tip: 'Start with the basics' },
  { id: 'typing', label: 'Typing', tip: 'Want a typing animation?' },
  { id: 'about', label: 'About', tip: 'Add an “About me” section?' },
  { id: 'skills', label: 'Skills', tip: 'Show off your tech stack?' },
  { id: 'social', label: 'Social', tip: 'Social links & counters' },
  { id: 'widgets', label: 'Widgets', tip: 'Stats, graphs & fun widgets' },
  { id: 'finish', label: 'Finish', tip: 'Theme, footer & export' },
] as const

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/40">{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-[#010409] px-3 py-2 text-sm outline-none focus:border-emerald-400/50"
      />
    </label>
  )
}

function Switch({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      role="switch"
      aria-checked={on}
      className={`relative h-5 w-9 shrink-0 rounded-full transition ${on ? 'bg-emerald-400' : 'bg-white/15'}`}
    >
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${on ? 'left-[18px]' : 'left-0.5'}`} />
    </button>
  )
}

function FeatureCard({
  widget,
  accent,
  on,
  onToggle,
  children,
}: {
  widget: WidgetKey
  accent: string
  on: boolean
  onToggle: (v: boolean) => void
  children?: React.ReactNode
}) {
  const m = WIDGET_LABEL[widget]
  return (
    <div className={`rounded-xl border p-3 transition ${on ? 'border-emerald-400/40 bg-emerald-400/[0.06]' : 'border-white/10 bg-white/[0.02]'}`}>
      <div className="flex gap-3">
        <div className="w-28 shrink-0">
          <WidgetThumb widget={widget} accent={accent} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span>{m.emoji}</span>
            <span className="truncate text-sm font-semibold">{m.label}</span>
            {m.hint && <span className="rounded bg-amber-400/15 px-1.5 py-0.5 text-[9px] text-amber-200">needs Action</span>}
            <div className="ml-auto">
              <Switch on={on} onChange={onToggle} />
            </div>
          </div>
          <p className="mt-1 text-[11px] leading-snug text-white/50">{m.desc}</p>
        </div>
      </div>
      {on && children && <div className="mt-3 border-t border-white/10 pt-3">{children}</div>}
    </div>
  )
}

export default function Editor({ config, setConfig, activeTpl, onFinish }: Props) {
  const [step, setStep] = useState(0)
  const c = config
  const set = (patch: Partial<ProfileConfig>) => setConfig((p) => ({ ...p, ...patch }))
  const setOpt = (patch: Partial<ProfileConfig['options']>) => setConfig((p) => ({ ...p, options: { ...p.options, ...patch } }))
  const setSocial = (k: string, v: string) => setConfig((p) => ({ ...p, socials: { ...p.socials, [k]: v } }))
  const toggleSkill = (id: string) =>
    setConfig((p) => ({ ...p, skills: p.skills.includes(id) ? p.skills.filter((s) => s !== id) : [...p.skills, id] }))
  const reorder = (enabled: WidgetKey[]) => setConfig((p) => ({ ...p, order: [...enabled, ...p.order.filter((k) => !p.widgets[k])] }))

  // enable/disable a widget while preserving order
  const setWidgetOn = (k: WidgetKey, on: boolean) =>
    setConfig((p) => {
      if (on === p.widgets[k]) return p
      if (on) {
        const en = p.order.filter((x) => p.widgets[x])
        const rest = p.order.filter((x) => !p.widgets[x] && x !== k)
        return { ...p, widgets: { ...p.widgets, [k]: true }, order: [...en, k, ...rest] }
      }
      return { ...p, widgets: { ...p.widgets, [k]: false } }
    })
  const addWidget = (k: WidgetKey) => setWidgetOn(k, true)
  const removeWidget = (k: WidgetKey) => setWidgetOn(k, false)
  const setHeading = (key: string, patch: Partial<{ icon: string; title: string }>) =>
    setConfig((p) => ({ ...p, headings: { ...p.headings, [key]: { ...headingOf(p, key), ...patch } } }))

  const tpl = templateById(activeTpl)
  const enabledCount = c.order.filter((k) => c.widgets[k]).length
  const last = step === STEPS.length - 1
  const pct = ((step + 1) / STEPS.length) * 100
  const fc = (w: WidgetKey, children?: React.ReactNode) => (
    <FeatureCard widget={w} accent={c.accent} on={c.widgets[w]} onToggle={(v) => setWidgetOn(w, v)}>
      {children}
    </FeatureCard>
  )

  return (
    <div className="flex h-full flex-col">
      {/* fixed header: template badge + stepper */}
      <div className="shrink-0 space-y-2.5 border-b border-white/10 p-3">
        <div className="flex items-center gap-2.5 text-sm">
          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[12px] font-bold text-white ring-1 ring-white/15"
            style={{ background: `linear-gradient(135deg, #${c.accent}, #${c.accent}55)`, boxShadow: `0 5px 16px #${c.accent}33` }}
          >
            {(tpl ? tpl.name : 'Custom').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()}
          </span>
          <div className="leading-tight">
            <div className="font-semibold">{tpl ? tpl.name : 'Built from scratch'}</div>
            <div className="text-[11px] text-white/45">{tpl ? tpl.vibe : 'Your custom layout'}</div>
          </div>
          <span className="ml-auto text-[11px] text-white/35">Step {step + 1} / {STEPS.length}</span>
        </div>

        <div className="flex items-center gap-0.5">
          {STEPS.map((s, i) => {
            const active = i === step
            const done = i < step
            return (
              <button key={s.id} onClick={() => setStep(i)} className={`flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 transition ${active ? 'bg-emerald-400/15' : 'hover:bg-white/5'}`}>
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold transition ${active ? 'bg-emerald-400 text-black' : done ? 'bg-emerald-400/25 text-emerald-200' : 'bg-white/10 text-white/50'}`}>
                  {done ? '✓' : i + 1}
                </span>
                <span className={`text-[9px] font-medium ${active ? 'text-emerald-100' : 'text-white/45'}`}>{s.label}</span>
              </button>
            )
          })}
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-white/5">
          <div className="h-full rounded-full bg-emerald-400 transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* scrolling body */}
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
        <h3 className="text-lg font-bold">{STEPS[step].tip}</h3>

        {/* 1 — BASICS */}
        {step === 0 && (
          <div className="space-y-3">
            <p className="text-xs text-white/45">Your name becomes a “Hi 👋, I’m …” heading at the top of your profile (always shown).</p>
            <Field label="GitHub username" value={c.username} onChange={(v) => set({ username: v.replace(/\s/g, '') })} placeholder="octocat" />
            <Field label="Display name" value={c.name} onChange={(v) => set({ name: v })} placeholder="Jane Doe" />
            <Field label="Tagline / role" value={c.tagline} onChange={(v) => set({ tagline: v })} placeholder="Full-Stack Developer" />
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/40">Greeting</span>
                <select
                  value={GREETINGS.includes(c.options.greeting) ? c.options.greeting : c.options.greeting === '' ? '(no greeting)' : c.options.greeting}
                  onChange={(e) => setOpt({ greeting: e.target.value === '(no greeting)' ? '' : e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-[#010409] px-2 py-2 text-sm outline-none focus:border-emerald-400/50"
                >
                  {GREETINGS.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/40">Alignment</span>
                <select value={c.options.align} onChange={(e) => setOpt({ align: e.target.value as 'left' | 'center' | 'right' })} className="w-full rounded-lg border border-white/10 bg-[#010409] px-2 py-2 text-sm outline-none focus:border-emerald-400/50">
                  {ALIGNS.map((a) => (
                    <option key={a.v} value={a.v}>{a.label}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2">
              <WidgetThumb widget="intro" accent={c.accent} />
            </div>
          </div>
        )}

        {/* 2 — TYPING */}
        {step === 1 &&
          fc(
            'typing',
            <div className="space-y-3">
              <div>
                <span className="mb-1.5 block text-[11px] uppercase tracking-wide text-white/40">Lines to type — drag to reorder</span>
                <LineEditor lines={c.typingLines} onChange={(lines) => set({ typingLines: lines })} placeholder="Full-Stack Developer 💻" />
                <span className="mt-1 block text-[11px] text-white/35">Each line types out then deletes, cycling through in order.</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <label className="space-y-1">
                  <span className="block text-white/40">Alignment</span>
                  <select value={c.options.typingAlign} onChange={(e) => setOpt({ typingAlign: e.target.value as 'left' | 'center' | 'right' })} className="w-full rounded-lg border border-white/10 bg-[#010409] px-2 py-1.5 outline-none">
                    {ALIGNS.map((a) => <option key={a.v} value={a.v}>{a.label}</option>)}
                  </select>
                </label>
                <label className="space-y-1">
                  <span className="block text-white/40">Font</span>
                  <select value={c.options.typingFont} onChange={(e) => setOpt({ typingFont: e.target.value })} className="w-full rounded-lg border border-white/10 bg-[#010409] px-2 py-1.5 outline-none">
                    {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </label>
                <label className="space-y-1">
                  <span className="block text-white/40">Font size: {c.options.typingSize}px</span>
                  <input type="range" min={14} max={40} value={c.options.typingSize} onChange={(e) => setOpt({ typingSize: +e.target.value })} className="w-full accent-emerald-400" />
                </label>
                <label className="flex items-center gap-2 pt-4">
                  <span className="text-white/40">Color</span>
                  <input type="color" value={`#${c.options.typingColor}`} onChange={(e) => setOpt({ typingColor: e.target.value.replace('#', '') })} className="h-7 w-12 cursor-pointer rounded border border-white/10 bg-transparent" />
                  <button onClick={() => setOpt({ typingColor: c.accent })} className="text-emerald-300/80 hover:underline">use accent</button>
                </label>
              </div>
            </div>,
          )}

        {/* 3 — ABOUT */}
        {step === 2 &&
          fc(
            'about',
            <div className="space-y-2.5">
              <label className="block">
                <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/40">Bullet icons</span>
                <div className="flex gap-1.5">
                  {([
                    ['emoji', '🔭 Emoji'],
                    ['symbols', '🚀 Alt'],
                    ['minimal', '▹ Minimal'],
                    ['animated', '✨ Animated'],
                  ] as const).map(([v, label]) => (
                    <button key={v} onClick={() => setOpt({ aboutIconSet: v })} className={`flex-1 rounded-lg border px-2 py-1.5 text-xs transition ${c.options.aboutIconSet === v ? 'border-emerald-400/50 bg-emerald-400/15 text-emerald-100' : 'border-white/10 text-white/55 hover:border-white/25'}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </label>
              <Field label="Currently working on" value={c.currentWork} onChange={(v) => set({ currentWork: v })} placeholder="my portfolio site" />
              <Field label="Currently learning" value={c.learning} onChange={(v) => set({ learning: v })} placeholder="Rust, system design" />
              <Field label="Looking to collaborate on" value={c.collab} onChange={(v) => set({ collab: v })} placeholder="open source" />
              <Field label="Ask me about" value={c.ask} onChange={(v) => set({ ask: v })} placeholder="React, Node, TypeScript" />
              <Field label="Location" value={c.location} onChange={(v) => set({ location: v })} placeholder="India" />
              <Field label="Fun fact" value={c.funFact} onChange={(v) => set({ funFact: v })} placeholder="I love mechanical keyboards" />
            </div>,
          )}

        {/* 4 — SKILLS */}
        {step === 3 &&
          fc(
            'skills',
            <div>
              <label className="mb-2 flex items-center gap-2 text-xs text-white/55">
                Display as
                <select value={c.options.skillStyle} onChange={(e) => setOpt({ skillStyle: e.target.value as 'skillicons' | 'badges' })} className="rounded-lg border border-white/10 bg-[#010409] px-2 py-1 outline-none">
                  <option value="skillicons">Icon grid</option>
                  <option value="badges">Badges</option>
                </select>
                <span className="ml-auto text-white/35">{c.skills.length} selected</span>
              </label>
              {SKILL_CATS.map((cat) => (
                <div key={cat} className="mb-2.5">
                  <div className="mb-1.5 text-[11px] uppercase tracking-wide text-white/40">{cat}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {SKILLS.filter((s) => s.cat === cat).map((s) => {
                      const on = c.skills.includes(s.id)
                      return (
                        <button key={s.id} onClick={() => toggleSkill(s.id)} className={`rounded-lg border px-2 py-1 text-xs transition ${on ? 'border-emerald-400/50 bg-emerald-400/15 text-emerald-100' : 'border-white/10 text-white/55 hover:border-white/25'}`}>
                          {s.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>,
          )}

        {/* 5 — SOCIAL & COUNTERS */}
        {step === 4 && (
          <div className="space-y-3">
            {fc(
              'socialsBadges',
              <div className="space-y-2">
                <label className="mb-1 flex items-center gap-2 text-xs text-white/55">
                  Badge style
                  <select value={c.options.socialStyle} onChange={(e) => setOpt({ socialStyle: e.target.value as ProfileConfig['options']['socialStyle'] })} className="rounded-lg border border-white/10 bg-[#010409] px-2 py-1 outline-none">
                    <option value="for-the-badge">Bold (for-the-badge)</option>
                    <option value="flat">Flat</option>
                    <option value="flat-square">Flat square</option>
                    <option value="plastic">Plastic</option>
                    <option value="social">Social (small icon)</option>
                    <option value="icon">Icons only (no labels)</option>
                  </select>
                </label>
                <p className="text-[11px] text-white/40">Fill in any handles you have — empty ones are skipped.</p>
                {SOCIALS.map((s) => (
                  <div key={s.key}>
                    <Field label={s.label} value={(c.socials as Record<string, string>)[s.key] ?? ''} onChange={(v) => setSocial(s.key, v)} placeholder={s.placeholder} />
                    {s.key === 'website' && c.socials.website?.trim() && (
                      <div className="mt-2">
                        <Field label="Website button label" value={c.options.websiteTitle} onChange={(v) => setOpt({ websiteTitle: v })} placeholder="Portfolio" />
                      </div>
                    )}
                  </div>
                ))}
              </div>,
            )}

            {(c.widgets.visitors || c.widgets.followBadge) && (
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <div className="mb-2 text-sm font-bold text-white/80">Counter design</div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <label className="space-y-1">
                    <span className="block text-white/40">Style</span>
                    <select value={c.options.counterStyle} onChange={(e) => setOpt({ counterStyle: e.target.value as ProfileConfig['options']['counterStyle'] })} className="w-full rounded-lg border border-white/10 bg-[#010409] px-2 py-1.5 outline-none">
                      <option value="flat">Flat</option>
                      <option value="flat-square">Flat square</option>
                      <option value="plastic">Plastic</option>
                      <option value="for-the-badge">Bold</option>
                    </select>
                  </label>
                  <label className="flex items-center gap-2 pt-5">
                    <input type="checkbox" checked={c.options.countersInline} onChange={(e) => setOpt({ countersInline: e.target.checked })} className="accent-emerald-400" />
                    Place side by side
                  </label>
                </div>
              </div>
            )}
            {fc('visitors')}
            {fc('followBadge')}
          </div>
        )}

        {/* 6 — WIDGETS */}
        {step === 5 && (
          <div className="space-y-4">
            <div>
              <div className="mb-2 text-[11px] uppercase tracking-wider text-white/35">📊 Stats & graphs</div>
              <div className="space-y-2.5">
                {fc(
                  'stats',
                  <div className="space-y-2.5">
                    <label className="flex items-center gap-2 text-xs text-white/65">
                      <input type="checkbox" checked={c.options.statsInline} onChange={(e) => setOpt({ statsInline: e.target.checked })} className="accent-emerald-400" />
                      Place Stats / Streak / Languages side by side (max 2 per row)
                    </label>
                    <div>
                      <span className="mb-1.5 block text-[11px] uppercase tracking-wide text-white/40">Hide metrics</span>
                      <div className="flex flex-wrap gap-1.5">
                        {STATS_METRICS.map((m) => {
                          const hidden = c.options.statsHide.includes(m.k)
                          return (
                            <button
                              key={m.k}
                              onClick={() => setOpt({ statsHide: hidden ? c.options.statsHide.filter((x) => x !== m.k) : [...c.options.statsHide, m.k] })}
                              className={`rounded-lg border px-2 py-1 text-xs transition ${hidden ? 'border-white/10 text-white/35 line-through' : 'border-emerald-400/40 bg-emerald-400/10 text-emerald-100'}`}
                            >
                              {m.label}
                            </button>
                          )
                        })}
                      </div>
                      <span className="mt-1 block text-[11px] text-white/35">Green = shown · click to hide.</span>
                    </div>
                  </div>,
                )}
                {fc('streak')}
                {fc('topLangs')}
                {fc('activityGraph')}
                {fc(
                  'trophies',
                  <div>
                    <span className="mb-1.5 block text-[11px] uppercase tracking-wide text-white/40">Show only these (none = show all)</span>
                    <div className="flex flex-wrap gap-1.5">
                      {TROPHY_TITLES.map((t) => {
                        const on = c.options.trophyTitles.includes(t.k)
                        return (
                          <button
                            key={t.k}
                            onClick={() => setOpt({ trophyTitles: on ? c.options.trophyTitles.filter((x) => x !== t.k) : [...c.options.trophyTitles, t.k] })}
                            className={`rounded-lg border px-2 py-1 text-xs transition ${on ? 'border-emerald-400/50 bg-emerald-400/15 text-emerald-100' : 'border-white/10 text-white/55 hover:border-white/25'}`}
                          >
                            {t.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>,
                )}
              </div>
            </div>
            <div>
              <div className="mb-2 text-[11px] uppercase tracking-wider text-white/35">🎮 Animations & games</div>
              <div className="space-y-2.5">
                {fc(
                  'snake',
                  <label className="block text-xs text-white/55">
                    <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/40">Palette</span>
                    <select value={c.options.snakeVariant} onChange={(e) => setOpt({ snakeVariant: e.target.value })} className="w-full rounded-lg border border-white/10 bg-[#010409] px-2 py-1.5 outline-none">
                      {Object.entries(SNAKE_VARIANTS).map(([k, v]) => (
                        <option key={k} value={k}>{v.label}</option>
                      ))}
                    </select>
                  </label>,
                )}
                {fc(
                  'pacman',
                  <label className="block text-xs text-white/55">
                    <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/40">Game</span>
                    <select value={c.options.pacmanVariant} onChange={(e) => setOpt({ pacmanVariant: e.target.value })} className="w-full rounded-lg border border-white/10 bg-[#010409] px-2 py-1.5 outline-none">
                      {Object.entries(PACMAN_VARIANTS).map(([k, v]) => (
                        <option key={k} value={k}>{v.label}</option>
                      ))}
                    </select>
                  </label>,
                )}
                {fc(
                  'contrib3d',
                  <label className="block text-xs text-white/55">
                    <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/40">Style variant</span>
                    <select
                      value={c.options.contrib3dVariant}
                      onChange={(e) => setOpt({ contrib3dVariant: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-[#010409] px-2 py-1.5 outline-none"
                    >
                      {CONTRIB3D_VARIANTS.map((o) => (
                        <option key={o.v} value={o.v}>{o.label}</option>
                      ))}
                    </select>
                    <span className="mt-1.5 block text-[11px] leading-snug text-white/35">
                      The 3D image is one SVG rendered by the Action (3D bars + radar + languages + stars/forks baked in). Pick a style — individual parts can't be toggled.
                    </span>
                  </label>,
                )}
              </div>
            </div>
            <div>
              <div className="mb-2 text-[11px] uppercase tracking-wider text-white/35">✨ Extras</div>
              <div className="space-y-2.5">
                {fc(
                  'spotify',
                  <div className="space-y-2">
                    <Field label="Spotify user ID" value={c.options.spotifyUser} onChange={(v) => setOpt({ spotifyUser: v })} placeholder="e.g. 31abcdef..." />
                    <details className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-[11px] text-white/55">
                      <summary className="cursor-pointer font-medium text-emerald-300/80">Where do I find my Spotify UID?</summary>
                      <ol className="mt-2 list-decimal space-y-1 pl-4">
                        <li>Open Spotify → your profile → <b>… → Share → Copy link to profile</b>.</li>
                        <li>The link looks like <code>open.spotify.com/user/<b>31abc…</b>?si=…</code></li>
                        <li>Paste the part after <code>/user/</code> and before <code>?</code> — that’s your UID.</li>
                        <li>First time only: visit <code>spotify-github-profile.kittinanx.com</code> and connect Spotify so it can read your now-playing.</li>
                      </ol>
                    </details>
                  </div>,
                )}
                {fc('blog', <Field label="Blog RSS feed URL" value={c.options.blogFeed} onChange={(v) => setOpt({ blogFeed: v })} placeholder="https://dev.to/feed/you" />)}
                {fc('quote')}
                {fc('support', <Field label="Buy Me a Coffee username" value={c.options.buymeacoffee} onChange={(v) => setOpt({ buymeacoffee: v })} placeholder="yourname" />)}
              </div>
            </div>
          </div>
        )}

        {/* 7 — FINISH */}
        {step === 6 && (
          <div className="space-y-5">
            <div>
              <h4 className="mb-2 text-sm font-bold text-white/80">🎨 Theme</h4>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {THEMES.map((t) => {
                  const on = c.theme === t.id
                  return (
                    <button key={t.id} onClick={() => set({ theme: t.id, accent: t.accent })} className={`overflow-hidden rounded-lg border text-left transition ${on ? 'border-emerald-400/60 ring-1 ring-emerald-400/40' : 'border-white/10 hover:border-white/30'}`}>
                      <div className="flex h-8" style={{ background: t.swatch[0] === '00000000' ? '#222' : `#${t.swatch[0]}` }}>
                        <span className="m-auto text-[10px] font-bold" style={{ color: `#${t.swatch[1]}` }}>Aa</span>
                      </div>
                      <div className="truncate px-1.5 py-1 text-[10px] text-white/55">{t.label}</div>
                    </button>
                  )
                })}
              </div>
              <label className="mt-2 flex items-center gap-2 text-xs text-white/55">
                Accent
                <input type="color" value={`#${c.accent}`} onChange={(e) => set({ accent: e.target.value.replace('#', '') })} className="h-7 w-12 cursor-pointer rounded border border-white/10 bg-transparent" />
                <button onClick={() => set({ accent: themeById(c.theme).accent })} className="text-emerald-300/80 hover:underline">reset to theme</button>
              </label>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-bold text-white/80">⚙️ Layout options</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <label className="space-y-1">
                  <span className="block text-white/40">Alignment</span>
                  <select value={c.options.align} onChange={(e) => setOpt({ align: e.target.value as 'center' | 'left' })} className="w-full rounded-lg border border-white/10 bg-[#010409] px-2 py-1.5 outline-none">
                    <option value="center">Center</option>
                    <option value="left">Left</option>
                  </select>
                </label>
                <label className="space-y-1">
                  <span className="block text-white/40">Language layout</span>
                  <select value={c.options.langLayout} onChange={(e) => setOpt({ langLayout: e.target.value as LangLayout })} className="w-full rounded-lg border border-white/10 bg-[#010409] px-2 py-1.5 outline-none">
                    <option value="compact">Compact</option>
                    <option value="normal">Normal</option>
                    <option value="donut">Donut</option>
                    <option value="donut-vertical">Donut vertical</option>
                    <option value="pie">Pie</option>
                  </select>
                </label>
              </div>
              <label className="mt-2 flex items-center gap-2 text-xs text-white/65">
                <input type="checkbox" checked={c.options.dividers} onChange={(e) => setOpt({ dividers: e.target.checked })} className="accent-emerald-400" />
                Show divider lines between sections
              </label>
              <label className="mt-1.5 flex items-center gap-2 text-xs text-white/65">
                <input type="checkbox" checked={c.options.statsInline} onChange={(e) => setOpt({ statsInline: e.target.checked })} className="accent-emerald-400" />
                Stat cards side by side (2 per row) · drag to reorder in preview
              </label>
              <label className="mt-1.5 flex items-center gap-2 text-xs text-white/65">
                <input type="checkbox" checked={c.options.countersInline} onChange={(e) => setOpt({ countersInline: e.target.checked })} className="accent-emerald-400" />
                View &amp; follower counters side by side
              </label>
            </div>

            <div>
              <h4 className="mb-1 text-sm font-bold text-white/80">🏷️ Section headings</h4>
              <p className="mb-2 text-[11px] text-white/40">Change the icon (pick a preset, paste any emoji, or remove it) and the title for each section.</p>
              <div className="space-y-3">
                {Object.keys(DEFAULT_HEADINGS)
                  .filter((k) => c.widgets[k as WidgetKey])
                  .map((k) => {
                    const h = headingOf(c, k)
                    return (
                      <div key={k} className="rounded-lg border border-white/10 bg-white/[0.02] p-2.5">
                        <div className="mb-1.5 flex items-center gap-2">
                          <input
                            value={h.icon}
                            onChange={(e) => setHeading(k, { icon: e.target.value })}
                            placeholder="—"
                            className="w-10 rounded-md border border-white/10 bg-[#010409] py-1 text-center text-base outline-none focus:border-emerald-400/50"
                          />
                          <input
                            value={h.title}
                            onChange={(e) => setHeading(k, { title: e.target.value })}
                            className="flex-1 rounded-md border border-white/10 bg-[#010409] px-2 py-1 text-sm outline-none focus:border-emerald-400/50"
                          />
                          <button onClick={() => setHeading(k, { icon: '' })} className="rounded-md border border-white/10 px-2 py-1 text-[11px] text-white/50 hover:bg-white/10" title="No icon">
                            none
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {HEADING_PRESETS.map((emo) => (
                            <button key={emo} onClick={() => setHeading(k, { icon: emo })} className={`rounded px-1.5 py-0.5 text-sm transition hover:bg-white/10 ${h.icon === emo ? 'bg-emerald-400/20 ring-1 ring-emerald-400/40' : ''}`}>
                              {emo}
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-bold text-white/80">↕️ Arrange your sections</h4>
              <SectionBuilder order={c.order} widgets={c.widgets} onReorder={reorder} onAdd={addWidget} onRemove={removeWidget} />
            </div>

            {fc('footer')}
          </div>
        )}
      </div>

      {/* fixed footer nav */}
      <div className="flex shrink-0 items-center gap-2 border-t border-white/10 bg-[#0a0b10] p-3">
        <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30">
          ← Back
        </button>
        <div className="flex-1 text-center text-[11px] text-white/35">{enabledCount} sections added</div>
        {last ? (
          <button onClick={onFinish} className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-bold text-black transition hover:bg-emerald-300">Get README →</button>
        ) : (
          <button onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))} className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-bold text-black transition hover:bg-emerald-300">Next →</button>
        )}
      </div>
    </div>
  )
}
