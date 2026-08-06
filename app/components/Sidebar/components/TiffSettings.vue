<script setup lang="ts">

const tiffOpacity = inject<number>('tiffOpacity')
const selectedTiffIndicator = inject<string>('selectedTiffIndicator')
const selectedBand = inject<number>('selectedBand')
const tiffFilterRange = inject<Array<number>>('tiffFilterRange')

const codes = [
    "AL", "ALB", "ALT", "co", "E_CO", "E_HCHO", "E_NH3", "E_NO", "E_NO2", "E_SO2",
    "EXCH_H", "hcho", "HGT", "hno3", "MAPFAC_M", "MAPFAC_MX", "MAPFAC_MY",
    "MAPFAC_U", "MAPFAC_V", "MU", "MU_U", "MU_V", "MUB", "nh3", "no", "no2",
    "no3", "o3", "P", "PB", "PH", "PHB", "RHO", "RW", "so2", "T", "wind",
    "WW", "XKHH", "XKHV", "XKMH", "XKMV"
];
</script>

<template>
    <USeparator label="Настройки Tiff"></USeparator>

    <UFormField label="Параметр">
        <USelect v-model="selectedTiffIndicator" style="width: 150px;" placeholder="Выберите параметр" :items="codes">
        </USelect>
    </UFormField>

    <UFormField :label="`Прозрачность ${tiffOpacity}`">
        <USlider v-model="tiffOpacity" :min="0" :max="1" :step="0.1" />
    </UFormField>

    <UFormField :label="`Канал ${selectedBand}`">
        <USlider v-model="selectedBand" :min="0" :max="31" :step="1" />
    </UFormField>

    <UFormField :label="`Фильтр ${tiffFilterRange![0]}-${tiffFilterRange![1]}`">
        <USlider v-model="tiffFilterRange" :min="0" :max="5" :step="0.01" :min-steps-between-thumbs="0.1" />
    </UFormField>
</template>