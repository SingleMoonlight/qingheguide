import config from '../../package.json'
import { useSettingStore } from '@/stores/setting'
import { getLocalVersion, setLocalVersion, getLocalSetting, setLocalSetting } from './localStorage'

export function checkUpdate() {
    const settingStore = useSettingStore()

    // 检查版本更新
    if (!import.meta.env.PROD || !getLocalVersion() || getLocalVersion() !== config.version) {
        setLocalVersion(config.version)
        // 合并新增设置
        const newSetting = Object.assign(settingStore.$state, getLocalSetting())
        setLocalSetting(newSetting)
    }
}


export function loadSetting() {
    const settingStore = useSettingStore()

    if (!getLocalSetting()) {
        settingStore.$patch(getLocalSetting())
    }

    // 载入主题
    document.getElementById("app").setAttribute("class", settingStore.$state.themeMode)
}

export function printWebsiteInfo() {
    const year = new Date().getFullYear()

    console.log("%c欢迎使用青何导航, 马上开始简单纯粹的搜索之旅吧! " +
                "\n\n%cCopyRight © " + year + " smilingly",
                "color: #0ebeff",
                "color: white")
}

