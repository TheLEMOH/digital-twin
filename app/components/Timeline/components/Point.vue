<script setup lang="ts">
import type { Point } from '~/types/timeline';

interface Props {
    item: Point
    isSelected: boolean,
    mode: 'hour' | 'day'
}

const { item, isSelected, mode } = defineProps<Props>()

const emits = defineEmits(['onClick'])

const view = computed(() => {
    const s = item.time!.split(' ')
    return mode == 'day' ? s[0] : s[1]!.slice(0, -3)
})

</script>

<template>
    <UTooltip mode="hover" :delay-duration="0" arrow :dismissible="false">
        <div :class="[isSelected ? 'selected' : '', 'point']" @click="emits('onClick')">
            <div :class="['point-circle']" :style="{ background: item.background }"></div>
            <div class="point-text">
                {{ view }}
            </div>
        </div>

        <template #content>
            <div class="popover-content">
                <span> Среднее <b>{{ item.value!.toFixed(2) }}</b> </span>
            </div>
        </template>
    </UTooltip>
</template>

<style scoped>
.popover-content {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    margin: 0;
}

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
    text-align: center;
}

.point:hover {
    cursor: pointer;
}

.point:hover>.point-circle {
    background: #cccccc;
}

.selected .point-circle {
    box-shadow: 0 0 0 3px var(--ui-color-secondary-500);
}

.selected {
    font-weight: 500;
}

.point-circle {
    width: 20px;
    height: 20px;
    border: 2px solid #000;
    border-radius: 20px;
}
</style>