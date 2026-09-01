import dataService from "~/core/data/register"
import { createSiteFeatureCollection } from "~/core/features/createSiteFeature"
import type { CalendarDate } from "@internationalized/date"
import type Dta from "~/types/dta"
import type DataService from "~/core/data/dataService"
import type { ShallowRef } from "vue"
import type SiteData from "~/types/siteData"
import type { FeatureCollectionsMap } from "~/types/featureCollection"
import type Indicator from "~/types/indicator"
import { avg } from "~/core/avg/avg"
import type SelectedDates from "~/types/selectedDates"
import type Site from "~/types/site"
import { siteDataFilter, siteFilter } from "~/core/filters/siteFilter"

const getData = async ({ begin, end, dta, dataService, indicators, selectedSiteGroup }:
    { begin: CalendarDate, end: CalendarDate, dta: Dta[], dataService: DataService, indicators: Indicator[], selectedSiteGroup: [string] }) => {
    const data = await dataService.getData({ begin, end, dta })
    const sitesDta = dta.map(i => i.sites).flat()
    const filteredSites = siteFilter(sitesDta, selectedSiteGroup)
    const filteredData = siteDataFilter(data, filteredSites)
    const collection = createSiteFeatureCollection(filteredSites, filteredData)
    const avgData = avg(filteredData, indicators)
    return { data, collection, avgData, sitesDta, filteredData }
}

export default async function useSite({ selectedDates, selectedDate, selectedSiteGroup }:
    { selectedDates: ShallowRef<SelectedDates>, selectedDate: ShallowRef<string>, selectedSiteGroup: ShallowRef<[string]> }) {

    const loading = inject<ShallowRef<boolean>>('loading')!

    const features = shallowRef<FeatureCollectionsMap>({})
    const setData = shallowRef<SiteData[]>([])
    const filteredSetData = shallowRef<SiteData[]>([])
    const sites = shallowRef<Site[]>([])

    const avgByDate = shallowRef({})

    const { dta, indicators } = await dataService.getDta()

    loading.value = true

    const { data, collection, avgData, sitesDta, filteredData } =
        await getData({ begin: selectedDates!.value.start, end: selectedDates!.value.end, dta, dataService, indicators, selectedSiteGroup: selectedSiteGroup.value })
            .finally(() => loading.value = false)

    setData.value = data
    filteredSetData.value = filteredData
    features.value = collection
    avgByDate.value = avgData
    sites.value = sitesDta

    watch(selectedDates, async (value) => {
        loading.value = true

        getData({ begin: value.start, end: value.end, dta, dataService, indicators, selectedSiteGroup: selectedSiteGroup.value })
            .then(({ data, collection, avgData, filteredData }) => {
                setData.value = data
                filteredSetData.value = filteredData
                features.value = collection
                avgByDate.value = avgData

                if (selectedDate)
                    selectedDate.value = `${value.start.toString()} 00:00:00`

            })
            .finally(() => loading.value = false)
    })

    watch(selectedSiteGroup, async (value) => {
        const filteredSites = siteFilter(sites.value, value)
        const filteredData = siteDataFilter(setData.value, filteredSites)

        filteredSetData.value = filteredData

        features.value = createSiteFeatureCollection(filteredSites, filteredData)
        avgByDate.value = avg(filteredData, indicators)
    })

    return { sites, features, setData, filteredSetData, indicators, avgByDate, loading }
}