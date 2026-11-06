import { PROFILER_LEVELS, type ProfilerRow } from '../data'
import { toNumber } from './helpers'
import type { InversionCategory, InversionLayer, ProfileAnalysis, ProfilerLevel, StabilityKind } from './types'

const DRY_ADIABAT = 0.0098
const MIXING_TOLERANCE = 0.5

function readLevels(row: ProfilerRow): ProfilerLevel[] {
    const levels: ProfilerLevel[] = []

    for (const level of PROFILER_LEVELS) {
        const temp = toNumber(row[level.key])
        if (temp !== null) levels.push({ height: level.height, temp })
    }

    if (!levels.some(level => level.height === 0)) {
        const surface = toNumber(row['m-t'])
        if (surface !== null) levels.unshift({ height: 0, temp: surface })
    }

    return levels.sort((a, b) => a.height - b.height)
}

export function tempAt(levels: ProfilerLevel[], height: number): number | null {
    return levels.find(level => level.height === height)?.temp ?? null
}

function buildLayers(levels: ProfilerLevel[]): InversionLayer[] {
    const layers: InversionLayer[] = []
    let base: number | null = null
    let top = 0
    let intensity = 0

    for (let index = 1; index < levels.length; index++) {
        const lower = levels[index - 1]!
        const upper = levels[index]!
        const delta = upper.temp - lower.temp

        if (delta <= 0) {
            if (base !== null) {
                layers.push({ base, top, thickness: top - base, intensity })
                base = null
            }
            continue
        }

        if (base !== null && lower.height <= top + 0.1) {
            top = upper.height
            intensity += delta
            continue
        }

        if (base !== null) {
            layers.push({ base, top, thickness: top - base, intensity })
        }

        base = lower.height
        top = upper.height
        intensity = delta
    }

    if (base !== null) {
        layers.push({ base, top, thickness: top - base, intensity })
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

        if (layer.intensity > result.intensity) {
            result = layer
        } else if (layer.intensity === result.intensity && layer.thickness > result.thickness) {
            result = layer
        }
    }

    return result
}

function classifyStability(gradient: number | null): StabilityKind | null {
    if (gradient === null) return null
    if (gradient < 0) return 'stable'
    if (gradient < 0.98) return 'weak'
    return 'unstable'
}

function analyzeMixingHeight(levels: ProfilerLevel[], surfaceInversion: boolean): { height: number | null; aboveTop: boolean } {
    if (levels.length < 2) return { height: null, aboveTop: false }
    if (surfaceInversion) return { height: 0, aboveTop: false }

    const surfaceTemp = tempAt(levels, 0) ?? levels[0]!.temp
    const topHeight = levels[levels.length - 1]!.height
    let lastInside = 0

    for (const level of levels) {
        if (level.height <= 0) continue

        const adiabat = surfaceTemp - DRY_ADIABAT * level.height
        const deviation = level.temp - adiabat

        if (deviation <= MIXING_TOLERANCE) {
            lastInside = level.height
            continue
        }

        return { height: lastInside, aboveTop: false }
    }

    return {
        height: lastInside,
        aboveTop: lastInside >= topHeight,
    }
}

function categoryOf(surfaceInversion: InversionLayer | null, elevatedInversion: InversionLayer | null): InversionCategory {
    if (surfaceInversion && elevatedInversion) return 'mixed'
    if (surfaceInversion) return 'surface'
    if (elevatedInversion) return 'elevated'
    return 'none'
}

export function analyzeProfile(row: ProfilerRow): ProfileAnalysis | null {
    const time = String(row.time)
    const levels = readLevels(row)

    if (levels.length < 2) return null

    const surfaceTemp = tempAt(levels, 0)
    const topTemp = levels[levels.length - 1]!.temp
    const temp100 = tempAt(levels, 100)
    const gradient100 = surfaceTemp !== null && temp100 !== null ? surfaceTemp - temp100 : null
    const inversions = buildLayers(levels)
    const surfaceInversion = strongestLayer(inversions.filter(layer => layer.base === 0))
    const elevatedInversion = strongestLayer(inversions.filter(layer => layer.base > 0))
    const mixing = analyzeMixingHeight(levels, surfaceInversion !== null)

    return {
        time,
        date: time.slice(0, 10),
        hour: Number.parseInt(time.slice(11, 13), 10) || 0,
        levels,
        surfaceTemp,
        topTemp,
        gradient100,
        stability: classifyStability(gradient100),
        category: categoryOf(surfaceInversion, elevatedInversion),
        inversions,
        surfaceInversion,
        elevatedInversion,
        mixingHeight: mixing.height,
        mixingAboveTop: mixing.aboveTop,
    }
}
