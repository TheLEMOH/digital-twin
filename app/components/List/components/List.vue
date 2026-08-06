<script setup lang="ts">

interface Props {
    items: any[]
    selected?: number[]
    valueField: string
}

const { items, selected, valueField } = defineProps<Props>()

const emits = defineEmits(['select'])

const groupItems = computed(() => {
    return items?.map(item => {
        return {
            ...item,
            value: item[valueField]
        }
    })
})

const value = computed({
    get() {
        return selected
    },

    set(v) {
        if (v!.length > 0)
            emits('select', v)
    }
})

</script>

<template>
    <div class="list">
        <UCheckboxGroup v-model="value" :items="groupItems">
            <template #label="{ item }">
                <div class="flex justify-between">
                    <slot name="label" :item="item"></slot>
                </div>
            </template>
        </UCheckboxGroup>
    </div>
</template>

<style scoped>
.list {
    display: flex;
    flex-direction: column;
    bottom: 58px;
    z-index: 2;
    gap: 5px;
}

.list-item {
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    border-radius: 12px;
    padding: 0 1rem 0 1rem;
    transition: background 0.2s;

}

.selected-item {
    background-color: var(--ui-color-secondary-500) !important;
}

.indicator:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.7);
}
</style>