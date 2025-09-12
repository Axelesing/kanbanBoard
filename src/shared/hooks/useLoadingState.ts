import { useState, useCallback, useMemo } from 'react'

interface UseLoadingStateOptions {
  initialLoading?: boolean
  autoReset?: boolean
  resetDelay?: number
}

/**
 * Хук для управления состоянием загрузки
 */
export function useLoadingState(options: UseLoadingStateOptions = {}) {
  const {
    initialLoading = false,
    autoReset = false,
    resetDelay = 1000,
  } = options

  const [isLoading, setIsLoading] = useState(initialLoading)
  const [error, setError] = useState<string | null>(null)

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading)
    if (loading) {
      setError(null)
    }
  }, [])

  const setErrorState = useCallback((errorMessage: string | null) => {
    setError(errorMessage)
    if (errorMessage) {
      setIsLoading(false)
    }
  }, [])

  const executeWithLoading = useCallback(
    async <T>(operation: () => Promise<T>): Promise<T | null> => {
      setLoading(true)
      setError(null)

      try {
        const result = await operation()
        return result
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Произошла ошибка'
        setErrorState(errorMessage)
        return null
      } finally {
        if (autoReset) {
          setTimeout(() => setLoading(false), resetDelay)
        } else {
          setLoading(false)
        }
      }
    },
    [setLoading, setErrorState, autoReset, resetDelay],
  )

  const reset = useCallback(() => {
    setIsLoading(false)
    setError(null)
  }, [])

  const state = useMemo(
    () => ({
      isLoading,
      error,
      isError: !!error,
      isSuccess: !isLoading && !error,
    }),
    [isLoading, error],
  )

  return {
    ...state,
    setLoading,
    setError: setErrorState,
    executeWithLoading,
    reset,
  }
}
