import { BadgePropStatus } from '@consta/uikit/Badge'

import { Column } from '@/constants/kanban'

interface MoveTaskProps {
  columns: Column[]
  sourceColIndex: number
  sourceTaskIndex: number
  targetColIndex: number
  targetTaskIndex: number
}

const columnStatusMap: Record<
  string,
  { label: string; status: BadgePropStatus }
> = {
  'todo': { label: 'To do', status: 'system' },
  'in-progress': { label: 'In Progress', status: 'normal' },
  'done': { label: 'Done', status: 'success' },
}

export function moveTask({
  columns,
  sourceColIndex,
  sourceTaskIndex,
  targetColIndex,
  targetTaskIndex,
}: MoveTaskProps) {
  const newColumns = [...columns]

  const [movedTask] = newColumns[sourceColIndex].tasks.splice(
    sourceTaskIndex,
    1,
  )

  const targetColumnId = newColumns[targetColIndex].id
  const newChip = columnStatusMap[targetColumnId]
  const updatedTask = { ...movedTask, chip: newChip }

  newColumns[targetColIndex].tasks.splice(targetTaskIndex, 0, updatedTask)

  return newColumns
}
