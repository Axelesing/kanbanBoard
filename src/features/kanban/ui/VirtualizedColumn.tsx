import { memo, useCallback, useMemo } from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import type { Column as ColumnType, Task } from '@/shared/constants/kanban'
import { VirtualizedList } from '@/shared/ui/VirtualizedList'

import { SortableCard } from './SortableCard'

interface VirtualizedColumnProps extends ColumnType {
  minHeight?: number
  maxHeight?: number
}

/**
 * Виртуализированная колонка
 */
export const VirtualizedColumn = memo<VirtualizedColumnProps>(
  ({ id, title, tasks, minHeight = 400, maxHeight = 600 }) => {
    const { setNodeRef, isOver } = useDroppable({ id })

    const columnHeight = useMemo(() => {
      const baseHeight = 100
      const taskHeight = 136
      const calculatedHeight = baseHeight + tasks.length * taskHeight

      return Math.min(Math.max(calculatedHeight, minHeight), maxHeight)
    }, [tasks.length, minHeight, maxHeight])

    const renderTask = useCallback(
      ({
        style,
        item: task,
      }: {
        index: number
        style: React.CSSProperties
        item: Task
      }) => {
        return (
          <div
            key={task.id}
            style={{
              ...style,
              paddingBottom: '16px',
            }}
          >
            <SortableCard id={task.id} task={task} />
          </div>
        )
      },
      [],
    )

    const shouldVirtualize = tasks.length > 10
    const shouldScroll = tasks.length > 4

    const taskIds = useMemo(() => tasks.map((t) => t.id), [tasks])

    return (
      <Card
        ref={setNodeRef}
        sx={{
          'backgroundColor': 'var(--color-bg-primary)',
          'border': '1px solid var(--color-border-primary)',
          'borderRadius': 2,
          'p': 2,
          'width': 360,
          'minWidth': 360,
          'maxWidth': 360,
          'height': 'fit-content',
          'minHeight': 400,
          'maxHeight': '80vh',
          'overflow': 'hidden',
          ...(isOver && {
            borderColor: 'var(--color-border-focus)',
            backgroundColor: 'var(--color-bg-secondary)',
          }),
          '@media (max-width: 768px)': {
            width: 300,
            minWidth: 300,
            maxWidth: 300,
          },
        }}
      >
        <CardContent sx={{ 'p': 0, '&:last-child': { pb: 0 } }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              mb: 2,
              color: 'var(--color-text-primary)',
              textAlign: 'center',
            }}
          >
            {title} ({tasks.length})
          </Typography>

          <SortableContext
            items={taskIds}
            strategy={verticalListSortingStrategy}
          >
            {shouldVirtualize ? (
              <Box
                sx={{
                  height: columnHeight - 60,
                }}
              >
                <VirtualizedList
                  items={tasks}
                  height={columnHeight - 60}
                  itemHeight={136}
                  renderItem={renderTask}
                  listProps={{
                    overscanCount: 5,
                  }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  ...(shouldScroll && {
                    'maxHeight': 400,
                    'overflowY': 'auto',
                    'overflowX': 'hidden',
                    'padding': '4px 0',
                    'boxSizing': 'border-box',
                    '&::-webkit-scrollbar': {
                      width: '9.5px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'var(--color-bg-secondary)',
                      borderRadius: '4px',
                      margin: '4px 0',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'var(--color-border-primary)',
                      borderRadius: '4px',
                      border: '1px solid var(--color-bg-secondary)',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      background: 'var(--color-text-tertiary)',
                    },
                  }),
                }}
              >
                {tasks.map((task) => (
                  <SortableCard key={task.id} id={task.id} task={task} />
                ))}
              </Box>
            )}
          </SortableContext>
        </CardContent>
      </Card>
    )
  },
)

VirtualizedColumn.displayName = 'VirtualizedColumn'
