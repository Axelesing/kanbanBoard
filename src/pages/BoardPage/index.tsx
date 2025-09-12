import { lazy, Suspense } from 'react'
import { OptimizedBoard } from '@/features/kanban/ui/OptimizedBoard'

const TaskModal = lazy(() =>
  import('@/widgets/Modal').then((mod) => ({ default: mod.TaskModal })),
)

export function BoardPage() {
  return (
    <>
      <OptimizedBoard />
      <Suspense fallback={null}>
        <TaskModal />
      </Suspense>
    </>
  )
}
