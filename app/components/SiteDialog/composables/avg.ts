import type { ChartPoint } from "./chart";

interface Bucket {
    sum: number;
    count: number;
}

export default function calculateHourlyAverage(series: ChartPoint[][]): ChartPoint[] {
    const buckets = new Map<string, Bucket>();

    for (const points of series) {
        for (const point of points) {
            if (!point) continue;

            const [time, value] = point;
            if (value === null) continue;

            const bucket = buckets.get(time) ?? { sum: 0, count: 0 };

            bucket.sum += value;
            bucket.count += 1;
            buckets.set(time, bucket);
        }
    }

    return [...buckets.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([time, { sum, count }]) => [time, Math.round((sum / count) * 1000) / 1000]);
}
