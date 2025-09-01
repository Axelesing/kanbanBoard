export type Chip = { label: string; status: string }
export type Task = { id: string; title: string; chip: Chip }
export type Column = { id: string; title: string; tasks: Task[] }

export const INITIAL_COLUMNS: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      {
        id: '1',
        title: 'Задача 1',
        chip: {
          label: 'To do',
          status: 'system',
        },
      },
      {
        id: '2',
        title: 'Задача 2',
        chip: {
          label: 'To do',
          status: 'system',
        },
      },
      {
        id: '3',
        title: 'Задача 3',
        chip: {
          label: 'To do',
          status: 'system',
        },
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      {
        id: '4',
        title: 'Задача 4',
        chip: {
          label: 'In Progress',
          status: 'normal',
        },
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      {
        id: '5',
        title: 'Задача 5',
        chip: {
          label: 'Done',
          status: 'success',
        },
      },
    ],
  },
]
