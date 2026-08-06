import type { Map } from "maplibre-gl";

export default function useTerrain({ map }: { map: Map }) {

    const visibleHill = ref(false)

    const paint = {
        'hillshade-exaggeration': 0.3,
        'hillshade-shadow-color': '#cccccc',
        'hillshade-highlight-color': '#000000',
        'hillshade-accent-color': '#000000',
        'hillshade-illumination-direction': 315,
    }

    map.on('load', () => {
        map.addSource('terrariumSource', {
            type: "raster-dem",
            tiles: [`https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png`],
            tileSize: 256,
            bounds: [92.0236103, 55.7328042, 93.4843803, 56.3649399],
            encoding: 'terrarium',
            maxzoom: 15,
            minzoom: 1,
        });

        map.setTerrain({
            'source': 'terrariumSource',
            'exaggeration': 1
        });

        map.addLayer({
            id: 'hill',
            type: 'hillshade',
            source: 'terrariumSource',
            layout: { visibility: 'none' },
            paint: paint
        })

    })

    watch(visibleHill, visible => {
        map.setLayoutProperty(
            'hill',
            'visibility',
            visible ? 'visible' : 'none'
        );
    })

    return { visibleHill }
}