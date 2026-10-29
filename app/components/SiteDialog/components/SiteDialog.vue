<script setup lang="ts">
import useSiteDialog from '../composables/useSiteDialog';
import useSiteDialogForm from '../composables/useSiteDialogForm';
import useSiteDialogResize from '../composables/useSiteDialogResize';
import IndicatorsList from '~/components/Indicator/components/IndicatorsList.vue';
import Line from '~/components/Chart/components/Line.vue';
import List from '~/components/List/components/List.vue';
import type { ShallowRef } from 'vue';
import type Site from '~/types/site';

const isOpenDialog = inject<Ref<boolean>>('isOpenDialog')
const sites = inject<ShallowRef<Site[]>>('sites')!

const { selectedFeature, timePeriod, setTimePeriod, chartData, value, lastData, selectedSites, mode } = useSiteDialog()
const { modelValue, display, setValidValue, tabs, modes, setValue, setValueSite } = useSiteDialogForm({ timePeriod, setTimePeriod, value, selectedSites })
const { isExpanded, contentProps, toggleExpanded, startResize, resetHeight } = useSiteDialogResize()
</script>

<template>
    <USlideover
        v-model:open="isOpenDialog"
        side="bottom"
        :modal="false"
        :overlay="false"
        :dismissible="false"
        :portal="false"
        :title="selectedFeature?.properties.name"
        :content="contentProps"
        :ui="{
            content: 'z-30 h-[34vh] border-t border-default shadow-2xl max-md:h-[70vh]',
            header: 'relative min-h-0 px-4 py-2 gap-1 sm:px-4',
            wrapper: 'min-w-0 flex-1',
            title: 'truncate text-sm font-semibold sm:text-base',
            body: 'flex-1 min-h-0 overflow-hidden p-0 sm:p-0'
        }"
    >
        <template #actions>
            <UButton
                :icon="isExpanded ? 'i-lucide-minimize-2' : 'i-lucide-maximize-2'"
                color="neutral"
                variant="ghost"
                size="sm"
                class="relative z-20"
                :aria-label="isExpanded ? 'Свернуть' : 'Развернуть на весь экран'"
                :title="isExpanded ? 'Свернуть' : 'Развернуть на весь экран'"
                @click="toggleExpanded"
            />
        </template>

        <template #close>
            <UButton
                icon="i-lucide-x"
                color="neutral"
                variant="ghost"
                size="sm"
                class="relative z-20"
                aria-label="Закрыть"
                title="Закрыть"
            />
        </template>

        <template #body>
            <div
                class="resize-handle"
                title="Потяните, чтобы изменить высоту. Двойной клик — сбросить"
                @pointerdown="startResize"
                @dblclick="resetHeight"
            >
                <span class="resize-grip" />
            </div>

            <div class="site-slider">
                <section class="panel chart-panel">
                    <h2 class="panel-title">Данные</h2>
                    <div class="chart-wrap">
                        <Line :series="chartData" />
                    </div>
                </section>

                <section class="panel settings-panel">
                    <UTabs
                        :items="tabs"
                        variant="link"
                        size="sm"
                        :ui="{
                            root: 'flex-1 min-h-0 items-stretch gap-1',
                            list: 'shrink-0',
                            content: 'flex-1 min-h-0 overflow-y-auto pe-1 pt-1'
                        }"
                    >
                        <template #indicators>
                            <IndicatorsList :items="lastData" :selected-indicator="value" @select-indicator="setValue">
                            </IndicatorsList>
                        </template>
                        <template #sites>
                            <List :items="sites" :selected="selectedSites" :valueField="'id'" @select="setValueSite">
                                <template #label="{ item }">
                                    {{ item.name }}
                                </template>
                            </List>
                        </template>
                        <template #settings>
                            <div class="settings-form">
                                <div class="setting-field">
                                    <span class="setting-label">Период</span>
                                    <UPopover>
                                        <UButton
                                            color="neutral"
                                            variant="subtle"
                                            icon="i-lucide-calendar"
                                            size="sm"
                                            class="date-button"
                                        >
                                            <span class="date-label">{{ display }}</span>
                                        </UButton>

                                        <template #content>
                                            <UCalendar v-model="modelValue" range class="p-2" @update:validModelValue="setValidValue" />
                                        </template>
                                    </UPopover>
                                </div>

                                <div class="setting-field">
                                    <span class="setting-label">Режим</span>
                                    <USelect
                                        v-model="mode"
                                        :items="modes"
                                        icon="i-lucide-sliders-horizontal"
                                        size="sm"
                                        class="mode-select"
                                        aria-label="Режим отображения"
                                    />
                                </div>
                            </div>
                        </template>
                    </UTabs>
                </section>
            </div>
        </template>
    </USlideover>
</template>

<style scoped>
.resize-handle {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 12px;
    cursor: row-resize;
    touch-action: none;
}

.resize-grip {
    width: 2.5rem;
    height: 0.25rem;
    border-radius: 9999px;
    background: var(--ui-bg-accented);
    transition: background 0.15s;
}

.resize-handle:hover .resize-grip {
    background: var(--ui-bg-inverted);
}

.site-slider {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(280px, 360px);
    gap: 0.375rem;
    height: 100%;
    min-height: 0;
}

.panel {
    background: var(--ui-bg-muted);
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    padding: 0.375rem 0.5rem;
    border-radius: 6px;
    box-sizing: border-box;
}

.chart-panel {
    gap: 0.25rem;
}

.panel-title {
    margin: 0;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 600;
    color: var(--ui-text-muted);
}

.chart-wrap {
    flex: 1;
    min-height: 0;
}

.settings-panel {
    gap: 0.5rem;
}

.settings-form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.setting-field {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
}

.setting-label {
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 500;
    color: var(--ui-text-muted);
}

.date-button {
    width: 100%;
    justify-content: flex-start;
}

.date-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.mode-select {
    width: 100%;
}

@media (max-width: 900px) {
    .site-slider {
        grid-template-columns: minmax(0, 1fr) 280px;
    }
}

@media (max-width: 767px) {
    .site-slider {
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: minmax(110px, 0.9fr) minmax(0, 1.1fr);
    }
}
</style>