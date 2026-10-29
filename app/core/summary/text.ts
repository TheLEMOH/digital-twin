import { CALM_WIND_SPEED, PM25_DAILY_LIMIT, PM25_HOURLY_LIMIT } from './constants'
import { directionName, summarizeDays } from './aggregate'
import { summarizeProfiles } from './inversion'
import type { DailySummary, HalfSummary, IntervalSummaryData, InversionStats, InversionSummary, Observation } from './types'

const MONTHS_GENITIVE = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
]

const MONTHS_SHORT = [
    'янв',
    'фев',
    'мар',
    'апр',
    'мая',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
]

function plural(value: number, one: string, few: string, many: string): string {
    const mod10 = value % 10
    const mod100 = value % 100

    if (mod10 === 1 && mod100 !== 11) return one
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few
    return many
}

function number(value: number, digits = 1): string {
    const formatted = value.toFixed(digits).replace('.', ',')
    return formatted.startsWith('-') ? `−${formatted.slice(1)}` : formatted
}

function percent(value: number): string {
    return `${Math.round(value * 100)}%`
}

function parseDate(value: string): [number, number, number] {
    const [year, month, day] = value.split('-').map(Number)
    return [year ?? 0, month ?? 1, day ?? 1]
}

function formatDateRange(begin: string, end: string): string {
    const [yearFrom, monthFrom, dayFrom] = parseDate(begin)
    const [yearTo, monthTo, dayTo] = parseDate(end)

    if (yearFrom === yearTo && monthFrom === monthTo && dayFrom === dayTo) {
        return `${dayFrom} ${MONTHS_GENITIVE[monthFrom - 1]} ${yearFrom}`
    }

    if (yearFrom === yearTo && monthFrom === monthTo) {
        return `${dayFrom}–${dayTo} ${MONTHS_GENITIVE[monthFrom - 1]} ${yearFrom}`
    }

    return `${dayFrom} ${MONTHS_GENITIVE[monthFrom - 1]} ${yearFrom} — ${dayTo} ${MONTHS_GENITIVE[monthTo - 1]} ${yearTo}`
}

function formatDay(value: string): string {
    const [, month, day] = parseDate(value)
    return `${day} ${MONTHS_SHORT[month - 1]}`
}

function formatTime(value: string): string {
    return value.slice(11, 16)
}

function formatDayRange(days: DailySummary[]): string {
    const first = days[0]
    const last = days[days.length - 1]

    if (!first || !last) return ''

    const [yearFrom, monthFrom, dayFrom] = parseDate(first.date)
    const [yearTo, monthTo, dayTo] = parseDate(last.date)

    if (yearFrom === yearTo && monthFrom === monthTo && dayFrom === dayTo) {
        return formatDay(first.date)
    }

    if (yearFrom === yearTo && monthFrom === monthTo) {
        return `${dayFrom}–${dayTo} ${MONTHS_SHORT[monthFrom - 1]}`
    }

    if (yearFrom === yearTo) {
        return `${formatDay(first.date)}–${formatDay(last.date)}`
    }

    return `${formatDay(first.date)} ${yearFrom} — ${formatDay(last.date)} ${yearTo}`
}

function formatObservation(observation: Observation): string {
    const date = observation.time.slice(0, 10)
    const site = observation.siteName ? `, ${observation.siteName}` : ''
    return `${formatDay(date)} ${formatTime(observation.time)}${site}`
}

function hasData(summary: HalfSummary): boolean {
    return Boolean(summary.pm || summary.temp || summary.wind)
}

function renderDay(day: DailySummary): string {
    const parts: string[] = []

    if (day.pm) {
        const dailyExceeded = day.pm.avg > PM25_DAILY_LIMIT
        const hourlyExceeded = Boolean(day.pmMax && day.pmMax.value > PM25_HOURLY_LIMIT)
        const prefix = dailyExceeded && hourlyExceeded
            ? 'превышение ПДКсс и ПДКмр: '
            : dailyExceeded
                ? 'превышение ПДКсс: '
                : hourlyExceeded
                    ? 'разовое превышение ПДКмр: '
                    : ''
        let value = `${prefix}PM2.5 ${number(day.pm.avg)} мкг/м³`

        if (day.pmMax && day.pmMax.value > day.pm.avg + 0.05) {
            const site = day.pmMax.siteName ? `, ${day.pmMax.siteName}` : ''
            value += ` (макс. ${number(day.pmMax.value)} в ${formatTime(day.pmMax.time)}${site})`
        }

        parts.push(value)
    } else {
        parts.push('PM2.5 нет данных')
    }

    if (day.temp) parts.push(`t ${number(day.temp.avg)} °C`)
    if (day.wind) {
        const direction = day.direction ? `, ${day.direction}` : ''
        parts.push(`ветер ${number(day.wind.avg)} м/с${direction}`)
    }

    return `${formatDay(day.date)}: ${parts.join(' · ')}`
}

function renderHalf(summary: HalfSummary): string {
    const parts: string[] = []

    if (summary.pm) parts.push(`PM2.5 ${number(summary.pm.avg)} мкг/м³`)
    if (summary.temp) parts.push(`t ${number(summary.temp.avg)} °C`)

    if (summary.wind) {
        let wind = `ветер ${number(summary.wind.avg)} м/с`

        if (summary.calmShare !== null) {
            wind += `, штиль ${percent(summary.calmShare)} времени`
        }

        parts.push(wind)
    }

    return parts.join('; ')
}

function renderInversionPeriod(inversion: InversionSummary): string[] {
    if (inversion.surfaceAvgIntensity === null || inversion.surfaceAvgIntensity <= 1) {
        return []
    }

    const lines = [
        'Температурные инверсии (профилемер):',
        `в приземном слое (до 150 м): в среднем ${number(inversion.surfaceAvgIntensity)} °C.`,
    ]

    if (inversion.fullAvgIntensity !== null) {
        lines.push(`по всему профилю (до 1000 м): в среднем ${number(inversion.fullAvgIntensity)} °C.`)
    }

    return lines
}

function renderInversionHalf(inversion: InversionStats): string {
    if (!inversion.total) return ''

    const surface = inversion.surfaceAvgIntensity !== null
        ? `${number(inversion.surfaceAvgIntensity)} °C`
        : 'не отмечалась'
    const full = inversion.fullAvgIntensity !== null
        ? `; по всему профилю — ${number(inversion.fullAvgIntensity)} °C`
        : ''

    return `инверсия в приземном слое — ${surface}${full}`
}

function renderDynamics(first: HalfSummary, second: HalfSummary): string {
    const parts: string[] = []

    if (first.pm && second.pm) {
        const before = first.pm.avg
        const after = second.pm.avg

        if (before > 0.1) {
            const ratio = after / before

            if (ratio >= 1.15) {
                parts.push(`средняя PM2.5 выросла в ${number(ratio)} раза`)
            } else if (ratio <= 0.87) {
                parts.push(`средняя PM2.5 снизилась в ${number(1 / ratio)} раза`)
            } else {
                parts.push('средняя PM2.5 изменилась незначительно')
            }
        } else if (after > before + 1) {
            parts.push(`средняя PM2.5 выросла с ${number(before)} до ${number(after)} мкг/м³`)
        }
    }

    if (first.temp && second.temp) {
        const diff = second.temp.avg - first.temp.avg

        if (Math.abs(diff) >= 1) {
            parts.push(`температура ${diff < 0 ? 'снизилась' : 'повысилась'} на ${number(Math.abs(diff))} °C`)
        }
    }

    if (first.wind && second.wind) {
        const diff = second.wind.avg - first.wind.avg

        if (Math.abs(diff) >= 0.5) {
            parts.push(`скорость ветра ${diff < 0 ? 'снизилась' : 'выросла'} на ${number(Math.abs(diff))} м/с`)
        }
    }

    if (first.calmShare !== null && second.calmShare !== null) {
        const diff = second.calmShare - first.calmShare

        if (Math.abs(diff) >= 0.05) {
            parts.push(`доля штиля ${diff > 0 ? 'выросла' : 'снизилась'} с ${percent(first.calmShare)} до ${percent(second.calmShare)}`)
        }
    }

    if (!parts.length) {
        return 'Существенных различий между половинами периода нет.'
    }

    const sentence = `Во второй половине ${parts.join(', ')}`
    return sentence.endsWith('.') ? sentence : `${sentence}.`
}

function renderPeriodSummary(data: IntervalSummaryData): string[] {
    const lines: string[] = []

    if (data.pm && data.daysWithPm) {
        const share = data.daysAbove / data.daysWithPm
        const level = share <= 0.25
            ? 'единичные превышения'
            : share <= 0.5
                ? 'периодические превышения'
                : 'превышения в большинстве дней'
        const assessment = data.daysAbove
            ? `Дней с превышением среднесуточной ПДКсс (${PM25_DAILY_LIMIT} мкг/м³): ${data.daysAbove} из ${data.daysWithPm} — ${level}.`
            : `Превышений среднесуточной ПДКсс (${PM25_DAILY_LIMIT} мкг/м³) нет.`

        lines.push(assessment)

        const parts = [
            `Средняя PM2.5 — ${number(data.pm.avg, 2)} мкг/м³ (${number(data.pm.avg / PM25_DAILY_LIMIT, 2)} ПДКсс)`,
        ]

        if (data.maxDaily) {
            parts.push(`максимум среднесуточной — ${number(data.maxDaily.value)} мкг/м³ (${formatDay(data.maxDaily.date)})`)
        }

        if (data.maxHourly) {
            parts.push(`часовой максимум — ${number(data.maxHourly.value)} мкг/м³ (${formatObservation(data.maxHourly)})`)
        }

        lines.push(`${parts.join('; ')}.`)

        if (data.maxHourly && data.maxHourly.value > PM25_HOURLY_LIMIT) {
            lines.push(`Зафиксированы разовые превышения максимальной ПДКмр (${PM25_HOURLY_LIMIT} мкг/м³) по часовым данным.`)
        }
    } else {
        lines.push('Данных PM2.5 за период нет.')
    }

    if (data.temp) {
        lines.push(`Среднесуточная температура: в среднем ${number(data.temp.avg)} °C (от ${number(data.temp.min)} до ${number(data.temp.max)} °C).`)
    }

    if (data.wind) {
        let wind = `Ветер: средний ${number(data.wind.avg)} м/с`

        if (data.calmShare !== null) {
            wind += `; штиль (менее ${number(CALM_WIND_SPEED)} м/с) — ${percent(data.calmShare)} времени`
        }

        const direction = directionName(data.direction)
        if (direction) wind += `; преобладающее направление — ${direction}`

        lines.push(`${wind}.`)
    }

    lines.push(...renderInversionPeriod(data.inversion))

    return lines
}

function renderComparison(daily: DailySummary[], inversion: InversionSummary): string[] {
    if (daily.length < 4) return []

    const middle = Math.floor(daily.length / 2)
    const firstDays = daily.slice(0, middle)
    const secondDays = daily.slice(middle)
    const first = summarizeDays(firstDays)
    const second = summarizeDays(secondDays)

    if (!hasData(first) || !hasData(second)) return []

    const firstLabel = formatDayRange(firstDays)
    const secondLabel = formatDayRange(secondDays)
    const firstDate = firstDays[0]?.date
    const firstEnd = firstDays[firstDays.length - 1]?.date
    const secondDate = secondDays[0]?.date
    const secondEnd = secondDays[secondDays.length - 1]?.date

    if (!firstLabel || !secondLabel || !firstDate || !firstEnd || !secondDate || !secondEnd) return []

    const firstInversion = summarizeProfiles(inversion.profiles.filter(profile => {
        const date = profile.time.slice(0, 10)
        return date >= firstDate && date <= firstEnd
    }))
    const secondInversion = summarizeProfiles(inversion.profiles.filter(profile => {
        const date = profile.time.slice(0, 10)
        return date >= secondDate && date <= secondEnd
    }))
    const firstInversionText = renderInversionHalf(firstInversion)
    const secondInversionText = renderInversionHalf(secondInversion)

    return [
        '',
        'Сравнение половин периода:',
        `${firstLabel}: ${renderHalf(first)}${firstInversionText ? `; ${firstInversionText}` : ''}.`,
        `${secondLabel}: ${renderHalf(second)}${secondInversionText ? `; ${secondInversionText}` : ''}.`,
        `${renderDynamics(first, second)} Это описательное сравнение: совместный ход концентрации и погоды не доказывает причину.`,
    ]
}

export function renderIntervalSummary(data: IntervalSummaryData, dateFrom: string, dateTo: string, groupLabel = 'КНЦ'): string {
    const header = `${groupLabel}, ${formatDateRange(dateFrom, dateTo)} (${data.periodDays} ${plural(data.periodDays, 'день', 'дня', 'дней')}).`
    const lines = [header, ...renderPeriodSummary(data), '', 'Хронология:']

    for (const day of data.daily) {
        lines.push(renderDay(day))
    }

    lines.push(...renderComparison(data.daily, data.inversion))
    lines.push('')
    lines.push(`Источник: почасовые данные станций (${groupLabel}); PM2.5 — по всем станциям группы, температура и ветер — по станциям с соответствующими датчиками; инверсии — по профилемеру.`)

    return lines.join('\n')
}
