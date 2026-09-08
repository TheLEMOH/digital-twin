<script setup>
import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent, MarkPointComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition, TooltipComponent, MarkPointComponent]);

const { series, selectedTime } = defineProps(['series', 'selectedTime'])

const ctx = useTemplateRef('chart')

onMounted(() => {
    const myChart = echarts.init(ctx.value);

    const option = {
        animation: false,
        tooltip: {
            transitionDuration: 0,
            trigger: 'axis',
            appendToBody: true,
            confine: true,
            triggerOn: 'mousemove',
            axisPointer: {
                type: 'line',
                lineStyle: { color: '#999', type: 'dashed' },
                label: { backgroundColor: '#6e7985' },
            },
            formatter: function (params) {
                if (!params || !params.length) return '';
                const p = Array.isArray(params) ? params[0] : params;
                const temp = p.data[0];
                const height = p.data[1];
                return `<div style="font-size:12px;"><b>${height} м</b><br/> ${temp}°C</div>`;
            }
        },
        grid: {
            left: '0px',
            right: '20px',
            top: '20px',
            bottom: '40px',
        },
        xAxis: {
            type: 'value',
            name: '°C',
            splitLine: { show: true, lineStyle: { color: '#f0f0f0' } },
        },
        yAxis: {
            type: 'value',
            name: 'м',
            splitLine: { show: true, lineStyle: { color: '#f0f0f0' } },
            axisPointer: { show: true, type: 'line', lineStyle: { color: '#999', type: 'dashed' } },
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

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(ctx.value);

    onUnmounted(() => {
        resizeObserver.disconnect();
        myChart.dispose();
    });
})
</script>

<template>
    <div class="vertical-profile">
        <div class="chart" ref="chart"></div>
    </div>
</template>

<style scoped>
.vertical-profile {
    width: 100%;
    height: 100%;
}

.chart {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
