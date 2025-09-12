import { memo } from 'react'
import { Box, Chip, Typography } from '@mui/material'

interface ActiveFiltersChipsProps {
  chips: Array<{ label: string; key: string }>
}

/**
 * Компонент для отображения активных фильтров в виде чипов
 */
export const ActiveFiltersChips = memo<ActiveFiltersChipsProps>(({ chips }) => {
  if (chips.length === 0) {
    return null
  }

  return (
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
      {chips.map((chip) => (
        <Chip
          key={chip.key}
          size="small"
          label={chip.label}
          variant="outlined"
        />
      ))}
    </Box>
  )
})

ActiveFiltersChips.displayName = 'ActiveFiltersChips'
