// import {Button, Divider, Form, message, Modal, Select, Table, Tag} from 'antd';
// import {bindDataModel, getAllDataSources, getMetaFields} from '../../../../apis/DataModelingApi';
// import React, {useEffect, useState} from 'react';
// import {formatMongoField, formatVariableType, formatDataSourceTable} from '../methods';
// import {mockData, dictionaries} from "../../../../apis/mockData";
//
// const {Option} = Select
//
// const BindDataSource = ({visible, onHideModal, model}) => {
//     //展示所有数据源
//     const [dataSources, setDataSources] = useState([])
//
//     const [dataSourceFields, setDataSourceFields] = useState([])
//     const [mappedDataSources, setMappedDataSources] = useState([])
//     const [bindForm] = Form.useForm()
//
//     const dataSourceColumns = [{dataIndex: 'dataSourceId', key: 'dataSourceId', title: '数据源ID'},
//         {dataIndex: 'dataSourceName', key: 'dataSourceName', title: '数据表'},
//         {
//             key: 'action',
//             title: '操作',
//             render: (_, row) => (<Button danger onClick={() => handleDeleteDataSource(row.key)}>删除</Button>)
//         },
//     ]
//     // todo: 数据字典表格列
//     const dataDictionaryColumns = [{dataIndex: 'dataSourceId', key: 'dataSourceId', title: '数据字典ID'},
//         {dataIndex: 'dataSourceName', key: 'dataSourceName', title: '数据表'},
//         {
//             key: 'action',
//             title: '操作',
//             render: (_, row) => (<Button danger onClick={() => handleDeleteDataSource(row.key)}>删除</Button>)
//         },
//     ]
//
//     const handleDeleteDataSource = (key) => {
//         setMappedDataSources(mappedDataSources.filter(item => item.key !== key))
//     }
//
//     const handleOk = () => {
//         if (mappedDataSources.length === 0) {
//             message.error('至少需要绑定一个数据源')
//             return
//         }
//         //TODO:恢复注释
//         message.success('成功绑定数据源').then();
//         resetModal();
//         // const sourceIds = []
//         // const fieldMaps = []
//         // mappedDataSources.forEach(source => {
//         //     sourceIds.push(source.dataSourceId)
//         //     fieldMaps.push(source.fieldMap)
//         // })
//         // bindDataModel({
//         //     modelId: model.id,
//         //     sourceIds,
//         //     fieldMaps
//         // }).then(_ => {
//         //     message.success('成功绑定数据源')
//         //     resetModal()
//         // }).catch(error => {
//         //     message.error(`绑定数据源失败：${error.message}`)
//         // })
//     }
//
//     const resetForm = () => {
//         bindForm.resetFields()
//         setDataSourceFields([])
//         setMappedDataSources([])
//     }
//
//     const resetModal = () => {
//         resetForm()
//         onHideModal()
//     }
//
//     const handleAddDataSource = () => {
//         bindForm.validateFields().then(data => {
//             const {dataSourceId, ...fieldMap} = data
//             const filteredFieldMap = Object.fromEntries(Object.entries(fieldMap).filter(([_, value]) => !!value))
//             if (Object.keys(filteredFieldMap).length === 0) {
//                 message.error('至少需要映射一个字段')
//                 return
//             }
//             const dataSource = dataSources.find(item => item.dataSourceId === dataSourceId)
//             const mappedDatasource = {
//                 dataSourceName: formatDataSourceTable(dataSource),
//                 dataSourceId: dataSourceId,
//                 fieldMap: filteredFieldMap,
//                 key: dataSourceId
//             }
//             setMappedDataSources([...mappedDataSources, mappedDatasource])
//             bindForm.resetFields()
//             setDataSourceFields([])
//         }).catch(_ => {
//             message.error('请正确填写绑定信息')
//         })
//     }
//
//     //TODO:恢复注释
//     const fetchDataSources = () => {
//         setDataSources(mockData.dataSource);
//         // getAllDataSources().then(data => {
//         //     setDataSources(data)
//         // }).catch(error => {
//         //     message.error(`获取数据源失败：${error.message}`)
//         // })
//     }
//
//     //TODO:恢复注释
//     const fetchFields = (dataSource) => {
//         const loading = message.loading('正在加载数据源字段...', 0)
//
//         switch (dataSource.dataSourceId) {
//             case 1:
//                 setDataSourceFields(mockData.diseaseFieldDetail?.map(item => ({
//                     name: item.name,
//                     type: item.type
//                 })));
//                 break;
//             case 2:
//                 setDataSourceFields(mockData.studyFieldDetail?.map(item => ({
//                     name: item.name,
//                     type: item.type
//                 })));
//                 break;
//             case 3:
//                 setDataSourceFields(mockData.diseaseStudyFieldDetail?.map(item => ({
//                     name: item.name,
//                     type: item.type
//                 })));
//                 break;
//             default:
//                 break;
//         }
//         loading()
//         // let {dataSourceId, description, fieldMap, key, tag, type, ...params} = dataSource
//         // params.sourceType = type
//         // getMetaFields(params).then(data => {
//         //     setDataSourceFields(data?.map(item => ({name: item.name, type: item.type})))
//         //     loading()
//         // }).catch(error => {
//         //     loading()
//         //     message.error(`加载字段失败：${error.message}`)
//         // })
//     }
//
//     const filterDatasource = (input, option) => {
//         const dataSource = dataSources.find(item => item.dataSourceId === option.value)
//         return formatDataSourceTable(dataSource).toLowerCase().includes(input.toLowerCase())
//     }
//
//     const onChange = (dataSourceId) => {
//         const dataSource = dataSources.find(item => item.dataSourceId === dataSourceId)
//         fetchFields(dataSource)
//     }
//
//     const validateUniqueDataSource = (_, val) => {
//         if (mappedDataSources.some(source => source.dataSourceId === val)) {
//             return Promise.reject(new Error('不能绑定相同数据源'))
//         }
//         return Promise.resolve()
//     }
//
//     const validateField = (rule, val) => {
//         if (val === '') return Promise.resolve()
//         const sourceType = dataSourceFields.find(item => item.name === rule.field).type
//         const targetType = model.fields.find(item => item.name === val).type
//         if (sourceType !== targetType) {
//             return Promise.reject(new Error('映射字段类型不同'))
//         }
//         const mappedFields = dataSourceFields.map(item => {
//             if (item.name !== rule.field) {
//                 return bindForm.getFieldValue(item.name)
//             }
//             return null
//         }).filter(item => item)
//         if (mappedFields.some(field => field === val)) {
//             return Promise.reject(new Error('不能映射到重复字段'))
//         }
//         return Promise.resolve()
//     }
//
//     useEffect(fetchDataSources, [])
//
//     return (
//         <>
//             <Modal title='绑定数据源' open={visible} onOk={handleOk} onCancel={resetModal} width={800}>
//                 <Form form={bindForm}>
//                     <Form.Item label='数据源' name='dataSourceId' rules={[{
//                         required: true,
//                         message: '请选择数据源'
//                     }, {validator: validateUniqueDataSource}]}>
//                         <Select showSearch onChange={onChange} filterOption={filterDatasource}>
//                             {dataSources.map(item => (
//                                 <Option key={item.dataSourceId} value={item.dataSourceId}>
//                                     <span style={{marginRight: '16px'}}>{formatDataSourceTable(item)}</span>
//                                     <Tag>{item.dataSourceId}</Tag>
//                                 </Option>
//                             ))}
//                         </Select>
//                     </Form.Item>
//                     {dataSourceFields?.length > 0 && <Divider>字段映射</Divider>}
//                     {dataSourceFields?.map(item => (
//                         <Form.Item key={item.name} label={(
//                             <>
//                                 <span>{formatMongoField(item.name)}</span>
//                                 <Tag style={{marginLeft: '6px'}}>{formatVariableType(item.type)}</Tag>
//                             </>
//                         )} name={item.name} initialValue='' rules={[{validator: validateField}]}>
//                             <Select>
//                                 {model.fields.map(field => (
//                                     <Option key={field.name} value={field.name}>
//                                         <span>{field.name}</span>
//                                         <Tag style={{marginLeft: '16px'}}>{formatVariableType(field.type)}</Tag>
//                                     </Option>
//                                 ))}
//                                 <Option value=''>不进行映射</Option>
//                             </Select>
//                         </Form.Item>
//                     ))}
//                     <Button type='dashed' onClick={handleAddDataSource} style={{width: '100%'}}>
//                         添加数据源
//                     </Button>
//                 </Form>
//                 <Table style={{marginTop: 20}} dataSource={mappedDataSources} columns={dataSourceColumns}
//                        scroll={{x: 'max-content'}} bordered>
//                 </Table>
//             </Modal>
//         </>
//     )
// }
//
// export default BindDataSource



import {Button, Divider, Form, message, Modal, Select, Table, Tag, Tabs} from 'antd';
import React, {useEffect, useState} from 'react';
import {
    formatMongoField,
    formatVariableType,
    formatDataSourceTable,
    formatDictionaryDataTypes,
    judgeType
} from '../methods';
import {dictionaries} from "../../../../apis/mockData";

const {Option, TabPane} = Select

const BindDataSource = ({visible, onHideModal, model}) => {
    //展示所有数据字典
    const [dataDictionaries, setDataDictionaries] = useState([])

    const [dictionaryFields, setDictionaryFields] = useState([])
    const [mappedDictionaries, setMappedDictionaries] = useState([])
    const [bindForm] = Form.useForm()

    const dictionaryColumns = [{dataIndex: 'dictionaryId', key: 'dictionaryId', title: '数据字典ID'},
        {dataIndex: 'dictionaryName', key: 'dictionaryName', title: '数据字典'},
        {
            key: 'action',
            title: '操作',
            render: (_, row) => (<Button danger onClick={() => handleDeleteDictionary(row.key)}>删除</Button>)
        },
    ]

    const handleDeleteDictionary = (key) => {
        setMappedDictionaries(mappedDictionaries.filter(item => item.key !== key))
    }

    const handleOk = () => {
        if (mappedDictionaries.length === 0) {
            message.error('至少需要绑定一个数据字典')
            return
        }
        //TODO:恢复注释
        message.success('成功绑定数据字典').then();
        resetModal();
    }

    const resetForm = () => {
        bindForm.resetFields()
        setDictionaryFields([])
        setMappedDictionaries([])
    }

    const resetModal = () => {
        resetForm()
        onHideModal()
    }

    const handleAddDictionary = () => {
        bindForm.validateFields().then(data => {
            const {dictionaryId, ...fieldMap} = data
            const filteredFieldMap = Object.fromEntries(Object.entries(fieldMap).filter(([_, value]) => !!value))
            if (Object.keys(filteredFieldMap).length === 0) {
                message.error('至少需要映射一个字段')
                return
            }
            const dictionary = dataDictionaries.find(item => item.key === dictionaryId)
            // console.log('dictionary', dictionary)
            const mappedDictionary = {
                dictionaryName: dictionary.name,
                dictionaryId: dictionaryId,
                fieldMap: filteredFieldMap,
                key: dictionaryId
            }
            // console.log('mappedDictionary', mappedDictionary)
            setMappedDictionaries([...mappedDictionaries, mappedDictionary])
            bindForm.resetFields()
            setDictionaryFields([])
        }).catch(_ => {
            message.error('请正确填写绑定信息')
        })
    }

    const fetchDictionaries = () => {
        setDataDictionaries(dictionaries);
    }

    const fetchFields = (dictionary) => {
        const loading = message.loading('正在加载数据字典字段...', 0)
        setDictionaryFields(dictionary.content);
        loading()
    }

    const filterDictionary = (input, option) => {
        const dictionary = dataDictionaries.find(item => item.key === option.value)
        return dictionary.name.toLowerCase().includes(input.toLowerCase())
    }

    const onChange = (dictionaryId) => {
        const dictionary = dataDictionaries.find(item => item.key === dictionaryId)
        fetchFields(dictionary)
    }

    const validateUniqueDictionary = (_, val) => {
        if (mappedDictionaries.some(dictionary => dictionary.dictionaryId === val)) {
            return Promise.reject(new Error('不能绑定相同数据字典'))
        }
        return Promise.resolve()
    }

    const validateField = (rule, val) => {
        // console.log('rule', rule)
        // console.log('val', val)
        if (val === '') return Promise.resolve()
        const sourceType = dictionaryFields.find(item => item.key === rule.field).type
        // console.log('sourceType', sourceType)
        const targetType = model.fields.find(item => item.name === val).type
        // console.log('targetType', targetType)
        // if (sourceType !== targetType) {
        if (!judgeType(sourceType, targetType)) {
            return Promise.reject(new Error('映射字段类型不同'))
        }
        const mappedFields = dictionaryFields.map(item => {
            if (item.key !== rule.field) {
                return bindForm.getFieldValue(item.key)
            }
            return null
        }).filter(item => item)
        console.log('mappedFields', mappedFields)
        if (mappedFields.some(field => field === val)) {
            return Promise.reject(new Error('不能映射到重复字段'))
        }
        return Promise.resolve()
    }

    const groupedDictionaryFields = dictionaryFields.reduce((grouped, field) => {
        (grouped[field.table] = grouped[field.table] || []).push(field);
        return grouped;
    }, {});

    useEffect(fetchDictionaries, [])

    return (
        <>
            <Modal title='绑定数据字典' open={visible} onOk={handleOk} onCancel={resetModal} width={800}>
                <Form form={bindForm}>
                    <Form.Item label='数据字典' name='dictionaryId' rules={[{
                        required: true,
                        message: '请选择数据字典'
                    }, {validator: validateUniqueDictionary}]}>
                        <Select showSearch onChange={onChange} filterOption={filterDictionary}>
                            {dataDictionaries.map(item => (
                                <Option key={item.key} value={item.key}>
                                    <span style={{marginRight: '16px'}}>{item.name}</span>
                                    {/*<Tag>{item.key}</Tag>*/}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    {dictionaryFields?.length > 0 && <Divider>字段映射</Divider>}
                    <Tabs>
                        {Object.entries(groupedDictionaryFields).map(([tableName, fields]) => (
                            <TabPane tab={tableName} key={tableName}>
                                {fields.map(item => (
                                    <Form.Item key={item.name} label={(
                                        <>
                                            <span>{item.name}</span>
                                            <Tag style={{marginLeft: '6px'}} color={"geekblue"}>{item.table}</Tag>
                                            <Tag style={{marginLeft: '3px'}}>{formatDictionaryDataTypes(item.type)}</Tag>
                                        </>
                                    )} name={item.key} initialValue='' rules={[{validator: validateField}]}>
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
                            </TabPane>
                        ))}
                    </Tabs>
                    <Button type='dashed' onClick={handleAddDictionary} style={{width: '100%'}}>
                        添加字段绑定
                    </Button>
                </Form>
                <Table style={{marginTop: 20}} dataSource={mappedDictionaries} columns={dictionaryColumns}
                       scroll={{x: 'max-content'}} bordered>
                </Table>
            </Modal>
        </>
    )
}

export default BindDataSource
