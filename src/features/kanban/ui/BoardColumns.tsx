import { memo } from 'react'
import { Box } from '@mui/material'
import type { Column } from '@/shared/constants/kanban'
import { VirtualizedColumn } from './VirtualizedColumn'

interface BoardColumnsProps {
  columns: Column[]
}

/**
 * Область колонок канбан доски
 */
export const BoardColumns = memo<BoardColumnsProps>(({ columns }) => {
  return (
    <Box
      sx={{
        'display': 'flex',
        'flexDirection': 'row',
        'gap': 3,
        'alignItems': 'flex-start',
        'flexWrap': 'wrap',
        'justifyContent': 'center',
        'pb': 1,
        'width': '100%',
        'maxWidth': '100%',
        'overflowX': 'hidden',
        '@media (max-width: 1024px)': {
          flexWrap: 'wrap',
          justifyContent: 'center',
        },
        '@media (max-width: 768px)': {
          flexDirection: 'column',
          alignItems: 'center',
          p: 1,
        },
        '@media (max-width: 480px)': {
          p: 0.5,
        },
      }}
      role="region"
      aria-label="Колонки задач"
    >
      {columns.map((column) => (
        <VirtualizedColumn
          key={column.id}
          id={column.id}
          title={column.title}
          tasks={column.tasks}
          minHeight={400}
          maxHeight={600}
        />
      ))}
    </Box>
  )
})

BoardColumns.displayName = 'BoardColumns'
