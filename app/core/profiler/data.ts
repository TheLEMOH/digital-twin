export type ProfilerRow = {
    time: string
    [key: string]: string | number | undefined
}

export type ProfilerLevelKey = {
    height: number
    key: string
}

export const PROFILER_HEIGHTS = [
    0, 25, 50, 75, 100, 150, 200, 250, 300, 350, 400,
    450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000,
]

export const PROFILER_LEVELS: ProfilerLevelKey[] = PROFILER_HEIGHTS.map(height => ({
    height,
    key: `t_h${height.toString().padStart(4, '0')}`,
}))

export const PROFILER_SURFACE_HEIGHT = 0
export const PROFILER_MIXING_TOP = 1000
export const PROFILER_SURFACE_TOP = 150
