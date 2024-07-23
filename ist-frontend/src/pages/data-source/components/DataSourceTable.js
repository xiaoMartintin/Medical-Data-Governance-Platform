import {Button, message, Modal, Popconfirm, Table, Tag} from 'antd'
import React, {useState} from 'react'
import {deleteDataSource, getMetaFields} from '../../../apis/data-source'
import {formatDataSourceTable, formatDataSourceType} from '../methods'
import {formatMongoField, formatVariableType} from '../../data-model/DataModel/methods'

const DataSourceTable = ({dataSources, onFinishDelete}) => {
    const fieldColumns = [{title: '字段名称', dataIndex: 'name', key: 'name', render: formatMongoField},
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: formatVariableType
        }
    ]

    const dataSourceColumns = [
        {title: 'ID', dataIndex: 'dataSourceId', key: 'dataSourceId'},
        {title: '类型', dataIndex: 'type', key: 'type', render: (type) => formatDataSourceType(type)},
        {title: '数据表', key: 'table', render: (_, row) => formatDataSourceTable(row)},
        {title: '标签', dataIndex: 'tag', key: 'tag', render: (tag) => <Tag>{tag}</Tag>},
        {title: '描述', dataIndex: 'description', key: 'description'},
        {title: '数据库URL', dataIndex: 'url', key: 'url', width: 100},
        {
            title: '操作', key: 'action', fixed: 'right', render: (_, row) => (
                <>
                    <Button size='small' style={{marginRight: 10}} onClick={() => {
                        showDataSourceFields(row)
                    }}>详情</Button>
                    <Popconfirm
                        title="警告"
                        description="是否确定删除该数据源?"
                        onConfirm={() => handleDelete(row.dataSourceId)}
                        okText="删除"
                        cancelText="取消"
                    >
                        <Button size='small' danger>删除</Button>
                    </Popconfirm>
                </>
            )
        }
    ]

    const [sourceFields, setSourceFields] = useState([])
    const [isMetaModalVisible, setIsMetaModalVisible] = useState(false)
    const showDataSourceFields = (row) => {
        let {dataSourceId, description, fieldMap, key, tag, type, ...params} = row
        params.sourceType = type
        getMetaFields(params).then(data => {
            setSourceFields(data)
            setIsMetaModalVisible(true)
        }).catch(error => {
            message.error(`获得元数据失败：${error.message}`)
        })
    }

    const handleDelete = (id) => {
        // TODO
        deleteDataSource(id).then(_ => {
            message.success(`已删除数据源${id}`)
            onFinishDelete()
        }).catch(error => {
            message.error(`删除数据源失败：${error.message}`)
        })
    }

    return (
        <>
            <Modal title='元数据' open={isMetaModalVisible}
                   onOk={() => {
                       setIsMetaModalVisible(false)
                   }}
                   onCancel={() => {
                       setIsMetaModalVisible(false)
                   }}
                   cancelButtonProps={{style: {display: 'none'}}}
                   width={700}>
                <Table dataSource={sourceFields?.map(item => ({...item, key: item.name}))}
                       columns={fieldColumns}
                       scroll={{x: 'max-content'}}
                       style={{margin: '24px 0'}}
                       pagination={false}
                       bordered
                ></Table>
            </Modal>
            <Table dataSource={dataSources?.map(item => ({...item, key: item.dataSourceId}))} columns={dataSourceColumns}
                   scroll={{x: 'max-content'}}
                   pagination={{pageSize: 6}}
                   bordered/>
        </>

    )
}

export default DataSourceTable
