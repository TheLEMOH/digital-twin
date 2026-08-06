import getDiff from "~/core/time/getDiff";
import SetDataService from "~/core/data/setDataService";
import { CalendarDate } from "@internationalized/date";
import type Site from "~/types/site";

const setDialogDataService = new SetDataService({ uid: 'khlnn3o37xah7pj2' })
const cache = new Map()

interface Props { selected: number[], timePeriod: any, sites: Site[] }

interface DataStrategy {
    getData(options: Props): Promise<Site[]>
}

const getOptions = (timePeriod: any) => {
    const { start, end } = timePeriod;
    const startStr = start.toString();
    const endStr = end.toString();
    const timeInterval = getDiff(start, end) < 5 ? 'hour' : 'day';
    return { startStr, endStr, timeInterval }
}

const get = async ({ selected, timePeriod, sites }: { selected: number[], timePeriod: any, sites: Site[] }) => {
    const { startStr, endStr, timeInterval } = getOptions(timePeriod)

    const finded = selected
        .map(id => sites.find(s => s.id === id))
        .filter((s): s is Site => s !== undefined)

    const promises = finded.map(async (site) => {

        const { id, codeDta } = site

        const dataFromCache = cache.get(`${startStr}/${endStr}/${site.id}`)

        if (dataFromCache) {
            return { data: dataFromCache, ...site }
        }

        else {
            const data = await setDialogDataService.getDataById({
                begin: startStr,
                end: endStr,
                timeInterval,
                codeDta,
                id
            });

            cache.set(`${startStr}/${endStr}/${site.id}`, data)

            return { data, ...site, start: startStr, end: endStr }
        }
    });

    return await Promise.all(promises)

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
