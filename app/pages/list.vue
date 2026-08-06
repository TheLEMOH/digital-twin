<script setup lang="ts">
import Links from '~/components/Menu/Links.vue';
import Logo from '~/components/Menu/Logo.vue';
import BodyCalculation from '~/components/Сalculations/components/BodyCalculation.vue';
import FilterCalculation from '~/components/Сalculations/components/FilterCalculation.vue';
import HeaderCalculation from '~/components/Сalculations/components/HeaderCalculation.vue';
import { avgByPeriod } from '~/core/avg/avgByPeriod';
import dataService from '~/core/data/register';
import dataServiceProfiler from '~/core/data/registerProfiler';
import { analyzeInversions } from '~/core/profiler/inversion';
import type { Calculation, MeteoSummary } from '~/types/calculation';

useHead({
    title: 'Сценариум - КНЦ СО РАН'
})

definePageMeta({
    layout: 'default',
})

const items: Calculation[] = [
    {
        "id": "calc-2023-01-06",
        "name": "Красноярск 2023-01-06",
        "code": "CALC-001",
        "dateFrom": "2023-01-06",
        "dateTo": "2023-01-09",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2)"
    },
    {
        "id": "calc-2023-01-20-23",
        "name": "Красноярск 2023-01-20",
        "code": "CALC-002",
        "dateFrom": "2023-01-20",
        "dateTo": "2023-01-23",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2)"
    },
    {
        "id": "calc-2023-01-20-24",
        "name": "Красноярск 2023-01-20",
        "code": "CALC-003",
        "dateFrom": "2023-01-20",
        "dateTo": "2023-01-24",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2)"
    },
    {
        "id": "calc-2023-02-06",
        "name": "Красноярск 2023-02-06",
        "code": "CALC-004",
        "dateFrom": "2023-02-06",
        "dateTo": "2023-02-10",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2)"
    },
    {
        "id": "calc-2024-01-03",
        "name": "Красноярск 2024-01-03",
        "code": "CALC-005",
        "dateFrom": "2024-01-03",
        "dateTo": "2024-01-07",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2), LCZ (Local Climate Zones), BEM (Building Energy Model)"
    },
    {
        "id": "calc-2024-01-06",
        "name": "Красноярск 2024-01-06",
        "code": "CALC-006",
        "dateFrom": "2024-01-06",
        "dateTo": "2024-01-09",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2), LCZ (Local Climate Zones), BEM (Building Energy Model)"
    },
    {
        "id": "calc-2024-01-18",
        "name": "Красноярск 2024-01-18",
        "code": "CALC-007",
        "dateFrom": "2024-01-18",
        "dateTo": "2024-01-25",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2), LCZ (Local Climate Zones), BEM (Building Energy Model)"
    },
    {
        "id": "calc-2024-01-29",
        "name": "Красноярск 2024-01-29",
        "code": "CALC-008",
        "dateFrom": "2024-01-29",
        "dateTo": "2024-02-05",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2), LCZ (Local Climate Zones), BEM (Building Energy Model)"
    },
    {
        "id": "calc-2024-02-06",
        "name": "Красноярск 2024-02-06",
        "code": "CALC-009",
        "dateFrom": "2024-02-06",
        "dateTo": "2024-02-10",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2), LCZ (Local Climate Zones), BEM (Building Energy Model)"
    },
    {
        "id": "calc-2024-02-18",
        "name": "Красноярск 2024-02-18",
        "code": "CALC-010",
        "dateFrom": "2024-02-18",
        "dateTo": "2024-02-23",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2)"
    },
    {
        "id": "calc-2024-02-25",
        "name": "Красноярск 2024-02-25",
        "code": "CALC-011",
        "dateFrom": "2024-02-25",
        "dateTo": "2024-02-29",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2)"
    },
    {
        "id": "calc-2024-06-12",
        "name": "Красноярск 2024-06-12",
        "code": "CALC-012",
        "dateFrom": "2024-06-12",
        "dateTo": "2024-06-17",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2)"
    },
    {
        "id": "calc-2024-06-26",
        "name": "Красноярск 2024-06-26",
        "code": "CALC-013",
        "dateFrom": "2024-06-26",
        "dateTo": "2024-06-29",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2)"
    },
    {
        "id": "calc-2024-10-16",
        "name": "Красноярск 2024-10-16",
        "code": "CALC-014",
        "dateFrom": "2024-10-16",
        "dateTo": "2024-10-20",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2)"
    },
    {
        "id": "calc-2024-11-01",
        "name": "Красноярск 2024-11-01",
        "code": "CALC-015",
        "dateFrom": "2024-11-01",
        "dateTo": "2024-11-05",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2)"
    },
    {
        "id": "calc-2024-11-29",
        "name": "Красноярск 2024-11-29",
        "code": "CALC-016",
        "dateFrom": "2024-11-29",
        "dateTo": "2024-12-03",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2)"
    },
    {
        "id": "calc-2024-12-17",
        "name": "Красноярск 2024-12-17",
        "code": "CALC-017",
        "dateFrom": "2024-12-17",
        "dateTo": "2024-12-23",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2)"
    }
]


const calculations = shallowRef<Calculation[]>([])

const { dta, indicators } = await dataService.getDta()

const promises = items.map(async item => {
    const promise = dataService.setDataService.getDataByDta({ begin: item.dateFrom, end: item.dateTo, timeInterval: 'day', codeDta: 'dta-air' })
    const promiseProfiler = dataServiceProfiler.setDataService.getDataById({ begin: item.dateFrom, end: item.dateTo, timeInterval: 'day', codeDta: 'knc-mtp5', id: 4310 })
    const result = await promise
    const resultProfiler = await promiseProfiler
    return { data: result, dataProfiler: resultProfiler, item }
})

Promise.all(promises).then(data => {
    calculations.value = data.map(calculations => {
        const inversion = analyzeInversions(calculations.dataProfiler)
        const avgData = avgByPeriod(calculations.data, indicators)
        const meteo: MeteoSummary[] = indicators.map(indicator => ({ value: avgData[indicator.code], ...indicator }))
        return { meteo: meteo.filter(item => item.value?.avg), ...calculations.item, inversion }
    })
})

</script>

<template>
    <div class="page">
        <Logo></Logo>
        <div class="page-body">
            <div class="page-content">
                <p class="p-5 leading-relaxed">
                    Модели загрязнения, рассчитанные заранее, с периодом расчёта, описанием и усреднённой
                    метеорологической
                    метаинформацией с постов мониторинга (средние, минимальные и максимальные значения температуры,
                    давления,
                    влажности, ветра и PM2.5).
                </p>

                <FilterCalculation></FilterCalculation>

                <UAccordion :items="calculations" type="multiple">
                    <template #default="{ item, index }">
                        <HeaderCalculation :item="item" :index></HeaderCalculation>
                    </template>
                    <template #body="{ index, item }">
                        <BodyCalculation :item="item"></BodyCalculation>
                    </template>
                </UAccordion>
            </div>
        </div>
    </div>
</template>

<style>
.page-body {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.page-content {
    max-width: 1200px;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
}
</style>
