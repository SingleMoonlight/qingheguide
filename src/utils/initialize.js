import config from '../../package.json'
import { useSettingStore } from '@/stores/settingStore'
import { useFlagStore } from '@/stores/flagStore'
import {
    getLocalVersion, setLocalVersion, getLocalSetting, setLocalSetting,
    setLocalHistory, getLocalHistory, getLocalWeather, setLocalWeather,
    getLocalWebApp, setLocalWebApp
} from './localStorage'
import {
    themeList, bgSourceList, timeFontWeightList, searchOpenModeList,
    weatherLocationModeList, webAppOpenModeList, flippingEffectList,
    searchEngineList
} from '@/utils/constant'
import { useSearchHistoryStore } from '@/stores/searchHistoryStore'
import { useWeatherStore } from '@/stores/weatherStore'
import { useWebAppStore } from '@/stores/webAppStore'
import { initImageDB } from '@/utils/indexedDB'
import { mergeObjects } from '@/utils/common'

function checkUpdate() {
    // 检查版本更新
    if (!getLocalVersion() || getLocalVersion() !== config.version) {
        setLocalVersion(config.version);
    }
}

function checkSetting(setting) {
    const webAppStore = useWebAppStore();

    if (!searchEngineList.map(obj => obj.settingValue).includes(setting['searchEngine'])) {
        setting['searchEngine'] = 'baidu';
    }
    if (!themeList.map(obj => obj.settingValue).includes(setting['theme'])) {
        setting['theme'] = 'default';
    }
    if (!bgSourceList.map(obj => obj.settingValue).includes(setting['bgSource'])) {
        setting['bgSource'] = 'default';
    }
    if (!timeFontWeightList.map(obj => obj.settingValue).includes(setting['timeFontWeight'])) {
        setting['timeFontWeight'] = 'normal';
    }
    if (!searchOpenModeList.map(obj => obj.settingValue).includes(setting['searchOpenMode'])) {
        setting['searchOpenMode'] = 'new';
    }
    if (!weatherLocationModeList.map(obj => obj.settingValue).includes(setting['weatherLocationMode'])) {
        setting['weatherLocationMode'] = 'auto';
    }
    if (!webAppOpenModeList.map(obj => obj.settingValue).includes(setting['webAppOpenMode'])) {
        setting['webAppOpenMode'] = 'new';
    }
    if (!flippingEffectList.map(obj => obj.settingValue).includes(setting['flippingEffect'])) {
        setting['flippingEffect'] = 'slide';
    }
    if (setting['webAppGroupIndex'] < 0 || setting['webAppGroupIndex'] >= webAppStore.$state.app.length) {
        setting['webAppGroupIndex'] = 0;
    }
}

function loadConfig() {
    const settingStore = useSettingStore();
    const searchHistoryStore = useSearchHistoryStore();
    const flagStore = useFlagStore();
    const weatherStore = useWeatherStore();
    const webAppStore = useWebAppStore();

    settingStore.$subscribe((mutation, state) => {
        // 每当状态发生变化时，将整个 state 持久化到本地存储
        setLocalSetting(state);
    }, {
        // 组件卸载依旧生效订阅
        detached: true
    })
    // pinia同步本地设置
    let localSetting = getLocalSetting();
    if (localSetting) {
        // 将本地设置合并到默认设置中
        let newSetting = mergeObjects(settingStore.$state, localSetting);
        // 校验setting属性合法性，并进行修正
        checkSetting(newSetting);
        settingStore.$patch(newSetting);
        flagStore.$state.settingIsPatched = true;
    } else {
        settingStore.$reset();
        flagStore.$state.settingIsPatched = true;
    }

    searchHistoryStore.$subscribe((mutation, state) => {
        setLocalHistory(state);
    }, {
        detached: true
    });
    let localHistory = getLocalHistory();
    if (localHistory) {
        searchHistoryStore.$patch(localHistory);
    } else {
        searchHistoryStore.$reset();
    }

    weatherStore.$subscribe((mutation, state) => {
        setLocalWeather(state);
    }, {
        detached: true
    });
    let localWeather = getLocalWeather();
    if (localWeather) {
        let newWeather = mergeObjects(weatherStore.$state, localWeather);
        weatherStore.$patch(newWeather);
    } else {
        weatherStore.$reset();
    }

    webAppStore.$subscribe((mutation, state) => {
        setLocalWebApp(state);
    }, {
        detached: true
    });
    let localWebApp = getLocalWebApp();
    if (localWebApp) {
        webAppStore.$patch(localWebApp);
    } else {
        webAppStore.$reset();
    }
}

function printWebsiteInfo() {
    const year = new Date().getFullYear();

    console.log("%c欢迎使用青何导航, 马上开始简单纯粹的搜索之旅吧! \n\n" +
        "%c© " + year + " ifback.com",
        "color: #0ebeff",
        "color: #ffffff");
}

function globalKeyDown() {
    document.onkeydown = (e) => {
        if (!e) {
            return false;
        }
        if (import.meta.env.PROD) {
            if (e.code === 'F12') {
                // 禁用F12
                return false;
            } else if (e.ctrlKey && e.shiftKey && e.code === 'KeyI') {
                // 禁用ctrl+shift+i
                return false;
            } else if (e.shiftKey && e.code === 'F10') {
                // 禁用shift+F10
                return false;
            }
        }

        if (e.code === 'Tab') {
            return false;
        }
    }

    document.oncontextmenu = () => {
        // 禁用鼠标右键
        return false;
    }
}

export function initialize() {
    initImageDB();
    printWebsiteInfo();
    globalKeyDown();
    checkUpdate();
    loadConfig();
}
