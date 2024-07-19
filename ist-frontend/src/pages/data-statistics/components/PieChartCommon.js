import React, {useEffect, useRef} from 'react';
import * as echarts from 'echarts';

/*const PieChartCommon = ( {seriesData,elementName,seriesName } ) => {
    const chartInstanceRef = useRef(null);

    const resizeChart = () => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.resize();
        }
    };
    useEffect(() => {
        chartInstanceRef.current = echarts.init(document.getElementById(elementName));
        const chart =  echarts.init(document.getElementById(elementName));
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
                    name: seriesName,
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
        <div id={elementName} key={elementName} style={{ width: '100%', height: '400px' }}></div>
    );
}*/
const PieChartCommon  = ( {seriesData,elementName,seriesName, chartRef, chartInstance} ) => {
    const resizeChart = () => {
        if (chartInstance.current) {
            chartInstance.current.resize();
        }
    };
    useEffect(() => {
        const chart = echarts.init(document.getElementById(elementName));
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
                        name: seriesName,
                        type: 'pie',
                        radius: '50%',
                        data: seriesData.map(item => ({name:item.name,value:item.value}))
                    }
                ]
            };
            chart.setOption(option);

            const handleResize = () => resizeChart();
            window.addEventListener('resize', handleResize);

            chartInstance.current = chart;

            return () => {
                if (chartInstance.current) {
                    chartInstance.current.dispose();
                }
                window.removeEventListener('resize', handleResize);
            };
        });

    return (
        <div>
            <div key={elementName} id={elementName}ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
        </div>
    );
}
export default PieChartCommon;
