import React, {useEffect, useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {Button, Divider, Table, Tag} from "antd";
import AddDataMaskingTask from "./components/AddDataMaskingTask";

const configs = [
    {
        value:"1",
        color:"magenta",
        text:"定时+人工",

    },
    {
        value:"2",
        color:"lime",
        text:"定时",

    },
    {
        value:"3",
        color:"geekblue",
        text:"人工",

    }
]

const columns = [
    {
        title: '任务id',
        dataIndex: 'id',
        align: 'center',
    },
    {
      title: "执行时间",
      dataIndex: 'timestamp',
      align: "center"
    },
    {
        title: '任务名称',
        dataIndex: 'name',
        align: 'center',
    },
    {
        title: '第N次执行',
        dataIndex: 'times',
        align: 'center',
    },
    {
        title: '执行方式',
        dataIndex: 'config',
        align: "center",
        render: record => (
            <>
                {
                    <Tag color={configs.find(item => item.value === record).color}>{configs.find(item => item.value === record).text}</Tag>
                }
            </>
        )
    },
    {
        title: '源资产',
        dataIndex: 'source',
        align: "center"
    },
    {
        title: '目标资产',
        dataIndex: 'target',
        align: "center"
    },
    {
        title: '执行进度',
        dataIndex: 'progress',
        align: "center"
    },
    {
        title: '新增脱敏行',
        dataIndex: 'new',
        align: "center"
    },
    {
        title: '失败行数',
        dataIndex: 'fail',
        align: "center"
    },
    {
        title: '状态',
        dataIndex: 'state',
        align: "center"
    },
    {
        title: '备注',
        dataIndex: 'description',
        align: "center"
    }

];
const DataMaskingPage = () => {
    const [dataMaskingTasks,setDataMaskingTasks] = useState([]);
    const [addModal, setAddModal] = useState(false);
    useEffect(() => {
        setDataMaskingTasks(JSON.parse(localStorage.getItem("maskingConfigs")))
        }
        , [])
    const showAddModal = () => {
        setAddModal(true);
    }
    const hideAddModal = () => {
        setAddModal(false);
    }
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
    return(
        <>
            <Button type='primary'  style={{marginBottom: 12}} onClick={showAddModal} icon={<PlusOutlined/>} >
                新建脱敏任务
            </Button>
            <AddDataMaskingTask visible={addModal} onHideModal={hideAddModal} onAddModel={fetchModels}/>
            <Divider/>
            <Table columns={columns}
                   dataSource={dataMaskingTasks}
                   rowKey="id"

                   pagination={{
                       pageSize:10,
                       showSizeChanger: true,
                       showTotal: (total, range) => `${range[0]}-${range[1]} 共 ${total} 条`,
                       showQuickJumper: true}}>
            </Table>
        </>
    );
}

export default DataMaskingPage;
