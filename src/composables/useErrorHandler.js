/**
 * Error Handler Composable
 * Provides standardized error handling across the application
 */
import { ref } from 'vue'

// Global error state (could be enhanced with a toast library)
const globalError = ref(null)
const isLoading = ref(false)

/**
 * Wraps an async function with error handling
 * @param {Function} asyncFn - The async function to wrap
 * @param {Object} options - Configuration options
 * @returns {Function} - Wrapped function with error handling
 */
export const useErrorHandler = () => {
    const error = ref(null)
    const loading = ref(false)

    const handleAsync = async (asyncFn, options = {}) => {
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
            const errorMessage = err?.message || 'An unexpected error occurred'
            error.value = errorMessage

            if (showGlobalError) {
                globalError.value = errorMessage
                // Auto-clear global error after 5 seconds
                setTimeout(() => {
                    globalError.value = null
                }, 5000)
            }

            if (onError) onError(err)
            console.error('[Error Handler]:', err)

            return { success: false, error: errorMessage }
        } finally {
            if (loadingState) {
                loading.value = false
                isLoading.value = false
            }
        }
    }

    const clearError = () => {
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
export const safeAsync = async (fn) => {
    try {
        const result = await fn()
        return { success: true, data: result }
    } catch (error) {
        console.error('[Safe Async Error]:', error)
        return { success: false, error: error?.message || 'Operation failed' }
    }
}
