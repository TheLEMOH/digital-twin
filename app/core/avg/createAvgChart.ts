import type { SeriesOption } from 'echarts';

export function createAvgChart(
    avgByDate: Record<string, Record<string, number>> | undefined,
    code: string,
    name?: string,
): SeriesOption[] {
    if (!avgByDate) return []

    const data: [string, number][] = Object.entries(avgByDate)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([time, values]) => [time, values[code]])
        .filter(([, value]) => typeof value === 'number') as [string, number][];

    return [{
        name: name || code,
        type: 'line',
        data,
        symbolSize: 3,
    }];
}