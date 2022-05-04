import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import Emitter from 'tiny-emitter'
import store from './store'
import './index.css'
import axios from 'axios'
import 'vue-universal-modal/dist/index.css'
import VueUniversalModal from 'vue-universal-modal'
import VueCookie from 'vue-cookies'

const app = createApp({
  render: () => h(App)
})

app.config.globalProperties.$msalInstance = {}
app.config.globalProperties.$emitter = new Emitter()
app.config.globalProperties.$axios = axios

app.use(store).use(VueUniversalModal, {
  teleportTarget: '#modals'
}).use(router).use(VueCookie).mount('#app')

router.beforeEach((to, from, next) => {
  if (to.name !== 'home' && store.state.getToken === '') {
    console.log(store.getters.getToken)
    next({
      path: '/',
      replace: true
    })
  } else {
    next()
  }
})
