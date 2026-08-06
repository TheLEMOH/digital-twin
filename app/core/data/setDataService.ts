import formateDate from "~/scripts/formate"
import type Dta from "~/types/dta"

export default class SetDataService {
    URL: string
    uid: string

    constructor({ uid }: { uid: string }) {
        this.URL = `https://sensor.krasn.ru/hub/api/3.0/sets/`
        this.uid = uid
    }

    setParams(options: any, url: URL) {
        for (let option in options) {
            if (options[option])
                url.searchParams.set(option, options[option])
        }
    }

    async getDataById({ begin, end, timeInterval, codeDta, id }: { begin: string, end: string, timeInterval: string, codeDta: string, id: number }) {

        const url = new URL(`${codeDta}/data/archive`, this.URL)

        const options = {
            'time_begin': `${formateDate(begin)} 00:00:00`,
            'time_end': `${formateDate(end)} 23:59:00`,
            'uid': this.uid,
            'time_interval': timeInterval,
            'sites': id
        }

        this.setParams(options, url)

        const promise = await fetch(url.toString()).then((res) => res.json())

        return promise.data
    }

    async getDataByDta({ begin, end, timeInterval, codeDta, sites }: { begin: string, end: string, timeInterval: string, codeDta: string, sites?: number[] }) {

        const url = new URL(`${codeDta}/data/archive`, this.URL)

        const options = {
            'time_begin': `${formateDate(begin)} 00:00:00`,
            'time_end': `${formateDate(end)} 23:59:00`,
            'uid': this.uid,
            'time_interval': timeInterval,
            'sites': sites
        }

        this.setParams(options, url)

        const promise = await fetch(url.toString()).then((res) => res.json())

        return promise.data
    }

    async getData({ dta, begin, end, timeInterval, sites }: { dta: Dta[], begin: string, end: string, timeInterval: string, sites?: string[] }) {

        const promises = dta.map(set => {

            const url = new URL(`${set.code}/data/archive`, this.URL)

            const options = {
                'time_begin': `${formateDate(begin)} 00:00:00`,
                'time_end': `${formateDate(end)} 23:59:00`,
                'uid': this.uid,
                'time_interval': timeInterval,
                'sites': sites
            }

            this.setParams(options, url)

            const promise = fetch(url.toString()).then((res) => res.json())

            return promise
        })

        const res = await Promise.all(promises).then((res) => {
            const arrays: any = []

            res.forEach(r => arrays.push(...r.data))

            return arrays
        })

        return res
    }
}