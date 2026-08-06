import formateDate from "./formate"

const cache = {}

const url = `https://sensor.krasn.ru/hub/api/3.0/sets`
const uid = `khlnn3o37xah7pj2`

const getDataForPopup = async (site, date) => {
    const { id, code } = site.properties

    const timeEnd = new Date(date)
    const timeBegin = new Date(date)

    timeBegin.setDate(timeEnd.getDate() - 3)

    const urlData = `${url}/${code}/data/archive?uid=${uid}&time_begin=${formateDate(timeBegin)} 00:00:00&time_end=${formateDate(timeEnd)} 00:00:00&sites=${id}&time_interval=hour`

    if (cache[id]) {
        return cache[id]
    }

    const data = await fetch(urlData).then((res) => res.json())

    cache[id] = data.data

    return data.data
}

export { getDataForPopup }
