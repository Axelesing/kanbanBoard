import { Column } from '@/shared/constants/kanban'

interface FindTaskIndexesProps {
  columns: Column[]
  activeId: string
  overId: string
}

export function findTaskIndexes({
  columns,
  activeId,
  overId,
}: FindTaskIndexesProps) {
  let sourceColIndex = -1
  let sourceTaskIndex = -1
  let targetColIndex = -1
  let targetTaskIndex = -1

  const findTask = (taskId: string) => {
    for (let i = 0; i < columns.length; i++) {
      const taskIndex = columns[i].tasks.findIndex((t) => t.id === taskId)
      if (taskIndex > -1) return { colIndex: i, taskIndex }
    }
    return null
  }

  const source = findTask(activeId)
  if (source) {
    sourceColIndex = source.colIndex
    sourceTaskIndex = source.taskIndex
  }

  const target = findTask(overId)
  if (target) {
    targetColIndex = target.colIndex
    targetTaskIndex = target.taskIndex
  } else {
    const colIndex = columns.findIndex((c) => c.id === overId)
    if (colIndex > -1) {
      targetColIndex = colIndex
      targetTaskIndex = 0
    }
  }

  return { sourceColIndex, sourceTaskIndex, targetColIndex, targetTaskIndex }
}
