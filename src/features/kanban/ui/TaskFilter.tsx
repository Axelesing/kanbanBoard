import { memo } from 'react'
import { Box } from '@mui/material'

import type { Task } from '@/shared/constants/kanban'
import { useTaskFilter } from '../hooks/useTaskFilter'
import { FilterSelectors } from './FilterSelectors'
import { ActiveFiltersChips } from './ActiveFiltersChips'

interface TaskFilterProps {
  tasks: Task[]
  onFilteredTasksChange: (filteredTasks: Task[]) => void
  showFilter?: boolean
}

/**
 * Компонент фильтрации задач
 */
export const TaskFilter = memo<TaskFilterProps>(
  ({ tasks, onFilteredTasksChange, showFilter = true }) => {
    const {
      filters,
      activeFiltersCount,
      statusOptions,
      userOptions,
      handleSearchChange,
      handleStatusChange,
      handleUserChange,
      handleClearFilters,
      getActiveFilterChips,
    } = useTaskFilter({
      tasks,
      onFilteredTasksChange,
    })

    if (!showFilter) {
      return null
    }

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FilterSelectors
          status={filters.status}
          user={filters.user}
          statusOptions={statusOptions}
          userOptions={userOptions}
          activeFiltersCount={activeFiltersCount}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onUserChange={handleUserChange}
          onClearFilters={handleClearFilters}
        />

        <ActiveFiltersChips chips={getActiveFilterChips()} />
      </Box>
    )
  },
)

TaskFilter.displayName = 'TaskFilter'
