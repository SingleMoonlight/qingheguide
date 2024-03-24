import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initImageDB } from '@/utils/indexedDB'
import { globalKeydown } from '@/utils/keyListener'
import { checkUpdate, loadConfig, printWebsiteInfo } from './utils/initialize'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#qinghe-guide')

initImageDB()
printWebsiteInfo()
globalKeydown()
checkUpdate()
loadConfig()