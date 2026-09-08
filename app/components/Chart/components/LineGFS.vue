<script setup>
import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent, MarkLineComponent, LegendComponent, TitleComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, GridComponent, LineChart, CanvasRenderer, LegendComponent, UniversalTransition, TooltipComponent, MarkLineComponent]);

const { series } = defineProps(['series'])

const ctx = useTemplateRef('chart')

onMounted(() => {
    const myChart = echarts.init(ctx.value);

    const option = {
        tooltip: {
            trigger: 'axis',
            appendToBody: true,

        },
        grid: {
            left: '10px',
            right: '0px',
            top: '10px',
            bottom: '0px',
        },
        xAxis: {
            splitLine: {
                lineStyle: {
                    color: '#ffffff'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#ffffff'
                }
            },
            type: 'value',
        },
        yAxis: {
            splitLine: {
                lineStyle: {
                    color: '#ffffff'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#ffffff'
                }
            },

            type: 'value'
        },
        series: series
    };

    myChart.setOption(option)

    watch(() => series, (value) => {
        myChart.setOption({ series: value })
    })

    const resizeObserver = new ResizeObserver(() => {
        myChart.resize();
    });
    resizeObserver.observe(ctx.value);

    onUnmounted(() => {
        resizeObserver.disconnect();
        myChart.dispose();
    });
})

</script>

<template>
    <div class="chart" ref="chart"></div>
</template>

<style scoped>
.chart {
    width: 100%;
    height: 100%;
    overflow: hidden;
}</style>