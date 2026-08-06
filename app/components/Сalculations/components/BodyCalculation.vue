<script setup lang="ts">
import type { Calculation, DailyStat } from '~/types/calculation';

interface Props {
    item: Calculation
}

const { item } = defineProps<Props>()

const pollutants = item.meteo?.filter(i => i.code?.startsWith('i') || i.code?.startsWith('p-'));
const meteorology = item.meteo?.filter(i => i.code?.startsWith('m-'));

const inversion = (data: DailyStat) => {
    const value = +data.inversion.toFixed(2)

    if (isNaN(value)) {
        return 0
    }
    else {
        return value
    }
}

</script>

<template>
    <div class="mb-4">
        <div class="grid grid-cols-[auto_1fr] gap-5">
            <section>
                <h2 class="text-base mb-2 font-bold">Загрязнение за период расчёт</h2>
                <div class="flex gap-2" v-for="(data, index) in pollutants">
                    <div class="left-part">
                        <span>{{ index + 1 }}) {{ data.name }}:</span>
                    </div>
                    <span class="shrink-0">
                        <b>{{ data.value?.avg?.toFixed(2) }}&nbsp;</b>
                        <span>{{ data.units }}</span>
                    </span>
                    <div class="flex gap-1 items-center text-sm text-muted shrink-0">
                        <span>мин: {{ data.value?.min }}</span>,
                        <span>макс: {{ data.value?.max }}</span>
                    </div>
                </div>
                <h2 class="text-base mt-2 mb-2 font-bold">Метеопараметры за период расчёт</h2>
                <div class="flex gap-2" v-for="(data, index) in meteorology">
                    <div class="left-part">
                        <span>{{ index + 1 }}) {{ data.name }}:</span>
                    </div>
                    <span class="shrink-0">
                        <b>{{ data.value?.avg?.toFixed(2) }}&nbsp;</b>
                        <span>{{ data.units }}</span>
                    </span>
                    <div class="flex gap-1 items-center text-sm text-muted shrink-0">
                        <span>мин: {{ data.value?.min }}</span>,
                        <span>макс: {{ data.value?.max }}</span>
                    </div>
                </div>
            </section>

            <section>
                <h2 class="text-base mb-2 font-bold">Температурная инверсия</h2>
                <div class="flex gap-2" v-for="(data, index) in item.inversion?.daily">
                    <span>{{ index + 1 }}) {{ new Date(data.time.split(' ')[0]!).toLocaleDateString('ru-RU') }}:</span>
                    <span><b>{{ inversion(data) }}</b> °C</span>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped>
.left-part {
    display: flex;
    align-items: baseline;
    width: 250px;
    flex-shrink: 0;
}

.dots {
    flex: 1 1 auto;
    border-bottom: 2px dotted #fff;
    margin: 0 2px;
}
</style>