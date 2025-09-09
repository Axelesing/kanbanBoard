import { IconDraggable } from '@consta/icons/IconDraggable'
import { Avatar } from '@consta/uikit/Avatar'
import { Badge } from '@consta/uikit/Badge'
import { Card } from '@consta/uikit/Card'
import { cnMixFlex } from '@consta/uikit/MixFlex'
import { Text } from '@consta/uikit/Text'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useUnit } from 'effector-react'
import sc from 'styled-components'

import type { Task } from '@/shared/constants/kanban'
import { borderRadius, mediumPadding } from '@/shared/constants/styles'
import { $$modal } from '@/widgets/Modal'

interface SortableCardProps {
  id: string
  task: Task
}

export function SortableCard({ id, task }: SortableCardProps) {
  const [openModal, setTask] = useUnit([
    $$modal.modalViewSet,
    $$modal.modalTaskSet,
  ])
  const { id: taskId, chip, title } = task
  const user = task?.user
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = { transform: CSS.Transform.toString(transform), transition }

  const handleModal = () => {
    openModal(true)
    setTask(taskId)
  }

  return (
    <StyledCard
      ref={setNodeRef}
      style={style}
      {...attributes}
      horizontalSpace="3xl"
      verticalSpace="3xl"
      onClick={handleModal}
    >
      <div
        className={cnMixFlex({ direction: 'row', justify: 'space-between' })}
      >
        <div
          className={cnMixFlex({ direction: 'row', justify: 'space-between' })}
          style={{ flex: 1, minWidth: 0 }}
        >
          <StyledText size="l" lineHeight="m">
            {title}
          </StyledText>
          {!!user && (
            <Avatar
              style={{ minWidth: 32 }}
              name={user.label}
              url={user.avatarUrl}
            />
          )}
        </div>
        <IconDraggable
          size="l"
          {...listeners}
          style={{ cursor: 'grab', marginLeft: 8 }}
        />
      </div>
      <Badge size="s" status={chip.status} label={chip.label} />
    </StyledCard>
  )
}

const StyledCard = sc(Card)`
  background-color: white;
  border: 1px solid;
  cursor: pointer;
  user-select: none;
  border-radius: ${borderRadius};
  padding: ${mediumPadding};

  @media (max-width: 768px) {
    padding: 12px;
  }
`

const StyledText = sc(Text)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`
