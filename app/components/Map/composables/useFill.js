import colorer from "~/core/colorer";

const polygons = []

for (let i = 150; i <= 375; i += 25) {
    polygons.push(await import(`~/assets/${i}.json`))
}

export default function usePolygons({ map }) {

    const visibleFill = inject('visibleFill')
    const selectedHeight = inject('selectedHeight')

    map.on('load', () => {

        polygons.forEach((item, i) => {
            map.addSource(`PolygonSource${item.name}`, {
                type: 'geojson',
                data: { ...item }
            });

            map.addLayer({
                id: `Polygon${item.name}`,
                type: 'fill',
                source: `PolygonSource${item.name}`,
                layout: { visibility: visibleFill.value ? 'visible' : 'none' },
                paint: {
                    'fill-opacity': 0.1,
                    "fill-color": ['interpolate',
                        ['linear'],
                        ['get', 't'],
                        ...colorer.getScheme('m-t')
                    ]
                }
            });
        })
    })

    watch(visibleFill, (value) => {
        if (selectedHeight.value == 125) {
            polygons.forEach((item) => {
                map.setLayoutProperty(
                    `Polygon${item.name}`,
                    'visibility',
                    value ? 'visible' : 'none'
                );

                map.setPaintProperty(
                    `Polygon${item.name}`,
                    'fill-opacity', 0.1)
            })
        }
        else {
            if (value) {
                polygons.forEach((item) => {
                    if (selectedHeight.value == item.name) {
                        map.setLayoutProperty(
                            `Polygon${item.name}`,
                            'visibility',
                            'visible'
                        );

                        map.setPaintProperty(
                            `Polygon${item.name}`,
                            'fill-opacity', 0.5)
                    }
                    else
                        map.setLayoutProperty(
                            `Polygon${item.name}`,
                            'visibility',
                            'none'
                        );
                })
            }
            else {
                polygons.forEach((item) => {
                    if (selectedHeight.value == item.name) {
                        map.setLayoutProperty(
                            `Polygon${item.name}`,
                            'visibility',
                            'none'
                        );
                    }

                })
            }
        }
    })

    watch(selectedHeight, (height) => {
        if (height == 125) {
            polygons.forEach((item) => {
                map.setLayoutProperty(
                    `Polygon${item.name}`,
                    'visibility',
                    visibleFill.value ? 'visible' : 'none'
                );

                map.setPaintProperty(
                    `Polygon${item.name}`,
                    'fill-opacity', 0.1)
            })
        }
        else {
            if (visibleFill.value) {
                polygons.forEach((item) => {
                    if (height == item.name) {
                        map.setLayoutProperty(
                            `Polygon${item.name}`,
                            'visibility',
                            'visible'
                        );

                        map.setPaintProperty(
                            `Polygon${item.name}`,
                            'fill-opacity', 0.5)
                    }
                    else
                        map.setLayoutProperty(
                            `Polygon${item.name}`,
                            'visibility',
                            'none'
                        );
                })
            }
        }
    })

}