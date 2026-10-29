<script setup lang="ts">

const open = inject<Ref<boolean>>('isOpenSidebar')!

</script>

<template>
    <div class="sibebarButton">
        <UButton
            :icon="open ? 'i-lucide-x' : 'i-lucide-menu'"
            :aria-label="open ? 'Закрыть меню' : 'Открыть меню'"
            :title="open ? 'Закрыть меню' : 'Открыть меню'"
            @click="open = !open"
        />
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