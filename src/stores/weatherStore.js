import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weatherStore', {
    state: () => ({
        location: {
            id: 101010100,
            name: '北京',
            adm1: '北京市',
            adm2: '北京',
        },
        nowWeather: {
            temp: 0,
            icon: 100,
            text: '晴',
        },
        nowAir: {
            category: '优',
        },
        futureWeather: [{
            date: '',
            tempMin: 0,
            tempMax: 0,
            icon: 100,
            text: '01.01',
        }, {
            tempMin: 0,
            tempMax: 0,
            icon: 100,
            text: '晴',
        }, {
            tempMin: 0,
            tempMax: 0,
            icon: 100,
            text: '晴',
        }],
        futureAir: [{
            category: '优',
        }, { 
            category: '优', 
        }, { 
            category: '优', 
        }],
        lastNowWeatherUpdateTime: null,
        lastNowAirUpdateTime: null,
        lastFutureWeatherUpdateTime: null,
        lastFutureAirUpdateTime: null,
    }),
})
