import type { ProfilerRow } from '../data'
import { average, isWarm, parseTime, shiftDate } from './helpers'
import { analyzeProfile, tempAt } from './profile'
import type {
    AdvectionStat,
    AmplitudeStat,
    DailyProfileSummary,
    ExtremeProfile,
    HeightAverage,
    InversionLayer,
    InversionStat,
    LayerStats,
    MixingStat,
    PeriodKey,
    PeriodStat,
    ProfileAnalysis,
    ProfilerSummaryData,
    RunStat,
    StabilityKind,
    StabilityStat,
} from './types'

const STABLE_RUN_HOURS = 3
const HEIGHT_KEYS = [0, 100, 300, 600, 1000]

type PeriodDefinition = {
    key: PeriodKey
    label: string
    interval: string
}

const WARM_PERIODS: PeriodDefinition[] = [
    { key: 'night', label: 'Ночь', interval: 'с 22:00 до 06:00' },
    { key: 'morning', label: 'Утро', interval: 'с 06:00 до 10:00' },
    { key: 'day', label: 'День', interval: 'с 10:00 до 19:00' },
    { key: 'evening', label: 'Вечер', interval: 'с 19:00 до 22:00' },
]

const COLD_PERIODS: PeriodDefinition[] = [
    { key: 'night', label: 'Ночь', interval: 'с 19:00 до 07:00' },
    { key: 'morning', label: 'Утро', interval: 'с 07:00 до 10:00' },
    { key: 'day', label: 'День', interval: 'с 10:00 до 16:00' },
    { key: 'evening', label: 'Вечер', interval: 'с 16:00 до 19:00' },
]

function periodOf(date: string, hour: number): PeriodKey {
    if (isWarm(date)) {
        if (hour >= 22 || hour < 6) return 'night'
        if (hour < 10) return 'morning'
        if (hour < 19) return 'day'
        return 'evening'
    }

    if (hour >= 19 || hour < 7) return 'night'
    if (hour < 10) return 'morning'
    if (hour < 16) return 'day'
    return 'evening'
}

function periodDefinitions(date: string): PeriodDefinition[] {
    return isWarm(date) ? WARM_PERIODS : COLD_PERIODS
}

function stabilityStat(profiles: ProfileAnalysis[]): StabilityStat {
    const stat: StabilityStat = { stable: 0, weak: 0, unstable: 0, total: 0 }

    for (const profile of profiles) {
        if (!profile.stability) continue
        stat[profile.stability] += 1
        stat.total += 1
    }

    return stat
}

function dominantKind(stat: StabilityStat): { kind: StabilityKind | null; share: number } {
    if (!stat.total) return { kind: null, share: 0 }

    const entries: [StabilityKind, number][] = [
        ['stable', stat.stable],
        ['weak', stat.weak],
        ['unstable', stat.unstable],
    ]
    const [kind, count] = entries.sort((a, b) => b[1] - a[1])[0]!

    return { kind, share: count / stat.total }
}

function mixingStat(profiles: ProfileAnalysis[]): MixingStat {
    const values = profiles.flatMap(profile => (
        profile.mixingHeight !== null && profile.mixingHeight > 0 ? [profile.mixingHeight] : []
    ))
    const absentCount = profiles.filter(profile => profile.mixingHeight === 0).length
    const aboveTopCount = profiles.filter(profile => profile.mixingAboveTop).length

    return {
        count: values.length,
        absentCount,
        aboveTopCount,
        avgHeight: average(values),
        maxHeight: values.length ? Math.max(...values) : null,
    }
}

function layerStats(layers: InversionLayer[]): LayerStats | null {
    if (!layers.length) return null

    const intensities = layers.map(layer => layer.intensity)
    const thicknesses = layers.map(layer => layer.thickness)
    const bases = layers.map(layer => layer.base)
    const tops = layers.map(layer => layer.top)

    return {
        count: layers.length,
        minIntensity: Math.min(...intensities),
        maxIntensity: Math.max(...intensities),
        minThickness: Math.min(...thicknesses),
        maxThickness: Math.max(...thicknesses),
        minBase: Math.min(...bases),
        maxBase: Math.max(...bases),
        minTop: Math.min(...tops),
        maxTop: Math.max(...tops),
    }
}

function inversionStat(profiles: ProfileAnalysis[]): InversionStat {
    const surfaceLayers = profiles.flatMap(profile => profile.surfaceInversion ? [profile.surfaceInversion] : [])
    const elevatedLayers = profiles.flatMap(profile => profile.elevatedInversion ? [profile.elevatedInversion] : [])
    let max: { layer: InversionLayer; time: string } | null = null

    for (const profile of profiles) {
        for (const layer of profile.inversions) {
            if (!max || layer.intensity > max.layer.intensity) {
                max = { layer, time: profile.time }
            }
        }
    }

    return {
        anyCount: profiles.filter(profile => profile.category !== 'none').length,
        surfaceCount: profiles.filter(profile => profile.surfaceInversion !== null).length,
        elevatedCount: profiles.filter(profile => profile.elevatedInversion !== null).length,
        mixedCount: profiles.filter(profile => profile.category === 'mixed').length,
        noneCount: profiles.filter(profile => profile.category === 'none').length,
        surface: layerStats(surfaceLayers),
        elevated: layerStats(elevatedLayers),
        max,
    }
}

function periodStats(profiles: ProfileAnalysis[]): PeriodStat[] {
    const definitions = periodDefinitions(profiles[0]?.date ?? '2020-01-01')

    return definitions.map(definition => {
        const subset = profiles.filter(profile => periodOf(profile.date, profile.hour) === definition.key)
        const stat = stabilityStat(subset)
        const dominant = dominantKind(stat)
        const gradients = subset.flatMap(profile => profile.gradient100 !== null ? [profile.gradient100] : [])

        return {
            key: definition.key,
            label: definition.label,
            interval: definition.interval,
            stability: stat,
            dominant: dominant.kind,
            dominantShare: dominant.share,
            gradientAvg: average(gradients),
            mixing: mixingStat(subset),
        }
    })
}

function heightAverages(profiles: ProfileAnalysis[]): HeightAverage[] {
    const result: HeightAverage[] = []

    for (const height of HEIGHT_KEYS) {
        const values = profiles.flatMap(profile => {
            const value = tempAt(profile.levels, height)
            return value !== null ? [value] : []
        })
        const value = average(values)

        if (value !== null) result.push({ height, value })
    }

    return result
}

function amplitude(valuesByDate: Map<string, number[]>): number | null {
    const amplitudes: number[] = []

    for (const values of valuesByDate.values()) {
        if (values.length < 2) continue
        amplitudes.push(Math.max(...values) - Math.min(...values))
    }

    return average(amplitudes)
}

function amplitudeStat(profiles: ProfileAnalysis[]): AmplitudeStat {
    const surface = new Map<string, number[]>()
    const height600 = new Map<string, number[]>()
    const height1000 = new Map<string, number[]>()

    const push = (map: Map<string, number[]>, key: string, value: number | null) => {
        if (value === null) return
        const values = map.get(key)
        if (values) values.push(value)
        else map.set(key, [value])
    }

    for (const profile of profiles) {
        push(surface, profile.date, profile.surfaceTemp)
        push(height600, profile.date, tempAt(profile.levels, 600))
        push(height1000, profile.date, tempAt(profile.levels, 1000))
    }

    return {
        surface: amplitude(surface),
        height600: amplitude(height600),
        height1000: amplitude(height1000),
    }
}

function stableRuns(profiles: ProfileAnalysis[]): RunStat {
    const sorted = [...profiles].sort((a, b) => parseTime(a.time) - parseTime(b.time))
    const stat: RunStat = { count: 0, totalHours: 0, maxHours: 0 }
    let runLength = 0
    let previousTime = 0

    const finish = () => {
        if (runLength >= STABLE_RUN_HOURS) {
            stat.count += 1
            stat.totalHours += runLength
            stat.maxHours = Math.max(stat.maxHours, runLength)
        }
        runLength = 0
    }

    for (const profile of sorted) {
        const time = parseTime(profile.time)

        if (profile.stability !== 'stable') {
            finish()
            previousTime = time
            continue
        }

        if (runLength > 0 && time - previousTime > 90 * 60 * 1000) {
            finish()
        }

        runLength += 1
        previousTime = time
    }

    finish()

    return stat
}

function advectionStat(profiles: ProfileAnalysis[]): AdvectionStat {
    const byKey = new Map<string, ProfileAnalysis>()

    for (const profile of profiles) {
        byKey.set(`${profile.date}|${profile.hour}`, profile)
    }

    let count = 0
    let maxDelta: number | null = null
    let maxTime: string | null = null
    let maxPreviousTime: string | null = null

    for (const profile of profiles) {
        const threshold = isWarm(profile.date) ? 3 : 2
        const previous = byKey.get(`${shiftDate(profile.date, -1)}|${profile.hour}`)
        if (!previous) continue

        const currentTemp = tempAt(profile.levels, 600)
        const previousTemp = tempAt(previous.levels, 600)
        if (currentTemp === null || previousTemp === null) continue

        const delta = currentTemp - previousTemp

        if (Math.abs(delta) >= threshold) {
            count += 1
            if (maxDelta === null || Math.abs(delta) > Math.abs(maxDelta)) {
                maxDelta = delta
                maxTime = profile.time
                maxPreviousTime = previous.time
            }
        }
    }

    return {
        threshold: profiles.length ? (isWarm(profiles[0]!.date) ? 3 : 2) : 3,
        count,
        maxDelta,
        maxTime,
        maxPreviousTime,
    }
}

function dailySummaries(profiles: ProfileAnalysis[]): DailyProfileSummary[] {
    const byDate = new Map<string, ProfileAnalysis[]>()

    for (const profile of profiles) {
        const items = byDate.get(profile.date)
        if (items) items.push(profile)
        else byDate.set(profile.date, [profile])
    }

    return [...byDate.entries()]
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([date, items]) => {
            const gradients = items.flatMap(item => item.gradient100 !== null ? [item.gradient100] : [])
            const intensities = items.flatMap(item => item.inversions.map(layer => layer.intensity))
            const mixing = items.flatMap(item => (
                item.mixingHeight !== null && item.mixingHeight > 0 ? [item.mixingHeight] : []
            ))

            return {
                date,
                total: items.length,
                inversionHours: items.filter(item => item.category !== 'none').length,
                surfaceHours: items.filter(item => item.surfaceInversion !== null).length,
                elevatedHours: items.filter(item => item.elevatedInversion !== null).length,
                minGradient: gradients.length ? Math.min(...gradients) : null,
                maxGradient: gradients.length ? Math.max(...gradients) : null,
                maxIntensity: intensities.length ? Math.max(...intensities) : null,
                mixingAvg: average(mixing),
                mixingAboveTopHours: items.filter(item => item.mixingAboveTop).length,
            }
        })
}

function extreme(profiles: ProfileAnalysis[], mode: 'min' | 'max'): ExtremeProfile | null {
    let result: ExtremeProfile | null = null

    for (const profile of profiles) {
        if (profile.gradient100 === null) continue
        if (!result) {
            result = { time: profile.time, value: profile.gradient100 }
            continue
        }

        const better = mode === 'min'
            ? profile.gradient100 < result.value
            : profile.gradient100 > result.value

        if (better) result = { time: profile.time, value: profile.gradient100 }
    }

    return result
}

function distinctDates(profiles: ProfileAnalysis[]): number {
    return new Set(profiles.map(profile => profile.date)).size
}

export function analyzeProfilerSummary(rows: ProfilerRow[]): ProfilerSummaryData {
    const profiles = rows
        .map(analyzeProfile)
        .filter((profile): profile is ProfileAnalysis => profile !== null)
        .sort((a, b) => a.time.localeCompare(b.time))
    const stability = stabilityStat(profiles)
    const dominant = dominantKind(stability)
    const gradients = profiles.flatMap(profile => profile.gradient100 !== null ? [profile.gradient100] : [])

    return {
        total: profiles.length,
        periodDays: distinctDates(profiles),
        firstTime: profiles[0]?.time ?? null,
        lastTime: profiles[profiles.length - 1]?.time ?? null,
        stability,
        dominant: dominant.kind,
        dominantShare: dominant.share,
        gradientAvg: average(gradients),
        periods: periodStats(profiles),
        heights: heightAverages(profiles),
        amplitude: amplitudeStat(profiles),
        inversion: inversionStat(profiles),
        mixing: mixingStat(profiles),
        stableRuns: stableRuns(profiles),
        advection: advectionStat(profiles),
        mostStable: extreme(profiles, 'min'),
        mostUnstable: extreme(profiles, 'max'),
        daily: dailySummaries(profiles),
    }
}
