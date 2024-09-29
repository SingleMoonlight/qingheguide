import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weatherStore', {
    state: () => ({
        location: {
            id: 'WX4FBXXFKE4F',
            name: '北京',
            country: 'CN',
            path: '北京,北京,中国',
            timezone: 'Asia/Shanghai',
            timezone_offset: '+08:00'
        },
        nowWeather: { temp: 0, icon: 1, text: '晴' },
        suggestion: { dressing: { brief: '舒适', detail: '' } },
        futureWeather: [
            { tempMin: 0, tempMax: 0, icon: 1, text: '晴' },
            { tempMin: 0, tempMax: 0, icon: 1, text: '晴' },
            { tempMin: 0, tempMax: 0, icon: 1, text: '晴' },
        ],
        lastNowWeatherUpdateTime: 0,
        lastFutureWeatherUpdateTime: 0,
    }),
})
