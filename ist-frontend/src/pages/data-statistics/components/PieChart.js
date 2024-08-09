import React, {useEffect, useRef} from 'react';
import * as echarts from 'echarts';
import { v4 as uuidv4 } from 'uuid';

const PieChart = ( {seriesData, text} ) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const id = useRef(uuidv4());

    const resizeChart = () => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.resize();
        }
    };
    useEffect(() => {
        const chart = echarts.init(document.getElementById(id.current));
        const option = {
            title: {
                text: text,
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            /*legend: {
                orient: 'vertical',
                left: 10,
                data: seriesData.map(item => item.name)
            },*/
            legend: {
                right: 10,
                bottom: 10,
                type: 'scroll',
                pageIconColor: 'black',
                pageButtonItemGap: 5,
                pageTextStyle: {
                    color: 'black',
                    fontSize: 12
                },
                pageIconInactiveColor: 'gray',
                data:seriesData.map(item => item.name)
            },
            series: [
                {
                    name: '病种',
                    type: 'pie',
                    radius: '50%',
                    data: seriesData
                        .filter(item => item.value !== 0)
                        .map(item => ({name:item.name,value:item.value})),
                    label: {
                        formatter: function(params) {
                            if (params.value === 0) {
                                return '';
                            } else {
                                return params.name + ': ' + params.value;
                            }
                        }
                    },
                    // labelLine: {
                    //     show: true,
                    //     formatter: function(params) {
                    //         return {
                    //             show: params.value !== 0
                    //         };
                    //     }
                    // }
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

    }, [seriesData]);


    return (
        <div id={id.current} style={{ width: '100%', height: '400px' }}></div>
    );
}

export default PieChart;
