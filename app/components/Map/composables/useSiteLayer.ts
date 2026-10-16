import type { Map } from "maplibre-gl";
import type { Ref, ShallowRef } from "vue";
import { createSiteCollection } from "~/core/layer/createSiteLayer";
import colorer from "~/core/colorer";
import type Indicator from "~/types/indicator";
import type { Feature, FeatureCollectionsMap } from "~/types/featureCollection";

interface UseSiteLayerParams {
    map: Map;
    features: ShallowRef<FeatureCollectionsMap>;
    selectedDate: Ref<string>;
}

function getGeoJSONSource(map: Map) {
    return map.getSource('site') as maplibregl.GeoJSONSource | undefined;
}

function getData(features: FeatureCollectionsMap, date: string) {
    return features[date] || ''
}

function setSiteData(map: Map, data: GeoJSON.GeoJSON | '', code?: string) {
    const source = getGeoJSONSource(map);

    if (!source) return;

    source.setData(data || { type: 'FeatureCollection', features: [] });
}

export default function useSiteLayer({ map, features, selectedDate }: UseSiteLayerParams): void {
    const selectedIndicator = inject<ShallowRef<Indicator>>('selectedIndicator')!;
    const isOpenDialog = inject<Ref<boolean>>('isOpenDialog')!;
    const selectedFeature = inject<ShallowRef<Feature | null>>('selectedFeature')!;

    map.on('load', () => {
        const initialData = features.value[selectedDate.value] || { type: 'FeatureCollection', features: [] };
        const collection = createSiteCollection(initialData, { name: 'site' });

        collection.forEach(c => {
            if (!map.getSource(c.name)) map.addSource(c.name, c.sources);
            if (!map.getLayer(c.layer.id)) map.addLayer(c.layer);
        });

        map.on('click', 'site', (e) => {
            const feature = e.features?.[0] as Feature;
            selectedFeature.value = feature;
            isOpenDialog.value = true;
        });

        watch(selectedIndicator, (indicator) => {
            const { code } = indicator;
            const scheme = colorer.getScheme(code);

            const nameLayer = 'site';
            const nameTextLayer = 'site-labels';

            map.setPaintProperty(nameLayer, 'circle-color', [
                'interpolate',
                ['linear'],
                ['get', code],
                ...scheme
            ]);

            map.setLayoutProperty(nameTextLayer, 'text-field',
                ['format',
                    ['get', 'name'], { 'font-scale': 0.8 },
                    '\n',
                    ['get', code], { 'font-scale': 0.7 }
                ]);

            map.setFilter(nameLayer, ['has', code]);
            map.setFilter(nameTextLayer, ['has', code]);

            setSiteData(map, getData(features.value, selectedDate.value), code);
        }, { immediate: true });

        watch(features, () => {
            setSiteData(map, getData(features.value, selectedDate.value), selectedIndicator.value?.code);
        });

        watch(selectedDate, (date) => {
            setSiteData(map, getData(features.value, date), selectedIndicator.value?.code);
        });
    });
}
