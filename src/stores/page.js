import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', {
    state: () => ({
        id: 0,
        name: 'Home'
    })
})
