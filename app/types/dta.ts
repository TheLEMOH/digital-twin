import type Indicator from "./indicator"
import type Site from "./site"

export default interface Dta {
    code: string,
    config: unknown,
    id: number
    indicators: Indicator[],
    last_time: string,
    name: string,
    period_begin: string
    period_end: string
    period_limit: unknown
    sites: Site[]
}