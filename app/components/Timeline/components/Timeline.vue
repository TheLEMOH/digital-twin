<script setup>
import useTimeline from '../composables/useTimeline';
import Point from './Point.vue';

import { DateFormatter, getLocalTimeZone } from '@internationalized/date'
import PointTransition from './PointTransition.vue';

const selectedDate = inject('selectedDate')

const { items, avg } = defineProps(['items', 'avg'])

const emits = defineEmits(['updateDate'])

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
    setSelected, } = useTimeline({ items: toRef(() => items), avg: toRef(() => avg) })

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
    background: var(--ui-bg);
    height: 60px;
    width: 100%;
    padding: 0.5rem;
    bottom: 0;
    z-index: 2;
    align-items: center;
    flex-direction: row;
    gap: 1rem
}

.timeline-body {
    position: relative;
    display: grid;
    place-items: center;
    grid-template-columns: repeat(15, 1fr);
    gap: 2px;
    width: 100%;
}

.line {
    position: absolute;
    top: 8px;
    width: 100%;
    right: 50%;
    transform: translate(50%, 0);
    height: 4px;
    z-index: 0;
    background-color: #cccccc;
}
</style>