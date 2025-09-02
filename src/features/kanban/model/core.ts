import { createEffect, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'

import { INITIAL_COLUMNS } from '@/constants/kanban'
import type { Column as ColumnType } from '@/constants/kanban'

import { createNewTask } from '../lib'

const kanbanGate = createGate('kanban')

// --- effects
const loadFromStorageFx = createEffect(() => {
  return (
    (JSON.parse(
      localStorage.getItem('kanbanData') || INITIAL_COLUMNS,
    ) as ColumnType[]) || []
  )
})

const saveToStorageFx = createEffect((todos: ColumnType[]) => {
  localStorage.setItem('kanbanData', JSON.stringify(todos))
})

// --- events
const kanbanDataSet = createEvent<ColumnType[]>()
const taskAdd = createEvent()
const taskUpdate = createEvent<{ id: string; title: string }>()

// --- store
const $kanbanData = createStore<ColumnType[]>([]).on(
  [kanbanDataSet, loadFromStorageFx.doneData],
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
  target: [$kanbanData, saveToStorageFx],
})

sample({
  clock: taskUpdate,
  source: $kanbanData,
  fn: (data, { id, title }) =>
    data.map((col) => ({
      ...col,
      tasks: col.tasks.map((t) => (t.id === id ? { ...t, title } : t)),
    })),
  target: [$kanbanData, saveToStorageFx],
})

sample({
  clock: kanbanDataSet,
  target: saveToStorageFx,
})

sample({
  clock: kanbanGate.open,
  target: loadFromStorageFx,
})

saveToStorageFx.fail.watch(({ error }) => {
  console.error('Failed to save tasks:', error)
})

loadFromStorageFx.fail.watch(({ error }) => {
  console.error('Failed to load tasks:', error)
})

export const $$kanban = {
  kanbanDataSet,
  taskAdd,
  taskUpdate,
  $kanbanData,
  kanbanGate,
}
