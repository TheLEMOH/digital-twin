import type { SeriesOption } from "echarts";
import type Indicator from "~/types/indicator";
import type Site from "~/types/site";
import lineColor from "~/core/color/lineColor.json"
import calculateHourlyAverage from "./avg";
import fillMissingData from "./empty";

interface Props {
    siteData: Site[],
    indicator: Indicator,
    indexY: number,
    code: string,
}

export interface ChartStrategy {
    createChart(options: Props): SeriesOption[]
}

export class DefaultStrategy implements ChartStrategy {
    createChart({ siteData, indicator, indexY, code }: Props): SeriesOption[] {
        return siteData.map((site) => {
            const data = site.data?.map(d => d[code || 0] ? [d.time, d[code || 0] || null] : null, { groupId: indicator?.name })
            const color = indicator?.code ? lineColor[indicator.code as keyof typeof lineColor] : '#000000';

            return {
                data: data || [],
                type: 'line',
                name: `${site.name}. ${indicator?.name}`,
                showSymbol: true,
                yAxisIndex: indexY,
                symbolSize: 2,
                itemStyle: { color }
            }
        })
    }
}

export class AvgStrategy implements ChartStrategy {
    createChart({ siteData, indicator, indexY, code }: Props): SeriesOption[] {
        const series = siteData.map((site) => {
            const data = site.data?.map(d => [d.time, d[code || 0] || null])
            return data
        })

        const avg = calculateHourlyAverage(series)
        const color = indicator?.code ? lineColor[indicator.code as keyof typeof lineColor] : '#000000';

        return [{
            data: avg || [],
            type: 'line',
            name: `${indicator?.name}`,
            showSymbol: true,
            yAxisIndex: indexY,
            symbolSize: 2,

            itemStyle: { color }
        }]
    }
}

export class YearStrategy implements ChartStrategy {
    createChart({ siteData, indicator, indexY, code }: Props): SeriesOption[] {
        return siteData.map((site, indexX) => {
            const data = site.data?.map(d => d[code || 0] ? [d.time, d[code || 0] || null] : null, { groupId: indicator?.name })
            const { start: startDate, end: endDate } = site
            const color = indicator?.code ? lineColor[indicator.code as keyof typeof lineColor] : '#000000';

            const fillData = fillMissingData(data, startDate, endDate)

            return {
                data: fillData || [],
                type: 'line',
                name: `${site.name}. ${indicator?.name}`,
                showSymbol: true,
                yAxisIndex: indexY,
                xAxisIndex: indexX,
                symbolSize: 2,
                itemStyle: { color }
            }
        })
    }
}

const defaultStrategy = new DefaultStrategy()
const avgStrategy = new AvgStrategy()
const yearStrategy = new YearStrategy()

interface Strategies {
    [key: string]: ChartStrategy
    default: ChartStrategy,
    avg: ChartStrategy,
    year: ChartStrategy,
}

export const chartStrategies: Strategies = { default: defaultStrategy, avg: avgStrategy, year: yearStrategy }
