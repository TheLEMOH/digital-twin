import { createSiteCollection } from "~/core/layer/createSiteLayer";
import colorer from "~/core/colorer";

export default function useSite({ map, features, selectedDate }) {

    const selectedIndicator = inject('selectedIndicator')
    const isOpenDialog = inject('isOpenDialog')
    const selectedFeature = inject('selectedFeature')

    map.on('load', () => {
        const collection = createSiteCollection(features.value[selectedDate.value], { name: 'site' })

        collection.forEach(c => {
            map.addSource(c.name, c.sources);
            map.addLayer(c.layer);
        })

        map.on('click', 'site', (e) => {
            const feature = e.features[0]
            selectedFeature.value = feature
            isOpenDialog.value = true
        })

        watch(selectedIndicator, (indicator) => {

            const { code } = indicator

            const scheme = colorer.getScheme(code)

            const nameLayer = 'site'
            const nameTextLayer = `site-labels`

            map.setPaintProperty(nameLayer, 'circle-color', [
                'interpolate',
                ['linear'],
                ['get', code],
                ...scheme
            ])

            map.setLayoutProperty(nameTextLayer, 'text-field',
                ['format',
                    ['get', 'name'], { 'font-scale': 0.8 },
                    '\n',
                    ['get', code], { 'font-scale': 0.7 }
                ],)

            map.setFilter(nameLayer, ['has', code])
            map.setFilter(nameTextLayer, ['has', code])

        },
            { immediate: true })

        watch(features, value => {
            map.getSource('site').setData(features.value[selectedDate.value])
        })

        watch(selectedDate, (date) => {
            map.getSource('site').setData(features.value[date])
        })
    })


}