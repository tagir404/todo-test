<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todo'
import { useToast } from 'primevue/usetoast'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const store = useTodoStore()
const toast = useToast()
const todoTitle = ref('')

const addTodo = () => {
    store.addTodo(todoTitle.value)

    toast.add({
        severity: 'success',
        summary: 'Задача добавлена',
        detail: `Задача "${todoTitle.value}" добавлена в список задач`,
        life: 3000
    })

    todoTitle.value = ''
}
</script>

<template>
    <section class="flex flex-col items-center gap-4">
        <h1 class="text-4xl">Добавить задачу</h1>
        <div class="flex gap-4">
            <InputText
                class="w-[500px]"
                type="text"
                placeholder="Название задачи"
                v-model="todoTitle"
                @keyup.enter="addTodo"
            />
            <Button @click="addTodo">Добавить</Button>
        </div>
    </section>
</template>
