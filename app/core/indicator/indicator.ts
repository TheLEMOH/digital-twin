import type Dta from "~/types/dta";
import type Indicator from "~/types/indicator";

export default function createIndicators(dtas: Dta[]): Indicator[] {
    const indicators: Indicator[] = dtas.flatMap(dta => dta.indicators)
    const uniq = indicators.filter((obj, index, self) => index === self.findIndex((o) => o.id === obj.id));
    return uniq
}