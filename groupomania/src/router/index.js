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
            import ('../views/Signup.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/me',
        name: 'Me',
        component: () =>
            import ('../views/Me.vue')
    },
    {
        path: '/allpost',
        name: 'allpost',
        component: () =>
            import ('../views/AllPost.vue')
    },
    {
        path: '/addpost',
        name: 'AddPost',
        component: () =>
            import ('../views/AddPost.vue')
    },
    {
        path: '/post/:id',
        name: 'Post',
        component: () =>
            import ('../views/Post.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router