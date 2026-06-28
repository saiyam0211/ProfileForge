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

// Stable ids per line index so dnd-kit can track rows as text changes.
function Row({
  id,
  value,
  onChange,
  onRemove,
  placeholder,
}: {
  id: string
  value: string
  onChange: (v: string) => void
  onRemove: () => void
  placeholder?: string
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-center gap-1.5 ${isDragging ? 'z-10 opacity-90' : ''}`}
    >
      <button {...attributes} {...listeners} className="cursor-grab touch-none px-1 text-white/30 hover:text-white/70 active:cursor-grabbing" aria-label="drag line">⠿</button>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#010409] px-3 py-2 text-sm outline-none focus:border-emerald-400/50"
      />
      <button onClick={onRemove} className="rounded-md px-1.5 py-1 text-white/35 hover:bg-rose-500/15 hover:text-rose-300" aria-label="remove line">✕</button>
    </div>
  )
}

export default function LineEditor({ lines, onChange, placeholder }: { lines: string[]; onChange: (lines: string[]) => void; placeholder?: string }) {
  // ids derived from index — stable enough for typical edit/drag flows
  const ids = lines.map((_, i) => `line-${i}`)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const oldI = ids.indexOf(active.id as string)
    const newI = ids.indexOf(over.id as string)
    if (oldI < 0 || newI < 0) return
    onChange(arrayMove(lines, oldI, newI))
  }

  return (
    <div className="space-y-1.5">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          {lines.map((line, i) => (
            <Row
              key={ids[i]}
              id={ids[i]}
              value={line}
              placeholder={placeholder}
              onChange={(v) => onChange(lines.map((l, j) => (j === i ? v : l)))}
              onRemove={() => onChange(lines.filter((_, j) => j !== i))}
            />
          ))}
        </SortableContext>
      </DndContext>
      <button onClick={() => onChange([...lines, ''])} className="w-full rounded-lg border border-dashed border-white/15 py-2 text-xs text-white/50 transition hover:border-emerald-400/40 hover:text-emerald-200">
        + Add line
      </button>
    </div>
  )
}
