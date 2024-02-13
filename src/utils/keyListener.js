export function globalKeydown() {
    document.onkeydown = (e) => {
        if (!e) {
            return false
        }
        if (import.meta.env.PROD) {
            if (e.keyCode === 123) {
                // 禁用F12
                return false
            } else if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
                // 禁用ctrl+shift+i
                return false
            } else if (e.shiftKey && e.keyCode === 121) {
                // 禁用shift+F10
                return false
            }
        }

        if (e.keyCode === 32) {
            // 按下空格
            console.log('按下空格')
            return true
        } else if (e.keyCode === 27) {
            // 按下Esc
            console.log('按下Esc')
            return true
        }
    }

    document.oncontextmenu = () => {
        if (import.meta.env.PROD) {
            // 禁用鼠标右键
            return false
        }
    }
}