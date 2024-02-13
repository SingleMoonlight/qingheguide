<script setup>
import Home from './pages/Home.vue'
import Search from './pages/Search.vue'
import Navigate from './pages/Navigate.vue'
import Setting from './pages/Setting.vue'
import About from './pages/About.vue'
import Background from './components/Background.vue'
import { usePageStore } from '@/stores/page'
import { storeToRefs } from 'pinia'
import { globalKeydown } from '@/utils/keyListener'

const pageStore = usePageStore()
const { name: pageName } = storeToRefs(pageStore)

globalKeydown();

</script>

<template>
  <Background></Background>
  <Transition mode="out-in" name="fade">
    <Home v-if="pageName === 'Home'"></Home>
    <Search v-else-if="pageName === 'Search'"></Search>
    <Navigate v-else-if="pageName === 'Navigate'"></Navigate>
    <Setting v-else-if="pageName === 'Setting'"></Setting>
    <About v-else-if="pageName === 'About'"></About>
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
