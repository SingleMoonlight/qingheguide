export function numLeftPadding(num, count, digit) {
    let increase = "";
    for (let i = 0; i < count; i++) {
        increase += digit;
    }
    return (increase + num).slice(-count);
}