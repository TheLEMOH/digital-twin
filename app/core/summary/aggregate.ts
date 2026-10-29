import type SiteData from '~/types/siteData'
import type Site from '~/types/site'
import type { DailySummary, HalfSummary, IntervalSummaryData, Observation, Stats } from './types'
import { analyzeProfiler, type ProfilerRow } from './inversion'
import {
    CALM_WIND_SPEED,
    PM25_CODE,
    PM25_DAILY_LIMIT,
    TEMP_CODE,
    WIND_CODE,
    WIND_DIRECTION_CODE,
} from './constants'

const DIRECTION_LABELS: Record<string, string> = {
    С: 'северное',
    СВ: 'северо-восточное',
    В: 'восточное',
    ЮВ: 'юго-восточное',
    Ю: 'южное',
    ЮЗ: 'юго-западное',
    З: 'западное',
    СЗ: 'северо-западное',
}

const DIRECTION_SHORT = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ']

export function parseNumber(value: unknown): number | null {
    if (typeof value === 'number') {
        return Number.isFinite(value) ? value : null
    }

    if (typeof value === 'string') {
        const parsed = Number.parseFloat(value.trim().replace(',', '.'))
        return Number.isFinite(parsed) ? parsed : null
    }

    return null
}

export function listDates(begin: string, end: string): string[] {
    const cursor = new Date(`${begin}T00:00:00Z`)
    const last = new Date(`${end}T00:00:00Z`)

    if (Number.isNaN(cursor.getTime()) || Number.isNaN(last.getTime())) {
        return []
    }

    const dates: string[] = []

    while (cursor <= last) {
        dates.push(cursor.toISOString().slice(0, 10))
        cursor.setUTCDate(cursor.getUTCDate() + 1)
    }

    return dates
}

export function stats(values: number[]): Stats | null {
    if (!values.length) return null

    let sum = 0
    let min = Infinity
    let max = -Infinity

    for (const value of values) {
        sum += value
        if (value < min) min = value
        if (value > max) max = value
    }

    return {
        avg: sum / values.length,
        min,
        max,
        count: values.length,
    }
}

function median(values: number[]): number {
    const sorted = [...values].sort((a, b) => a - b)
    const middle = Math.floor(sorted.length / 2)

    if (sorted.length % 2) return sorted[middle]!
    return (sorted[middle - 1]! + sorted[middle]!) / 2
}

function temperatureStats(values: number[]): Stats | null {
    if (!values.length) return null

    return {
        avg: median(values),
        min: Math.min(...values),
        max: Math.max(...values),
        count: values.length,
    }
}

export function directionName(direction: string | null): string | null {
    if (!direction) return null
    return DIRECTION_LABELS[direction] ?? null
}

export function averageDirection(values: number[]): string | null {
    if (!values.length) return null

    let east = 0
    let north = 0

    for (const value of values) {
        const radians = value * Math.PI / 180
        east += Math.sin(radians)
        north += Math.cos(radians)
    }

    const strength = Math.hypot(east, north) / values.length
    if (strength < 0.25) return null

    const degrees = (Math.atan2(east, north) * 180 / Math.PI + 360) % 360
    return DIRECTION_SHORT[Math.round(degrees / 45) % DIRECTION_SHORT.length] ?? null
}

function collect(rows: SiteData[], code: string): number[] {
    const values: number[] = []

    for (const row of rows) {
        const value = parseNumber(row[code])
        if (value !== null) values.push(value)
    }

    return values
}

function maxObservation(rows: SiteData[], code: string, siteNames: Map<number, string>): Observation | null {
    let result: Observation | null = null

    for (const row of rows) {
        const value = parseNumber(row[code])
        if (value === null) continue

        if (!result || value > result.value) {
            const site = Number(row.site)

            result = {
                value,
                time: String(row.time),
                site,
                siteName: siteNames.get(site),
            }
        }
    }

    return result
}

function calmShare(values: number[]): number | null {
    if (!values.length) return null
    return values.filter(value => value < CALM_WIND_SPEED).length / values.length
}

function buildDaily(date: string, rows: SiteData[], siteNames: Map<number, string>): DailySummary {
    const pmValues = collect(rows, PM25_CODE)
    const tempValues = collect(rows, TEMP_CODE)
    const windValues = collect(rows, WIND_CODE)
    const directions = collect(rows, WIND_DIRECTION_CODE)

    return {
        date,
        pm: stats(pmValues),
        pmMax: maxObservation(rows, PM25_CODE, siteNames),
        pmValues,
        temp: temperatureStats(tempValues),
        tempValues,
        wind: stats(windValues),
        windValues,
        direction: averageDirection(directions),
        directions,
        calmShare: calmShare(windValues),
    }
}

export function aggregateInterval(data: SiteData[], sites: Site[], dates: string[], profilerData: ProfilerRow[] = []): IntervalSummaryData {
    const siteNames = new Map(sites.map(site => [site.id, site.name]))
    const byDate = new Map<string, SiteData[]>()

    for (const row of data) {
        const date = String(row.time).slice(0, 10)
        const rows = byDate.get(date)

        if (rows) {
            rows.push(row)
        } else {
            byDate.set(date, [row])
        }
    }

    const daily = dates.map(date => buildDaily(date, byDate.get(date) ?? [], siteNames))
    const pmValues = collect(data, PM25_CODE)
    const windValues = collect(data, WIND_CODE)
    const directions = collect(data, WIND_DIRECTION_CODE)
    const daysWithPm = daily.filter(day => day.pm !== null).length
    const daysAbove = daily.filter(day => day.pm !== null && day.pm.avg > PM25_DAILY_LIMIT).length

    let maxDaily: IntervalSummaryData['maxDaily'] = null

    for (const day of daily) {
        if (!day.pm) continue
        if (!maxDaily || day.pm.avg > maxDaily.value) {
            maxDaily = { date: day.date, value: day.pm.avg }
        }
    }

    return {
        periodDays: dates.length,
        daily,
        pm: stats(pmValues),
        temp: stats(daily.flatMap(day => day.temp ? [day.temp.avg] : [])),
        wind: stats(windValues),
        direction: averageDirection(directions),
        calmShare: calmShare(windValues),
        daysWithPm,
        daysAbove,
        maxDaily,
        maxHourly: maxObservation(data, PM25_CODE, siteNames),
        inversion: analyzeProfiler(profilerData),
    }
}

export function summarizeDays(days: DailySummary[]): HalfSummary {
    const pmValues = days.flatMap(day => day.pmValues)
    const tempValues = days.flatMap(day => day.temp ? [day.temp.avg] : [])
    const windValues = days.flatMap(day => day.windValues)
    const directions = days.flatMap(day => day.directions)

    return {
        pm: stats(pmValues),
        temp: stats(tempValues),
        wind: stats(windValues),
        direction: averageDirection(directions),
        calmShare: calmShare(windValues),
    }
}
