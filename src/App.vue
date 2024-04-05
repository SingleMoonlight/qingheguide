<script setup>
import HomePage from './pages/HomePage.vue'
import NavigatePage from './pages/NavigatePage.vue'
import SettingPage from './pages/SettingPage.vue'
import AboutPage from './pages/AboutPage.vue'
import BackgroundImage from './components/BackgroundImage.vue'
import MessageBox from './components/MessageBox.vue'
import { usePageStore } from '@/stores/pageStore'
import { useSettingStore } from './stores/settingStore'
import { useFlagStore } from '@/stores/flagStore'
import { useMessageBoxStore } from '@/stores/messageBoxStore'
import { defaultBackgroundUrl } from '@/utils/constant'
import { setClassForElement } from '@/utils/common'
import { nextTick, onMounted, ref, watch } from 'vue'

const settingStore = useSettingStore()
const pageStore = usePageStore()
const flagStore = useFlagStore()
const messageBoxStore = useMessageBoxStore()
const backgroundBlur = ref(0)
const backgroundScale = ref(1)
const bgMaskRef = ref()

function openNavigatePage() {
  pageStore.pageForward('NavigatePage');
  backgroundScale.value = 1.1;
  if (settingStore.$state.blurBackground) {
    backgroundBlur.value = 10;
  }
}

function closeNavigatePage() {
  pageStore.pageForward('HomePage');
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
  pageStore.pageForward('SettingPage');
}

function openAboutPage() {
  pageStore.pageForward('AboutPage');
}

function closeSettingPage() {
  pageStore.pageForward('NavigatePage');
}

function closeAboutPage() {
  pageStore.pageForward('NavigatePage');
}

function closeMessageBox() {
  messageBoxStore.$state.show = false;
}

function handleBgLoaded() {
  if (settingStore.$state.autoFocusSearchInput) {
    if (settingStore.$state.blurBackground) {
      backgroundBlur.value = 0;
    }
    backgroundScale.value = 1;
    nextTick(() => {
      backgroundScale.value = 1.1;
      if (settingStore.$state.blurBackground) {
        backgroundBlur.value = 10;
      }
    })
  }
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

watch(() => flagStore.$state.bgImgIsGot, (newValue) => {
  if (newValue) {
    bgMaskRef.value.style.opacity = 0;
  }
})

watch(() => flagStore.$state.settingIsPatched, (newValue) => {
  if (newValue) {
    setClassForElement('qinghe-guide', settingStore.$state.theme);
  }
})

</script>

<template>
  <div class="background-container">
    <BackgroundImage v-if="flagStore.$state.bgImgIsGot" @loaded="handleBgLoaded"
      :background-url="settingStore.$state.backgroundUrl" :default-background-url="defaultBackgroundUrl"
      :background-blur="backgroundBlur" :background-scale="backgroundScale">
    </BackgroundImage>
    <div ref="bgMaskRef" class="background-mask"></div>
  </div>

  <Transition mode="out-in" name="fade">
    <HomePage v-if="pageStore.pageName === 'HomePage'" @close-search="closeSearch" @open-search="openSearch"
      @open-navigate="openNavigatePage">
    </HomePage>
    <NavigatePage v-else-if="pageStore.pageName === 'NavigatePage'" @close-navigate="closeNavigatePage"
      @open-setting="openSettingPage" @open-about="openAboutPage">
    </NavigatePage>
    <SettingPage v-else-if="pageStore.pageName === 'SettingPage'" @close-setting="closeSettingPage">
    </SettingPage>
    <AboutPage v-else-if="pageStore.pageName === 'AboutPage'" @close-about="closeAboutPage">
    </AboutPage>
  </Transition>

  <MessageBox @close="closeMessageBox" :show="messageBoxStore.show" :type="messageBoxStore.type"
    :title="messageBoxStore.title" :content="messageBoxStore.content" :cancel-btn-text="messageBoxStore.cancelBtnText"
    :ok-btn-text="messageBoxStore.okBtnText" :cancel-handler="messageBoxStore.cancelHandler"
    :ok-handler="messageBoxStore.okHandler">
  </MessageBox>
</template>

<style scpoed>
.background-container {
  width: 100%;
  height: 100%;
  margin: 0;
  position: absolute;
}

.background-mask {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  position: absolute;
  background-color: rgb(50, 50, 50);
  transition: opacity 1s;
}
</style>
