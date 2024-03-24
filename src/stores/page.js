import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', {
    state: () => ({
        pageName: 'Home'
    }),
    actions: {
        pageForward(pageName) {
            this.pageName = pageName;
        }
    }
})
