import {useEffect, useRef} from 'react'
import {getDataModels} from '../../apis/data-model'
import {message} from 'antd'
import {formatMongoField} from '../data-model/DataModel/methods'
import * as echarts from 'echarts'
import {DataModels} from "../../database/data";

const ModelMapPage = () => {
    const chartRef = useRef(null)
    let chart = null

    const modelsToGraph = (models) => {
        let nodes = []
        let links = []
        let fieldMap = new Map()

        models.forEach((model, modelIndex) => {
            nodes.push({
                id: `model-${modelIndex}`,
                name: model.modelName,
                category: 'model',
                draggable: true,
                symbolSize: 40,
                itemStyle: {
                    color: generateColor()
                },
                value: model.domain
            })

            model.fields.forEach(({name: fieldName}) => {
                let fieldId
                fieldName = formatMongoField(fieldName)
                if (fieldMap.has(fieldName)) {
                    fieldId = fieldMap.get(fieldName)
                } else {
                    fieldId = `field-${nodes.length}`
                    fieldMap.set(fieldName, fieldId)
                    nodes.push({
                        id: fieldId,
                        name: fieldName,
                        category: 'field',
                        draggable: true,
                        symbolSize: 13,
                        itemStyle: {
                            color: '#798698'
                        },
                        value: '字段',
                    })
                }
                links.push({
                    source: `model-${modelIndex}`,
                    target: fieldId,
                })
            })
        })
        return {nodes, links}
    }

    const renderChart = (graphData) => {
        if (!chartRef.current) return
        const chart = echarts.init(chartRef.current)
        chart.setOption({
            tooltip: {},
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    data: graphData.nodes,
                    links: graphData.links,
                    categories: [{name: 'model'}, {name: 'field'}],
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
        })
        window.onresize = () => chart.resize()
    }

    const generateColor = () => {
        const r = Math.floor(Math.random() * 200);
        const g = Math.floor(Math.random() * 200);
        const b = Math.floor(Math.random() * 200);
        return `rgb(${r}, ${g}, ${b})`;
    }

    const fetchDataMap = () => {
        /*getDataModels().then(data => {
            console.log(data)
            const graphData = modelsToGraph(data)
            renderChart(graphData)
        }).catch(error => {
            message.error(`加载数据地图失败：${error.message}`)
        })*/
        try {
            const graphData = modelsToGraph(DataModels)
            renderChart(graphData)
        }
        catch (error) {
            message.error(`加载数据地图失败：${error.message}`)
        }
        return () => {
            chart && chart.dispose()
        }
    }

    // eslint-disable-next-line
    useEffect(fetchDataMap, [])

    return (
        <div ref={chartRef} style={{height: '100%'}}></div>
    )
}

export default ModelMapPage
