import React, { useState } from 'react';
import {Input, Table, Select, Button, Col, Row} from 'antd';
import {searchDictionaries} from "../tmp/methods";
import {types} from "../tmp/data";

const { Option } = Select;

const DataDictionarySearchBar = ({ onSearch }) => {
    const [dictionarySearchTerm, setDictionarySearchTerm] = useState('');
    const [tableNameSearchTerm, setTableNameSearchTerm] = useState('');
    const [fieldNameSearchTerm, setFieldNameSearchTerm] = useState('');
    const [descriptionSearchTerm, setDescriptionSearchTerm] = useState('');
    const [typeSearchTerm, setTypeSearchTerm] = useState('');

    const handleSearch = () => {
        const results = searchDictionaries(
            dictionarySearchTerm,
            tableNameSearchTerm,
            fieldNameSearchTerm,
            descriptionSearchTerm,
            typeSearchTerm
        );
        console.log(results);
        onSearch(results);
    };

    const handleDictionarySearchChange = e => {
        setDictionarySearchTerm(e.target.value);
    }

    const handleTableNameSearchChange = e => {
        setTableNameSearchTerm(e.target.value);
    };

    const handleFieldNameSearchChange = e => {
        setFieldNameSearchTerm(e.target.value);
    };

    const handleDescriptionSearchChange = e => {
        setDescriptionSearchTerm(e.target.value);
    };

    const handleTypeSearchChange = value => {
        setTypeSearchTerm(value);
    };

    return (
        <>
            <Row gutter={16} style={{ marginBottom: 40 }}>
                <Col span={6}>
                    <Input placeholder="搜索字典名" value={dictionarySearchTerm} onChange={handleDictionarySearchChange} style={{ marginBottom: '12px' }}/>
                </Col>
                <Col span={6}>
                    <Input placeholder="搜索表名" value={tableNameSearchTerm} onChange={handleTableNameSearchChange} style={{ marginBottom: '12px' }}/>
                </Col>
                <Col span={6}>
                    <Input placeholder="搜索字段名" value={fieldNameSearchTerm} onChange={handleFieldNameSearchChange} style={{ marginBottom: '12px' }}/>
                </Col>
                <Col span={6}>
                    <Select placeholder="搜索类型" value={typeSearchTerm} onChange={handleTypeSearchChange} style={{ marginBottom: '12px', width: '100%' }}>
                        <Option value="">全部类型</Option>
                        {types.map((type, index) => (
                            <Option key={index} value={type}>{type}</Option>
                        ))}
                    </Select>
                </Col>
                <Col span={22}>
                    <Input placeholder="搜索描述" value={descriptionSearchTerm} onChange={handleDescriptionSearchChange} style={{ marginBottom: '12px' }}/>
                </Col>
                <Col span={2}>
                    <Button type="primary" onClick={handleSearch}>搜索</Button>
                </Col>
            </Row>
        </>
    );
};

export default DataDictionarySearchBar;
