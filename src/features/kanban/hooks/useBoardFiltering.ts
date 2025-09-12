import { useMemo } from 'react'
import type { Column } from '@/shared/constants/kanban'
import { useBoardFilter } from './useBoardFilter'

interface UseBoardFilteringProps {
  columns: Column[]
}

/**
 * Хук для управления фильтрацией на доске
 */
export function useBoardFiltering({ columns }: UseBoardFilteringProps) {
  const { showFilter, filteredColumns, toggleFilter, onFilteredTasksChange } =
    useBoardFilter({ columns })

  const filterProps = useMemo(
    () => ({
      showFilter,
      toggleFilter,
      onFilteredTasksChange,
    }),
    [showFilter, toggleFilter, onFilteredTasksChange],
  )

  const displayColumns = useMemo(() => filteredColumns, [filteredColumns])

  return {
    showFilter,
    displayColumns,
    filterProps,
  }
}
