<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
    showCopyright: Boolean,
    copyrightInfo: Object,
})
const year = ref(0)

onMounted(() => {
    year.value = new Date().getFullYear();
})

</script>

<template>
    <div class="copyright" v-show="props.showCopyright">
        © {{ props.copyrightInfo.startYear }}-{{ year }}
        <a :underline="false" :href="props.copyrightInfo.ownerUrl" target="_blank">
            {{ props.copyrightInfo.ownerInfo }}
        </a>
    </div>
</template>


<style scpoed>
.copyright {
    font-size: 12px;
    font-weight: lighter;
    white-space: nowrap;
    text-align: center;
    display: inline-block;
    transition: .25s;
}

@media (max-width: 850px) {
    .copyright {
        opacity: 0;
    }
}

@media(max-height: 500px) {
    .copyright {
        opacity: 0;
    }
}
</style>