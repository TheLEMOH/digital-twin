import type { ChartPoint } from "./chart";

type Mode = "hourly" | "daily";

interface NormalizedEntry {
    key: string;
    date: Date;
    value: number | null;
}

interface DateRange {
    values: Map<string, number | null>;
    min: Date;
    max: Date;
}

const pad = (value: number) => String(value).padStart(2, "0");

function normalize(entry: ChartPoint, mode: Mode): NormalizedEntry | null {
    if (!entry) return null;

    const [dateTime, value] = entry;
    const [datePart, timePart] = dateTime.split(" ");
    if (!datePart || !timePart) return null;

    const [year, month, day] = datePart.split("-").map(Number);
    if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) return null;

    const hour = mode === "hourly" ? Number(timePart.split(":")[0]) : 0;
    if (mode === "hourly" && Number.isNaN(hour)) return null;

    const date = mode === "hourly"
        ? new Date(year, month - 1, day, hour)
        : new Date(year, month - 1, day);
    if (Number.isNaN(date.getTime())) return null;

    const dayKey = `${year}-${pad(month)}-${pad(day)}`;

    return {
        key: mode === "hourly" ? `${dayKey}|${date.getHours()}` : dayKey,
        date,
        value,
    };
}

function startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function format(date: Date, mode: Mode): string {
    const dayKey = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

    return mode === "daily" ? `${dayKey} 00:00:00` : `${dayKey} ${pad(date.getHours())}:00:00`;
}

function buildRange(data: ChartPoint[], mode: Mode, startDate?: string, endDate?: string): DateRange | null {
    const values = new Map<string, number | null>();
    let min = startDate ? new Date(startDate) : null;
    let max = endDate ? new Date(endDate) : null;

    for (const entry of data) {
        const normalized = normalize(entry, mode);
        if (!normalized) continue;

        values.set(normalized.key, normalized.value);

        if (!startDate || !endDate) {
            const day = startOfDay(normalized.date);

            if (!min || day.getTime() < min.getTime()) min = day;
            if (!max || day.getTime() > max.getTime()) max = day;
        }
    }

    if (!min || !max) return null;

    min.setHours(0, 0, 0, 0);
    max.setHours(0, 0, 0, 0);

    return { values, min, max };
}

function generateHourly({ values, min, max }: DateRange): ChartPoint[] {
    const result: ChartPoint[] = [];
    const current = new Date(min);

    while (current.getTime() <= max.getTime()) {
        const dayKey = `${current.getFullYear()}-${pad(current.getMonth() + 1)}-${pad(current.getDate())}`;

        for (let hour = 0; hour <= 23; hour++) {
            const date = new Date(current.getFullYear(), current.getMonth(), current.getDate(), hour);

            result.push([format(date, "hourly"), values.get(`${dayKey}|${hour}`) ?? null]);
        }

        current.setDate(current.getDate() + 1);
    }

    return result;
}

function generateDaily({ values, min, max }: DateRange): ChartPoint[] {
    const result: ChartPoint[] = [];
    const current = new Date(min);

    while (current.getTime() <= max.getTime()) {
        const key = `${current.getFullYear()}-${pad(current.getMonth() + 1)}-${pad(current.getDate())}`;

        result.push([format(current, "daily"), values.get(key) ?? null]);
        current.setDate(current.getDate() + 1);
    }

    return result;
}

function detectMode(data: ChartPoint[]): Mode {
    const days = new Set<string>();

    for (const entry of data) {
        if (!entry) continue;

        days.add(entry[0].split(" ")[0]);
    }

    return days.size <= 5 ? "hourly" : "daily";
}

export default function fillMissingData(data: ChartPoint[], startDate?: string, endDate?: string): ChartPoint[] {
    if (!Array.isArray(data) || data.length === 0) return [];

    const mode = detectMode(data);
    const range = buildRange(data, mode, startDate, endDate);
    if (!range) return [];

    return mode === "hourly"
        ? generateHourly(range)
        : generateDaily(range);
}
