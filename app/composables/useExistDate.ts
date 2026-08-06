import existData from "~/core/data/existData"
import type Indicator from "~/types/indicator"
import type SiteData from "~/types/siteData"

export default function useExistDates({ selectedIndicator, setData }: { selectedIndicator: Ref<Indicator>, setData: Ref<SiteData[]> }) {
    const existDate = ref<string[]>([])

    watch(selectedIndicator, (indicator) => {
        const dates = existData(setData.value, indicator.code)
        existDate.value = Array.from(new Set(dates))
    }, { immediate: true })


    watch(setData, (data) => {
        const dates = existData(data, selectedIndicator.value.code)
        existDate.value = Array.from(new Set(dates))
    }, { immediate: true })

    return { existDate }
}