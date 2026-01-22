import { ref, computed, type Ref } from 'vue'

export function useSearchable<T>(items: Ref<T[]>, searchKeys: (keyof T | ((item: T) => string))[]) {
    const searchQuery = ref('')

    const filteredItems = computed(() => {
        if (!searchQuery.value) return items.value

        const query = searchQuery.value.toLowerCase()

        return items.value.filter(item => {
            return searchKeys.some(key => {
                const value = typeof key === 'function' ? key(item) : String(item[key])
                return value.toLowerCase().includes(query)
            })
        })
    })

    return {
        searchQuery,
        filteredItems
    }
}
