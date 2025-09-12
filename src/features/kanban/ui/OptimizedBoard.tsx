import { ScreenReaderOnly } from '@/shared/ui/ScreenReaderOnly'
import {
  useBoardState,
  useBoardDragDrop,
  useBoardFiltering,
} from '@/features/kanban'
import { BoardLoadingState } from './BoardLoadingState'
import { BoardContent } from './BoardContent'

/**
 * Оптимизированная канбан доска
 */
export function OptimizedBoard() {
  const { columns, setKanbanData, addTask, boardStats, isLoading } =
    useBoardState()

  const { activeTask, dndContextProps } = useBoardDragDrop({
    columns,
    onUpdateBoard: setKanbanData,
  })

  const { showFilter, displayColumns, filterProps } = useBoardFiltering({
    columns,
  })

  if (isLoading) {
    return <BoardLoadingState />
  }

  return (
    <>
      <ScreenReaderOnly id="board-description">
        Интерактивная канбан доска для управления задачами. Используйте drag and
        drop для перемещения задач между колонками.
      </ScreenReaderOnly>

      <BoardContent
        displayColumns={displayColumns}
        allTasks={boardStats.allTasks}
        totalTasks={boardStats.totalTasks}
        showFilter={showFilter}
        activeTask={activeTask}
        dndContextProps={dndContextProps}
        onToggleFilter={filterProps.toggleFilter}
        onAddTask={addTask}
        onFilteredTasksChange={filterProps.onFilteredTasksChange}
      />
    </>
  )
}
