import { useMemo } from 'react'
import { rectIntersection } from '@dnd-kit/core'
import type { Column } from '@/shared/constants/kanban'
import { useBoardSensors, useBoardDrag } from './index'

interface UseBoardDragDropProps {
  columns: Column[]
  onUpdateBoard: (columns: Column[]) => void
}

/**
 * Хук для управления drag&drop функциональностью доски
 */
export function useBoardDragDrop({
  columns,
  onUpdateBoard,
}: UseBoardDragDropProps) {
  const sensors = useBoardSensors()

  const { activeTask, handleDragStart, handleDragEnd, handleDragCancel } =
    useBoardDrag({
      columns,
      onUpdateBoard,
    })

  const dndContextProps = useMemo(
    () => ({
      sensors,
      collisionDetection: rectIntersection,
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
      onDragCancel: handleDragCancel,
    }),
    [sensors, handleDragStart, handleDragEnd, handleDragCancel],
  )

  return {
    activeTask,
    dndContextProps,
  }
}
