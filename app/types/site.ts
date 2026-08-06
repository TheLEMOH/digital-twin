import type SiteData from "./siteData"

export default interface Site {
    id: number,
    name: string,
    timing: string,
    code: string,
    dtaCode: string,
    codeDta: string,
    data?: SiteData[],
    start?: string,
    end?: string,
    geom_x: number,
    geom_y: number,
    geom_alt: number
}