<script setup>
import Home from './pages/Home.vue'
import Navigate from './pages/Navigate.vue'
import Setting from './pages/Setting.vue'
import About from './pages/About.vue'
import Background from './components/Background.vue'
import { usePageStore } from '@/stores/page'
import { storeToRefs } from 'pinia'
import { globalKeydown } from '@/utils/keyListener'
import { checkUpdate, loadSetting, printWebsiteInfo } from './utils/initialize'
import { useSettingStore } from './stores/setting'
import { defaultBackground } from '@/utils/constant'
import { onMounted } from 'vue'
import { initBackgroundDB } from '@/utils/indexedDB'

const settingStore = useSettingStore()
const pageStore = usePageStore()
const { name: pageName } = storeToRefs(pageStore)

onMounted(() => {
  initBackgroundDB();
  printWebsiteInfo();
  globalKeydown();
  checkUpdate();
  loadSetting();
})

</script>

<template>
  <div class="background-container">
    <Background :background-url="settingStore.$state.backgroundUrl" :default-background="defaultBackground">
    </Background>
  </div>
  <Transition mode="out-in" name="fade">
    <Home v-if="pageName === 'Home'"></Home>
    <Navigate v-else-if="pageName === 'Navigate'"></Navigate>
    <Setting v-else-if="pageName === 'Setting'"></Setting>
    <About v-else-if="pageName === 'About'"></About>
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.background-container {
  width: 100%;
  height: 100%;
  margin: 0;
  position: absolute;
}
</style>
