<script setup>
import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent, MarkLineComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { DataZoomComponent } from 'echarts/components';
import { ToolboxComponent } from 'echarts/components';

echarts.use([GridComponent, LineChart, CanvasRenderer, MarkLineComponent, UniversalTransition, TooltipComponent, DataZoomComponent, ToolboxComponent]);

const { series } = defineProps(['series'])
const emit = defineEmits(['click'])

const ctx = useTemplateRef('chart')

onMounted(() => {
    const myChart = echarts.init(ctx.value);

    const option = {
        animation: false,
        tooltip: {
            trigger: 'axis',
            confine: true,
            padding: [4, 8],
            textStyle: { fontSize: 12 },
            borderWidth: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            formatter: function (params) {
                if (!params || !params.length) return '';
                const time = params[0].data[0];
                let html = `<div style="font-weight:600;font-size:12px;margin-bottom:4px;">${time}</div>`;
                params.forEach((p) => {
                    html += `<div style="display:flex;justify-content:space-between;gap:24px;font-size:12px;line-height:1.6;">
                    <span>${p.marker} ${p.seriesName}</span>
                    <span style="font-weight:500;">${p.data[1]}</span>
                </div>`;
                });
                return html;
            }
        },
        grid: {
            left: '10px',
            right: '10px',
            top: '10px',
            bottom: '40px',
            lineStyle: {
                color: '#e0e0e0',
                width: 1,
                type: 'solid'
            }
        },
        xAxis: [
            {
                type: 'time',
                splitLine: { show: true, lineStyle: { color: '#f0f0f0' } }
            },
        ],
        /* dataZoom: [
            {
                type: 'slider',
                xAxisIndex: 'all',
                throttle: 120
            },
            {
                type: 'inside',
                realtime: true,
            }
        ], */
        yAxis: [
            {
                type: 'value',
                splitLine: { show: true, lineStyle: { color: '#f0f0f0' } }
            },
        ],
        series: series
    };

    myChart.setOption(option)

    myChart.on('click', (params) => {
        if (params && params.data) {
            emit('click', params.data[0])
        }
    })

    watch(() => series, (value) => {
        const yAxis = value.map(v => {
            return {
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: { color: '#f0f0f0' },
                }
            }
        })

        const xAxis = value.map(v => {
            return {
                type: 'time',
            }
        })

        option.yAxis = yAxis
        option.xAxis = xAxis

        myChart.setOption({ ...option, ...yAxis, series: value }, true)
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