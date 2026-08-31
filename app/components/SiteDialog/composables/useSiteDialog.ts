import { CalendarDate } from "@internationalized/date";
import { time, type SeriesOption } from "echarts";
import type { MarkLineOption } from "echarts/types/src/component/marker/MarkLineModel.js";
import type { Feature } from "maplibre-gl";
import type { ShallowRef } from "vue";
import type Indicator from "~/types/indicator";
import type Site from "~/types/site";

import { chartStrategies } from "./chart";
import { dataStrategies } from "./data";

export default function useSiteDialog() {
    const selectedFeature = inject<ShallowRef<Feature>>('selectedFeature')
    const selectedIndicator = inject<ShallowRef<Indicator>>('selectedIndicator')
    const selectedDates = inject<ShallowRef<{ start: CalendarDate, end: CalendarDate }>>('selectedDates')
    const indicators = inject<Indicator[]>('indicators')
    const sites = inject<ShallowRef<Site[]>>('sites')!

    const timePeriod = shallowRef<{ start: CalendarDate, end: CalendarDate }>({ ...selectedDates!.value })

    const value = shallowRef<string[]>([selectedIndicator?.value.code || 'm-t'])

    const siteData = shallowRef<Site[]>([])
    const selectedSites = ref<number[]>([])
    const mode = ref<string>('default')

    selectedSites.value.push(selectedFeature?.value.properties.id)

    const selectedChartStrategy = computed(() => chartStrategies[mode.value] || chartStrategies['default'])
    const selectedDataStrategy = computed(() => dataStrategies[mode.value] || dataStrategies['default'])

    const lastData = computed<Indicator[]>(() => {
        const allIndicators = [...new Set(
            siteData.value.flatMap(site =>
                site.data?.flatMap(dataItem => Object.keys(dataItem)) ?? []
            )
        )];

        const matchedIndicators = indicators!.filter(indicator =>
            allIndicators.includes(`${indicator.code}`)
        );

        return matchedIndicators
    })

    const chartData = computed<SeriesOption[]>(() => {
        if (!selectedFeature?.value) {
            return []
        }

        const res: any[] = value.value.map((code, indexY) => {
            const indicator = indicators?.find(i => i.code == code)
            if (indicator)
                return selectedChartStrategy.value.createChart({
                    siteData: siteData.value,
                    indicator,
                    indexY,
                    code,
                })
        })
            .flat()
            
        return res
    })

    watch(selectedSites, async (selected) => {
        selectedDataStrategy.value.getData({
            selected,
            timePeriod: timePeriod.value,
            sites: sites.value
        }).then(r => siteData.value = r)
    }, { immediate: true });

    watch(timePeriod, async (newTimePeriod) => {
        selectedDataStrategy.value.getData({
            selected: selectedSites.value,
            timePeriod: newTimePeriod,
            sites: sites.value
        }).then(r => siteData.value = r)
    })

    watch(mode, async (value) => {
        selectedDataStrategy.value.getData({
            selected: selectedSites.value,
            timePeriod: timePeriod.value,
            sites: sites.value
        }).then(r => siteData.value = r)
    })

    return { selectedFeature, timePeriod, chartData, selectedIndicator, value, lastData, selectedSites, mode }
}