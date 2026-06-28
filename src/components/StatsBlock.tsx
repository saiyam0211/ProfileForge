import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, arrayMove, rectSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { ProfileConfig, WidgetKey } from '../types'
import { statCardSrc, headingOf } from '../lib/generate'
import SmartImg from './SmartImg'

const ALT: Record<string, string> = { stats: 'github stats', streak: 'streak stats', topLangs: 'top languages' }

export default function StatsBlock({
  config,
  keys,
  onReorder,
}: {
  config: ProfileConfig
  keys: WidgetKey[]
  onReorder: (keys: WidgetKey[]) => void
}) {
  const h = headingOf(config, 'stats')
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))
  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const oldI = keys.indexOf(active.id as WidgetKey)
    const newI = keys.indexOf(over.id as WidgetKey)
    if (oldI < 0 || newI < 0) return
    onReorder(arrayMove(keys, oldI, newI))
  }
  return (
    <div>
      <h2>{h.icon ? `${h.icon} ` : ''}{h.title}</h2>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={keys} strategy={rectSortingStrategy}>
          <div className={`grid gap-3 ${keys.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {keys.map((k) => (
              <SortableCard key={k} k={k} config={config} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}

// real card with the actual config src (Card above couldn't access config cleanly)
function SortableCard({ k, config }: { k: WidgetKey; config: ProfileConfig }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: k })
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ transform: CSS.Transform.toString(transform), transition, touchAction: 'none' }}
      title="Drag to reorder"
      className={`flex cursor-grab items-center justify-center overflow-hidden rounded-lg transition active:cursor-grabbing ${isDragging ? 'z-10 opacity-90 ring-2 ring-emerald-400/60' : 'hover:ring-1 hover:ring-emerald-400/30'}`}
    >
      <SmartImg src={statCardSrc(config, k)} alt={ALT[k] || k} />
    </div>
  )
}
