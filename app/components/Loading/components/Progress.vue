<script setup lang="ts">
const value = ref(null)
</script>

<template>
    <UProgress v-model="value" :size="'xs'" class="myProgress" />
</template>

<style>
.myProgress {
    position: absolute;
    z-index: 4;
}
</style>