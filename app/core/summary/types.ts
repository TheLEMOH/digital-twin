import type Site from '~/types/site'

export type SummarySite = Pick<Site, 'id' | 'name'>

export type Stats = {
    avg: number
    min: number
    max: number
    count: number
}

export type Observation = {
    value: number
    time: string
    site: number
    siteName?: string
}

export type DailySummary = {
    date: string
    pm: Stats | null
    pmMax: Observation | null
    pmValues: number[]
    temp: Stats | null
    tempValues: number[]
    wind: Stats | null
    windValues: number[]
    direction: string | null
    directions: number[]
    calmShare: number | null
}

export type HalfSummary = {
    pm: Stats | null
    temp: Stats | null
    wind: Stats | null
    direction: string | null
    calmShare: number | null
}

export type InversionLayer = {
    base: number
    top: number
    thickness: number
    intensity: number
}

export type InversionProfile = {
    time: string
    surface: InversionLayer | null
    full: InversionLayer | null
}

export type InversionStats = {
    total: number
    surfaceCount: number
    fullCount: number
    surfaceMaxThickness: number | null
    surfaceAvgThickness: number | null
    surfaceMaxIntensity: number | null
    surfaceAvgIntensity: number | null
    fullMaxThickness: number | null
    fullAvgThickness: number | null
    fullMaxIntensity: number | null
    fullAvgIntensity: number | null
}

export type InversionSummary = InversionStats & {
    profiles: InversionProfile[]
}

export type IntervalSummaryData = {
    periodDays: number
    daily: DailySummary[]
    pm: Stats | null
    temp: Stats | null
    wind: Stats | null
    direction: string | null
    calmShare: number | null
    daysWithPm: number
    daysAbove: number
    maxDaily: { date: string; value: number } | null
    maxHourly: Observation | null
    inversion: InversionSummary
}
