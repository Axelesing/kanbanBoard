import { useMemo } from 'react'
import { useGate, useUnit } from 'effector-react'
import { $$kanban } from '../model'

/**
 * Хук для управления состоянием канбан доски
 */
export function useBoardState() {
  useGate($$kanban.kanbanGate)

  const [columns, setKanbanData, addTask] = useUnit([
    $$kanban.$kanbanData,
    $$kanban.kanbanDataSet,
    $$kanban.taskAdd,
  ])

  const boardStats = useMemo(() => {
    const totalTasks = columns.reduce(
      (total, col) => total + col.tasks.length,
      0,
    )
    const allTasks = columns.flatMap((col) => col.tasks)
    const columnCount = columns.length

    return {
      totalTasks,
      allTasks,
      columnCount,
      isEmpty: columns.length === 0,
    }
  }, [columns])

  const isLoading = !columns || columns.length === 0

  return {
    columns,
    setKanbanData,
    addTask,
    boardStats,
    isLoading,
  }
}
