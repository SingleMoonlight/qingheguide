export function getLocalVersion() {
    return localStorage.getItem('version')
}

export function setLocalVersion(version) {
    localStorage.setItem('version', version)
}

export function getLocalSetting() {
    return JSON.parse(localStorage.getItem('setting'))
}

export function setLocalSetting(setting) {
    localStorage.setItem('setting', JSON.stringify(setting))
}