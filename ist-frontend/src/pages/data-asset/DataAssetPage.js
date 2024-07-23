import React, {useEffect, useRef, useState} from 'react'
import {exportDataSource} from '../../apis/data-model'
import * as echarts from 'echarts'
import {formatDataSourceTable, formatDataSourceType} from '../data-source/methods'
import {Divider, message, Modal} from 'antd'
import {downloadCSV} from '../DataModeling/DataModel/methods'
import FilterForm from './components/FilterForm'
import {getDataAssets} from "../../apis/data-asset";
import {formatModelModal, formatModelType} from "../data-model/DataModel/methods";
import {DataAssets, DataModels} from "../../database/data";
import {mockData} from "../../apis/mockData";

const DataAssetPage = () => {
    const [dataModel, setDataModel] = useState([])

    const [dataModelInfo, setDataModelInfo] = useState({})
    const chartRef = useRef(null)
    let chart = null
    const [filterParams, setFilterParams] = useState({
        modelName: undefined,
        modal: undefined,
        type: undefined,
        domain: undefined,
        description: undefined,
        tag: undefined
    })
    const exportModelData = () => {
        if (dataModelInfo.type === 3) {
            downloadCSV(dataModel.data, `${dataModelInfo.modelName}.csv`)
        } else {
            const loading = message.loading('正在导出全量数据...')
            downloadCSV(dataModel, `${dataModelInfo.modelName}.csv`)
            // exportDataModel(modelId).then(data => {
            //     downloadCSV(data.data, `${data.model.modelName}.csv`)
            //     loading()
            // }).catch(error => {
            //     loading()
            //     message.error(`导出模型数据失败：${error.message}`)
            // })
        }
    }

    //TODO:恢复注释
    const exportFile = () => {
        const loading = message.loading('正在导出文件数据...')
        //downloadZip(`/dataModelService/getZip/${modelId}`)
        loading()
    }

    const modelsToGraph = (models) => {
        const modelToNode = (model) => ({
            name: model.modelName,
            id: model.id,
            children: model.dataSources?.map(source => ({
                name: formatDataSourceTable(source),
                id: source.dataSourceId,
                modelId: model.id,
                isSource: true,
                source: source
            })),
            model: model,
            isModel: true
        })
        const graphMap = new Map()
        models.forEach(model => {
            const nodes = graphMap.get(model.domain) || []
            nodes.push(modelToNode(model))
            graphMap.set(model.domain, nodes)
        })
        const graphObj = Array.from(graphMap, ([key, val]) => ({
            name: key,
            id: key,
            children: val,
            isDomain: true
        }))
        return {
            name: '业务域',
            children: graphObj
        }
    }

    const renderChart = (data) => {
        if (!chartRef.current) return
        console.log(data)
        chart = echarts.init(chartRef.current)
        chart.showLoading()
        chart.hideLoading()
        chart.setOption({
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove',
                formatter: function (params) {
                    if (params.data.isModel) {
                        const model = params.data.model
                        return `ID: ${model.id}<br>名称: ${model.modelName}<br>模态: ${formatModelModal(model.modal)}<br>类型: ${formatModelType(model.type)}<br>标签: ${model.tag}<br>描述: ${model.description}`
                    } else if (params.data.isSource) {
                        const source = params.data.source
                        return `ID: ${source.dataSourceId}<br>URL: ${source.url}<br>类型: ${formatDataSourceType(source.type)}<br>标签: ${source.tag}<br>描述: ${source.description}`
                    } else if (params.data.isDomain) {
                        return `业务域: ${params.data.name}`
                    }
                },
            },
            series: [
                {
                    type: 'tree',
                    data: [data],
                    top: '1%',
                    left: '7%',
                    bottom: '1%',
                    right: '20%',
                    symbolSize: 30,
                    label: {
                        position: 'bottom',
                        verticalAlign: 'middle',
                        align: 'center',
                        fontSize: 15,
                        distance: 10,
                        textStyle: {
                            color: '#798698',
                            fontWeight: 'bold'
                        }
                    },
                    leaves: {
                        label: {
                            distance: 5,
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },
                    emphasis: {
                        focus: 'descendant'
                    },
                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750,
                    initialTreeDepth: -1
                }
            ]
        })
        chart.on('click', (item) => {
            // 判断点击的是否为叶子结点
            if (item.data && item.data.isSource) {
                Modal.confirm({
                    title: `数据源导出`,
                    content: `是否导出数据源 '${item.data.name}' ？`,
                    onOk() {
                        exportData(item.data.modelId, item.data.id)
                    },
                })
            }
        })
        window.onresize = () => {
            chart.resize()
        }
    }

    const exportData = (modelId, sourceId) => {
        const loading = message.loading('正在导出数据源...')
        exportDataSource(modelId, sourceId).then(data => {
            downloadCSV(data.data, `${data.model.modelName}.csv`)
            loading()
        }).catch(error => {
            loading()
            message.error(`导出数据源失败：${error.message}`)
        })
    }

    const fetchAsset = () => {
        const params = {}
        Object.keys(filterParams).forEach(key => {
            params[key] = filterParams[key] === null || filterParams[key] === undefined ? '' : filterParams[key];
        });
        /*getDataAssets(params).then(data => {
            console.log(data)
            const graphData = modelsToGraph(data)
            renderChart(graphData)
        }).catch(error => {
            message.error(`加载数据资产失败：${error.message}`)
        })
        return () => {
            chart && chart.dispose()
        }*/
        try {
            let filteredGraphData
            if (Object.values(params).every(value => value === '')) {
                //filteredGraphData = modelsToGraph(DataAssets);
                filteredGraphData = modelsToGraph(mockData.models);
            } else {
               /* filteredGraphData = DataAssets.filter(data => {
                    for (const key in params) {
                        if (data[key] !== params[key] && params[key] !== '') {
                            return false;
                        }
                    }
                    return true;
                });*/
                filteredGraphData = mockData.models.filter(data => {
                    for (const key in params) {
                        if (data[key] !== params[key] && params[key] !== '') {
                            return false;
                        }
                    }
                    return true;
                });
                filteredGraphData = modelsToGraph(filteredGraphData)
            }
            renderChart(filteredGraphData)
        }
        catch (error) {
            message.error(`加载数据资产失败：${error.message}`)
        }
        return () => {
            chart && chart.dispose()
        }
    }

    // eslint-disable-next-line
    useEffect(fetchAsset, [filterParams])

    return (
        <>
            <FilterForm onFilterAsset={setFilterParams}/>
            <Divider style={{margin: '12px 0'}}/>
            <div ref={chartRef} style={{height: '100%'}}></div>
        </>

    )
}

export default DataAssetPage
