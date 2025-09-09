import { useState, useCallback, useMemo } from 'react'

import { Button } from '@consta/uikit/Button'
import { Layout } from '@consta/uikit/Layout'
import { cnMixFlex } from '@consta/uikit/MixFlex'
import {
  DndContext,
  DragEndEvent,
  rectIntersection,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core'
import { useGate, useUnit } from 'effector-react'
import sc from 'styled-components'

import type { Task } from '@/shared/constants/kanban'

import { findTaskIndexes, useBoardSensors, moveTask } from '../lib'
import { $$kanban } from '../model'
import { ScreenReaderOnly } from '@/shared/ui/ScreenReaderOnly'

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

  const handleDragStart = useCallback(
    ({ active }: DragStartEvent) => {
      const column = columns.find((c) =>
        c.tasks.some((t) => t.id === active.id),
      )
      const task = column?.tasks.find((t) => t.id === active.id) || null
      setActiveTask(task)
    },
    [columns],
  )

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      setActiveTask(null)

      if (!over) {
        return
      }

      const activeId = String(active.id)
      const overId = String(over.id)

      const {
        sourceColIndex,
        sourceTaskIndex,
        targetColIndex,
        targetTaskIndex,
      } = findTaskIndexes({ columns, activeId, overId })

      if (sourceColIndex === -1 || targetColIndex === -1) {
        console.warn('Invalid task indexes during drag operation')
        return
      }

      try {
        const newColumns = moveTask({
          columns,
          sourceColIndex,
          sourceTaskIndex,
          targetColIndex,
          targetTaskIndex,
        })

        setKanbanData(newColumns)
      } catch (error) {
        console.error('Error during task move operation:', error)
      }
    },
    [columns, setKanbanData],
  )

  const handleDragCancel = useCallback(() => {
    setActiveTask(null)
  }, [])

  const totalTasks = useMemo(
    () => columns.reduce((total, col) => total + col.tasks.length, 0),
    [columns],
  )

  if (!columns || columns.length === 0) {
    return (
      <BoardLayout
        className={cnMixFlex({
          justify: 'center',
          align: 'center',
          direction: 'column',
          gap: 'l',
        })}
      >
        <div role="status" aria-label="Загрузка данных канбан доски">
          Загрузка...
        </div>
      </BoardLayout>
    )
  }

  return (
    <div
      role="main"
      aria-label={`Канбан доска с ${totalTasks} задачами`}
      aria-describedby="board-description"
    >
      <ScreenReaderOnly id="board-description">
        Интерактивная канбан доска с возможностью перетаскивания задач между
        колонками. Всего задач: {totalTasks}
      </ScreenReaderOnly>

      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <BoardLayout
          className={cnMixFlex({
            justify: 'center',
            gap: 'l',
            wrap: 'wrap',
            align: 'flex-start',
          })}
        >
          <Button
            onClick={addTask}
            label="Добавить задачу"
            aria-label="Добавить новую задачу в канбан доску"
          />

          {columns.map((col) => (
            <Column
              key={col.id}
              {...col}
              aria-label={`Колонка ${col.title} с ${col.tasks.length} задачами`}
            />
          ))}
        </BoardLayout>

        <DragOverlay>
          {activeTask ? (
            <ColumnCard
              task={activeTask}
              aria-label={`Перетаскиваемая задача: ${activeTask.title}`}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}

const BoardLayout = sc(Layout)`
  flex-wrap: nowrap;
  flex-direction: row;
  min-height: 400px;
  padding: 1rem;
  
  @media (max-width: 1024px) {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.25rem;
  }
`
