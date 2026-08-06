<script setup lang="ts">
import type { ShallowRef } from 'vue';

const selectedSiteGroup = inject<ShallowRef<[string]>>('selectedSiteGroup')

const codes = [{ label: 'Министерство', value: 'm' }, { label: 'КНЦ', value: 's' }]
</script>

<template>
    <USeparator label="Настройки постов мониторинга"></USeparator>
    
    <UFormField label="Параметр">
        <USelect v-model="selectedSiteGroup" style="width: 150px;" placeholder="Выберите группу постов" multiple
            :items="codes">
        </USelect>
    </UFormField>
</template>