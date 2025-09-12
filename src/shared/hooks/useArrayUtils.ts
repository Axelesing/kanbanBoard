import { useMemo, useCallback } from 'react'

/**
 * Хук для работы с массивами и поиска элементов
 */
export function useArrayUtils<T>(items: T[]) {
  const findById = useCallback(
    (id: string | number, idField: keyof T = 'id' as keyof T) => {
      return items.find((item) => String(item[idField]) === String(id))
    },
    [items],
  )

  const findIndexById = useCallback(
    (id: string | number, idField: keyof T = 'id' as keyof T) => {
      return items.findIndex((item) => String(item[idField]) === String(id))
    },
    [items],
  )

  const findByField = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      return items.find((item) => item[field] === value)
    },
    [items],
  )

  const filterByField = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      return items.filter((item) => item[field] === value)
    },
    [items],
  )

  const groupBy = useCallback(
    <K extends keyof T>(field: K) => {
      return items.reduce(
        (groups, item) => {
          const key = String(item[field])
          if (!groups[key]) {
            groups[key] = []
          }
          groups[key].push(item)
          return groups
        },
        {} as Record<string, T[]>,
      )
    },
    [items],
  )

  const stats = useMemo(
    () => ({
      total: items.length,
      isEmpty: items.length === 0,
      isNotEmpty: items.length > 0,
    }),
    [items.length],
  )

  return {
    findById,
    findIndexById,
    findByField,
    filterByField,
    groupBy,
    stats,
  }
}
