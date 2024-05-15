<script setup>
import HomePage from './pages/HomePage.vue'
import NavigatePage from './pages/NavigatePage.vue'
import SettingPage from './pages/SettingPage.vue'
import AboutPage from './pages/AboutPage.vue'
import BackgroundImage from './components/BackgroundImage.vue'
import MessageBox from './components/MessageBox.vue'
import GlobalLoading from './components/GlobalLoading.vue'
import { usePageStore } from '@/stores/pageStore'
import { useSettingStore } from './stores/settingStore'
import { useFlagStore } from '@/stores/flagStore'
import { useMessageBoxStore } from '@/stores/messageBoxStore'
import { setClassForElement } from '@/utils/common'
import { defaultBackgroundUrl } from '@/utils/constant'
import { onMounted, ref, watch } from 'vue'

const settingStore = useSettingStore()
const pageStore = usePageStore()
const flagStore = useFlagStore()
const messageBoxStore = useMessageBoxStore()
const backgroundBlur = ref(0)
const backgroundScale = ref(1)
const bgLoadingMaskRef = ref()
const bgBrightnessMaskRef = ref()

function setBgBlurMask(blur) {
  if (settingStore.$state.showBgBlurMask) {
    backgroundBlur.value = blur;
  }
}

function openNavigatePage() {
  pageStore.pageForward('NavigatePage');
  backgroundScale.value = 1.1;
  setBgBlurMask(10);
}

function closeNavigatePage() {
  pageStore.pageForward('HomePage');
  setBgBlurMask(0);
  backgroundScale.value = 1;
}

function openSearch() {
  backgroundScale.value = 1.1;
  setBgBlurMask(10);

  flagStore.$state.closeSearch = false;
}

function closeSearch() {
  setBgBlurMask(0);
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

function handleBgMounted() {
  if (settingStore.$state.autoFocusSearchInput) {
    setBgBlurMask(0);

    backgroundScale.value = 1;
    requestAnimationFrame(() => {
      backgroundScale.value = 1.1;
      setBgBlurMask(10);
    })
  }
}

function handleBgLoadSuccess() {
  bgLoadingMaskRef.value.style.opacity = 0;
}

function handleBgLoadFail() {
  settingStore.$state.bgUrl = defaultBackgroundUrl;
  settingStore.$state.bgSource = 'default';
}

onMounted(() => {
  const loading = document.getElementById('loading');
  loading.style.opacity = 0;
  loading.remove();

  if (settingStore.$state.showBgBrightnessMask) {
    bgBrightnessMaskRef.value.style.opacity = 1;
  } else {
    bgBrightnessMaskRef.value.style.opacity = 0;
  }
})

watch(() => settingStore.$state.bgUrl, () => {
  bgLoadingMaskRef.value.style.opacity = 1;
})

watch(() => settingStore.$state.showBgBlurMask, (newValue) => {
  if (newValue) {
    backgroundBlur.value = 10;
  } else {
    backgroundBlur.value = 0;
  }
})

watch(() => settingStore.$state.showBgBrightnessMask, (newValue) => {
  if (newValue) {
    bgBrightnessMaskRef.value.style.opacity = 1;
  } else {
    bgBrightnessMaskRef.value.style.opacity = 0;
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
    <BackgroundImage v-if="flagStore.bgImgIsGot" @mounted="handleBgMounted" @load-success="handleBgLoadSuccess"
      @load-fail="handleBgLoadFail" :background-url="settingStore.bgUrl" :background-blur="backgroundBlur"
      :background-scale="backgroundScale">
    </BackgroundImage>
    <div ref="bgLoadingMaskRef" class="background-loading-mask"></div>
    <div ref="bgBrightnessMaskRef" class="background-brightness-mask"></div>
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

  <GlobalLoading :show="flagStore.globalLoadingIsShow"></GlobalLoading>
</template>

<style scpoed>
.background-container {
  width: 100%;
  height: 100%;
  margin: 0;
  position: absolute;
}

.background-loading-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  background-color: rgb(50, 50, 50);
  transition: opacity 1s;
}

.background-brightness-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.2);
  transition: opacity .25s;
}
</style>
