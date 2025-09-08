import { badgePropStatus } from '@consta/uikit/Badge'

import type { Column as ColumnType, Task } from '@/constants/kanban'

export function createNewTask(columns: ColumnType[]): Task {
  const allTaskIds = columns.flatMap((col) =>
    col.tasks.map((task) => Number(task.id)),
  )
  const maxId = allTaskIds.length > 0 ? Math.max(...allTaskIds) : 0

  return {
    id: String(maxId + 1),
    title: `Задача ${String(maxId + 1)}`,
    date: new Date(),
    status: 'toDo',
    chip: {
      label: 'To Do',
      status: badgePropStatus[4],
    },
  }
}
