import type { MeteoStat } from "~/types/calculation";
import type Indicator from "~/types/indicator";
import type SiteData from "~/types/siteData";

type StatsResult = Record<string, MeteoStat>;

export function avgByPeriod(data: SiteData[], indicators: Indicator[]) {
    if (!Array.isArray(data) || data.length === 0 || !Array.isArray(indicators) || indicators.length === 0) {
        return {};
    }

    const codes = indicators.map(ind => ind.code);

    // Инициализация с использованием Map для избежания undefined
    const sums = new Map<string, number>();
    const counts = new Map<string, number>();
    const mins = new Map<string, number>();
    const maxs = new Map<string, number>();

    codes.forEach(code => {
        sums.set(code, 0);
        counts.set(code, 0);
        mins.set(code, Infinity);
        maxs.set(code, -Infinity);
    });

    for (const record of data) {
        for (const code of codes) {
            const rawValue = record[code];
            let numericValue: number | null = null;

            if (rawValue === null || rawValue === undefined) {
                continue;
            }
            if (typeof rawValue === 'number') {
                numericValue = rawValue;
            } else if (typeof rawValue === 'string') {
                const cleaned = rawValue.trim().replace(',', '.');
                const parsed = parseFloat(cleaned);
                if (!isNaN(parsed)) {
                    numericValue = parsed;
                }
            }

            if (numericValue !== null) {
                // Используем !, так как мы точно знаем, что ключ есть
                sums.set(code, (sums.get(code) || 0) + numericValue);
                counts.set(code, (counts.get(code) || 0) + 1);
                if (numericValue < (mins.get(code) || Infinity)) {
                    mins.set(code, numericValue);
                }
                if (numericValue > (maxs.get(code) || -Infinity)) {
                    maxs.set(code, numericValue);
                }
            }
        }
    }

    const result: StatsResult = {};
    codes.forEach(code => {
        const count = counts.get(code) || 0;
        if (count > 0) {
            result[code] = {
                avg: +((sums.get(code) || 0) / count).toFixed(2),
                min: +(mins.get(code) || 0).toFixed(2),
                max: +(maxs.get(code) || 0).toFixed(2)
            };
        } else {
            result[code] = {
                avg: null,
                min: null,
                max: null
            };
        }
    });

    return result;
}