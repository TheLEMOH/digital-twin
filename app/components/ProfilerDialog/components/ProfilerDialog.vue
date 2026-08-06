<script setup lang="ts">
import Line from '~/components/Chart/components/Line.vue';
import useProfilerDialog from '../composables/useProfilerDialog';
import Heatmap from '~/components/Chart/components/Heatmap.vue';

const openDialogProfiler = inject<Ref<boolean>>('openDialogProfiler')

const { profilerChart, inversionChart } = useProfilerDialog()

</script>

<template>
    <UModal v-model:open="openDialogProfiler" fullscreen title="Температурный профилемер">
        <template #body>
            <div class="parent">
                <Line :series="profilerChart" class="div2"></Line>
                <Heatmap :series="inversionChart" class="div3"></Heatmap>
            </div>
        </template>
    </UModal>
</template>

<style scoped>
.parent {
    display: grid;
    height: 100%;
    grid-template-columns: 400px 1fr;
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
}

.div1 {
    grid-area: 1 / 1 / 3 / 2;
}

.div2 {
    grid-area: 1 / 2 / 2 / 3;
}

.div3 {
    grid-area: 2 / 2 / 3 / 3;
}
</style>