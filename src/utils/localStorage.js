export function getLocalSetting() {
    return JSON.parse(localStorage.getItem('setting'))
}

export function setLocalSetting(setting) {
    localStorage.setItem('setting', JSON.stringify(setting))
}