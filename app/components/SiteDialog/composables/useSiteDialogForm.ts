import { DateFormatter, getLocalTimeZone, type CalendarDate } from '@internationalized/date'
import type { Ref } from 'vue'

type TimePeriod = { start: CalendarDate, end: CalendarDate }

interface UseSiteDialogFormOptions {
    timePeriod: Ref<TimePeriod>
    setTimePeriod: (value: TimePeriod) => void
    value: Ref<string[]>
    selectedSites: Ref<number[]>
}

export default function useSiteDialogForm({ timePeriod, setTimePeriod, value, selectedSites }: UseSiteDialogFormOptions) {
    const df = new DateFormatter('ru-RU', {
        dateStyle: 'short'
    })

    const modelValue = shallowRef(timePeriod.value)

    watch(timePeriod, (value) => {
        modelValue.value = value
    })

    const display = computed(() => {
        const start = df.format(timePeriod.value.start.toDate(getLocalTimeZone()))
        const end = df.format(timePeriod.value.end.toDate(getLocalTimeZone()))
        return `${start} - ${end}`
    })

    const setValidValue = () => {
        setTimePeriod(modelValue.value)
    }

    const tabs = [
        { label: 'Настройки', slot: 'settings' },
        { label: 'Показатели', slot: 'indicators' },
        { label: 'Датчики', slot: 'sites' }
    ]

    const modes = [
        { value: 'default', label: 'По умолчанию' },
        { value: 'avg', label: 'Показать усредненные значения' },
        { value: 'year', label: 'Показать годовые значения' }
    ]

    const setValue = (e: string[]) => {
        value.value = e
    }

    const setValueSite = (e: number[]) => {
        selectedSites.value = e
    }

    return { modelValue, display, setValidValue, tabs, modes, setValue, setValueSite }
}
