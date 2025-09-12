import { useMemo } from 'react'
import type { Column, Task } from '@/shared/constants/kanban'

interface UseBoardProps {
  columns: Column[]
}

interface UseBoardReturn {
  totalTasks: number
  allTasks: Task[]
  emptyColumns: Column[]
  columnsWithTasks: Column[]
}

/**
 * Общий хук для управления канбан досками
 */
export function useBoard({ columns }: UseBoardProps): UseBoardReturn {
  const totalTasks = useMemo(
    () => columns.reduce((total, col) => total + col.tasks.length, 0),
    [columns],
  )

  const allTasks = useMemo(() => columns.flatMap((col) => col.tasks), [columns])

  const emptyColumns = useMemo(
    () => columns.filter((col) => col.tasks.length === 0),
    [columns],
  )

  const columnsWithTasks = useMemo(
    () => columns.filter((col) => col.tasks.length > 0),
    [columns],
  )

  return {
    totalTasks,
    allTasks,
    emptyColumns,
    columnsWithTasks,
  }
}
