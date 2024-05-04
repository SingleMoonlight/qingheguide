<script setup>
import OtherIcon from '@/components/icons/OtherIcon.vue'
import OtherMenuIcon from '@/components/icons/OtherMenuIcon.vue'
import SelectList from '@/components/SelectList.vue'
import SelectItem from '@/components/SelectItem.vue'
import ButtonWrap from '@/components/ButtonWrap.vue'
import WeatherPresenter from '@/components/WeatherPresenter.vue'
import PaginationContainer from '@/components/PaginationContainer.vue'
import WebApp from '@/components/WebApp.vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useWeatherStore } from '@/stores/weatherStore'
import { useSettingStore } from '@/stores/settingStore'
import { useWebAppStore } from '@/stores/webAppStore'
import { otherMenuList } from '@/utils/constant'
import { getWeatherInfo } from '@/api/weather'
import { onMounted, ref } from 'vue'

const emit = defineEmits(['closeNavigate', 'openSetting', 'openAbout'])
const paginationContainerRef = ref()
const showOtherMenu = ref(false)
const weatherStore = useWeatherStore()
const settingStore = useSettingStore()
const webAppStore = useWebAppStore()
const webAppGroup = ref([])
let webAppGroupLeft = 0;
let webAppGroupRight = 0;
let webAppNearLeftTime = 0;
let webAppNearRightTime = 0;

function closeNavigate(e) {
    if (e.currentTarget !== e.target) {
        // 不处理子元素的冒泡点击事件
        return;
    }
    emit('closeNavigate');
}

function openOtherMenu() {
    showOtherMenu.value = !showOtherMenu.value;
}

function selectOtherMenuItem(index) {
    showOtherMenu.value = false;

    emit(otherMenuList[index].emit);
}

function getOriginPageSlotName(index) {
    return 'originalPage' + index.toString();
}

function updateDefaultWebAppGroup(index) {
    settingStore.webAppGroup = index;
}

function updateWebAppGroupOrder(list) {
    let newWebAppGroup = [];
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length; j++) {
            if (list[i].id === webAppStore.app[j].groupId) {
                newWebAppGroup.push(webAppStore.app[j]);
            }
        }
    }
    webAppStore.app = newWebAppGroup;
    webAppGroup.value = webAppStore.app.map(item => ({
        id: item.groupId,
        name: item.groupName,
    }));
}

function handleWebAppDragStart(event) {
    let webAppParentDom = event.originalEvent.srcElement.parentElement;
    if (webAppParentDom) {
        webAppGroupLeft = webAppParentDom.getBoundingClientRect().left;
        webAppGroupRight = webAppParentDom.getBoundingClientRect().right;
    }
}

function handleWebAppDrag(event) {
    let isOnLeftEdge = event.clientX < webAppGroupLeft;
    let isOnRightEdge = event.clientX > webAppGroupRight;
    let nowTime = new Date().valueOf();

    if (isOnLeftEdge) {
        if (nowTime - webAppNearLeftTime > 1000) {
            paginationContainerRef.value.slideRight();
            webAppNearLeftTime = nowTime;
        }
    }
    if (isOnRightEdge) {
        if (nowTime - webAppNearRightTime > 1000) {
            paginationContainerRef.value.slideLeft();
            webAppNearRightTime = nowTime;
        }
    }
}

function handleClickWebAppGroup(event) {
    if (event.target === event.currentTarget) {
        emit('closeNavigate');
    }
}

function handleClickWebApp(url) {
    if (settingStore.webAppOpenMode === 'current') {
        window.location.href = url;
    } else if (settingStore.webAppOpenMode === 'new') {
        window.open(url, '_blank');
    }
}

onMounted(() => {
    if (settingStore.$state.showWeather) {
        getWeatherInfo(false, weatherStore);
    }

    webAppGroup.value = webAppStore.app.map(item => ({
        id: item.groupId,
        name: item.groupName,
    }));
})

</script>

<template>
    <div class="navigate-container" @click="closeNavigate">
        <div class="web-app-group-container">
            <PaginationContainer ref="paginationContainerRef" :page-count="webAppGroup.length"
                :active-page-index="settingStore.webAppGroup" :circular-sliding="settingStore.circularSliding"
                :flipping-effect="settingStore.flippingEffect" :page-name-list="webAppGroup"
                @change-active-page="updateDefaultWebAppGroup" @change-page-order="updateWebAppGroupOrder">
                <template #[getOriginPageSlotName(groupIndex)] v-for="(group, groupIndex) in webAppStore.app"
                    :key="groupIndex">
                    <VueDraggable class="web-app-group" v-model="webAppStore.app[groupIndex].groupApps" :animation="150"
                        :scroll="true" :group="'webApp'" @start="handleWebAppDragStart" @drag="handleWebAppDrag"
                        @click="handleClickWebAppGroup">
                        <div class="web-app-container" v-for="(app, appIndex) in webAppStore.app[groupIndex].groupApps"
                            :key="app.id">
                            <WebApp :name="app.name" :icon="app.icon" @click="handleClickWebApp(app.url)">
                            </WebApp>
                        </div>
                    </VueDraggable>
                </template>
            </PaginationContainer>
        </div>
        <div class="weather-presenter-container" v-if="settingStore.showWeather">
            <WeatherPresenter :location-name="weatherStore.location.name" :now-weather="weatherStore.nowWeather"
                :now-air="weatherStore.nowAir" :future-weather="weatherStore.futureWeather"
                :future-air="weatherStore.futureAir">
            </WeatherPresenter>
        </div>
        <div class="other-btn-container">
            <ButtonWrap :type="'icon'" :hover-color="'rgba(255, 255, 255, 0.1)'"
                :active-color="'rgba(255, 255, 255, 0.2)'" @click="openOtherMenu">
                <OtherIcon></OtherIcon>
            </ButtonWrap>
        </div>
        <div class="other-menu-container">
            <SelectList :show="showOtherMenu" :transition="'extension-from-right-top'">
                <SelectItem v-for="(item, index) in otherMenuList" :key="index" :index="index" :label="item.name"
                    @select="selectOtherMenuItem">
                    <div class="menu-item-icon">
                        <OtherMenuIcon :icon-name="item.iconName"></OtherMenuIcon>
                    </div>
                    <div class="menu-item-label">{{ item.name }}</div>
                </SelectItem>
            </SelectList>
        </div>
    </div>
</template>

<style scpoed>
.navigate-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    position: absolute;
    color: var(--primary-font-color);
}

.weather-presenter-container {
    position: absolute;
    top: 20px;
    left: 3%;
}

.other-btn-container {
    position: absolute;
    top: 20px;
    right: 3%;
}

.other-menu-container {
    position: absolute;
    top: 60px;
    right: 3%;
    width: 130px;
    border-radius: 10px;
}

.menu-item-icon {
    width: 20px;
    height: 20px;
    padding-right: 10px;
}

.menu-item-label {
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.web-app-group-container {
    position: absolute;
    display: flex;
    top: 160px;
    bottom: 80px;
    width: 80%;
    height: calc(100% - 160px - 80px);
    left: 50%;
    transform: translateX(-50%);
    background-color: transparent;
}

.web-app-group {
    width: 100%;
    height: 100%;
    position: absolute;
    display: grid;
    grid-template-columns: repeat(auto-fill, 90px);
    grid-template-rows: repeat(auto-fill, 90px);
    grid-gap: 20px;
    align-items: baseline;
    justify-items: center;
    align-content: baseline;
    justify-content: center;
    background-color: transparent;
}

.web-app-container {
    width: 60px;
    height: 60px;
}
</style>