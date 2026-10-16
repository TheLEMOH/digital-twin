import { monitoring } from "~/core/data/register"
import { createSiteFeatureCollection } from "~/core/features/createSiteFeature"
import type { CalendarDate } from "@internationalized/date"
import type { ShallowRef } from "vue"
import type SiteData from "~/types/siteData"
import type { FeatureCollectionsMap } from "~/types/featureCollection"
import type Indicator from "~/types/indicator"
import { avg } from "~/core/avg/avg"
import { statsByHour } from "~/core/avg/statsByHour"
import type SelectedDates from "~/types/selectedDates"
import type Site from "~/types/site"
import { siteDataFilter, siteFilter } from "~/core/filters/siteFilter"

const getData = async ({ begin, end, sites, indicators, selectedSiteGroup }:
    { begin: CalendarDate, end: CalendarDate, sites: Site[], indicators: Indicator[], selectedSiteGroup: [string] }) => {
    const data = await monitoring.getData({ begin, end })
    const filteredSites = siteFilter(sites, selectedSiteGroup)
    const filteredData = siteDataFilter(data, filteredSites)
    const collection = createSiteFeatureCollection(filteredSites, filteredData)
    const avgData = avg(filteredData, indicators)
    const statsData = statsByHour(filteredData, indicators)
    return { data, collection, avgData, statsData, filteredData }
}

export default async function useSite({ selectedDates, selectedDate, selectedSiteGroup }:
    { selectedDates: ShallowRef<SelectedDates>, selectedDate: ShallowRef<string>, selectedSiteGroup: ShallowRef<[string]> }) {

    const loading = inject<ShallowRef<boolean>>('loading')!

    const features = shallowRef<FeatureCollectionsMap>({})
    const setData = shallowRef<SiteData[]>([])
    const filteredSetData = shallowRef<SiteData[]>([])
    const sites = shallowRef<Site[]>([])

    const avgByDate = shallowRef({})
    const statsByDate = shallowRef({})

    const { sites: allSites, indicators } = await monitoring.getDta()

    watch(selectedDates, async (value) => {
        loading.value = true

        getData({ begin: value.start, end: value.end, sites: allSites, indicators, selectedSiteGroup: selectedSiteGroup.value })
            .then(({ data, collection, avgData, statsData, filteredData }) => {
                setData.value = data
                filteredSetData.value = filteredData
                features.value = collection
                avgByDate.value = avgData
                statsByDate.value = statsData
                sites.value = allSites

                if (selectedDate)
                    selectedDate.value = `${value.start.toString()} 00:00:00`

            })
            .finally(() => loading.value = false)
    }, { immediate: true })

    watch(selectedSiteGroup, async (value) => {
        const filteredSites = siteFilter(sites.value, value)
        const filteredData = siteDataFilter(setData.value, filteredSites)

        filteredSetData.value = filteredData

        features.value = createSiteFeatureCollection(filteredSites, filteredData)
        avgByDate.value = avg(filteredData, indicators)
        statsByDate.value = statsByHour(filteredData, indicators)
    })

    return { sites, features, setData, filteredSetData, indicators, avgByDate, statsByDate, loading }
}