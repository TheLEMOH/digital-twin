import groupByField from "~/core/group/groupByField"
import type SiteData from "~/types/siteData"

export default function useGroupedBySite({ setData }: { setData: Ref<SiteData[]> }) {
    const dataGroupedBySite = computed(() => {
        const d: unknown[] = []
        if (setData.value) {
            const grouped = groupByField(d, 'site')
            return grouped
        }
    })

    return { dataGroupedBySite }
}