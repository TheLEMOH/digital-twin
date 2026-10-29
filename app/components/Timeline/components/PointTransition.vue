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
        <span class="point-text text-sm">
            {{ item.time }}
        </span>
    </div>
</template>

<style scoped>
.point {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    white-space: nowrap;
    z-index: 1;
}

.point-text {
    font-weight: 500;
    color: var(--ui-text-muted);
    margin-top: 0.15rem;
}

.point-circle {
    width: 2px;
    height: 12px;
    background: var(--ui-text-muted);
    border: none;
    border-radius: 2px;
}
</style>