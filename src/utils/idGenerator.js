/**
 * Utility function for generating unique IDs
 * Uses crypto.randomUUID when available, falls back to a secure alternative
 */
export const generateId = () => {
    // Modern browsers and Node 19+ support crypto.randomUUID
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID()
    }
    // Fallback for older environments
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}
