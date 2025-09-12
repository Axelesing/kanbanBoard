import React from 'react'
import { useCallback, useRef, useEffect, useMemo } from 'react'
import { logger } from '@/shared/lib/logger'

/**
 * Хук для debounce функции
 */
export function useDebounce<T extends (...args: never[]) => unknown>(
  callback: T,
  delay: number,
): T {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay],
  ) as T

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return debouncedCallback
}

/**
 * Хук для throttle функции
 */
export function useThrottle<T extends (...args: never[]) => unknown>(
  callback: T,
  delay: number,
): T {
  const lastCallRef = useRef<number>(0)
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now()

      if (now - lastCallRef.current >= delay) {
        lastCallRef.current = now
        callback(...args)
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(
          () => {
            lastCallRef.current = Date.now()
            callback(...args)
          },
          delay - (now - lastCallRef.current),
        )
      }
    },
    [callback, delay],
  ) as T

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return throttledCallback
}

/**
 * Хук для мемоизации тяжелых вычислений
 */
export function useHeavyComputation<T>(
  computeFn: () => T,
  deps: React.DependencyList,
): T {
  return useMemo(() => {
    const start = performance.now()
    const result = computeFn()
    const end = performance.now()

    if (process.env.NODE_ENV === 'development') {
      logger.debug(`Heavy computation took ${end - start} milliseconds`)
    }

    return result
  }, deps)
}

/**
 * Хук для ленивой загрузки компонентов
 */
export function useLazyComponent<
  T extends React.ComponentType<Record<string, unknown>>,
>(importFn: () => Promise<{ default: T }>, fallback?: React.ComponentType) {
  const [Component, setComponent] = React.useState<T | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  useEffect(() => {
    importFn()
      .then((module) => {
        setComponent(() => module.default)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [importFn])

  if (loading) {
    return fallback ? React.createElement(fallback) : null
  }

  if (error) {
    logger.error('Failed to load component', error)
    return null
  }

  return Component
}

/**
 * Хук для оптимизации рендеринга списков
 */
export function useOptimizedList<T>(
  items: T[],
  keyExtractor: (item: T, index: number) => string | number,
  options: {
    maxItems?: number
    filterFn?: (item: T) => boolean
    sortFn?: (a: T, b: T) => number
  } = {},
) {
  const { maxItems, filterFn, sortFn } = options

  return useMemo(() => {
    let processedItems = items

    if (filterFn) {
      processedItems = processedItems.filter(filterFn)
    }

    if (sortFn) {
      processedItems = [...processedItems].sort(sortFn)
    }

    if (maxItems && processedItems.length > maxItems) {
      processedItems = processedItems.slice(0, maxItems)
    }

    return processedItems.map((item, index) => ({
      item,
      key: keyExtractor(item, index),
      index,
    }))
  }, [items, keyExtractor, filterFn, sortFn, maxItems])
}
