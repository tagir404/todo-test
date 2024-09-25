<script setup lang="ts">
import Message from 'primevue/message'
</script>

<template>
    <div class="flex-1 flex justify-center items-center">
        <Message
            class="flex flex-col gap-4 p-4"
            severity="error"
        >
            <h1 class="text-center text-6xl">404 - Задача не найдена</h1>
        </Message>
    </div>
</template>
