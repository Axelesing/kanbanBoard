import { createEffect, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'

import { INITIAL_COLUMNS } from '@/constants/kanban'
import type { Column as ColumnType } from '@/constants/kanban'

export const kanbanGate = createGate('kanban')

// --- effects
const loadFromStorageFx = createEffect(() => {
  return (
    (JSON.parse(
      localStorage.getItem('kanbanData') || INITIAL_COLUMNS,
    ) as ColumnType[]) || []
  )
})

export const saveToStorageFx = createEffect((todos: ColumnType[]) => {
  localStorage.setItem('kanbanData', JSON.stringify(todos))
})

// --- events
export const kanbanDataSet = createEvent<ColumnType[]>()

// --- store
export const $kanbanData = createStore<ColumnType[]>([]).on(
  [kanbanDataSet, loadFromStorageFx.doneData],
  (_, data) => data,
)

// --- samples
sample({
  clock: kanbanGate.open,
  target: loadFromStorageFx,
})

sample({
  clock: kanbanDataSet,
  target: saveToStorageFx,
})

// --- watchers
saveToStorageFx.fail.watch(({ error }) => {
  console.error('Failed to save tasks:', error)
})

loadFromStorageFx.fail.watch(({ error }) => {
  console.error('Failed to load tasks:', error)
})
