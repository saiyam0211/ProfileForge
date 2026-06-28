import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { GenResult, RenderUnit } from '../lib/generate'
import { generateBlocks } from '../lib/generate'
import type { ProfileConfig, WidgetKey } from '../types'
import { MD_COMPONENTS } from '../lib/mdComponents'
import { WIDGET_LABEL } from '../lib/widgetMeta'
import SkillsBlock from './SkillsBlock'
import StatsBlock from './StatsBlock'
import { STAT_INLINE_KEYS } from '../lib/generate'

function Block({
  unit,
  divider,
  config,
  onReorderSkills,
  onReorderStats,
}: {
  unit: RenderUnit
  divider: boolean
  config: ProfileConfig
  onReorderSkills: (s: string[]) => void
  onReorderStats: (k: WidgetKey[]) => void
}) {
  const isSkills = unit.keys.length === 1 && unit.keys[0] === 'skills'
  const isStatsGroup = unit.keys.length > 1 && unit.keys.every((k) => STAT_INLINE_KEYS.includes(k))
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: unit.id })
  const label = unit.keys.map((k) => WIDGET_LABEL[k]?.label ?? k).join(' + ')
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`group/blk relative ${isDragging ? 'z-10 opacity-90' : ''}`}
    >
      {/* drag handle — appears on hover */}
      <button
        {...attributes}
        {...listeners}
        className="absolute -left-3 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 cursor-grab items-center justify-center rounded-lg border border-emerald-400/40 bg-[#0d1117] text-white/50 opacity-0 shadow-lg transition hover:text-emerald-300 active:cursor-grabbing group-hover/blk:opacity-100"
        title={`Drag “${label}”`}
        aria-label={`Drag ${label}`}
      >
        ⠿
      </button>
      <span className="pointer-events-none absolute -left-3 -top-2 z-10 rounded bg-emerald-400 px-1.5 py-0.5 text-[9px] font-bold text-black opacity-0 transition group-hover/blk:opacity-100">
        {label}
      </span>
      <div className={`rounded-lg transition group-hover/blk:bg-white/[0.03] group-hover/blk:outline group-hover/blk:outline-1 group-hover/blk:outline-emerald-400/20 ${divider ? 'mb-2 border-b border-[var(--rule)] pb-4' : 'mb-3 pb-1'}`}>
        {isSkills ? (
          <SkillsBlock config={config} onReorder={onReorderSkills} />
        ) : isStatsGroup ? (
          <StatsBlock config={config} keys={unit.keys} onReorder={onReorderStats} />
        ) : (
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={MD_COMPONENTS}>
            {unit.md}
          </ReactMarkdown>
        )}
      </div>
    </div>
  )
}

export default function Preview({
  gen,
  config,
  onReorder,
  onReorderSkills,
  onReorderStats,
  mode,
}: {
  gen: GenResult
  config: ProfileConfig
  onReorder: (keys: WidgetKey[]) => void
  onReorderSkills: (skills: string[]) => void
  onReorderStats: (keys: WidgetKey[]) => void
  mode: 'dark' | 'light'
}) {
  const { units, footer } = useMemo(() => generateBlocks(config), [config])
  const needsAction = gen.needsSnake || gen.needsPacman || gen.needs3d || gen.needsBlog
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const ids = units.map((u) => u.id)
    const oldI = ids.indexOf(active.id as string)
    const newI = ids.indexOf(over.id as string)
    if (oldI < 0 || newI < 0) return
    const reordered = arrayMove(units, oldI, newI)
    onReorder(reordered.flatMap((u) => u.keys))
  }

  return (
    <div className="mx-auto max-w-3xl">
      {needsAction && (
        <div className="mb-4 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-200/90">
          ⚙️ Snake / Pac-Man / 3D / Blog images stay blank until their GitHub Action runs once. Grab the workflow files from the <b>Actions</b> tab.
        </div>
      )}
      {!gen.isEmpty && (
        <div className="mb-2 text-center text-[11px] text-white/35">Hover any section and drag <span className="text-white/60">⠿</span> to reorder · footer stays last</div>
      )}

      <article className={`gh-preview ${mode} rounded-xl border p-4 sm:p-6`}>
        {gen.isEmpty ? (
          <div className="py-16 text-center text-sm opacity-50">🧩 Empty canvas — add sections from the wizard on the left.</div>
        ) : (
          <>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={units.map((u) => u.id)} strategy={verticalListSortingStrategy}>
                {units.map((u) => (
                  <Block key={u.id} unit={u} divider={config.options.dividers} config={config} onReorderSkills={onReorderSkills} onReorderStats={onReorderStats} />
                ))}
              </SortableContext>
            </DndContext>
            {footer && (
              <div className="opacity-90">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={MD_COMPONENTS}>
                  {footer.md}
                </ReactMarkdown>
              </div>
            )}
          </>
        )}
      </article>
    </div>
  )
}
