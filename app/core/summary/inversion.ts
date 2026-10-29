import type { InversionLayer, InversionProfile, InversionStats, InversionSummary } from './types'

export type ProfilerRow = {
    time: string
    [key: string]: string | number | undefined
}

const HEIGHTS = [0, 25, 50, 75, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000]
const LEVELS = HEIGHTS.map(height => ({
    height,
    key: `t_h${height.toString().padStart(4, '0')}`,
}))
const SURFACE_TOP = 150

type Segment = {
    lower: number
    upper: number
    delta: number
}

function toNumber(value: unknown): number | null {
    if (typeof value === 'number') {
        return Number.isFinite(value) ? value : null
    }

    if (typeof value === 'string') {
        const parsed = Number.parseFloat(value.trim().replace(',', '.'))
        return Number.isFinite(parsed) ? parsed : null
    }

    return null
}

function finishLayer(base: number, top: number, intensity: number): InversionLayer {
    return {
        base,
        top,
        thickness: top - base,
        intensity,
    }
}

function buildLayers(segments: Segment[]): InversionLayer[] {
    const layers: InversionLayer[] = []
    let base: number | null = null
    let top = 0
    let intensity = 0

    for (const segment of segments) {
        if (base !== null && segment.lower <= top + 0.1) {
            top = segment.upper
            intensity += segment.delta
            continue
        }

        if (base !== null) {
            layers.push(finishLayer(base, top, intensity))
        }

        base = segment.lower
        top = segment.upper
        intensity = segment.delta
    }

    if (base !== null) {
        layers.push(finishLayer(base, top, intensity))
    }

    return layers
}

function strongestLayer(layers: InversionLayer[]): InversionLayer | null {
    let result: InversionLayer | null = null

    for (const layer of layers) {
        if (!result) {
            result = layer
            continue
        }

        if (layer.thickness > result.thickness) {
            result = layer
        } else if (layer.thickness === result.thickness && layer.intensity > result.intensity) {
            result = layer
        }
    }

    return result
}

function analyzeProfile(row: ProfilerRow): InversionProfile {
    const segments: Segment[] = []

    for (let index = 1; index < LEVELS.length; index++) {
        const lower = LEVELS[index - 1]!
        const upper = LEVELS[index]!
        const lowerTemp = toNumber(row[lower.key])
        const upperTemp = toNumber(row[upper.key])

        if (lowerTemp === null || upperTemp === null) continue

        const delta = upperTemp - lowerTemp

        if (delta > 0) {
            segments.push({
                lower: lower.height,
                upper: upper.height,
                delta,
            })
        }
    }

    const surfaceSegments = segments.filter(segment => segment.upper <= SURFACE_TOP)

    return {
        time: row.time,
        surface: strongestLayer(buildLayers(surfaceSegments)),
        full: strongestLayer(buildLayers(segments)),
    }
}

function average(values: number[]): number | null {
    if (!values.length) return null
    return values.reduce((sum, value) => sum + value, 0) / values.length
}

export function summarizeProfiles(profiles: InversionProfile[]): InversionStats {
    const surfaceLayers = profiles.flatMap(profile => profile.surface ? [profile.surface] : [])
    const fullLayers = profiles.flatMap(profile => profile.full ? [profile.full] : [])

    return {
        total: profiles.length,
        surfaceCount: surfaceLayers.length,
        fullCount: fullLayers.length,
        surfaceMaxThickness: surfaceLayers.length ? Math.max(...surfaceLayers.map(layer => layer.thickness)) : null,
        surfaceAvgThickness: average(surfaceLayers.map(layer => layer.thickness)),
        surfaceMaxIntensity: surfaceLayers.length ? Math.max(...surfaceLayers.map(layer => layer.intensity)) : null,
        surfaceAvgIntensity: average(surfaceLayers.map(layer => layer.intensity)),
        fullMaxThickness: fullLayers.length ? Math.max(...fullLayers.map(layer => layer.thickness)) : null,
        fullAvgThickness: average(fullLayers.map(layer => layer.thickness)),
        fullMaxIntensity: fullLayers.length ? Math.max(...fullLayers.map(layer => layer.intensity)) : null,
        fullAvgIntensity: average(fullLayers.map(layer => layer.intensity)),
    }
}

export function analyzeProfiler(data: ProfilerRow[]): InversionSummary {
    const profiles = data.map(analyzeProfile)

    return {
        ...summarizeProfiles(profiles),
        profiles,
    }
}
