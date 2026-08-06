<script setup lang="ts">
import type { Point } from '~/types/timeline';

interface Props {
    item: Point
}

const { item } = defineProps<Props>()

</script>

<template>
    <div class="point">
        <div :class="['point-circle']"></div>
        <span class="point-text">
            {{ item.time }}
        </span>
    </div>
</template>

<style scoped>
.point {
    position: relative;
    display: flex;
    font-size: 1rem;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    white-space: nowrap;
    z-index: 1;
}

.point-text {
    font-weight: 500;
    color: var(--ui-text);
}

.point-circle {
    width: 1px;
    height: 20px;
    border: 3px solid #000;
    background: #000;
    border-radius: 20px;
}
</style>