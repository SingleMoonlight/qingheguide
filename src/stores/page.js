import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', {
    state: () => ({
        pageName: 'HomePage'
    }),
    actions: {
        pageForward(pageName) {
            this.pageName = pageName;
        }
    }
})
