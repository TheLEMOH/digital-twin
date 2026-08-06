import type SiteData from "~/types/siteData"

export default function existData(data: SiteData[], indicator: string): string[] {
    const filtered = data.filter(d => d[indicator] !== undefined)
    const times = filtered.map(f => f.time as string)
    const uniq = Array.from(new Set(times))
    return uniq
}
