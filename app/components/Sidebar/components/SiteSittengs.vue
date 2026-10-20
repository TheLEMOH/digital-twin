<script setup lang="ts">
import { SITE_GROUPS } from '~/core/siteGroups'
import type { ShallowRef } from 'vue';

const selectedSiteGroup = inject<ShallowRef<string[]>>('selectedSiteGroup')
</script>

<template>
    <USeparator label="Настройки постов мониторинга"></USeparator>
    
    <UFormField label="Параметр">
        <USelect v-model="selectedSiteGroup" style="width: 150px;" placeholder="Выберите группу постов" multiple
            :items="SITE_GROUPS">
        </USelect>
    </UFormField>
</template>