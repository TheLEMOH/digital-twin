import type { LayerSpecification, SourceSpecification } from "maplibre-gl";

export const createSiteSource = (data: GeoJSON.GeoJSON): SourceSpecification => {
    return {
        type: "geojson",
        data: data,
    };
}

export const createSiteCircle = (name: string): LayerSpecification => {
    return {
        id: name,
        source: name,
        type: "circle",
        paint: {
            'circle-radius': 10,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff',
        },
    };
}

export const createSiteText = (name: string): LayerSpecification => {
    return {
        id: `${name}-labels`,
        type: 'symbol',
        source: name,
        layout: {
            'text-font': ['Open Sans Bold'],
            'text-offset': [0, 0.5],
            'text-anchor': 'top'
        },
        paint: {
            'text-color': '#ffffff',
            'text-halo-color': '#000000',
            'text-halo-width': 1
        }
    }
}

export const createSiteCollection = (data: GeoJSON.GeoJSON, { name }: { name: string }) => {

    const sources = createSiteSource(data)
    const circles = createSiteCircle(name)
    const text = createSiteText(name)

    return [{ name: name, layer: circles, sources }, { name: `${name}-labels`, layer: text, sources }]
}

