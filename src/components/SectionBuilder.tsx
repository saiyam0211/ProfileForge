import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { WidgetKey, WidgetToggles } from '../types'
import { WIDGET_META, WIDGET_LABEL, WIDGET_GROUPS } from '../lib/widgetMeta'

type Props = {
  order: WidgetKey[]
  widgets: WidgetToggles
  onReorder: (enabled: WidgetKey[]) => void
  onAdd: (k: WidgetKey) => void
  onRemove: (k: WidgetKey) => void
}

function Row({ k, index, onRemove }: { k: WidgetKey; index: number; onRemove: (k: WidgetKey) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: k })
  const meta = WIDGET_LABEL[k]
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`group flex items-center gap-2.5 rounded-xl border bg-[#0d1117] px-2.5 py-2.5 transition ${
        isDragging ? 'z-10 scale-[1.02] border-emerald-400/60 shadow-xl shadow-emerald-400/10' : 'border-white/10 hover:border-white/25'
      }`}
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/5 text-[11px] font-bold text-white/45">
        {index + 1}
      </span>
      <span className="text-lg">{meta.emoji}</span>
      <span className="flex-1 text-sm font-medium">{meta.label}</span>
      {meta.hint && <span className="rounded bg-amber-400/15 px-1.5 py-0.5 text-[10px] text-amber-200">{meta.hint}</span>}
      <button
        onClick={() => onRemove(k)}
        className="rounded-md px-1.5 py-0.5 text-white/30 opacity-0 transition hover:bg-rose-500/15 hover:text-rose-300 group-hover:opacity-100"
        aria-label="remove section"
      >
        ✕
      </button>
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none px-1 text-lg leading-none text-white/25 hover:text-white/70 active:cursor-grabbing"
        aria-label="drag to reorder"
      >
        ⠿
      </button>
    </div>
  )
}

export default function SectionBuilder({ order, widgets, onReorder, onAdd, onRemove }: Props) {
  const enabled = order.filter((k) => widgets[k])
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const oldI = enabled.indexOf(active.id as WidgetKey)
    const newI = enabled.indexOf(over.id as WidgetKey)
    if (oldI < 0 || newI < 0) return
    onReorder(arrayMove(enabled, oldI, newI))
  }

  return (
    <div className="space-y-5">
      {/* current layout */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-white/70">Your layout</span>
          <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-white/45">{enabled.length} blocks · top → bottom</span>
        </div>
        {enabled.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-white/15 px-3 py-8 text-center">
            <div className="text-2xl">🧩</div>
            <p className="mt-1 text-xs text-white/45">Empty canvas — tap blocks below to add them</p>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={enabled} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {enabled.map((k, idx) => (
                  <Row key={k} k={k} index={idx} onRemove={onRemove} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* block library, grouped */}
      <div>
        <div className="mb-2 text-xs font-semibold text-white/70">Block library</div>
        <div className="space-y-3">
          {WIDGET_GROUPS.map((g) => {
            const items = WIDGET_META.filter((m) => m.group === g && !widgets[m.key])
            if (!items.length) return null
            return (
              <div key={g}>
                <div className="mb-1.5 text-[10px] uppercase tracking-wider text-white/35">{g}</div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((m) => (
                    <button
                      key={m.key}
                      onClick={() => onAdd(m.key)}
                      className="pop-in flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] px-2.5 py-1.5 text-xs text-white/65 transition hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-100"
                    >
                      <span>{m.emoji}</span>
                      {m.label}
                      <span className="font-bold text-emerald-400/70">+</span>
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
