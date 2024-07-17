import React, { useEffect, useRef } from 'react';
import { initialDictionaries } from '../tmp/data.js';
import * as echarts from 'echarts';

const DataDictionaryStarGraph = ({dictionaries}) => {
    const chartRef = useRef(null);

    const dictionariesToGraph = (dictionaries) => {
        let nodes = [];
        let links = [];
        let tableMap = new Map();
        let fieldMap = new Map();

        dictionaries.forEach((dictionary, dictionaryIndex) => {
            nodes.push({
                id: `dictionary-${dictionaryIndex}`,
                name: dictionary.name,
                category: 'dictionary',
                draggable: true,
                symbolSize: 40,
                itemStyle: {
                    color: generateColor(dictionary.name)
                },
                value: dictionary.description
            });

            dictionary.fields.forEach(({name: fieldName, table: tableName}) => {
                let tableId;
                if (tableMap.has(tableName)) {
                    tableId = tableMap.get(tableName);
                } else {
                    tableId = `table-${nodes.length}`;
                    tableMap.set(tableName, tableId);
                    nodes.push({
                        id: tableId,
                        name: tableName,
                        category: 'table',
                        draggable: true,
                        symbolSize: 25,
                        itemStyle: {
                            color: generateColor(tableName)
                        },
                        value: 'Table',
                    });
                    links.push({
                        source: `dictionary-${dictionaryIndex}`,
                        target: tableId,
                    });
                }

                let fieldId;
                // if (fieldMap.has(fieldName)) {
                //     fieldId = fieldMap.get(fieldName);
                // } else {
                    fieldId = `field-${nodes.length}`;
                    fieldMap.set(fieldName, fieldId);
                    nodes.push({
                        id: fieldId,
                        name: fieldName,
                        category: 'field',
                        draggable: true,
                        symbolSize: 13,
                        itemStyle: {
                            color: '#798698'
                        },
                        value: 'Field',
                    });
                // }
                links.push({
                    source: tableId,
                    target: fieldId,
                });
            });
        });
        return {nodes, links};
    };

    const renderChart = (graphData) => {
        if (!chartRef.current) return;
        const chart = echarts.init(chartRef.current);
        chart.setOption({
            tooltip: {},
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    data: graphData.nodes,
                    links: graphData.links,
                    categories: [{name: 'dictionary'}, {name: 'field'}],
                    roam: true,
                    label: {
                        show: true,
                        position: 'right',
                        formatter: '{b}',
                        fontSize: 15,
                        textStyle: {
                            color: '#798698',
                            fontWeight: 'bold'
                        }
                    },
                    force: {
                        repulsion: 1000,
                        edgeLength: [150, 300]
                    }
                }
            ]
        });
        window.onresize = () => chart.resize();
    };

    const generateColor = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 4) - hash);
        }

        let color = '#';
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xFF;
            color += ('00' + value.toString(16)).substr(-2);
        }

        return color;
    };

    useEffect(() => {
        const graphData = dictionariesToGraph(dictionaries);
        // const graphData = dictionariesToGraph(initialDictionaries);
        renderChart(graphData);
    }, [dictionaries]);

    return (
        <>
            <div ref={chartRef} style={{height: '100%'}}></div>
        </>
    );
};

export default DataDictionaryStarGraph;
