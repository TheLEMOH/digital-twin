import type Site from "~/types/site";
import type SiteData from "~/types/siteData";

export function siteFilter(sites: Site[], selectedGroup: [string]) {
    return sites.filter(site => selectedGroup.includes(site.code.charAt(0)))
}

export function siteDataFilter(data: SiteData[], sites: Site[]) {
    const ids = sites.map(site => site.id)
    return data.filter(d => ids.includes(d.site))
}