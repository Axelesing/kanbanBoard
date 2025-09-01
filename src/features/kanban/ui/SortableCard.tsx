import { Avatar } from '@consta/uikit/Avatar'
import { Card } from '@consta/uikit/Card'
import { Chips } from '@consta/uikit/Chips'
import { cnMixFlex } from '@consta/uikit/MixFlex'
import { Text } from '@consta/uikit/Text'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useUnit } from 'effector-react'
import sc from 'styled-components'

import type { Task } from '@/constants/kanban'
import { borderRadius, mediumPadding } from '@/constants/styles'
import { modalTaskSet, modalViewSet } from '@/widgets/Modal/model/core'

interface SortableCardProps {
  id: string
  task: Task
}

export function SortableCard({ id, task }: SortableCardProps) {
  const [openModal, setTask] = useUnit([modalViewSet, modalTaskSet])
  const { id: taskId, chip, title } = task

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
          style={{ flex: 1 }}
        >
          <StyledText size="l" lineHeight="m">
            {title}
          </StyledText>
          <Avatar name="Test Name" />
        </div>
        <span {...listeners} style={{ cursor: 'grab', marginLeft: 8 }}>
          ⇅
        </span>
      </div>
      <Chips size="xs" items={[chip]} />
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
`

const StyledText = sc(Text)`
  align-self: center;
`
