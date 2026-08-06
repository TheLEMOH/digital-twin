<script setup lang="ts">

const pollution = [
    { label: 'Сначала загрязненные', value: '1' },
    { label: 'Сначала чистые', value: '3' },
    { label: 'Наибольшая инверсия', value: '4' },
    { label: 'Наименьшая инверсия', value: '5' },
    { label: 'По дате', value: '6' }
]
const selectedPollution = ref('1')

</script>

<template>
    <div class="flex mb-2 gap-1 justify-end">
        <UFormField label="Наименование">
            <UInput></UInput>
        </UFormField>
        <UFormField label="Сортировка">
            <USelect class="w-50" v-model="selectedPollution" :items="pollution"></USelect>
        </UFormField>
    </div>
</template>