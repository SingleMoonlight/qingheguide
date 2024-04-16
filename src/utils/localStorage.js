export function getLocalVersion() {
    return localStorage.getItem('version');
}

export function setLocalVersion(version) {
    localStorage.setItem('version', version);
}

export function getLocalSetting() {
    return JSON.parse(localStorage.getItem('setting'));
}

export function setLocalSetting(setting) {
    localStorage.setItem('setting', JSON.stringify(setting));
}

export function getLocalHistory() {
    return JSON.parse(localStorage.getItem('searchHistory'));
}

export function setLocalHistory(searchHistory) {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

export function getLocalWeather() {
    return JSON.parse(localStorage.getItem('weather'));
}

export function setLocalWeather(searchHistory) {
    localStorage.setItem('weather', JSON.stringify(searchHistory));
}
