<script setup>
import useTimeline from '../composables/useTimeline';
import Point from './Point.vue';

import { DateFormatter, getLocalTimeZone } from '@internationalized/date'
import PointTransition from './PointTransition.vue';

const selectedDate = inject('selectedDate')

const { items, avg, stats } = defineProps(['items', 'avg', 'stats'])

const emits = defineEmits(['updateDate', 'focusSite'])

const {
    page,
    maxPage,
    pointsByPage,
    itemsInPage,
    timeline,
    selectedDates,
    pressArrowLeft,
    pressArrowRight,
    increasePage,
    decreasePage,
    setSelected,
    range,
    selectRangeEdge } = useTimeline({ items: toRef(() => items), avg: toRef(() => avg), stats: toRef(() => stats) })

const selectedIndicator = inject('selectedIndicator')

const onRangeClick = (edge) => {
    const target = selectRangeEdge(edge)
    if (target && target.site !== null && target.site !== undefined) emits('focusSite', target)
}

const formatValue = (value) => {
    if (value === undefined || value === null || !isFinite(value)) return '—'
    return Math.abs(value) >= 100 ? value.toFixed(0) : value.toFixed(2)
}

const isSelected = (item) => {
    return item.time == selectedDate.value
}

const df = new DateFormatter('ru-RU', {
    dateStyle: 'medium'
})

const modelValue = shallowRef(selectedDates.value)

const display = computed(() => {
    const start = df.format(modelValue.value.start.toDate(getLocalTimeZone()))
    return start
})

const setValidValue = () => {
    selectedDates.value = modelValue.value
}

</script>

<template>
    <div class="timeline" tabindex="0" @keydown.left="pressArrowLeft" @keydown.right="pressArrowRight">
        <UPopover>
            <UButton style="width: 190px;" color="neutral" variant="subtle" icon="i-lucide-calendar">
                {{ display }}
            </UButton>

            <template #content>
                <UCalendar range class="p-2" v-model="modelValue" @update:validModelValue="setValidValue" />
            </template>
        </UPopover>

        <span>{{ page + 1 }}/{{ maxPage }}</span>

        <UTooltip v-if="range" :content="{ side: 'top' }" :ui="{ content: 'pointer-events-none' }"
            text="Диапазон значений за период (мин — макс). Нажмите, чтобы перейти к посту и времени">
            <div class="range text-xs">
                <button type="button" class="range-item" title="Перейти к минимуму" @click="onRangeClick('min')">
                    <i class="i-lucide-arrow-down-to-line"></i>
                    {{ formatValue(range.min) }}
                </button>
                <button type="button" class="range-item" title="Перейти к максимуму" @click="onRangeClick('max')">
                    <i class="i-lucide-arrow-up-to-line"></i>
                    {{ formatValue(range.max) }}
                </button>
                <span class="range-units" v-if="selectedIndicator?.value?.units">{{ selectedIndicator.value.units }}</span>
            </div>
        </UTooltip>

        <div class="flex flex-col items-end">
            <UButton @click="decreasePage" icon="i-lucide-arrow-left"></UButton>
        </div>

        <div class="timeline-body">
            <template v-if="items.length != 0">
                <div class="line"></div>
                <template v-for="(item, index) in pointsByPage">
                    <Point :item="item" :mode="timeline.mode"
                        @onClick="selectedDate = item.time, setSelected(item, index + itemsInPage * page)"
                        :isSelected="isSelected(item)" v-if="item.type == 'point'">
                    </Point>

                    <PointTransition :item="item" v-else>

                    </PointTransition>
                </template>
            </template>

            <template v-else>
                <span :style="{ 'grid-column': `1 / span ${itemsInPage}` }">Нет
                    данных</span>
            </template>

        </div>

        <div class="flex flex-col items-start">
            <UButton @click="increasePage" icon="i-lucide-arrow-right"></UButton>
        </div>
    </div>
</template>

<style scoped>
.timeline {
    position: absolute;
    display: flex;
    background: #fff;
    height: 56px;
    width: 100%;
    padding: 0.25rem 0.75rem;
    bottom: 0;
    z-index: 2;
    align-items: center;
    flex-direction: row;
    gap: 1rem;
    border-top: 1px solid #e5e5e5;
}

.timeline-body {
    position: relative;
    display: grid;
    place-items: center;
    grid-template-columns: repeat(15, 1fr);
    gap: 4px;
    width: 100%;
}

.line {
    position: absolute;
    top: 7px;
    width: 100%;
    right: 50%;
    transform: translate(50%, 0);
    height: 3px;
    z-index: 0;
    background: #ddd;
}

.range {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.6rem;
    border-radius: 6px;
    background: #f5f5f5;
    border: 1px solid #ddd;
    white-space: nowrap;
}

.range-item {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    color: #000;
    font-variant-numeric: tabular-nums;
    border: none;
    background: transparent;
    padding: 0.1rem 0.2rem;
    border-radius: 4px;
    cursor: pointer;
}

.range-item:hover {
    background: #e5e5e5;
}

.range-item .i-lucide-arrow-down-to-line {
    color: #3498db;
}

.range-item .i-lucide-arrow-up-to-line {
    color: #e74c3c;
}

.range-units {
    color: #666;
}
</style>