import React, { useState, useEffect } from 'react';
import {Button, Table, Pagination, Modal, Input} from 'antd';
import DataDictionaryForm from './components/DataDictionaryForm';
import {initialDictionaries} from './tmp/data.js';
import {EditOutlined} from "@ant-design/icons";

const DataDictionaryManagePage = () => {
    const pageSize = 6;
    const [dictionaries, setDictionaries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingDictionary, setEditingDictionary] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const handleShowModal = () => {
        setIsModalVisible(true);
    };

    const handleHideModal = () => {
        setIsModalVisible(false);
        setEditingDictionary(false);
    };

    const handleEditDictionary = dictionary => {
        setEditingDictionary(dictionary.content);
        handleShowModal();
    };

    const handleSearchChange = e => {
        setSearchTerm(e.target.value);
    };

    const filteredDictionaries = dictionaries.filter(dictionary =>
        dictionary.name.includes(searchTerm) || dictionary.description.includes(searchTerm)
    );

    const columns = [
        { title: '字典名称', dataIndex: 'name', key: 'name' },
        { title: '注释', dataIndex: 'description', key: 'description' },
        {
            title: '操作',
            key: 'action',
            render: (_, dictionary) => (
                <Button type="link" onClick={() => handleEditDictionary(dictionary)}>
                    <EditOutlined/>编辑
                </Button>
            ),
        },
    ];

    useEffect(() => {
        // Fetch dictionaries from backend
        setDictionaries(initialDictionaries);
    }, []);

    return (
        <>
            <Button type='primary' onClick={handleShowModal} style={{ marginBottom: 60 }}>
                添加数据字典
            </Button>
            <Input
                placeholder="搜索数据字典"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ marginBottom: 24 }}
            />
            <DataDictionaryForm
                visible={isModalVisible}
                onHideModal={handleHideModal}
                editingDictionary={editingDictionary}
            />
            <Table
                dataSource={filteredDictionaries.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                columns={columns}
                pagination={false}
            />
            <Pagination
                current={currentPage}
                onChange={handlePageChange}
                total={dictionaries.length}
                pageSize={pageSize}
                style={{ marginTop: '20px', textAlign: 'right' }}
            />
        </>
    );
};

export default DataDictionaryManagePage;
