<script setup lang="ts">
import { useTodoStore } from '@/stores/todo'
import { useToast } from 'primevue/usetoast'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'

const toast = useToast()
const store = useTodoStore()

const toggleCompleted = (todoId: number, isCompleted: boolean) => {
    store.toggleTodoCompleted(todoId)

    if (isCompleted) {
        toast.add({
            severity: 'info',
            summary: 'Задача не выполнена',
            life: 3000
        })
    } else {
        toast.add({
            severity: 'success',
            summary: 'Задача выполнена',
            life: 3000
        })
    }
}

const removeTodo = (todoId: number, todoTitle: string) => {
    store.removeTodo(todoId)

    toast.add({
        severity: 'error',
        summary: 'Задача удалена',
        detail: `Задача "${todoTitle}" была удалена`,
        life: 3000
    })
}
</script>

<template>
    <section class="flex flex-col items-center gap-4">
        <h1 class="text-4xl">Список задач</h1>
        <ul class="w-full flex flex-col gap-4">
            <li
                v-for="todo in store.todos"
                :key="todo.id"
                class="flex gap-4 border p-4 rounded bg-slate-100"
                :class="{ 'bg-green-100': todo.completed }"
            >
                <span
                    class="text-2xl mr-auto self-center"
                    :class="{ 'line-through': todo.completed }"
                    >{{ todo.title }}</span
                >
                <Checkbox
                    :model-value="todo.completed"
                    :binary="true"
                    @change="toggleCompleted(todo.id, todo.completed)"
                />
                <Button
                    as="router-link"
                    :to="`/edit/${todo.id}`"
                    icon="pi pi-pencil"
                    severity="info"
                    aria-label="Редактировать задачу"
                />
                <Button
                    icon="pi pi-trash"
                    severity="danger"
                    aria-label="Удалить задачу"
                    @click="removeTodo(todo.id, todo.title)"
                />
            </li>
        </ul>
    </section>
</template>

<style scoped>
.p-checkbox {
    width: var(--p-button-icon-only-width);
    height: auto;
}

.p-checkbox:deep(.p-checkbox-box) {
    width: 100%;
    height: 100%;
}

.p-checkbox:deep(.p-checkbox-icon) {
    width: 1rem;
    height: 1rem;
}
</style>
