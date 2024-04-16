<script setup>
import OtherIcon from '@/components/icons/OtherIcon.vue'
import OtherMenuIcon from '@/components/icons/OtherMenuIcon.vue'
import SelectList from '@/components/SelectList.vue'
import SelectItem from '@/components/SelectItem.vue'
import ButtonWrap from '@/components/ButtonWrap.vue'
import { useWeatherStore } from '@/stores/weatherStore'
import {
    otherMenuList, nowWeatherUpdatePeriod, nowAirUpdatePeriod,
    futureWeatherUpdatePeriod, futureAirUpdatePeriod
} from '@/utils/constant'
import { getNowWeather, getNowAir, getFutureWeather, getFutureAir } from '@/api/weather'
import { printPromiseLog } from '@/utils/common'
import { onMounted, ref } from 'vue'

const emit = defineEmits(['closeNavigate', 'openSetting', 'openAbout'])
const showOtherMenu = ref(false)
const weatherStore = useWeatherStore()


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

function getWeatherInfo(focusUpdate) {
    let nowDate = new Date();
    let locationId = weatherStore.$state.location.id;

    if (focusUpdate || (weatherStore.$state.lastNowWeatherUpdateTime === null ||
        (nowDate - weatherStore.$state.lastNowWeatherUpdateTime) / 60000 >= nowWeatherUpdatePeriod)) {
        getNowWeather(locationId).then((res) => {
            weatherStore.$state.lastNowWeatherUpdateTime = nowDate;
            weatherStore.$state.nowWeather.temp = res.temp;
            weatherStore.$state.nowWeather.icon = res.icon;
            weatherStore.$state.nowWeather.text = res.text;

            printPromiseLog('result', 'getNowWeather', res);
        }).catch(err => {
            printPromiseLog('error', 'getNowWeather', err);
        })
    }
    if (focusUpdate || (weatherStore.$state.lastNowAirUpdateTime === null ||
        (nowDate - weatherStore.$state.lastNowAirUpdateTime) / 60000 >= nowAirUpdatePeriod)) {
        getNowAir(locationId).then((res) => {
            weatherStore.$state.lastNowAirUpdateTime = nowDate;
            weatherStore.$state.nowAir.category = res.category;

            printPromiseLog('result', 'getNowAir', res);
        }).catch(err => {
            printPromiseLog('error', 'getNowAir', err);
        });

    }
    if (focusUpdate || (weatherStore.$state.lastFutureWeatherUpdateTime === null ||
        (nowDate - weatherStore.$state.lastFutureWeatherUpdateTime) / 60000 >= futureWeatherUpdatePeriod)) {
        getFutureWeather(locationId).then((res) => {
            weatherStore.$state.lastFutureWeatherUpdateTime = nowDate;
            weatherStore.$state.futureWeather = res.map(
                item => ({
                    date: item.fxDate.substring(5, item.fxDate.length),
                    tempMin: item.tempMin,
                    tempMax: item.tempMax,
                    icon: item.iconDay,
                    text: item.textDay
                })
            )

            printPromiseLog('result', 'getFutureWeather', res);
        }).catch(err => {
            printPromiseLog('error', 'getFutureWeather', err);
        });
    }
    if (focusUpdate || (weatherStore.$state.lastFutureAirUpdateTime === null ||
        (nowDate - weatherStore.$state.lastNowWeatherUpdateTime) / 60000 >= futureAirUpdatePeriod)) {
        getFutureAir(locationId).then((res) => {
            weatherStore.$state.lastFutureAirUpdateTime = nowDate;
            weatherStore.$state.futureAir = res.slice(0, 3).map(
                item => ({
                    date: item.fxDate.substring(5, item.fxDate.length),
                    category: item.category
                })
            );

            printPromiseLog('result', 'getFutureAir', res);
        }).catch(err => {
            printPromiseLog('error', 'getFutureAir', err);
        });
    }
}

onMounted(() => {
    getWeatherInfo(false);
})

</script>

<template>
    <div class="navigate-container" @click="closeNavigate">
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
</style>