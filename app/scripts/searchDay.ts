import type { Transition } from "~/types/timeline";

function findDayChangeIndex(datesArray: string[]): Transition[] {
    if (datesArray.length <= 1) return [];

    const transitions: Transition[] = [];

    const datesOnly = datesArray.map(dateStr => dateStr.split(' ')[0]);

    for (let i = 1; i < datesOnly.length; i++) {
        if (datesOnly[i] !== datesOnly[i - 1]) {
            transitions.push({
                oldDayEndIndex: i - 1,
                newDayStartIndex: i,
                oldDay: datesOnly[i - 1] || null,
                newDay: datesOnly[i] || null,
                transitionPoint: i
            });
        }
    }

    return transitions;
}

export default findDayChangeIndex