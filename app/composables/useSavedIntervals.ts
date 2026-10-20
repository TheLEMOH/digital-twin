import { CalendarDate } from '@internationalized/date'
import { air, monitoring, profiler } from '~/core/data/register'
import { avgByPeriod } from '~/core/avg/avgByPeriod'
import { analyzeInversions } from '~/core/profiler/inversion'
import type { SavedInterval, MeteoSummary } from '~/types/calculation'
import type SelectedDates from '~/types/selectedDates'
import type Indicator from '~/types/indicator'
import type { ShallowRef } from 'vue'

const STORAGE_KEY = 'digital-twin:saved-intervals'

export type SavedIntervalPayload = {
    name: string
    dateFrom: string
    dateTo: string
    description?: string
    indicator?: Indicator
    siteGroup?: string[]
}

const parseDate = (value: string): CalendarDate => {
    const [year, month, day] = value.split('-').map(Number)
    return new CalendarDate(year!, month!, day!)
}

export default function useSavedIntervals({ selectedDates, selectedSiteGroup, selectedIndicator }:
    { selectedDates: ShallowRef<SelectedDates>, selectedSiteGroup?: ShallowRef<string[]>, selectedIndicator?: ShallowRef<Indicator> }) {

    const intervals = shallowRef<SavedInterval[]>([])
    const isOpenModal = ref<boolean>(false)
    const editing = shallowRef<SavedInterval | null>(null)
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
            const saved = JSON.parse(raw) as SavedInterval[]
            intervals.value = saved.map(item => {
                const code = item.indicator?.code
                if (!code || !item.meteo) return item

                return { ...item, meteo: item.meteo.filter(meteo => meteo.code === code) }
            })
        } catch {
            intervals.value = []
        }

        persist()
    }

    const computeStats = async (dateFrom: string, dateTo: string, indicator?: Indicator) => {
        const { indicators } = await air.getDta()
        const [data, profilerData] = await Promise.all([
            air.getData({ begin: dateFrom, end: dateTo, timeInterval: 'day' }),
            profiler.getDataBySite({ begin: dateFrom, end: dateTo, timeInterval: 'day' })
        ])
        const statsIndicators = indicator?.code
            ? [indicators.find(item => item.code === indicator.code) ?? indicator]
            : indicators
        const avgData = avgByPeriod(data, statsIndicators)
        const meteo: MeteoSummary[] = statsIndicators.map(item => ({ ...item, value: avgData[item.code] }))

        return {
            meteo: meteo.filter(item => item.value?.avg),
            inversion: analyzeInversions(profilerData).average
        }
    }

    const addInterval = async (payload: SavedIntervalPayload) => {
        loadingStats.value = true

        try {
            const groups = payload.siteGroup ?? (selectedSiteGroup ? [...selectedSiteGroup.value] : [])
            const indicator = payload.indicator ?? (selectedIndicator ? { ...selectedIndicator.value } : undefined)
            const { meteo, inversion } = await computeStats(payload.dateFrom, payload.dateTo, indicator)

            const item: SavedInterval = {
                id: `interval-${Date.now()}`,
                name: payload.name || `${payload.dateFrom} — ${payload.dateTo}`,
                code: 'USR',
                dateFrom: payload.dateFrom,
                dateTo: payload.dateTo,
                description: payload.description ?? '',
                siteGroup: groups,
                indicator,
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

    const updateInterval = async (id: string, payload: SavedIntervalPayload) => {
        const existing = intervals.value.find(item => item.id === id)
        if (!existing) return

        const datesChanged = existing.dateFrom !== payload.dateFrom || existing.dateTo !== payload.dateTo
        const nextGroup = payload.siteGroup ?? existing.siteGroup ?? (selectedSiteGroup ? [...selectedSiteGroup.value] : [])
        const groupChanged = JSON.stringify(nextGroup) !== JSON.stringify(existing.siteGroup ?? [])
        const nextIndicator = payload.indicator ?? existing.indicator
        const indicatorCode = nextIndicator?.code
        const indicatorChanged = indicatorCode !== existing.indicator?.code
        const cachedMeteo = indicatorCode
            ? existing.meteo?.filter(item => item.code === indicatorCode)
            : existing.meteo
        const statsChanged = datesChanged || groupChanged || indicatorChanged || (!!indicatorCode && !cachedMeteo?.length)

        loadingStats.value = true

        try {
            const stats = statsChanged
                ? await computeStats(payload.dateFrom, payload.dateTo, nextIndicator)
                : {
                    meteo: cachedMeteo,
                    inversion: existing.inversion
                }

            intervals.value = intervals.value.map(item => item.id === id
                ? {
                    ...item,
                    name: payload.name || `${payload.dateFrom} — ${payload.dateTo}`,
                    description: payload.description ?? '',
                    dateFrom: payload.dateFrom,
                    dateTo: payload.dateTo,
                    siteGroup: nextGroup,
                    indicator: nextIndicator,
                    meteo: stats.meteo,
                    inversion: stats.inversion
                }
                : item)

            if (statsChanged) {
                monitoring.getData({ begin: payload.dateFrom, end: payload.dateTo }).catch(() => { })
            }
        } finally {
            loadingStats.value = false
        }
    }

    const removeInterval = (id: string) => {
        intervals.value = intervals.value.filter(item => item.id !== id)
    }

    const loadInterval = (item: SavedInterval) => {
        if (selectedSiteGroup && item.siteGroup) {
            selectedSiteGroup.value = [...item.siteGroup]
        }

        if (selectedIndicator && item.indicator?.code) {
            selectedIndicator.value = { ...item.indicator }
        }

        selectedDates.value = {
            start: parseDate(item.dateFrom),
            end: parseDate(item.dateTo)
        }
    }

    const openModal = (item: SavedInterval | null = null) => {
        editing.value = item
        isOpenModal.value = true
    }

    if (import.meta.client) {
        restore()
        watch(intervals, persist, { deep: true })
    }

    return {
        intervals,
        isOpenModal,
        editing,
        loadingStats,
        addInterval,
        updateInterval,
        removeInterval,
        loadInterval,
        openModal
    }
}

export type SavedIntervals = ReturnType<typeof useSavedIntervals>
