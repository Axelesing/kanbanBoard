import { memo, useMemo, useRef } from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useVirtualizer } from '@tanstack/react-virtual'

import type { Column as ColumnType } from '@/shared/constants/kanban'
import { pxToRem, BORDERS, RADIUS } from '@/shared/lib/converters'

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
    const parentRef = useRef<HTMLDivElement>(null)

    const columnHeight = useMemo(() => {
      const baseHeight = 100
      const taskHeight = 136
      const calculatedHeight = baseHeight + tasks.length * taskHeight

      return Math.min(Math.max(calculatedHeight, minHeight), maxHeight)
    }, [tasks.length, minHeight, maxHeight])

    // Виртуализация с поддержкой drag-and-drop
    const shouldVirtualize = tasks.length > 10
    const shouldScroll = tasks.length > 4

    const taskIds = useMemo(() => tasks.map((t) => t.id), [tasks])

    // Настройка виртуализатора
    const virtualizer = useVirtualizer({
      count: tasks.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 136, // высота задачи + отступ
      overscan: 5,
    })

    return (
      <Card
        ref={setNodeRef}
        sx={{
          'backgroundColor': 'var(--color-bg-primary)',
          'border': `${BORDERS.thin} solid var(--color-border-primary)`,
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
                ref={parentRef}
                sx={{
                  'height': columnHeight - 60,
                  'overflow': 'auto',
                  '&::-webkit-scrollbar': {
                    width: pxToRem(9.5),
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'var(--color-bg-secondary)',
                    borderRadius: RADIUS.sm,
                    margin: `${pxToRem(4)} 0`,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'var(--color-border-primary)',
                    borderRadius: RADIUS.sm,
                    border: `${BORDERS.thin} solid var(--color-bg-secondary)`,
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    background: 'var(--color-text-tertiary)',
                  },
                }}
              >
                <div
                  style={{
                    height: `${virtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  {virtualizer.getVirtualItems().map((virtualItem) => {
                    const task = tasks[virtualItem.index]
                    return (
                      <div
                        key={task.id}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: `${virtualItem.size}px`,
                          transform: `translateY(${virtualItem.start}px)`,
                          paddingBottom: pxToRem(16),
                        }}
                      >
                        <SortableCard id={task.id} task={task} />
                      </div>
                    )
                  })}
                </div>
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
                    'padding': `${pxToRem(4)} 0`,
                    'boxSizing': 'border-box',
                    '&::-webkit-scrollbar': {
                      width: pxToRem(9.5),
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'var(--color-bg-secondary)',
                      borderRadius: RADIUS.sm,
                      margin: `${pxToRem(4)} 0`,
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'var(--color-border-primary)',
                      borderRadius: RADIUS.sm,
                      border: `${BORDERS.thin} solid var(--color-bg-secondary)`,
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
