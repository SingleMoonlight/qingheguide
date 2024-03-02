import { defineStore } from 'pinia'

export const useFlagStore = defineStore('flag', {
    state: () => ({
        bgImgIsGet: false,
    }),
})
