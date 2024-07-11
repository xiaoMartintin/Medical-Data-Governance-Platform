import React, {useEffect, useState} from 'react'
import {Button, Empty, message, Pagination} from 'antd'
import DataModelCard from './components/DataModelCard'
import DataModelForm from './components/DataModelForm'
import {getDataModels} from '../../apis/data-model'
import {PlusOutlined} from '@ant-design/icons'
import BindModelForm from './components/BindModelForm'

const DataModelPage = () => {
    const pageSize = 6
    const [dataModels, setDataModels] = useState([])
    const [isAddModalVisible, setIsAddModalVisible] = useState(false)
    const [isBindModalVisible, setIsBindModalVisible] = useState(false)
    const [modelToBind, setModelToBind] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const currentDataModels = dataModels.slice((currentPage - 1) * pageSize, currentPage * pageSize)

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const handleShowModal = () => {
        setIsAddModalVisible(true)
    }

    const handleHideModal = () => {
        setIsAddModalVisible(false)
    }

    const handleBindModel = (model) => {
        setModelToBind(model)
        setIsBindModalVisible(true)
    }

    const fetchModels = () => {
        getDataModels().then(data => {
            setDataModels(data)
            const totalPages = Math.ceil(data.length / pageSize);
            if (currentPage > totalPages) {
                setCurrentPage(totalPages > 0 ? totalPages : 1);
            }
        }).catch(error => {
            message.error(`获得模型失败：${error.message}`)
        })
    }

    useEffect(() => {
        getDataModels().then(data => {
            setDataModels(data)
        }).catch(error => {
            message.error(`获得模型失败：${error.message}`)
        })
    }, [])

    return (
        <>
            <Button type='primary' onClick={handleShowModal} style={{
                marginBottom: 12
            }} icon={<PlusOutlined/>}>
                添加数据模型
            </Button>
            <BindModelForm visible={isBindModalVisible} onHideModal={() => setIsBindModalVisible(false)}
                           model={modelToBind}/>
            <DataModelForm visible={isAddModalVisible} onHideModal={handleHideModal}
                           onAddModel={fetchModels}></DataModelForm>
            {currentDataModels.length > 0 ? (
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {currentDataModels.map((model, idx) => (
                        <DataModelCard key={idx} model={model} onBindModel={handleBindModel}
                                       onFinishDelete={fetchModels}/>
                    ))}
                </div>
            ) : <Empty/>}
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                <Pagination
                    current={currentPage}
                    onChange={handlePageChange}
                    total={dataModels.length}
                    pageSize={pageSize}
                />
            </div>
        </>
    )
}

export default DataModelPage
