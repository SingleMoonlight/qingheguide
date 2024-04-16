<script setup>
import CardContainer from '@/components/CardContainer.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import ButtonWrap from '@/components/ButtonWrap.vue'
import TimeLine from '@/components/TimeLine.vue'
import TimeLineItem from '@/components/TimeLineItem.vue'
import UpdateTag from '@/components/UpdateTag.vue'
import { updateHistory } from '@/utils/constant'
import { onMounted, ref } from 'vue'

const emit = defineEmits(['closeAbout'])
const showAboutPane = ref(false)

onMounted(() => {
    showAboutPane.value = true
})

</script>

<template>
    <div class="about-container">
        <Transition name="extension-from-center">
            <div class="about-pane" v-show="showAboutPane">
                <div class="about-pane-header">
                    <div class="about-pane-title">
                        关于
                    </div>
                    <ButtonWrap :type="'icon'" @click="emit('closeAbout')">
                        <CloseIcon></CloseIcon>
                    </ButtonWrap>
                </div>
                <div class="about-pane-body">
                    <CardContainer :card-name="'简介'">
                        <div class="about-introduce">
                            这是一个可以随便搜搜的导航网站，简约、美观、实用。马上自定义您的设置，然后开始简单纯粹的搜索之旅吧！
                        </div>
                    </CardContainer>
                    <CardContainer :card-name="'更新'">
                        <TimeLine>
                            <TimeLineItem v-for="(updateHistory, updateHistoryIndex) in updateHistory"
                                :key="updateHistoryIndex" :time="updateHistory.time" :des="updateHistory.version">
                                <div v-for="(updateHistoryItem, updateHistoryItemIndex) in updateHistory.item"
                                    :key="updateHistoryItemIndex" class="update-history-item">
                                    <UpdateTag :type="updateHistoryItem.type"></UpdateTag>
                                    <div class="update-history-item-des">
                                        {{ updateHistoryItem.des }}
                                    </div>
                                </div>
                            </TimeLineItem>
                        </TimeLine>
                    </CardContainer>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scpoed>
.about-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    position: absolute;
}

.about-pane {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    width: 600px;
    height: 500px;
    max-width: 80%;
    max-height: 80%;
    color: var(--primary-font-color);
    box-shadow: var(--common-box-shadow);
    background-color: var(--common-background-color);
    backdrop-filter: var(--common-backdrop-filter);
    transition: .25s;
    overflow: hidden;
}

.about-pane-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
}

.about-pane-title {
    font-size: 20px;
    font-weight: bold;
}

.about-pane-body {
    position: absolute;
    padding: 0 20px 0 20px;
    width: 100%;
    height: calc(100% - 72px - 20px);
    box-sizing: border-box;
    overflow: auto;
}

.about-introduce {
    padding: 10px;
    font-size: 14px;
    line-height: 20px;
}

.update-history-item {
    display: flex;
    padding: 2px 0;
}

.update-history-item-des {
    margin-left: 5px;
}
</style>