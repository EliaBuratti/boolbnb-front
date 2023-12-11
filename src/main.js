import { createApp } from 'vue'
import './assets/scss/style.scss'

import App from './App.vue'
import axios from 'axios'
import { router } from './router'

createApp(App).use(router).mount('#app')
