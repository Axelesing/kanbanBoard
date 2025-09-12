import { useMemo } from 'react'
import { useGate, useUnit } from 'effector-react'
import { $$kanban } from '@/features/kanban'
import { useListComputations } from '@/shared/hooks'

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

  const allTasks = useMemo(() => columns.flatMap((col) => col.tasks), [columns])

  const { stats: taskStats } = useListComputations({
    items: allTasks,
    computeStats: true,
  })

  const boardStats = useMemo(
    () => ({
      totalTasks: taskStats?.total || 0,
      allTasks,
      columnCount: columns.length,
      isEmpty: columns.length === 0,
    }),
    [taskStats, allTasks, columns.length],
  )

  const isLoading = !columns || columns.length === 0

  return {
    columns,
    setKanbanData,
    addTask,
    boardStats,
    isLoading,
  }
}
