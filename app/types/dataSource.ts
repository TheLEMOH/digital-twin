import type { CalendarDate } from "@internationalized/date"
import type Dta from "./dta"
import type Indicator from "./indicator"
import type Site from "./site"
import type SiteData from "./siteData"

export type TimeInterval = 'hour' | 'day'

export type DateLike = CalendarDate | string

export interface DataSourceConfig {
    uid: string,
    dta: string[],
    siteId?: number
}

export interface DateRange {
    begin: DateLike,
    end: DateLike
}

export interface DataQuery extends DateRange {
    sites?: number | number[],
    timeInterval?: TimeInterval
}

export interface DataByDtaQuery extends DataQuery {
    codeDta?: string
}

export interface DataBySiteQuery extends DateRange {
    siteId?: number,
    timeInterval?: TimeInterval
}

export interface DataBySitesQuery extends DateRange {
    sites: Site[],
    timeInterval?: TimeInterval
}

export interface SiteDataBySite {
    site: Site,
    data: SiteData[]
}

export interface Sets {
    dta: Dta[],
    sites: Site[],
    indicators: Indicator[]
}
