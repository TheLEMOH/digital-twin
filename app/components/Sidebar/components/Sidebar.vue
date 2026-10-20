<script setup lang="ts">
import Settings from './Settings.vue'
import SavedIntervals from './SavedIntervals.vue'

const open = inject<Ref<boolean>>('isOpenSidebar')

const tabs = [
    { label: 'Промежутки', slot: 'intervals', icon: 'i-lucide-history' },
    { label: 'Настройки', slot: 'settings', icon: 'i-lucide-settings' }
]

</script>

<template>
    <USlideover :overlay="false" :dismissible="false" :modal="false" :title="'Меню'" v-model:open="open">
        <template #body>
            <UTabs :items="tabs" :ui="{ content: 'mt-4' }">
                <template #settings>
                    <Settings />
                </template>

                <template #intervals>
                    <SavedIntervals />
                </template>
            </UTabs>
        </template>
    </USlideover>
</template>
