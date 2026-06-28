import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import type { ProfileConfig } from '../types'
import { generateReadme } from '../lib/generate'
import { MD_COMPONENTS } from '../lib/mdComponents'

// Renders the REAL generated README (live SVG endpoints, real data) scaled down
// to fit the card. Mounts only when scrolled into view so all cards don't fire
// their image requests at once.
const BASE_WIDTH = 760 // GitHub readme content width we render at, then scale

export default function CardPreview({ config, height = 230 }: { config: ProfileConfig; height?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width))
    ro.observe(el)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { rootMargin: '200px' },
    )
    io.observe(el)
    return () => {
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  const scale = width ? width / BASE_WIDTH : 0
  const md = visible ? generateReadme(config).markdown : ''

  return (
    <div ref={ref} className="relative w-full select-none overflow-hidden" style={{ height }}>
      {/* faint loading shimmer until mounted */}
      {!visible && <div className="absolute inset-0 animate-pulse bg-white/[0.02]" />}
      {visible && scale > 0 && (
        <div
          className="gh-preview pointer-events-none absolute left-0 top-0 origin-top-left"
          style={{ width: BASE_WIDTH, transform: `scale(${scale})` }}
        >
          <div className="px-6 pt-5">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={MD_COMPONENTS}>
              {md}
            </ReactMarkdown>
          </div>
        </div>
      )}
      {/* fade the bottom edge so the clipped readme looks intentional */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0d1117] to-transparent" />
    </div>
  )
}
