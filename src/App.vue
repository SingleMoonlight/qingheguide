<script setup>
import Home from './pages/Home.vue'
import Navigate from './pages/Navigate.vue'
import Setting from './pages/Setting.vue'
import About from './pages/About.vue'
import Background from './components/Background.vue'
import { usePageStore } from '@/stores/page'
import { storeToRefs } from 'pinia'
import { useSettingStore } from './stores/setting'
import { useFlagStore } from '@/stores/flag'
import { defaultBackground } from '@/utils/constant'
import { onMounted, ref, watch } from 'vue'

const settingStore = useSettingStore()
const pageStore = usePageStore()
const flagStore = useFlagStore()
const { name: pageName } = storeToRefs(pageStore)
const backgroundblur = ref(0)
const backgroundScale = ref(1)
const bgMaskRef = ref()

function openHomePage(e) {
  if (e.currentTarget !== e.target) {
    // 不处理子元素的冒泡点击事件
    return;
  }
  pageStore.pageForward('Home');
  if (settingStore.$state.blurBackground) {
    backgroundblur.value = 0;
  }
  backgroundScale.value = 1;
}

function openNavigatePage() {
  pageStore.pageForward('Navigate');
  backgroundScale.value = 1.1;
  if (settingStore.$state.blurBackground) {
    backgroundblur.value = 10;
  }
}

function openSearch() {
  backgroundScale.value = 1.1;
  if (settingStore.$state.blurBackground) {
    backgroundblur.value = 10;
  }

  flagStore.$state.closeSearch = false;
}

function closeSearch(e) {
  if (e.currentTarget !== e.target) {
    // 不处理子元素的冒泡点击事件
    return;
  }
  if (settingStore.$state.blurBackground) {
    backgroundblur.value = 0;
  }
  backgroundScale.value = 1;

  flagStore.$state.closeSearch = true;
}

onMounted(() => {
  const splash = document.getElementById('splash');
  splash.style.opacity = 0;
  splash.remove();
})

watch(() => settingStore.$state.blurBackground, (newValue) => {
  if (newValue) {
    backgroundblur.value = 10;
  } else {
    backgroundblur.value = 0;
  }
})

watch(() => flagStore.$state.bgImgIsGet, (newValue) => {
  if (newValue) {
    bgMaskRef.value.style.opacity = 0;
  }
})

</script>

<template>
  <div class="background-container">
    <div ref="bgMaskRef" class="background-mask"></div>
    <Background v-if="flagStore.$state.bgImgIsGet" :background-url="settingStore.$state.backgroundUrl"
      :default-background="defaultBackground" :background-blur="backgroundblur" :background-scale="backgroundScale">
    </Background>
  </div>

  <Transition mode="out-in" name="fade">
    <Home v-if="pageName === 'Home'" @click="closeSearch" @contextmenu="openNavigatePage"
      @open-navigate="openNavigatePage" @open-search="openSearch">
    </Home>
    <Navigate v-else-if="pageName === 'Navigate'" @click="openHomePage"></Navigate>
    <Setting v-else-if="pageName === 'Setting'"></Setting>
    <About v-else-if="pageName === 'About'"></About>
  </Transition>
</template>

<style scpoed>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
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

.background-mask {
  width: 100%;
  height: 100%;
  opacity: 1;
  position: absolute;
  background-color: rgb(50, 50, 50);
  transition: opacity 1s;
}
</style>
