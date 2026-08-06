<script setup lang="ts">
import type Indicator from '~/types/indicator';

interface Props {
    items: Indicator[] | undefined
    selectedIndicator: string[]
}

const { items, selectedIndicator } = defineProps<Props>()

const emits = defineEmits(['select-indicator'])

const groupItems = computed(() => {
    return items?.map(item => {
        return {
            label: `${item.name}` || `Не указано`,
            meaning: `${item.value}`,
            value: item.code
        }
    })
})

const value = computed({
    get() {
        return selectedIndicator
    },

    set(v) {
        if (v.length > 0)
            emits('select-indicator', v)
    }
})

</script>

<template>
    <div class="indicators">
        <UCheckboxGroup v-model="value" :items="groupItems">
            <template #label="{ item }">
                <div class="flex justify-between">
                    <span>{{ item.label }}</span>
<!--                     <span>{{ item.meaning }}</span> -->
                </div>
            </template>
        </UCheckboxGroup>
    </div>
</template>

<style scoped>
.indicators {
    display: flex;
    flex-direction: column;
    z-index: 1;
    gap: 5px;
}
</style>