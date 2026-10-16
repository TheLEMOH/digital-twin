<script setup lang="ts">
import type Indicator from '~/types/indicator';
import type { Point } from '~/types/timeline';

interface Props {
    item: Point
    isSelected: boolean,
    mode: 'hour' | 'day'
}

const { item, isSelected, mode } = defineProps<Props>()

const emits = defineEmits(['onClick'])

const selectedIndicator = inject<Ref<Indicator>>('selectedIndicator')

const isWindDirection = computed(() => selectedIndicator?.value?.code === 'm-wd')
const units = computed(() => selectedIndicator?.value?.units ?? '')

const formatValue = (value?: number) => {
    if (value === undefined || value === null || !isFinite(value)) return '—'
    return Math.abs(value) >= 100 ? value.toFixed(0) : value.toFixed(2)
}

const arrowAngle = computed(() => {
    if (!isWindDirection.value || item.value === undefined) return 0
    return (item.value + 180) % 360
})

const hasStats = computed(() =>
    item.min !== undefined || item.max !== undefined || item.count !== undefined
)

const view = computed(() => {
    const s = item.time!.split(' ')
    return mode == 'day' ? s[0] : s[1]!.slice(0, -3)
})

</script>

<template>
    <UTooltip :content="{ side: 'top' }" :ui="{ content: 'h-auto items-stretch py-1.5 pointer-events-none' }" :delay-duration="0" arrow>
        <div :class="[isSelected ? 'selected' : '', 'point']" @click="emits('onClick')">
            <div :class="['point-circle']" :style="{ background: item.background }">
                <i v-if="isWindDirection && item.value !== undefined && item.value !== null" class="i-lucide-navigation wind-arrow"
                    :style="{ transform: `rotate(${arrowAngle}deg)` }"></i>
            </div>
            <div class="point-text text-sm">
                {{ view }}
            </div>
        </div>

        <template #content>
            <div class="popover-content text-sm">
                <div class="popover-row">
                    <span>Среднее</span>
                    <b>{{ formatValue(item.value) }} {{ units }}</b>
                </div>
                <template v-if="hasStats">
                    <div class="popover-row">
                        <span>Мин</span>
                        <b>{{ formatValue(item.min) }} {{ units }}</b>
                    </div>
                    <div class="popover-row">
                        <span>Макс</span>
                        <b>{{ formatValue(item.max) }} {{ units }}</b>
                    </div>
                    <div class="popover-divider"></div>
                    <div class="popover-row">
                        <span>Постов</span>
                        <b>{{ item.count }}</b>
                    </div>
                </template>
            </div>
        </template>
    </UTooltip>
</template>

<style scoped>
.popover-content {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    width: 100%;
    min-width: 130px;
}

.popover-row {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    font-variant-numeric: tabular-nums;
}

.popover-divider {
    height: 1px;
    background-color: var(--ui-border);
    margin: 0.125rem 0;
    width: 100%;
}

.wind-arrow {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    color: #fff;
    text-shadow: 0 0 3px rgba(0, 0, 0, 1);
    transform-origin: center;
    pointer-events: none;
}

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
    text-align: center;
    color: #000;
    margin-top: 0.2rem;
    font-variant-numeric: tabular-nums;
}

.point:hover {
    cursor: pointer;
}

.point:hover>.point-circle {
    filter: brightness(0.95);
}

.selected .point-circle {
    box-shadow: 0 0 0 2px #1d4ed8;
    transform: scale(1.2);
}

.selected .point-text {
    font-weight: 600;
    color: #000;
}

.point-circle {
    position: relative;
    width: 18px;
    height: 18px;
    border: 2px solid #000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>