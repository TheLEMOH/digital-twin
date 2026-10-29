<script setup lang="ts">
import Settings from './Settings.vue'
import SavedIntervals from './SavedIntervals.vue'

const open = inject<Ref<boolean>>('isOpenSidebar')!

const tabs = [
    { label: 'Промежутки', slot: 'intervals', icon: 'i-lucide-history' },
    { label: 'Настройки', slot: 'settings', icon: 'i-lucide-settings' }
]
</script>

<template>
    <aside class="sidebar" :class="{ 'sidebar--open': open }">
        <div class="sidebar-inner">
            <div class="sidebar-header">
                <h2 class="sidebar-title">Меню</h2>
                <UButton
                    icon="i-lucide-x"
                    color="neutral"
                    variant="ghost"
                    size="sm"
                    aria-label="Закрыть меню"
                    title="Закрыть меню"
                    @click="open = false"
                />
            </div>

            <div class="sidebar-body">
                <UTabs :items="tabs" :ui="{ content: 'mt-4' }">
                    <template #settings>
                        <Settings />
                    </template>

                    <template #intervals>
                        <SavedIntervals />
                    </template>
                </UTabs>
            </div>
        </div>
    </aside>
</template>

<style scoped>
.sidebar {
    flex: 0 0 auto;
    width: 0;
    height: 100%;
    overflow: hidden;
    background: var(--ui-bg);
    border-left: 1px solid transparent;
    transition: width 0.25s ease, border-color 0.25s ease;
}

.sidebar--open {
    width: 400px;
    border-left-color: var(--ui-border);
}

.sidebar-inner {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 100%;
}

.sidebar-header {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem 0.5rem 1rem;
    border-bottom: 1px solid var(--ui-border);
}

.sidebar-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--ui-text-highlighted);
}

.sidebar-body {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding: 1rem;
}
</style>
