<script setup lang="ts">
import { ru } from '@nuxt/ui/runtime/locale/index.js';
import Loading from './components/Loading/components/Loading.vue';
import useVisibleLayers from './composables/useVisibleLayer';
import useLoading from './composables/useLoading';

const {
  selectedIndicator,
  isOpenDialog,
  isOpenDialogGFS,
  selectedFeature,
  isOpenSidebar,
  gfsData,
  selectedHeight,
  selectedSubstrate } = useGeneral()

const {
  visibleFill,
  visibleFillExtrusion,
  visibleVoronoi,
  visibleDeckGL,
  visbileHill } = useVisibleLayers()

const { loading } = useLoading()
/* Выбранные объекты */
provide('selectedHeight', selectedHeight)
provide('selectedFeature', selectedFeature)
provide('selectedSubstrate', selectedSubstrate)
provide('selectedIndicator', selectedIndicator)

/* Модальные окна и панели */
provide('isOpenDialog', isOpenDialog)
provide('isOpenDialogGFS', isOpenDialogGFS)
provide('isOpenSidebar', isOpenSidebar)

/* Видимость слоев */
provide('visibleFill', visibleFill)
provide('visibleFillExtrusion', visibleFillExtrusion)
provide('visibleVoronoi', visibleVoronoi)
provide('visibleDeckGL', visibleDeckGL)
provide('visbileHill', visbileHill)

/* Иное */
provide('gfsData', gfsData)
provide('loading', loading)

const config = useAppConfig()

</script>

<template>
  <UApp :locale="ru">
    <NuxtLayout>
      <Loading></Loading>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </UApp>
</template>

<style>

#opacity-control {
  width: 115px;
  padding: 10px 0 10px 10px
}

#opacity-control hr {
  margin: 5px 10px 5px 0
}

#opacity-control input[type=checkbox],
#opacity-control input[type=radio] {
  margin-right: 5px
}

#opacity-control input[type=range] {
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  width: 125px;
  height: 10px;
  margin: 0;
  border: none;
  padding: 1px 2px;
  border-radius: 30px;
  background: #f1f0ee;
  outline: none
}

#opacity-control input[type=range]::-ms-track {
  border: inherit;
  color: transparent;
  background: transparent
}

#opacity-control input[type=range]::-ms-fill-lower,
#opacity-control input[type=range]::-ms-fill-upper {
  background: transparent
}

#opacity-control input[type=range]::-ms-tooltip {
  display: none
}

#opacity-control input[type=range]::-ms-thumb {
  width: 15px;
  height: 18px;
  border-radius: 12px;
  border: 0;
  background-image: linear-gradient(to bottom, #1253a4 0, #1253a4)
}

.maplibregl-ctrl-bottom-right {
  display: none !important;
}
</style>
