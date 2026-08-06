import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import type { LocationQuery } from 'vue-router'

const getDateFromQuery = (query: LocationQuery) => {
    const { start, end } = query

    const startDateParse = `${start}`.split('-')
    const endDateParse = `${end}`.split('-')

    let startCalendarDate = null
    let endCalendarDate = null

    if (startDateParse[0] && startDateParse[1] && startDateParse[2])
        startCalendarDate = new CalendarDate(+startDateParse[0], +startDateParse[1], +startDateParse[2])
    else startCalendarDate = today(getLocalTimeZone())

    if (endDateParse[0] && endDateParse[1] && endDateParse[2])
        endCalendarDate = new CalendarDate(+endDateParse[0], +endDateParse[1], +endDateParse[2])
    else endCalendarDate = today(getLocalTimeZone())

    return { startCalendarDate, endCalendarDate }
}

export default function useDates() {

    const route = useRoute()

    const query = route.query

    const { startCalendarDate, endCalendarDate } = getDateFromQuery(query)

    const selectedDate = shallowRef<string>(`${today(getLocalTimeZone()).toString()} 00:00:00`)
    const selectedDates = shallowRef<{ start: CalendarDate, end: CalendarDate }>({
        start: startCalendarDate,
        end: endCalendarDate
    })

    return {
        selectedDate,
        selectedDates,
    }
}