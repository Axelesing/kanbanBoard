import { useState, useCallback, useMemo, useEffect } from 'react'
import { useOptimizedList } from '@/shared/lib'
import type { Task } from '@/shared/constants/kanban'
import {
  TaskStatus,
  STATUSES_SELECT,
  STATUSES,
} from '@/shared/constants/kanban/data'
import { USERS } from '@/shared/constants/kanban/data'

interface FilterState {
  searchQuery: string
  status: TaskStatus | null
  user: number | null
}

interface UseTaskFilterProps {
  tasks: Task[]
  onFilteredTasksChange: (filteredTasks: Task[]) => void
}

interface UseTaskFilterReturn {
  filters: FilterState
  activeFiltersCount: number
  statusOptions: Array<{ label: string; value: TaskStatus | null }>
  userOptions: Array<{ label: string; value: number | null }>
  handleSearchChange: (query: string) => void
  handleStatusChange: (status: TaskStatus | null) => void
  handleUserChange: (user: number | null) => void
  handleClearFilters: () => void
  getActiveFilterChips: () => Array<{ label: string; key: string }>
}

/**
 * Хук для управления фильтрацией задач
 */
export function useTaskFilter({
  tasks,
  onFilteredTasksChange,
}: UseTaskFilterProps): UseTaskFilterReturn {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    status: null,
    user: null,
  })

  const filterFn = useCallback(
    (task: Task) => {
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        const matchesTitle = task.title?.toLowerCase().includes(query)
        const matchesDescription = task.description
          ?.toLowerCase()
          .includes(query)
        if (!matchesTitle && !matchesDescription) {
          return false
        }
      }

      if (filters.status && task.status !== filters.status) {
        return false
      }

      if (filters.user && task.user?.id !== filters.user) {
        return false
      }

      return true
    },
    [filters.searchQuery, filters.status, filters.user],
  )

  const optimizedTasks = useOptimizedList(tasks, (task) => task.id, {
    filterFn,
  })

  useEffect(() => {
    const filteredTasks = optimizedTasks.map(({ item }) => item)
    onFilteredTasksChange(filteredTasks)
  }, [optimizedTasks, onFilteredTasksChange])

  const handleSearchChange = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }))
  }, [])

  const handleStatusChange = useCallback((status: TaskStatus | null) => {
    setFilters((prev) => ({ ...prev, status }))
  }, [])

  const handleUserChange = useCallback((user: number | null) => {
    setFilters((prev) => ({ ...prev, user }))
  }, [])

  const handleClearFilters = useCallback(() => {
    setFilters({
      searchQuery: '',
      status: null,
      user: null,
    })
  }, [])

  const statusOptions = useMemo(
    () => [
      { label: 'Все статусы', value: null as TaskStatus | null },
      ...STATUSES_SELECT.map((status) => ({
        label: status.label,
        value: status.id as TaskStatus,
      })),
    ],
    [],
  )

  const userOptions = useMemo(
    () => [
      { label: 'Все пользователи', value: null },
      ...USERS.map((user) => ({
        label: user.label,
        value: user.id,
      })),
    ],
    [],
  )

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (filters.searchQuery) count++
    if (filters.status) count++
    if (filters.user) count++
    return count
  }, [filters])

  const getActiveFilterChips = useCallback(() => {
    const chips: Array<{ label: string; key: string }> = []

    if (filters.searchQuery) {
      chips.push({
        label: `Поиск: "${filters.searchQuery}"`,
        key: 'search',
      })
    }

    if (filters.status) {
      chips.push({
        label: `Статус: ${STATUSES[filters.status].label}`,
        key: 'status',
      })
    }

    if (filters.user) {
      const user = USERS.find((u) => u.id === filters.user)
      chips.push({
        label: `Пользователь: ${user?.label}`,
        key: 'user',
      })
    }

    return chips
  }, [filters])

  return {
    filters,
    activeFiltersCount,
    statusOptions,
    userOptions,
    handleSearchChange,
    handleStatusChange,
    handleUserChange,
    handleClearFilters,
    getActiveFilterChips,
  }
}
