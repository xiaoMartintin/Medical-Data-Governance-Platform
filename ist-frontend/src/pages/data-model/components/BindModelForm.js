import {Button, Divider, Form, message, Modal, Select, Table, Tag} from 'antd'
import {bindDataModel} from '../../../apis/data-model'
import {getAllDataSources, getMetaFields} from '../../../apis/data-source'
import React, {useEffect, useState} from 'react'
import {formatMongoField, formatVariableType} from '../methods'
import {formatDataSourceTable} from '../../data-source/methods'

const {Option} = Select

const BindModelForm = ({visible, onHideModal, model}) => {
    const [dataSources, setDataSources] = useState([])
    const [dataSourceFields, setDataSourceFields] = useState([])
    const [mappedDataSources, setMappedDataSources] = useState([])
    const [bindForm] = Form.useForm()

    const dataSourceColumns = [{dataIndex: 'dataSourceId', key: 'dataSourceId', title: '数据源ID'},
        {dataIndex: 'dataSourceName', key: 'dataSourceName', title: '数据表'},
        {
            key: 'action',
            title: '操作',
            render: (_, row) => (<Button danger onClick={() => handleDeleteDataSource(row.key)}>删除</Button>)
        },
    ]

    const handleDeleteDataSource = (key) => {
        setMappedDataSources(mappedDataSources.filter(item => item.key !== key))
    }

    const handleOk = () => {
        if (mappedDataSources.length === 0) {
            message.error('至少需要绑定一个数据源')
            return
        }
        const sourceIds = []
        const fieldMaps = []
        mappedDataSources.forEach(source => {
            sourceIds.push(source.dataSourceId)
            fieldMaps.push(source.fieldMap)
        })
        bindDataModel({
            modelId: model.id,
            sourceIds,
            fieldMaps
        }).then(_ => {
            message.success('成功绑定数据源')
            resetModal()
        }).catch(error => {
            message.error(`绑定数据源失败：${error.message}`)
        })
    }

    const resetForm = () => {
        bindForm.resetFields()
        setDataSourceFields([])
        setMappedDataSources([])
    }

    const resetModal = () => {
        resetForm()
        onHideModal()
    }

    const handleAddDataSource = () => {
        bindForm.validateFields().then(data => {
            const {dataSourceId, ...fieldMap} = data
            const filteredFieldMap = Object.fromEntries(Object.entries(fieldMap).filter(([_, value]) => !!value))
            if (Object.keys(filteredFieldMap).length === 0) {
                message.error('至少需要映射一个字段')
                return
            }
            const dataSource = dataSources.find(item => item.dataSourceId === dataSourceId)
            const mappedDatasource = {
                dataSourceName: formatDataSourceTable(dataSource),
                dataSourceId: dataSourceId,
                fieldMap: filteredFieldMap,
                key: dataSourceId
            }
            setMappedDataSources([...mappedDataSources, mappedDatasource])
            bindForm.resetFields()
            setDataSourceFields([])
        }).catch(_ => {
            message.error('请正确填写绑定信息')
        })
    }

    const fetchDataSources = () => {
        getAllDataSources().then(data => {
            setDataSources(data)
        }).catch(error => {
            message.error(`获取数据源失败：${error.message}`)
        })
    }

    const fetchFields = (dataSource) => {
        const loading = message.loading('正在加载数据源字段...', 0)
        let {dataSourceId, description, fieldMap, key, tag, type, ...params} = dataSource
        params.sourceType = type
        getMetaFields(params).then(data => {
            setDataSourceFields(data?.map(item => ({name: item.name, type: item.type})))
            loading()
        }).catch(error => {
            loading()
            message.error(`加载字段失败：${error.message}`)
        })
    }

    const filterDatasource = (input, option) => {
        const dataSource = dataSources.find(item => item.dataSourceId === option.value)
        return formatDataSourceTable(dataSource).toLowerCase().includes(input.toLowerCase())
    }

    const onChange = (dataSourceId) => {
        const dataSource = dataSources.find(item => item.dataSourceId === dataSourceId)
        fetchFields(dataSource)
    }

    const validateUniqueDataSource = (_, val) => {
        if (mappedDataSources.some(source => source.dataSourceId === val)) {
            return Promise.reject(new Error('不能绑定相同数据源'))
        }
        return Promise.resolve()
    }

    const validateField = (rule, val) => {
        if (val === '') return Promise.resolve()
        const sourceType = dataSourceFields.find(item => item.name === rule.field).type
        const targetType = model.fields.find(item => item.name === val).type
        if (sourceType !== targetType) {
            return Promise.reject(new Error('映射字段类型不同'))
        }
        const mappedFields = dataSourceFields.map(item => {
            if (item.name !== rule.field) {
                return bindForm.getFieldValue(item.name)
            }
            return null
        }).filter(item => item)
        if (mappedFields.some(field => field === val)) {
            return Promise.reject(new Error('不能映射到重复字段'))
        }
        return Promise.resolve()
    }

    useEffect(fetchDataSources, [])

    return (
        <>
            <Modal title='绑定数据源' open={visible} onOk={handleOk} onCancel={resetModal} width={800}>
                <Form form={bindForm}>
                    <Form.Item label='数据源' name='dataSourceId' rules={[{
                        required: true,
                        message: '请选择数据源'
                    }, {validator: validateUniqueDataSource}]}>
                        <Select showSearch onChange={onChange} filterOption={filterDatasource}>
                            {dataSources.map(item => (
                                <Option key={item.dataSourceId} value={item.dataSourceId}>
                                    <span style={{marginRight: '16px'}}>{formatDataSourceTable(item)}</span>
                                    <Tag>{item.dataSourceId}</Tag>
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    {dataSourceFields?.length > 0 && <Divider>字段映射</Divider>}
                    {dataSourceFields?.map(item => (
                        <Form.Item key={item.name} label={(
                            <>
                                <span>{formatMongoField(item.name)}</span>
                                <Tag style={{marginLeft: '6px'}}>{formatVariableType(item.type)}</Tag>
                            </>
                        )} name={item.name} initialValue='' rules={[{validator: validateField}]}>
                            <Select>
                                {model.fields.map(field => (
                                    <Option key={field.name} value={field.name}>
                                        <span>{field.name}</span>
                                        <Tag style={{marginLeft: '16px'}}>{formatVariableType(field.type)}</Tag>
                                    </Option>
                                ))}
                                <Option value=''>不进行映射</Option>
                            </Select>
                        </Form.Item>
                    ))}
                    <Button type='dashed' onClick={handleAddDataSource} style={{width: '100%'}}>
                        添加数据源
                    </Button>
                </Form>
                <Table style={{marginTop: 20}} dataSource={mappedDataSources} columns={dataSourceColumns}
                       scroll={{x: 'max-content'}} bordered>
                </Table>
            </Modal>
        </>
    )
}

export default BindModelForm