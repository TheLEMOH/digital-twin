<script setup lang="ts">
import colorer from '~/core/colorer'
import type { MeteoSummary, SavedInterval } from '~/types/calculation'
import type { SavedIntervals } from '~/composables/useSavedIntervals'
import type SelectedDates from '~/types/selectedDates'
import type { ShallowRef } from 'vue'

interface Props {
    item: SavedInterval
}

type Badge = {
    label: string
    code: string
    value: number
    units?: string
}

const DAY_MS = 86_400_000

const { item } = defineProps<Props>()

const savedIntervals = inject<SavedIntervals>('savedIntervals')!
const selectedDates = inject<ShallowRef<SelectedDates>>('selectedDates')

const isActive = computed(() =>
    selectedDates?.value?.start.toString() === item.dateFrom
    && selectedDates?.value?.end.toString() === item.dateTo
)

const days = computed(() =>
    Math.floor((new Date(item.dateTo).getTime() - new Date(item.dateFrom).getTime()) / DAY_MS) + 1
)

const inversion = computed(() => {
    const value = Number(item.inversion ?? 0)
    return +value.toFixed(2)
})

const toBadges = (meteo: MeteoSummary): Badge => {
    const value = meteo.value?.avg || 0

    return {
        label: meteo.name || '',
        code: meteo.code || '',
        value,
        units: meteo.units
    }
}

const badges = computed(() => (item.meteo ?? []).flatMap(toBadges))

const badgeStyle = (badge: Badge) => {
    const background = colorer.paintSelf(badge.code, badge.value)
    return { background, color: `contrast-color(${background})` }
}

const formatDate = (value: string) => new Date(value).toLocaleDateString('ru-RU')

const remove = () => savedIntervals.removeInterval(item.id)

</script>

<template>
    <div class="saved-interval" :class="{ 'saved-interval--active': isActive }"
        @click="savedIntervals.loadInterval(item)">
        <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
                <h3 class="text-sm font-medium truncate">{{ item.name }}</h3>
                <span class="text-muted text-xs">
                    {{ formatDate(item.dateFrom) }} - {{ formatDate(item.dateTo) }}
                    <UKbd size="sm">{{ days }} дн.</UKbd>
                </span>
            </div>

            <div class="flex gap-1" @click.stop>
                <UButton icon="i-lucide-pencil" color="neutral" variant="ghost" size="xs"
                    @click="savedIntervals.openModal(item)" />

                <UPopover :ui="{ content: 'p-3 flex flex-col gap-2' }">
                    <UButton icon="i-lucide-trash-2" color="error" variant="ghost" size="xs" />

                    <template #content>
                        <span class="text-sm">Удалить промежуток?</span>
                        <div class="flex justify-end gap-2">
                            <UButton size="xs" color="neutral" variant="ghost" label="Отмена" />
                            <UButton size="xs" color="error" label="Удалить" @click="remove" />
                        </div>
                    </template>
                </UPopover>
            </div>
        </div>

        <div class="flex flex-wrap gap-1">
            <UKbd v-for="badge in badges" :key="badge.code" size="md" :style="badgeStyle(badge)">
                {{ badge.label }} {{ badge.value }} {{ badge.units }}
            </UKbd>

            <UKbd size="md">
                Инверсия {{ inversion }} °C
            </UKbd>
        </div>

        <p v-if="item.description" class="text-muted text-xs whitespace-pre-wrap">
            {{ item.description }}
        </p>

        <details v-if="item.summary" class="summary" @click.stop>
            <summary class="summary__toggle">Текстовая сводка</summary>
            <p class="summary__text">{{ item.summary }}</p>
        </details>
    </div>
</template>

<style scoped>
.saved-interval {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.6rem;
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius);
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
}

.saved-interval:hover {
    background: var(--ui-bg-muted);
}

.saved-interval--active {
    border-color: var(--ui-primary);
}

.summary {
    padding-top: 0.5rem;
    border-top: 1px solid var(--ui-border);
}

.summary__toggle {
    color: var(--ui-text-muted);
    font-size: 0.75rem;
    cursor: pointer;
    user-select: none;
}

.summary__text {
    margin-top: 0.5rem;
    color: var(--ui-text-muted);
    font-size: 0.75rem;
    line-height: 1.5;
    white-space: pre-line;
}
</style>
