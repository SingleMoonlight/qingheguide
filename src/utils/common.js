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
