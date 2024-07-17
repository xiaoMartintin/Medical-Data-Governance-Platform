import React, { useState } from 'react';
import {Input, Table, Select, Button, Col, Row, Modal, Space, Divider, message} from 'antd';
import DataDictionarySearchBar from "./components/DataDictionarySearchBar";
import DataDictionaryLineageGraph from "./components/DataDictionaryLineageGraph";
import {exportToExcel} from "./tmp/methods";

const { Option } = Select;

const calculateRowSpan = (data) => {
    const rowSpan = {};
    data.forEach((item) => {
        item.fields.forEach((field) => {
            if (rowSpan[field.table]) {
                // console.log(field.table, rowSpan[field.table])
                rowSpan[field.table].value++;
                if (rowSpan[field.table].value > 1) {
                    rowSpan[field.table].expand = true;
                }
            }
            else {
                rowSpan[field.table] = {
                    value: 1,
                    expand: false
                };
            }
        });
    });
    // console.log(rowSpan);
    return {...rowSpan};
};

const DataDictionarySearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [rowSpanData, setRowSpanData] = useState({});
    const [rowSpan, setRowSpan] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [currentField, setCurrentField] = useState(null);
    const [currentDictionary, setCurrentDictionary] = useState(null);
    const [exportType, setExportType] = useState(null);

    const handleSearch = (results) => {
        setSearchResults(results);
        setRowSpanData(calculateRowSpan(results));
    }

    const handleLinkClick = field => {
        setCurrentField(field);
        setModalVisible(true);
        console.log('currentField', currentField)
    }

    const handleModalCancel = () => {
        setModalVisible(false);
        setCurrentField(null);
    }

    const handleExport = (data, filtered) => {
        if (exportType === null) {
            message.error('请选择导出格式');
            return;
        }
        if (exportType === 'xlsx' || exportType === 'html') {
            exportToExcel(filtered, [data], exportType);
            message.success('导出成功');
            return;
        }
        message.success('暂不支持');
    }

    const handleExportAll = data => {
        if (exportType === null) {
            message.error('请选择导出格式');
            return;
        }
        if (exportType === 'xlsx' || exportType === 'html') {
            exportToExcel(true, data, exportType);
            message.success('导出成功');
            return;
        }
        message.success('暂不支持');
    }

    const handleExportTypeChange = value => {
        setExportType(value);
    }

    const columns = [
        {
            title: '表名',
            dataIndex: 'table',
            key: 'table',
            // render: (text, record, index) => {
            //     if (!rowSpan) {
            //         setRowSpan(rowSpanData)
            //     }
            //     if (rowSpan.expand === false) {
            //         rowSpan.value = 1;
            //         return text;
            //     }
            //     else if (rowSpan.value > 0) {
            //         rowSpanData[record.table].value--;
            //         return {
            //             children: text,
            //             props: {
            //                 rowSpan: rowSpan.value,
            //             },
            //         };
            //     }
            // }
        },
        { title: '字段名', dataIndex: 'name', key: 'name' },
        { title: '数据类型', dataIndex: 'type', key: 'type' },
        { title: '注释', dataIndex: 'description', key: 'description' },
        { title: '操作', key: 'action', render: (_, field) =>
                <Button type="link" onClick={() => handleLinkClick(field)}>查看数据血缘</Button>
        }
    ];

    return (
        <>
            <DataDictionarySearchBar onSearch={handleSearch} />
            {
                searchResults.length > 0 && (
                    <Space>
                        <Select placeholder="选择导出格式" style={{ width: 200 }} value={exportType} onChange={handleExportTypeChange}>
                            <Option value="xlsx">Excel</Option>
                            <Option value="html">HTML</Option>
                        </Select>
                        <Button type='primary' onClick={() => handleExportAll(searchResults)} >导出全部筛选内容</Button>
                    </Space>
                )
            }
            <Divider />
            {searchResults.map(dictionary => (
                <>
                    <Table
                        title={() => (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>{dictionary.name}</span>
                                <Space>
                                    <Button onClick={() => handleExport(dictionary, false)}>导出完整字典</Button>
                                    <Button onClick={() => handleExport(dictionary, true)}>导出筛选内容</Button>
                                </Space>
                            </div>
                        )}
                        dataSource={dictionary.fields}
                        columns={columns}
                        pagination={false}
                        style={{ marginBottom: '24px' }}
                    />
                </>
            ))}
            {currentField && (
                <Modal
                    title="数据血缘"
                    visible={modalVisible}
                    onCancel={handleModalCancel}
                    footer={null}
                    width={800}
                >
                    <div style={{ height: 500 }}>
                        <DataDictionaryLineageGraph dictionaryKey={currentField.dictionaryKey} fieldKey={currentField.key} />
                    </div>
                </Modal>
            )}
        </>
    );
};

export default DataDictionarySearchPage;
