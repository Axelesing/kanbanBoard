import { $kanbanData, kanbanDataSet, kanbanGate } from './core'
import { taskAdd, taskUpdate, taskRemove } from './task'

// --- exports
export const $$kanban = {
  kanbanDataSet,
  taskAdd,
  taskUpdate,
  taskRemove,
  $kanbanData,
  kanbanGate,
}
