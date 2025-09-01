import { createEvent, createStore, combine } from 'effector'

import type { Task } from '@/constants/kanban'
import { $kanbanData } from '@/features/kanban/model/core'

export const modalViewSet = createEvent<boolean>()

export const modalTaskSet = createEvent<string | null>()

export const $isViewModal = createStore(false).on(modalViewSet, (_, v) => v)

export const $selectedTaskId = createStore<string | null>(null).on(
  modalTaskSet,
  (_, id) => id,
)

export const $selectedTask = combine(
  $kanbanData,
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

$selectedTask.watch((test) => console.log(JSON.stringify(test, null, 2)))
