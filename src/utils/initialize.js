import config from '../../package.json'
import { useSettingStore } from '@/stores/setting'
import { useFlagStore } from '@/stores/flag'
import { getLocalVersion, setLocalVersion, getLocalSetting, setLocalSetting, setLocalHistory, getLocalHistory } from './localStorage'
import { useSearchHistoryStore } from '@/stores/searchHistory'

export function checkUpdate() {
    const settingStore = useSettingStore();

    // 开发环境持续更新设置
    if (!import.meta.env.PROD) {
        const newSetting = Object.assign(settingStore.$state, getLocalSetting());
        setLocalSetting(newSetting);
    }

    // 检查版本更新
    if (!getLocalVersion() || getLocalVersion() !== config.version) {
        setLocalVersion(config.version);
        // 合并新增设置
        const newSetting = Object.assign(settingStore.$state, getLocalSetting());
        setLocalSetting(newSetting);
    }
}


export function loadConfig() {
    const settingStore = useSettingStore();
    const searchHistoryStore = useSearchHistoryStore();
    const flagStore = useFlagStore();

    settingStore.$subscribe((mutation, state) => {
        // 每当状态发生变化时，将整个 state 持久化到本地存储
        setLocalSetting(state);
    }, {
        // 组件卸载依旧生效订阅
        detached: true
    });

    // pinia同步本地设置
    if (getLocalSetting()) {
        settingStore.$patch(getLocalSetting());
        flagStore.$state.settingIsPatched = true;
    }

    searchHistoryStore.$subscribe((mutation, state) => {
        setLocalHistory(state);
    }, {
        detached: true
    });
    if (getLocalHistory()) {
        searchHistoryStore.$patch(getLocalHistory());
    }
}

export function printWebsiteInfo() {
    const year = new Date().getFullYear();

    console.log("%c欢迎使用青何导航, 马上开始简单纯粹的搜索之旅吧! \n\n" +
        "%c© " + year + " ifback.com",
        "color: #0ebeff",
        "color: #ffffff");
}

