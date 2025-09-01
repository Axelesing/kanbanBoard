import { createEvent, createStore, sample } from 'effector'

import { INITIAL_COLUMNS } from '@/constants/kanban'
import type { Column as ColumnType } from '@/constants/kanban'

import { createNewTask } from '../lib/createNewTask'

export const kanbanDataSet = createEvent<ColumnType[]>()
export const taskAdd = createEvent()

export const $kanbanData = createStore<ColumnType[]>(INITIAL_COLUMNS).on(
  kanbanDataSet,
  (_, data) => data,
)

sample({
  clock: taskAdd,
  source: $kanbanData,
  fn: (data) => {
    const newTask = createNewTask(data)

    return data.map((col) =>
      col.id === 'todo' ? { ...col, tasks: [...col.tasks, newTask] } : col,
    )
  },
  target: $kanbanData,
})
