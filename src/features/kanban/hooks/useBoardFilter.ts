import { useState, useMemo, useCallback } from 'react'
import type { Task, Column } from '@/shared/constants/kanban'

interface UseBoardFilterProps {
  columns: Column[]
}

interface UseBoardFilterReturn {
  showFilter: boolean
  filteredTasks: Task[]
  filteredColumns: Column[]
  toggleFilter: () => void
  onFilteredTasksChange: (tasks: Task[]) => void
}

/**
 * Хук для управления фильтрацией на канбан доске
 */
export function useBoardFilter({
  columns,
}: UseBoardFilterProps): UseBoardFilterReturn {
  const [showFilter, setShowFilter] = useState(false)
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])

  const toggleFilter = useCallback(() => setShowFilter((prev) => !prev), [])

  const onFilteredTasksChange = useCallback((tasks: Task[]) => {
    setFilteredTasks(tasks)
  }, [])

  const filteredColumns = useMemo(() => {
    if (!showFilter || filteredTasks.length === 0) {
      return columns
    }

    const filteredTaskIds = new Set(filteredTasks.map((task) => task.id))

    return columns.map((column) => ({
      ...column,
      tasks: column.tasks.filter((task) => filteredTaskIds.has(task.id)),
    }))
  }, [columns, filteredTasks, showFilter])

  return {
    showFilter,
    filteredTasks,
    filteredColumns,
    toggleFilter,
    onFilteredTasksChange,
  }
}
