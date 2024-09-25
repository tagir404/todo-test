<script setup lang="ts">
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
import Toast from 'primevue/toast'

const items = ref([
    {
        label: 'Главная',
        icon: 'pi pi-home',
        route: '/'
    },
    {
        label: 'Добавить задачу',
        icon: 'pi pi-plus',
        route: '/add'
    }
])
</script>

<template>
    <div class="flex flex-col p-4 gap-4 min-h-screen">
        <Menubar :model="items">
            <template #item="{ item, props }">
                <router-link
                    v-slot="{ href, navigate }"
                    :to="item.route"
                    custom
                >
                    <a
                        v-ripple
                        :href="href"
                        v-bind="props.action"
                        @click="navigate"
                    >
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </router-link>
            </template>
        </Menubar>
        <RouterView />
        <Toast />
    </div>
</template>
