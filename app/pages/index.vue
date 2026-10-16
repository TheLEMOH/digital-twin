<script setup lang='ts'>
import Map from '~/components/Map/components/Map.vue';
import useMap from '~/components/Map/composables/useMap';
import useTerrain from '~/components/Map/composables/useTerrain';
import useSiteLayer from '~/components/Map/composables/useSiteLayer';
import Indicators from '~/components/Indicator/components/Indicators.vue';
import Legend from '~/components/Legend/components/Legend.vue';
import Timeline from '~/components/Timeline/components/Timeline.vue';
import SiteDialog from '~/components/SiteDialog/components/SiteDialog.vue';
import ButtonSidebar from '~/components/Sidebar/components/ButtonSidebar.vue';
import Sidebar from '~/components/Sidebar/components/Sidebar.vue';
import usePolygons from '~/components/Map/composables/useFill';
import useFillExtrusion from '~/components/Map/composables/useFillExtrusion';
import useVoronoi from '~/components/Map/composables/useVoronoi';
import useDeckGL from '~/components/Map/composables/useDeckGL';
import useExistDates from '~/composables/useExistDate';
import useDataGroupedBySite from '~/composables/useDataGroupedBySite';
import useDates from '~/composables/useDates';
import Progress from '~/components/Loading/components/Progress.vue';
import useTwinTiles from '~/components/Map/composables/useTwinTiles';
import BackButton from '~/components/Navigation/components/BackButton.vue';
import ProfilerDialog from '~/components/ProfilerDialog/components/ProfilerDialog.vue';
import type Indicator from '~/types/indicator';
import type { ShallowRef } from 'vue';
import type { Feature, Map as MapLibreMap } from 'maplibre-gl';

useHead({
    title: 'Сценариум - КНЦ СО РАН'
})

definePageMeta({
    layout: 'default',
})

const { selectedDate, selectedDates } = useDates()

const selectedIndicator = inject<ShallowRef<Indicator>>('selectedIndicator')!
const selectedFeature = inject<ShallowRef<Feature | null>>('selectedFeature')

const featureKey = computed(() => { return selectedFeature?.value?.properties.id })

const { selectedSiteGroup } = useSiteSettings()

const { sites, features, setData, filteredSetData, indicators, avgByDate, statsByDate, loading } = await useSite({ selectedDate, selectedDates, selectedSiteGroup })
const { selectedTiffIndicator, tiffOpacity, selectedBand, tiffFilterRange } = useTiffSettings()
const { existDate } = useExistDates({ setData: filteredSetData, selectedIndicator })
const { dataGroupedBySite } = useDataGroupedBySite({ setData })
const { openDialogProfiler } = useProfilerSettings()

const mapRef = shallowRef<MapLibreMap | null>(null)

const focusSite = ({ site }: { site: number | null }) => {
    const target = sites.value.find(s => s.id == site)
    if (!target || !mapRef.value) return

    mapRef.value.flyTo({
        center: [target.geom_x, target.geom_y],
        zoom: 15,
        duration: 2000
    })
}

onMounted(async () => {
    const { map: mapInstance } = useMap({ container: 'map' })
    mapRef.value = mapInstance

    useSiteLayer({ map: mapInstance, features, selectedDate })
    usePolygons({ map: mapInstance })
    useFillExtrusion({ map: mapInstance })
    useVoronoi({ map: mapInstance, features, selectedDate })
    useTerrain({ map: mapInstance })
    useDeckGL({ map: mapInstance })
    useTwinTiles({ map: mapInstance, selectedDate, selectedBand, tiffOpacity, selectedTiffIndicator, tiffFilterRange })
})

/* Даты */
provide('selectedDates', selectedDates)
provide('selectedDate', selectedDate)
/*  */
provide('selectedTiffIndicator', selectedTiffIndicator)
provide('tiffOpacity', tiffOpacity)
provide('selectedBand', selectedBand)
provide('tiffFilterRange', tiffFilterRange)
/*  */
provide('selectedSiteGroup', selectedSiteGroup)
/*  */
provide('openDialogProfiler', openDialogProfiler)
provide('setData', setData)
provide('dataGroupedBySite', dataGroupedBySite)
provide('indicators', indicators)
provide('sites', sites)
provide('features', features)
provide('avgByDate', avgByDate)
</script>

<template>
    <Progress v-if="loading"></Progress>

    <BackButton></BackButton>
    <Map></Map>
    <Indicators :items="indicators"></Indicators>
    <Legend></Legend>
    <Timeline :items="existDate" :avg="avgByDate" :stats="statsByDate" @focus-site="focusSite"></Timeline>

    <SiteDialog v-if="selectedFeature" :key="featureKey"></SiteDialog>
    <!--  <SiteSlider v-if="selectedFeature" :key="selectedFeature"> </SiteSlider> -->

    <ProfilerDialog></ProfilerDialog>

    <!--   <Dialog></Dialog> -->

    <ButtonSidebar></ButtonSidebar>
    <Sidebar></Sidebar>
</template>

<style scoped></style>
