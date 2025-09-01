import type { Column as ColumnType } from '@/constants/kanban'

export function createNewTask(columns: ColumnType[]) {
  const allTaskIds = columns.flatMap((col) =>
    col.tasks.map((task) => Number(task.id)),
  )

  const maxId = allTaskIds.length > 0 ? Math.max(...allTaskIds) : 0

  return {
    id: String(maxId + 1),
    title: `Задача ${String(maxId + 1)}`,
    chip: {
      label: 'To do',
      status: 'system',
    },
  }
}
