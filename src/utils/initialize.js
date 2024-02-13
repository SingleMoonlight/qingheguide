import { useSettingStore } from '@/stores/setting'
import { getLocalSetting, setLocalSetting } from './localStorage'

export function checkUpdate() {
    // 检查版本更新

    // 合并新旧设置
}


export function loadSetting() {
    const settingStore = useSettingStore()
    settingStore.$patch(getLocalSetting())

    // 载入主题
    document.getElementById("app").setAttribute("class", settingStore.$state.themeMode)
}

export function printWebsiteInfo() {
    const year = new Date().getFullYear()

    console.log(
        "%c欢迎使用青何导航, 马上开始简单纯粹的搜索之旅吧! " +
        "\n\n%cCopyRight © " + year + " smilingly",
        "color: #0ebeff",
        "color: white")
}

