import createIndicators from "../indicator/indicator"
import type Dta from "~/types/dta"
import type { DataSourceConfig, Sets } from "~/types/dataSource"

const BASE_URL = "https://sensor.krasn.ru/hub/api/3.0/sets/"

const setsCache = new Map<string, Promise<Dta>>()

function requestSet(code: string, uid: string): Promise<Dta> {
    const key = `${uid}:${code}`

    const cached = setsCache.get(key)
    if (cached) return cached

    const promise = fetch(`${BASE_URL}${code}?uid=${uid}`)
        .then(res => res.json())
        .then(res => res.data as Dta)
        .catch(error => {
            setsCache.delete(key)
            throw error
        })

    setsCache.set(key, promise)

    return promise
}

export default class SetService {
    private readonly codes: string[]
    private readonly uid: string
    private cache: Promise<Sets> | null = null

    constructor({ dta, uid }: Pick<DataSourceConfig, 'dta' | 'uid'>) {
        this.codes = dta
        this.uid = uid
    }

    getSets(): Promise<Sets> {
        if (!this.cache) {
            this.cache = this.requestSets().catch(error => {
                this.cache = null
                throw error
            })
        }

        return this.cache
    }

    private async requestSets(): Promise<Sets> {
        const dta: Dta[] = await Promise.all(this.codes.map(code => requestSet(code, this.uid)))

        dta.forEach(set => {
            set.sites.forEach(site => {
                site.codeDta = set.code
            })
        })

        const sites = dta.flatMap(set => set.sites)
        const indicators = createIndicators(dta)

        return { dta, sites, indicators }
    }
}
