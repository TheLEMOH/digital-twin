import maplibregl, { NavigationControl, type LayerSpecification } from "maplibre-gl";
import { RotateControl } from "./control";
import type { ShallowRef } from "vue";

const polygons = []

for (let i = 150; i <= 375; i += 25) {
    polygons.push(await import(`~/assets/${i}.json`))
}

export default function useMap({ container }: { container: string }) {

    const selectedSubstrate = inject<ShallowRef<string>>('selectedSubstrate') || shallowRef('osm')

    const computer = 'gis.krasn.ru:8443/twin-tile'

    const layers: LayerSpecification[] = [
        {
            id: "osm",
            type: "raster",
            source: "osmSource",
            layout: { visibility: 'none' },
        },

        {
            id: "satellite",
            type: "raster",
            source: "satelliteSource",
        }
    ]

    const map = new maplibregl.Map({
        container: container,
        center: [92.8924, 56.0126],
        pitch: 30,
        hash: true,
        zoom: 10,
        dragRotate: false,
        canvasContextAttributes: { antialias: true },
        style: {
            version: 8,

            glyphs: `https://${computer}/font/{fontstack}/{range}.pbf`,

            sources: {
                osmSource: {
                    type: "raster",
                    tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
                    tileSize: 512,
                },

                satelliteSource: {
                    type: 'raster',
                    tiles: [`https://c1.monitor.krasn.ru/tiles/wm_sentinel2016/{z}/{x}/{y}.jpeg`],
                    tileSize: 512,
                    scheme: 'tms',
                    maxzoom: 15,
                    minzoom: 1,
                }
            },

            layers: layers
        }

    })

    map.addControl(new RotateControl())

    map.addControl
        (new NavigationControl({
            visualizePitch: true,
            visualizeRoll: true,
            showZoom: true,
            showCompass: true
        }),
            'top-right');

    map.addControl(
        new maplibregl.TerrainControl({
            source: 'terrariumSource',
            exaggeration: 1,
        }),
        'top-right'
    );

    watch(selectedSubstrate, (value) => {
        layers.forEach(layer => {
            const id = layer.id
            const visibility = id === value ? 'visible' : 'none';

            if (map.getLayer(id)) {
                map.setLayoutProperty(id, 'visibility', visibility);
            }
        })
    })

    return { map }
}