import { BadgePropStatus } from '@consta/uikit/Badge'

import { Item } from '@/shared/ui/select/UserSelect'

type Chip = { label: string; status: BadgePropStatus }

export type Task = {
  id: string
  title: string
  description?: string
  chip: Chip
  user?: Item | null
  date: Date
}

export type Column = { id: string; title: string; tasks: Task[] }

export const STATUSES = {
  toDo: {
    id: 'todo',
    title: 'To Do',
    label: 'To Do',
  },
  inProgress: {
    id: 'in-progress',
    title: 'In Progress',
    label: 'In Progress',
  },
  done: {
    id: 'done',
    title: 'Done',
    label: 'Done',
  },
}

export const STATUSES_SELECT = [
  { ...STATUSES.toDo },
  { ...STATUSES.inProgress },
  { ...STATUSES.done },
]

export const INITIAL_COLUMNS = JSON.stringify([
  {
    id: STATUSES.toDo.id,
    title: STATUSES.toDo.title,
    tasks: [
      {
        id: '1',
        title: 'Задача 1',
        description: 'Описание задачи',
        date: new Date(),
        chip: {
          label: 'To do',
          status: 'system',
        },
      },
      {
        id: '2',
        title: 'Задача 2',
        description: 'Описание задачи',
        date: new Date(),
        chip: {
          label: 'To do',
          status: 'system',
        },
      },
      {
        id: '3',
        title: 'Задача 3',
        description: 'Описание задачи',
        date: new Date(),
        chip: {
          label: 'To do',
          status: 'system',
        },
      },
    ],
  },
  {
    id: STATUSES.inProgress.id,
    title: STATUSES.inProgress.id,
    tasks: [
      {
        id: '4',
        title: 'Задача 4',
        description: 'Описание задачи',
        date: new Date(),
        chip: {
          label: 'In Progress',
          status: 'normal',
        },
      },
    ],
  },
  {
    id: STATUSES.done.id,
    title: STATUSES.done.id,
    tasks: [
      {
        id: '5',
        title: 'Задача 5',
        date: new Date(),
        chip: {
          label: 'Done',
          status: 'success',
        },
      },
    ],
  },
])

export const USERS = [
  {
    label: 'Андрей Андреев',
    subLabel: 'andrey@gmail.com',
    id: 1,
  },
  {
    label: 'Иван Иванов',
    subLabel: 'ivan@gmail.com',
    id: 2,
  },
  {
    label: 'Егор Егоров',
    subLabel: 'igor@icloud.com',
    avatarUrl: 'https://avatars.githubusercontent.com/u/13190808?v=4',
    id: 3,
  },
]
