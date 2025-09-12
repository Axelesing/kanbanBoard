import { useMemo, useCallback, useRef, useEffect, useState } from 'react'

/**
 * Хук для предотвращения лишних ре-рендеров
 */
export function useStableCallback<T extends (...args: never[]) => unknown>(
  callback: T,
  deps: React.DependencyList,
): T {
  const callbackRef = useRef(callback)
  const depsRef = useRef(deps)

  useEffect(() => {
    callbackRef.current = callback
    depsRef.current = deps
  }, [callback, deps])

  return useCallback(
    ((...args: Parameters<T>) => callbackRef.current(...args)) as T,
    [],
  )
}

/**
 * Хук для мемоизации объектов
 */
export function useStableObject<T extends Record<string, unknown>>(
  obj: T,
  deps: React.DependencyList,
): T {
  return useMemo(() => obj, deps)
}

/**
 * Хук для мемоизации массивов
 */
export function useStableArray<T>(arr: T[], deps: React.DependencyList): T[] {
  return useMemo(() => arr, deps)
}

/**
 * Хук для создания стабильных пропсов
 */
export function useStableProps<T extends Record<string, unknown>>(
  props: T,
  deps: React.DependencyList,
): T {
  return useMemo(() => props, deps)
}

/**
 * Хук для оптимизации обработчиков событий
 */
export function useEventHandlers<
  T extends Record<string, (...args: never[]) => unknown>,
>(handlers: T, deps: React.DependencyList): T {
  return useMemo(() => {
    const stableHandlers = {} as T
    for (const [key, handler] of Object.entries(handlers)) {
      stableHandlers[key as keyof T] = useCallback(handler, deps) as T[keyof T]
    }
    return stableHandlers
  }, deps)
}

/**
 * Хук для создания виртуального скролла
 */
export function useVirtualScroll<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan: number = 5,
) {
  const [scrollTop, setScrollTop] = useState(0)

  const visibleRange = useMemo(() => {
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / itemHeight) - overscan,
    )
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan,
    )
    return { startIndex, endIndex }
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan])

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex + 1)
  }, [items, visibleRange])

  const totalHeight = items.length * itemHeight
  const offsetY = visibleRange.startIndex * itemHeight

  return {
    visibleItems,
    totalHeight,
    offsetY,
    setScrollTop,
    visibleRange,
  }
}

/**
 * Хук для ленивой загрузки данных
 */
export function useLazyData<T>(
  fetchFn: () => Promise<T>,
  deps: React.DependencyList,
  options: {
    initialData?: T
    enabled?: boolean
  } = {},
) {
  const [data, setData] = useState<T | undefined>(options.initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const { enabled = true } = options

  useEffect(() => {
    if (!enabled) return

    setLoading(true)
    setError(null)

    fetchFn()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, deps)

  return { data, loading, error }
}
