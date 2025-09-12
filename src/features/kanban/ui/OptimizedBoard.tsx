import { useMemo } from 'react'
import { Container } from '@mui/material'
import { DndContext, rectIntersection } from '@dnd-kit/core'
import { useGate, useUnit } from 'effector-react'

import { useBoardSensors, useBoardDrag, useBoardFilter } from '../hooks'
import { $$kanban } from '../model'
import { ScreenReaderOnly } from '@/shared/ui/ScreenReaderOnly'

import { BoardHeader } from './BoardHeader'
import { BoardColumns } from './BoardColumns'
import { BoardDragOverlay } from './BoardDragOverlay'
import { TaskFilter } from './TaskFilter'

/**
 * Оптимизированная канбан доска
 */
export function OptimizedBoard() {
  useGate($$kanban.kanbanGate)

  const [columns, setKanbanData, addTask] = useUnit([
    $$kanban.$kanbanData,
    $$kanban.kanbanDataSet,
    $$kanban.taskAdd,
  ])

  const sensors = useBoardSensors()

  const { activeTask, handleDragStart, handleDragEnd, handleDragCancel } =
    useBoardDrag({
      columns,
      onUpdateBoard: setKanbanData,
    })

  const { showFilter, filteredColumns, toggleFilter, onFilteredTasksChange } =
    useBoardFilter({ columns })

  const totalTasks = useMemo(
    () => columns.reduce((total, col) => total + col.tasks.length, 0),
    [columns],
  )

  const allTasks = useMemo(() => columns.flatMap((col) => col.tasks), [columns])

  if (!columns || columns.length === 0) {
    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <div role="status" aria-label="Загрузка данных канбан доски">
          Загрузка...
        </div>
      </Container>
    )
  }

  return (
    <div
      role="main"
      aria-label="Канбан доска"
      aria-describedby="board-description"
    >
      <ScreenReaderOnly id="board-description">
        Интерактивная канбан доска для управления задачами. Используйте drag and
        drop для перемещения задач между колонками.
      </ScreenReaderOnly>

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
          onToggleFilter={toggleFilter}
          onAddTask={addTask}
        />

        {showFilter && (
          <TaskFilter
            tasks={allTasks}
            onFilteredTasksChange={onFilteredTasksChange}
          />
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={rectIntersection}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <BoardColumns columns={filteredColumns} />
          <BoardDragOverlay activeTask={activeTask} />
        </DndContext>
      </Container>
    </div>
  )
}
