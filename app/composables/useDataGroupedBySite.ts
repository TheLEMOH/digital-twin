import type SiteData from "~/types/siteData"
import groupByField from "~/core/group/groupByField"

export default function useDataGroupedBySite({ setData }: { setData: Ref<SiteData[]> }) {

    const dataGroupedBySite = computed(() => {
        const grouped = groupByField(setData.value, 'site')
        return grouped
    })

    return { dataGroupedBySite }
}