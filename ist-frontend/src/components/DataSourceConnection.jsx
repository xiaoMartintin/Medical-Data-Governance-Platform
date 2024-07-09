import React, { useState } from 'react';
import { Card, Button, Modal, Form, Input, Select, Empty, Table, Checkbox, message } from 'antd';
import { PlusOutlined, DeleteOutlined, SyncOutlined, StopOutlined, DownOutlined, EditOutlined } from '@ant-design/icons';
import '../style/DataSourceConnection.css';

const { Option } = Select;

const DataSourceConnection = () => {
    const [dataSources, setDataSources] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [currentDataSource, setCurrentDataSource] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedSources, setSelectedSources] = useState([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    const showAddDataSourceModal = () => {
        setCurrentDataSource(null);
        setIsEdit(false);
        setIsModalVisible(true);
    };

    const showEditDataSourceModal = (dataSource) => {
        setCurrentDataSource(dataSource);
        setIsEdit(true);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAddDataSource = (values) => {
        if (dataSources.some(ds => ds.name === values.name)) {
            message.error('名称已存在，请更换名称');
            return;
        }
        setDataSources([...dataSources, values]);
        setIsModalVisible(false);
    };

    const handleEditDataSource = (values) => {
        if (dataSources.some(ds => ds.name === values.name && ds.name !== currentDataSource.name)) {
            message.error('名称已存在，请更换名称');
            return;
        }
        const updatedDataSources = dataSources.map(ds => ds.name === currentDataSource.name ? values : ds);
        setDataSources(updatedDataSources);
        setIsModalVisible(false);
    };

    const handleDeleteDataSource = (name) => {
        setDataSources(dataSources.filter(ds => ds.name !== name));
    };

    const handleBulkDelete = () => {
        setDataSources(dataSources.filter(ds => !selectedSources.includes(ds.name)));
        setSelectedSources([]);
    };


    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allNames = dataSources.map(ds => ds.name);
            setSelectedSources(allNames);
        } else {
            setSelectedSources([]);
        }
    };

    const handleSelect = (name, e) => {
        const updatedSelected = e.target.checked
            ? [...selectedSources, name]
            : selectedSources.filter(n => n !== name);
        setSelectedSources(updatedSelected);
    };

    const handleExpand = (expanded, record) => {
        const keys = expanded ? [...expandedRowKeys, record.name] : expandedRowKeys.filter(key => key !== record.name);
        setExpandedRowKeys(keys);
    };

    const testConnection = () => {
        message.success('连接测试成功！');
    };

    const columns = [
        {
            title: '',
            dataIndex: 'expand',
            key: 'expand',
            width: 50,
        },
        {
            title: <Checkbox checked={selectedSources.length === dataSources.length} onChange={handleSelectAll} />,
            dataIndex: 'select',
            key: 'select',
            width: 50,
            render: (_, record) => (
                <Checkbox
                    checked={selectedSources.includes(record.name)}
                    onChange={(e) => handleSelect(record.name, e)}
                />
            )
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '修改',
            key: 'action',
            width: 100,
            render: (_, record) => (
                <Button type="text" icon={<EditOutlined />} className="action-button" onClick={() => showEditDataSourceModal(record)}></Button>
            )
        }
    ];

    const expandedRowRender = (record) => (
        <div>
            <p><b>驱动程序:</b> {record.driver}</p>
            <p><b>主机:</b> {record.host}</p>
            <p><b>端口:</b> {record.port}</p>
            <p><b>用户名:</b> {record.user}</p>
            <p><b>数据库:</b> {record.database}</p>
            <p><b>URL:</b> {record.url}</p>
        </div>
    );

    const dataSourceForm = (
        <Form
            layout="vertical"
            onFinish={isEdit ? handleEditDataSource : handleAddDataSource}
            initialValues={currentDataSource}
            style={{ fontFamily: 'Arial, sans-serif' }}
        >
            <Form.Item label="连接名称" name="name" rules={[{ required: true, message: '请输入连接名称' }]}>
                <Input placeholder="请输入连接名称" />
            </Form.Item>
            <Form.Item label="驱动程序" name="driver" rules={[{ required: true, message: '请选择驱动程序' }]}>
                <Select placeholder="请选择驱动程序" onChange={(value) => setSelectedDriver(value)}>
                    <Option value="mysql">MySQL</Option>
                    <Option value="postgresql">PostgreSQL</Option>
                    <Option value="oracle">Oracle</Option>
                    <Option value="MongoDB">MongoDB</Option>

                    {/* Add other options as needed */}
                </Select>
            </Form.Item>
            <Form.Item label="主机" name="host" rules={[{ required: true, message: '请输入主机地址' }]}>
                <Input placeholder="请输入主机地址" />
            </Form.Item>
            <Form.Item label="端口" name="port" rules={[{ required: true, message: '请输入端口号' }]}>
                <Input placeholder="请输入端口号" />
            </Form.Item>
            <Form.Item label="用户名" name="user" rules={[{ required: true, message: '请输入用户名' }]}>
                <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
                <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item label="数据库" name="database">
                <Input placeholder="请输入数据库名称" />
            </Form.Item>
            <Form.Item label="URL" name="url">
                <Input placeholder="请输入URL" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">{isEdit ? '保存修改' : '添加数据源'}</Button>
                <Button type="default" style={{ marginLeft: 8 }} onClick={testConnection}>测试连接</Button>
            </Form.Item>
        </Form>
    );


    return (
        <div className="source-connection">
            <Card
                title="数据源连接"
                extra={
                    <div className="icon-buttons">
                        <Button icon={<PlusOutlined />} onClick={showAddDataSourceModal}>添加</Button>
                        <Button icon={<DeleteOutlined />} onClick={handleBulkDelete} disabled={!selectedSources.length}>删除</Button>
                        <Button icon={<SyncOutlined />}>刷新</Button>
                        <Button icon={<StopOutlined />}>停用</Button>
                    </div>
                }
            >
                {dataSources.length === 0 ? (
                    <div className="empty-data-source">
                        <Empty description="创建数据源">
                            <Button type="primary" onClick={showAddDataSourceModal}>添加数据源</Button>
                        </Empty>
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        dataSource={dataSources}
                        rowKey="name"
                        expandable={{ expandedRowRender, expandedRowKeys, onExpand: handleExpand }}
                        pagination={false}
                    />
                )}
            </Card>
            <Modal
                title={<div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>{isEdit ? '编辑数据源' : '添加数据源'}</div>}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                centered
                bodyStyle={{ padding: '24px', fontFamily: 'Arial, sans-serif' }}
                style={{ borderRadius: '10px', overflow: 'hidden' }}
            >
                {dataSourceForm}
            </Modal>
        </div>
    );
};

export default DataSourceConnection;

