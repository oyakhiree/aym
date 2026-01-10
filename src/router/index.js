import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/auth/LoginView.vue'
import ClubDashboard from '../views/club/ClubDashboard.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: { layout: 'auth' }
        },
        {
            path: '/',
            name: 'dashboard',
            component: ClubDashboard,
            meta: { layout: 'dashboard' } // Default
        },
        {
            path: '/members',
            name: 'members',
            component: () => import('@/views/club/MemberListView.vue'), // Lazy load
            meta: { layout: 'dashboard' }
        },
        {
            path: '/members/:id',
            name: 'member-detail',
            component: () => import('@/views/club/MemberDetailView.vue'),
            meta: { layout: 'dashboard' }
        },
        {
            path: '/classes',
            name: 'classes',
            component: () => import('@/views/education/ClassListView.vue'),
            meta: { layout: 'dashboard' }
        },
        {
            path: '/classes/:id',
            name: 'class-detail',
            component: () => import('@/views/education/ClassDetailView.vue'),
            meta: { layout: 'dashboard' }
        },
        {
            path: '/events',
            name: 'events',
            component: () => import('@/views/education/EventsListView.vue'),
            meta: { layout: 'dashboard' }
        },
        {
            path: '/events/:id',
            name: 'event-detail',
            component: () => import('@/views/education/EventDetailView.vue'),
            meta: { layout: 'dashboard' }
        },
        { path: '/profile', redirect: '/' },
    ]
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    // In a real app check store. But for demo simplified:
    // const auth = useAuthStore()
    // if (authRequired && !auth.user) {
    //   return next('/login');
    // }
    next();
});

export default router
