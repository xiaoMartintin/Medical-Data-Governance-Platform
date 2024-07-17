import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { getDataLineage } from '../tmp/methods';

const DataDictionaryLineageGraph = ({dictionaryKey, fieldKey}) => {
    const chartRef = useRef(null);
    const [dataLineage, setDataLineage] = useState(null);

    const fetchDataLineage = async () => {
        const data = getDataLineage(dictionaryKey, fieldKey);
        setDataLineage(data);
    };

    const renderChart = (data) => {
        if (!chartRef.current) return;
        const chart = echarts.init(chartRef.current);
        chart.setOption({
            series: [{
                type: 'graph',
                layout: 'force',
                data: data.nodes,
                links: data.links,
                symbolSize: 30,
                roam: true,
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                },
                lineStyle: {
                    color: 'source',
                },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                force: {
                    repulsion: 1000,
                    edgeLength: [150, 300]
                }
            }]
        });
        window.onresize = () => chart.resize();
    };

    useEffect(() => {
        fetchDataLineage();
    }, []);

    useEffect(() => {
        if (dataLineage) {
            renderChart(dataLineage);
        }
    }, [dataLineage]);

    return (
        <div ref={chartRef} style={{height: '100%'}}></div>
    );
};

export default DataDictionaryLineageGraph;
