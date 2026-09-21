import type { SeriesOption } from 'echarts';
import type { ShallowRef } from 'vue';
import dataServiceProfiler from '~/core/data/registerProfiler'
import { createAvgChart } from '~/core/avg/createAvgChart';
import { createIndicatorNames } from '~/core/indicator/indicator';
import { createInversionChart, createProfilerChart, createVerticalProfileChart, type DataItem } from '~/core/profiler/chart';
import type Indicator from '~/types/indicator';
import type SelectedDates from '~/types/selectedDates';

export default function useProfilerDialog() {
    const selectedDates = inject<ShallowRef<SelectedDates>>('selectedDates')!
    const selectedIndicator = inject<ShallowRef<Indicator>>('selectedIndicator')!
    const avgByDate = inject<ShallowRef<Record<string, Record<string, number>>>>('avgByDate')
    const indicators = inject<Indicator[]>('indicators', [])

    const indicatorNames = createIndicatorNames(indicators)

    const profilerChart = shallowRef<SeriesOption[]>([])
    const inversionChart = shallowRef<SeriesOption[]>([])
    const verticalProfileChart = shallowRef<SeriesOption>({})
    const avgChart = shallowRef<SeriesOption[]>([])
    const indicatorCode = ref<string>(selectedIndicator.value.code || '')
    const profilerData = shallowRef<DataItem[]>([])
    const selectedTime = ref<string>('')

    function updateAvgChart() {
        const code = indicatorCode.value
        const name = indicatorNames[code] || selectedIndicator.value.name || code

        avgChart.value = createAvgChart(avgByDate?.value, code, name)
    }

    watch(selectedIndicator, (indicator) => {
        indicatorCode.value = indicator.code || ''
    })

    watch([avgByDate, indicatorCode], updateAvgChart, { immediate: true })

    watch(selectedDates, async (value) => {
        const begin = value.start.toString()
        const end = value.end.toString()

        const result = await dataServiceProfiler.setDataService.getDataById({ begin, end, timeInterval: 'hour', codeDta: 'knc-mtp5', id: 4310 })

        profilerChart.value = createProfilerChart(result)
        inversionChart.value = createInversionChart(result)
        profilerData.value = result

        if (result.length) {
            const first = result[0]
            selectedTime.value = first.time
            verticalProfileChart.value = createVerticalProfileChart(first)
        }

    }, { immediate: true })

    function onProfileTimeClick(time: string) {
        selectedTime.value = time
        const item = profilerData.value.find(d => d.time === time)
        if (item) {
            verticalProfileChart.value = createVerticalProfileChart(item)
        }
    }

    return { profilerChart, inversionChart, verticalProfileChart, avgChart, indicatorCode, indicators, selectedTime, onProfileTimeClick }
}
