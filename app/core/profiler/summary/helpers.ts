export function toNumber(value: unknown): number | null {
    if (typeof value === 'number') {
        return Number.isFinite(value) ? value : null
    }

    if (typeof value === 'string') {
        const parsed = Number.parseFloat(value.trim().replace(',', '.'))
        return Number.isFinite(parsed) ? parsed : null
    }

    return null
}

export function average(values: number[]): number | null {
    if (!values.length) return null
    return values.reduce((sum, value) => sum + value, 0) / values.length
}

export function shiftDate(date: string, days: number): string {
    const value = new Date(`${date}T00:00:00Z`)
    value.setUTCDate(value.getUTCDate() + days)
    return value.toISOString().slice(0, 10)
}

export function parseTime(value: string): number {
    const normalized = value.includes('T') ? value : value.replace(' ', 'T')
    const iso = normalized.length <= 19 ? `${normalized}Z` : normalized
    return new Date(iso).getTime()
}

export function monthOf(date: string): number {
    return Number.parseInt(date.slice(5, 7), 10) || 1
}

export function isWarm(date: string): boolean {
    const month = monthOf(date)
    return month >= 4 && month <= 10
}
