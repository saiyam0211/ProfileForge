import { useState } from 'react'

function useCopy() {
  const [copied, setCopied] = useState(false)
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }
  return { copied, copy }
}

function download(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
  URL.revokeObjectURL(a.href)
}

export default function CodePanel({ markdown, username }: { markdown: string; username: string }) {
  const { copied, copy } = useCopy()
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="font-mono text-sm text-white/70">README.md</span>
        <span className="rounded bg-white/5 px-2 py-0.5 text-[11px] text-white/40">
          → push to <b className="text-emerald-300/80">{username || 'username'}/{username || 'username'}</b>
        </span>
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => copy(markdown)}
            className="rounded-lg bg-emerald-400/90 px-3 py-1.5 text-sm font-semibold text-black transition hover:bg-emerald-300"
          >
            {copied ? '✓ Copied!' : 'Copy markdown'}
          </button>
          <button
            onClick={() => download('README.md', markdown)}
            className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10"
          >
            Download
          </button>
        </div>
      </div>

      <div className="mb-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/55">
        Create a repo named <b className="text-white/80">exactly</b> your username
        (<span className="font-mono text-emerald-300">{username || 'username'}/{username || 'username'}</span>),
        add this as <span className="font-mono">README.md</span>, commit. It renders on your profile.
      </div>

      <pre className="max-h-[65vh] overflow-auto rounded-xl border border-white/10 bg-[#010409] p-4 text-[12.5px] leading-relaxed text-white/85">
        <code>{markdown}</code>
      </pre>
    </div>
  )
}
