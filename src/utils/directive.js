const longPressDirective = {
    beforeMount(el, binding) {
        // 这里的 1000 是长按的阈值，即 1000 毫秒
        const longPressThreshold = 1000;
        let startTime;

        el.timer = null;
        el.mouseDownHandler = (e) => {
            startTime = Date.now();
            el.timer = setTimeout(() => {
                binding.value(e); // 执行绑定的函数
            }, longPressThreshold);
        };

        el.mouseUpHandler = () => {
            if (Date.now() - startTime < longPressThreshold) {
                clearTimeout(el.timer);
            }
        };

        el.addEventListener('mousedown', el.mouseDownHandler);
        el.addEventListener('mouseup', el.mouseUpHandler);
    },
    unmounted(el) {
        el.removeEventListener('mousedown', el.mouseDownHandler);
        el.removeEventListener('mouseup', el.mouseUpHandler);
        clearTimeout(el.timer);
    }
};

const clickOutsideDirective = {
    beforeMount(el, binding) {
        el.clickOutsideEvent = (event) => {
            // 判断点击是否发生在 el 外部
            if (!(el === event.target || el.contains(event.target))) {
                // 如果是，调用绑定的方法
                binding.value();
            }
        };
        document.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el) {
        // 移除事件监听
        document.removeEventListener('click', el.clickOutsideEvent);
    },
};

export function installDirective(app) {
    app.directive('longpress', longPressDirective);
    app.directive('clickoutside', clickOutsideDirective);
}