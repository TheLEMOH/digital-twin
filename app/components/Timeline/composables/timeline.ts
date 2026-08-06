import colorer from "~/core/colorer";
import getDiff from "~/core/time/getDiff"
import findDayChangeIndex from "~/scripts/searchDay"
import type Indicator from "~/types/indicator";
import type SelectedDates from "~/types/selectedDates";
import type { Point, Points, Timeline, TimelineMode, Transition } from "~/types/timeline";

export function createPoints(points: string[], backgrounds: any, indicator: Indicator): Points {
    return points.map((item) => {
        const background = backgrounds[item][indicator.code] || { color: "#fff", value: 0 }

        return {
            time: item,
            type: 'point',
            background: background.color,
            value: background.value
        }
    })
}

export function createBackgrounds(avg: any) {
    return Object.fromEntries(
        Object.entries(avg).map(([time, value]) => [time, colorer.paintObject(value)])
    )
}

export function setTransition(points: Points, transition: Transition[]) {
    let count = 0

    transition.forEach(item => {
        points.splice(item.newDayStartIndex + count, 0, { type: 'pointBorder', time: item.newDay || 'Не указано' })
        count++
    })
}

export function createTimeline({ borders, points, backgrounds, indicator }: { borders: SelectedDates, points: string[], backgrounds: any, indicator: Indicator }): Timeline {
    const transition: Transition[] = findDayChangeIndex(points)
    const timelineMode: TimelineMode = getDiff(borders.start, borders.end) < 5 ? 'hour' : 'day'
    const newPoints: Points = createPoints(points, backgrounds, indicator)

    if (timelineMode == 'hour')
        setTransition(newPoints, transition)

    return { mode: timelineMode, points: newPoints }
}
