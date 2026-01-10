/**
 * Error Handler Composable
 * Provides standardized error handling across the application
 */
import { ref, type Ref } from 'vue'
import type { AsyncResult } from '@/types'

// Global error state
const globalError = ref<string | null>(null)
const isLoading = ref<boolean>(false)

interface HandleAsyncOptions<T> {
    onSuccess?: (data: T) => void
    onError?: (error: Error) => void
    showGlobalError?: boolean
    loadingState?: boolean
}

interface UseErrorHandlerReturn {
    error: Ref<string | null>
    loading: Ref<boolean>
    globalError: Ref<string | null>
    isLoading: Ref<boolean>
    handleAsync: <T>(asyncFn: () => Promise<T>, options?: HandleAsyncOptions<T>) => Promise<AsyncResult<T>>
    clearError: () => void
}

/**
 * Composable for handling async operations with error management
 */
export const useErrorHandler = (): UseErrorHandlerReturn => {
    const error = ref<string | null>(null)
    const loading = ref<boolean>(false)

    const handleAsync = async <T>(
        asyncFn: () => Promise<T>,
        options: HandleAsyncOptions<T> = {}
    ): Promise<AsyncResult<T>> => {
        const {
            onSuccess = null,
            onError = null,
            showGlobalError = true,
            loadingState = true
        } = options

        try {
            if (loadingState) {
                loading.value = true
                isLoading.value = true
            }
            error.value = null

            const result = await asyncFn()

            if (onSuccess) onSuccess(result)
            return { success: true, data: result }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
            error.value = errorMessage

            if (showGlobalError) {
                globalError.value = errorMessage
                // Auto-clear global error after 5 seconds
                setTimeout(() => {
                    globalError.value = null
                }, 5000)
            }

            if (onError && err instanceof Error) onError(err)
            console.error('[Error Handler]:', err)

            return { success: false, error: errorMessage }
        } finally {
            if (loadingState) {
                loading.value = false
                isLoading.value = false
            }
        }
    }

    const clearError = (): void => {
        error.value = null
    }

    return {
        error,
        loading,
        globalError,
        isLoading,
        handleAsync,
        clearError
    }
}

/**
 * Simple wrapper for try-catch in components
 * Usage: const result = await safeAsync(() => api.fetchData())
 */
export const safeAsync = async <T>(fn: () => Promise<T>): Promise<AsyncResult<T>> => {
    try {
        const result = await fn()
        return { success: true, data: result }
    } catch (error) {
        console.error('[Safe Async Error]:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Operation failed'
        }
    }
}
