export interface Point {
    time: string,
    type: 'point',
    background: string,
    value?: number,
    text?: string
}

export type TimelineMode = 'hour' | 'day'

export interface PointBorder {
    time: string
    type: 'pointBorder',
}

export interface Transition {
    oldDayEndIndex: number,
    newDayStartIndex: number,
    oldDay: string | null,
    newDay: string | null,
    transitionPoint: number
}

export type Points = Array<Point | PointBorder>

export interface Timeline {
    mode: TimelineMode,
    points: Points
}

