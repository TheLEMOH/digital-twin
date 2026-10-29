<script setup>
import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent, VisualMapComponent } from 'echarts/components';
import { LineChart, HeatmapChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, GridComponent, LineChart, CanvasRenderer, LegendComponent, UniversalTransition, TooltipComponent, VisualMapComponent, HeatmapChart]);

const { series, selectedTime } = defineProps(['series', 'selectedTime'])

const emit = defineEmits(['click'])

const ctx = useTemplateRef('chart')
const marker = useTemplateRef('marker')

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
                const [viewWidth, viewHeight] = size.viewSize;
                const gap = 14;
                const left = point[0] + gap + w > viewWidth
                    ? Math.max(0, point[0] - w - gap)
                    : point[0] + gap;

                return [left, viewHeight - h - 28];
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

        series
    };

    myChart.setOption(option)

    function updateMarker(time) {
        const element = marker.value
        if (!element) return

        if (!time) {
            element.style.display = 'none'
            return
        }

        const x = myChart.convertToPixel({ xAxisIndex: 0 }, time)
        if (!Number.isFinite(x)) {
            element.style.display = 'none'
            return
        }

        element.style.display = 'block'
        element.style.left = `${x}px`
    }

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
        myChart.setOption({ animation: false, series: value })
        updateMarker(selectedTime)
    })

    watch(() => selectedTime, (value) => {
        updateMarker(value)
    })

    const handleResize = () => {
        myChart?.resize();
        updateMarker(selectedTime);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(ctx.value);
    updateMarker(selectedTime);

    onUnmounted(() => {
        resizeObserver.disconnect();
        myChart.dispose();
    });
})
</script>

<template>
    <div class="chart-wrap">
        <div class="chart" ref="chart"></div>
        <div v-show="selectedTime" class="marker" ref="marker"></div>
    </div>
</template>

<style scoped>
.chart-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.chart {
    width: 100%;
    height: 100%;
}

.marker {
    position: absolute;
    top: 0;
    bottom: 0;
    border-left: 2px dashed #cccccc;
    pointer-events: none;
}
</style>