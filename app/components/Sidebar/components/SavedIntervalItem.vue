<script setup lang="ts">
import colorer from '~/core/colorer'
import type { Calculation } from '~/types/calculation'
import type { SavedIntervals } from '~/composables/useSavedIntervals'
import type Indicator from '~/types/indicator'
import type SelectedDates from '~/types/selectedDates'
import type { ShallowRef } from 'vue'

interface Props {
    item: Calculation
}

const { item } = defineProps<Props>()

const savedIntervals = inject<SavedIntervals>('savedIntervals')!
const selectedIndicator = inject<ShallowRef<Indicator>>('selectedIndicator')
const selectedDates = inject<ShallowRef<SelectedDates>>('selectedDates')

const isActive = computed(() => {
    if (!selectedDates?.value) return false
    return selectedDates.value.start.toString() === item.dateFrom
        && selectedDates.value.end.toString() === item.dateTo
})

const days = computed(() => {
    const diff = new Date(item.dateTo).getTime() - new Date(item.dateFrom).getTime()
    return Math.floor(diff / 86400000) + 1
})

const indicatorCode = computed(() => selectedIndicator?.value?.code)

const indicatorStat = computed(() => {
    if (!indicatorCode.value) return null
    return item.meteo?.find(meteo => meteo.code === indicatorCode.value) ?? null
})

const pm25 = computed(() => item.meteo?.find(meteo => meteo.code === 'p-pm2'))
const temperature = computed(() => item.meteo?.find(meteo => meteo.code === 'm-t'))

const inversion = computed(() => {
    const value = +(item.inversion?.average ?? 0).toFixed(2)
    return isNaN(value) ? 0 : value
})

const badges = computed(() => {
    const list: { label: string, code?: string, value?: number | null, units?: string }[] = []

    if (indicatorStat.value && indicatorStat.value.code !== 'p-pm2' && indicatorStat.value.code !== 'm-t') {
        list.push({
            label: indicatorStat.value.name ?? indicatorStat.value.code ?? '',
            code: indicatorStat.value.code,
            value: indicatorStat.value.value?.avg,
            units: indicatorStat.value.units
        })
    }

    if (pm25.value) {
        list.push({ label: 'PM2.5', code: pm25.value.code, value: pm25.value.value?.avg, units: pm25.value.units })
    }

    if (temperature.value) {
        list.push({ label: 'T', code: temperature.value.code, value: temperature.value.value?.avg, units: temperature.value.units })
    }

    return list.filter(badge => badge.value !== null && badge.value !== undefined)
})

const badgeStyle = (code?: string, value?: number | null) => {
    if (!code || value === undefined || value === null || !colorer.schemes[code]) return {}

    const background = colorer.paintSelf(code, value)

    return { background, color: `contrast-color(${background})` }
}

const formatDate = (value: string) => new Date(value).toLocaleDateString('ru-RU')

const remove = () => savedIntervals.removeInterval(item.id)
</script>

<template>
    <div class="saved-interval" :class="{ 'saved-interval--active': isActive }" @click="savedIntervals.loadInterval(item)">
        <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
                <h3 class="text-sm font-medium truncate">{{ item.name }}</h3>
                <span class="text-muted text-xs">
                    {{ formatDate(item.dateFrom) }} - {{ formatDate(item.dateTo) }}
                    <UKbd size="sm">{{ days }} дн.</UKbd>
                </span>
            </div>

            <div @click.stop>
                <UPopover :ui="{ content: 'p-3 flex flex-col gap-2' }">
                    <UButton icon="i-lucide-trash-2" color="error" variant="ghost" size="xs" />

                    <template #content>
                        <span class="text-sm">Удалить промежуток?</span>
                        <div class="flex justify-end gap-2">
                            <UButton size="xs" color="neutral" variant="ghost" label="Отмена" />
                            <UButton size="xs" color="error" label="Удалить" @click="remove" />
                        </div>
                    </template>
                </UPopover>
            </div>
        </div>

        <div class="flex flex-wrap gap-1">
            <UKbd v-for="badge in badges" :key="badge.code" size="md"
                :style="badgeStyle(badge.code, badge.value)">
                {{ badge.label }} {{ badge.value }} {{ badge.units }}
            </UKbd>

            <UKbd size="md">
                Инверсия {{ inversion }} °C
            </UKbd>
        </div>
    </div>
</template>

<style scoped>
.saved-interval {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.6rem;
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius);
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
}

.saved-interval:hover {
    background: var(--ui-bg-muted);
}

.saved-interval--active {
    border-color: var(--ui-primary);
}
</style>
