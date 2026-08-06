import { CalendarDate, } from '@internationalized/date'
export default function getDiff(b: CalendarDate, e: CalendarDate): number {
    const begin = b.toString()
    const end = e.toString()

    const diff = new Date(end).getTime() - new Date(begin).getTime();
    return Math.round(diff / (1000 * 3600 * 24));
}