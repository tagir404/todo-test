import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Todo } from '@/types'

const LOCAL_STORAGE_KEY = 'todo-list'

export const useTodoStore = defineStore('todo', () => {
    const todos = ref<Todo[]>([])

    const loadTodosFromLocalStorage = () => {
        const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (storedTodos) {
            todos.value = JSON.parse(storedTodos)
        }
    }

    const addTodo = (todoTitle: string) =>
        todos.value.push({ id: newTodoId.value, title: todoTitle, completed: false })

    const editTodo = (todoId: number, newTitle: string) => {
        const todoIndex = todos.value.findIndex((todo) => todo.id === todoId)
        if (todoIndex !== -1) {
            todos.value[todoIndex].title = newTitle
        }
    }

    const removeTodo = (todoId: number) => {
        const todoIndex = todos.value.findIndex((todo) => todo.id === todoId)
        if (todoIndex !== -1) {
            todos.value.splice(todoIndex, 1)
        }
    }

    const toggleTodoCompleted = (todoId: number) => {
        const todo = todos.value.find((todo) => todo.id === todoId)
        if (todo) {
            todo.completed = !todo.completed
        }
    }

    const newTodoId = computed(() => {
        if (todos.value.length === 0) {
            return 1
        }
        return Math.max(...todos.value.map((todo) => todo.id)) + 1
    })

    watch(
        todos,
        (newTodos) => {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos))
        },
        { deep: true }
    )

    loadTodosFromLocalStorage()

    return { todos, addTodo, editTodo, removeTodo, toggleTodoCompleted }
})
