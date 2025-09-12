import { createEffect, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'

import { INITIAL_COLUMNS } from '@/shared/constants/kanban'
import type { Column as ColumnType } from '@/shared/constants/kanban'
import { $$notifications } from '@/shared/model'
import { logger } from '@/shared/lib/logger'

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
            logger.warn('Invalid date for task, using current date', {
              taskId: task.id,
              invalidDate: task.date,
            })
            date = new Date()
          }
        }
      } catch (error) {
        logger.error('Error parsing date for task', error as Error, {
          taskId: task.id,
          date: task.date,
        })
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
  logger.error('Failed to save tasks', error, { operation: 'saveToStorage' })
  $$notifications.showError(
    'Ошибка сохранения',
    'Не удалось сохранить данные канбан доски',
  )
})

loadFromStorageFx.fail.watch(({ error }) => {
  logger.error('Failed to load tasks', error, { operation: 'loadFromStorage' })
  $$notifications.showError(
    'Ошибка загрузки',
    'Не удалось загрузить данные канбан доски',
  )
})
