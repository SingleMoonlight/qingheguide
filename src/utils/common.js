export function numLeftPadding(num, count, digit) {
    let increase = "";
    for (let i = 0; i < count; i++) {
        increase += digit;
    }
    return (increase + num).slice(-count);
}

export function setClassForElement(elementId, className) {
    document.getElementById(elementId).setAttribute("class", className);
}

export function downloadFile(fileName, fileBlob) {
    let url = URL.createObjectURL(fileBlob);
    let a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export function isValidURL(url) {
    const urlRegex = /^(http|https):\/\/[a-z0-9-]+(\.[a-z0-9-]+)*(:[0-9]+)?(\/.*)?$/i;

    return urlRegex.test(url);
}

export function generateUID() {
    let dt = new Date().getTime(); // 当前时间的毫秒数
    let uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uid;
}

export function mergeObjects(a, b) {
    const aCopy = { ...a }; // 创建对象A的副本
    Object.keys(b).forEach(key => {
        if (Object.hasOwn(aCopy, key)) {
            // 属性存在于B中，则覆盖
            aCopy[key] = b[key];
        } else {
            // 属性不存在于B中，则删除
            delete aCopy[key];
        }
    });
    return aCopy;
}

export const LOG_ERROR = 'ERROR';
export const LOG_INFO = 'INFO';
export function printLog(type, data) {
    if (!import.meta.env.PROD) {
        let funcInfo = new Error().stack.split('\n')[2].trim();
        console.log('[' + type + ']', funcInfo,data);
    }
}
