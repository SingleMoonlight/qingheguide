import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weatherStore', {
    state: () => ({
        location: { id: 101010100, adm1: '北京市', adm2: '北京', name: '北京' },
        nowWeather: { temp: 0, icon: 100, text: '晴' },
        nowAir: { category: '优', aqi: 0 },
        futureWeather: [
            { tempMin: 0, tempMax: 0, icon: 100, text: '晴' }, 
            { tempMin: 0, tempMax: 0, icon: 100, text: '晴' }, 
            { tempMin: 0, tempMax: 0, icon: 100, text: '晴' }, 
        ],
        futureAir: [
            { category: '优', aqi: 0 }, 
            { category: '优', aqi: 0 }, 
            { category: '优', aqi: 0 }, 
        ],
        airReferSources: '',
        lastNowWeatherUpdateTime: null,
        lastNowAirUpdateTime: null,
        lastFutureWeatherUpdateTime: null,
        lastFutureAirUpdateTime: null,
    }),
})
