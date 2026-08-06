import type SetDataService from "./setDataService"
import type SetService from "./setService"
import getDiff from "../time/getDiff"

export default class DataService {
    setDataService: SetDataService
    setService: SetService

    constructor({ setService, setDataService }: { setService: SetService, setDataService: SetDataService }) {
        this.setDataService = setDataService
        this.setService = setService
    }

    async getData(options: any) {

        const { begin, end, dta } = options

        const beginDate = begin.toString()
        const endDate = end.toString()

        const difference = getDiff(begin, end)
        const timeInterval = difference < 5 ? 'hour' : 'day'

        const data = await this.setDataService.getData({ begin: beginDate, end: endDate, timeInterval, dta })
        return data
    }

    async getDta() {
        const data = await this.setService.getSets()
        return data
    }
}