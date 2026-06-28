import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, arrayMove, rectSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { ProfileConfig } from '../types'
import { skillById } from '../lib/skills'
import { skillIconSrc, headingOf } from '../lib/generate'

function Icon({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const s = skillById(id)
  if (!s) return null
  return (
    <img
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      src={skillIconSrc(s)}
      alt={s.label}
      title={`${s.label} — drag to reorder`}
      width={48}
      height={48}
      style={{ transform: CSS.Transform.toString(transform), transition, touchAction: 'none' }}
      className={`cursor-grab rounded active:cursor-grabbing ${isDragging ? 'z-10 scale-110 opacity-90 ring-2 ring-emerald-400/60' : 'hover:scale-110'} transition`}
    />
  )
}

export default function SkillsBlock({ config, onReorder }: { config: ProfileConfig; onReorder: (skills: string[]) => void }) {
  const h = headingOf(config, 'skills')
  const align = config.options.align
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))
  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const oldI = config.skills.indexOf(active.id as string)
    const newI = config.skills.indexOf(over.id as string)
    if (oldI < 0 || newI < 0) return
    onReorder(arrayMove(config.skills, oldI, newI))
  }
  return (
    <div>
      <h2>{h.icon ? `${h.icon} ` : ''}{h.title}</h2>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={config.skills} strategy={rectSortingStrategy}>
          <div className={`flex flex-wrap gap-2 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : ''}`}>
            {config.skills.map((id) => (
              <Icon key={id} id={id} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
