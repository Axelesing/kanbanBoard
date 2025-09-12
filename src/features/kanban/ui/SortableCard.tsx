import { DragIndicator } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useUnit } from 'effector-react'

import type { Task } from '@/shared/constants/kanban'
import { TaskCard } from '@/shared/ui/TaskCard'
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
  const { id: taskId } = task
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = { transform: CSS.Transform.toString(transform), transition }

  const handleModal = () => {
    openModal(true)
    setTask(taskId)
  }

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      sx={{
        'position': 'relative',
        'mr': 1,
        '&:hover .drag-indicator': {
          opacity: 1,
        },
      }}
    >
      <TaskCard
        task={task}
        onClick={handleModal}
        aria-label={`Задача: ${task.title}. Нажмите для редактирования`}
      />
      <DragIndicator
        {...listeners}
        className="drag-indicator"
        sx={{
          'cursor': 'grab',
          'position': 'absolute',
          'top': 8,
          'right': 8,
          'color': 'var(--color-text-secondary)',
          'opacity': 0.3,
          'transition': 'opacity 0.2s ease-in-out',
          '&:hover': {
            opacity: 1,
          },
        }}
      />
    </Box>
  )
}
