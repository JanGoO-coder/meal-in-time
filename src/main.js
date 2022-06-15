import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import { firebaseapp } from './firebase'

console.log(firebaseapp)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
