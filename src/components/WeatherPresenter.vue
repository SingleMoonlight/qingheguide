<script setup>
import { ref } from 'vue'

const props = defineProps({
    locationName: String,
    nowWeather: Object,
    suggestion: Object,
    futureWeather: Object,
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
        <img class="weather-outline-icon" :src="'https://cdn.sencdn.com/widget2/assets/img/chameleon/weather/' + props.nowWeather.icon + '.svg'"/>
        {{ props.nowWeather.temp + '℃' }}
    </div>
    <Transition mode="out-in" name="extension-from-left-top">
        <div class="weather-card" v-show="showWeatherCard">
            <div class="weather-now-first-row">
                <div class="weather-now-temp">
                    {{ props.nowWeather.temp + '°' }}
                </div>
                <div class="weather-now-icon">
                    <img class="weather-outline-icon" :src="'https://cdn.sencdn.com/widget2/assets/img/chameleon/weather/' + props.nowWeather.icon + '.svg'"/>
                </div>
            </div>
            <div class="weather-now-second-row">
                <div class="weather-now-text">
                    {{ props.nowWeather.text }}
                </div>
                <div class="weather-now-suggestion">
                    {{ props.suggestion.dressing.brief }}
                </div>
            </div>
            <div class="divide-line"></div>
            <div class="weather-future-list" v-for="i in props.futureWeather.length" :key="i">
                <div class="weather-future-list-day">
                    {{ futureDays[i - 1] }}
                </div>
                <div class="weather-future-list-icon">
                    <img class="weather-outline-icon" :src="'https://cdn.sencdn.com/widget2/assets/img/chameleon/weather/' + props.futureWeather[i - 1].icon + '.svg'"/>
                </div>
                <div class="weather-future-list-temp">
                    {{ props.futureWeather[i - 1].tempMin + '°' + '/' + props.futureWeather[i - 1].tempMax + '°' }}
                </div>
                <div class="weather-future-list-text">
                    {{ props.futureWeather[i - 1].text }}
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
    width: 16px;
    height: 16px;
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
    text-align: right;
}

.weather-now-temp {
    font-size: 60px;
}

.weather-now-icon {
    margin-top: 40px;
}

.weather-now-text {
    font-size: 14px;
    width: 65px;
}

.weather-now-suggestion {
    font-size: 14px;
    width: 115px;
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

.weather-future-list-day {
    width: 28px;
}

.weather-future-list-icon {
    width: 24px;
}

.weather-future-list-temp {
    width: 50px;
}

.weather-future-list-text {
    width: 28px;
    white-space: nowrap;
    overflow: hidden;
    text-align: right;
}
</style>