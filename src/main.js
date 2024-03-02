import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initImageDB } from '@/utils/indexedDB'
import { globalKeydown } from '@/utils/keyListener'
import { checkUpdate, loadSetting, printWebsiteInfo } from './utils/initialize'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')

initImageDB()
printWebsiteInfo()
globalKeydown()
checkUpdate()
loadSetting()