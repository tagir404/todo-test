<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTodoStore } from '@/stores/todo'
import { useToast } from 'primevue/usetoast'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const router = useRouter()
const route = useRoute()
const store = useTodoStore()
const toast = useToast()
const todoTitle = ref('')

const editTodoId = +route.params.id

const editTodo = () => {
    store.editTodo(editTodoId, todoTitle.value)

    toast.add({
        severity: 'success',
        summary: 'Задача успешно изменена',
        life: 3000
    })

    todoTitle.value = ''
    router.push('/')
}
</script>

<template>
    <section class="flex flex-col items-center gap-4">
        <h1 class="text-4xl">
            Изменить задачу "{{ store.todos.find((todo) => todo.id === editTodoId)?.title }}"
        </h1>
        <div class="flex gap-4">
            <InputText
                class="w-[500px]"
                type="text"
                placeholder="Новое название задачи"
                v-model="todoTitle"
                @keyup.enter="editTodo"
            />
            <Button @click="editTodo">Сохранить</Button>
        </div>
    </section>
</template>
