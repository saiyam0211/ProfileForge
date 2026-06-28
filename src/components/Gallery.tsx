import { useMemo, useRef, useState } from 'react'
import type { ProfileConfig } from '../types'
import { TEMPLATES } from '../lib/templates'
import { themeById } from '../lib/themes'
import CardPreview from './CardPreview'
import BorderGlow from './BorderGlow'
import VariableProximity from './VariableProximity'
import SideRays from './SideRays'
import { REPO_URL, formatCount } from '../lib/site'

const TAGS = ['all', 'popular', 'clean', 'professional', 'funky', 'animated', 'games', 'recruiter', 'data'] as const

// hex (no #) → "H S L" string for BorderGlow's glowColor
function hexToHsl(hex: string): string {
  const m = hex.replace('#', '')
  const r = parseInt(m.slice(0, 2), 16) / 255
  const g = parseInt(m.slice(2, 4), 16) / 255
  const b = parseInt(m.slice(4, 6), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  const l = (max + min) / 2
  const d = max - min
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h *= 60
    if (h < 0) h += 360
  }
  // lift lightness so the glow reads on a dark card
  const ll = Math.min(Math.max(l * 100, 55), 75)
  return `${Math.round(h)} ${Math.round(Math.max(s * 100, 60))} ${Math.round(ll)}`
}

export default function Gallery({
  config,
  onPick,
  activeTpl,
  onScratch,
  onUsername,
  stars,
}: {
  config: ProfileConfig
  onPick: (id: string) => void
  activeTpl: string
  onScratch: () => void
  onUsername: (v: string) => void
  stars?: number | null
}) {
  const [filter, setFilter] = useState<(typeof TAGS)[number]>('all')
  const heroRef = useRef<HTMLDivElement>(null)

  const list = useMemo(
    () => (filter === 'all' ? TEMPLATES : TEMPLATES.filter((t) => t.tags.includes(filter))),
    [filter],
  )

  return (
    <>
      {/* fixed animated background rays, themed to the platform palette */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <SideRays origin="top-right" rayColor1="#7ee787" rayColor2="#58a6ff" speed={1.6} intensity={1.1} spread={1.7} tilt={0} saturation={1.3} blend={0.62} falloff={2.3} opacity={0.5} />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0">
        <SideRays origin="top-left" rayColor1="#d2a8ff" rayColor2="#58a6ff" speed={1.3} intensity={0.9} spread={1.6} tilt={0} saturation={1.2} blend={0.7} falloff={2.4} opacity={0.4} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-2xl text-center">
        <div ref={heroRef} style={{ position: 'relative' }} className="inline-block">
          <VariableProximity
            label="Forge a legendary GitHub profile"
            className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl"
            fromFontVariationSettings="'wght' 500, 'opsz' 12"
            toFontVariationSettings="'wght' 1000, 'opsz' 60"
            containerRef={heroRef}
            radius={120}
            falloff="linear"
          />
        </div>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/60 sm:text-base">
          Pick a template, tweak it, copy the README. Snake, Pac-Man, 3D graphs, trophies, streaks,
          stat cards — all wired up and ready.
        </p>
      </div>

      <div className="mx-auto mt-7 flex max-w-md items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 focus-within:border-emerald-400/50">
        <span className="select-none font-mono text-sm text-white/40">github.com/</span>
        <input
          autoFocus
          value={config.username}
          onChange={(e) => onUsername(e.target.value.replace(/\s/g, ''))}
          placeholder="your-username"
          className="min-w-0 flex-1 bg-transparent font-mono text-sm text-emerald-300 outline-none placeholder:text-white/30"
        />
      </div>

      <div className="mx-auto mt-3 flex max-w-md items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-[11px] uppercase tracking-wide text-white/30">or</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <button
        onClick={onScratch}
        className="group mx-auto mt-3 flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2.5 text-sm font-semibold text-emerald-100 transition hover:-translate-y-0.5 hover:bg-emerald-400/20"
      >
        <span className="text-lg transition group-hover:rotate-12">🧩</span>
        Build from scratch
        <span className="text-emerald-300/70">— drag &amp; drop blocks</span>
      </button>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {TAGS.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`rounded-full border px-3 py-1 text-xs capitalize transition ${
              filter === t
                ? 'border-emerald-400/40 bg-emerald-400/15 text-emerald-200'
                : 'border-white/10 text-white/55 hover:border-white/25 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((tpl, i) => {
          const applied = tpl.apply(config)
          const th = themeById(applied.theme)
          const active = activeTpl === tpl.id
          // gallery cards show a sample persona (neutral octocat handle for live stats)
          const d = tpl.demo
          const demoCfg = {
            ...applied,
            username: 'octocat',
            name: d.name,
            tagline: d.tagline,
            typingLines: d.typingLines,
            currentWork: d.currentWork,
            learning: d.learning,
            collab: '',
            ask: d.ask,
            funFact: d.funFact,
            location: d.location,
            company: '',
            skills: d.skills,
            socials: { github: 'octocat', linkedin: 'in/octocat', twitter: 'octocat' },
          }
          const accent = `#${applied.accent}`
          return (
            <button
              key={tpl.id}
              onClick={() => onPick(tpl.id)}
              style={{ animationDelay: `${i * 25}ms` }}
              className="pop-in group block w-full text-left"
            >
              <BorderGlow
                className={active ? 'ring-2 ring-emerald-400/60' : ''}
                backgroundColor="#0a0b10"
                borderRadius={16}
                edgeSensitivity={26}
                glowColor={hexToHsl(applied.accent)}
                glowRadius={32}
                glowIntensity={2.1}
                coneSpread={24}
                colors={[accent, '#58a6ff', '#d2a8ff']}
              >
                {/* real rendered README preview, scaled to fit */}
                <div className="relative w-full border-b border-white/10 bg-[#0d1117]">
                  <CardPreview config={demoCfg} />
                  <div className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full border border-white/10 bg-black/55 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-white/55 backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    live
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
                    <h3 className="truncate text-[15px] font-semibold tracking-tight text-white">{tpl.name}</h3>
                    <span className="ml-auto shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-white/40">{th.label}</span>
                  </div>
                  <p className="mt-1 truncate text-[11px] font-medium" style={{ color: accent }}>{tpl.vibe}</p>

                  <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-white/50">{tpl.blurb}</p>

                  <div className="mt-3.5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {tpl.tags.slice(0, 3).map((t) => (
                        <span key={t} className="rounded-md border border-white/10 px-2 py-0.5 text-[10px] font-medium text-white/45">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span
                      className="flex -translate-x-1 items-center gap-1 text-[11px] font-semibold opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      style={{ color: accent }}
                    >
                      Use
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </BorderGlow>
            </button>
          )
        })}
      </div>

      {/* support footer */}
      <footer className="mt-16 border-t border-white/10 pt-10 pb-12 text-center">
        <h3 className="text-lg font-bold text-white">Enjoying ProfileForge?</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-white/55">
          It's free and open source. If it helped you craft a standout profile, drop a star on GitHub — it genuinely keeps the project going.
        </p>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="group mt-5 inline-flex items-center gap-2 rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-2.5 text-sm font-semibold text-amber-200 transition hover:-translate-y-0.5 hover:border-amber-400/50 hover:bg-amber-400/20"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="transition group-hover:scale-110">
            <path d="M12 2.5l2.95 5.98 6.6.96-4.77 4.65 1.13 6.56L12 17.98 6.09 21.6l1.13-6.56L2.45 9.44l6.6-.96L12 2.5z" />
          </svg>
          Star on GitHub
          {stars != null && (
            <span className="rounded-md bg-amber-400/20 px-1.5 py-0.5 text-xs tabular-nums text-amber-100">{formatCount(stars)}</span>
          )}
        </a>
        <p className="mt-6 text-xs text-white/30">
          Made with care ·{' '}
          <a href={REPO_URL} target="_blank" rel="noreferrer" className="text-white/45 hover:text-white/70">
            ProfileForge
          </a>
        </p>
      </footer>
      </div>
    </>
  )
}
