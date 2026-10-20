import type Indicator from "./indicator"

export type MeteoStat = {
    avg: number | null
    min: number | null
    max: number | null
}

export type DailyStat = {
    time: string,
    inversion: number
}

export type MeteoSummary = {
    id?: number,
    code?: string,
    name?: string,
    units?: string,
    value?: MeteoStat | undefined
}
export type Inversion = {
    average: number
    daily: DailyStat[]
}

export type Calculation = {
    id: string
    name: string
    code: string
    dateFrom: string
    dateTo: string
    description: string
    siteGroup?: string[],
    indicator?: Indicator,
    inversion?: Inversion,
    meteo?: MeteoSummary[]
}

export type SavedInterval = Omit<Calculation, 'inversion'> & {
    inversion?: number
}