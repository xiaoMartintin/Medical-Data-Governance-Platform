import React, { useState } from 'react';
import { Card, Form, Input, Button, Select, Tree, Modal, message, Collapse, Switch, Table, Empty, Steps, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import '../style/MappingRuleManagement.css';

const { Option } = Select;
const { Panel } = Collapse;
const { Step } = Steps;

const fakeDataSources = [
    {
        id: '1',
        name: 'Hospital Database 1',
        type: 'MySQL',
        host: '192.168.10.1',
        port: '3306',
        database: 'hospital_db1',
        username: 'admin1',
        tag: 'main_hospital',
        description: 'Primary hospital database for patient records and appointments',
        tables: [
            {
                id: '1-1',
                name: 'Patients',
                fields: [
                    { name: 'patient_id', type: 'varchar', allowNull: false, length: 255, description: 'Unique identifier for each patient' },
                    { name: 'name', type: 'varchar', allowNull: false, length: 255, description: 'Full name of the patient' },
                    { name: 'dob', type: 'date', allowNull: false, length: null, description: 'Date of birth of the patient' },
                    { name: 'contact_number', type: 'varchar', allowNull: true, length: 20, description: 'Contact number of the patient' }
                ]
            },
            {
                id: '1-2',
                name: 'Appointments',
                fields: [
                    { name: 'appointment_id', type: 'varchar', allowNull: false, length: 255, description: 'Unique identifier for each appointment' },
                    { name: 'patient_id', type: 'varchar', allowNull: false, length: 255, description: 'Identifier for the patient' },
                    { name: 'doctor_id', type: 'varchar', allowNull: false, length: 255, description: 'Identifier for the doctor' },
                    { name: 'appointment_date', type: 'datetime', allowNull: false, length: null, description: 'Date and time of the appointment' }
                ]
            }
        ]
    },
    {
        id: '2',
        name: 'Hospital Database 2',
        type: 'PostgreSQL',
        host: '192.168.10.2',
        port: '5432',
        database: 'hospital_db2',
        username: 'admin2',
        tag: 'branch_hospital',
        description: 'Secondary hospital database for medical records and prescriptions',
        tables: [
            {
                id: '2-1',
                name: 'MedicalRecords',
                fields: [
                    { name: 'record_id', type: 'varchar', allowNull: false, length: 255, description: 'Unique identifier for each medical record' },
                    { name: 'patient_id', type: 'varchar', allowNull: false, length: 255, description: 'Identifier for the patient' },
                    { name: 'diagnosis', type: 'text', allowNull: false, length: null, description: 'Diagnosis details' },
                    { name: 'treatment', type: 'text', allowNull: false, length: null, description: 'Treatment details' }
                ]
            },
            {
                id: '2-2',
                name: 'Prescriptions',
                fields: [
                    { name: 'prescription_id', type: 'varchar', allowNull: false, length: 255, description: 'Unique identifier for each prescription' },
                    { name: 'patient_id', type: 'varchar', allowNull: false, length: 255, description: 'Identifier for the patient' },
                    { name: 'medication', type: 'varchar', allowNull: false, length: 255, description: 'Medication prescribed' },
                    { name: 'dosage', type: 'varchar', allowNull: false, length: 255, description: 'Dosage instructions' }
                ]
            }
        ]
    },
    {
        id: '3',
        name: 'Hospital Database 3',
        type: 'Oracle',
        host: '192.168.10.3',
        port: '1521',
        database: 'hospital_db3',
        username: 'admin3',
        tag: 'emergency_hospital',
        description: 'Emergency hospital database for emergency room records and staff schedules',
        tables: [
            {
                id: '3-1',
                name: 'ERRecords',
                fields: [
                    { name: 'er_id', type: 'varchar', allowNull: false, length: 255, description: 'Unique identifier for each ER record' },
                    { name: 'patient_id', type: 'varchar', allowNull: false, length: 255, description: 'Identifier for the patient' },
                    { name: 'arrival_time', type: 'datetime', allowNull: false, length: null, description: 'Time of arrival in the emergency room' },
                    { name: 'treatment_given', type: 'text', allowNull: false, length: null, description: 'Details of the treatment given' }
                ]
            },
            {
                id: '3-2',
                name: 'StaffSchedules',
                fields: [
                    { name: 'schedule_id', type: 'varchar', allowNull: false, length: 255, description: 'Unique identifier for each schedule' },
                    { name: 'staff_id', type: 'varchar', allowNull: false, length: 255, description: 'Identifier for the staff member' },
                    { name: 'shift_start', type: 'datetime', allowNull: false, length: null, description: 'Start time of the shift' },
                    { name: 'shift_end', type: 'datetime', allowNull: false, length: null, description: 'End time of the shift' }
                ]
            }
        ]
    }
];

const initialDataStandards = [
    {
        uuid: '1234567890',
        name: 'Patient Data Standard',
        description: 'Standard for patient personal and contact information',
        version: '1.0',
        versionDescription: 'Initial version',
        fields: [
            { name: 'patient_id', type: 'varchar', allowNull: false, length: 255, description: 'Unique identifier for each patient' },
            { name: 'name', type: 'varchar', allowNull: false, length: 255, description: 'Full name of the patient' },
            { name: 'dob', type: 'date', allowNull: false, length: null, description: 'Date of birth of the patient' },
            { name: 'contact_number', type: 'varchar', allowNull: true, length: 20, description: 'Contact number of the patient' }
        ],
    },
    {
        uuid: '0987654321',
        name: 'Appointment Data Standard',
        description: 'Standard for appointment scheduling information',
        version: '1.1',
        versionDescription: 'Minor Update',
        fields: [
            { name: 'appointment_id', type: 'varchar', allowNull: false, length: 255, description: 'Unique identifier for each appointment' },
            { name: 'patient_id', type: 'varchar', allowNull: false, length: 255, description: 'Identifier for the patient' },
            { name: 'doctor_id', type: 'varchar', allowNull: false, length: 255, description: 'Identifier for the doctor' },
            { name: 'appointment_date', type: 'datetime', allowNull: false, length: null, description: 'Date and time of the appointment' }
        ],
    },
    {
        uuid: '1122334455',
        name: 'Medical Record Data Standard',
        description: 'Standard for medical records and treatments',
        version: '1.0',
        versionDescription: 'Initial version',
        fields: [
            { name: 'record_id', type: 'varchar', allowNull: false, length: 255, description: 'Unique identifier for each medical record' },
            { name: 'patient_id', type: 'varchar', allowNull: false, length: 255, description: 'Identifier for the patient' },
            { name: 'diagnosis', type: 'text', allowNull: false, length: null, description: 'Diagnosis details' },
            { name: 'treatment', type: 'text', allowNull: false, length: null, description: 'Treatment details' }
        ],
    },
];


const MappingRuleManagement = () => {
    const [isRuleModalVisible, setIsRuleModalVisible] = useState(false);
    const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);
    const [isSourceModalVisible, setIsSourceModalVisible] = useState(false);
    const [isStandardModalVisible, setIsStandardModalVisible] = useState(false);
    const [isMappingModalVisible, setIsMappingModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedRuleDetails, setSelectedRuleDetails] = useState(null);
    const [currentSourceField, setCurrentSourceField] = useState(null);
    const [currentStandardField, setCurrentStandardField] = useState(null);

    const [ruleGroups, setRuleGroups] = useState([
        { title: '规则组1', key: '0-0', children: [{ title: '规则1', key: '0-0-0' }, { title: '规则2', key: '0-0-1' }] },
        { title: '规则组2', key: '0-1', children: [{ title: '规则3', key: '0-1-0' }, { title: '规则4', key: '0-1-1' }] },
        { title: '规则组3', key: '0-2', children: [] },
    ]);

    const [currentRuleGroup, setCurrentRuleGroup] = useState('');
    const [currentRule, setCurrentRule] = useState('');
    const [form] = Form.useForm();
    const [groupForm] = Form.useForm();
    const [sourceForm] = Form.useForm();
    const [standardForm] = Form.useForm();
    const [mappingForm] = Form.useForm();
    const [newGroupName, setNewGroupName] = useState('');
    const [selectedDataSources, setSelectedDataSources] = useState([]);
    const [selectedTables, setSelectedTables] = useState([]);
    const [currentDataSource, setCurrentDataSource] = useState(null);
    const [currentTable, setCurrentTable] = useState(null);
    const [selectedStandard, setSelectedStandard] = useState(null);
    const [mappings, setMappings] = useState([]);
    const [sourceFields, setSourceFields] = useState([]);
    const [standardFields, setStandardFields] = useState([]);
    const [fieldMappings, setFieldMappings] = useState([]);
    const [selectedMappings, setSelectedMappings] = useState([]);
    const originalSourceFields = [...sourceFields];
    const originalStandardFields = [...standardFields];


    const onTreeSelect = (selectedKeys, info) => {
        const selectedNode = info.node;
        setSelectedRuleDetails({
            规则名称: selectedNode.title,
            状态: true,
            风险等级: '高风险',
            规则描述: 'grant, revoke等操作',
        });
    };

    const showAddRuleModal = () => {
        setIsRuleModalVisible(true);
        setIsEdit(false);
        setCurrentRuleGroup('');
        setCurrentRule('');
        form.resetFields();
    };

    const showEditRuleModal = (ruleGroupKey, ruleKey) => {
        setIsRuleModalVisible(true);
        setIsEdit(true);
        const group = ruleGroups.find((group) => group.key === ruleGroupKey);
        const rule = group.children.find((r) => r.key === ruleKey);
        setCurrentRuleGroup(group.key);
        setCurrentRule(rule.key);
        form.setFieldsValue({ ruleGroup: group.title, ruleName: rule.title });
    };

    const showEditRuleGroupModal = (ruleGroupKey) => {
        const group = ruleGroups.find((group) => group.key === ruleGroupKey);
        groupForm.setFieldsValue({ groupName: group.title });
        setCurrentRuleGroup(group.key);
        setIsGroupModalVisible(true);
    };

    const handleCancel = () => {
        setIsRuleModalVisible(false);
        setIsGroupModalVisible(false);
        setIsSourceModalVisible(false);
        setIsStandardModalVisible(false);
        setIsMappingModalVisible(false);
        setNewGroupName('');
    };

    const handleAddOrEditRule = (values) => {
        if (values.ruleGroup === '新建规则组' && !newGroupName) {
            message.error('请输入新建规则组名称');
            return;
        }

        if (isEdit) {
            const updatedRuleGroups = ruleGroups.map((group) => {
                if (group.key === currentRuleGroup) {
                    return { ...group, children: group.children.filter((rule) => rule.key !== currentRule) };
                }
                if (group.title === values.ruleGroup) {
                    return { ...group, children: [...group.children, { title: values.ruleName, key: `${group.key}-${group.children.length}` }] };
                }
                return group;
            });
            setRuleGroups(updatedRuleGroups);
            message.success('规则编辑成功');
        } else {
            if (values.ruleGroup === '新建规则组') {
                const newRuleGroup = { title: newGroupName, key: `0-${ruleGroups.length}`, children: [{ title: values.ruleName, key: `0-${ruleGroups.length}-0` }] };
                setRuleGroups([...ruleGroups, newRuleGroup]);
                message.success('新规则组添加成功');
            } else {
                const group = ruleGroups.find((group) => group.title === values.ruleGroup);
                const newKey = `${group.key}-${group.children.length}`;
                const newRule = { title: values.ruleName, key: newKey };
                const updatedRuleGroups = ruleGroups.map((g) => {
                    if (g.key === group.key) {
                        return { ...g, children: [...g.children, newRule] };
                    }
                    return g;
                });
                setRuleGroups(updatedRuleGroups);
                message.success('规则添加成功');
            }
        }
        setIsRuleModalVisible(false);
        setNewGroupName('');
    };

    const handleDeleteRule = (ruleGroupKey, ruleKey) => {
        const updatedRuleGroups = ruleGroups.map((group) => {
            if (group.key === ruleGroupKey) {
                const filteredChildren = group.children.filter((rule) => rule.key !== ruleKey);
                return { ...group, children: filteredChildren };
            }
            return group;
        }).filter((group) => group.children.length > 0); // Remove empty groups
        setRuleGroups(updatedRuleGroups);
        message.success('规则删除成功');
    };

    const handleDeleteRuleGroup = (ruleGroupKey) => {
        const updatedRuleGroups = ruleGroups.filter((group) => group.key !== ruleGroupKey);
        setRuleGroups(updatedRuleGroups);
        message.success('规则组删除成功');
    };

    const handleRuleGroupChange = (value) => {
        if (value === '新建规则组') {
            form.setFieldsValue({ newRuleGroupName: '' });
            setNewGroupName('');
        }
    };

    const handleEditRuleGroup = (values) => {
        const updatedRuleGroups = ruleGroups.map((group) => {
            if (group.key === currentRuleGroup) {
                return { ...group, title: values.groupName };
            }
            return group;
        });
        setRuleGroups(updatedRuleGroups);
        message.success('规则组名称编辑成功');
        setIsGroupModalVisible(false);
    };

    const handleAddSource = () => {
        const tableId = sourceForm.getFieldValue('tableId');
        const selectedTable = currentDataSource?.tables?.find((table) => table.id === tableId);

        if (currentDataSource && selectedTable) {
            setSelectedDataSources([...selectedDataSources, currentDataSource]);
            setSelectedTables([...selectedTables, selectedTable]);
            message.success('数据源添加成功');
            setIsSourceModalVisible(false);
            setCurrentDataSource(null);
            setCurrentTable(null);
        } else {
            message.error('选择的数据源或数据表无效');
        }
    };

    const handleAddStandard = () => {
        const standardId = standardForm.getFieldValue('standardId');
        const selectedStandard = initialDataStandards.find((standard) => standard.uuid === standardId);

        if (selectedStandard) {
            setSelectedStandard(selectedStandard);
            message.success('数据标准添加成功');
            setIsStandardModalVisible(false);
        } else {
            message.error('选择的数据标准无效');
        }
    };

    const handleAddMapping = () => {
        if (currentSourceField && currentStandardField) {
            const newMapping = {
                sourceField: currentSourceField,
                standardField: currentStandardField
            };
            setFieldMappings([...fieldMappings, newMapping]);

            // Remove mapped fields from the selection lists
            setSourceFields(prevFields => prevFields.filter(field => field.name !== currentSourceField.name));
            setStandardFields(prevFields => prevFields.filter(field => field.name !== currentStandardField.name));

            // Clear current fields
            setCurrentSourceField(null);
            setCurrentStandardField(null);
            message.success('字段映射添加成功');
        } else {
            message.error('请选择源字段和标准字段');
        }
    };

    const handleDeleteMapping = (index) => {
        const updatedMappings = fieldMappings.filter((_, i) => i !== index);
        const deletedMapping = fieldMappings[index];
        setFieldMappings(updatedMappings);
        // Add deleted fields back to the selection lists
        setSourceFields([...sourceFields, deletedMapping.sourceField]);
        setStandardFields([...standardFields, deletedMapping.standardField]);
        message.success('字段映射删除成功');
    };

    const handleMappingOk = () => {
        setIsMappingModalVisible(false);
    };

    const handleMappingCancel = () => {
        setIsMappingModalVisible(false);
    };

    const showAddSourceModal = () => {
        setIsSourceModalVisible(true);
        sourceForm.resetFields();
        setCurrentDataSource(null);
        setCurrentTable(null);
    };

    const showAddStandardModal = () => {
        setIsStandardModalVisible(true);
        standardForm.resetFields();
    };

    const showMappingModal = () => {
        if (selectedDataSources.length > 0 && selectedStandard) {
            const sourceFields = selectedTables.flatMap(table => table.fields).filter(field => !fieldMappings.some(mapping => mapping.sourceField.name === field.name));
            const standardFields = selectedStandard.fields.filter(field => !fieldMappings.some(mapping => mapping.standardField.name === field.name));
            setSourceFields(sourceFields);
            setStandardFields(standardFields);
            setIsMappingModalVisible(true);
        } else {
            message.error('请先选择数据源和数据标准');
        }
    };

    return (
        <div className="mapping-rule-management">
            <div className="header">
                <Button type="primary" onClick={showAddRuleModal}>添加规则</Button>
                <div className="right-buttons">
                    <Button type="primary" onClick={() => message.success('规则保存成功')}>保存</Button>
                </div>
            </div>
            <div className="content">
                <div className="left-panel">
                    <Tree
                        showLine
                        defaultExpandAll
                        treeData={ruleGroups}
                        titleRender={(node) => (
                            <div className="tree-node">
                                {node.title}
                                <div className="icon-right">
                                    {!node.children && (
                                        <>
                                            <EditOutlined onClick={() => showEditRuleModal(node.key.split('-').slice(0, 2).join('-'), node.key)} />
                                            <DeleteOutlined onClick={() => handleDeleteRule(node.key.split('-').slice(0, 2).join('-'), node.key)} />
                                        </>
                                    )}
                                    {node.children && (
                                        <>
                                            <EditOutlined onClick={() => showEditRuleGroupModal(node.key)} />
                                            <DeleteOutlined onClick={() => handleDeleteRuleGroup(node.key)} />
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                        onSelect={onTreeSelect}
                    />
                </div>
                <div className="right-panel">
                    {selectedRuleDetails ? (
                        <Collapse expandIconPosition="right" defaultActiveKey={[]}>
                            {['基本信息', '源数据', '数据标准', '字段映射'].map((key, index) => (
                                <Panel header={key} key={index}>
                                    {key === '基本信息' ? (
                                        <Form layout="vertical" initialValues={selectedRuleDetails}>
                                            <Form.Item label="规则名称" name="规则名称" rules={[{ required: true, message: '请输入规则名称' }]}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item label="状态" name="状态" valuePropName="checked">
                                                <Switch checkedChildren="ON" unCheckedChildren="OFF" />
                                            </Form.Item>
                                            <Form.Item label="风险等级" name="风险等级" rules={[{ required: true, message: '请选择风险等级' }]}>
                                                <Select>
                                                    <Option value="低风险">低风险</Option>
                                                    <Option value="中风险">中风险</Option>
                                                    <Option value="高风险">高风险</Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item label="规则描述" name="规则描述" rules={[{ required: true, message: '请输入规则描述' }]}>
                                                <Input.TextArea />
                                            </Form.Item>
                                        </Form>
                                    ) : key === '源数据' ? (
                                        <>
                                            <Button type="primary" icon={<PlusOutlined />} onClick={showAddSourceModal} style={{ marginBottom: 16 }}>添加数据源</Button>
                                            {selectedDataSources.length > 0 && selectedTables.length > 0 ? (
                                                <div>
                                                    {selectedDataSources.map((dataSource, index) => (
                                                        <div key={dataSource.id}>
                                                            <h3>数据源：{dataSource.name}</h3>
                                                            <h4>数据表：{selectedTables[index].name}</h4>
                                                            <Table
                                                                dataSource={selectedTables[index].fields}
                                                                columns={[
                                                                    { title: '字段名称', dataIndex: 'name', key: 'name' },
                                                                    { title: '类型', dataIndex: 'type', key: 'type' },
                                                                    { title: '允许空值', dataIndex: 'allowNull', key: 'allowNull', render: (text) => (text ? '是' : '否') },
                                                                    { title: '长度', dataIndex: 'length', key: 'length' },
                                                                    { title: '描述', dataIndex: 'description', key: 'description' },
                                                                ]}
                                                                pagination={false}
                                                                locale={{ emptyText: '无字段' }}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <Empty description="请添加数据源" />
                                            )}
                                        </>
                                    ) : key === '数据标准' ? (
                                        <>
                                            <Button type="primary" icon={<PlusOutlined />} onClick={showAddStandardModal} style={{ marginBottom: 16 }}>添加数据标准</Button>
                                            {selectedStandard ? (
                                                <div>
                                                    <h3>数据标准：{selectedStandard.name}</h3>
                                                    <h4>版本：{selectedStandard.version} - {selectedStandard.versionDescription}</h4>
                                                    <Table
                                                        dataSource={selectedStandard.fields}
                                                        columns={[
                                                            { title: '字段名称', dataIndex: 'name', key: 'name' },
                                                            { title: '类型', dataIndex: 'type', key: 'type' },
                                                            { title: '允许空值', dataIndex: 'allowNull', key: 'allowNull', render: (text) => (text ? '是' : '否') },
                                                            { title: '长度', dataIndex: 'length', key: 'length' },
                                                            { title: '描述', dataIndex: 'description', key: 'description' },
                                                        ]}
                                                        pagination={false}
                                                        locale={{ emptyText: '无字段' }}
                                                    />
                                                </div>
                                            ) : (
                                                <Empty description="请添加数据标准" />
                                            )}
                                        </>
                                    ) : key === '字段映射' ? (
                                        <>
                                            <Button type="primary" onClick={showMappingModal}>字段映射</Button>
                                            <Button type="danger" icon={<DeleteOutlined />} style={{ marginLeft: 16 }} onClick={() => setFieldMappings([])}>
                                                删除所有字段映射
                                            </Button>
                                            {fieldMappings.length > 0 ? (
                                                <Table
                                                    rowSelection={{
                                                        selectedRowKeys: selectedMappings,
                                                        onChange: (selectedRowKeys) => setSelectedMappings(selectedRowKeys),
                                                    }}
                                                    dataSource={fieldMappings}
                                                    columns={[
                                                        { title: '源字段名称', dataIndex: ['sourceField', 'name'], key: 'sourceField' },
                                                        { title: '数据标准字段名称', dataIndex: ['standardField', 'name'], key: 'standardField' },
                                                        {
                                                            title: '操作',
                                                            key: 'action',
                                                            render: (_, record, index) => (
                                                                <Button type="link" onClick={() => handleDeleteMapping(index)}>删除</Button>
                                                            )
                                                        },
                                                    ]}
                                                    pagination={false}
                                                    locale={{ emptyText: '暂无字段映射' }}
                                                />
                                            ) : (
                                                <Empty description="暂无字段映射" />
                                            )}
                                        </>
                                    ) : (
                                        <p>{selectedRuleDetails[key]}</p>
                                    )}
                                </Panel>
                            ))}
                        </Collapse>
                    ) : (
                        <Card title="基本信息">请从左侧选择一个规则以查看详细信息。</Card>
                    )}
                </div>
            </div>
            <Modal title="编辑规则" visible={isRuleModalVisible} onCancel={handleCancel} footer={null}>
                <Form layout="vertical" onFinish={handleAddOrEditRule} form={form}>
                    <Form.Item label="规则组" name="ruleGroup" rules={[{ required: true, message: '请选择规则组' }]}>
                        <Select onChange={handleRuleGroupChange}>
                            {ruleGroups.map((group) => (
                                <Option key={group.key} value={group.title}>{group.title}</Option>
                            ))}
                            <Option value="新建规则组">新建规则组</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.ruleGroup !== currentValues.ruleGroup}>
                        {({ getFieldValue }) => getFieldValue('ruleGroup') === '新建规则组' ? (
                            <Form.Item label="新规则组名称" name="newRuleGroupName" rules={[{ required: true, message: '请输入新规则组名称' }]}>
                                <Input placeholder="请输入新规则组名称" onChange={(e) => setNewGroupName(e.target.value)} />
                            </Form.Item>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="规则名称" name="ruleName" rules={[{ required: true, message: '请输入规则名称' }]}>
                        <Input placeholder="请输入规则名称" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">确定</Button>
                        <Button type="default" onClick={handleCancel} style={{ marginLeft: 8 }}>取消</Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="编辑规则组" visible={isGroupModalVisible} onCancel={handleCancel} footer={null}>
                <Form layout="vertical" onFinish={handleEditRuleGroup} form={groupForm}>
                    <Form.Item label="规则组名称" name="groupName" rules={[{ required: true, message: '请输入规则组名称' }]}>
                        <Input placeholder="请输入规则组名称" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">确定</Button>
                        <Button type="default" onClick={handleCancel} style={{ marginLeft: 8 }}>取消</Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="添加数据源" visible={isSourceModalVisible} onCancel={handleCancel} footer={null}>
                <Steps current={currentDataSource ? 1 : 0} style={{ margin: '24px 0' }}>
                    <Step title="选择数据源" />
                    <Step title="选择数据表" />
                </Steps>
                {currentDataSource ? (
                    <Form form={sourceForm} layout="vertical" initialValues={{ dataSourceId: currentDataSource.id }}>
                        <Form.Item label="数据源类型">
                            <Input value={currentDataSource.type} disabled />
                        </Form.Item>
                        <Form.Item label="数据库地址">
                            <Input value={`${currentDataSource.host}:${currentDataSource.port}`} disabled />
                        </Form.Item>
                        <Form.Item label="数据库名称">
                            <Input value={currentDataSource.database} disabled />
                        </Form.Item>
                        <Form.Item label="用户名">
                            <Input value={currentDataSource.username} disabled />
                        </Form.Item>
                        <Form.Item label="标签">
                            <Input value={currentDataSource.tag} disabled />
                        </Form.Item>
                        <Form.Item label="描述">
                            <Input.TextArea value={currentDataSource.description} disabled />
                        </Form.Item>
                        <Form.Item label="选择数据表" name="tableId" rules={[{ required: true, message: '请选择数据表' }]}>
                            <Select showSearch placeholder="选择数据表" onChange={(value) => {
                                const table = currentDataSource.tables.find((table) => table.id === value);
                                setCurrentTable(table);
                                sourceForm.setFieldsValue({ tableId: value });  // 确保表单字段正确更新
                            }}>
                                {currentDataSource.tables.map((table) => (
                                    <Option key={table.id} value={table.id}>{table.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" onClick={handleAddSource}>确定</Button>
                            <Button type="default" onClick={handleCancel} style={{ marginLeft: 8 }}>取消</Button>
                        </Form.Item>
                    </Form>
                ) : (
                    <Form form={sourceForm} layout="vertical">
                        <Form.Item label="选择数据源" name="dataSourceId" rules={[{ required: true, message: '请选择数据源' }]}>
                            <Select showSearch placeholder="选择数据源" onChange={(value) => {
                                const source = fakeDataSources.find((source) => source.id === value);
                                setCurrentDataSource(source);
                                setCurrentTable(null);  // Reset selected table
                                sourceForm.resetFields(['tableId']);  // Reset table selection
                            }}>
                                {fakeDataSources.map((source) => (
                                    <Option key={source.id} value={source.id}>{source.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        {currentDataSource && (
                            <Form.Item label="选择数据表" name="tableId" rules={[{ required: true, message: '请选择数据表' }]}>
                                <Select showSearch placeholder="选择数据表" onChange={(value) => {
                                    const table = currentDataSource.tables.find((table) => table.id === value);
                                    setCurrentTable(table);
                                    sourceForm.setFieldsValue({ tableId: value });  // 确保表单字段正确更新
                                }}>
                                    {currentDataSource.tables.map((table) => (
                                        <Option key={table.id} value={table.id}>{table.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        )}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" onClick={handleAddSource}>确定</Button>
                            <Button type="default" onClick={handleCancel} style={{ marginLeft: 8 }}>取消</Button>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
            <Modal title="添加数据标准" visible={isStandardModalVisible} onCancel={handleCancel} footer={null}>
                <Form form={standardForm} layout="vertical">
                    <Form.Item label="选择数据标准" name="standardId" rules={[{ required: true, message: '请选择数据标准' }]}>
                        <Select showSearch placeholder="选择数据标准" onChange={(value) => {
                            const standard = initialDataStandards.find((standard) => standard.uuid === value);
                            setSelectedStandard(standard);
                            standardForm.setFieldsValue({ standardId: value });  // 确保表单字段正确更新
                        }}>
                            {initialDataStandards.map((standard) => (
                                <Option key={standard.uuid} value={standard.uuid}>{standard.name} - {standard.version}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={handleAddStandard}>确定</Button>
                        <Button type="default" onClick={handleCancel} style={{ marginLeft: 8 }}>取消</Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/*这个Modal格式可以改的*/}
            <Modal
                title="字段映射"
                visible={isMappingModalVisible}
                onOk={handleMappingOk}
                onCancel={handleMappingCancel}
                width={800}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <h3>源数据字段</h3>
                        <Input
                            placeholder="显示源字段"
                            value={currentSourceField ? currentSourceField.name : ''}
                            readOnly
                            style={{ marginBottom: 8 }}
                        />
                        <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #ddd', padding: 8 }}>
                            {sourceFields.slice(0, 10).map(field => (
                                <div key={field.name} onClick={() => setCurrentSourceField(field)} style={{ cursor: 'pointer' }}>
                                    {field.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3>数据标准字段</h3>
                        <Input
                            placeholder="显示标准字段"
                            value={currentStandardField ? currentStandardField.name : ''}
                            readOnly
                            style={{ marginBottom: 8 }}
                        />
                        <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #ddd', padding: 8 }}>
                            {standardFields.slice(0, 10).map(field => (
                                <div key={field.name} onClick={() => setCurrentStandardField(field)} style={{ cursor: 'pointer' }}>
                                    {field.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Button type="primary" onClick={handleAddMapping} style={{ marginTop: 16 }}>添加字段映射</Button>
                <Table
                    dataSource={fieldMappings}
                    columns={[
                        { title: '源字段名称', dataIndex: ['sourceField', 'name'], key: 'sourceField' },
                        { title: '数据标准字段名称', dataIndex: ['standardField', 'name'], key: 'standardField' },
                        {
                            title: '操作',
                            key: 'action',
                            render: (_, record, index) => (
                                <Button type="link" onClick={() => handleDeleteMapping(index)}>删除</Button>
                            )
                        },
                    ]}
                    pagination={false}
                    style={{ marginTop: 16 }}
                />
            </Modal>


        </div>
    );
};

export default MappingRuleManagement;
