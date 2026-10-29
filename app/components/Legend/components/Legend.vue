<script setup lang="ts">
import useLegend from '../composables/useLegend';

const scheme: Ref<[number, string]> = useLegend()

</script>

<template>
    <div class="legend">
        <template v-for="(item, index) in scheme">
            <div class="legend-item" v-if="index % 2 == 0">
                <div class="color" :style="{ background: scheme[index + 1] }"></div>
                {{ scheme[index] }}
            </div>
        </template>
    </div>

</template>

<style scoped>
.color {
    width: 15px;
    height: 15px;
}

.legend-item {
    display: flex;
    gap: 5px;
    align-items: center;
}

.legend {
    color: #ffffff;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    position: absolute;
    padding: 5px;
    margin: 0.5rem;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
    bottom: calc(var(--timeline-height) + 2px);
    right: 0px;
}
</style>