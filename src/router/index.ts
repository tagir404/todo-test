import { createWebHistory, createRouter } from 'vue-router'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useTodoStore } from '@/stores/todo'

import HomeView from '@/views/HomeView.vue'
import AddTodoView from '@/views/AddTodoView.vue'
import EditTodoView from '@/views/EditTodoView.vue'
import ErrorPage from '@/views/ErrorPage.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/add', component: AddTodoView },
    {
        path: '/edit/:id',
        name: 'TodoEdit',
        component: EditTodoView,
        beforeEnter: (
            to: RouteLocationNormalized,
            from: RouteLocationNormalized,
            next: NavigationGuardNext
        ) => {
            const store = useTodoStore()
            const todoId = Number(to.params.id)

            const todoExists = store.todos.some((todo) => todo.id === todoId)

            if (todoExists) {
                next()
            } else {
                next({ name: 'ErrorPage' })
            }
        }
    },
    {
        path: '/404',
        name: 'ErrorPage',
        component: ErrorPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
