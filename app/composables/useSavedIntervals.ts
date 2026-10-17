import { CalendarDate } from '@internationalized/date'
import { air, monitoring, profiler } from '~/core/data/register'
import { avgByPeriod } from '~/core/avg/avgByPeriod'
import { analyzeInversions } from '~/core/profiler/inversion'
import type { Calculation, MeteoSummary } from '~/types/calculation'
import type SelectedDates from '~/types/selectedDates'
import type { ShallowRef } from 'vue'

const STORAGE_KEY = 'digital-twin:saved-intervals'

export type SavedIntervalPayload = {
    name: string
    dateFrom: string
    dateTo: string
    description?: string
}

const parseDate = (value: string): CalendarDate => {
    const [year, month, day] = value.split('-').map(Number)
    return new CalendarDate(year!, month!, day!)
}

export default function useSavedIntervals({ selectedDates }:
    { selectedDates: ShallowRef<SelectedDates> }) {

    const intervals = shallowRef<Calculation[]>([])
    const isOpenModal = ref<boolean>(false)
    const loadingStats = ref<boolean>(false)

    const persist = () => {
        if (!import.meta.client) return
        localStorage.setItem(STORAGE_KEY, JSON.stringify(intervals.value))
    }

    const restore = () => {
        if (!import.meta.client) return
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return

        try {
            intervals.value = JSON.parse(raw)
        } catch {
            intervals.value = []
        }
    }

    const computeStats = async (dateFrom: string, dateTo: string) => {
        const { indicators } = await air.getDta()
        const [data, profilerData] = await Promise.all([
            air.getData({ begin: dateFrom, end: dateTo, timeInterval: 'day' }),
            profiler.getDataBySite({ begin: dateFrom, end: dateTo, timeInterval: 'day' })
        ])
        const avgData = avgByPeriod(data, indicators)
        const meteo: MeteoSummary[] = indicators.map(indicator => ({ value: avgData[indicator.code], ...indicator }))

        return {
            meteo: meteo.filter(item => item.value?.avg),
            inversion: analyzeInversions(profilerData)
        }
    }

    const addInterval = async (payload: SavedIntervalPayload) => {
        loadingStats.value = true

        try {
            const { meteo, inversion } = await computeStats(payload.dateFrom, payload.dateTo)

            const item: Calculation = {
                id: `interval-${Date.now()}`,
                name: payload.name || `${payload.dateFrom} — ${payload.dateTo}`,
                code: 'USR',
                dateFrom: payload.dateFrom,
                dateTo: payload.dateTo,
                description: payload.description ?? '',
                meteo,
                inversion
            }

            intervals.value = [item, ...intervals.value]

            monitoring.getData({ begin: payload.dateFrom, end: payload.dateTo }).catch(() => { })

            return item
        } finally {
            loadingStats.value = false
        }
    }

    const removeInterval = (id: string) => {
        intervals.value = intervals.value.filter(item => item.id !== id)
    }

    const loadInterval = (item: Calculation) => {
        selectedDates.value = {
            start: parseDate(item.dateFrom),
            end: parseDate(item.dateTo)
        }
    }

    const openModal = () => {
        isOpenModal.value = true
    }

    if (import.meta.client) {
        restore()
        watch(intervals, persist, { deep: true })
    }

    return {
        intervals,
        isOpenModal,
        loadingStats,
        addInterval,
        removeInterval,
        loadInterval,
        openModal
    }
}

export type SavedIntervals = ReturnType<typeof useSavedIntervals>
