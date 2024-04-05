import { defineStore } from 'pinia'

export const useMessageBoxStore = defineStore('messageBox', {
    state: () => ({
        show: false,
        type: '',
        title: '',
        content: '',
        cancelBtnText: '',
        okBtnText: '',
        cancelHandler: () => {},
        okHandler: () => {},
    }),
    actions: {
        closeMessageBox() {
            this.show = false;
            this.type = '';
            this.title = '';
            this.content = '';
            this.cancelBtnText = '';
            this.okBtnText = '';
            this.cancelHandler = () => {};
            this.okHandler = () => {};
        },
        openMessageBox(type, title, content, {cancelBtnText, okBtnText, cancelHandler, okHandler}) {
            this.closeMessageBox();
            this.show = true;
            this.type = type;
            this.title = title;
            this.content = content;
            this.cancelBtnText = cancelBtnText;
            this.okBtnText = okBtnText;
            this.cancelHandler = cancelHandler;
            this.okHandler = okHandler;
        },
    }
})