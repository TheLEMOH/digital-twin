<script setup lang="ts">

const open = inject<Ref<boolean>>('isOpenSidebar')

</script>

<template>
    <div class="sibebarButton">
        <UButton @click="open = true" icon="i-lucide-menu"></UButton>
    </div>
</template>

<style scoped>
.sibebarButton {
    position: absolute;
    top: 10px;
    right: 50px;
    z-index: 2;
}
</style>