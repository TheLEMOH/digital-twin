import type { SeriesOption } from 'echarts';
import type { ShallowRef } from 'vue';
import dataServiceProfiler from '~/core/data/registerProfiler'
import { createInversionChart, createProfilerChart, createVerticalProfileChart, type DataItem } from '~/core/profiler/chart';
import type SelectedDates from '~/types/selectedDates';

export default function useProfilerDialog() {
    const selectedDates = inject<ShallowRef<SelectedDates>>('selectedDates')!

    const profilerChart = shallowRef<SeriesOption[]>([])
    const inversionChart = shallowRef<SeriesOption[]>([])
    const verticalProfileChart = shallowRef<SeriesOption>({})
    const profilerData = shallowRef<DataItem[]>([])
    const selectedTime = ref<string>('')

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

    return { profilerChart, inversionChart, verticalProfileChart, selectedTime, onProfileTimeClick }
}
