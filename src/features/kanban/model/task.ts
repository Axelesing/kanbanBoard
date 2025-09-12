import { createEvent, sample } from 'effector'

import { Task } from '@/shared/constants/kanban'
import {
  TaskStatus,
  STATUSES,
  statusToBadge,
} from '@/shared/constants/kanban/data'
import { Item } from '@/features/taskModal'

import { $kanbanData, saveToStorageFx } from './core'

// --- events
export const taskAdd = createEvent<Task>()
export const taskRemove = createEvent<{ id: string }>()
export const taskUpdate = createEvent<{
  id: string
  title: string
  description: string | undefined
  user?: Item | null
  status: TaskStatus
}>()
export const taskStatusChange = createEvent<{
  id: string
  status: TaskStatus
}>()

// --- samples
sample({
  clock: taskAdd,
  source: $kanbanData,
  fn: (data, newTask) => {
    return data.map((col) =>
      col.id === newTask.status
        ? { ...col, tasks: [...col.tasks, newTask] }
        : col,
    )
  },
  target: [$kanbanData, saveToStorageFx],
})

sample({
  clock: taskUpdate,
  source: $kanbanData,
  fn: (data, { id, title, description, user, status }) => {
    let updatedTask: Task | null = null

    const newData = data.map((col) => {
      const tasks = col.tasks.filter((t) => {
        if (t.id === id) {
          updatedTask = {
            ...t,
            title,
            description,
            user,
            status: status ?? t.status,
            chip: {
              label: STATUSES[status ?? t.status].label,
              status: statusToBadge[status ?? t.status],
            },
          }
          return false
        }
        return true
      })
      return { ...col, tasks }
    })

    if (!updatedTask) return data

    return newData.map((col) =>
      col.id === (status ?? updatedTask!.status)
        ? { ...col, tasks: [...col.tasks, updatedTask!] }
        : col,
    )
  },
  target: [$kanbanData, saveToStorageFx],
})

sample({
  clock: taskRemove,
  source: $kanbanData,
  fn: (data, { id }) =>
    data.map((col) => ({
      ...col,
      tasks: col.tasks.filter((t) => t.id !== id),
    })),
  target: [$kanbanData, saveToStorageFx],
})
