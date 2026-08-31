<script setup lang="ts">
import type { ShallowRef } from 'vue';
import type Indicator from '~/types/indicator';

interface Props {
    items: Indicator[]
}

const { items } = defineProps<Props>()

const selectedIndicator = inject<ShallowRef<Indicator>>('selectedIndicator')!
const openDialogProfiler = inject<ShallowRef<boolean>>('openDialogProfiler')!

const open = () => {

    openDialogProfiler.value = true

    if (document.activeElement) {
        document.activeElement.blur();
    }
}

const value = computed({
    get() {
        return selectedIndicator?.value.code
    },

    set(newValue) {
        const finded = items.find(i => i.code == newValue)
        selectedIndicator.value = finded || { code: 'm-t' }
    }
})

</script>

<template>
    <div class="indicators">
        <UTooltip text="Данные профилемера" :delay-duration="0" :content="{ side: 'top' }">
            <UButton icon="i-lucide-chart-column" @click="open"></UButton>
        </UTooltip>
        <USelect v-model="value" :items="items" value-key="code" label-key="name" style="width: 300px;">
            <template #item="{ item }">
                {{ item.name }} ({{ item.units }})
            </template>
        </USelect>
        <!--   <template v-for="item in items">
            <div :class="['indicator', selectedIndicator?.code == item.code ? 'selected-indicator' : '']"
                @click="selectedIndicator = item">
                <span>{{ item.name }} ({{ item.units }})</span>
            </div>
        </template> -->
    </div>
</template>

<style scoped>
.indicators {
    display: flex;
    position: absolute;
    bottom: 58px;
    z-index: 2;
    padding: 0.5rem;
    gap: 5px;
}

.indicator {
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    border-radius: 12px;
    padding: 0 1rem 0 1rem;
    transition: background 0.2s;

}

.selected-indicator {
    background-color: var(--ui-color-secondary-500) !important;
}

.indicator:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.7);
}
</style>