<script setup>
import { ref } from 'vue'

const props = defineProps({
    locationName: String,
    nowWeather: Object,
    nowAir: Object,
    futureWeather: Object,
    futureAir: Object,
})
const showWeatherCard = ref(false)

const futureDays = ['今天', '明天', '后天']

function openWeatherCard() {
    showWeatherCard.value = !showWeatherCard.value;
}

</script>

<template>
    <div class="weather-outline" @click="openWeatherCard">
        {{ props.locationName }}
        <i :class="'qi-' + props.nowWeather.icon + '-fill'" class="weather-outline-icon"></i>
        {{ props.nowWeather.temp + '℃' }}
    </div>
    <Transition mode="out-in" name="extension-from-left-top">
        <div class="weather-card" v-show="showWeatherCard">
            <div class="weather-now-first-row">
                <div class="weather-now-temp">
                    {{ props.nowWeather.temp + '°' }}
                </div>
                <div class="weather-now-icon">
                    <i :class="'qi-' + props.nowWeather.icon + '-fill'" class="weather-outline-icon"></i>
                </div>
            </div>
            <div class="weather-now-second-row">
                <div class="weather-now-text">
                    {{ props.nowWeather.text }}
                </div>
                <div class="weather-now-air">
                    {{ props.nowAir.category }}
                </div>
            </div>
            <div class="divide-line"></div>
            <div class="weather-future-list" v-for="i in props.futureWeather.length" :key="i">
                <div>
                    {{ futureDays[i - 1] }}
                </div>
                <div>
                    <i :class="'qi-' + props.futureWeather[i - 1].icon + '-fill'" class="weather-outline-icon"></i>
                </div>
                <div>
                    {{ props.futureWeather[i - 1].tempMin + '°' + '/' + props.futureWeather[i - 1].tempMax + '°' }}
                </div>
                <div>
                    {{ props.futureAir[i - 1].category }}
                </div>
            </div>
        </div>
    </Transition>

</template>

<style scoped>
.weather-outline {
    height: 32px;
    font-size: 14px;
    color: rgb(255, 255, 255);
    cursor: pointer;
    display: flex;
    align-items: center;
}

.weather-outline-icon {
    margin: 0 6px;
}

.weather-card {
    margin-top: 8px;
    width: 180px;
    height: auto;
    padding: 10px 20px 20px 20px;
    border-radius: 10px;
    font-size: 14px;
    color: var(--primary-font-color);
    box-shadow: var(--common-box-shadow);
    backdrop-filter: var(--common-backdrop-filter);
    background-color: var(--common-background-color);
}

.weather-now-first-row {
    display: flex;
}

.weather-now-second-row {
    display: flex;
    justify-content: end;
}

.weather-now-temp {
    font-size: 60px;
}

.weather-now-icon {
    margin-top: 40px;
}

.weather-now-text {
    font-size: 14px;
    margin-right: 98px;
}

.weather-now-air {
    font-size: 14px;
}

.divide-line {
    margin: 10px 0;
    height: 1px;
    background-color: var(--secondary-font-color);
}

.weather-future-list {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>