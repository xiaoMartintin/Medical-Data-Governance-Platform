import React, { useState } from 'react';
import { Card, Button, Modal, Form, Input, Select, Empty, Table, Checkbox, message, Tree } from 'antd';
import { PlusOutlined, DeleteOutlined, SyncOutlined, StopOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import '../style/DataSourceManagement.css';

const { Option } = Select;
const { TreeNode } = Tree;

const DataSourceManagement = () => {
    const [dataSources, setDataSources] = useState([
        {
            key: '1',
            name: '患者数据库',
            driver: 'MySQL',
            host: '192.168.0.10',
            port: '3306',
            user: 'hospital_admin',
            database: 'patient_db',
            url: 'jdbc:mysql://192.168.0.10:3306/patient_db',
            directories: ['患者信息', '入院记录'],
            treeData: [
                {
                    title: '患者信息',
                    key: '0-0',
                    children: [
                        { title: '基本信息', key: '0-0-0' },
                        { title: '联系信息', key: '0-0-1' },
                    ],
                },
                {
                    title: '入院记录',
                    key: '0-1',
                    children: [
                        { title: '病历记录', key: '0-1-0' },
                        { title: '手术记录', key: '0-1-1' },
                    ],
                },
            ],
        },
        {
            key: '2',
            name: '医药数据库',
            driver: 'PostgreSQL',
            host: '192.168.0.11',
            port: '5432',
            user: 'pharma_admin',
            database: 'pharma_db',
            url: 'jdbc:postgresql://192.168.0.11:5432/pharma_db',
            directories: ['药品信息', '库存记录'],
            treeData: [
                {
                    title: '药品信息',
                    key: '0-2',
                    children: [
                        { title: '药品列表', key: '0-2-0' },
                        { title: '药品详情', key: '0-2-1' },
                    ],
                },
                {
                    title: '库存记录',
                    key: '0-3',
                    children: [
                        { title: '入库记录', key: '0-3-0' },
                        { title: '出库记录', key: '0-3-1' },
                    ],
                },
            ],
        },
        {
            key: '3',
            name: '财务数据库',
            driver: 'Oracle',
            host: '192.168.0.12',
            port: '1521',
            user: 'finance_admin',
            database: 'finance_db',
            url: 'jdbc:oracle:thin:@192.168.0.12:1521:finance_db',
            directories: ['账单信息', '支付记录'],
            treeData: [
                {
                    title: '账单信息',
                    key: '0-4',
                    children: [
                        { title: '住院账单', key: '0-4-0' },
                        { title: '门诊账单', key: '0-4-1' },
                    ],
                },
                {
                    title: '支付记录',
                    key: '0-5',
                    children: [
                        { title: '支付详情', key: '0-5-0' },
                        { title: '退款记录', key: '0-5-1' },
                    ],
                },
            ],
        },
        {
            key: '4',
            name: '实验室数据库',
            driver: 'SQLServer',
            host: '192.168.0.13',
            port: '1433',
            user: 'lab_admin',
            database: 'lab_db',
            url: 'jdbc:sqlserver://192.168.0.13:1433;databaseName=lab_db',
            directories: ['实验室报告', '检验记录'],
            treeData: [
                {
                    title: '实验室报告',
                    key: '0-6',
                    children: [
                        { title: '血液报告', key: '0-6-0' },
                        { title: '尿液报告', key: '0-6-1' },
                    ],
                },
                {
                    title: '检验记录',
                    key: '0-7',
                    children: [
                        { title: '日常检验', key: '0-7-0' },
                        { title: '特殊检验', key: '0-7-1' },
                    ],
                },
            ],
        },
        {
            key: '5',
            name: '人事数据库',
            driver: 'MongoDB',
            host: '192.168.0.14',
            port: '27017',
            user: 'hr_admin',
            database: 'hr_db',
            url: 'mongodb://192.168.0.14:27017/hr_db',
            directories: ['员工信息', '工作记录'],
            treeData: [
                {
                    title: '员工信息',
                    key: '0-8',
                    children: [
                        { title: '基本信息', key: '0-8-0' },
                        { title: '联系信息', key: '0-8-1' },
                    ],
                },
                {
                    title: '工作记录',
                    key: '0-9',
                    children: [
                        { title: '出勤记录', key: '0-9-0' },
                        { title: '加班记录', key: '0-9-1' },
                    ],
                },
            ],
        },
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [currentDataSource, setCurrentDataSource] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedSources, setSelectedSources] = useState([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [searchText, setSearchText] = useState('');

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
        if (dataSources.some(ds => ds.name === values.name && ds.key !== currentDataSource.key)) {
            message.error('名称已存在，请更换名称');
            return;
        }
        const updatedDataSources = dataSources.map(ds => ds.key === currentDataSource.key ? values : ds);
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

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredDataSources = dataSources.filter(ds =>
        ds.name.toLowerCase().includes(searchText.toLowerCase()) ||
        ds.driver.toLowerCase().includes(searchText.toLowerCase()) ||
        ds.directories.some(dir => dir.toLowerCase().includes(searchText.toLowerCase()))
    );

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
            title: '驱动程序',
            dataIndex: 'driver',
            key: 'driver'
        },
        {
            title: '主机',
            dataIndex: 'host',
            key: 'host'
        },
        {
            title: '端口',
            dataIndex: 'port',
            key: 'port'
        },
        {
            title: '数据库',
            dataIndex: 'database',
            key: 'database'
        },
        {
            title: '操作',
            key: 'action',
            width: 100,
            render: (_, record) => (
                <Button type="text" icon={<EditOutlined />} className="action-button" onClick={() => showEditDataSourceModal(record)}>编辑</Button>
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
            <p><b>资源目录:</b></p>
            <Tree
                showLine
                defaultExpandAll
                treeData={record.treeData}
            />
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
            <Form.Item label="资源目录" name="directories">
                <Select mode="tags" placeholder="请输入资源目录">
                    <Option value="目录1">目录1</Option>
                    <Option value="目录2">目录2</Option>
                    <Option value="目录3">目录3</Option>
                    {/* Add other options as needed */}
                </Select>
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
                title="数据源管理"
                extra={
                    <div className="icon-buttons">
                        <Button icon={<PlusOutlined />} onClick={showAddDataSourceModal}>添加</Button>
                        <Button icon={<DeleteOutlined />} onClick={handleBulkDelete} disabled={!selectedSources.length}>删除</Button>
                        <Button icon={<SyncOutlined />}>刷新</Button>
                        <Button icon={<StopOutlined />}>停用</Button>
                    </div>
                }
            >
                <div className="search-bar">
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="搜索数据源名称、类型或资源目录"
                        value={searchText}
                        onChange={handleSearch}
                        style={{ width: 300, marginBottom: 20 }}
                    />
                </div>
                {dataSources.length === 0 ? (
                    <div className="empty-data-source">
                        <Empty description="创建数据源">
                            <Button type="primary" onClick={showAddDataSourceModal}>添加数据源</Button>
                        </Empty>
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        dataSource={filteredDataSources}
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

export default DataSourceManagement;
