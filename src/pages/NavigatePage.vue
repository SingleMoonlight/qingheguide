<script setup>
import OtherIcon from '@/components/icons/OtherIcon.vue'
import OtherMenuIcon from '@/components/icons/OtherMenuIcon.vue'
import SelectList from '@/components/SelectList.vue'
import SelectItem from '@/components/SelectItem.vue'
import ButtonWrap from '@/components/ButtonWrap.vue'
import WeatherPresenter from '@/components/WeatherPresenter.vue'
import { useWeatherStore } from '@/stores/weatherStore'
import { useSettingStore } from '@/stores/settingStore'
import { otherMenuList } from '@/utils/constant'
import { getWeatherInfo } from '@/api/weather'
import { onMounted, ref } from 'vue'

const emit = defineEmits(['closeNavigate', 'openSetting', 'openAbout'])
const showOtherMenu = ref(false)
const weatherStore = useWeatherStore()
const settingStore = useSettingStore()

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

onMounted(() => {
    if (settingStore.$state.showWeather) {
        getWeatherInfo(false, weatherStore);
    }
})

</script>

<template>
    <div class="navigate-container" @click="closeNavigate">
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
</style>