import colorer from "~/core/colorer";
import getDiff from "~/core/time/getDiff"
import findDayChangeIndex from "~/scripts/searchDay"
import type Indicator from "~/types/indicator";
import type SelectedDates from "~/types/selectedDates";
import type { Point, Points, StatsByHour, Timeline, TimelineMode, Transition } from "~/types/timeline";

export function createPoints(points: string[], backgrounds: any, indicator: Indicator, stats?: StatsByHour): Points {
    return points.map((item) => {

        const background = backgrounds[item] ? backgrounds[item][indicator.code] : { color: "#fff", value: 0 }
        const stat = stats && stats[item] ? stats[item][indicator.code] : undefined

        return {
            time: item,
            type: 'point',
            background: background.color,
            value: background.value,
            min: stat?.min,
            max: stat?.max,
            count: stat?.count,
            minSite: stat?.minSite ?? null,
            maxSite: stat?.maxSite ?? null
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

export function createTimeline({ borders, points, backgrounds, indicator, stats }: { borders: SelectedDates, points: string[], backgrounds: any, indicator: Indicator, stats?: StatsByHour }): Timeline {

    if (Object.keys(backgrounds).length === 0) {
        return { mode: 'hour', points: [] }
    }

    const transition: Transition[] = findDayChangeIndex(points)
    const timelineMode: TimelineMode = getDiff(borders.start, borders.end) < 5 ? 'hour' : 'day'
    const newPoints: Points = createPoints(points, backgrounds, indicator, stats)

    if (timelineMode == 'hour') {
        const startDay = newPoints[0]?.time?.split(' ')[0]
        if (startDay) {
            newPoints.unshift({ type: 'pointBorder', time: startDay })
            transition.forEach(t => {
                t.newDayStartIndex += 1
                t.oldDayEndIndex += 1
                t.transitionPoint += 1
            })
        }
        setTransition(newPoints, transition)
    }

    return { mode: timelineMode, points: newPoints }
}
