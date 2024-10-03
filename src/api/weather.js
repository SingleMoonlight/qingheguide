import { jsonpRequest } from './jsonp.js'
import { printLog, LOG_ERROR, LOG_INFO } from '@/utils/common'
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

export async function getCurrentLocationAsync() {
    let getIPUrl = 'https://ipinfo.io/json';
    let callbackName = 'jsonpCallback_getIP';
    let ipRes = '';
    let locationRes = null;

    ipRes = await jsonpRequest(getIPUrl, callbackName);
    locationRes = await searchLocation(ipRes.ip);    
    
    return locationRes[0];
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

            printLog(LOG_INFO, res);
        }).catch(err => {
            printLog(LOG_ERROR, err);
        });

        getWeatherSuggestion(locationId).then((res) => {
            weatherStoreState.suggestion = res;

            printLog(LOG_INFO, res);
        }).catch(err => {
            printLog(LOG_ERROR, err);
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

            printLog(LOG_INFO, res);
        }).catch(err => {
            printLog(LOG_ERROR, err);
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
        printLog(LOG_INFO, res);
    } catch (err) {
        printLog(LOG_ERROR, err);
        return { code: -1, message: '获取天气信息失败，请检查网络或者指定上一级城市重试。' };
    };

    try {
        let res = await getWeatherSuggestion(locationId);
        weatherStoreState.suggestion = res;
        printLog(LOG_INFO, res);
    } catch (err) {
        printLog(LOG_ERROR, err);
        return { code: -1, message: '获取天气指数信息失败，请检查网络或者指定上一级城市重试。' };
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
        printLog(LOG_INFO, res);
    } catch (err) {
        printLog(LOG_ERROR, err);
        return { code: -1, message: '获取未来天气信息失败，请检查网络或者指定上一级城市重试。' };
    };

    return { code: 0, message: '天气信息更新成功！' };
}
