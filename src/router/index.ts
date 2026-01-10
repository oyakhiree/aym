import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LoginView from '../views/auth/LoginView.vue'
import ClubDashboard from '../views/club/ClubDashboard.vue'

// Route meta type
declare module 'vue-router' {
    interface RouteMeta {
        layout?: 'auth' | 'dashboard'
        requiresAuth?: boolean
    }
}

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: { layout: 'auth', requiresAuth: false }
    },
    {
        path: '/',
        name: 'dashboard',
        component: ClubDashboard,
        meta: { layout: 'dashboard', requiresAuth: true }
    },
    {
        path: '/members',
        name: 'members',
        component: () => import('@/views/club/MemberListView.vue'),
        meta: { layout: 'dashboard', requiresAuth: true }
    },
    {
        path: '/members/:id',
        name: 'member-detail',
        component: () => import('@/views/club/MemberDetailView.vue'),
        meta: { layout: 'dashboard', requiresAuth: true }
    },
    {
        path: '/classes',
        name: 'classes',
        component: () => import('@/views/education/ClassListView.vue'),
        meta: { layout: 'dashboard', requiresAuth: true }
    },
    {
        path: '/classes/:id',
        name: 'class-detail',
        component: () => import('@/views/education/ClassDetailView.vue'),
        meta: { layout: 'dashboard', requiresAuth: true }
    },
    {
        path: '/events',
        name: 'events',
        component: () => import('@/views/education/EventsListView.vue'),
        meta: { layout: 'dashboard', requiresAuth: true }
    },
    {
        path: '/events/:id',
        name: 'event-detail',
        component: () => import('@/views/education/EventDetailView.vue'),
        meta: { layout: 'dashboard', requiresAuth: true }
    },
    {
        path: '/profile',
        redirect: '/'
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, _from, next) => {
    const publicPages: string[] = ['/login']
    const authRequired = !publicPages.includes(to.path)

    // For demo purposes, we'll use a simple localStorage check
    // In production, verify JWT token validity with the backend
    const isAuthenticated = localStorage.getItem('aym_auth_token') || true // Default true for demo

    if (authRequired && !isAuthenticated) {
        return next('/login')
    }
    next()
})

export default router
