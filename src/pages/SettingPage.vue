<script setup>
import CardContainer from '@/components/CardContainer.vue'
import SettingItem from '@/components/SettingItem.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import BackIcon from '@/components/icons/BackIcon.vue'
import BackgroundImage from '@/components/BackgroundImage.vue'
import ButtonWrap from '@/components/ButtonWrap.vue'
import SelectList from '@/components/SelectList.vue'
import SelectItem from '@/components/SelectItem.vue'
import { useSettingStore } from '@/stores/settingStore'
import { useMessageBoxStore } from '@/stores/messageBoxStore'
import { useFlagStore } from '@/stores/flagStore'
import { useWeatherStore } from '@/stores/weatherStore'
import { setBackgroundImg, deleteBackgroundImg } from '@/utils/indexedDB'
import {
    defaultBackgroundUrl, themeList, bgSourceList, timeFontWeightList,
    searchOpenModeList, weatherLocationModeList, webAppOpenModeList,
    flippingEffectList
} from '@/utils/constant'
import { searchLocation, getWeatherInfo, getCurrentLocation } from '@/api/weather'
import { setClassForElement, isValidURL, printLog } from '@/utils/common'
import { ref, onMounted } from 'vue'

const emit = defineEmits(['closeSetting'])
const settingStore = useSettingStore()
const messageBoxStore = useMessageBoxStore()
const flagStore = useFlagStore()
const weatherStore = useWeatherStore()
const mainSettingPaneRef = ref()
const themeSettingPaneRef = ref()
const bgSettingPaneRef = ref()
const settingBgInputRef = ref()
const timeFontWeightSettingPaneRef = ref()
const blurBackgroundSettingPaneRef = ref()
const copyrightSettingPaneRef = ref()
const searchOpenModeSettingPaneRef = ref()
const customSearchEngineSettingPaneRef = ref()
const autoFocusSearchInputSettingPaneRef = ref()
const weatherLocationSettingPaneRef = ref()
const showWeatherSettingPaneRef = ref()
const webAppOpenModeSettingPaneRef = ref()
const flippingEffectSettingPaneRef = ref()
const weatherLocationList = ref([])
const showWeatherLocationList = ref(false)
const showSettingPane = ref(false)

function setBackground(e) {
    let imgFile = e.target.files[0];
    if (imgFile) {
        // 将图片保存至indexedDB
        setBackgroundImg(imgFile);
        settingStore.$state.backgroundSource = 'custom';
    }
}

function getThemeName(theme) {
    return themeList.filter(obj => obj.theme === theme)[0].name;
}

function getThemeIndex(theme) {
    return themeList.findIndex(obj => obj.theme === theme);
}

function selectTheme(index) {
    settingStore.$state.theme = themeList[index].theme;
    setClassForElement('qinghe-guide', settingStore.$state.theme);
}

function getBgSourceName(source) {
    return bgSourceList.filter(obj => obj.source === source)[0].name;
}

function getBgSourceIndex(source) {
    return bgSourceList.findIndex(obj => obj.source === source);
}

function selectBgSource(index) {
    if (bgSourceList[index].source === 'custom') {
        let bgInputDom = settingBgInputRef.value;
        bgInputDom.click();
    } else if (bgSourceList[index].source === 'default') {
        settingStore.$state.backgroundUrl = defaultBackgroundUrl;
        settingStore.$state.backgroundSource = 'default';

        deleteBackgroundImg();
    }
}

function getTimeFontWeightName(weight) {
    return timeFontWeightList.filter(obj => obj.weight === weight)[0].name;
}

function getTimeFontWeightIndex(weight) {
    return timeFontWeightList.findIndex(obj => obj.weight === weight);
}

function selectTimeFontWeight(index) {
    settingStore.$state.timeFontWeight = timeFontWeightList[index].weight;
}

function getSearchOpenModeName(mode) {
    return searchOpenModeList.filter(obj => obj.mode === mode)[0].name;
}

function getSearchOpenModeIndex(mode) {
    return searchOpenModeList.findIndex(obj => obj.mode === mode);
}

function selectSearchOpenMode(index) {
    settingStore.$state.searchOpenMode = searchOpenModeList[index].mode;
}

function getOnoffName(onoff) {
    return onoff ? '打开' : '关闭';
}

function updateCustomSearchEngineUrl(url) {
    if (isValidURL(url)) {
        settingStore.$state.customSearchEngineUrl = url;
    } else {
        messageBoxStore.openMessageBox('warn', '提示', '您输入的URL格式可能不正确，请确认或者重新输入。',
            {
                okBtnText: '确定',
                cancelBtnText: '重新输入',
                okHandler: () => {
                    settingStore.$state.customSearchEngineUrl = url;
                },
            }
        );
    }
}

function getWeatherLocationModeName(mode) {
    return weatherLocationModeList.filter(obj => obj.mode === mode)[0].name;
}

function getWeatherLocationModeIndex(mode) {
    return weatherLocationModeList.findIndex(obj => obj.mode === mode);
}

function selectWeatherLocationMode(index) {
    if (weatherLocationModeList[index].mode === 'auto') {
        flagStore.setShowGlobalLoading(true);
        getCurrentLocation().then(res => {
            weatherStore.$state.location.id = res.id;
            weatherStore.$state.location.name = res.name;
            weatherStore.$state.location.adm1 = res.adm1;
            weatherStore.$state.location.adm2 = res.adm2;

            flagStore.setShowGlobalLoading(false);
            settingStore.$state.weatherLocationMode = 'auto';
        }).catch(err => {
            flagStore.setShowGlobalLoading(false);
            messageBoxStore.openMessageBox('warn', '提示', err.message,
                {
                    okBtnText: '确定',
                }
            )
        })
    } else if (weatherLocationModeList[index].mode === 'custom') {
        settingStore.$state.weatherLocationMode = 'custom';
    }
}

function searchWeatherLocation(input) {
    if (input.trim() === '') {
        messageBoxStore.openMessageBox('warn', '提示', '请先输入您想搜索的城市地点。',
            {
                okBtnText: '好的',
            }
        );
        return;
    }
    showWeatherLocationList.value = false;
    flagStore.setShowGlobalLoading(true);

    searchLocation(input).then(res => {
        showWeatherLocationList.value = true;
        weatherLocationList.value = res.map(
            item => ({
                id: item.id,
                name: item.name,
                adm1: item.adm1,
                adm2: item.adm2,
            })
        )

        flagStore.setShowGlobalLoading(false);
        printLog('result', 'searchLocation', res);
    }).catch(err => {
        showWeatherLocationList.value = false;
        flagStore.setShowGlobalLoading(false);
        messageBoxStore.openMessageBox('warn', '提示', '搜索地点失败，请确认输入是否正确，如果输入正确请检查网络是否连接。',
            {
                okBtnText: '好的',
            }
        );
        printLog('error', 'searchLocation', err);
    })
}

function selectWeatherLocation(index) {
    weatherStore.$state.location = weatherLocationList.value[index];
    getWeatherInfo(true, weatherStore);

    showWeatherLocationList.value = false;
    weatherLocationList.value = [...[]];
}

function getWebAppOpenModeName(mode) {
    return webAppOpenModeList.filter(obj => obj.mode === mode)[0].name;
}

function getWebAppOpenModeIndex(mode) {
    return webAppOpenModeList.findIndex(obj => obj.mode === mode);
}

function selectWebAppOpenMode(index) {
    settingStore.$state.webAppOpenMode = webAppOpenModeList[index].mode;
}

function getFlippingEffectName(effect) {
    return flippingEffectList.filter(obj => obj.effect === effect)[0].name;
}

function getFlippingEffectIndex(effect) {
    return flippingEffectList.findIndex(obj => obj.effect === effect);
}

function selectFlippingEffect(index) {
    settingStore.$state.flippingEffect = flippingEffectList[index].effect;
}

function goToNext(cur, next) {
    if (cur === null || cur === undefined) return;
    if (next === null || next === undefined) return;

    cur.classList.remove("setting-pane-enter");
    cur.classList.add("setting-pane-leave");

    next.classList.remove("setting-pane-before-enter");
    next.classList.add("setting-pane-enter");
}

function backToPrev(cur, prev) {
    if (cur === null || cur === undefined) return;
    if (prev === null || prev === undefined) return;

    cur.classList.remove("setting-pane-enter");
    cur.classList.add("setting-pane-before-enter");

    prev.classList.remove("setting-pane-leave");
    prev.classList.add("setting-pane-enter");
}

onMounted(() => {
    showSettingPane.value = true
})

</script>

<template>
    <div class="setting-container">
        <Transition name="extension-from-center">
            <div ref="mainSettingPaneRef" class="setting-pane setting-pane-enter" v-show="showSettingPane">
                <div class="setting-pane-header">
                    <div class="setting-pane-title">
                        设置
                    </div>
                    <ButtonWrap :type="'icon'" @click="emit('closeSetting')">
                        <CloseIcon></CloseIcon>
                    </ButtonWrap>
                </div>
                <div class="setting-pane-body">
                    <CardContainer :card-name="'外观'">
                        <SettingItem :label="'主题'" :type="'next'" :next-value="getThemeName(settingStore.theme)"
                            @open-next="goToNext(mainSettingPaneRef, themeSettingPaneRef)">
                        </SettingItem>
                        <SettingItem :label="'背景'" :type="'next'"
                            :next-value="getBgSourceName(settingStore.backgroundSource)"
                            @open-next="goToNext(mainSettingPaneRef, bgSettingPaneRef)">
                        </SettingItem>
                        <SettingItem :label="'背景遮罩'" :type="'next'"
                            :next-value="getOnoffName(settingStore.blurBackground)"
                            @open-next="goToNext(mainSettingPaneRef, blurBackgroundSettingPaneRef)">
                        </SettingItem>
                        <SettingItem :label="'备案信息'" :type="'next'"
                            :next-value="getOnoffName(settingStore.showCopyright)"
                            @open-next="goToNext(mainSettingPaneRef, copyrightSettingPaneRef)">
                        </SettingItem>
                    </CardContainer>
                    <CardContainer :card-name="'时间日期'">
                        <SettingItem :label="'时间'" :type="'switch'" :onoff="settingStore.showTime"
                            @turn-switch="settingStore.showTime = !settingStore.showTime">
                        </SettingItem>
                        <SettingItem :label="'日期'" :type="'switch'" :onoff="settingStore.showDate"
                            @turn-switch="settingStore.showDate = !settingStore.showDate">
                        </SettingItem>
                        <SettingItem :label="'秒钟'" :type="'switch'" :onoff="settingStore.showSecond"
                            @turn-switch="settingStore.showSecond = !settingStore.showSecond">
                        </SettingItem>
                        <SettingItem :label="'时间分隔符闪烁'" :type="'switch'" :onoff="settingStore.blinkTimeSeparator"
                            @turn-switch="settingStore.blinkTimeSeparator = !settingStore.blinkTimeSeparator">
                        </SettingItem>
                        <SettingItem :label="'时间字体粗细'" :type="'next'"
                            :next-value="getTimeFontWeightName(settingStore.timeFontWeight)"
                            @open-next="goToNext(mainSettingPaneRef, timeFontWeightSettingPaneRef)">
                        </SettingItem>
                    </CardContainer>
                    <CardContainer :card-name="'天气'">
                        <SettingItem :label="'天气'" :type="'next'" :next-value="getOnoffName(settingStore.showWeather)"
                            @open-next="goToNext(mainSettingPaneRef, showWeatherSettingPaneRef)">
                        </SettingItem>
                        <SettingItem :label="'天气定位'" :type="'next'"
                            :next-value="getWeatherLocationModeName(settingStore.weatherLocationMode)"
                            @open-next="goToNext(mainSettingPaneRef, weatherLocationSettingPaneRef)">
                        </SettingItem>
                    </CardContainer>
                    <CardContainer :card-name="'搜索'">
                        <SettingItem :label="'搜索历史'" :type="'switch'" :onoff="settingStore.openHistory"
                            @turn-switch="settingStore.openHistory = !settingStore.openHistory">
                        </SettingItem>
                        <SettingItem :label="'搜索建议'" :type="'switch'" :onoff="settingStore.openSuggest"
                            @turn-switch="settingStore.openSuggest = !settingStore.openSuggest">
                        </SettingItem>
                        <SettingItem :label="'自动聚焦搜索框'" :type="'next'"
                            :next-value="getOnoffName(settingStore.autoFocusSearchInput)"
                            @open-next="goToNext(mainSettingPaneRef, autoFocusSearchInputSettingPaneRef)">
                        </SettingItem>
                        <SettingItem :label="'搜索打开方式'" :type="'next'"
                            :next-value="getSearchOpenModeName(settingStore.searchOpenMode)"
                            @open-next="goToNext(mainSettingPaneRef, searchOpenModeSettingPaneRef)">
                        </SettingItem>
                        <SettingItem :label="'自定义搜索引擎'" :type="'next'" :next-value="settingStore.customSearchEngineUrl"
                            @open-next="goToNext(mainSettingPaneRef, customSearchEngineSettingPaneRef)">
                        </SettingItem>
                    </CardContainer>
                    <CardContainer :card-name="'导航'">
                        <SettingItem :label="'分组循环滑动'" :type="'switch'" :onoff="settingStore.circularSliding"
                            @turn-switch="settingStore.circularSliding = !settingStore.circularSliding">
                        </SettingItem>
                        <SettingItem :label="'显示App名称'" :type="'switch'" :onoff="settingStore.showWebAppName"
                            @turn-switch="settingStore.showWebAppName = !settingStore.showWebAppName">
                        </SettingItem>
                        <SettingItem :label="'删除App时提示'" :type="'switch'" :onoff="settingStore.deleteWebAppNotice"
                            @turn-switch="settingStore.deleteWebAppNotice = !settingStore.deleteWebAppNotice">
                        </SettingItem>
                        <SettingItem :label="'App打开方式'" :type="'next'"
                            :next-value="getWebAppOpenModeName(settingStore.webAppOpenMode)"
                            @open-next="goToNext(mainSettingPaneRef, webAppOpenModeSettingPaneRef)">
                        </SettingItem>
                        <SettingItem :label="'分组翻页效果'" :type="'next'"
                            :next-value="getFlippingEffectName(settingStore.flippingEffect)"
                            @open-next="goToNext(mainSettingPaneRef, flippingEffectSettingPaneRef)">
                        </SettingItem>
                    </CardContainer>
                </div>
            </div>
        </Transition>
        <div ref="themeSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn" @click="backToPrev(themeSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    设置
                </div>
            </div>
            <div class="setting-pane-body">
                <CardContainer :card-name="'主题'">
                    <SettingItem v-for="(item, index) in themeList" :key="index" :type="'list'" :label="item.name"
                        :checked="getThemeIndex(settingStore.theme) === index" @checked-list-item="selectTheme(index)">
                    </SettingItem>
                </CardContainer>
            </div>
        </div>
        <div ref="bgSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn" @click="backToPrev(bgSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    设置
                </div>
            </div>
            <div class="setting-pane-body">
                <CardContainer :card-name="'背景'">
                    <SettingItem v-for="(item, index) in bgSourceList" :key="index" :type="'list'" :label="item.name"
                        :checked="getBgSourceIndex(settingStore.backgroundSource) === index"
                        @checked-list-item="selectBgSource(index)">
                    </SettingItem>
                </CardContainer>
                <CardContainer :card-name="'预览'">
                    <BackgroundImage :background-url="settingStore.$state.backgroundUrl">
                    </BackgroundImage>
                </CardContainer>
                <div v-show="false">
                    <input ref="settingBgInputRef" type="file" accept="image/*" @change="setBackground" />
                </div>
            </div>
        </div>
        <div ref="timeFontWeightSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn"
                    @click="backToPrev(timeFontWeightSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    设置
                </div>
            </div>
            <div class="setting-pane-body">
                <CardContainer :card-name="'时间字体粗细'">
                    <SettingItem v-for="(item, index) in timeFontWeightList" :key="index" :type="'list'"
                        :label="item.name" :checked="getTimeFontWeightIndex(settingStore.timeFontWeight) === index"
                        @checked-list-item="selectTimeFontWeight(index)">
                    </SettingItem>
                </CardContainer>
            </div>
        </div>
        <div ref="blurBackgroundSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn"
                    @click="backToPrev(blurBackgroundSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    设置
                </div>
            </div>
            <div class="setting-pane-body">
                <CardContainer :card-name="'背景遮罩'" :card-des="'关闭后搜索、导航、设置和关于页面背景不显示毛玻璃效果，组件毛玻璃效果不受影响。'">
                    <SettingItem :label="'开关'" :type="'switch'" :onoff="settingStore.blurBackground"
                        @turn-switch="settingStore.blurBackground = !settingStore.blurBackground">
                    </SettingItem>
                </CardContainer>
            </div>
        </div>
        <div ref="copyrightSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn" @click="backToPrev(copyrightSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    设置
                </div>
            </div>
            <div class="setting-pane-body">
                <CardContainer :card-name="'备案信息'" :card-des="'根据国家有关法律规定，网站首页底部默认需要展示网站相关备案信息。'">
                    <SettingItem :label="'开关'" :type="'switch'" :onoff="settingStore.showCopyright"
                        @turn-switch="settingStore.showCopyright = !settingStore.showCopyright">
                    </SettingItem>
                </CardContainer>
            </div>
        </div>
        <div ref="searchOpenModeSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn"
                    @click="backToPrev(searchOpenModeSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    设置
                </div>
            </div>
            <div class="setting-pane-body">
                <CardContainer :card-name="'搜索打开方式'">
                    <SettingItem v-for="(item, index) in searchOpenModeList" :key="index" :type="'list'"
                        :label="item.name" :checked="getSearchOpenModeIndex(settingStore.searchOpenMode) === index"
                        @checked-list-item="selectSearchOpenMode(index)">
                    </SettingItem>
                </CardContainer>
            </div>
        </div>
        <div ref="customSearchEngineSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn"
                    @click="backToPrev(customSearchEngineSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    设置
                </div>
            </div>
            <div class="setting-pane-body">
                <CardContainer :card-name="'自定义搜索引擎'" :card-des="'搜索引擎URL 一般以https://开头，搜索关键字参数及连接符结尾。'">
                    <SettingItem :type="'input'" :label="'URL'" :input-value="settingStore.customSearchEngineUrl"
                        @ensure-input="updateCustomSearchEngineUrl">
                    </SettingItem>
                </CardContainer>
            </div>
        </div>
        <div ref="autoFocusSearchInputSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn"
                    @click="backToPrev(autoFocusSearchInputSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    设置
                </div>
            </div>
            <div class="setting-pane-body">
                <CardContainer :card-name="'自动聚焦搜索框'" :card-des="'开启后，在进入页面时搜索框将直接处于输入状态。'">
                    <SettingItem :label="'开关'" :type="'switch'" :onoff="settingStore.autoFocusSearchInput"
                        @turn-switch="settingStore.autoFocusSearchInput = !settingStore.autoFocusSearchInput">
                    </SettingItem>
                </CardContainer>
            </div>
        </div>
        <div ref="weatherLocationSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn"
                    @click="backToPrev(weatherLocationSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    设置
                </div>
            </div>
            <div class="setting-pane-body">
                <CardContainer :card-name="'天气定位'"
                    :card-des="'默认使用自定义模式，首次使用请搜索城市并更新地点。使用自动定位功能需要浏览器支持，且需要您进行授权。自动定位可能存在误差，如果定位不准，请切换至自定义模式。'">
                    <SettingItem v-for="(item, index) in weatherLocationModeList" :key="index" :type="'list'"
                        :label="item.name"
                        :checked="getWeatherLocationModeIndex(settingStore.weatherLocationMode) === index"
                        @checked-list-item="selectWeatherLocationMode(index)">
                    </SettingItem>
                </CardContainer>
                <CardContainer :card-name="'地点'">
                    <SettingItem :label="'省/市'" :type="'text'" :text-value="weatherStore.location.adm1"></SettingItem>
                    <SettingItem :label="'市/区'" :type="'text'" :text-value="weatherStore.location.adm2"></SettingItem>
                    <SettingItem :label="'区/县'" :type="'text'" :text-value="weatherStore.location.name"></SettingItem>
                </CardContainer>
                <CardContainer :card-name="'搜索城市'" v-show="settingStore.weatherLocationMode === 'custom'">
                    <SettingItem :label="'请输入城市名'" :type="'input'" @ensure-input="searchWeatherLocation">
                    </SettingItem>
                </CardContainer>
                <SelectList :show="showWeatherLocationList" :transition="'stretch'" class="weather-location-list">
                    <SelectItem v-for="(item, index) in weatherLocationList" :key="index" :index="index"
                        :label="item.adm1 + ' ' + item.adm2 + ' ' + item.name" @select="selectWeatherLocation">
                    </SelectItem>
                </SelectList>
            </div>
        </div>
        <div ref="showWeatherSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn" @click="backToPrev(showWeatherSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    设置
                </div>
            </div>
            <div class="setting-pane-body">
                <CardContainer :card-name="'天气'" :card-des="'开启时可以在导航页面右上角查看当前位置或者指定位置的天气信息。'">
                    <SettingItem :label="'显示天气'" :type="'switch'" :onoff="settingStore.showWeather"
                        @turn-switch="settingStore.showWeather = !settingStore.showWeather">
                    </SettingItem>
                </CardContainer>
                <div class="weather-info-des">
                    <div>
                        天气服务：
                        <a :underline="false" href="https://www.qweather.com/" target="_blank">和风天气</a>
                    </div>
                    <div>
                        空气质量数据来源：
                        <a v-for="(item, index) in weatherStore.airReferSources" :key="index">
                            {{ item + ' ' }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div ref="webAppOpenModeSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn"
                    @click="backToPrev(webAppOpenModeSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    设置
                </div>
            </div>
            <div class="setting-pane-body">
                <CardContainer :card-name="'App打开方式'">
                    <SettingItem v-for="(item, index) in webAppOpenModeList" :key="index" :type="'list'"
                        :label="item.name" :checked="getWebAppOpenModeIndex(settingStore.webAppOpenMode) === index"
                        @checked-list-item="selectWebAppOpenMode(index)">
                    </SettingItem>
                </CardContainer>
            </div>
        </div>
        <div ref="flippingEffectSettingPaneRef" class="setting-pane setting-pane-before-enter">
            <div class="setting-pane-header setting-pane-child-header">
                <div class="setting-pane-back-btn"
                    @click="backToPrev(flippingEffectSettingPaneRef, mainSettingPaneRef)">
                    <BackIcon></BackIcon>
                </div>
                <div class="setting-pane-title">
                    设置
                </div>
            </div>
            <div class="setting-pane-body">
                <CardContainer :card-name="'分组翻页效果'">
                    <SettingItem v-for="(item, index) in flippingEffectList" :key="index" :type="'list'"
                        :label="item.name" :checked="getFlippingEffectIndex(settingStore.flippingEffect) === index"
                        @checked-list-item="selectFlippingEffect(index)">
                    </SettingItem>
                </CardContainer>
            </div>
        </div>
    </div>
</template>

<style scpoed>
.setting-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    position: absolute;
}

.setting-pane {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    width: 600px;
    height: 500px;
    max-width: 80%;
    max-height: 80%;
    color: var(--primary-font-color);
    box-shadow: var(--common-box-shadow);
    background-color: var(--common-background-color);
    backdrop-filter: var(--common-backdrop-filter);
    transition: .25s ease;
    overflow: hidden;
}

.setting-pane-before-enter {
    opacity: 0;
    transform: translate(50%, -50%);
}

.setting-pane-enter {
    opacity: 1;
    transform: translate(-50%, -50%);
}

.setting-pane-leave {
    opacity: 0;
}

.setting-pane-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
}

.setting-pane-title {
    font-size: 20px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.setting-pane-child-header {
    justify-content: left;
}

.setting-pane-back-btn {
    width: 32px;
    height: 32px;
    border-radius: 40px;
    transition: .25s;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.setting-pane-body {
    position: absolute;
    padding: 0 20px 0 20px;
    width: 100%;
    height: calc(100% - 72px - 20px);
    box-sizing: border-box;
    overflow: auto;
}

.weather-location-list {
    margin-top: -20px;
    background-color: var(--card-background-color) !important;
}

.weather-info-des {
    padding-left: 10px;
    font-size: 12px;
    color: var(--secondary-font-color);
}
</style>