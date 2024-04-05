export function globalKeydown() {
    document.onkeydown = (e) => {
        if (!e) {
            return false;
        }
        if (import.meta.env.PROD) {
            if (e.code === 'F12') {
                // 禁用F12
                return false;
            } else if (e.ctrlKey && e.shiftKey && e.code === 'KeyI') {
                // 禁用ctrl+shift+i
                return false;
            } else if (e.shiftKey && e.code === 'F10') {
                // 禁用shift+F10
                return false;
            } 
        }

        if (e.code === 'Tab') {
            return false;
        }
    }

    document.oncontextmenu = () => {
        // 禁用鼠标右键
        return false;
    }
}