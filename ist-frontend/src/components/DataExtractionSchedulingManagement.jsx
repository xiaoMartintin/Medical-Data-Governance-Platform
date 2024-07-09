import React from 'react';
import { Card, Form, Input, Button, DatePicker, TimePicker } from 'antd';
import '../style/DataExtractionSchedulingManagement.css';

const DataExtractionSchedulingManagement = () => {
    return (
        <Card title="数据抽取调度管理">
            <Form layout="vertical">
                <Form.Item label="调度任务名称" name="scheduleName">
                    <Input placeholder="请输入调度任务名称" />
                </Form.Item>
                <Form.Item label="选择日期" name="date">
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="选择时间" name="time">
                    <TimePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary">设置调度</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default DataExtractionSchedulingManagement;
