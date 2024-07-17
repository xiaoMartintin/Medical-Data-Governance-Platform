import React, { useState } from 'react';
import { Card, Button, Modal, Form, Input, Select, Empty, Table, Checkbox, message, Tree } from 'antd';
import { PlusOutlined, DeleteOutlined, SyncOutlined, StopOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import '../style/DataSourceManagement.css';

const { Option } = Select;

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
                { title: '患者信息', key: '0-0-0' },
                { title: '入院记录', key: '0-0-1' }
            ],
            tables: [
                {
                    id: '1-1',
                    name: '患者信息',
                    fields: [
                        { name: 'OrgID', type: 'int', allowNull: false, description: '参照第4章节中关键字段说明' },
                        { name: 'OrgPatientGlobalIDType', type: 'int', allowNull: false, description: '参照第4章节中关键字段说明' },
                        { name: 'OrgPatientGlobalID', type: 'varchar', allowNull: false, length: 64, description: '参照第4章节中关键字段说明' },
                        { name: 'OrgSystemCode', type: 'varchar', allowNull: false, length: 200, description: '参照第4章节中关键字段说明' },
                        { name: 'IdentifyNo', type: 'varchar', allowNull: true, length: 64, description: '' },
                        { name: 'IdentifyType', type: 'varchar', allowNull: true, length: 30, description: '参照10.1' },
                        { name: 'Sex', type: 'int', allowNull: false, description: '参照10.2' },
                        { name: 'Name', type: 'nvarchar', allowNull: false, length: 64, description: '' },
                        { name: 'NamePY', type: 'varchar', allowNull: true, length: 250, description: '' },
                        { name: 'PatType', type: 'int', allowNull: false, description: '1:本市 2:外地 3:境外（港澳台） 4:外国 5:未知' },
                        { name: 'Marriage', type: 'varchar', allowNull: true, length: 30, description: '参照10.3' },
                        { name: 'BirthDay', type: 'datetime', allowNull: true, description: 'yyyyMMdd' },
                        { name: 'BirthPlace', type: 'varchar', allowNull: true, length: 1000, description: '参照国标GB/T2260-2007' },
                        { name: 'Nation', type: 'varchar', allowNull: true, length: 1000, description: '参照10.4' },
                        { name: 'Nationality', type: 'varchar', allowNull: true, length: 1000, description: '参照国标GB/T 2659.1-2022' },
                        { name: 'NativePlace', type: 'varchar', allowNull: true, length: 100, description: '参照国标GB/T2260-2007' },
                        { name: 'Occupation', type: 'varchar', allowNull: true, length: 100, description: '参照国标GB/T6565-2015' },
                        { name: 'Blood', type: 'int', allowNull: true, description: '1：A 2：B 3：0 4：AB 5：不详 6：未查' },
                        { name: 'RHBlood', type: 'int', allowNull: true, description: '1：阴 2：阳 3：不详 4：未查' },
                        { name: 'Tel', type: 'varchar', allowNull: true, length: 30, description: '' },
                        { name: 'Phone', type: 'varchar', allowNull: false, length: 30, description: '' },
                        { name: 'CompyPostalCode', type: 'varchar', allowNull: true, length: 30, description: '' },
                        { name: 'CompyName', type: 'varchar', allowNull: true, length: 1000, description: '' },
                        { name: 'CompyAdd', type: 'varchar', allowNull: true, length: 1000, description: '' },
                        { name: 'CompyTel', type: 'varchar', allowNull: true, length: 30, description: '' },
                        { name: 'Address', type: 'varchar', allowNull: true, length: 1000, description: '' },
                        { name: 'AddressPCode', type: 'varchar', allowNull: true, length: 30, description: '' },
                        { name: 'CitizenLiveDistrictCode', type: 'varchar', allowNull: true, length: 6, description: '参照国标GB/T2260-2007' },
                        { name: 'HhAdd', type: 'varchar', allowNull: true, length: 1000, description: '' },
                        { name: 'HhPcode', type: 'varchar', allowNull: true, length: 30, description: '' },
                        { name: 'CitizenRegistrationDistrictCode', type: 'varchar', allowNull: true, length: 6, description: '参照国标GB/T2260-2007' },
                        { name: 'Contacts', type: 'nvarchar', allowNull: true, length: 64, description: '' },
                        { name: 'ContactRs', type: 'varchar', allowNull: true, length: 200, description: '参照国标GB/T4761-2008' },
                        { name: 'ContactAdd', type: 'varchar', allowNull: true, length: 1000, description: '' },
                        { name: 'ContactPcode', type: 'varchar', allowNull: true, length: 30, description: '' },
                        { name: 'ContactTel', type: 'varchar', allowNull: true, length: 30, description: '' },
                        { name: 'UpdateTime', type: 'datetime', allowNull: false, description: 'yyyyMMddHH:mm:ss.fff' },
                        { name: 'AlterFlag', type: 'int', allowNull: false, description: '1:正常 2:撤销', defaultValue: 1 }
                    ]
                },
                {
                    id: '1-2',
                    name: '入院记录',
                    fields: [
                        { name: 'OrgID', type: 'int', allowNull: false, description: '参照第4章节中关键字段说明' },
                        { name: 'OrgPatientGlobalIDType', type: 'int', allowNull: false, description: '参照第4章节中关键字段说明' },
                        { name: 'OrgPatientGlobalID', type: 'varchar', allowNull: false, length: 64, description: '参照第4章节中关键字段说明' },
                        { name: 'OrgSystemCode', type: 'varchar', allowNull: false, length: 200, description: '参照第4章节中关键字段说明' },
                        { name: 'VisitType', type: 'int', allowNull: false, description: '参照第4章节中关键字段说明' },
                        { name: 'VisitSerialNo', type: 'varchar', allowNull: false, length: 50, description: '参照第4章节中关键字段说明' },
                        { name: 'ResidentAdmitNoteID', type: 'varchar', allowNull: false, length: 200, description: '医疗机构内部唯一标识入院记录的ID' },
                        { name: 'OutPatientID', type: 'varchar', allowNull: true, length: 64, description: '' },
                        { name: 'InPatientID', type: 'varchar', allowNull: true, length: 64, description: '' },
                        { name: 'VisitNumber', type: 'varchar', allowNull: true, length: 64, description: '' },
                        { name: 'MedicalInsuranceCardNo', type: 'varchar', allowNull: true, length: 64, description: '' },
                        { name: 'CitizenSINCardDistrictCode', type: 'varchar', allowNull: true, length: 6, description: '参照国标GB/T2260-2007标准' },
                        { name: 'HealthCardNo', type: 'varchar', allowNull: true, length: 64, description: '' },
                        { name: 'HealthCardNoDistrictCode', type: 'varchar', allowNull: true, length: 6, description: '参照国标GB/T2260-2007标准' },
                        { name: 'Age', type: 'varchar', allowNull: false, length: 30, description: '比如23岁' },
                        { name: 'Height', type: 'varchar', allowNull: true, length: 30, description: '带单位cm' },
                        { name: 'Weight', type: 'varchar', allowNull: true, length: 30, description: '带单位kg' },
                        { name: 'AdmitType', type: 'varchar', allowNull: true, length: 30, description: '区分住院就诊业务类型。' },
                        { name: 'MedicalRecordNumber', type: 'varchar', allowNull: false, length: 64, description: '' },
                        { name: 'DeptCode', type: 'varchar', allowNull: true, length: 50, description: '' },
                        { name: 'DeptName', type: 'nvarchar', allowNull: false, length: 100, description: '' },
                        { name: 'AdmitDate', type: 'datetime', allowNull: false, description: 'yyyyMMddHH:mm:ss' },
                        { name: 'Ward', type: 'varchar', allowNull: true, length: 30, description: '' },
                        { name: 'BuildNo', type: 'varchar', allowNull: true, length: 30, description: '' },
                        { name: 'BedNo', type: 'varchar', allowNull: true, length: 30, description: '' },
                        { name: 'HistoryTeller', type: 'varchar', allowNull: true, length: 30, description: '' },
                        { name: 'Complaint', type: 'varchar', allowNull: true, length: 'max', description: '' },
                        { name: 'HistoryOfPresentIllness', type: 'varchar', allowNull: true, length: 'max', description: '' },
                        { name: 'PastMedHistory', type: 'varchar', allowNull: true, length: 'max', description: '' },
                        { name: 'PersonalHistory', type: 'varchar', allowNull: true, length: 'max', description: '' },
                        { name: 'ObstericalHistory', type: 'varchar', allowNull: true, length: 'max', description: '' },
                        { name: 'FamilyHistory', type: 'varchar', allowNull: true, length: 'max', description: '' },
                        { name: 'PhysicalExamination', type: 'varchar', allowNull: true, length: 'max', description: '' },
                        { name: 'SpecialityCheckup', type: 'varchar', allowNull: true, length: 'max', description: '' },
                        { name: 'AuxiliaryExamination', type: 'varchar', allowNull: true, length: 'max', description: '' },
                        { name: 'AdmissionDiag', type: 'varchar', allowNull: true, length: 'max', description: '' },
                        { name: 'RecordTime', type: 'datetime', allowNull: false, description: 'yyyyMMddHH:mm:ss' },
                        { name: 'RecordContent', type: 'varchar', allowNull: true, length: 'max', description: '若记录内容无法拆分成多个字段，则记录内容存放到该字段' },
                        { name: 'XmlData', type: 'varchar', allowNull: true, length: 'max', description: '该记录的 XML格式文件的下载路径' },
                        { name: 'XmlDataVersion', type: 'varchar', allowNull: true, length: 20, description: 'XML内容格式对应的版本号' },
                        { name: 'FilePath', type: 'varchar', allowNull: true, length: 'max', description: '该记录的 PDF格式文件的下载路径' },
                        { name: 'UpdateTime', type: 'datetime', allowNull: false, description: 'yyyyMMddHH:mm:ss.fff' },
                        { name: 'AlterFlag', type: 'int', allowNull: false, description: '1:正常, 2:撤销', defaultValue: 1 }
                    ]
                }
            ]
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
                { title: '药品列表', key: '0-2-0' }
            ],
            tables: [
                {
                    id: '2-1',
                    name: '药品列表',
                    fields: [
                        { name: '药品ID', type: 'varchar', allowNull: false, length: 255, description: '药品唯一标识符' },
                        { name: '药品名称', type: 'varchar', allowNull: false, length: 255, description: '药品名称' },
                        { name: '药品类型', type: 'varchar', allowNull: false, length: 255, description: '药品类型' },
                        { name: '生产日期', type: 'datetime', allowNull: false, description: '药品生产日期' },
                        { name: '有效期', type: 'datetime', allowNull: false, description: '药品有效期' },
                        { name: '供应商', type: 'varchar', allowNull: false, length: 255, description: '药品供应商' },
                        { name: '价格', type: 'decimal', allowNull: false, description: '药品价格' },
                        { name: '库存数量', type: 'int', allowNull: false, description: '药品库存数量' }
                    ]
                }
            ]
        }
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [currentDataSource, setCurrentDataSource] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedSources, setSelectedSources] = useState([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [currentFields, setCurrentFields] = useState([]); // Add state for current fields

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

    const handleTreeSelect = (selectedKeys, info) => {
        if (info.node && currentDataSource) {
            const table = currentDataSource.tables.find(t => t.name === info.node.title);
            if (table) {
                setCurrentFields(table.fields);
            } else {
                setCurrentFields([]);  // 清空字段列表
            }
        }
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
                onSelect={(selectedKeys, info) => {
                    const table = record.tables.find(t => t.name === info.node.title);
                    if (table) {
                        setCurrentDataSource({ ...record, currentFields: table.fields });
                    } else {
                        setCurrentDataSource({ ...record, currentFields: [] });
                    }
                }}
            />
            {currentDataSource?.key === record.key && currentDataSource.currentFields.length > 0 && (
                <div style={{ marginTop: 20 }}>
                    <h3>表字段信息</h3>
                    <Table
                        dataSource={currentDataSource.currentFields}
                        columns={[
                            { title: '字段名称', dataIndex: 'name', key: 'name' },
                            { title: '数据类型', dataIndex: 'type', key: 'type' },
                            { title: '是否为空', dataIndex: 'allowNull', key: 'allowNull', render: (text) => (text ? '是' : '否') },
                            { title: '长度', dataIndex: 'length', key: 'length' },
                            { title: '描述', dataIndex: 'description', key: 'description' }
                        ]}
                        pagination={false}
                        rowKey="name"
                    />
                </div>
            )}
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
                        <Button icon={<PlusOutlined/>} onClick={showAddDataSourceModal}>添加</Button>
                        <Button icon={<DeleteOutlined/>} onClick={handleBulkDelete}
                                disabled={!selectedSources.length}>删除</Button>
                        <Button icon={<SyncOutlined/>}>刷新</Button>
                        <Button icon={<StopOutlined/>}>停用</Button>
                    </div>
                }
            >
                <div className="search-bar">
                    <Input
                        prefix={<SearchOutlined/>}
                        placeholder="搜索数据源名称、类型或资源目录"
                        value={searchText}
                        onChange={handleSearch}
                        style={{width: 300, marginBottom: 20}}
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
                        expandable={{expandedRowRender, expandedRowKeys, onExpand: handleExpand}}
                        pagination={false}
                    />
                )}
            </Card>
            <Modal
                title={<div style={{
                    textAlign: 'center',
                    fontSize: '20px',
                    fontWeight: 'bold'
                }}>{isEdit ? '编辑数据源' : '添加数据源'}</div>}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                centered
                bodyStyle={{padding: '24px', fontFamily: 'Arial, sans-serif'}}
                style={{borderRadius: '10px', overflow: 'hidden'}}
            >
                {dataSourceForm}
            </Modal>
        </div>
    );
};

export default DataSourceManagement;
