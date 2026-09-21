<script setup lang="ts">
import Line from '~/components/Chart/components/Line.vue';
import useProfilerDialog from '../composables/useProfilerDialog';
import Heatmap from '~/components/Chart/components/Heatmap.vue';
import VerticalProfile from './VerticalProfile.vue';

const openDialogProfiler = inject<Ref<boolean>>('openDialogProfiler')

const { profilerChart, inversionChart, verticalProfileChart, avgChart, indicatorCode, indicators, selectedTime, onProfileTimeClick } = useProfilerDialog()
</script>

<template>
    <UModal v-model:open="openDialogProfiler" fullscreen title="Температурный профилемер"
        :ui="{ body: 'p-0 sm:p-0 overflow-y-auto' }">
        <template #body>
            <div class="parent">
                <div class="div1">
                    <UCard class="h-full card" :ui="{ root: 'rounded-none p-0 sm:p-0', header: 'px-2 py-1' }">
                        <template #header>
                            <div class="flex items-center justify-between">
                                <span>Профиль</span>
                                <span class="font-medium">{{ selectedTime }}</span>
                            </div>
                        </template>
                        <div class="h-full">
                            <VerticalProfile :series="verticalProfileChart" :selectedTime="selectedTime">
                            </VerticalProfile>
                        </div>
                    </UCard>
                </div>
                <div class="div2">
                    <UCard class="h-full card" :ui="{ root: 'rounded-none', header: 'px-2 py-1', body: 'p-2 sm:p-2' }">
                        <template #header>
                            <span>Термограммы</span>
                        </template>
                        <div class="h-full">
                            <Line :series="profilerChart" :selectedTime="selectedTime" @click="onProfileTimeClick">
                            </Line>
                        </div>
                    </UCard>
                </div>
                <div class="div3">
                    <UCard class="h-full card" :ui="{ root: 'rounded-none', header: 'px-2 py-1', body: 'p-2 sm:p-2' }">
                        <template #header>
                            <span>Инверсия</span>
                        </template>
                        <div class="h-full">
                            <Heatmap :series="inversionChart" :selectedTime="selectedTime" @click="onProfileTimeClick">
                            </Heatmap>
                        </div>
                    </UCard>
                </div>
                <div class="div4">
                    <UCard class="h-full card" :ui="{ root: 'rounded-none', header: 'px-2 py-1', body: 'p-2 sm:p-2' }">
                        <template #header>
                            <div class="flex items-center justify-between gap-2">
                                <span>Среднее по параметру</span>
                                <USelect v-model="indicatorCode" :items="indicators" value-key="code" label-key="name"
                                    size="xs" class="w-56">
                                    <template #item="{ item }">
                                        {{ item.name }} ({{ item.units }})
                                    </template>
                                </USelect>
                            </div>
                        </template>
                        <div class="h-full">
                            <Line :series="avgChart" :selectedTime="selectedTime" @click="onProfileTimeClick"></Line>
                        </div>
                    </UCard>
                </div>
            </div>
        </template>
    </UModal>
</template>

<style scoped>
.parent {
    display: grid;
    height: 100%;
    grid-template-columns: min(400px, 30vw) 1fr;
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
}

.div1 {
    grid-area: 1 / 1 / 4 / 2;
    min-width: 0;
    min-height: 0;
}

.div2 {
    grid-area: 1 / 2 / 2 / 3;
    min-width: 0;
    min-height: 0;
}

.div3 {
    grid-area: 2 / 2 / 3 / 3;
    min-width: 0;
    min-height: 0;
}

.div4 {
    grid-area: 3 / 2 / 4 / 3;
    min-width: 0;
    min-height: 0;
}

@media (max-width: 768px) {
    .parent {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr;
        height: auto;
        min-height: 100%;
        overflow-y: auto;
    }

    .div1 {
        grid-area: 4 / 1 / 5 / 2;
        min-height: 0;
    }

    .div2 {
        grid-area: 1 / 1 / 2 / 2;
        min-height: 0;
    }

    .div3 {
        grid-area: 2 / 1 / 3 / 2;
        min-height: 0;
    }

    .div4 {
        grid-area: 3 / 1 / 4 / 2;
        min-height: 0;
    }
}

.card {
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.card :deep([data-slot="body"]) {
    flex: 1;
    min-height: 0;
}
</style>
