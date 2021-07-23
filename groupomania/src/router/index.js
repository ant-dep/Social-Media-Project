import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ('../views/HomeView.vue')
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () =>
            import ('../views/SignupView.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/LoginView.vue')
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () =>
            import ('../views/ProfileView.vue')
    },
    {
        path: '/allprofiles',
        name: 'AllProfiles',
        component: () =>
            import ('../views/AllProfilesView.vue')
    },
    {
        path: '/allpost',
        name: 'allpost',
        component: () =>
            import ('../views/AllPostView.vue')
    },
    {
        path: '/addpost',
        name: 'AddPost',
        component: () =>
            import ('../views/AddPostView.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router