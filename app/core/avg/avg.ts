import type Indicator from "~/types/indicator"
import type SiteData from "~/types/siteData"
import groupByHour from "../group/groupByHour"

export const avg = (setData: SiteData[], indicators: Indicator[]) => {
    const grouped = groupByHour(setData)

    const res: any = {}

    indicators.forEach(indicator => {
        const code = indicator.code

        let avg = 0

        for (let i in grouped) {
            if (!res[i])
                res[i] = {}

            const day = grouped[i]!.filter(g => g[code])

            const sum = day.reduce((acc, value) => {
                const v = value[code]!
                return acc + +v;
            }, 0);

            avg = sum / day.length

            if (avg)
                res[i][code] = avg
        }
    })

    return res
}