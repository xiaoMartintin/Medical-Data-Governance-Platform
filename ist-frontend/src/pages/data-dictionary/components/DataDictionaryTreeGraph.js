import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const DataDictionaryTreeGraph = ({dictionaries}) => {
    const chartRef = useRef(null);

    const dictionariesToGraph = (dictionaries) => {
        return {
            name: 'Dictionaries',
            children: dictionaries.map((dictionary) => ({
                name: dictionary.name,
                children: Array.from(new Set(dictionary.fields.map(field => field.table))).map(table => ({
                    name: table,
                    children: dictionary.fields.filter(field => field.table === table).map(field => ({
                        name: field.name
                    }))
                }))
            }))
        };
    };

    const renderChart = (data) => {
        if (!chartRef.current) return;
        const chart = echarts.init(chartRef.current);
        chart.setOption({
            series: [{
                type: 'tree',
                data: [data],
                symbolSize: 20,
                label: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 18
                },
                leaves: {
                    label: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                },
                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750
            }]
        });
        window.onresize = () => chart.resize();
    };

    useEffect(() => {
        const graphData = dictionariesToGraph(dictionaries);
        // const graphData = dictionariesToGraph(initialDictionaries);
        // console.log(graphData);
        renderChart(graphData);
    }, [dictionaries]);

    return (
        <div ref={chartRef} style={{height: '100%'}}></div>
    );
};

export default DataDictionaryTreeGraph;
