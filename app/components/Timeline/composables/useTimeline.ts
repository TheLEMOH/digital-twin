import type { ShallowRef } from "vue";
import { createBackgrounds, createTimeline } from "./timeline";
import type Indicator from "~/types/indicator";
import type { CalendarDate } from "@internationalized/date";
import type { Point, Points, Range, StatsByHour, Timeline } from "~/types/timeline";


export default function useTimeline({ items, avg, stats }: { items: Ref<string[]>, avg: any, stats?: Ref<StatsByHour> }) {
    const selectedDate = inject<ShallowRef<string | undefined>>('selectedDate')
    const selectedDates = inject<ShallowRef<{ start: CalendarDate, end: CalendarDate }>>('selectedDates')
    const selectedIndicator = inject<ShallowRef<Indicator>>('selectedIndicator')

    const itemsInPage: number = 15
    const selectedIndex = ref<number>(0)
    const page = ref<number>(0)

    const backgrounds = computed(() => {
        return createBackgrounds(avg.value)
    })

    const range = computed<Range | null>(() => {
        const code = selectedIndicator?.value?.code
        const data = stats?.value
        if (!code || !data) return null

        let min = Infinity
        let max = -Infinity
        let minTime: string | null = null
        let maxTime: string | null = null
        let minSite: number | null = null
        let maxSite: number | null = null
        let found = false

        for (const key in data) {
            const stat = data[key]?.[code]
            if (!stat) continue
            found = true
            if (stat.min < min) {
                min = stat.min
                minTime = key
                minSite = stat.minSite ?? null
            }
            if (stat.max > max) {
                max = stat.max
                maxTime = key
                maxSite = stat.maxSite ?? null
            }
        }

        return found ? { min, max, minTime, maxTime, minSite, maxSite } : null
    })

    const selectRangeEdge = (edge: 'min' | 'max') => {
        const value = range.value
        if (!value) return null

        const time = edge == 'min' ? value.minTime : value.maxTime
        const site = edge == 'min' ? value.minSite : value.maxSite

        if (time) {
            const index = timeline.value.points.findIndex(item => item.time == time)

            if (index > -1) {
                selectedIndex.value = index
                page.value = Math.floor(index / itemsInPage)
            }

            if (selectedDate) selectedDate.value = time
        }

        return { time, site }
    }

    const timeline = shallowRef<Timeline>({ mode: 'hour', points: [] })

    const pointsByPage = computed<Points>(() => {
        const from = itemsInPage * page.value;
        const to = from + itemsInPage;
        return timeline.value.points.slice(from, to);
    });

    const maxPage = computed<number>(() => {
        if (!items.value) return 0;
        return Math.ceil(timeline.value.points.length / itemsInPage);
    });

    const increasePage = () => {
        if (page.value + 1 < maxPage.value) {
            page.value += 1;
        }
    }

    const decreasePage = () => {
        if (page.value > 0) {
            page.value -= 1
        }
    }

    const setSelected = (item: Point, index: number) => {
        selectedIndex.value = index
    }

    const pressArrowLeft = () => {
        let index = selectedIndex.value - 1;
        let point = timeline.value.points[index];

        if (point && selectedDate?.value) {

            if (point.type == 'pointBorder') {
                index = selectedIndex.value - 2;
                point = timeline.value.points[index];
            }

            selectedIndex.value = index;
            page.value = Math.floor(index / itemsInPage);

            selectedDate.value = point?.time
        }
    };

    const pressArrowRight = () => {
        let index = selectedIndex.value + 1;
        let point = timeline.value.points[index];

        if (point && selectedDate?.value) {

            if (point.type == 'pointBorder') {
                index = selectedIndex.value + 2;
                point = timeline.value.points[index];
            }

            selectedIndex.value = index;
            page.value = Math.floor(index / itemsInPage);

            selectedDate.value = point?.time
        }
    }

    watch([items, backgrounds, () => stats?.value], ([newItems, newBackground]) => {
        timeline.value = createTimeline({ points: newItems, borders: selectedDates!.value, backgrounds: newBackground, indicator: selectedIndicator!.value, stats: stats?.value })

        const finded = timeline.value.points.findIndex(item => item.time == selectedDate?.value)

        if (finded == -1 && timeline.value.points[0] && selectedDate?.value) {
            selectedDate.value = timeline.value.points[0].time
            page.value = 0;
        }

        if (finded > -1) {
            page.value = Math.floor(finded / itemsInPage);
            selectedIndex.value = finded + itemsInPage * page.value
        }

    }, { immediate: true })

    watch(() => selectedDates, () => {
        page.value = 0
    })

    return {
        page,
        maxPage,
        pointsByPage,
        selectedIndex,
        timeline,
        itemsInPage,
        selectedDates,
        pressArrowLeft,
        pressArrowRight,
        increasePage,
        decreasePage,
        setSelected,
        range,
        selectRangeEdge
    }
}