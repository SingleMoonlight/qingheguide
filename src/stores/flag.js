import { defineStore } from 'pinia'

export const useFlagStore = defineStore('flag', {
    state: () => ({
        settingIsPatched: false,
        bgImgIsGet: false,
        searchIsClose: true,
    }),
})
