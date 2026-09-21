<script setup>
import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent, MarkLineComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { DataZoomComponent } from 'echarts/components';
import { ToolboxComponent } from 'echarts/components';

echarts.use([GridComponent, LineChart, CanvasRenderer, MarkLineComponent, UniversalTransition, TooltipComponent, DataZoomComponent, ToolboxComponent]);

const { series, selectedTime } = defineProps(['series', 'selectedTime'])
const emit = defineEmits(['click'])

function makeMarkLine(time) {
    if (!time) return [];
    return [{
        xAxis: time,
        lineStyle: {
            color: '#cccccc',
            width: 2,
            type: 'dashed'
        },
        label: {
            show: true,
            formatter: '{b}',
            position: 'insideEndTop',
            color: '#d33',
            fontSize: 10
        }
    }];
}

const ctx = useTemplateRef('chart')

onMounted(() => {
    const myChart = echarts.init(ctx.value);

    const option = {
        animation: false,
        tooltip: {
            trigger: 'axis',
            appendToBody: true,
            confine: true,
            padding: [4, 8],
            transitionDuration: 0,
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
            bottom: '25px',
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
        series: applyMarkLine(series, selectedTime)
    };

    myChart.setOption(option)

    myChart.getZr().on('click', (params) => {
        const MS_IN_HOUR = 3600000;

        const pointInPixel = [params.offsetX, params.offsetY];
        const pointInGrid = myChart.convertFromPixel('grid', pointInPixel);
        const x = new Date(pointInGrid[0])
        const time = new Date(Math.round(x / MS_IN_HOUR) * MS_IN_HOUR)

        if (time) {
            emit('click', time.toLocaleString('sv-SE'))
        }
    })

    watch(() => selectedTime, (value) => {
        const updates = markLineOnly(value)
        if (updates.length) {
            myChart.setOption({ series: updates })
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

        myChart.setOption({ ...option, ...yAxis, series: applyMarkLine(value, selectedTime) }, true)
    })

    function applyMarkLine(seriesValue, time) {
        const mark = makeMarkLine(time)
        return seriesValue.map((s, i) => ({ ...s, id: `line-series-${i}`, markLine: mark.length ? { symbol: 'none', data: mark } : undefined }))
    }

    function markLineOnly(time) {
        const mark = makeMarkLine(time)
        if (!mark.length) return []
        return series.map((s, i) => ({
            id: `line-series-${i}`,
            markLine: { symbol: 'none', data: mark }
        }))
    }

    const handleResize = () => {
        requestAnimationFrame(() => {
            myChart?.resize();
        });
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
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
}
</style>