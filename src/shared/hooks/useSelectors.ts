import { useMemo } from 'react'
import type { Task, Column } from '@/shared/constants/kanban'

/**
 * Хук для создания селектора задач по статусу
 */
export function useTasksByStatus(tasks: Task[], status: string) {
  return useMemo(
    () => tasks.filter((task) => task.status === status),
    [tasks, status],
  )
}

/**
 * Хук для создания селектора задач по пользователю
 */
export function useTasksByUser(tasks: Task[], userId: number | null) {
  return useMemo(
    () => tasks.filter((task) => task.user?.id === userId),
    [tasks, userId],
  )
}

/**
 * Хук для создания селектора задач по поисковому запросу
 */
export function useTasksBySearch(tasks: Task[], searchQuery: string) {
  return useMemo(() => {
    if (!searchQuery.trim()) return tasks

    const query = searchQuery.toLowerCase()
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query) ||
        task.user?.label.toLowerCase().includes(query),
    )
  }, [tasks, searchQuery])
}

/**
 * Хук для создания селектора колонки по ID
 */
export function useColumnById(columns: Column[], columnId: string) {
  return useMemo(
    () => columns.find((col) => col.id === columnId),
    [columns, columnId],
  )
}

/**
 * Хук для создания селектора задач в колонке
 */
export function useTasksInColumn(columns: Column[], columnId: string) {
  return useMemo(() => {
    const column = columns.find((col) => col.id === columnId)
    return column?.tasks || []
  }, [columns, columnId])
}

/**
 * Хук для создания селектора статистики задач
 */
export function useTaskStats(tasks: Task[]) {
  return useMemo(() => {
    const stats = {
      total: tasks.length,
      byStatus: {} as Record<string, number>,
      byUser: {} as Record<string, number>,
      completed: 0,
      overdue: 0,
    }

    tasks.forEach((task) => {
      stats.byStatus[task.status] = (stats.byStatus[task.status] || 0) + 1

      if (task.user) {
        stats.byUser[task.user.label] = (stats.byUser[task.user.label] || 0) + 1
      }

      if (task.status === 'done') {
        stats.completed++
      }

      if (task.status !== 'done' && new Date(task.date) < new Date()) {
        stats.overdue++
      }
    })

    return stats
  }, [tasks])
}
