import type { SeriesOption } from "echarts";

export interface DataItem {
    time: string;
    site: number;
    'm-t': number;
    t_h1000: number;
    t_h0950: number;
    t_h0900: number;
    t_h0850: number;
    t_h0800: number;
    t_h0750: number;
    t_h0700: number;
    t_h0650: number;
    t_h0600: number;
    t_h0550: number;
    t_h0500: number;
    t_h0450: number;
    t_h0400: number;
    t_h0350: number;
    t_h0300: number;
    t_h0250: number;
    t_h0200: number;
    t_h0150: number;
    t_h0100: number;
    t_h0075: number;
    t_h0050: number;
    t_h0025: number;
    t_h0000: number;
}

type DepthKey = Exclude<keyof DataItem, 'time' | 'site' | 'm-t'>;

interface InversionPoint {
    name: string;
    coord: [number, number];
    value: string;
    label: { color: string; fontWeight: number };
}

const heightMap: Record<DepthKey, number> = {
    "t_h1000": 1000,
    "t_h0950": 950,
    "t_h0900": 900,
    "t_h0850": 850,
    "t_h0800": 800,
    "t_h0750": 750,
    "t_h0700": 700,
    "t_h0650": 650,
    "t_h0600": 600,
    "t_h0550": 550,
    "t_h0500": 500,
    "t_h0450": 450,
    "t_h0400": 400,
    "t_h0350": 350,
    "t_h0300": 300,
    "t_h0250": 250,
    "t_h0200": 200,
    "t_h0150": 150,
    "t_h0100": 100,
    "t_h0075": 75,
    "t_h0050": 50,
    "t_h0025": 25,
    "t_h0000": 0
};

const depthKeys = Object.keys(heightMap) as DepthKey[];
const sortedDepthKeys = depthKeys.slice().sort((a, b) => heightMap[a] - heightMap[b]);

export function createProfilerChart(data: DataItem[]): SeriesOption[] {
    return depthKeys.map(key => ({
        name: heightMap[key] + ' м',
        type: 'line',
        data: data.map((item): [string, number] => [item.time, item[key]]),
        symbolSize: 3
    }));
}

export function createInversionChart(data: DataItem[]): SeriesOption[] {
    const heatmapData: [string, number, number | null][] = [];
    const lineData: [string, number | null][] = [];

    data.forEach(item => {
        const timeMs = item.time;
        let sum = 0;
        for (let i = 1; i < sortedDepthKeys.length; i++) {
            const curKey = sortedDepthKeys[i]!;
            const prevKey = sortedDepthKeys[i - 1]!;
            const height = heightMap[curKey];
            const delta = item[curKey] - item[prevKey];
            heatmapData.push([timeMs, height, delta > 0 ? +delta.toFixed(3) : null]);
            if (delta > 0) {
                sum += delta;
            }
        }
        lineData.push([timeMs, sum > 0 ? +sum.toFixed(3) : null]);
    });

    return [
        {
            type: 'heatmap',
            data: heatmapData,
        },
        {
            name: 'Сумма инверсии',
            type: 'line',
            yAxisIndex: 1,
            symbolSize: 4,
            lineStyle: { width: 2, color: '#d33' },
            itemStyle: { color: '#d33' },
            data: lineData,
        },
    ];
}

export function createVerticalProfileChart(item: DataItem): SeriesOption {
    const data: [number, number][] = sortedDepthKeys.map(key => [item[key], heightMap[key]]);

    const inversionPoints: InversionPoint[] = [];

    for (let i = 1; i < sortedDepthKeys.length; i++) {
        const curKey = sortedDepthKeys[i]!;
        const prevKey = sortedDepthKeys[i - 1]!;
        const delta = item[curKey] - item[prevKey];
        if (delta > 0) {
            const midHeight = (heightMap[prevKey] + heightMap[curKey]) / 2;
            const midTemp = (item[prevKey] + item[curKey]) / 2;
            inversionPoints.push({
                name: `инверсия ${midHeight}м`,
                coord: [midTemp, midHeight],
                value: `${delta.toFixed(2)}°C`,
                label: { color: delta < 0.5 ? '#2d7dd2' : '#d33', fontWeight: 600 },
            });
        }
    }

    return {
        type: 'line',
        data,
        symbolSize: 4,
        lineStyle: { type: 'solid' },
        markPoint: {
            symbol: 'circle',
            symbolSize: 1,
            label: {
                show: true,
                formatter: '{c}',
                fontSize: 10,
                color: '#d33',
                position: 'right',
                distance: 10,
                backgroundColor: 'transparent',
                borderWidth: 0,
                shadowBlur: 0,
            },
            itemStyle: { color: 'rgba(255, 82, 82, 0)' },
            data: inversionPoints,
        },
    };
}
