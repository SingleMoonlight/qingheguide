export function jsonpRequest(url, callbackName) {
    return new Promise((resolve, reject) => {
        // 检查 URL 是否已经包含 callback 参数
        let urlAlreadyHasCallback = /[?&]callback=/.test(url);
        let scriptSrc = url;
        let actualCallbackName = callbackName;

        if (!urlAlreadyHasCallback) {            
            // 使用用户指定的 callbackName 或生成一个唯一的回调函数名
            actualCallbackName = `${callbackName}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
        }

        // 定义全局的回调函数
        window[actualCallbackName] = function (data) {
            // 调用对应的 resolve 函数
            resolve(data);
            // 移除回调函数
            delete window[actualCallbackName];
            // 移除 script 标签
            let script = document.querySelector(`script[src*="${actualCallbackName}"]`);
            if (script) {
                document.body.removeChild(script);
            }
        };

        if (!urlAlreadyHasCallback) {
            scriptSrc = url + (url.indexOf('?') === -1 ? '?' : '&') + 'callback=' + actualCallbackName;
        }

        // 创建一个 script 标签
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = scriptSrc;
        script.onerror = function (error) {
            reject(error);
            // 移除回调函数
            delete window[actualCallbackName];
            document.body.removeChild(script);
        };

        // 添加 script 标签到文档中
        document.body.appendChild(script);
    });
}
