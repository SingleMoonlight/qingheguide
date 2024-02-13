import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', {
    state: () => ({
        name: 'Home'
    }),
    actions: {
        pageForward(name) {
            this.name = name;
        }
    }
})
