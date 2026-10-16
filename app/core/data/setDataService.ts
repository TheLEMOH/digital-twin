import formateDate from "~/scripts/formate"
import type SiteData from "~/types/siteData"
import type { DataSourceConfig, TimeInterval } from "~/types/dataSource"

const BASE_URL = "https://sensor.krasn.ru/hub/api/3.0/sets/"
const CACHE_LIMIT = 200

export interface ArchiveQuery {
    codeDta: string,
    begin: string,
    end: string,
    timeInterval: TimeInterval,
    sites?: number | number[]
}

export default class SetDataService {
    private readonly uid: string
    private readonly cache = new Map<string, Promise<unknown[]>>()

    constructor({ uid }: Pick<DataSourceConfig, 'uid'>) {
        this.uid = uid
    }

    getData<T = SiteData>({ codeDta, begin, end, timeInterval, sites }: ArchiveQuery): Promise<T[]> {
        const url = this.getUrl({ codeDta, begin, end, timeInterval, sites })
        const key = url.toString()

        const cached = this.cache.get(key)
        if (cached) return cached as Promise<T[]>

        const promise = fetch(key)
            .then(res => res.json())
            .then(res => (res.data ?? []) as T[])
            .catch(error => {
                this.cache.delete(key)
                throw error
            })

        this.setCache(key, promise)

        return promise
    }

    clearCache() {
        this.cache.clear()
    }

    private setCache(key: string, promise: Promise<unknown[]>) {
        if (this.cache.size >= CACHE_LIMIT) {
            const oldest = this.cache.keys().next().value
            if (oldest) this.cache.delete(oldest)
        }

        this.cache.set(key, promise)
    }

    private getUrl({ codeDta, begin, end, timeInterval, sites }: ArchiveQuery): URL {
        const url = new URL(`${codeDta}/data/archive`, BASE_URL)

        const options: Record<string, string | number | number[] | undefined> = {
            'time_begin': `${formateDate(begin)} 00:00:00`,
            'time_end': `${formateDate(end)} 23:59:00`,
            'uid': this.uid,
            'time_interval': timeInterval,
            'sites': sites
        }

        for (const option in options) {
            const value = options[option]
            if (!value) continue
            url.searchParams.set(option, String(value))
        }

        return url
    }
}
