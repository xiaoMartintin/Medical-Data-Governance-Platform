import React, {useRef, useState} from 'react';
import {Button, Modal, Table} from 'antd';
import DataAssetButton from "./DataAssetButton";
import html2canvas from "html2canvas";
import * as jspdf from "jspdf";
import * as echarts from "echarts";
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

    /*const exportData = () => {
        html2canvas(chartRefs[1].current).then(canvas => {
            canvas.toBlob(function(blob) {
                const reader = new FileReader();
                reader.onloadend = function() {
                    const imgData = reader.result; // This will be the base64 string
                    const pdf = new jspdf.jsPDF({
                        orientation: 'portrait',
                        unit: 'px',
                        format: [canvas.width, canvas.height]
                    });

                    // Instead of getImageProperties, we can use the canvas dimensions directly
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                    // Use the base64 string (imgData)
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    pdf.save('exported-page.pdf');
                };
                reader.readAsDataURL(blob); // Convert blob to base64 string
            }, 'image/png');
        });
    }*/
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
