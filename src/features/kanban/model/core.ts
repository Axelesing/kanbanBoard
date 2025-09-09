import { createEffect, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'

import { INITIAL_COLUMNS } from '@/constants/kanban'
import type { Column as ColumnType } from '@/constants/kanban'
import { $$notifications } from '@/shared/model'

export const kanbanGate = createGate('kanban')

// --- effects
const loadFromStorageFx = createEffect(() => {
  const data = JSON.parse(
    localStorage.getItem('kanbanData') || INITIAL_COLUMNS,
  ) as ColumnType[]

  return data.map((column) => ({
    ...column,
    tasks: column.tasks.map((task) => {
      let date: Date

      try {
        if (task.date instanceof Date) {
          date = task.date
        } else {
          date = new Date(task.date)

          if (isNaN(date.getTime())) {
            console.warn(
              `Invalid date for task ${task.id}: ${task.date}, using current date`,
            )
            date = new Date()
          }
        }
      } catch (error) {
        console.error(`Error parsing date for task ${task.id}:`, error)
        date = new Date()
      }

      return {
        ...task,
        date,
      }
    }),
  }))
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
  $$notifications.showError(
    'Ошибка сохранения',
    'Не удалось сохранить данные канбан доски',
  )
})

loadFromStorageFx.fail.watch(({ error }) => {
  console.error('Failed to load tasks:', error)
  $$notifications.showError(
    'Ошибка загрузки',
    'Не удалось загрузить данные канбан доски',
  )
})
