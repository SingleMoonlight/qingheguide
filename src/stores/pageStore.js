import { defineStore } from 'pinia'

export const usePageStore = defineStore('pageStore', {
    state: () => ({
        pageName: 'HomePage'
    }),
    actions: {
        pageForward(pageName) {
            this.pageName = pageName;
        }
    }
})
