import React, { memo, useMemo } from 'react'
import { List } from 'react-window'
import { Box } from '@mui/material'

export interface VirtualizedListProps<T> {
  items: T[]
  height: number
  itemHeight: number
  renderItem: (props: {
    index: number
    style: React.CSSProperties
    item: T
  }) => React.ReactNode
  className?: string
  listProps?: Partial<React.ComponentProps<typeof List>>
}

/**
 * Виртуализированный список
 */
function VirtualizedListBase<T>({
  items,
  height,
  itemHeight,
  renderItem,
  className,
  listProps = {},
}: VirtualizedListProps<T>) {
  const RowComponent = useMemo(() => {
    return memo(
      ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const item = items[index]
        return renderItem({ index, style, item })
      },
    )
  }, [items, renderItem])

  RowComponent.displayName = 'RowComponent'

  if (items.length === 0) {
    return (
      <Box className={className} sx={{ height }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          Нет элементов для отображения
        </Box>
      </Box>
    )
  }

  return (
    <Box
      className={className}
      sx={{
        height,
      }}
    >
      <List
        rowComponent={RowComponent}
        rowCount={items.length}
        rowHeight={itemHeight}
        rowProps={{ items }}
        {...listProps}
      />
    </Box>
  )
}

const VirtualizedListComponent = memo(VirtualizedListBase)
VirtualizedListComponent.displayName = 'VirtualizedList'

export const VirtualizedList = VirtualizedListComponent as <T>(
  props: VirtualizedListProps<T>,
) => React.JSX.Element
