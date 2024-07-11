import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const BarChart = ({ dataSource, text}) => {
    useRef(null);
    const chartInstanceRef = useRef(null);

    const resizeChart = () => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.resize();
        }
    };

    useEffect(() => {
        const xAxisData = dataSource.map(item => item.name)
        const seriesData = dataSource.map(item => ({name:item.name,value:item.value}));
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'cross', label: { backgroundColor: '#6a7985' } }
            },
            grid: { top: '10%', left: '1.2%', right: '1%', bottom: '3%', containLabel: true },
            xAxis: [{ type: 'category', data: xAxisData }],
            yAxis: [{ type: 'value' }],
            series: [{ data: seriesData, type: 'bar' }],
            title: { text, x: 'center' }
        };

        const chartInstance = echarts.init(document.getElementById('bar-chart'));
        chartInstance.setOption(option);

        const handleResize = () => {
            resizeChart();
        };

        window.addEventListener('resize', handleResize);

        chartInstanceRef.current = chartInstance;

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.dispose();
            }
            window.removeEventListener('resize', handleResize);
        };
    }, [dataSource, text]);

    return <div id="bar-chart" style={{ width: '100%', height: '400px' }}></div>;
};

export default BarChart;
