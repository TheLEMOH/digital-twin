<script setup>
import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent, VisualMapComponent } from 'echarts/components';
import { LineChart, HeatmapChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, GridComponent, LineChart, CanvasRenderer, LegendComponent, UniversalTransition, TooltipComponent, VisualMapComponent, HeatmapChart]);

const { series } = defineProps(['series'])

const ctx = useTemplateRef('chart')

onMounted(() => {
    const myChart = echarts.init(ctx.value);

    const option = {
        tooltip: {
            trigger: 'axis',
            formatter: (p) => {
                const items = p.filter(d => d.data[2] != null);
                if (!items.length) return '';
                const time = items[0].data[0]
                const rows = items.sort((a, b) => a.data[1] - b.data[1])
                    .map(d => `${d.data[1]}м: ${d.data[2]}°C`).join('<br/>');
                return `<b>${time}</b><br/>${rows}`;
            }
        },
        grid: {
            left: '10px',
            right: '0px',
            top: '10px',
            bottom: '0px',
        },
        xAxis: {
            type: 'category',
            splitLine: { show: true }
        },
        yAxis: {
            type: 'category',
            splitLine: { show: true }
        },
        legend: { show: false },
        visualMap: {
            show: false,
            min: 0,
            max: 5,
            calculable: true,
            realtime: false,
            inRange: {
                color: [
                    '#313695',
                    '#4575b4',
                    '#74add1',
                    '#abd9e9',
                    '#e0f3f8',
                    '#ffffbf',
                    '#fee090',
                    '#fdae61',
                    '#f46d43',
                    '#d73027',
                    '#a50026'
                ]
            }
        },

        series: series
    };

    myChart.setOption(option)

    watch(() => series, (value) => {
        myChart.setOption({ series: value })
    })

    const handleResize = () => {
        requestAnimationFrame(() => {
            myChart?.resize();
        });
    };

    window.addEventListener('resize', async function () {
        handleResize()
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
}
</style>