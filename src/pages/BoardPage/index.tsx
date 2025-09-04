import { Board } from '@/features/kanban'
import { TaskModal } from '@/widgets/Modal'

export function BoardPage() {
  return (
    <>
      <Board />
      <TaskModal />
    </>
  )
}
