export function numLeftPadding(num, count, digit) {
    let increase = "";
    for (let i = 0; i < count; i++) {
        increase += digit;
    }
    return (increase + num).slice(-count);
}

export function printPromiseLog(type, func, data) {
    if (!import.meta.env.PROD) {
        console.log(type + ": " + func + " (" + data + ")");
    }
}

export function setClassForElement(elementId, className) {
    document.getElementById(elementId).setAttribute("class", className);
}

export function isValidURL(url) {
    const urlRegex = /^(http|https):\/\/[a-z0-9-]+(\.[a-z0-9-]+)*(:[0-9]+)?(\/.*)?$/i;

    return urlRegex.test(url);
}
 