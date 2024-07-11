import React, {useEffect, useState} from 'react'
import {getAllDataSources} from '../../apis/data-source'
import DataSourceTable from './components/DataSourceTable'
import {Button, message} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import DataSourceForm from './components/DataSourceForm'

const DataSourcePage = () => {
    const [dataSources, setDataSources] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleShowModal = () => {
        setIsModalVisible(true)
    }

    const handleHideModal = () => {
        setIsModalVisible(false)
    }

    const fetchSources = () => {
        getAllDataSources().then(data => {
            setDataSources(data)
        }).catch(error => {
            message.error(`获得数据源失败：${error.message}`)
        })
    }

    useEffect(fetchSources, [])

    return (
        <>
            <Button type='primary' onClick={handleShowModal} style={{
                marginBottom: 24
            }} icon={<PlusOutlined/>}>
                添加数据源
            </Button>
            <DataSourceForm visible={isModalVisible} onHideModal={handleHideModal} onAddDataSource={fetchSources}></DataSourceForm>
            <DataSourceTable dataSources={dataSources} onFinishDelete={fetchSources}></DataSourceTable>
        </>
    )
}

export default DataSourcePage
