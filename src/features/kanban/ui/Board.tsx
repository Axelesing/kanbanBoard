import { useState } from 'react'

import { Button } from '@consta/uikit/Button'
import { Layout } from '@consta/uikit/Layout'
import { cnMixFlex } from '@consta/uikit/MixFlex'
import {
  DndContext,
  DragEndEvent,
  rectIntersection,
  DragOverlay,
} from '@dnd-kit/core'
import { useGate, useUnit } from 'effector-react'

import type { Task } from '@/constants/kanban'

import { findTaskIndexes, useBoardSensors, moveTask } from '../lib'
import { $$kanban } from '../model/core'

import { Column } from './Column'
import { ColumnCard } from './ColumnCard'

export function Board() {
  useGate($$kanban.kanbanGate)

  const [columns, setKanbanData, addTask] = useUnit([
    $$kanban.$kanbanData,
    $$kanban.kanbanDataSet,
    $$kanban.taskAdd,
  ])

  const sensors = useBoardSensors()
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveTask(null)
    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)

    const { sourceColIndex, sourceTaskIndex, targetColIndex, targetTaskIndex } =
      findTaskIndexes({ columns, activeId, overId })

    if (sourceColIndex === -1 || targetColIndex === -1) return

    const newColumns = moveTask({
      columns,
      sourceColIndex,
      sourceTaskIndex,
      targetColIndex,
      targetTaskIndex,
    })

    setKanbanData(newColumns)
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={({ active }) => {
          const col = columns.find((c) =>
            c.tasks.some((t) => t.id === active.id),
          )
          const task = col?.tasks.find((t) => t.id === active.id) || null
          setActiveTask(task)
        }}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveTask(null)}
      >
        <Layout className={cnMixFlex({ justify: 'center', gap: 'l' })}>
          {columns.map((col) => (
            <Column key={col.id} {...col} />
          ))}
          <Button onClick={addTask} label={'Add task'} />
        </Layout>
        <DragOverlay>
          {activeTask ? <ColumnCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  )
}
