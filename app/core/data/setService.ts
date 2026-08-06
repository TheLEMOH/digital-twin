import type Dta from "~/types/dta"
import createIndicators from "../indicator/indicator"

export default class SetService {
    dta: string[]
    uid: string

    constructor({ dta, uid }: { dta: string[], uid: string }) {
        this.dta = dta
        this.uid = uid
    }

    async getSets() {
        const promises = this.dta.map(d => {
            const promise = fetch(`https://sensor.krasn.ru/hub/api/3.0/sets/${d}?uid=khlnn3o37xah7pj2`).then((res) => res.json())
            return promise
        })

        const dta: any = await Promise.all(promises).then((res) => {
            return res.map(r => r.data)
        })

        dta.forEach((d: any) => {
            d.sites.forEach((site: any) => {
                site.codeDta = d.code
            })
        })

        const indicators = createIndicators(dta)

        return { dta, indicators }
    }
}