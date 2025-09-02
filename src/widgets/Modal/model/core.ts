import { createEvent, createStore, combine } from 'effector'

import type { Task } from '@/constants/kanban'
import { $$kanban } from '@/features/kanban'

const modalViewSet = createEvent<boolean>()

const modalTaskSet = createEvent<string | null>()

const $isViewModal = createStore(false).on(modalViewSet, (_, v) => v)

const $selectedTaskId = createStore<string | null>(null).on(
  modalTaskSet,
  (_, id) => id,
)

const $selectedTask = combine(
  $$kanban.$kanbanData,
  $selectedTaskId,
  (columns, taskId): Task | null => {
    if (!taskId) return null
    for (const col of columns) {
      const found = col.tasks.find((t) => t.id === taskId)
      if (found) return found
    }
    return null
  },
)

export const $$modal = {
  modalViewSet,
  modalTaskSet,
  $isViewModal,
  $selectedTask,
}
