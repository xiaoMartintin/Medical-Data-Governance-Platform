import React, { useState } from 'react';
import { Card, Form, Input, Button, Select, Tree, Modal, message, Collapse, Switch, Tabs } from 'antd';
import { DeleteOutlined, EditOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';
import '../style/DataExtractionStrategyManagement.css';

const { Option } = Select;
const { Panel } = Collapse;
const { TabPane } = Tabs;

const DataExtractionStrategyManagement = () => {
    const [isRuleModalVisible, setIsRuleModalVisible] = useState(false);
    const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [ruleGroups, setRuleGroups] = useState([
        {
            title: '抽取策略',
            key: '0-0',
            children: [
                { title: '策略1', key: '0-0-0' },
                { title: '策略2', key: '0-0-1' },
            ],
        },
        {
            title: '定时抽取',
            key: '0-1',
            children: [
                { title: '策略3', key: '0-1-0' },
                { title: '策略4', key: '0-1-1' },
            ],
        },
        {
            title: '批量处理',
            key: '0-2',
            children: [],
        }
    ]);

    const [selectedRuleDetails, setSelectedRuleDetails] = useState({
        策略名称: '规则1',
        状态: true,
        风险等级: '高风险',
        抽取类型: '全量抽取',
        抽取频率: '每天一次',
        批量处理: false,
        策略描述: '策略描述示例',
        映射规则: '规则1',
        时间粒度: '1s'
    });

    const [currentRuleGroup, setCurrentRuleGroup] = useState('');
    const [currentRule, setCurrentRule] = useState('');
    const [form] = Form.useForm();
    const [groupForm] = Form.useForm();
    const [newGroupName, setNewGroupName] = useState('');

    const onTreeSelect = (selectedKeys, info) => {
        const selectedNode = info.node;
        setSelectedRuleDetails({
            策略名称: selectedNode.title,
            状态: true,
            风险等级: '高风险',
            抽取类型: '全量抽取',
            抽取频率: '每天一次',
            批量处理: false,
            策略描述: '策略描述示例',
            映射规则: '规则1',
            时间粒度: '1s'
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
        const group = ruleGroups.find(group => group.key === ruleGroupKey);
        const rule = group.children.find(r => r.key === ruleKey);
        setCurrentRuleGroup(group.key);
        setCurrentRule(rule.key);
        form.setFieldsValue({
            ruleGroup: group.title,
            ruleName: rule.title,
        });
    };

    const showEditRuleGroupModal = (ruleGroupKey) => {
        const group = ruleGroups.find(group => group.key === ruleGroupKey);
        groupForm.setFieldsValue({ groupName: group.title });
        setCurrentRuleGroup(group.key);
        setIsGroupModalVisible(true);
    };

    const handleCancel = () => {
        setIsRuleModalVisible(false);
        setIsGroupModalVisible(false);
        setNewGroupName('');
    };

    const handleAddOrEditRule = (values) => {
        if (values.ruleGroup === '新建策略组' && !newGroupName) {
            message.error('请输入新建策略组名称');
            return;
        }

        if (isEdit) {
            const updatedRuleGroups = ruleGroups.map((group) => {
                if (group.key === currentRuleGroup) {
                    return {
                        ...group,
                        children: group.children.filter(rule => rule.key !== currentRule),
                    };
                }
                if (group.title === values.ruleGroup) {
                    return {
                        ...group,
                        children: [...group.children, { title: values.ruleName, key: `${group.key}-${group.children.length}` }],
                    };
                }
                return group;
            });
            setRuleGroups(updatedRuleGroups);
            message.success('策略编辑成功');
        } else {
            if (values.ruleGroup === '新建策略组') {
                const newRuleGroup = {
                    title: newGroupName,
                    key: `0-${ruleGroups.length}`,
                    children: [{ title: values.ruleName, key: `0-${ruleGroups.length}-0` }],
                };
                setRuleGroups([...ruleGroups, newRuleGroup]);
                message.success('新策略组添加成功');
            } else {
                const group = ruleGroups.find(group => group.title === values.ruleGroup);
                const newKey = `${group.key}-${group.children.length}`;
                const newRule = { title: values.ruleName, key: newKey };
                const updatedRuleGroups = ruleGroups.map(g => {
                    if (g.key === group.key) {
                        return {
                            ...g,
                            children: [...g.children, newRule]
                        };
                    }
                    return g;
                });
                setRuleGroups(updatedRuleGroups);
                message.success('策略添加成功');
            }
        }
        setIsRuleModalVisible(false);
        setNewGroupName('');
    };

    const handleDeleteRule = (ruleGroupKey, ruleKey) => {
        const updatedRuleGroups = ruleGroups.map(group => {
            if (group.key === ruleGroupKey) {
                const filteredChildren = group.children.filter(rule => rule.key !== ruleKey);
                return { ...group, children: filteredChildren };
            }
            return group;
        }).filter(group => group.children.length > 0);  // Remove empty groups
        setRuleGroups(updatedRuleGroups);
        message.success('策略删除成功');
    };

    const handleDeleteRuleGroup = (ruleGroupKey) => {
        const updatedRuleGroups = ruleGroups.filter(group => group.key !== ruleGroupKey);
        setRuleGroups(updatedRuleGroups);
        message.success('策略组删除成功');
    };

    const handleRuleGroupChange = (value) => {
        if (value === '新建策略组') {
            form.setFieldsValue({ newRuleGroupName: '' });
            setNewGroupName('');
        }
    };

    const handleEditRuleGroup = (values) => {
        const updatedRuleGroups = ruleGroups.map(group => {
            if (group.key === currentRuleGroup) {
                return { ...group, title: values.groupName };
            }
            return group;
        });
        setRuleGroups(updatedRuleGroups);
        message.success('策略组名称编辑成功');
        setIsGroupModalVisible(false);
    };

    const handleSave = () => {
        // Save logic for all sections
        message.success('策略保存成功');
    };

    return (
        <div className="data-extraction-strategy-management">
            <div className="header">
                <Button type="primary" onClick={showAddRuleModal}>添加策略</Button>
                <div className="right-buttons">
                    <Button type="primary" onClick={handleSave}>保存</Button>
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
                            {['基本信息', '抽取类型', '定时抽取', '批量处理'].map((key, index) => (
                                <Panel header={key} key={index}>
                                    {key === "基本信息" ? (
                                        <Form
                                            layout="vertical"
                                            initialValues={selectedRuleDetails}
                                        >
                                            <Form.Item
                                                label="策略名称"
                                                name="策略名称"
                                                rules={[{ required: true, message: '请输入策略名称' }]}
                                            >
                                                <Input value={selectedRuleDetails ? selectedRuleDetails.策略名称 : ''} />
                                            </Form.Item>
                                            <Form.Item
                                                label="状态"
                                                name="状态"
                                                valuePropName="checked"
                                            >
                                                <Switch checkedChildren="ON" unCheckedChildren="OFF" />
                                            </Form.Item>
                                            <Form.Item
                                                label="风险等级"
                                                name="风险等级"
                                                rules={[{ required: true, message: '请选择风险等级' }]}
                                            >
                                                <Select>
                                                    <Option value="低风险">低风险</Option>
                                                    <Option value="中风险">中风险</Option>
                                                    <Option value="高风险">高风险</Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                label="策略描述"
                                                name="策略描述"
                                                rules={[{ required: true, message: '请输入策略描述' }]}
                                            >
                                                <Input.TextArea />
                                            </Form.Item>
                                            <Form
                                                layout="vertical"
                                                initialValues={selectedRuleDetails}
                                            >
                                            <Form.Item
                                                label="映射规则"
                                                name="映射规则"
                                                rules={[{ required: true, message: '请选择映射规则' }]}
                                            >
                                                <Select showSearch>
                                                    <Option value="映射规则1">映射规则1</Option>
                                                    <Option value="映射规则2">映射规则2</Option>
                                                    <Option value="映射规则3">映射规则3</Option>
                                                </Select>
                                            </Form.Item>
                                            </Form>
                                        </Form>
                                    ) : key === "抽取类型" ? (
                                        <Tabs defaultActiveKey="1" onChange={activeKey => setSelectedRuleDetails(prev => ({ ...prev, 抽取类型: activeKey === '1' ? '全量抽取' : '部分抽取' }))}>
                                            <TabPane tab="选择抽取类型" key="1">
                                                <Form layout="vertical">
                                                    <Form.Item label="抽取类型" name="抽取类型">
                                                        <Select defaultValue={selectedRuleDetails.抽取类型} onChange={value => setSelectedRuleDetails(prev => ({ ...prev, 抽取类型: value }))}>
                                                            <Option value="全量抽取">全量抽取</Option>
                                                            <Option value="部分抽取">部分抽取</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Form>
                                            </TabPane>
                                            <TabPane tab="部分抽取字段" key="2" disabled={selectedRuleDetails.抽取类型 === '全量抽取'}>
                                                <Form layout="vertical">
                                                    <Form.Item label="选择字段" name="选择字段">
                                                        <Select mode="multiple">
                                                            <Option value="字段1">字段1</Option>
                                                            <Option value="字段2">字段2</Option>
                                                            <Option value="字段3">字段3</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Form>
                                            </TabPane>
                                        </Tabs>
                                    ) : key === "定时抽取" ? (
                                            <Form layout="vertical">
                                                <Form.Item label="定时抽取" name="定时抽取" valuePropName="checked">
                                                    <Switch
                                                        checkedChildren="ON"
                                                        unCheckedChildren="OFF"
                                                        onChange={(checked) =>
                                                            setSelectedRuleDetails((prev) => ({
                                                                ...prev,
                                                                定时抽取: checked,
                                                            }))
                                                        }
                                                    />
                                                </Form.Item>
                                                {selectedRuleDetails.定时抽取 && (
                                                    <Tabs defaultActiveKey="1">
                                                        <TabPane tab="抽取频率" key="1">
                                                            <Form layout="vertical">
                                                                <Form.Item label="抽取频率" name="抽取频率">
                                                                    <Select>
                                                                        <Option value="每天一次">每天一次</Option>
                                                                        <Option value="每周一次">每周一次</Option>
                                                                        <Option value="每月一次">每月一次</Option>
                                                                    </Select>
                                                                </Form.Item>
                                                            </Form>
                                                        </TabPane>
                                                        <TabPane tab="时间粒度" key="2">
                                                            <Form layout="vertical">
                                                                <Form.Item label="时间粒度" name="时间粒度">
                                                                    <Select>
                                                                        <Option value="100ms">100ms</Option>
                                                                        <Option value="1s">1s</Option>
                                                                        <Option value="1分钟">1分钟</Option>
                                                                        <Option value="1小时">1小时</Option>
                                                                    </Select>
                                                                </Form.Item>
                                                            </Form>
                                                        </TabPane>
                                                    </Tabs>
                                                )}
                                            </Form>
                                        ) : key === "批量处理" ? (
                                        <Form layout="vertical">
                                            <Form.Item label="批量处理" name="批量处理" valuePropName="checked">
                                                <Switch checkedChildren="ON" unCheckedChildren="OFF" onChange={checked => setSelectedRuleDetails(prev => ({ ...prev, 批量处理: checked }))} />
                                            </Form.Item>
                                            {selectedRuleDetails.批量处理 && (
                                                <>
                                                    <Form.Item
                                                        label="批处理大小"
                                                        name="批处理规则"
                                                        rules={[{ required: true, message: '请选择批处理大小' }]}
                                                    >
                                                        <Select>
                                                            <Option value="10">10</Option>
                                                            <Option value="100">100</Option>
                                                            <Option value="1000">1000</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </>
                                            )}
                                        </Form>
                                    ) : null}
                                </Panel>
                            ))}


                        </Collapse>
                    ) : (
                        <Card title="基本信息">请从左侧选择一个策略以查看详细信息。</Card>
                    )}
                </div>
            </div>
            <Modal
                title={isEdit ? "编辑策略" : "添加策略"}
                visible={isRuleModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    layout="vertical"
                    onFinish={handleAddOrEditRule}
                    form={form}
                >
                    <Form.Item
                        label="策略组"
                        name="ruleGroup"
                        rules={[{ required: true, message: '请选择策略组' }]}
                    >
                        <Select onChange={handleRuleGroupChange}>
                            {ruleGroups.map((group) => (
                                <Option key={group.key} value={group.title}>{group.title}</Option>
                            ))}
                            <Option value="新建策略组">新建策略组</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.ruleGroup !== currentValues.ruleGroup}
                    >
                        {({ getFieldValue }) =>
                            getFieldValue('ruleGroup') === '新建策略组' ? (
                                <Form.Item
                                    label="新策略组名称"
                                    name="newRuleGroupName"
                                    rules={[{ required: true, message: '请输入新策略组名称' }]}
                                >
                                    <Input placeholder="请输入新策略组名称" onChange={(e) => setNewGroupName(e.target.value)} />
                                </Form.Item>
                            ) : null
                        }
                    </Form.Item>
                    <Form.Item
                        label="策略名称"
                        name="ruleName"
                        rules={[{ required: true, message: '请输入策略名称' }]}
                    >
                        <Input placeholder="请输入策略名称" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">确定</Button>
                        <Button type="default" onClick={handleCancel} style={{ marginLeft: 8 }}>取消</Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="编辑策略组"
                visible={isGroupModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    layout="vertical"
                    onFinish={handleEditRuleGroup}
                    form={groupForm}
                >
                    <Form.Item
                        label="策略组名称"
                        name="groupName"
                        rules={[{ required: true, message: '请输入策略组名称' }]}
                    >
                        <Input placeholder="请输入策略组名称" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">确定</Button>
                        <Button type="default" onClick={handleCancel} style={{ marginLeft: 8 }}>取消</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default DataExtractionStrategyManagement;
