import SetDataService from "./setDataService"
import SetService from "./setService"
import DataService from "./dataService"

const dta = ['knc-mtp5']
const uid = 'nh0bmniqvqldilyq'

const setService = new SetService({ dta, uid })
const setDataService = new SetDataService({ uid })
const dataServiceProfiler = new DataService({ setService, setDataService })

export default dataServiceProfiler

