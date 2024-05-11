import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { installDirective } from './utils/directive'
import { initialize } from './utils/initialize'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

installDirective(app)

app.use(pinia)
app.mount('#qinghe-guide')

initialize()
