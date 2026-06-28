import { useState } from 'react'
import type { WorkflowFile } from '../lib/workflows'
import type { GenResult } from '../lib/generate'

export default function WorkflowPanel({
  files,
  gen,
  username,
}: {
  files: WorkflowFile[]
  gen: GenResult
  username: string
}) {
  const [copiedPath, setCopiedPath] = useState('')

  function copy(f: WorkflowFile) {
    navigator.clipboard.writeText(f.yaml).catch(() => {})
    setCopiedPath(f.path)
    setTimeout(() => setCopiedPath(''), 1600)
  }
  function download(f: WorkflowFile) {
    const name = f.path.split('/').pop() || 'workflow.yml'
    const blob = new Blob([f.yaml], { type: 'text/yaml' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = name
    a.click()
    URL.revokeObjectURL(a.href)
  }

  if (!files.length) {
    return <div className="text-sm text-white/50">No Actions needed for this template. 🎉</div>
  }

  return (
    <div>
      <div className="mb-4 rounded-lg border border-emerald-400/25 bg-emerald-400/5 px-4 py-3 text-xs text-white/70">
        <p className="font-semibold text-emerald-200">Why these exist</p>
        <p className="mt-1">
          Snake, Pac-Man, 3D and blog widgets can't be fetched live (GitHub's contribution grid
          isn't in the API and its image proxy caches hard). Instead a scheduled GitHub Action
          renders them and commits the result. Add each file at its path in
          <span className="font-mono text-emerald-300"> {username || 'username'}/{username || 'username'}</span>,
          then run it once from the <b>Actions</b> tab (or wait for the cron).
        </p>
        {(gen.needsSnake || gen.needsPacman) && (
          <p className="mt-2 text-amber-200/80">
            ⚠️ The animation workflow pushes SVGs to an <b>output</b> branch — that's intentional,
            the README links to <span className="font-mono">.../output/...svg</span>.
          </p>
        )}
      </div>

      <div className="space-y-4">
        {files.map((f) => (
          <div key={f.path} className="overflow-hidden rounded-xl border border-white/10">
            <div className="flex flex-wrap items-center gap-2 border-b border-white/10 bg-white/5 px-3 py-2">
              <span className="text-sm font-semibold">{f.title}</span>
              <span className="font-mono text-[11px] text-white/45">{f.path}</span>
              <div className="ml-auto flex gap-2">
                <button
                  onClick={() => copy(f)}
                  className="rounded-md bg-emerald-400/90 px-2.5 py-1 text-xs font-semibold text-black hover:bg-emerald-300"
                >
                  {copiedPath === f.path ? '✓ Copied' : 'Copy'}
                </button>
                <button
                  onClick={() => download(f)}
                  className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/80 hover:bg-white/10"
                >
                  Download
                </button>
              </div>
            </div>
            <pre className="max-h-[40vh] overflow-auto bg-[#010409] p-3 text-[12px] leading-relaxed text-white/85">
              <code>{f.yaml}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  )
}
