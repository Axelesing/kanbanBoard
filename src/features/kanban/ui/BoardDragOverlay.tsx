import { memo } from 'react'
import { DragOverlay } from '@dnd-kit/core'
import type { Task } from '@/shared/constants/kanban'
import { ColumnCard } from './ColumnCard'

interface BoardDragOverlayProps {
  activeTask: Task | null
}

/**
 * Drag Overlay для канбан доски
 */
export const BoardDragOverlay = memo<BoardDragOverlayProps>(
  ({ activeTask }) => {
    return (
      <DragOverlay>
        {activeTask ? (
          <ColumnCard
            task={activeTask}
            aria-label={`Перетаскиваемая задача: ${activeTask.title}`}
          />
        ) : null}
      </DragOverlay>
    )
  },
)

BoardDragOverlay.displayName = 'BoardDragOverlay'
