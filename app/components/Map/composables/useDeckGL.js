import { MapboxOverlay } from '@deck.gl/mapbox';
import { GeoJsonLayer, } from '@deck.gl/layers';
import colorer from '~/core/colorer';

const polygons = []

for (let i = 150; i <= 375; i += 25) {
    polygons.push(await import(`~/assets/${i}.json`))
}

const addZ = (coords, z) => {
    return typeof coords[0] === 'number'
        ? [coords[0], coords[1], z]
        : coords.map(c => addZ(c, z))
}

const hexToRgb = (hex) => {
    const string = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const o = string ? {
        r: parseInt(string[1], 16),
        g: parseInt(string[2], 16),
        b: parseInt(string[3], 16)
    } : null;

    return [o.r, o.g, o.b, 100]
}

export default function useDeckGL({ map }) {

    const selectedHeight = inject('selectedHeight')
    const visibleDeckGL = inject('visibleDeckGL')

    map.on('load', () => {
        const processedData = computed(() => {
            const features = polygons
                .flatMap(c => c.features)
                .filter(f => f.properties.H === selectedHeight.value)

            return {
                type: 'FeatureCollection',
                features: features.map(f => ({
                    ...f,
                    geometry: {
                        ...f.geometry,
                        coordinates: addZ(f.geometry.coordinates, f.properties.H + 100)
                    }
                }))
            }
        })

        const layer = new GeoJsonLayer({
            id: `polygonDeckGL`,
            data: processedData.value,
            extruded: true,
            getFillColor: f => {
                return hexToRgb(colorer.paintSelf('m-t', f.properties.t))
            },
            getElevation: 10,
        })

        const overlay = new MapboxOverlay({
            interleaved: false,
            layers: [layer]
        })

        map.addControl(overlay);

        watch(visibleDeckGL, (visible) => {
            const layer = new GeoJsonLayer({
                id: `polygonDeckGL`,
                data: processedData.value,
                visible: visible,
                extruded: true,
                getFillColor: f => {
                    return hexToRgb(colorer.paintSelf('m-t', f.properties.t))
                },
                getElevation: 10,
            })

            overlay.setProps({ layers: [layer] })
        })

        watch(selectedHeight, (height) => {
            const layer = new GeoJsonLayer({
                id: `polygonDeckGL`,
                data: processedData.value,
                visible: visibleDeckGL.value,
                extruded: true,
                getFillColor: f => {
                    return hexToRgb(colorer.paintSelf('m-t', f.properties.t))
                },
                getElevation: 10,
            })

            overlay.setProps({ layers: [layer] })
        })
    })
}