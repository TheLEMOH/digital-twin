<script setup lang="ts">
import colorer from '~/core/colorer';
import type { Calculation, DailyStat, Inversion } from '~/types/calculation';

interface Props {
    item: Calculation
    index: number
}

const { item } = defineProps<Props>()

const router = useRouter()

const diff = computed(() => {
    const dMs = new Date(item.dateTo).getTime() - new Date(item.dateFrom).getTime()
    return Math.floor(dMs / (1000 * 60 * 60 * 24));
})

const temperature = item.meteo?.find(item => item.code == 'm-t')
const pm25 = item.meteo?.find(item => item.code == 'p-pm2')
const inversion = item.inversion!

const backgroundTemp = colorer.paintSelf('m-t', temperature?.value?.avg || 0)
const backgroundPm = colorer.paintSelf('p-pm2', pm25?.value?.avg || 0)

const clickGoButton = (event: any) => {
    event.stopPropagation()
    const query = { start: item.dateFrom, end: item.dateTo }
    router.push({ path: '/', query })
}

const inv = (inversion: Inversion) => {
    const value = +inversion?.average.toFixed(2)

    if (isNaN(value)) {
        return 0
    }
    else {
        return value
    }
}

</script>

<template>
    <div class="flex flex-col gap-2">
        <h2 class="text-xl">
            <span class="text-muted">#{{ index + 1 }}</span> {{ item.name }}
        </h2>
        <span class="text-muted text-sm">
            {{ new Date(item.dateFrom).toLocaleDateString('ru-RU') }} -
            {{ new Date(item.dateTo).toLocaleDateString('ru-RU') }}
            <UKbd size="sm">{{ diff + 1 }} дн.</UKbd>
        </span>
        <div class="flex gap-2 items-center justify-between">
            <span class="text-base">{{ item.description }}</span>
            <UButton class="cursor-pointer" ref="go" variant="ghost" @click="clickGoButton">Перейти</UButton>
        </div>
        <div class="flex gap-1">
            <UKbd size="lg" :style="{ background: backgroundTemp, color: `contrast-color(${backgroundTemp})` }">
                <template #default>
                    <div class="flex gap-1">
                        <span>T</span>
                        <span>{{ temperature?.value?.avg }}</span>
                        <span>{{ temperature?.units }}</span>
                    </div>
                </template>
            </UKbd>
            <UKbd size="lg" :style="{ background: backgroundPm, color: `contrast-color(${backgroundTemp})` }">
                <template #default>
                    <div class="flex gap-1">
                        <span>Pm2.5</span>
                        <span>{{ pm25?.value?.avg }}</span>
                        <span>{{ pm25?.units }}</span>
                    </div>
                </template>
            </UKbd>
            <UKbd size="lg">
                <template #default>
                    <div class="flex gap-1">
                        <span>Инверсия</span>
                        <span>{{ inv(inversion) }}</span>
                        <span>°C</span>
                    </div>
                </template>
            </UKbd>
        </div>
    </div>
</template>