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

function setSiteData(map: Map, data: GeoJSON.GeoJSON | '') {
    const source = getGeoJSONSource(map);

    if (!source) return;

    source.setData(data || { type: 'FeatureCollection', features: [] });
}

function applyIndicator(map: Map, indicator?: Indicator) {
    const code = indicator?.code;
    const nameLayer = 'site';
    const nameTextLayer = 'site-labels';

    if (!code) return;
    if (!map.getLayer(nameLayer) || !map.getLayer(nameTextLayer)) return;

    const scheme = colorer.getScheme(code);

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
}

export default function useSiteLayer({ map, features, selectedDate }: UseSiteLayerParams): void {
    const selectedIndicator = inject<ShallowRef<Indicator>>('selectedIndicator')!;
    const isOpenDialog = inject<Ref<boolean>>('isOpenDialog')!;
    const selectedFeature = inject<ShallowRef<Feature | null>>('selectedFeature')!;

    let ready = false;
    let destroyed = false;

    map.on('remove', () => {
        destroyed = true;
    });

    const updateSiteData = (date = selectedDate.value) => {
        if (!ready || destroyed) return;
        setSiteData(map, getData(features.value, date));
    };

    const updateIndicator = (indicator = selectedIndicator.value) => {
        if (!ready || destroyed) return;
        applyIndicator(map, indicator);
    };

    const init = () => {
        if (destroyed) return;

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

        ready = true;
        updateIndicator();
        updateSiteData();
    };

    watch(selectedIndicator, (indicator) => updateIndicator(indicator), { immediate: true });
    watch(features, () => updateSiteData());
    watch(selectedDate, (date) => updateSiteData(date));

    if (map.isStyleLoaded()) {
        init();
    } else {
        map.once('load', init);
    }
}
