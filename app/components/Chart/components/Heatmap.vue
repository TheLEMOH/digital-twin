<script setup>
import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent, VisualMapComponent, MarkLineComponent } from 'echarts/components';
import { LineChart, HeatmapChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, GridComponent, LineChart, CanvasRenderer, LegendComponent, UniversalTransition, TooltipComponent, VisualMapComponent, HeatmapChart, MarkLineComponent]);

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

function applyMarkLine(seriesValue, time) {
    const mark = makeMarkLine(time)
    return seriesValue.map((s, i) => ({ ...s, id: `inv-series-${i}`, markLine: mark.length ? { symbol: 'none', data: mark } : undefined }))
}

function markLineOnly(time) {
    const mark = makeMarkLine(time)
    if (!mark.length) return []
    return series.map((s, i) => ({
        id: `inv-series-${i}`,
        markLine: { symbol: 'none', data: mark }
    }))
}

const ctx = useTemplateRef('chart')

onMounted(() => {
    const myChart = echarts.init(ctx.value);

    const option = {
        animation: false,
        tooltip: {
            trigger: 'axis',
            appendToBody: true,
            transitionDuration: 0,
            position: (point, params, dom, rect, size) => {
                const [w, h] = size.contentSize;
                return [point[0] + 14, size.viewSize[1] - h - 28];
            },
            textStyle: { fontSize: 12 },
            formatter: (p) => {
                const items = p.filter(d => d.data[2] != null);

                if (!items.length) return '';

                const time = items[0].data[0]
                const rows = items
                    .map(d => `<div style="display:flex;justify-content:space-between;gap:16px;white-space:nowrap;">
                        <span>${d.data[1]}м</span>
                        <span>${d.data[2].toFixed(2)}°C</span></div>`)
                    .join('');
                const sum = p.at(-1)?.data[1]
                const sumRow = sum != null
                    ? `<div style="display:flex;justify-content:space-between;margin-top:4px;padding-top:4px;border-top:1px solid #e0e0e0;font-weight:600;white-space:nowrap;">
                        <span>Сумма</span>
                        <span>${Number(sum).toFixed(2)}°C</span></div>`
                    : '';
                return `<b style="white-space:nowrap;">${time}</b><br/>${rows}${sumRow}`;
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

        series: applyMarkLine(series, selectedTime)
    };

    myChart.setOption(option)

    myChart.getZr().on('click', (params) => {
        const pointInPixel = [params.offsetX, params.offsetY];
        const pointInGrid = myChart.convertFromPixel('grid', pointInPixel);
        const hourIndex = Math.round(pointInGrid[0]);
        const hourData = series.find(s => s.type === 'line')?.data;
        const value = hourData?.[hourIndex]?.[0];
        if (value != null) {
            emit('click', value)
        }
    })

    watch(() => series, (value) => {
        myChart.setOption({ animation: false, series: applyMarkLine(value, selectedTime) })
    })

    watch(() => selectedTime, (value) => {
        const updates = markLineOnly(value)
        if (updates.length) {
            myChart.setOption({ animation: false, series: updates })
        }
    })

    const handleResize = () => {
        myChart?.resize();
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

}
</style>