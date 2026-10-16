import type SetDataService from "./setDataService"
import type SetService from "./setService"
import type Site from "~/types/site"
import type SiteData from "~/types/siteData"
import type { DataByDtaQuery, DataBySiteQuery, DataBySitesQuery, DataQuery, DataSourceConfig, DateLike, Sets, SiteDataBySite, TimeInterval } from "~/types/dataSource"
import { getTimeInterval, toDateString } from "../time/dateRange"

interface ArchiveRequest {
    codeDta: string,
    begin: DateLike,
    end: DateLike,
    sites?: number | number[],
    timeInterval?: TimeInterval
}

export default class DataService {
    private readonly config: DataSourceConfig
    private readonly setService: SetService
    private readonly setDataService: SetDataService
    private sitesById: Map<number, Site> | null = null

    constructor({ config, setService, setDataService }: { config: DataSourceConfig, setService: SetService, setDataService: SetDataService }) {
        this.config = config
        this.setService = setService
        this.setDataService = setDataService
    }

    getDta(): Promise<Sets> {
        return this.setService.getSets()
    }

    async getData<T = SiteData>({ begin, end, sites, timeInterval }: DataQuery): Promise<T[]> {
        const requests = await Promise.all(
            this.config.dta.map(codeDta => this.getArchive<T>({ codeDta, begin, end, sites, timeInterval }))
        )

        return requests.flat()
    }

    async getDataByDta<T = SiteData>({ begin, end, codeDta, sites, timeInterval }: DataByDtaQuery): Promise<T[]> {
        const code = codeDta ?? await this.getCodeDta()

        return this.getArchive<T>({ codeDta: this.requireCode(code, 'getDataByDta'), begin, end, sites, timeInterval })
    }

    async getDataBySite<T = SiteData>({ begin, end, siteId, timeInterval }: DataBySiteQuery): Promise<T[]> {
        const id = siteId ?? this.config.siteId
        const code = id === undefined ? undefined : await this.getCodeDta(id)

        return this.getArchive<T>({ codeDta: this.requireCode(code, 'getDataBySite'), begin, end, sites: id, timeInterval })
    }

    async getDataBySites({ begin, end, sites, timeInterval }: DataBySitesQuery): Promise<SiteDataBySite[]> {
        if (!sites.length) return []

        const results = await Promise.all(sites.map(async site => {
            const code = site.codeDta || await this.getCodeDta(site.id)
            if (!code) return null

            const data = await this.getArchive({ codeDta: code, begin, end, sites: site.id, timeInterval })

            return { site, data }
        }))

        return results.filter((item): item is SiteDataBySite => item !== null)
    }

    clearCache() {
        this.setDataService.clearCache()
        this.sitesById = null
    }

    private getArchive<T = SiteData>({ codeDta, begin, end, sites, timeInterval }: ArchiveRequest): Promise<T[]> {
        return this.setDataService.getData({
            codeDta,
            begin: toDateString(begin),
            end: toDateString(end),
            timeInterval: timeInterval ?? getTimeInterval(begin, end),
            sites
        })
    }

    private async getCodeDta(siteId?: number): Promise<string | undefined> {
        const codes = this.config.dta
        if (codes.length === 1) return codes[0]
        if (siteId === undefined) return undefined

        const sites = await this.getSitesById()

        return sites.get(siteId)?.codeDta
    }

    private async getSitesById(): Promise<Map<number, Site>> {
        if (!this.sitesById) {
            const { sites } = await this.getDta()
            this.sitesById = new Map(sites.map(site => [site.id, site]))
        }

        return this.sitesById
    }

    private requireCode(code: string | undefined, method: string): string {
        if (!code) throw new Error(`DataService.${method}: dta code is not resolved`)

        return code
    }
}
