import type Dta from "~/types/dta";
import type Indicator from "~/types/indicator";

export default function createIndicators(dtas: Dta[]): Indicator[] {
    const indicators: Indicator[] = dtas.flatMap(dta => dta.indicators)
    const uniq = indicators.filter((obj, index, self) => index === self.findIndex((o) => o.id === obj.id));
    return uniq
}

export function createIndicatorNames(indicators: Indicator[]): Record<string, string> {
    const map: Record<string, string> = {}

    indicators.forEach(indicator => {
        const code = indicator.code
        if (!code || !indicator.name) return
        map[code] = indicator.units ? `${indicator.name} (${indicator.units})` : indicator.name
    })

    return map
}