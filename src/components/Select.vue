<script setup>
const props = defineProps({
    transition: String,
})

function handleBeforeEnter(el) {
    if (props.transition === 'stretch') {
        el.style.opacity = 0;
        el.style.height = 0;
    }
}

function handleEnter(el) {
    if (props.transition === 'stretch') {
        el.style.height = 'auto';
        let h = el.clientHeight;
        el.style.height = 0;
        requestAnimationFrame(() => {
            el.style.transition = '.25s ease';
            el.style.opacity = 1;
            el.style.height = h + 'px';
        })
    }
}

function handleBeforeLeave(el) {

}

function handleLeave(el) {
    if (props.transition === 'stretch') {
        el.style.opacity = 0;
    }
}

</script>

<template>
    <Transition mode="out-in" :name="props.transition" @before-enter="handleBeforeEnter" @enter="handleEnter"
        @before-leave="handleBeforeLeave" @leave="handleLeave">
        <div class="select">
            <slot></slot>
        </div>
    </Transition>
</template>

<style scoped>
.select {
    width: 100%;
    border-radius: 10px;
    background: var(--commom-background-color);
    box-shadow: var(--common-box-shadow);
    overflow: hidden;
}
</style>