import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initImageDB } from '@/utils/indexedDB'
import { checkUpdate, loadConfig, printWebsiteInfo, globalKeyDown } from './utils/initialize'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#qinghe-guide')

initImageDB()
printWebsiteInfo()
globalKeyDown()
checkUpdate()
loadConfig()