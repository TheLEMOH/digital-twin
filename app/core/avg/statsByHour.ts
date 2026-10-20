import type Indicator from "~/types/indicator"
import type SiteData from "~/types/siteData"
import type { HourStat } from "~/types/timeline"
import groupByHour from "../group/groupByHour"

export const statsByHour = (setData: SiteData[], indicators: Indicator[]) => {
    const grouped = groupByHour(setData)

    const res: Record<string, Record<string, HourStat>> = {}

    indicators.forEach(indicator => {
        const code = indicator.code

        for (const hourKey in grouped) {
            const hour = grouped[hourKey]!.filter(g => g[code] !== undefined && g[code] !== null)

            if (!hour.length) continue

            let sum = 0
            let min = Infinity
            let max = -Infinity

            hour.forEach(g => {
                const raw = g[code]!
                const v = typeof raw === 'string' ? parseFloat(raw.replace(',', '.')) : +raw
                if (isNaN(v)) return

                sum += v
                if (v < min) {
                    min = v
                }
                if (v > max) {
                    max = v
                }
            })

            if (!res[hourKey]) res[hourKey] = {}

            res[hourKey][code] = {
                avg: sum / hour.length,
                min,
                max,
                count: hour.length
            }
        }
    })

    return res
}
