<script setup lang="ts">
import SiteSittengs from './SiteSittengs.vue'
import TiffSettings from './TiffSettings.vue'

const visibleFill = inject<Ref<boolean>>('visibleFill')
const visibleFillExtrusion = inject<Ref<boolean>>('visibleFillExtrusion')
const visibleVoronoi = inject<Ref<boolean>>('visibleVoronoi')
const visibleDeckGL = inject<Ref<boolean>>('visibleDeckGL')
const selectedSubstrate = inject<Ref<string>>('selectedSubstrate')
const selectedHeight = inject<Ref<number>>('selectedHeight')

const substrates = [{ label: 'Спутник', value: 'satellite' }, { label: 'OSM', value: 'osm' }]

</script>

<template>
    <div class="flex flex-col gap-4">
        <SiteSittengs></SiteSittengs>

        <USeparator label="Слои"></USeparator>

        <UFormField label="Подложка">
            <USelect v-model="selectedSubstrate" style="width: 150px;" placeholder="Выберите слой"
                :items="substrates"></USelect>
        </UFormField>

        <div>
            <UCheckbox label="Полигоны 2D" v-model="visibleFill"></UCheckbox>
            <UCheckbox label="Полигоны 3D" v-model="visibleFillExtrusion"></UCheckbox>
            <UCheckbox label="Полигоны DeckGL" v-model="visibleDeckGL"></UCheckbox>
            <UCheckbox label="Диаграмма Вороного" v-model="visibleVoronoi"></UCheckbox>
        </div>

        <UFormField :label="`Высота ${selectedHeight}`">
            <USlider v-model="selectedHeight" :min="125" :max="375" :step="25" />
        </UFormField>

        <UFormField label="Тема">
            <UColorModeButton />
        </UFormField>

        <TiffSettings></TiffSettings>
    </div>
</template>
