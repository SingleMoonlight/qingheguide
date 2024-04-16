import axios from "axios"
import { printLog } from '@/utils/common'
import {
    nowWeatherUpdatePeriod, nowAirUpdatePeriod,
    futureWeatherUpdatePeriod, futureAirUpdatePeriod
} from '@/utils/constant'

export function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                searchLocation(position.coords.longitude.toFixed(2)  + ',' + position.coords.latitude.toFixed(2)).then(res => {
                    resolve(res[0]);
                }).catch(err => {
                    reject(new Error('获取定位失败，请重试或者手动选择位置。'));
                    printLog('error', 'getCurrentPosition', err);
                });
            }, (err) => {
                reject(new Error('获取定位失败，请确认浏览器已允许本网站获取定位，若仍然失败请重试或者手动选择位置。'));
                printLog('error', 'getCurrentPosition', err);
            }, {
                timeout: 3000,
            });
        } else {
            reject(new Error('浏览器不支持自动定位。'));
        }
    })
}

export function searchLocation(searchText) {
    return new Promise((resolve, reject) => {
        axios.get('/geo/' + searchText
        ).then(res => {
            if (res.data.code === '200') {
                resolve(res.data.location);
            } else {
                reject(res);
            }
        }).catch(err => {
            reject(err);
        })
    })
}

export function getNowWeather(locationId) {
    return new Promise((resolve, reject) => {
        axios.get('/nowWeather/' + locationId
        ).then(res => {
            if (res.data.code === '200') {
                resolve(res.data.now);
            } else {
                reject(res);
            }
        }).catch(err => {
            reject(err);
        })
    })
}

export function getNowAir(locationId) {
    return new Promise((resolve, reject) => {
        axios.get('/nowAir/' + locationId
        ).then(res => {
            if (res.data.code === '200') {
                resolve(res.data.now);
            } else {
                reject(res);
            }
        }).catch(err => {
            reject(err);
        })
    })
}

export function getFutureWeather(locationId) {
    return new Promise((resolve, reject) => {
        axios.get('/futureWeather/' + locationId
        ).then(res => {
            if (res.data.code === '200') {
                resolve(res.data.daily);
            } else {
                reject(res);
            }
        }).catch(err => {
            reject(err);
        })
    })
}

export function getFutureAir(locationId) {
    return new Promise((resolve, reject) => {
        axios.get('/futureAir/' + locationId
        ).then(res => {
            if (res.data.code === '200') {
                resolve(res.data.daily);
            } else {
                reject(res);
            }
        }).catch(err => {
            reject(err);
        })
    })
}

export function getWeatherInfo(focusUpdate, weatherStoreState) {
    let nowDate = new Date();
    let locationId = weatherStoreState.location.id;

    if (focusUpdate || (weatherStoreState.lastNowWeatherUpdateTime === null ||
        (nowDate - weatherStoreState.lastNowWeatherUpdateTime) / 60000 >= nowWeatherUpdatePeriod)) {
        getNowWeather(locationId).then((res) => {
            weatherStoreState.lastNowWeatherUpdateTime = nowDate;
            weatherStoreState.nowWeather.temp = res.temp;
            weatherStoreState.nowWeather.icon = res.icon;
            weatherStoreState.nowWeather.text = res.text;

            printLog('result', 'getNowWeather', res);
        }).catch(err => {
            printLog('error', 'getNowWeather', err);
        })
    }
    if (focusUpdate || (weatherStoreState.lastNowAirUpdateTime === null ||
        (nowDate - weatherStoreState.lastNowAirUpdateTime) / 60000 >= nowAirUpdatePeriod)) {
        getNowAir(locationId).then((res) => {
            weatherStoreState.lastNowAirUpdateTime = nowDate;
            weatherStoreState.nowAir.category = res.category;

            printLog('result', 'getNowAir', res);
        }).catch(err => {
            printLog('error', 'getNowAir', err);
        });

    }
    if (focusUpdate || (weatherStoreState.lastFutureWeatherUpdateTime === null ||
        (nowDate - weatherStoreState.lastFutureWeatherUpdateTime) / 60000 >= futureWeatherUpdatePeriod)) {
        getFutureWeather(locationId).then((res) => {
            weatherStoreState.lastFutureWeatherUpdateTime = nowDate;
            weatherStoreState.futureWeather = res.map(
                item => ({
                    date: item.fxDate.substring(5, item.fxDate.length),
                    tempMin: item.tempMin,
                    tempMax: item.tempMax,
                    icon: item.iconDay,
                    text: item.textDay
                })
            )

            printLog('result', 'getFutureWeather', res);
        }).catch(err => {
            printLog('error', 'getFutureWeather', err);
        });
    }
    if (focusUpdate || (weatherStoreState.lastFutureAirUpdateTime === null ||
        (nowDate - weatherStoreState.lastNowWeatherUpdateTime) / 60000 >= futureAirUpdatePeriod)) {
        getFutureAir(locationId).then((res) => {
            weatherStoreState.lastFutureAirUpdateTime = nowDate;
            weatherStoreState.futureAir = res.slice(0, 3).map(
                item => ({
                    date: item.fxDate.substring(5, item.fxDate.length),
                    category: item.category
                })
            );

            printLog('result', 'getFutureAir', res);
        }).catch(err => {
            printLog('error', 'getFutureAir', err);
        });
    }
}
