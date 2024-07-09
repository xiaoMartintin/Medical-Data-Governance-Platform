import React from 'react';
import { Card, Form, Input, Button, Select } from 'antd';
import '../style/DataExtractionStrategyManagement.css';

const { Option } = Select;

const DataExtractionStrategyManagement = () => {
    return (
        <Card title="数据抽取策略管理">
            <Form layout="vertical">
                <Form.Item label="策略名称" name="strategyName">
                    <Input placeholder="请输入策略名称" />
                </Form.Item>
                <Form.Item label="选择策略类型" name="strategyType">
                    <Select placeholder="请选择策略类型">
                        <Option value="type1">类型1</Option>
                        <Option value="type2">类型2</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary">保存策略</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default DataExtractionStrategyManagement;
