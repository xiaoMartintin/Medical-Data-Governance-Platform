import {Button, Empty, message, Pagination} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import AddDataModel from "./components/AddDataModel";
import {getDataModels} from "../../../apis/DataModelingApi";
import DataModelCard from "./components/DataModelCard";
import {mockData} from "../../../apis/mockData";
import BindDataSource from "./components/BindDataSource";

const DataModelPage = () => {
    //数据模型所在页面
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    //所有数据模型
    const pageSize = 6;
    const [dataModels, setDataModels] = useState([]);
    const currentDataModels = dataModels.slice((currentPage - 1) * pageSize, currentPage * pageSize)

    //添加数据模型
    const [addModal, setAddModal] = useState(false);
    const showAddModal = () => {
        setAddModal(true);
    }
    const hideAddModal = () => {
        setAddModal(false);
    }

    //为数据模型绑定数据源
    const [bindModal, setBindModal] = useState(false);
    const [modelToBind, setModelToBind] = useState({});
    const showBindModal = (model) => {
        setModelToBind(model);
        setBindModal(true);
    }
    const hideBindModal = () => {
        setBindModal(false);
    }

    //获取所有数据模型
    const fetchModels = () => {
        // getDataModels().then(data => {
        //     setDataModels(data);
        //     const totalPages = Math.ceil(data.length / pageSize);
        //     if (currentPage > totalPages) {
        //         setCurrentPage(totalPages > 0 ? totalPages : 1);
        //     }
        // }).catch(error => {
        //     message.error(`获得模型失败：${error.message}`).then();
        // })
    }

    useEffect(() => {
        //TODO:目前使用mock数据，待后续补充后端后再修改
        console.log(currentDataModels);
        // getDataModels().then(data => {
        //     setDataModels(data)
        // }).catch(error => {
        //     message.error(`获得模型失败：${error.message}`)
        // })
        setDataModels(mockData.models);
    }, [])

    return (
        <>
            {/*数据模型添加按钮*/}
            <Button type='primary' onClick={showAddModal} style={{marginBottom: 12}} icon={<PlusOutlined/>}>
                添加数据模型
            </Button>

            {/*数据模型添加框*/}
            <AddDataModel visible={addModal} onHideModal={hideAddModal} onAddModel={fetchModels}/>

            {/*数据源绑定框*/}
            <BindDataSource visible={bindModal} onHideModal={hideBindModal} model={modelToBind}/>

            {/*所有数据模型展示区*/}
            {
                currentDataModels.length > 0
                    ?
                    (
                        <div style={{display: 'flex', flexWrap: 'wrap'}}>
                            {
                                currentDataModels.map((model, idx) => (
                                    <DataModelCard
                                        key={idx}
                                        model={model}
                                        onBindModel={showBindModal}
                                        //TODO:恢复函数
                                        // onFinishDelete={fetchModels}
                                        onFinishDelete={() => {
                                            setDataModels(dataModels.filter(cur => cur.id !== model.id))
                                        }
                                        }/>
                                ))
                            }
                        </div>
                    )
                    :
                    <Empty/>
            }

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