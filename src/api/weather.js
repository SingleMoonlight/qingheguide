import { jsonpRequest } from './jsonp.js'
import { printLog } from '@/utils/common'
import { weatherUpdateInterval } from '@/utils/constant'
import CryptoJS from "crypto-js"

function generateRequestParamsString(params) {
    // 先按照键的字典序升序排列所有的键值对
    let entries = Object.entries(params).sort((a, b) => a[0].localeCompare(b[0]));
    // 将键值对转换为 "key=value" 格式
    let keyValuePairs = entries.map(([key, value]) => `${key}=${value}`);
    // 将键值对连接成字符串
    let paramsString = keyValuePairs.join('&');
    // 生成签名
    let sig = encodeURIComponent(
        CryptoJS.HmacSHA1(paramsString, import.meta.env.VITE_APP_XINZHI_WEATHER_PRIVATE_KEY)
            .toString(CryptoJS.enc.Base64));
    paramsString += '&sig=' + sig;

    return paramsString;
}

export function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                searchLocation(position.coords.longitude.toFixed(2) + ',' + position.coords.latitude.toFixed(2)).then(res => {
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
        let searchLocationUrl = 'https://api.seniverse.com/v3/location/search.json';
        let callbackName = 'jsonpCallback_searchLocation';
        let params = {
            q: searchText,
            public_key: import.meta.env.VITE_APP_XINZHI_WEATHER_PUBLIC_KEY,
            ts: Date.now(),
            ttl: 300,
            callback: callbackName,
        };
        let paramsString = generateRequestParamsString(params);
        searchLocationUrl += '?' + paramsString;
        jsonpRequest(searchLocationUrl, callbackName)
            .then(data => {
                if (data.results.length > 0) {
                    resolve(data.results);
                } else {
                    reject(data);
                }
            })
            .catch(error => {
                reject(error);
            });
    })
}

function getNowWeather(locationId) {
    return new Promise((resolve, reject) => {
        let searchLocationUrl = 'https://api.seniverse.com/v3/weather/now.json';
        let callbackName = 'jsonpCallback_getNowWeather';
        let params = {
            location: locationId,
            public_key: import.meta.env.VITE_APP_XINZHI_WEATHER_PUBLIC_KEY,
            ts: Date.now(),
            ttl: 300,
            callback: callbackName,
        };
        let paramsString = generateRequestParamsString(params);
        searchLocationUrl += '?' + paramsString;
        jsonpRequest(searchLocationUrl, callbackName)
            .then(data => {
                if (data.results.length > 0) {
                    resolve(data.results[0].now);
                } else {
                    reject(data);
                }
            })
            .catch(error => {
                reject(error);
            });
    })
}
function getFutureWeather(locationId) {
    return new Promise((resolve, reject) => {
        let searchLocationUrl = 'https://api.seniverse.com/v3/weather/daily.json';
        let callbackName = 'jsonpCallback_getFutureWeather';
        let params = {
            location: locationId,
            public_key: import.meta.env.VITE_APP_XINZHI_WEATHER_PUBLIC_KEY,
            ts: Date.now(),
            ttl: 300,
            callback: callbackName,
        };
        let paramsString = generateRequestParamsString(params);
        searchLocationUrl += '?' + paramsString;
        jsonpRequest(searchLocationUrl, callbackName)
            .then(data => {
                if (data.results.length > 0) {
                    resolve(data.results[0].daily);
                } else {
                    reject(data);
                }
            })
            .catch(error => {
                reject(error);
            });
    })
}

function getWeatherSuggestion(locationId) {
    return new Promise((resolve, reject) => {
        let searchLocationUrl = 'https://api.seniverse.com/v3/life/suggestion.json';
        let callbackName = 'jsonpCallback_getWeatherSuggestion';
        let params = {
            location: locationId,
            public_key: import.meta.env.VITE_APP_XINZHI_WEATHER_PUBLIC_KEY,
            ts: Date.now(),
            ttl: 300,
            callback: callbackName,
        };
        let paramsString = generateRequestParamsString(params);
        searchLocationUrl += '?' + paramsString;
        jsonpRequest(searchLocationUrl, callbackName)
            .then(data => {
                if (data.results.length > 0) {
                    resolve(data.results[0].suggestion);
                } else {
                    reject(data);
                }
            })
            .catch(error => {
                reject(error);
            });
    })
}

export function getWeatherInfo(weatherStoreState) {
    let nowTime = new Date().valueOf();
    let locationId = weatherStoreState.location.id;

    if (weatherStoreState.lastNowWeatherUpdateTime === null ||
        (nowTime - weatherStoreState.lastNowWeatherUpdateTime) / 60000 >= weatherUpdateInterval.nowWeather) {
        getNowWeather(locationId).then((res) => {
            weatherStoreState.lastNowWeatherUpdateTime = nowTime;
            weatherStoreState.nowWeather.temp = res.temperature;
            weatherStoreState.nowWeather.icon = res.code;
            weatherStoreState.nowWeather.text = res.text;

            printLog('result', 'getWeatherInfo getNowWeather', res);
        }).catch(err => {
            printLog('error', 'getWeatherInfo getNowWeather', err);
        });

        getWeatherSuggestion(locationId).then((res) => {
            weatherStoreState.suggestion = res;

            printLog('result', 'getWeatherInfo getWeatherSuggestion', res);
        }).catch(err => {
            printLog('error', 'getWeatherInfo getWeatherSuggestion', err);
        });
    }

    if (weatherStoreState.lastFutureWeatherUpdateTime === null ||
        (nowTime - weatherStoreState.lastFutureWeatherUpdateTime) / 60000 >= weatherUpdateInterval.futureWeather) {
        getFutureWeather(locationId).then((res) => {
            weatherStoreState.lastFutureWeatherUpdateTime = nowTime;
            weatherStoreState.futureWeather = res.map(
                item => ({
                    tempMin: item.low,
                    tempMax: item.high,
                    icon: item.code_day,
                    text: item.text_day
                })
            )

            printLog('result', 'getWeatherInfo getFutureWeather', res);
        }).catch(err => {
            printLog('error', 'getWeatherInfo getFutureWeather', err);
        });
    }
}

export async function getWeatherInfoAsync(weatherStoreState) {
    let nowTime = new Date().valueOf();
    let locationId = weatherStoreState.location.id;

    try {
        let res = await getNowWeather(locationId);
        weatherStoreState.lastNowWeatherUpdateTime = nowTime;
        weatherStoreState.nowWeather.temp = res.temperature;
        weatherStoreState.nowWeather.icon = res.code;
        weatherStoreState.nowWeather.text = res.text;
        printLog('result', 'getWeatherInfoAsync getNowWeather', res);
    } catch (err) {
        printLog('error', 'getWeatherInfoAsync getNowWeather', err);
        return { code: -1, message: '获取天气信息失败，请检查网络或者指定上一级城市重试。'};
    };

    try {
        let res = await getWeatherSuggestion(locationId);
        weatherStoreState.suggestion = res;
        printLog('result', 'getWeatherInfoAsync getWeatherSuggestion', res);
    } catch (err) {
        printLog('error', 'getWeatherInfoAsync getWeatherSuggestion', err);
        return { code: -1, message: '获取天气指数信息失败，请检查网络或者指定上一级城市重试。'};
    };

    try {
        let res = await getFutureWeather(locationId);
        weatherStoreState.lastFutureWeatherUpdateTime = nowTime;
        weatherStoreState.futureWeather = res.map(
            item => ({
                tempMin: item.low,
                tempMax: item.high,
                icon: item.code_day,
                text: item.text_day
            })
        )
        printLog('result', 'getWeatherInfoAsync getFutureWeather', res);
    } catch (err) {
        printLog('error', 'getWeatherInfoAsync getFutureWeather', err);
        return { code: -1, message: '获取未来天气信息失败，请检查网络或者指定上一级城市重试。'};
    };

    return { code: 0, message: '天气信息更新成功！'};
}
