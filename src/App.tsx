import { useEffect, useMemo, useState } from 'react'
import type { ProfileConfig, WidgetKey } from './types'
import { DEFAULT_CONFIG, SCRATCH_CONFIG, cloneConfig, DEFAULT_ORDER } from './lib/defaults'
import { REPO_URL, REPO_API, formatCount } from './lib/site'
import { generateReadme } from './lib/generate'
import { buildWorkflows } from './lib/workflows'
import { templateById } from './lib/templates'
import ClickSpark from './components/ClickSpark'
import Gallery from './components/Gallery'
import Editor from './components/Editor'
import Preview from './components/Preview'
import CodePanel from './components/CodePanel'
import WorkflowPanel from './components/WorkflowPanel'

type View = 'gallery' | 'editor'
type Tab = 'preview' | 'markdown' | 'actions'

export default function App() {
  const [config, setConfig] = useState<ProfileConfig>(DEFAULT_CONFIG)
  const [view, setView] = useState<View>('gallery')
  const [tab, setTab] = useState<Tab>('preview')
  const [activeTpl, setActiveTpl] = useState<string>('')
  const [previewMode, setPreviewMode] = useState<'dark' | 'light'>('dark')
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    fetch(REPO_API)
      .then((r) => r.json())
      .then((d) => {
        if (typeof d?.stargazers_count === 'number') setStars(d.stargazers_count)
      })
      .catch(() => {})
  }, [])

  const gen = useMemo(() => generateReadme(config), [config])
  const workflows = useMemo(() => buildWorkflows(gen, config.options.blogFeed), [gen, config.options.blogFeed])

  function pickTemplate(id: string) {
    const tpl = templateById(id)
    if (!tpl) return
    setConfig((c) => tpl.apply(c))
    setActiveTpl(id)
    setView('editor')
    setTab('preview')
  }

  function startScratch() {
    setConfig((c) => ({ ...cloneConfig(SCRATCH_CONFIG), username: c.username, name: c.name, socials: c.socials, skills: c.skills }))
    setActiveTpl('scratch')
    setView('editor')
    setTab('preview')
  }

  const setUsername = (v: string) => setConfig((c) => ({ ...c, username: v }))

  // preview drag-reorder → rebuild full order (enabled in new order, footer last, then disabled)
  const reorderFromPreview = (newKeys: WidgetKey[]) =>
    setConfig((p) => {
      const present = new Set<WidgetKey>(newKeys)
      const rest = p.order.filter((k) => !present.has(k) && k !== 'footer')
      const order = [...newKeys, 'footer' as WidgetKey, ...rest]
      for (const k of DEFAULT_ORDER) if (!order.includes(k)) order.push(k)
      return { ...p, order: order.filter((k, i, a) => a.indexOf(k) === i) }
    })

  const reorderSkills = (skills: string[]) => setConfig((p) => ({ ...p, skills }))

  // reorder stat cards in place (substitute the stat keys' slots with the new sequence)
  const reorderStats = (newKeys: WidgetKey[]) =>
    setConfig((p) => {
      const set = new Set<WidgetKey>(newKeys)
      let i = 0
      const order = p.order.map((k) => (set.has(k) ? newKeys[i++] : k))
      return { ...p, order }
    })

  return (
    <ClickSpark sparkColor="#7ee787" sparkSize={12} sparkRadius={20} sparkCount={8} duration={500}>
    <div className="flex h-[100dvh] flex-col overflow-hidden mesh-bg">
      <header className="relative z-30 flex h-16 shrink-0 items-center gap-3 border-b border-white/10 bg-[#08090d]/85 px-5 backdrop-blur-xl">
        <button onClick={() => setView('gallery')} className="text-[17px] font-extrabold tracking-tight text-white">
          ProfileForge
        </button>

        <div className="ml-auto flex items-center gap-2">
          {view === 'editor' && (
            <button
              onClick={() => setView('gallery')}
              className="flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-medium text-white/75 transition hover:border-white/20 hover:bg-white/10"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              Templates
            </button>
          )}
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="group flex h-9 items-center gap-1.5 rounded-lg border border-amber-400/30 bg-amber-400/10 pl-3 pr-2 text-sm font-semibold text-amber-200 transition hover:border-amber-400/50 hover:bg-amber-400/20"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="transition group-hover:scale-110">
              <path d="M12 2.5l2.95 5.98 6.6.96-4.77 4.65 1.13 6.56L12 17.98 6.09 21.6l1.13-6.56L2.45 9.44l6.6-.96L12 2.5z" />
            </svg>
            <span className="hidden sm:inline">Star</span>
            <span className="rounded-md bg-amber-400/20 px-1.5 py-0.5 text-xs tabular-nums text-amber-100">
              {stars === null ? '☆' : formatCount(stars)}
            </span>
          </a>
        </div>

        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
      </header>

      {view === 'gallery' ? (
        <div className="min-h-0 flex-1 overflow-y-auto">
          <Gallery config={config} onPick={pickTemplate} activeTpl={activeTpl} onScratch={startScratch} onUsername={setUsername} stars={stars} />
        </div>
      ) : (
        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
          {/* LEFT — fixed controls pane, scrolls internally */}
          <aside className="w-full shrink-0 border-b border-white/10 bg-[#0a0b10] lg:w-[440px] lg:border-b-0 lg:border-r">
            <Editor config={config} setConfig={setConfig} activeTpl={activeTpl} onFinish={() => setTab('markdown')} />
          </aside>

          {/* RIGHT — preview / markdown / actions, scrolls internally */}
          <section className="flex min-h-0 flex-1 flex-col lg:overflow-hidden">
            <div className="flex shrink-0 items-center gap-2 border-b border-white/10 bg-[#0d1117]/60 px-4 py-2.5 backdrop-blur">
              <div className="flex rounded-lg border border-white/10 bg-white/5 p-0.5 text-sm">
                {(['preview', 'markdown', 'actions'] as Tab[]).map((t) => {
                  const disabled = t === 'actions' && workflows.length === 0
                  return (
                    <button
                      key={t}
                      disabled={disabled}
                      onClick={() => setTab(t)}
                      className={`rounded-md px-3 py-1 capitalize transition ${
                        tab === t ? 'bg-white/15 text-white' : 'text-white/55 hover:text-white'
                      } ${disabled ? 'cursor-not-allowed opacity-30' : ''}`}
                    >
                      {t === 'actions' ? `Actions${workflows.length ? ` (${workflows.length})` : ''}` : t}
                    </button>
                  )
                })}
              </div>
              {tab === 'preview' && (
                <div className="ml-auto flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-0.5 text-xs">
                  <button onClick={() => setPreviewMode('dark')} className={`rounded-md px-2 py-1 transition ${previewMode === 'dark' ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white'}`} title="Dark preview">🌙 Dark</button>
                  <button onClick={() => setPreviewMode('light')} className={`rounded-md px-2 py-1 transition ${previewMode === 'light' ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white'}`} title="Light preview">☀️ Light</button>
                </div>
              )}
            </div>
            <div className={`min-h-0 flex-1 p-4 sm:p-6 lg:overflow-y-auto ${previewMode === 'light' ? 'bg-[#eaeef2]' : 'bg-[#0d1117]'}`}>
              {tab === 'preview' && <Preview gen={gen} config={config} onReorder={reorderFromPreview} onReorderSkills={reorderSkills} onReorderStats={reorderStats} mode={previewMode} />}
              {tab === 'markdown' && <CodePanel markdown={gen.markdown} username={config.username} />}
              {tab === 'actions' && <WorkflowPanel files={workflows} gen={gen} username={config.username} />}
            </div>
          </section>
        </main>
      )}
    </div>
    </ClickSpark>
  )
}
