import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import Emitter from 'tiny-emitter';

import App from './App.vue'
import router from './router'




import './index.css'


// createApp.prototype.$http = axios

const app = createApp(App)

app.config.globalProperties.$msalInstance = {};
app.config.globalProperties.$emitter = new Emitter();

app.use(createPinia())
app.use(router)

app.mount('#app')
