import type { SeriesOption } from "echarts";
import type Indicator from "~/types/indicator";
import type Site from "~/types/site";
import type SiteData from "~/types/siteData";
import lineColor from "~/core/color/lineColor.json";
import calculateHourlyAverage from "./avg";
import fillMissingData from "./empty";

export type ChartPoint = [string, number | null] | null;

const LINE_COLORS = lineColor as Record<string, string>;

interface Props {
    siteData: Site[];
    indicator: Indicator;
    indexY: number;
    code: string;
}

export interface ChartStrategy {
    createChart(options: Props): SeriesOption[];
}

function lineColorFor(code: string): string {
    return LINE_COLORS[code] ?? "#000000";
}

export function toChartPoints(data: SiteData[] | undefined, code: string): ChartPoint[] {
    return (data ?? []).map(entry => {
        const value = entry[code];

        if (value === undefined || value === null) return null;

        const numeric = Number(value);

        return Number.isFinite(numeric) ? [entry.time, numeric] : null;
    });
}

interface LineOptions {
    name: string;
    data: ChartPoint[];
    code: string;
    yAxisIndex: number;
    xAxisIndex?: number;
}

function createLine({ name, data, code, yAxisIndex, xAxisIndex }: LineOptions): SeriesOption {
    return {
        data,
        type: "line",
        name,
        showSymbol: true,
        symbolSize: 2,
        yAxisIndex,
        ...(xAxisIndex === undefined ? {} : { xAxisIndex }),
        itemStyle: { color: lineColorFor(code) },
    };
}

export class DefaultStrategy implements ChartStrategy {
    createChart({ siteData, indicator, indexY, code }: Props): SeriesOption[] {
        return siteData.map(site => createLine({
            name: `${site.name}. ${indicator.name}`,
            data: toChartPoints(site.data, code),
            code,
            yAxisIndex: indexY,
        }));
    }
}

export class AvgStrategy implements ChartStrategy {
    createChart({ siteData, indicator, indexY, code }: Props): SeriesOption[] {
        const pointsPerSite = siteData.map(site => toChartPoints(site.data, code));
        return [createLine({
            name: indicator.name ?? "",
            data: calculateHourlyAverage(pointsPerSite),
            code,
            yAxisIndex: indexY,
        })];
    }
}

export class YearStrategy implements ChartStrategy {
    createChart({ siteData, indicator, indexY, code }: Props): SeriesOption[] {
        return siteData.map((site, indexX) => createLine({
            name: `${site.name}. ${indicator.name}`,
            data: fillMissingData(toChartPoints(site.data, code), site.start, site.end),
            code,
            yAxisIndex: indexY,
            xAxisIndex: indexX,
        }));
    }
}

interface Strategies {
    [key: string]: ChartStrategy;
    default: ChartStrategy;
    avg: ChartStrategy;
    year: ChartStrategy;
}

export const chartStrategies: Strategies = {
    default: new DefaultStrategy(),
    avg: new AvgStrategy(),
    year: new YearStrategy(),
};
