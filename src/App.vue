<script setup>
import Home from './pages/Home.vue'
import Navigate from './pages/Navigate.vue'
import Setting from './pages/Setting.vue'
import About from './pages/About.vue'
import Background from './components/Background.vue'
import { usePageStore } from '@/stores/page'
import { useSettingStore } from './stores/setting'
import { useFlagStore } from '@/stores/flag'
import { defaultBackground } from '@/utils/constant'
import { onMounted, ref, watch } from 'vue'

const settingStore = useSettingStore()
const pageStore = usePageStore()
const flagStore = useFlagStore()
const backgroundBlur = ref(0)
const backgroundScale = ref(1)
const bgMaskRef = ref()

function openNavigatePage() {
  pageStore.pageForward('Navigate');
  backgroundScale.value = 1.1;
  if (settingStore.$state.blurBackground) {
    backgroundBlur.value = 10;
  }
}

function closeNavigatePage() {
  pageStore.pageForward('Home');
  if (settingStore.$state.blurBackground) {
    backgroundBlur.value = 0;
  }
  backgroundScale.value = 1;
}

function openSearch() {
  backgroundScale.value = 1.1;
  if (settingStore.$state.blurBackground) {
    backgroundBlur.value = 10;
  }

  flagStore.$state.closeSearch = false;
}

function closeSearch() {
  if (settingStore.$state.blurBackground) {
    backgroundBlur.value = 0;
  }
  backgroundScale.value = 1;

  flagStore.$state.closeSearch = true;
}

function openSettingPage() {
  pageStore.pageForward('Setting');
}

function openAboutPage() {
  pageStore.pageForward('About');
}

function closeSettingPage() {
  pageStore.pageForward('Navigate');
}

function closeAboutPage() {
  pageStore.pageForward('Navigate');
}

onMounted(() => {
  const loading = document.getElementById('loading');
  loading.style.opacity = 0;
  loading.remove();
})

watch(() => settingStore.$state.blurBackground, (newValue) => {
  if (newValue) {
    backgroundBlur.value = 10;
  } else {
    backgroundBlur.value = 0;
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
      :default-background="defaultBackground" :background-blur="backgroundBlur" :background-scale="backgroundScale">
    </Background>
  </div>

  <Transition mode="out-in" name="fade">
    <Home v-if="pageStore.pageName === 'Home'" @close-search="closeSearch" @open-search="openSearch"
      @open-navigate="openNavigatePage">
    </Home>
    <Navigate v-else-if="pageStore.pageName === 'Navigate'" @close-navigate="closeNavigatePage" @open-setting="openSettingPage"
      @open-about="openAboutPage">
    </Navigate>
    <Setting v-else-if="pageStore.pageName === 'Setting'" @close-setting="closeSettingPage">
    </Setting>
    <About v-else-if="pageStore.pageName === 'About'" @close-about="closeAboutPage">
    </About>
  </Transition>
</template>

<style scpoed>
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
