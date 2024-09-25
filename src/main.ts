import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Ripple from 'primevue/ripple'
import ToastService from 'primevue/toastservice'
import Aura from '@primevue/themes/aura'
import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)

app.directive('ripple', Ripple)

app.use(PrimeVue, {
    ripple: true,
    theme: {
        preset: Aura
    }
})

app.use(ToastService)

app.use(router)

app.use(createPinia())

app.mount('#app')
