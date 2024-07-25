import {useParams} from 'react-router-dom'
import {getDataModel, exportDataModel} from '../../../apis/DataModelingApi'
import {Button, Descriptions, Empty, message, Modal, Table, Tag} from 'antd'
import React, {useEffect, useState} from 'react'
import {
    formatModelModal,
    formatVariableType,
    formatModelType,
    formatRuleType,
    formatRuleDetail,
    formatDataSourceType,
    formatDataSourceTable, downloadCSV
} from './methods'
import config from './config'
import {mockData} from "../../../apis/mockData";

const EncryptCell = ({children}) => {
    const [isDecrypted, setIsDecrypted] = useState(false)
    const [encryptedData, setEncryptedData] = useState('')

    const encrypt = (data) => {
        const encrypted = btoa(data ? data.toString() : '')
        setEncryptedData(encrypted)
        return encrypted
    }

    const decrypt = (data) => {
        return atob(data)
    }

    useEffect(() => {
        setEncryptedData(encrypt(children))
    }, [children])

    return (
        <span style={{color: '#30478d', cursor: 'pointer'}}
              onClick={() => {
                  setIsDecrypted(!isDecrypted)
              }}>
            {isDecrypted ? decrypt(encryptedData) : encryptedData}
        </span>
    )
}

const DataModelDetailPage = () => {
    //从url获取模型id
    const {modelId} = useParams()

    //TODO:[]恢复为{}
    const [dataModel, setDataModel] = useState([])
    //const [dataModel, setDataModel] = useState({})

    const [dataModelInfo, setDataModelInfo] = useState({})
    const [dataColumns, setDataColumns] = useState([])
    const [fieldMap, setFieldMap] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const fieldColumns = [
        {title: '字段名称', dataIndex: 'name', key: 'name'},
        {title: '类型', dataIndex: 'type', key: 'type', render: formatVariableType},
        {title: '描述', dataIndex: 'description', key: 'description'},
        {title: '敏感', dataIndex: 'sensitive', key: 'sensitive', render: (text) => text ? '是' : '否'},
        {title: '加密', dataIndex: 'encrypt', key: 'encrypt', render: (text) => text ? '是' : '否'},
        {title: '密级', dataIndex: 'secretLevel', key: 'secretLevel'}
    ]

    const fieldMapColumns = [
        {title: '数据源字段', dataIndex: 'source', key: 'source'},
        {title: '数据模型字段', dataIndex: 'target', key: 'target'}]

    //TODO:恢复注释
    const dataSourceColumns = [
        {title: 'ID', dataIndex: 'dataSourceId', key: 'dataSourceId'},
        {title: '类型', dataIndex: 'type', key: 'type', render: (type) => formatDataSourceType(type)},
        {title: '数据表', key: 'table', render: (_, row) => formatDataSourceTable(row)},
        {
            title: '标签', dataIndex: 'tag', key: 'tag', render: (tag) =>
                tag.split(' ').map(single => <Tag>{single}</Tag>)
        },
        {title: '描述', dataIndex: 'description', key: 'description'},
        {
            title: '数据库URL', dataIndex: 'url', key: 'url', render: (tag) => {
                let arr = tag.split(' ');
                if (arr.length === 5) {
                    return arr[0] + ':' + arr[1] + '/' + arr[4] + '?usr=' + arr[3] + '&pwd=' + arr[4];
                } else {
                    return tag;
                }
            }
        },
        {
            title: '操作', key: 'action', fixed: 'right', render: (_, __, idx) => (
                <>
                    <Button style={{marginRight: 10}} onClick={() => {
                        showFieldMap(idx)
                    }}>查看映射</Button>
                </>
            )
        }
    ]

    const dataDictionaryColumns = [
        {title: 'ID', dataIndex: 'dataSourceId', key: 'dataSourceId'},

        {
            title: '操作', key: 'action', fixed: 'right', render: (_, __, idx) => (
                <>
                    <Button style={{marginRight: 10}} onClick={() => {
                        showFieldMap(idx)
                    }}>查看映射</Button>
                </>
            )
        }
    ]

    const ruleColumns = [{
        title: '字段名', children: [{
            title: '左字段',
            dataIndex: 'leftFieldName',
            key: 'leftFieldName',
            align: 'center',
            onCell: (item) => ({
                colSpan: item.rightFieldName ? 1 : 2,
            })
        }, {
            title: '右字段',
            dataIndex: 'rightFieldName',
            key: 'rightFieldName',
            align: 'center',
            onCell: (item) => ({
                colSpan: item.rightFieldName ? 1 : 0,
            })
        }],
    }, {
        dataIndex: 'ruleType',
        key: 'ruleType',
        title: '类型',
        render: (ruleType) => <Tag>{formatRuleType(ruleType)}</Tag>,
    }, {
        dataIndex: 'detail',
        key: 'detail',
        title: '详情',
    }, {
        dataIndex: 'description',
        key: 'description',
        title: '描述',
    }]

    const fetchModelDetail = () => {
        const loading = message.loading('正在加载数据模型详情...')
        //TODO:mock
        switch (parseInt(modelId)) {
            case 0:
                setDataModel(mockData.diseaseTable);
                break;
            case 1:
                setDataModel(mockData.studyTable);
                break;
            case 2:
                setDataModel(mockData.diseaseStudyTable);
                break;
            default:
                break;
        }
        setDataModelInfo(mockData.models[modelId]);
        setDataColumns(mockData.models[modelId].fields.map(item => {
            return ({
                title: item.name,
                dataIndex: item.name,
                key: item.name,
                render: (data) => item.encrypt ? <EncryptCell>{data}</EncryptCell> : data
            });
        }))
        loading()
        // getDataModel(modelId).then(data => {
        //     setDataModel(data)
        //     setDataModelInfo(data.model)
        //     if (data.model.type === 3) {
        //         setDataColumns(getDataTableColumns(Object.keys(data.data[0]), true))
        //     } else {
        //         setDataColumns(getDataTableColumns(data.fields))
        //     }
        //     loading()
        // }).catch(error => {
        //     loading()
        //     message.error(`查看模型详情失败：${error.message}`)
        // })
    }

    //TODO:恢复注释
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

    const showFieldMap = (idx) => {
        setFieldMap(Object.entries(dataModelInfo.fieldMaps[idx]).map(([key, value]) => ({
            source: key,
            target: value
        })))
        setIsModalVisible(true)
    }

    const getDataTableColumns = (fields, plain = false) => {
        if (plain) {
            return fields.map(item => ({title: item, dataIndex: item, key: item}))
        } else {
            return fields.map(item => ({
                title: item.name,
                dataIndex: item.name,
                key: item.name,
                render: (data) => item.encrypt ? <EncryptCell>{data}</EncryptCell> : data
            }))
        }
    }

    useEffect(fetchModelDetail, [])

    return (
        <>
            <div style={{marginBottom: 48}}>
                <h2>模型信息</h2>
                {Object.keys(dataModelInfo).length > 0 ? (
                    <Descriptions bordered>
                        <Descriptions.Item label='模型ID'>{dataModelInfo.id}</Descriptions.Item>
                        <Descriptions.Item label='模型名称'>{dataModelInfo.modelName}</Descriptions.Item>
                        <Descriptions.Item label='标签'>
                            {dataModelInfo.tag.map(((item, idx) => (
                                <Tag key={idx} style={{marginRight: 8}}>{item}</Tag>
                            )))}
                        </Descriptions.Item>
                        {/*<Descriptions.Item label='模态'>{formatModelModal(dataModelInfo.modal)}</Descriptions.Item>*/}
                        <Descriptions.Item label='类型'>{formatModelType(dataModelInfo.type)}</Descriptions.Item>
                        <Descriptions.Item label='业务域'>{dataModelInfo.domain}</Descriptions.Item>
                        <Descriptions.Item label='描述'>{dataModelInfo.description}</Descriptions.Item>
                        <Descriptions.Item
                            label='采集方式'>{dataModelInfo.realtime ? '实时' : '手动'}</Descriptions.Item>
                        {/*TODO:恢复注释*/}
                        {/*<Descriptions.Item label='质量分数'>{dataModelInfo.qualityScore}</Descriptions.Item>*/}
                    </Descriptions>
                ) : <Empty/>}
            </div>
            <div style={{marginBottom: 48}}>
                <h2>模型字段</h2>
                {/*TODO:恢复注释*/}
                <Table
                    dataSource={dataModelInfo.fields?.map(item => ({...item, key: item}))}
                    columns={fieldColumns}
                    scroll={{x: 'max-content'}}
                    pagination={false}
                    bordered/>
                {/*<Table dataSource={dataModel.fields?.map(item => ({...item, key: item.name}))} columns={fieldColumns}*/}
                {/*       scroll={{x: 'max-content'}} pagination={false} bordered/>*/}
            </div>
            {/*TODO:后续考虑使不使用*/}
            {/*<div style={{marginBottom: 48}}>*/}
            {/*    <h2>模型规则</h2>*/}
            {/*    <Table dataSource={dataModelInfo.rules?.map((item, idx) => {*/}
            {/*        const rule = config.modelRules.find(rule => rule.value === item.ruleType)*/}
            {/*        const type = rule?.type*/}
            {/*        if (type === 'Unary' || type === 'Numeric') {*/}
            {/*            return {*/}
            {/*                ...item, leftFieldName: item.fieldName, detail: formatRuleDetail(rule, item), key: idx*/}
            {/*            }*/}
            {/*        } else {*/}
            {/*            return {*/}
            {/*                ...item, detail: formatRuleDetail(rule, item), key: idx*/}
            {/*            }*/}
            {/*        }*/}
            {/*    })}*/}
            {/*           columns={ruleColumns}*/}
            {/*           scroll={{x: 'max-content'}} pagination={false} bordered/>*/}
            {/*</div>*/}
            <div style={{marginBottom: 48}}>
                <h2>绑定数据源</h2>
                <Modal title='字段映射' open={isModalVisible}
                       onOk={() => {
                           setIsModalVisible(false)
                       }}
                       onCancel={() => {
                           setIsModalVisible(false)
                       }}
                       cancelButtonProps={{style: {display: 'none'}}}
                       width={500}>
                    <Table dataSource={fieldMap.map(item => ({...item, key: item.key}))}
                           columns={fieldMapColumns}
                           scroll={{x: 'max-content'}}
                           style={{margin: '24px 0'}}
                           pagination={false}
                           bordered>
                    </Table>
                </Modal>
                <Table dataSource={dataModelInfo.dataSources?.map(item => ({...item, key: item.dataSourceId}))}
                       columns={dataSourceColumns}
                       scroll={{x: 'max-content'}}
                       pagination={false}
                       bordered/>
            </div>
            <div>
                <h2>数据表</h2>
                {dataModel && (
                    <Button type='primary'
                            onClick={exportModelData}>全量导出</Button>
                )}
                {dataModelInfo.type === 3 && (
                    <Button onClick={exportFile} style={{marginLeft: 12}}>文件导出</Button>
                )}
                <Table dataSource={dataModel.map((item, idx) => ({...item, key: idx}))} columns={dataColumns}
                       style={{marginTop: 16}} scroll={{x: 'max-content'}} bordered/>
            </div>
        </>
    )
}

export default DataModelDetailPage
