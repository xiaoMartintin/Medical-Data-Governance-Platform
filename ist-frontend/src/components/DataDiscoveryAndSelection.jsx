import React from 'react';
import { Card, Form, Input, Button, Select } from 'antd';
import '../style/DataDiscoveryAndSelection.css';

const { Option } = Select;

const DataDiscoveryAndSelection = () => {
    return (
        <Card title="数据发现与选择">
            <Form layout="vertical">
                <Form.Item label="搜索关键词" name="keyword">
                    <Input placeholder="请输入搜索关键词" />
                </Form.Item>
                <Form.Item label="数据类型" name="dataType">
                    <Select placeholder="请选择数据类型">
                        <Option value="type1">类型1</Option>
                        <Option value="type2">类型2</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary">搜索</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default DataDiscoveryAndSelection;
