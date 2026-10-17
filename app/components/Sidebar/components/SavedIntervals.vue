<script setup lang="ts">
import SavedIntervalItem from './SavedIntervalItem.vue'
import SavedIntervalModal from './SavedIntervalModal.vue'
import type { SavedIntervals } from '~/composables/useSavedIntervals'

const { intervals, openModal } = inject<SavedIntervals>('savedIntervals')!
</script>

<template>
    <div class="flex flex-col gap-3">
        <USeparator label="Просмотренные промежутки"></USeparator>

        <div class="flex items-center justify-between gap-2">
            <span class="text-muted text-xs">Сохранено: {{ intervals.length }}</span>
            <UButton icon="i-lucide-plus" size="xs" label="Добавить" @click="openModal()" />
        </div>

        <div v-if="intervals.length === 0" class="text-muted text-sm">
            Сохраните просмотренный период, чтобы быстро возвращаться к нему и сравнивать
            загрязнение и инверсию.
        </div>

        <div v-else class="flex flex-col gap-2">
            <SavedIntervalItem v-for="item in intervals" :key="item.id" :item="item" />
        </div>

        <SavedIntervalModal />
    </div>
</template>
