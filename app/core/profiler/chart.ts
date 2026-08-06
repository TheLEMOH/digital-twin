import type { SeriesOption } from "echarts";

interface DataItem {
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


const heightMap: Record<string, number> = {
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

export function createProfilerChart(data: DataItem[]): SeriesOption[] {
    const keys = Object.keys(heightMap);
    return keys.map(key => ({
        name: heightMap[key] + ' м',
        type: 'line',
        data: data.map((item: any) => [item.time, item[key]]),
        symbolSize: 3
    }));
}

export function createInversionChart(data: DataItem[]): SeriesOption {
    const sortedKeys = Object.keys(heightMap).sort((a, b) => heightMap[a]! - heightMap[b]!);
    const heatmapData: [string, number, number | null][] = [];

    data.forEach(item => {
        const timeMs = item.time;
        for (let i = 1; i < sortedKeys.length; i++) {
            const curKey = sortedKeys[i];
            const prevKey = sortedKeys[i - 1];
            const height = heightMap[curKey];
            const delta = item[curKey] - item[prevKey];
            heatmapData.push([timeMs, height, delta > 0 ? +delta.toFixed(3) : null]);
        }
    });

    return {
        type: 'heatmap',
        data: heatmapData,
    };
}
