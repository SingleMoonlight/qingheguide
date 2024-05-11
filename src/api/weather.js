import axios from "axios"
import { printLog } from '@/utils/common'
import { weatherUpdateInterval } from '@/utils/constant'

export function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                searchLocation(position.coords.longitude.toFixed(2)  + ',' + position.coords.latitude.toFixed(2)).then(res => {
                    resolve(res[0]);
                }).catch(err => {
                    reject(new Error('获取定位失败，请重试或者手动选择位置。'));
                    printLog('error', 'getCurrentPosition searchLocation', err);
                });
            }, (err) => {
                reject(new Error('获取定位失败，请确认浏览器已允许本网站获取定位，若仍然失败请重试或者手动选择位置。'));
                printLog('error', 'getCurrentPosition searchLocation', err);
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
                resolve(res.data);
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
    let nowTime = new Date().valueOf();
    let locationId = weatherStoreState.location.id;

    if (focusUpdate || (weatherStoreState.lastNowWeatherUpdateTime === null ||
        (nowTime - weatherStoreState.lastNowWeatherUpdateTime) / 60000 >= weatherUpdateInterval.nowWeather)) {
        getNowWeather(locationId).then((res) => {
            weatherStoreState.lastNowWeatherUpdateTime = nowTime;
            weatherStoreState.nowWeather.temp = res.temp;
            weatherStoreState.nowWeather.icon = res.icon;
            weatherStoreState.nowWeather.text = res.text;

            printLog('result', 'getWeatherInfo getNowWeather', res);
        }).catch(err => {
            printLog('error', 'getWeatherInfo getNowWeather', err);
        })
    }
    if (focusUpdate || (weatherStoreState.lastNowAirUpdateTime === null ||
        (nowTime - weatherStoreState.lastNowAirUpdateTime) / 60000 >= weatherUpdateInterval.nowAir)) {
        getNowAir(locationId).then((res) => {
            weatherStoreState.lastNowAirUpdateTime = nowTime;
            weatherStoreState.nowAir.category = res.now.category;
            weatherStoreState.nowAir.aqi = res.now.aqi;
            weatherStoreState.airReferSources = res.refer.sources;

            printLog('result', 'getWeatherInfo getNowAir', res);
        }).catch(err => {
            printLog('error', 'getWeatherInfo getNowAir', err);
        });

    }
    if (focusUpdate || (weatherStoreState.lastFutureWeatherUpdateTime === null ||
        (nowTime - weatherStoreState.lastFutureWeatherUpdateTime) / 60000 >= weatherUpdateInterval.futureWeather)) {
        getFutureWeather(locationId).then((res) => {
            weatherStoreState.lastFutureWeatherUpdateTime = nowTime;
            weatherStoreState.futureWeather = res.map(
                item => ({
                    tempMin: item.tempMin,
                    tempMax: item.tempMax,
                    icon: item.iconDay,
                    text: item.textDay
                })
            )

            printLog('result', 'getWeatherInfo getFutureWeather', res);
        }).catch(err => {
            printLog('error', 'getWeatherInfo getFutureWeather', err);
        });
    }
    if (focusUpdate || (weatherStoreState.lastFutureAirUpdateTime === null ||
        (nowTime - weatherStoreState.lastNowWeatherUpdateTime) / 60000 >= weatherUpdateInterval.futureAir)) {
        getFutureAir(locationId).then((res) => {
            weatherStoreState.lastFutureAirUpdateTime = nowTime;
            weatherStoreState.futureAir = res.slice(0, 3).map(
                item => ({
                    category: item.category,
                    aqi: item.aqi,
                })
            );

            printLog('result', 'getWeatherInfo getFutureAir', res);
        }).catch(err => {
            printLog('error', 'getWeatherInfo getFutureAir', err);
        });
    }
}
