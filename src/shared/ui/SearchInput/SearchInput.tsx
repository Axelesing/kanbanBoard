import { memo, useState, useCallback } from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import { Search, Clear } from '@mui/icons-material'
import { useDebounce } from '@/shared/lib/performance/hooks'

interface SearchInputProps {
  placeholder?: string
  debounceDelay?: number
  onSearchChange: (query: string) => void
  initialValue?: string
  size?: 's' | 'm' | 'l'
  disabled?: boolean
}

/**
 * Компонент поиска с оптимизацией производительности
 */
export const SearchInput = memo<SearchInputProps>(
  ({
    placeholder = 'Поиск...',
    debounceDelay = 300,
    onSearchChange,
    initialValue = '',
    size = 'm',
    disabled = false,
  }) => {
    const [value, setValue] = useState(initialValue)

    const debouncedSearch = useDebounce(onSearchChange, debounceDelay)

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = event.target.value
        setValue(searchQuery)
        debouncedSearch(searchQuery)
      },
      [debouncedSearch],
    )

    const handleClear = useCallback(() => {
      setValue('')
      onSearchChange('')
    }, [onSearchChange])

    return (
      <TextField
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        size={size === 's' ? 'small' : size === 'l' ? 'medium' : 'medium'}
        disabled={disabled}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="Очистить поиск"
                onClick={handleClear}
                edge="end"
                size="small"
              >
                <Clear />
              </IconButton>
            </InputAdornment>
          ) : undefined,
        }}
        aria-label="Поиск"
        role="searchbox"
        fullWidth
      />
    )
  },
)

SearchInput.displayName = 'SearchInput'
