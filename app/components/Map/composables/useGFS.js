export default function useGFS({ map }) {

    const isOpen = inject('isOpenDialogGFS')
    const gfsData = inject('gfsData')

    map.on('click', (e) => {
        const feature = map.queryRenderedFeatures(e.point)[0];

        if (!feature) {
            const { lngLat } = e

            const URL = `https://gis.krasn.ru/gopher/bands/2026020206/${lngLat.lng},${lngLat.lat}`

            const data = fetch(URL).then(res => res.json())

            data.then(res => {
                gfsData.value = res
                isOpen.value = true
            })
        }
    })
}