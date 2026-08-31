<script setup>
import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent, VisualMapComponent } from 'echarts/components';
import { LineChart, HeatmapChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, GridComponent, LineChart, CanvasRenderer, LegendComponent, UniversalTransition, TooltipComponent, VisualMapComponent, HeatmapChart]);

const { series } = defineProps(['series'])
const emit = defineEmits(['click'])

const ctx = useTemplateRef('chart')

onMounted(() => {
    const myChart = echarts.init(ctx.value);

    const option = {
        tooltip: {
            trigger: 'axis',
            appendToBody: true,
            confine: true,
            textStyle: { fontSize: 12 },
            formatter: (p) => {
                const items = p.filter(d => d.data[2] != null);

                if (!items.length) return '';

                const time = items[0].data[0]
                const rows = items
                    .map(d => `<div style="display:flex;justify-content:space-between;">
                        <span>${d.data[1]}м</span>
                        <span>${d.data[2].toFixed(2)}°C</span></div>`)
                    .join('');
                const sum = p.at(-1)?.data[1]
                const sumRow = sum != null
                    ? `<div style="display:flex;justify-content:space-between;margin-top:4px;padding-top:4px;border-top:1px solid #e0e0e0;font-weight:600;">
                        <span>Сумма</span>
                        <span>${Number(sum).toFixed(2)}°C</span></div>`
                    : '';
                return `<b>${time}</b><br/>${rows}${sumRow}`;
            }
        },
        grid: {
            left: '10px',
            right: '10px',
            top: '0px',
            bottom: '0px',
        },
        xAxis: {
            type: 'category',
            splitLine: { show: true, lineStyle: { color: '#f0f0f0' } }
        },
        yAxis: [
            {
                type: 'category',
                splitLine: { show: true, lineStyle: { color: '#f0f0f0' } }
            },
            {
                type: 'value',
                show: false,
                min: 0,
            }
        ],
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

    myChart.on('click', (params) => {
        if (params && params.data) {
            emit('click', params.data[0])
        }
    })

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