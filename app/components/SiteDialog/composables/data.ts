import { monitoring } from "~/core/data/register";
import { CalendarDate } from "@internationalized/date";
import type Site from "~/types/site";

interface Props { selected: number[], timePeriod: any, sites: Site[] }

interface DataStrategy {
    getData(options: Props): Promise<Site[]>
}

const get = async ({ selected, timePeriod, sites }: Props) => {
    const begin = timePeriod.start.toString();
    const end = timePeriod.end.toString();

    const finded = selected
        .map(id => sites.find(s => s.id === id))
        .filter((s): s is Site => s !== undefined)

    const dataBySite = await monitoring.getDataBySites({ begin, end, sites: finded });

    return dataBySite.map(({ site, data }) => ({ ...site, data, start: begin, end }));
}

class DefaultStrategy implements DataStrategy {
    async getData(options: Props) {
        return await get(options)
    }
}

class YearStrategy implements DataStrategy {
    async getData(options: Props) {
        const { start, end } = options.timePeriod

        let changedStart = new CalendarDate(start.year, start.month, start.day)
        let changedEnd = new CalendarDate(end.year, end.month, end.day)

        const promises = []

        for (let i = end.year; i >= 2024; i--) {

            promises.push(get({ selected: options.selected, timePeriod: { start: changedStart, end: changedEnd }, sites: options.sites }))

            changedStart = changedStart.subtract({ years: 1 })
            changedEnd = changedEnd.subtract({ years: 1 })
        }

        return Promise.all(promises).then(e => {
            return e.flat()
        })
    }
}

const defaultStrategy = new DefaultStrategy()
const yearStrategy = new YearStrategy()

interface Strategies {
    [key: string]: DataStrategy
    default: DefaultStrategy,
    avg: DefaultStrategy
    year: YearStrategy,
}

export const dataStrategies: Strategies = { default: defaultStrategy, avg: defaultStrategy, year: yearStrategy }
