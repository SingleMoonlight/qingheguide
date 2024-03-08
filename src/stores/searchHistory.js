import { defineStore } from 'pinia'
import { searchHistoryNum } from '@/utils/constant'

export const useSearchHistoryStore = defineStore('searchHistory', {
    state: () => ({
        history: []
    }),
    actions: {
        historyAdd(keyword) {
            // 判断该搜索项是否搜索过，如果搜过就移除
            this.history.forEach((item, index) => {
                if (item === keyword) {
                    this.history.splice(index, 1);
                }
            });
            // 这里再添加，就能达到最新记录在最前的效果
            this.history.unshift(keyword);
            // 只保留十条历史记录，移除旧的历史记录
            if (this.history.length > searchHistoryNum) {
                this.history.pop();
            }
        },
        historyClear() {
            this.history.splice(0, this.history.length)
        }
    }
})
