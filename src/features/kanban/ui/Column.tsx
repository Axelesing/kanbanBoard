import { Card } from '@consta/uikit/Card'
import { Text } from '@consta/uikit/Text'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import sc from 'styled-components'

import type { Column as ColumnType } from '@/shared/constants/kanban'
import { borderRadius, mediumPadding } from '@/shared/constants/styles'
import { convertPxToRem } from '@/shared/lib'

import { SortableCard } from './SortableCard'

export function Column({ id, title, tasks }: ColumnType) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <StyledColumn
      ref={setNodeRef}
      verticalSpace="l"
      horizontalSpace="l"
      isOver={isOver}
    >
      <Text size="m" weight="bold">
        {title}
      </Text>

      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <SortableCard key={task.id} id={task.id} task={task} />
        ))}
      </SortableContext>
    </StyledColumn>
  )
}

const StyledColumn = sc(Card)<{ isOver?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${convertPxToRem(400)};
  border: 1px solid;
  border-radius: ${borderRadius};
  padding: ${mediumPadding};
  gap: ${mediumPadding};
  background-color: ${({ isOver }) => (isOver ? '#f5f5f5' : 'white')};

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
`
