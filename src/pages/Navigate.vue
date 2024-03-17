<script setup>
import OtherIcon from '@/components/icons/OtherIcon.vue'
import OtherMenuIcon from '@/components/icons/OtherMenuIcon.vue'
import Select from '@/components/Select.vue'
import SelectItem from '@/components/SelectItem.vue'
import { otherMenuList } from '@/utils/constant'
import { ref } from 'vue'

const emit = defineEmits(['closeNavigate', 'openSetting', 'openAbout'])
const showOtherMenu = ref(false)


function closeNavigate(e) {
    if (e.currentTarget !== e.target) {
        // 不处理子元素的冒泡点击事件
        return;
    }
    emit('closeNavigate');
}

function openOtherMenu() {
    showOtherMenu.value = !showOtherMenu.value;
}

function selectOtherMenuItem(index) {
    showOtherMenu.value = false;

    emit(otherMenuList[index].emit);
}

</script>

<template>
    <div class="navigate-container" @click="closeNavigate">
        <div class="ohter-btn" @click="openOtherMenu" @click.stop>
            <OtherIcon></OtherIcon>
        </div>
        <div class="other-menu-container">
            <Select v-show="showOtherMenu">
                <SelectItem v-for="(item, index) in otherMenuList" :index="index" :label="item.name"
                    @select="selectOtherMenuItem">
                    <div class="menu-item-icon">
                        <OtherMenuIcon :icon-name="item.iconName"></OtherMenuIcon>
                    </div>
                    <div class="menu-item-label">{{ item.name }}</div>
                </SelectItem>
            </Select>
        </div>
    </div>
</template>

<style scpoed>
.navigate-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    position: absolute;
}

.ohter-btn {
    position: absolute;
    cursor: pointer;
    width: 33px;
    height: 33px;
    top: 20px;
    right: 3%;
    border-radius: 40px;
    transition: .25s;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
}

.ohter-btn:hover {
    background-color: var(--icon-hover-background-color);
}

.other-menu-container {
    position: absolute;
    top: 60px;
    right: 3%;
    width: 130px;
    color: var(--primary-font-color);
}

.menu-item-icon {
    width: 20px;
    height: 20px;
    padding-right: 10px;
    float: left;
}

.meun-item-label {
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>