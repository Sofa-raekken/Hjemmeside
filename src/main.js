import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import Emitter from 'tiny-emitter'
import store from './store'
import './index.css'

const app = createApp({
  render: () => h(App)
})

app.config.globalProperties.$msalInstance = {}
app.config.globalProperties.$emitter = new Emitter()
app.use(store).use(router).mount('#app')
