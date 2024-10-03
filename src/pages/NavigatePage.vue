<script setup>
import OtherIcon from '@/components/icons/OtherIcon.vue'
import OtherMenuIcon from '@/components/icons/OtherMenuIcon.vue'
import SelectList from '@/components/SelectList.vue'
import SelectItem from '@/components/SelectItem.vue'
import ButtonWrap from '@/components/ButtonWrap.vue'
import WeatherPresenter from '@/components/WeatherPresenter.vue'
import PaginationContainer from '@/components/PaginationContainer.vue'
import WebApp from '@/components/WebApp.vue'
import WebAppMenuIcon from '@/components/icons/WebAppMenuIcon.vue'
import WebAppGroupMenuIcon from '@/components/icons/WebAppGroupMenuIcon.vue'
import WebAppHandleForm from '@/components/WebAppHandleForm.vue'
import WebAppGroupHandleForm from '@/components/WebAppGroupHandleForm.vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useWeatherStore } from '@/stores/weatherStore'
import { useSettingStore } from '@/stores/settingStore'
import { useWebAppStore } from '@/stores/webAppStore'
import { useMessageBoxStore } from '@/stores/messageBoxStore'
import { useFlagStore } from '@/stores/flagStore'
import {
    otherMenuList, webAppMenuList, webAppGroupMenuList,
    defaultImgPlaceHolder, flippingInterval
} from '@/utils/constant'
import { generateUID } from '@/utils/common'
import { setWebAppIconImg, deleteWebAppIconImg } from '@/utils/indexedDB'
import { getWeatherInfo } from '@/api/weather'
import { onMounted, ref } from 'vue'

const emit = defineEmits(['closeNavigate', 'openSetting', 'openAbout'])
const paginationContainerRef = ref()
const showOtherMenu = ref(false)
const showWebAppGroup = ref(true)
const showWebAppMenu = ref(false)
const showWebAppGroupMenu = ref(false)
const showWebAppHandler = ref(false)
const webAppHandlerType = ref('edit')
const showWebAppGroupHandler = ref(false)
const webAppGroupHandlerType = ref('edit')
const webAppMenuRef = ref()
const webAppGroupMenuRef = ref()
const weatherStore = useWeatherStore()
const settingStore = useSettingStore()
const webAppStore = useWebAppStore()
const messageBoxStore = useMessageBoxStore()
const flagStore = useFlagStore()
const webAppGroup = ref([])
const webAppTransition = ref('')
const checkedWebApp = ref(null)
let webAppGroupLeft = 0
let webAppGroupRight = 0

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

function closeContextMenu() {
    showWebAppMenu.value = false;
    showWebAppGroupMenu.value = false;
}

function getOriginPageSlotName(index) {
    return 'originalPage' + index.toString();
}

function updateDefaultWebAppGroup(index) {
    settingStore.$state.webAppGroupIndex = index;
    showWebAppMenu.value = false;
    showWebAppGroupMenu.value = false;
}

function updateWebAppGroup() {
    webAppGroup.value = webAppStore.$state.webAppGroups.map(item => ({
        id: item.groupId,
        name: item.groupName,
    }));
}

function updateWebAppGroupOrder(list) {
    let newWebAppGroup = [];
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length; j++) {
            if (list[i].id === webAppStore.$state.webAppGroups[j].groupId) {
                newWebAppGroup.push(webAppStore.$state.webAppGroups[j]);
            }
        }
    }
    webAppStore.$state.webAppGroups = newWebAppGroup;
    updateWebAppGroup();
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

    if (isOnLeftEdge) {
        paginationContainerRef.value.slideRight();
    }
    if (isOnRightEdge) {
        paginationContainerRef.value.slideLeft();
    }
}

function handleClickWebAppGroup(event) {
    if (event.target === event.currentTarget) {
        if (!showWebAppMenu.value && !showWebAppGroupMenu.value) {
            emit('closeNavigate');
        }
    }
}

function handleClickWebApp(url) {
    if (settingStore.$state.webAppOpenMode === 'current') {
        window.location.href = url;
    } else if (settingStore.$state.webAppOpenMode === 'new') {
        window.open(url, '_blank');
    }
}

function handleRightClickWebApp(app, event) {
    let x = event.pageX;
    let y = event.pageY;
    showWebAppMenu.value = false;
    showWebAppGroupMenu.value = false;

    requestAnimationFrame(() => {
        if (webAppMenuRef.value) {
            webAppMenuRef.value.style.left = `${x}px`;
            webAppMenuRef.value.style.top = `${y}px`;
        }
        showWebAppMenu.value = true;
    })

    checkedWebApp.value = app;
}

function handleRightClickWebAppGroup(group, event) {
    if (event.target !== event.currentTarget) {
        return;
    }

    let x = event.pageX;
    let y = event.pageY;
    showWebAppMenu.value = false;
    showWebAppGroupMenu.value = false;

    requestAnimationFrame(() => {
        if (webAppGroupMenuRef.value) {
            webAppGroupMenuRef.value.style.left = `${x}px`;
            webAppGroupMenuRef.value.style.top = `${y}px`;
        }
        showWebAppGroupMenu.value = true;
    })
}

function handleClickOutsideWebAppMenu() {
    if (showWebAppMenu.value) {
        showWebAppMenu.value = false;
    }
}

function handleClickOutsideWebAppGroupMenu() {
    if (showWebAppGroupMenu.value) {
        showWebAppGroupMenu.value = false;
    }
}

function closeWebAppHandler() {
    showWebAppHandler.value = false;
    webAppHandlerType.value = 'edit';
}

function handleGetWebAppIcon(state) {
    if (state === 'URLInvalid') {
        messageBoxStore.openMessageBox('warn', '提示', '您输入的App网址异常，无法自动获取图标，请重新输入或者选择自定义图标。',
            {
                okBtnText: '确定',
            }
        );
    } else if (state === 'AutoGetIcon') {
        flagStore.setShowGlobalLoading(true);
    } else if (state === 'LoadIconSuccess') {
        flagStore.setShowGlobalLoading(false);
    } else if (state === 'AutoGetIconError') {
        flagStore.setShowGlobalLoading(false);
        messageBoxStore.openMessageBox('warn', '提示', '自动获取图标失败，请重试或者选择自定义图标。',
            {
                okBtnText: '确定',
            }
        );
    } else if (state === 'CustomIconLoadError') {
        flagStore.setShowGlobalLoading(false);
        messageBoxStore.openMessageBox('warn', '提示', '自定义图标加载失败，请尝试刷新页面或者重新选择自定义图标。',
            {
                okBtnText: '确定',
            }
        );
    }
}

function checkWebAppValid(webApp) {
    if (webApp.name === '') {
        messageBoxStore.openMessageBox('warn', '提示', '请输入App名称。',
            {
                okBtnText: '确定',
            }
        );
        return false;
    } else if (webApp.url === '') {
        messageBoxStore.openMessageBox('warn', '提示', '请输入App网址。',
            {
                okBtnText: '确定',
            }
        );
        return false;
    } else if (webApp.iconSource === 'none') {
        messageBoxStore.openMessageBox('warn', '提示', '请设置App图标。',
            {
                okBtnText: '确定',
            }
        );
        return false;
    }
    return true;
}

function handleEditWebApp(oldApp, newWebApp) {
    if (!checkWebAppValid(newWebApp)) {
        return;
    }

    let uid = oldApp.id;
    if (newWebApp.iconSource === 'custom') {
        // 保存图标至indexed DB
        setWebAppIconImg(uid, newWebApp.iconFile);
    } else if (newWebApp.iconSource === 'auto') {
        // 删除原有的图标
        deleteWebAppIconImg(uid);
    }

    oldApp.id = uid;
    oldApp.name = newWebApp.name;
    oldApp.url = newWebApp.url;
    oldApp.iconSource = newWebApp.iconSource;
    oldApp.icon = newWebApp.iconUrl;

    closeWebAppHandler();
}

function handleAddWebApp(webApp) {
    if (!checkWebAppValid(webApp)) {
        return;
    }

    let uid = generateUID();
    let savedWebApp = {
        id: uid,
        name: webApp.name,
        url: webApp.url,
        iconSource: webApp.iconSource,
        icon: webApp.iconUrl,
    }
    if (webApp.iconSource === 'custom') {
        // 保存图标至indexed DB
        setWebAppIconImg(uid, webApp.iconFile);
    }
    webAppStore.$state.webAppGroups[settingStore.$state.webAppGroupIndex].groupApps.push(savedWebApp);

    closeWebAppHandler();
}

function handleDeleteWebApp(webApp, deleteNotice) {
    settingStore.$state.deleteWebAppNotice = deleteNotice;

    if (webApp === null) {
        return;
    }

    let groupApps = webAppStore.$state.webAppGroups[settingStore.$state.webAppGroupIndex].groupApps;
    let appIndex = groupApps.findIndex(item => item.id === webApp.id);
    if (appIndex < 0) {
        return;
    }

    if (webApp.iconSource === 'custom') {
        deleteWebAppIconImg(webApp.id);
    }

    // 指定过渡动画，删除后其他元素顺序过渡
    webAppTransition.value = 'list';
    groupApps.splice(appIndex, 1);

    requestAnimationFrame(() => {
        webAppTransition.value = '';
    });
    closeWebAppHandler();
}

function selectWebAppMenuItem(index) {
    showWebAppMenu.value = false;
    if (webAppMenuList[index].iconName === 'editApp') {
        showWebAppHandler.value = true;
        webAppHandlerType.value = 'edit';
    } else if (webAppMenuList[index].iconName === 'deleteApp') {
        if (settingStore.$state.deleteWebAppNotice) {
            showWebAppHandler.value = true;
            webAppHandlerType.value = 'delete';
        } else {
            handleDeleteWebApp(false);
        }
    }
}

function closeWebAppGroupHandler() {
    showWebAppGroupHandler.value = false;
    webAppGroupHandlerType.value = 'edit';
}

function handleDeleteWebAppGroup(deleteNotice) {
    settingStore.$state.deleteWebAppGroupNotice = deleteNotice;

    let curGroupNum = webAppStore.$state.webAppGroups.length;
    if (curGroupNum === 1) {
        messageBoxStore.openMessageBox('warn', '提示', '当前仅剩一个分组，无法删除。',
            {
                okBtnText: '确定',
            }
        );
        return;
    }

    let groupIndex = settingStore.$state.webAppGroupIndex;
    let group = webAppStore.$state.webAppGroups[groupIndex];

    // 删除分组时，同步删除自定义图标
    group.groupApps.forEach(webApp => {
        if (webApp.iconSource === 'custom') {
            deleteWebAppIconImg(webApp.id);
        }
    })

    showWebAppGroup.value = false;

    webAppStore.$state.webAppGroups.splice(groupIndex, 1);
    settingStore.$state.webAppGroupIndex = groupIndex === curGroupNum - 1 ? 0 : groupIndex;

    updateWebAppGroup();
    requestAnimationFrame(() => {
        showWebAppGroup.value = true;
    });
    closeWebAppGroupHandler();
}

function handleEditWebAppGroup(newName) {
    if (newName === '') {
        messageBoxStore.openMessageBox('warn', '提示', '分组名不能为空。',
            {
                okBtnText: '确定',
            }
        );
        return;
    }

    let groupIndex = settingStore.$state.webAppGroupIndex;
    let group = webAppStore.$state.webAppGroups[groupIndex];

    group.groupName = newName;

    updateWebAppGroup();
    closeWebAppGroupHandler();
}

function handleAddWebAppGroup(groupName) {
    if (groupName === '') {
        messageBoxStore.openMessageBox('warn', '提示', '分组名不能为空。',
            {
                okBtnText: '确定',
            }
        );
        return;
    }

    webAppStore.$state.webAppGroups.push({
        groupId: generateUID(),
        groupName: groupName,
        groupApps: [],
    })
    // 自动跳转到新增分组
    settingStore.$state.webAppGroupIndex = webAppStore.$state.webAppGroups.length - 1;
    updateWebAppGroup();
    closeWebAppGroupHandler();
}

function selectWebAppGroupMenuItem(index) {
    showWebAppGroupMenu.value = false;
    if (webAppGroupMenuList[index].iconName === 'addApp') {
        showWebAppHandler.value = true;
        webAppHandlerType.value = 'add';
    } else if (webAppGroupMenuList[index].iconName === 'addGroup') {
        showWebAppGroupHandler.value = true;
        webAppGroupHandlerType.value = 'add';
    } else if (webAppGroupMenuList[index].iconName === 'editGroup') {
        showWebAppGroupHandler.value = true;
        webAppGroupHandlerType.value = 'edit';
    } else if (webAppGroupMenuList[index].iconName === 'deleteGroup') {
        if (settingStore.$state.deleteWebAppGroupNotice) {
            showWebAppGroupHandler.value = true;
            webAppGroupHandlerType.value = 'delete';
        } else {
            handleDeleteWebAppGroup(false);
        }
    }
}

onMounted(() => {
    if (settingStore.$state.showWeather) {
        getWeatherInfo(weatherStore);
    }

    updateWebAppGroup();
})

</script>

<template>
    <div class="navigate-container" @click="closeNavigate">
        <Transition mode="out-in" name="fade">
            <div class="web-app-group-container" v-if="showWebAppGroup">
                <PaginationContainer ref="paginationContainerRef" :page-count="webAppGroup.length"
                    :active-page-index="settingStore.webAppGroupIndex" :circular-sliding="settingStore.circularSliding"
                    :flipping-effect="settingStore.flippingEffect" :flipping-interval="flippingInterval"
                    :page-list="webAppGroup" @change-active-page="updateDefaultWebAppGroup"
                    @change-page-order="updateWebAppGroupOrder" @longpress-bar="closeContextMenu">
                    <template #[getOriginPageSlotName(groupIndex)] v-for="(group, groupIndex) in webAppStore.webAppGroups"
                        :key="groupIndex">
                        <VueDraggable class="web-app-group" v-model="webAppStore.webAppGroups[groupIndex].groupApps"
                            :animation="150" :scroll="true" :group="'webApp'" @start="handleWebAppDragStart"
                            @drag="handleWebAppDrag" @click="handleClickWebAppGroup"
                            @contextmenu="handleRightClickWebAppGroup(group, $event)">
                            <TransitionGroup :css="false" :name="webAppTransition">
                                <div class="web-app-container" v-for="app in webAppStore.webAppGroups[groupIndex].groupApps"
                                    :key="app">
                                    <WebApp :name="app.name" :icon="app.icon" :show-name="settingStore.showWebAppName"
                                        :default-icon="defaultImgPlaceHolder" @click="handleClickWebApp(app.url)"
                                        @contextmenu="handleRightClickWebApp(app, $event)">
                                    </WebApp>
                                </div>
                            </TransitionGroup>
                        </VueDraggable>
                    </template>
                </PaginationContainer>
            </div>
        </Transition>
        <div class="weather-presenter-container" v-if="settingStore.showWeather">
            <WeatherPresenter :location-name="weatherStore.location.name" :now-weather="weatherStore.nowWeather"
                :suggestion="weatherStore.suggestion" :future-weather="weatherStore.futureWeather">
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
        <div class="web-app-menu-container" ref="webAppMenuRef" v-clickoutside="handleClickOutsideWebAppMenu">
            <SelectList :show="showWebAppMenu" :transition="'extension-from-left-top'">
                <SelectItem v-for="(item, index) in webAppMenuList" :key="index" :index="index" :label="item.name"
                    @select="selectWebAppMenuItem">
                    <div class="menu-item-icon">
                        <WebAppMenuIcon :icon-name="item.iconName"></WebAppMenuIcon>
                    </div>
                    <div class="menu-item-label">{{ item.name }}</div>
                </SelectItem>
            </SelectList>
        </div>
        <div class="web-app-group-menu-container" ref="webAppGroupMenuRef"
            v-clickoutside="handleClickOutsideWebAppGroupMenu">
            <SelectList :show="showWebAppGroupMenu" :transition="'extension-from-left-top'">
                <SelectItem v-for="(item, index) in webAppGroupMenuList" :key="index" :index="index" :label="item.name"
                    @select="selectWebAppGroupMenuItem">
                    <div class="menu-item-icon">
                        <WebAppGroupMenuIcon :icon-name="item.iconName"></WebAppGroupMenuIcon>
                    </div>
                    <div class="menu-item-label">{{ item.name }}</div>
                </SelectItem>
            </SelectList>
        </div>
        <Transition mode="out-in" name="fade">
            <WebAppHandleForm v-if="showWebAppHandler" :type="webAppHandlerType" :app="checkedWebApp"
                :icon-placeholder="defaultImgPlaceHolder" @close="closeWebAppHandler" @delete="handleDeleteWebApp"
                @edit="handleEditWebApp" @add="handleAddWebApp" @get-icon="handleGetWebAppIcon">
            </WebAppHandleForm>
        </Transition>
        <Transition mode="out-in" name="fade">
            <WebAppGroupHandleForm v-if="showWebAppGroupHandler" :type="webAppGroupHandlerType"
                :group-name="webAppGroup[settingStore.webAppGroupIndex].name" @close="closeWebAppGroupHandler"
                @delete="handleDeleteWebAppGroup" @edit="handleEditWebAppGroup" @add="handleAddWebAppGroup">
            </WebAppGroupHandleForm>
        </Transition>
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
    display: flex;
    align-items: center;
    justify-content: center;
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
    width: 70px;
    height: 70px;
}

.web-app-menu-container {
    position: absolute;
    width: 130px;
    border-radius: 10px;
}

.web-app-group-menu-container {
    position: absolute;
    width: 130px;
    border-radius: 10px;
}
</style>