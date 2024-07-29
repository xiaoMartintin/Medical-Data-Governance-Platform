import React, {useRef, useState} from 'react';
import {Button, Modal, Table} from 'antd';
import DataAssetButton from "./DataAssetButton";

const DetailButton = ({detail}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <Button type="primary" onClick={showModal}>
                查看详情
            </Button>
            <Modal title="详情" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
                {/*<p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>*/}
                {/*<tbody>
                <tr>
                    {Object.keys(detail).map((key) =>(<th>{key}</th>))}
                </tr>
                <tr>
                    {Object.values(detail).map((value) =>(<td>{value}</td>))}
                </tr>
                </tbody>*/}
                <Table style={{overflow:"auto"}} columns={
                    (detail.hasOwnProperty("studies"))?
                    Object.keys(detail).map(
                        (item) => ({
                                title:item,
                                dataIndex: item,
                                render: record => (<div>{record === null || record === undefined || record === "" ?
                                    "Unknown" : (item === "relations") ? (record.map((item, index) => (
                                        <>
                                            <strong>资产{index}:<br/></strong>
                                            {item}
                                        </>
                                    ))) :(item === "studies")? <DataAssetButton info={{
                                        studies:detail.studies,
                                        DiseaseID:detail.ID}}>
                                    </DataAssetButton>: record.toString()}</div>)
                            })
                    ) :Object.keys(detail).map(
                            (item) => ({
                                title:item,
                                dataIndex: item,
                                render: record => (<div>{record === null || record === undefined || record === "" ?
                                    "Unknown" : (item === "relations") ? (record.map((item, index) => (
                                        <>
                                            <strong>资产{index}:<br/></strong>
                                            {item}
                                        </>
                                    ))) : record.toString()}</div>)
                            })
                        )
                }
                dataSource={[detail]}>

                </Table>
            </Modal>
        </>
    );
};
export default DetailButton;
