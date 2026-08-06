import SetDataService from "./setDataService"
import SetService from "./setService"
import DataService from "./dataService"

const dta = ['dta-air', 'dta-gas']
const uid = 'khlnn3o37xah7pj2'

const setService = new SetService({ dta, uid })
const setDataService = new SetDataService({ uid })
const dataService = new DataService({ setService, setDataService })

export default dataService

