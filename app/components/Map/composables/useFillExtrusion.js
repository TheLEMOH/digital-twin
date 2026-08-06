import colorer from "~/core/colorer";

const polygons = []

for (let i = 150; i <= 375; i += 25) {
    polygons.push(await import(`~/assets/${i}.json`))
}

export default function useFillExtrusion({ map }) {

    const visibleFillExtrusion = inject('visibleFillExtrusion')
    const selectedHeight = inject('selectedHeight')

    map.on('load', () => {

        polygons.forEach((item, i) => {

            map.addSource(`Extrusion${item.name}`, {
                type: 'geojson',
                data: { ...item }
            });

            map.addLayer({
                id: `Extrusion${item.name}`,
                type: 'fill-extrusion',
                source: `Extrusion${item.name}`,
                layout: { visibility: visibleFillExtrusion.value ? 'visible' : 'none' },
                paint: {
                    "fill-extrusion-color": ['interpolate',
                        ['linear'],
                        ['get', 't'],
                        ...colorer.getScheme('m-t')
                    ],
                    'fill-extrusion-opacity': 0.1,
                    'fill-extrusion-base': +item.name,
                    'fill-extrusion-height': +item.name + 2,
                }
            });
        })
    })

    watch(visibleFillExtrusion, (value) => {
        polygons.forEach((item) => {
            map.setLayoutProperty(
                `Extrusion${item.name}`,
                'visibility',
                value ? 'visible' : 'none'
            );

            map.setPaintProperty(
                `Extrusion${item.name}`,
                'fill-extrusion-opacity', 0.1)
        })
    })


    watch(selectedHeight, (height) => {

        if (height == 125) {
            polygons.forEach((item) => {
                map.setLayoutProperty(
                    `Extrusion${item.name}`,
                    'visibility',
                    visibleFillExtrusion.value ? 'visible' : 'none'
                );

                map.setPaintProperty(
                    `Extrusion${item.name}`,
                    'fill-extrusion-opacity', 0.1)
            })
        }
        else {
            if (visibleFillExtrusion.value) {
                polygons.forEach((item) => {
                    if (height == item.name) {

                        map.setPaintProperty(
                            `Extrusion${item.name}`,
                            'fill-extrusion-opacity', 0.5)

                        map.setLayoutProperty(
                            `Extrusion${item.name}`,
                            'visibility',
                            'visible'
                        );
                    }
                    else
                        map.setLayoutProperty(
                            `Extrusion${item.name}`,
                            'visibility',
                            'none'
                        );
                })
            }
        }
    })

}