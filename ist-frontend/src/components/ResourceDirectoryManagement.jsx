import React from 'react';
import { Card, Form, Input, Button, Tree } from 'antd';
import '../style/ResourceDirectoryManagement.css';

const treeData = [
    {
        title: '根目录',
        key: '0-0',
        children: [
            {
                title: '子目录1',
                key: '0-0-0',
                children: [
                    {
                        title: '文件1',
                        key: '0-0-0-0',
                    },
                    {
                        title: '文件2',
                        key: '0-0-0-1',
                    },
                ],
            },
        ],
    },
];

const ResourceDirectoryManagement = () => {
    return (
        <Card title="资源目录管理">
            <Form layout="vertical">
                <Form.Item label="目录名称" name="directoryName">
                    <Input placeholder="请输入目录名称" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary">新建目录</Button>
                </Form.Item>
            </Form>
            <Tree
                showLine
                defaultExpandAll
                treeData={treeData}
            />
        </Card>
    );
};

export default ResourceDirectoryManagement;
