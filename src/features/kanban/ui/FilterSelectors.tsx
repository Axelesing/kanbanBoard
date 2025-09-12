import { memo } from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material'
import { Clear } from '@mui/icons-material'

import { SearchInput } from '@/shared/ui/SearchInput'
import type { TaskStatus } from '@/shared/constants/kanban/data'
import { BUTTON_LABELS, FIELD_LABELS } from '@/shared/constants'

interface FilterSelectorsProps {
  status: TaskStatus | null
  user: number | null
  statusOptions: Array<{ label: string; value: TaskStatus | null }>
  userOptions: Array<{ label: string; value: number | null }>
  activeFiltersCount: number
  onSearchChange: (query: string) => void
  onStatusChange: (status: TaskStatus | null) => void
  onUserChange: (user: number | null) => void
  onClearFilters: () => void
}

/**
 * Компонент селекторов фильтров
 */
export const FilterSelectors = memo<FilterSelectorsProps>(
  ({
    status,
    user,
    statusOptions,
    userOptions,
    activeFiltersCount,
    onSearchChange,
    onStatusChange,
    onUserChange,
    onClearFilters,
  }) => {
    return (
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
          onSearchChange={onSearchChange}
          debounceDelay={300}
        />

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>{FIELD_LABELS.STATUS}</InputLabel>
          <Select
            value={status || ''}
            onChange={(event) =>
              onStatusChange((event.target.value as TaskStatus) || null)
            }
            label={FIELD_LABELS.STATUS}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value || 'all'} value={option.value || ''}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>{FIELD_LABELS.USER}</InputLabel>
          <Select
            value={user || ''}
            onChange={(event) => {
              const value = event.target.value
              onUserChange(value ? Number(value) : null)
            }}
            label={FIELD_LABELS.USER}
          >
            {userOptions.map((option) => (
              <MenuItem key={option.value || 'all'} value={option.value || ''}>
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
            onClick={onClearFilters}
            title={BUTTON_LABELS.CLEAR}
          >
            {BUTTON_LABELS.CLEAR} ({activeFiltersCount})
          </Button>
        )}
      </Box>
    )
  },
)

FilterSelectors.displayName = 'FilterSelectors'
