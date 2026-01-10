import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
    id: string
    name: string
    email: string
    role: string
    clubId: string
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const isAuthenticated = ref<boolean>(false)

    const login = async (role: string = 'Club Director'): Promise<void> => {
        // Mock Login
        isAuthenticated.value = true
        user.value = {
            id: '123',
            name: 'Jane Doe',
            email: 'jane@example.com',
            role: role,
            clubId: 'club-001'
        }
        // Set auth token for router guard
        localStorage.setItem('aym_auth_token', 'mock_token_' + Date.now())
    }

    const logout = (): void => {
        isAuthenticated.value = false
        user.value = null
        localStorage.removeItem('aym_auth_token')
    }

    return {
        user,
        isAuthenticated,
        login,
        logout
    }
})
