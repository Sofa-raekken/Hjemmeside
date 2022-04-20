import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import Emitter from 'tiny-emitter'
import store from './store'
import './index.css'
import axios from 'axios'
import 'vue-universal-modal/dist/index.css'
import VueUniversalModal from 'vue-universal-modal'

const app = createApp({
  render: () => h(App)
})

app.config.globalProperties.$msalInstance = {}
app.config.globalProperties.$emitter = new Emitter()
app.config.globalProperties.$axios = axios

app.use(store).use(VueUniversalModal, {
  teleportTarget: '#modals'
}).use(router).mount('#app')
