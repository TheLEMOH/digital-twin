import { air, profiler } from '~/core/data/register'
import { siteFilter } from '~/core/filters/siteFilter'
import { buildProfilerSummary } from '~/core/profiler/summary'
import { SITE_GROUPS } from '~/core/siteGroups'
import type SiteData from '~/types/siteData'
import { aggregateInterval, listDates } from './aggregate'
import type { ProfilerRow } from './inversion'
import { renderIntervalSummary } from './text'

const CHUNK_DAYS = 7

function chunkDates(dates: string[]): string[][] {
    const chunks: string[][] = []

    for (let index = 0; index < dates.length; index += CHUNK_DAYS) {
        chunks.push(dates.slice(index, index + CHUNK_DAYS))
    }

    return chunks
}

async function loadAirData(siteIds: number[], dates: string[]): Promise<SiteData[]> {
    const parts = await Promise.all(chunkDates(dates).map(chunk => air.getData<SiteData>({
        begin: chunk[0]!,
        end: chunk[chunk.length - 1]!,
        sites: siteIds,
        timeInterval: 'hour',
    })))

    return parts.flat()
}

export function loadHourlyAirData(siteIds: number[], dateFrom: string, dateTo: string): Promise<SiteData[]> {
    return loadAirData(siteIds, listDates(dateFrom, dateTo))
}

async function loadProfilerData(dates: string[]): Promise<ProfilerRow[]> {
    const parts = await Promise.all(chunkDates(dates).map(chunk => profiler.getDataBySite<ProfilerRow>({
        begin: chunk[0]!,
        end: chunk[chunk.length - 1]!,
        timeInterval: 'hour',
    }).catch(() => [])))

    return parts.flat()
}

export type IntervalSummary = {
    summary: string
    profilerSummary: string
}

export async function buildIntervalSummary(dateFrom: string, dateTo: string, siteGroup: string[] = []): Promise<IntervalSummary> {
    const dates = listDates(dateFrom, dateTo)

    if (!dates.length) {
        return { summary: 'Не удалось построить сводку: некорректный период.', profilerSummary: '' }
    }

    const { sites } = await air.getDta()
    const selectedSites = siteGroup.length ? siteFilter(sites, siteGroup) : sites

    if (!selectedSites.length) {
        return { summary: 'Не удалось построить сводку: нет станций.', profilerSummary: '' }
    }

    const groupLabel = siteGroup.length
        ? SITE_GROUPS.filter(group => siteGroup.includes(group.value)).map(group => group.label).join(', ')
        : 'Все посты'

    const [data, profilerData] = await Promise.all([
        loadAirData(selectedSites.map(site => site.id), dates),
        loadProfilerData(dates),
    ])

    return {
        summary: renderIntervalSummary(
            aggregateInterval(data, selectedSites, dates, profilerData),
            dateFrom,
            dateTo,
            groupLabel,
        ),
        profilerSummary: buildProfilerSummary(profilerData),
    }
}
