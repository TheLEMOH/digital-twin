
import * as turf from "@turf/turf";
import colorer from "~/core/colorer";

const createGrid = ({ collection, date, indicator, bbox }) => {
    const points = { type: 'FeatureCollection', features: collection[date].features.filter(p => p.properties[indicator] !== undefined && p.properties[indicator] !== null) }
    const grid = turf.interpolate(points, 1, { gridType: "points", property: indicator, });

    const polygons = turf.voronoi(grid, { bbox });

    return polygons
}

export default function useVoronoi({ map, features, selectedDate }) {

    const selectedIndicator = inject('selectedIndicator')
    const visibleVoronoi = inject('visibleVoronoi')

    const bbox = [92.0236103, 55.7328042, 93.4843803, 56.3649399]

    map.on('load', () => {

        const polygons = createGrid({ collection: features.value, date: selectedDate.value, indicator: selectedIndicator.value.code, bbox })

        map.addSource(`voronoiTest`, {
            type: "geojson",
            data: polygons
        });

        map.addLayer({
            id: `voronoiTest`,
            source: `voronoiTest`,
            type: 'fill',
            layout: { visibility: visibleVoronoi.value ? 'visible' : 'none' },
            paint: {
                'fill-opacity': 0.5,
                "fill-color": ['interpolate',
                    ['linear'],
                    ['get', selectedIndicator.value.code],
                    ...colorer.getScheme(selectedIndicator.value.code)
                ]
            }
        }, 'site');


        const setVoronoiData = (polygons) => {
            const source = map.getSource('voronoiTest')
            if (source) source.setData(polygons)
        }

        watch(selectedIndicator, indicator => {
            const { code } = indicator
            const date = selectedDate.value
            const scheme = colorer.getScheme(code)

            const polygons = createGrid({ collection: features.value, date: date, indicator: code, bbox })

            if (map.getLayer('voronoiTest'))
                map.setPaintProperty('voronoiTest', 'fill-color', [
                    'interpolate',
                    ['linear'],
                    ['get', code],
                    ...scheme
                ])

            setVoronoiData(polygons)
        })

        watch(selectedDate, date => {
            const code = selectedIndicator.value.code
            const polygons = createGrid({ collection: features.value, date: date, indicator: code, bbox })

            setVoronoiData(polygons)
        })

        watch(visibleVoronoi, value => {
            map.setLayoutProperty(
                `voronoiTest`,
                'visibility',
                value ? 'visible' : 'none'
            );
        })

    })
}