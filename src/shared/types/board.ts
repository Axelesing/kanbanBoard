import type { Task } from '@/shared/constants/kanban'

/**
 * Колонка канбан доски
 */
export interface Column {
  id: string
  title: string
  tasks: Task[]
}

/**
 * Состояние фильтрации
 */
export interface FilterState {
  searchQuery: string
  status: string | null
  user: number | null
}

/**
 * Пропсы для компонентов досок
 */
export interface BoardComponentProps {
  columns: Column[]
  totalTasks: number
  showFilter?: boolean
  onToggleFilter?: () => void
  onAddTask?: (task: Task) => void
}

/**
 * Пропсы для drag операций
 */
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core'

export interface DragHandlers {
  onDragStart: (event: DragStartEvent) => void
  onDragEnd: (event: DragEndEvent) => void
  onDragCancel: () => void
}
