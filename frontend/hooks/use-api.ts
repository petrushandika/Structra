/**
 * API Hooks
 */

import { useState, useCallback } from 'react'
import { api } from '@/lib/api'
import type { ApiResponse } from '@/types'

interface UseApiOptions {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

export function useApi<T = any>(options?: UseApiOptions) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<T | null>(null)

  const execute = useCallback(
    async (requestFn: () => Promise<ApiResponse<T>>) => {
      setLoading(true)
      setError(null)

      try {
        const response = await requestFn()

        if (response.success && response.data) {
          setData(response.data)
          options?.onSuccess?.(response.data)
          return response.data
        } else {
          const errorMessage = response.error?.message || 'An error occurred'
          setError(errorMessage)
          options?.onError?.(response.error)
          throw new Error(errorMessage)
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred'
        setError(errorMessage)
        options?.onError?.(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [options]
  )

  const reset = useCallback(() => {
    setLoading(false)
    setError(null)
    setData(null)
  }, [])

  return {
    loading,
    error,
    data,
    execute,
    reset,
  }
}

