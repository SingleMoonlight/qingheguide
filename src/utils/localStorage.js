export function getLocalVersion() {
    return localStorage.getItem('version');
}

export function setLocalVersion(version) {
    localStorage.setItem('version', version);
}

export function getLocalSetting() {
    try {
        let json = JSON.parse(localStorage.getItem('setting'));
        return json;
    } catch (err) {
        return null;
    }
}

export function setLocalSetting(setting) {
    localStorage.setItem('setting', JSON.stringify(setting));
}

export function getLocalHistory() {
    try {
        let json = JSON.parse(localStorage.getItem('searchHistory'));
        return json;
    } catch (err) {
        return null;
    }
}

export function setLocalHistory(searchHistory) {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

export function getLocalWeather() {
    try {
        let json = JSON.parse(localStorage.getItem('weather'));
        return json;
    } catch (err) {
        return null;
    }
}

export function setLocalWeather(searchHistory) {
    localStorage.setItem('weather', JSON.stringify(searchHistory));
}

export function getLocalWebApp() {
    try {
        let json = JSON.parse(localStorage.getItem('webApp'));
        return json;
    } catch (err) {
        return null;
    }
}

export function setLocalWebApp(webApp) {
    localStorage.setItem('webApp', JSON.stringify(webApp));
}

export function clearLocalStorage() {
    localStorage.clear();
}
