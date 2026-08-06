import type { SeriesOption } from 'echarts';
import type { ShallowRef } from 'vue';
import dataServiceProfiler from '~/core/data/registerProfiler';
import { createInversionChart, createProfilerChart } from '~/core/profiler/chart';
import type SelectedDates from '~/types/selectedDates';

export default function useProfilerDialog() {
    const selectedDates = inject<ShallowRef<SelectedDates>>('selectedDates')!

    const profilerChart = shallowRef<SeriesOption[]>([])
    const inversionChart = shallowRef<SeriesOption>({})

    watch(selectedDates, async (value) => {
        const begin = value.start.toString()
        const end = value.end.toString()

        const result = await dataServiceProfiler.setDataService.getDataById({ begin, end, timeInterval: 'hour', codeDta: 'knc-mtp5', id: 4310 })

        const chart = createProfilerChart(result)
        const inversion = createInversionChart(result)

        profilerChart.value = chart
        inversionChart.value = inversion
    }, { immediate: true })

    return { profilerChart, inversionChart }
}