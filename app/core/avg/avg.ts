import type Indicator from "~/types/indicator"
import type SiteData from "~/types/siteData"
import groupByHour from "../group/groupByHour"

export const avg = (setData: SiteData[], indicators: Indicator[]) => {
    const grouped = groupByHour(setData)

    const res: any = {}

    indicators.forEach(indicator => {
        const code = indicator.code

        for (let i in grouped) {
            const day = grouped[i]!.filter(g => g[code] !== undefined && g[code] !== null)

            if (!day.length) continue

            if (!res[i])
                res[i] = {}

            const sum = day.reduce((acc, value) => {
                const v = value[code]!
                return acc + +v;
            }, 0);

            res[i][code] = sum / day.length
        }
    })

    return res
}