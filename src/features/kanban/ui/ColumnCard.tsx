import type { Task } from '@/shared/constants/kanban'
import { TaskCard } from '@/shared/ui'

export function ColumnCard({
  task,
  ...props
}: {
  task: Task
} & React.ComponentPropsWithoutRef<'div'>) {
  return (
    <TaskCard
      task={task}
      {...props}
      className="drag-overlay"
      style={{
        opacity: 0.9,
        transform: 'rotate(5deg)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
      }}
    />
  )
}
