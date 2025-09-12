import { useState, useCallback } from 'react'
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import type { Task, Column } from '@/shared/constants/kanban'
import { findTaskIndexes, moveTask } from '../lib'
import { useThrottle } from '@/shared/lib'
import { logger } from '@/shared/lib'

interface UseBoardDragProps {
  columns: Column[]
  onUpdateBoard: (columns: Column[]) => void
}

interface UseBoardDragReturn {
  activeTask: Task | null
  handleDragStart: (event: DragStartEvent) => void
  handleDragEnd: (event: DragEndEvent) => void
  handleDragCancel: () => void
}

/**
 * Хук для управления drag операциями на канбан доске
 */
export function useBoardDrag({
  columns,
  onUpdateBoard,
}: UseBoardDragProps): UseBoardDragReturn {
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const throttledUpdateBoard = useThrottle(onUpdateBoard, 100)

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
        logger.warn('Invalid task indexes during drag operation', {
          activeId,
          overId,
          sourceColIndex,
          targetColIndex,
        })
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

        throttledUpdateBoard(newColumns)
      } catch (error) {
        logger.error('Error during task move operation', error as Error, {
          activeId,
          overId,
          sourceColIndex,
          targetColIndex,
        })
      }
    },
    [columns, throttledUpdateBoard],
  )

  const handleDragCancel = useCallback(() => {
    setActiveTask(null)
  }, [])

  return {
    activeTask,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  }
}
