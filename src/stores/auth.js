import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const isAuthenticated = ref(false)
    const router = useRouter()

    const login = async (role = 'Club Director') => {
        // Mock Login
        isAuthenticated.value = true
        user.value = {
            id: '123',
            name: 'Jane Doe',
            email: 'jane@example.com',
            role: role,
            clubId: 'club-001'
        }
    }

    const logout = () => {
        isAuthenticated.value = false
        user.value = null
    }

    return {
        user,
        isAuthenticated,
        login,
        logout
    }
})
