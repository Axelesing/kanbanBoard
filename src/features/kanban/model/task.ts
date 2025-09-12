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
    let sourceColumnId: string | null = null

    const newData = data.map((col) => {
      const tasks = col.tasks.map((t) => {
        if (t.id === id) {
          sourceColumnId = col.id
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
          return updatedTask
        }
        return t
      })
      return { ...col, tasks }
    })

    if (!updatedTask || !sourceColumnId) return data

    const targetStatus: TaskStatus = status ?? (updatedTask as Task).status
    const targetColumnId = targetStatus

    if (sourceColumnId === targetColumnId) {
      return newData
    }

    return newData.map((col) => {
      if (col.id === sourceColumnId) {
        return {
          ...col,
          tasks: col.tasks.filter((t) => t.id !== id),
        }
      } else if (col.id === targetColumnId) {
        return {
          ...col,
          tasks: [...col.tasks, updatedTask!],
        }
      }
      return col
    })
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
