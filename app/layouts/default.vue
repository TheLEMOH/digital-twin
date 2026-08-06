<script setup lang="ts">

</script>

<template>
    <div class="layout">
        <div class="layout-body">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.layout-body {
    min-height: 100%
}
</style>