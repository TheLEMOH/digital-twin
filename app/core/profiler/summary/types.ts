export type StabilityKind = 'stable' | 'weak' | 'unstable'

export type PeriodKey = 'night' | 'morning' | 'day' | 'evening'

export type InversionCategory = 'surface' | 'elevated' | 'mixed' | 'none'

export type ProfilerLevel = {
    height: number
    temp: number
}

export type InversionLayer = {
    base: number
    top: number
    thickness: number
    intensity: number
}

export type ProfileAnalysis = {
    time: string
    date: string
    hour: number
    levels: ProfilerLevel[]
    surfaceTemp: number | null
    topTemp: number | null
    gradient100: number | null
    stability: StabilityKind | null
    category: InversionCategory
    inversions: InversionLayer[]
    surfaceInversion: InversionLayer | null
    elevatedInversion: InversionLayer | null
    mixingHeight: number | null
    mixingAboveTop: boolean
}

export type StabilityStat = {
    stable: number
    weak: number
    unstable: number
    total: number
}

export type LayerStats = {
    count: number
    minIntensity: number
    maxIntensity: number
    minThickness: number
    maxThickness: number
    minBase: number
    maxBase: number
    minTop: number
    maxTop: number
}

export type MixingStat = {
    count: number
    absentCount: number
    aboveTopCount: number
    avgHeight: number | null
    maxHeight: number | null
}

export type PeriodStat = {
    key: PeriodKey
    label: string
    interval: string
    stability: StabilityStat
    dominant: StabilityKind | null
    dominantShare: number
    gradientAvg: number | null
    mixing: MixingStat
}

export type HeightAverage = {
    height: number
    value: number
}

export type AmplitudeStat = {
    surface: number | null
    height600: number | null
    height1000: number | null
}

export type ExtremeProfile = {
    time: string
    value: number
}

export type RunStat = {
    count: number
    totalHours: number
    maxHours: number
}

export type AdvectionStat = {
    threshold: number
    count: number
    maxDelta: number | null
    maxTime: string | null
    maxPreviousTime: string | null
}

export type DailyProfileSummary = {
    date: string
    total: number
    inversionHours: number
    surfaceHours: number
    elevatedHours: number
    minGradient: number | null
    maxGradient: number | null
    maxIntensity: number | null
    mixingAvg: number | null
    mixingAboveTopHours: number
}

export type InversionStat = {
    anyCount: number
    surfaceCount: number
    elevatedCount: number
    mixedCount: number
    noneCount: number
    surface: LayerStats | null
    elevated: LayerStats | null
    max: { layer: InversionLayer; time: string } | null
}

export type ProfilerSummaryData = {
    total: number
    periodDays: number
    firstTime: string | null
    lastTime: string | null
    stability: StabilityStat
    dominant: StabilityKind | null
    dominantShare: number
    gradientAvg: number | null
    periods: PeriodStat[]
    heights: HeightAverage[]
    amplitude: AmplitudeStat
    inversion: InversionStat
    mixing: MixingStat
    stableRuns: RunStat
    advection: AdvectionStat
    mostStable: ExtremeProfile | null
    mostUnstable: ExtremeProfile | null
    daily: DailyProfileSummary[]
}
