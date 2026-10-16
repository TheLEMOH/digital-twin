import createDataService from "./createDataService"

const monitoringUid = 'khlnn3o37xah7pj2'
const profilerUid = 'nh0bmniqvqldilyq'

const monitoring = createDataService({ uid: monitoringUid, dta: ['dta-air', 'dta-gas'] })
const air = createDataService({ uid: monitoringUid, dta: ['dta-air'] })
const profiler = createDataService({ uid: profilerUid, dta: ['knc-mtp5'], siteId: 4310 })

const services = { monitoring, air, profiler }

export { monitoring, air, profiler }

export default services
