import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import Emitter from 'tiny-emitter'
import store from './store'
import './index.css'
import axios from 'axios'

const app = createApp({
  render: () => h(App)
})

app.config.globalProperties.$msalInstance = {}
app.config.globalProperties.$emitter = new Emitter()
app.config.globalProperties.$axios = axios
app.use(store).use(router).mount('#app')
