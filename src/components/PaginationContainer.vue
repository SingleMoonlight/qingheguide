<script setup>
import ButtonWrap from '@/components/ButtonWrap.vue'
import EnsureIcon from './icons/EnsureIcon.vue'
import { VueDraggable } from 'vue-draggable-plus'
import { onMounted, ref, watch } from 'vue'

const emit = defineEmits(['changeActivePage', 'changePageOrder', 'longpressBar'])
const props = defineProps({
    pageCount: Number,
    pageList: Array,
    activePageIndex: Number,
    circularSliding: Boolean,
    flippingEffect: String,
    flippingInterval: Number,
})
const pageName = ref('')
const showPageName = ref(false)
const showPageThumbnail = ref(false)
const curActivePageIndex = ref(0)
const transitionEffectName = ref('')
const originalPageRef = ref()
const pageNameListForDrag = ref(null)
let lastPageSlideTime = 0

function handleSelectPage(index) {
    if (props.flippingEffect !== 'fade') {
        if (index > curActivePageIndex.value) {
            transitionEffectName.value = props.flippingEffect + '-left';
        } else if (index < curActivePageIndex.value) {
            transitionEffectName.value = props.flippingEffect + '-right';
        }
    } else {
        transitionEffectName.value = props.flippingEffect;
    }

    curActivePageIndex.value = index;
    pageName.value = props.pageList[curActivePageIndex.value].name;
    showPageName.value = true;
    setTimeout(() => {
        showPageName.value = false;
    }, 500);

    emit('changeActivePage', curActivePageIndex.value);
}

function handleMouseEnterBarDot(index) {
    pageName.value = props.pageList[index].name;
    showPageName.value = true;
}

function handleMouseLeaveBarDot(index) {
    pageName.value = props.pageList[index].name;
    showPageName.value = false;
}

function slideLeft() {
    let nowTime = new Date().valueOf();
    if (nowTime - lastPageSlideTime < props.flippingInterval) {
        return;
    }
    lastPageSlideTime = nowTime;

    if (props.flippingEffect !== 'fade') {
        transitionEffectName.value = props.flippingEffect + '-left';
    } else {
        transitionEffectName.value = props.flippingEffect;
    }

    if (props.circularSliding) {
        curActivePageIndex.value = curActivePageIndex.value === props.pageCount - 1 ? 0 : curActivePageIndex.value + 1;
    } else {
        curActivePageIndex.value = curActivePageIndex.value === props.pageCount - 1 ? props.pageCount - 1 : curActivePageIndex.value + 1;
    }
    pageName.value = props.pageList[curActivePageIndex.value].name;
    showPageName.value = true;
    setTimeout(() => {
        showPageName.value = false;
    }, 500);

    emit('changeActivePage', curActivePageIndex.value);
}

function slideRight() {
    let nowTime = new Date().valueOf();
    if (nowTime - lastPageSlideTime < props.flippingInterval) {
        return;
    }
    lastPageSlideTime = nowTime;

    if (props.flippingEffect !== 'fade') {
        transitionEffectName.value = props.flippingEffect + '-right';
    } else {
        transitionEffectName.value = props.flippingEffect;
    }

    if (props.circularSliding) {
        curActivePageIndex.value = curActivePageIndex.value === 0 ? props.pageCount - 1 : curActivePageIndex.value - 1;
    } else {
        curActivePageIndex.value = curActivePageIndex.value === 0 ? 0 : curActivePageIndex.value - 1;
    }
    pageName.value = props.pageList[curActivePageIndex.value].name;
    showPageName.value = true;
    setTimeout(() => {
        showPageName.value = false;
    }, 500);

    emit('changeActivePage', curActivePageIndex.value);
}

function handleWheel(e) {
    let container = originalPageRef.value[curActivePageIndex.value];
    let scrollTop = 0;
    let scrollHeight = 0;
    let clientHeight = 0;

    if (container === undefined) {
        return;
    }

    scrollTop = container.scrollTop;
    scrollHeight = container.scrollHeight;
    clientHeight = container.clientHeight;

    if (e.deltaY > 0) {
        if (scrollTop + clientHeight >= scrollHeight - 1) {
            slideLeft();
        }
    } else {
        if (scrollTop === 0) {
            slideRight();
        }
    }
}

function handleThumbnailPageEnter(el, done) {
    let delay = el.dataset.index * 100; //进入延时
    el.style.opacity = '0';
    el.style.transform = 'scale(0)';
    setTimeout(() => {
        el.style.transition = '0.25s ease';
        el.style.opacity = '1';
        el.style.transform = 'scale(1)';
        done();
    }, delay);
}

function handleThumbnailPageAfterEnter(el) {
    let delay = el.dataset.index * 100;
    setTimeout(() => {
        el.style = '';
    }, delay);
}

function handleClickThumbnailCheckBtn() {
    showPageThumbnail.value = false;
    emit('changePageOrder', pageNameListForDrag.value);
}

function handleLongPressBar() {
    showPageName.value = false;
    showPageThumbnail.value = !showPageThumbnail.value;
    emit('longpressBar');
}

defineExpose({
    slideLeft,
    slideRight,
})

onMounted(() => {
    if (props.flippingEffect !== 'fade') {
        transitionEffectName.value = props.flippingEffect + '-left';
    } else {
        transitionEffectName.value = props.flippingEffect;
    }
    curActivePageIndex.value = props.activePageIndex;
})

watch(() => props.activePageIndex, (newValue) => {
    curActivePageIndex.value = newValue;
})

watch(() => props.flippingEffect, (newValue) => {
    transitionEffectName.value = newValue;
})

watch(() => props.pageList, (newValue) => {
    pageNameListForDrag.value = newValue;
})

</script>

<template>
    <div class="pagination-container">
        <Transition mode="out-in" name="fade">
            <VueDraggable v-model="pageNameListForDrag" v-if="showPageThumbnail"
                class="pagination-thumbnail-page-container" :animation="150" :scroll="true">
                <TransitionGroup appear :css="false" @enter="handleThumbnailPageEnter"
                    @after-enter="handleThumbnailPageAfterEnter">
                    <div v-for="(item, index) in pageNameListForDrag" :key="item" :data-index="index + 1"
                        class="pagination-thumbnail-page">
                        {{ item.name }}
                    </div>
                </TransitionGroup>
            </VueDraggable>
            <div v-else class="pagination-original-page-container">
                <div v-for="i in props.pageCount" :key="i">
                    <Transition mode="out-in" :name="transitionEffectName">
                        <div ref="originalPageRef" v-show="(i - 1) === curActivePageIndex"
                            class="pagination-original-page" @wheel="handleWheel">
                            <slot :name="'originalPage' + (i - 1)"></slot>
                        </div>
                    </Transition>
                </div>
            </div>
        </Transition>
        <Transition mode="out-in" name="fade">
            <div class="pagination-name-container" v-show="showPageName">
                {{ pageName }}
            </div>
        </Transition>
        <Transition mode="out-in" name="fade">
            <div v-if="showPageThumbnail" class="pagination-thumbnail-check-button-container">
                <ButtonWrap :type="'icon'" :hover-color="'rgba(255, 255, 255, 0.1)'"
                    :active-color="'rgba(255, 255, 255, 0.2)'" @click="handleClickThumbnailCheckBtn">
                    <EnsureIcon></EnsureIcon>
                </ButtonWrap>
            </div>
            <div v-else class="pagination-bar-container" v-longpress="handleLongPressBar">
                <div v-for="i in props.pageCount" :key="i">
                    <div v-if="(i - 1) === curActivePageIndex" class="pagination-bar-item pagination-bar-item-active"
                        @click="handleSelectPage(i - 1)" @mouseenter="handleMouseEnterBarDot(i - 1)"
                        @mouseleave="handleMouseLeaveBarDot(i - 1)"></div>
                    <div v-else class="pagination-bar-item" @click="handleSelectPage(i - 1)"
                        @mouseenter="handleMouseEnterBarDot(i - 1)" @mouseleave="handleMouseLeaveBarDot(i - 1)"></div>
                </div>
            </div>
        </Transition>
    </div>

</template>

<style scoped>
.pagination-container {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: transparent;
}

.pagination-thumbnail-page-container {
    position: absolute;
    display: grid;
    grid-template-columns: repeat(auto-fill, 240px);
    grid-gap: 20px;
    align-content: baseline;
    justify-content: center;
    width: 100%;
    height: calc(100% - 60px);
    background-color: transparent;
    overflow-y: auto;
    overflow-x: hidden;
}

.pagination-thumbnail-page-container::-webkit-scrollbar {
    display: none;
}

.pagination-thumbnail-page {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: left;
    width: 240px;
    height: 160px;
    border-radius: 10px;
    background-color: transparent;
    color: rgb(255, 255, 255);
    box-shadow: var(--box-shadow-on-frosted-glass);
    backdrop-filter: blur(10px);
}

.pagination-original-page-container {
    position: absolute;
    width: 100%;
    height: calc(100% - 60px);
    background-color: transparent;
}

.pagination-original-page {
    position: absolute;
    height: 100%;
    min-width: 100%;
    background-color: transparent;
    overflow-y: auto;
    overflow-x: hidden;
}

.pagination-original-page::-webkit-scrollbar {
    display: none;
}

.pagination-name-container {
    position: absolute;
    bottom: 35px;
    color: rgba(255, 255, 255, 1);
    font-size: 14px;
    background-color: transparent;
    transition: .25s;
}

.pagination-thumbnail-check-button-container {
    cursor: pointer;
    position: absolute;
    bottom: 0;
}

.pagination-bar-container {
    cursor: pointer;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    width: auto;
    height: 30px;
    border-radius: 30px;
    background-color: transparent;
    transition: .25s;
}

.pagination-bar-container:hover {
    box-shadow: var(--box-shadow-on-frosted-glass);
    backdrop-filter: blur(10px);
}

.pagination-bar-item {
    cursor: pointer;
    width: 6px;
    height: 6px;
    margin: 0 4px;
    border-radius: 6px;
    background-color: rgba(255, 255, 255, 0.5);
    transition: .25s;
}

.pagination-bar-item:hover {
    background-color: rgba(255, 255, 255, 1);
}

.pagination-bar-item-active {
    background-color: rgba(255, 255, 255, 1);
}
</style>