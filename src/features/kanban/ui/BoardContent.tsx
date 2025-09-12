import { memo } from 'react'
import { Container } from '@mui/material'
import { DndContext } from '@dnd-kit/core'
import type { Column, Task } from '@/shared/constants/kanban'
import { BoardHeader } from './BoardHeader'
import { BoardColumns } from './BoardColumns'
import { BoardDragOverlay } from './BoardDragOverlay'
import { TaskFilter } from './TaskFilter'

interface BoardContentProps {
  displayColumns: Column[]
  allTasks: Task[]
  totalTasks: number
  showFilter: boolean
  activeTask: Task | null
  dndContextProps: {
    sensors: any
    collisionDetection: any
    onDragStart: (event: any) => void
    onDragEnd: (event: any) => void
    onDragCancel: () => void
  }
  onToggleFilter: () => void
  onAddTask: (task: Task) => void
  onFilteredTasksChange: (tasks: Task[]) => void
}

/**
 * Основной контент канбан доски
 */
export const BoardContent = memo<BoardContentProps>(
  ({
    displayColumns,
    allTasks,
    totalTasks,
    showFilter,
    activeTask,
    dndContextProps,
    onToggleFilter,
    onAddTask,
    onFilteredTasksChange,
  }) => {
    return (
      <div
        role="main"
        aria-label="Канбан доска"
        aria-describedby="board-description"
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'stretch',
            width: '100%',
            maxWidth: '100%',
            overflowX: 'hidden',
          }}
        >
          <BoardHeader
            totalTasks={totalTasks}
            showFilter={showFilter}
            onToggleFilter={onToggleFilter}
            onAddTask={onAddTask}
          />

          {showFilter && (
            <TaskFilter
              tasks={allTasks}
              onFilteredTasksChange={onFilteredTasksChange}
            />
          )}

          <DndContext {...dndContextProps}>
            <BoardColumns columns={displayColumns} />
            <BoardDragOverlay activeTask={activeTask} />
          </DndContext>
        </Container>
      </div>
    )
  },
)

BoardContent.displayName = 'BoardContent'
