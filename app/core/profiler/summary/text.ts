import type {
    MixingStat,
    PeriodStat,
    ProfilerSummaryData,
    StabilityKind,
} from './types'

const MONTHS_GENITIVE = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
]

const MONTHS_SHORT = [
    'янв', 'фев', 'мар', 'апр', 'мая', 'июн',
    'июл', 'авг', 'сен', 'окт', 'ноя', 'дек',
]

const STABILITY_LABELS: Record<StabilityKind, string> = {
    stable: 'устойчивая (инверсионная)',
    weak: 'слабоустойчивая',
    unstable: 'неустойчивая',
}

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

function range(min: number, max: number, unit: string, digits = 1): string {
    if (min === max) return `${number(min, digits)} ${unit}`
    const minDigits = Math.abs(min) < 10 ** -digits ? digits + 1 : digits
    return `от ${number(min, minDigits)} до ${number(max, digits)} ${unit}`
}

const NO_BREAK_UNITS = /(\d)[ \t]+(°C\/100 м|мкг\/м³|м\/с|°C|%|м|ч)(?=[\s,;.)]|$)/g

function noBreakUnits(value: string): string {
    return value.replace(NO_BREAK_UNITS, '$1\u00A0$2')
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

function formatMoment(value: string): string {
    return `${formatDay(value.slice(0, 10))} ${value.slice(11, 16)}`
}

function describeDominant(kind: StabilityKind | null, share: number): string {
    if (!kind) return 'данных недостаточно'

    const label = STABILITY_LABELS[kind]
    const shareText = percent(share)

    if (share >= 0.7) {
        return `преобладала ${label} стратификация (${shareText} сроков)`
    }

    if (share >= 0.45) {
        return `чаще отмечалась ${label} стратификация (${shareText} сроков), условия были неоднородными`
    }

    return `стратификация была неоднородной, чаще отмечалась ${label} (${shareText} сроков)`
}

function describeMixing(mixing: MixingStat): string {
    const total = mixing.count + mixing.absentCount

    if (!total) return ''

    const parts: string[] = []

    if (mixing.avgHeight !== null) {
        parts.push(`в среднем ${number(mixing.avgHeight, 0)} м (по срокам, когда определялся)`)
    }

    if (mixing.absentCount) {
        parts.push(`отсутствовал в ${percent(mixing.absentCount / total)} сроков`)
    }

    if (mixing.aboveTopCount) {
        parts.push(`превышал 1000 м в ${percent(mixing.aboveTopCount / total)} сроков`)
    }

    return parts.join(', ')
}

function describePeriod(period: PeriodStat): string {
    const parts = [describeDominant(period.dominant, period.dominantShare)]

    if (period.gradientAvg !== null) {
        parts.push(`средний γ100 ${number(period.gradientAvg)} °C/100 м`)
    }

    const mixing = describeMixing(period.mixing)
    if (mixing) parts.push(`ВСП ${mixing}`)

    return parts.join('; ')
}

function periodLine(period: PeriodStat): string {
    if (!period.stability.total) {
        return `${period.label} (${period.interval}): данных недостаточно.`
    }

    return `${period.label} (${period.interval}): ${describePeriod(period)}.`
}

function mixingLines(data: ProfilerSummaryData): string[] {
    const mixing = describeMixing(data.mixing)
    if (!mixing) return []

    return [`Слой перемешивания (оценка по сухой адиабате): ${mixing}.`]
}

function inversionLines(data: ProfilerSummaryData): string[] {
    const inversion = data.inversion
    const total = data.total

    if (!inversion.anyCount) {
        return ['Температурных инверсий за период не зафиксировано.']
    }

    const onlySurface = inversion.surfaceCount - inversion.mixedCount
    const onlyElevated = inversion.elevatedCount - inversion.mixedCount
    const lines = [
        `Температурные инверсии отмечались в ${percent(inversion.anyCount / total)} сроков: только приземные — ${percent(onlySurface / total)}, только приподнятые — ${percent(onlyElevated / total)}, смешанные — ${percent(inversion.mixedCount / total)}, без инверсий — ${percent(inversion.noneCount / total)}.`,
    ]

    if (inversion.surface) {
        const surface = inversion.surface
        lines.push(`Приземные инверсии: величина — ${range(surface.minIntensity, surface.maxIntensity, '°C')}; мощность — ${range(surface.minThickness, surface.maxThickness, 'м', 0)}.`)
    }

    if (inversion.elevated) {
        const elevated = inversion.elevated
        lines.push(`Приподнятые инверсии: нижняя граница — ${range(elevated.minBase, elevated.maxBase, 'м', 0)}; верхняя — ${range(elevated.minTop, elevated.maxTop, 'м', 0)}; величина — ${range(elevated.minIntensity, elevated.maxIntensity, '°C')}.`)
    }

    if (inversion.max) {
        lines.push(`Наибольшая инверсия — ${number(inversion.max.layer.intensity)} °C в слое ${number(inversion.max.layer.base, 0)}–${number(inversion.max.layer.top, 0)} м (${formatMoment(inversion.max.time)}).`)
    }

    return lines
}

function temperatureLines(data: ProfilerSummaryData): string[] {
    const lines: string[] = []

    if (data.heights.length) {
        const parts = data.heights.map(item => item.height === 0
            ? `у земли — ${number(item.value)} °C`
            : `на ${number(item.height, 0)} м — ${number(item.value)} °C`)
        lines.push(`Средняя температура: ${parts.join(', ')}.`)
    }

    const amplitudes: string[] = []
    if (data.amplitude.surface !== null) {
        amplitudes.push(`у земли — ${number(data.amplitude.surface)} °C`)
    }
    if (data.amplitude.height600 !== null) {
        amplitudes.push(`на 600 м — ${number(data.amplitude.height600)} °C`)
    }
    if (data.amplitude.height1000 !== null) {
        amplitudes.push(`на 1000 м — ${number(data.amplitude.height1000)} °C`)
    }

    if (amplitudes.length) {
        lines.push(`Средняя суточная амплитуда температуры: ${amplitudes.join(', ')}.`)
    }

    return lines
}

function extremeLines(data: ProfilerSummaryData): string[] {
    const parts: string[] = []

    if (data.mostStable) {
        parts.push(`наиболее устойчивая — ${formatMoment(data.mostStable.time)} (γ100 = ${number(data.mostStable.value)} °C/100 м)`)
    }

    if (data.mostUnstable) {
        parts.push(`наиболее неустойчивая — ${formatMoment(data.mostUnstable.time)} (γ100 = ${number(data.mostUnstable.value)} °C/100 м)`)
    }

    if (!parts.length) return []

    return [`Экстремумы стратификации: ${parts.join('; ')}.`]
}

function advectionLines(data: ProfilerSummaryData): string[] {
    if (data.periodDays < 2) return []

    const advection = data.advection

    if (!advection.count) {
        return ['Существенных изменений температуры на высоте 600 м в синхронные сроки с предыдущими сутками не выявлено.']
    }

    const moment = advection.maxTime && advection.maxPreviousTime
        ? `${formatMoment(advection.maxTime)} относительно ${formatMoment(advection.maxPreviousTime)}`
        : advection.maxTime
            ? formatMoment(advection.maxTime)
            : ''
    const maximum = advection.maxDelta === null
        ? ''
        : `, максимум ${number(Math.abs(advection.maxDelta))} °C${moment ? ` (${moment})` : ''}`
    const threshold = 'на величину не менее 3 °C в тёплый сезон и 2 °C — в холодный'

    return [
        `Существенные изменения температуры на высоте 600 м в синхронные сроки с предыдущими сутками (${threshold}) отмечались в ${advection.count} ${plural(advection.count, 'случае', 'случаях', 'случаях')}${maximum}; это может указывать на адвекцию или смену воздушной массы.`,
    ]
}

function nmuLines(data: ProfilerSummaryData): string[] {
    const runs = data.stableRuns

    if (!runs.count) {
        return ['Длительных (не менее 3 ч) периодов устойчивой стратификации не выявлено.']
    }

    return [
        `Термические предпосылки накопления примесей: устойчивая стратификация непрерывно не менее 3 ч отмечалась ${runs.count} ${plural(runs.count, 'раз', 'раза', 'раз')}, суммарно ${runs.totalHours} ч (максимум ${runs.maxHours} ч подряд). Оценка не учитывает скорость ветра.`,
    ]
}

export function renderProfilerSummary(data: ProfilerSummaryData): string {
    if (!data.total || !data.firstTime || !data.lastTime) {
        return 'Температурный профиль (МТП-5): данных за период нет.'
    }

    const header = `Период: ${formatDateRange(data.firstTime.slice(0, 10), data.lastTime.slice(0, 10))}; ${data.total} часовых ${plural(data.total, 'профиль', 'профиля', 'профилей')} за ${data.periodDays} ${plural(data.periodDays, 'сутки', 'суток', 'суток')}.`
    const general = describeDominant(data.dominant, data.dominantShare)
    const gradient = data.gradientAvg === null
        ? ''
        : ` Средний градиент γ100 — ${number(data.gradientAvg)} °C/100 м.`
    const lines = [
        'Температурный профиль (МТП-5):',
        header,
        `В приземном слое (0–100 м) ${general}.${gradient}`,
        ...data.periods.map(periodLine),
        ...temperatureLines(data),
        ...extremeLines(data),
        ...mixingLines(data),
        '',
        ...inversionLines(data),
        ...advectionLines(data),
        ...nmuLines(data),
    ]

    return noBreakUnits(lines.join('\n'))
}
