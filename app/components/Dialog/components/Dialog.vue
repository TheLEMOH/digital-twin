<script setup lang="js">
import Line from '~/components/Chart/components/LineGFS.vue';
import useDialog from '../composables/useDialog';
import IndicatorsList from '~/components/Indicator/components/IndicatorsList.vue';

const isOpen = inject('isOpenDialogGFS')
const gfsData = inject('gfsData')

const { chartData, indicators } = useDialog()

</script>

<template>
    <UModal fullscreen :title="'Данные GFS'" v-model:open="isOpen">
        <template #body>
            <div class="dialog">
                <div class="chart-wrapper">
                    <Line :series="chartData['temp']"></Line>
                    <Line :series="chartData['temp']"></Line>
                </div>
                <div class="wrapper">
                    <IndicatorsList :items="indicators"></IndicatorsList>
                </div>
            </div>
        </template>
    </UModal>
</template>

<style scoped>
.wrapper {
    background: var(--ui-color-neutral-950);
    width: 100%;
    padding: 0.5rem;
    border-radius: 6px;
}

.chart-wrapper {
    background: var(--ui-color-neutral-950);
    width: 100%;
    padding: 0.5rem;
    border-radius: 6px;
    display: flex;
    gap: 0.5rem;
}


.dialog {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 400px;
    grid-template-rows: 1fr;
    height: 500px;
    gap: 0.5rem;
}
</style>