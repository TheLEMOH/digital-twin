import type { DateLike, TimeInterval } from "~/types/dataSource"

const DAY = 1000 * 3600 * 24
const HOUR_LIMIT = 5

export function toDateString(date: DateLike): string {
    return typeof date === 'string' ? date : date.toString()
}

export function getDays(begin: DateLike, end: DateLike): number {
    const diff = new Date(toDateString(end)).getTime() - new Date(toDateString(begin)).getTime()
    return Math.round(diff / DAY)
}

export function getTimeInterval(begin: DateLike, end: DateLike): TimeInterval {
    return getDays(begin, end) < HOUR_LIMIT ? 'hour' : 'day'
}
