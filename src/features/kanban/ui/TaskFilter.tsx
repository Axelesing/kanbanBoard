import { memo, useState, useCallback, useMemo, useEffect } from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  Typography,
} from '@mui/material'
import { Clear } from '@mui/icons-material'

import { SearchInput } from '@/shared/ui/SearchInput'
import { useOptimizedList } from '@/shared/lib'
import type { Task } from '@/shared/constants/kanban'
import {
  TaskStatus,
  STATUSES_SELECT,
  STATUSES,
} from '@/shared/constants/kanban/data'
import { USERS } from '@/shared/constants/kanban/data'
import { BUTTON_LABELS, FIELD_LABELS } from '@/shared/constants'

interface TaskFilterProps {
  tasks: Task[]
  onFilteredTasksChange: (filteredTasks: Task[]) => void
  showFilter?: boolean
}

interface FilterState {
  searchQuery: string
  status: TaskStatus | null
  user: number | null
}

/**
 * Компонент фильтрации задач
 */
export const TaskFilter = memo<TaskFilterProps>(
  ({ tasks, onFilteredTasksChange, showFilter = true }) => {
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
        { label: 'Все статусы', value: null },
        ...STATUSES_SELECT.map((status) => ({
          label: status.label,
          value: status.id,
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

    if (!showFilter) {
      return null
    }

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <SearchInput
            placeholder="Поиск по названию и описанию..."
            onSearchChange={handleSearchChange}
            debounceDelay={300}
          />

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>{FIELD_LABELS.STATUS}</InputLabel>
            <Select
              value={filters.status || ''}
              onChange={(event) =>
                handleStatusChange((event.target.value as TaskStatus) || null)
              }
              label={FIELD_LABELS.STATUS}
            >
              {statusOptions.map((option) => (
                <MenuItem
                  key={option.value || 'all'}
                  value={option.value || ''}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>{FIELD_LABELS.USER}</InputLabel>
            <Select
              value={filters.user || ''}
              onChange={(event) => {
                const value = event.target.value
                handleUserChange(value ? Number(value) : null)
              }}
              label={FIELD_LABELS.USER}
            >
              {userOptions.map((option) => (
                <MenuItem
                  key={option.value || 'all'}
                  value={option.value || ''}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {activeFiltersCount > 0 && (
            <Button
              size="small"
              variant="outlined"
              startIcon={<Clear />}
              onClick={handleClearFilters}
              title={BUTTON_LABELS.CLEAR}
            >
              {BUTTON_LABELS.CLEAR} ({activeFiltersCount})
            </Button>
          )}
        </Box>

        {activeFiltersCount > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Активные фильтры:
            </Typography>
            {filters.searchQuery && (
              <Chip
                size="small"
                label={`Поиск: "${filters.searchQuery}"`}
                variant="outlined"
              />
            )}
            {filters.status && (
              <Chip
                size="small"
                label={`Статус: ${STATUSES[filters.status].label}`}
                variant="outlined"
              />
            )}
            {filters.user && (
              <Chip
                size="small"
                label={`Пользователь: ${USERS.find((u) => u.id === filters.user)?.label}`}
                variant="outlined"
              />
            )}
          </Box>
        )}
      </Box>
    )
  },
)

TaskFilter.displayName = 'TaskFilter'
