import React, { useState } from 'react';
import {Button, Modal, Table} from 'antd';
import MySteps from "./MySteps";
const DataAssetButton = ({info}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [current,setCurrent] = useState(0);
    const showModal = () => {
        setIsModalOpen(true);
        setCurrent(0);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        setCurrent(0);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setCurrent(0);
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                查看详情
            </Button>
            <Modal title="详情" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                <MySteps info={info} current={current} setCurrent={setCurrent}/>
            </Modal>
        </>
    );
};
export default DataAssetButton;
