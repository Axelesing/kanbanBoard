import { Column } from '@/constants/kanban'
import { BadgePropStatus, TaskStatus } from '@/constants/kanban/data'

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
  toDo: { label: 'To do', status: 'system' },
  inProgress: { label: 'In Progress', status: 'normal' },
  done: { label: 'Done', status: 'success' },
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

  const updatedTask = {
    ...movedTask,
    chip: newChip,
    status: targetColumnId as TaskStatus,
  }

  newColumns[targetColIndex].tasks.splice(targetTaskIndex, 0, updatedTask)

  return newColumns
}
