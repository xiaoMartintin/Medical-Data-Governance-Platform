import React, {useEffect, useRef} from 'react';
import * as echarts from 'echarts';

const PieChart = ( {seriesData} ) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const resizeChart = () => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.resize();
        }
    };
    useEffect(() => {
        const chart = echarts.init(document.getElementById('pie-chart'));
        const option = {
            title: {
                text: '饼状图',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 10,
                data: seriesData.map(item => item.name)
            },
            series: [
                {
                    name: '数据源',
                    type: 'pie',
                    radius: '50%',
                    data: seriesData.map(item => ({name:item.name,value:item.value}))
                }
            ]
        };
        chart.setOption(option);
        const handleResize = () => {
            resizeChart();
        };

        window.addEventListener('resize', handleResize);

        chartInstanceRef.current = chart;

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.dispose();
            }
            window.removeEventListener('resize', handleResize);
        };

    }, []);


    return (
        <div id="pie-chart" style={{ width: '100%', height: '400px' }}></div>
    );
}

export default PieChart;
