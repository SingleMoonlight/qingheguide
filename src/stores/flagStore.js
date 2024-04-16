import { defineStore } from 'pinia'

export const useFlagStore = defineStore('flag', {
    state: () => ({
        settingIsPatched: false,
        bgImgIsGot: false,
        searchIsClose: true,
        globalLoadingIsShow: false,
    }),
    actions: {
        setShowGlobalLoading(show) {
            this.globalLoadingIsShow = show;
        }
    }
})
