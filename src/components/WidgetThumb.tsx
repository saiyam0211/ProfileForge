import type { WidgetKey } from '../types'

// Tiny network-free CSS mock of each widget so users see what they're adding.
export default function WidgetThumb({ widget, accent = '7ee787' }: { widget: WidgetKey; accent?: string }) {
  const a = `#${accent}`
  const wrap = 'flex h-[72px] w-full items-center justify-center overflow-hidden rounded-lg bg-[#0d1117] p-2'
  const bar = (w: string, c = 'rgba(255,255,255,.18)') => <span className="block h-[3px] rounded-full" style={{ width: w, background: c }} />

  const grid = (mode: 'flat' | 'pac' | '3d') => (
    <div className="relative flex items-center justify-center" style={{ perspective: mode === '3d' ? 300 : undefined }}>
      <div className="grid gap-[2px]" style={{ gridTemplateColumns: 'repeat(16, 4px)', transform: mode === '3d' ? 'rotateX(54deg) rotateZ(44deg)' : undefined }}>
        {Array.from({ length: 16 * 5 }).map((_, i) => {
          const lvl = (i * 7) % 5
          return <span key={i} className="h-[4px] w-[4px] rounded-[1px]" style={{ background: a, opacity: lvl === 0 ? 0.14 : 0.3 + lvl * 0.16 }} />
        })}
      </div>
      {mode === 'pac' && <span className="absolute left-1 h-[9px] w-[9px] rounded-full" style={{ background: '#ffe44d', clipPath: 'polygon(100% 25%, 45% 50%, 100% 75%, 50% 100%, 0 50%, 50% 0)' }} />}
    </div>
  )

  let inner: React.ReactNode = null
  switch (widget) {
    case 'typing':
      inner = (
        <div className="rounded px-2 py-1 font-mono text-[10px] font-bold" style={{ background: '#00000040', color: a }}>
          Full-Stack Dev<span style={{ color: a }}>▌</span>
        </div>
      )
      break
    case 'intro':
      inner = (
        <div className="text-center">
          <div className="text-[12px] font-extrabold text-white">Hi 👋 I'm You</div>
          <div className="mt-0.5 text-[8px] text-white/50">Software Developer</div>
        </div>
      )
      break
    case 'about':
      inner = (
        <div className="w-full space-y-1.5 px-2">
          <div className="flex items-center gap-1.5 text-[8px] text-white/60">🔭 {bar('60%')}</div>
          <div className="flex items-center gap-1.5 text-[8px] text-white/60">🌱 {bar('45%')}</div>
          <div className="flex items-center gap-1.5 text-[8px] text-white/60">⚡ {bar('70%')}</div>
        </div>
      )
      break
    case 'skills':
      inner = (
        <div className="flex flex-wrap justify-center gap-1">
          {['#3178C6', '#61DAFB', '#5FA04E', '#F7DF1E', '#06B6D4', '#E34F26', '#2496ED'].map((c, i) => (
            <span key={i} className="h-4 w-4 rounded" style={{ background: c }} />
          ))}
        </div>
      )
      break
    case 'socialsBadges':
      inner = (
        <div className="flex flex-wrap justify-center gap-1">
          {['#0A66C2', '#000', '#FF0000', '#E4405F'].map((c, i) => (
            <span key={i} className="h-[10px] w-7 rounded-[2px]" style={{ background: c }} />
          ))}
        </div>
      )
      break
    case 'visitors':
      inner = <span className="rounded-[3px] bg-[#555] px-2 py-1 text-[8px] font-bold text-white">👁 Profile views <span className="rounded-sm px-1" style={{ background: a, color: '#000' }}>1,234</span></span>
      break
    case 'followBadge':
      inner = <span className="rounded-[3px] bg-[#222] px-2 py-1 text-[8px] font-bold text-white">⊙ Follow <span className="text-white/60">@you</span> · 42</span>
      break
    case 'stats':
      inner = (
        <div className="flex w-full items-center gap-2 rounded-md border border-white/10 px-2 py-1.5">
          <div className="flex-1 space-y-1">{bar('80%', a)}{bar('60%', a)}{bar('45%', a)}</div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-bold" style={{ border: `2px solid ${a}`, color: 'white' }}>A+</div>
        </div>
      )
      break
    case 'streak':
      inner = (
        <div className="flex items-center gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="flex h-7 w-7 items-center justify-center rounded-full text-[8px] font-bold text-white" style={{ border: `2px solid ${i === 1 ? a : 'rgba(255,255,255,.2)'}` }}>{[58, 30, 90][i]}</div>
            </div>
          ))}
        </div>
      )
      break
    case 'topLangs':
      inner = (
        <div className="w-full px-2">
          <div className="flex h-2 w-full overflow-hidden rounded-full">
            {['#3178C6', '#F7DF1E', '#61DAFB', '#E34F26', '#5FA04E'].map((c, i) => (
              <span key={i} style={{ background: c, width: `${[34, 26, 18, 14, 8][i]}%` }} />
            ))}
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {['TS', 'JS', 'Py'].map((l, i) => (
              <span key={i} className="text-[7px] text-white/50">● {l}</span>
            ))}
          </div>
        </div>
      )
      break
    case 'activityGraph':
      inner = (
        <svg viewBox="0 0 120 40" className="w-full" preserveAspectRatio="none">
          <polygon points="0,40 0,28 20,18 40,22 60,10 80,16 100,6 120,12 120,40" fill={a} opacity="0.18" />
          <polyline points="0,28 20,18 40,22 60,10 80,16 100,6 120,12" fill="none" stroke={a} strokeWidth="1.5" />
        </svg>
      )
      break
    case 'trophies':
      inner = (
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="flex h-8 w-8 flex-col items-center justify-center rounded border text-[9px]" style={{ borderColor: a + '66', color: a }}>
              🏆<span className="text-[5px] text-white/40">A+</span>
            </span>
          ))}
        </div>
      )
      break
    case 'snake':
      inner = grid('flat')
      break
    case 'pacman':
      inner = grid('pac')
      break
    case 'contrib3d':
      inner = grid('3d')
      break
    case 'quote':
      inner = (
        <div className="w-full px-3 text-center italic">
          <div className="text-[8px] text-white/55">“Talk is cheap. Show me the code.”</div>
          <div className="mt-1 text-[7px]" style={{ color: a }}>— Linus Torvalds</div>
        </div>
      )
      break
    case 'spotify':
      inner = (
        <div className="flex w-full items-center gap-2 rounded-md border border-white/10 px-2 py-1.5">
          <span className="h-7 w-7 rounded" style={{ background: 'linear-gradient(135deg,#1DB954,#1a1a1a)' }} />
          <div className="flex-1 space-y-1">{bar('70%')}{bar('45%')}<span className="text-[7px] text-[#1DB954]">▶ Now playing</span></div>
        </div>
      )
      break
    case 'blog':
      inner = (
        <div className="w-full space-y-1.5 px-2">
          {['85%', '70%', '78%'].map((w, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[8px] text-white/50">📝 {bar(w, a + '99')}</div>
          ))}
        </div>
      )
      break
    case 'banner':
      inner = <div className="flex h-12 w-full items-center justify-center rounded" style={{ background: `linear-gradient(120deg, ${a}33, #ffffff10)` }}><span className="text-[9px] text-white/40">🖼️ cover image</span></div>
      break
    case 'support':
      inner = <span className="rounded-md px-3 py-1.5 text-[9px] font-bold text-black" style={{ background: '#FFDD00' }}>☕ Buy me a coffee</span>
      break
    case 'footer':
      inner = <div className="text-[8px] text-white/40">⭐ From @you · Generated with ProfileForge</div>
      break
    default:
      inner = <div className="text-[9px] text-white/40">preview</div>
  }

  return <div className={wrap}>{inner}</div>
}
