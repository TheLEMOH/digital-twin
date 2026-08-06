<script setup lang="ts">
import useSiteDialog from '../composables/useSiteDialog';
import IndicatorsList from '~/components/Indicator/components/IndicatorsList.vue';
import Line from '~/components/Chart/components/Line.vue';
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'
import List from '~/components/List/components/List.vue';
import type { ShallowRef } from 'vue';
import type Site from '~/types/site';

const isOpenDialog = inject<Ref<boolean>>('isOpenDialog')
const sites = inject<ShallowRef<Site[]>>('sites')!

const { selectedFeature, timePeriod, chartData, value, lastData, selectedSites, mode } = useSiteDialog()

const setValue = (e: string[]) => {
    value.value = e
}

const setValueSite = (e: number[]) => {
    selectedSites.value = e
}

const df = new DateFormatter('ru-RU', {
    dateStyle: 'medium'
})

const modelValue = shallowRef(timePeriod.value)

const display = computed(() => {
    const start = df.format(timePeriod!.value.start.toDate(getLocalTimeZone()))
    const end = df.format(timePeriod!.value.end.toDate(getLocalTimeZone()))
    return `${start} - ${end}`
})

const setValidValue = () => {
    timePeriod.value = modelValue.value
}

const tabs = [{ label: 'Показатели', slot: 'indicators' }, { label: 'Датчики', slot: 'sites' }]

const modes = [
    { value: 'default', label: 'По умолчанию' },
    { value: 'avg', label: 'Показать усредненные значения' },
    { value: 'year', label: "Показать годовые значения" }
]
</script>

<template>
    <USlideover v-model:open="isOpenDialog" :modal="false" side="bottom" :title="selectedFeature?.properties.name">
        <template #body>
            <div class="site-dialog">
                <div class="wrapper">
                    <h2>Данные</h2>
                    <Line :series="chartData"></Line>
                </div>
                <div class="wrapper-settings">
                    <h2>Период</h2>
                    <UPopover>
                        <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
                            {{ display }}
                        </UButton>

                        <template #content>
                            <UCalendar v-model="modelValue" range class="p-2" @update:validModelValue="setValidValue" />
                        </template>
                    </UPopover>
                    <h2>Настройки</h2>
                    <URadioGroup v-model="mode" :items="modes" />
                    <USeparator color="primary" />
                    <UTabs :items="tabs">
                        <template #indicators>
                            <IndicatorsList :items="lastData" :selected-indicator="value" @select-indicator="setValue">
                            </IndicatorsList>
                        </template>
                        <template #sites>
                            <List :items="sites" :selected="selectedSites" :valueField="'id'" @select="setValueSite">
                                <template #label="{ item }">
                                    {{ item.name }}
                                </template>
                            </List>
                        </template>
                    </UTabs>
                </div>
            </div>
        </template>
    </USlideover>
</template>

<style scoped>
.wrapper {
    background: var(--ui-bg-muted);
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}

.wrapper-settings {
    background: var(--ui-bg-muted);
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: auto;
    box-sizing: border-box;
}

.site-dialog {
    display: grid;
    grid-template-columns: 1fr 400px;
    grid-template-rows: 300px;
    height: 300px;
    gap: 0.5rem;
}

.myChart {
    width: 100%;
    height: 100%;
}
</style>