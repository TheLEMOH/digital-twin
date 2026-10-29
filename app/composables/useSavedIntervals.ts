import { CalendarDate } from '@internationalized/date'
import { air, monitoring, profiler } from '~/core/data/register'
import { avgByPeriod } from '~/core/avg/avgByPeriod'
import { siteFilter } from '~/core/filters/siteFilter'
import { analyzeInversions } from '~/core/profiler/inversion'
import { buildIntervalSummary, loadHourlyAirData } from '~/core/summary'
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

    const computeStats = async (dateFrom: string, dateTo: string, indicator?: Indicator, siteGroup: string[] = []) => {
        const { sites, indicators } = await air.getDta()
        const selectedSites = siteGroup.length ? siteFilter(sites, siteGroup) : sites
        const [data, profilerData] = await Promise.all([
            loadHourlyAirData(selectedSites.map(site => site.id), dateFrom, dateTo),
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

    const computeSummary = (dateFrom: string, dateTo: string, siteGroup: string[] = [], fallback = '') =>
        buildIntervalSummary(dateFrom, dateTo, siteGroup).catch(() => fallback)

    const addInterval = async (payload: SavedIntervalPayload) => {
        loadingStats.value = true

        try {
            const groups = payload.siteGroup ?? (selectedSiteGroup ? [...selectedSiteGroup.value] : [])
            const indicator = payload.indicator ?? (selectedIndicator ? { ...selectedIndicator.value } : undefined)
            const [stats, summary] = await Promise.all([
                computeStats(payload.dateFrom, payload.dateTo, indicator, groups),
                computeSummary(payload.dateFrom, payload.dateTo, groups)
            ])
            const { meteo, inversion } = stats

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
                inversion,
                summary
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
        const summaryChanged = datesChanged || groupChanged || !existing.summary

        loadingStats.value = true

        try {
            const [stats, summary] = await Promise.all([
                statsChanged
                    ? computeStats(payload.dateFrom, payload.dateTo, nextIndicator, nextGroup)
                    : Promise.resolve({
                        meteo: cachedMeteo,
                        inversion: existing.inversion
                    }),
                summaryChanged
                    ? computeSummary(payload.dateFrom, payload.dateTo, nextGroup, existing.summary ?? '')
                    : Promise.resolve(existing.summary ?? '')
            ])

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
                    inversion: stats.inversion,
                    summary
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
