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
    const [selectedRuleDetails, setSelectedRuleDetails] = useState(null);
    const [ruleGroups, setRuleGroups] = useState([
        {
            title: '黑名单',
            key: '0-0',
            children: [
                { title: '高危DDL语句', key: '0-0-0' },
                { title: '高危DDL语句4', key: '0-0-1' },
                { title: '高危DDL语句3', key: '0-0-2' },
                { title: '高危DDL语句2', key: '0-0-3' },
                { title: '高危DDL语句1', key: '0-0-4' },
                { title: '高危操作2', key: '0-0-5' },
                { title: '高危操作1', key: '0-0-6' },
            ],
        },
        {
            title: '白名单',
            key: '0-1',
            children: [
                { title: '规则3', key: '0-1-0' },
                { title: '规则4', key: '0-1-1' },
            ],
        },
        {
            title: '全审计策略',
            key: '0-2',
            children: [],
        },
        {
            title: '人侵检测策略',
            key: '0-3',
            children: [],
        },
        {
            title: '通用SQL注入策略',
            key: '0-4',
            children: [],
        },
    ]);
    const [currentRuleGroup, setCurrentRuleGroup] = useState('');
    const [currentRule, setCurrentRule] = useState('');
    const [form] = Form.useForm();
    const [groupForm] = Form.useForm();
    const [newGroupName, setNewGroupName] = useState('');


    const onTreeSelect = (selectedKeys, info) => {
        const selectedNode = info.node;
        setSelectedRuleDetails({
            规则名称: selectedNode.title,
            状态: true,
            风险等级: '高风险',
            规则描述: 'grant, revoke等操作'
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
        if (values.ruleGroup === '新建规则组' && !newGroupName) {
            message.error('请输入新建规则组名称');
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
            message.success('规则编辑成功');
        } else {
            if (values.ruleGroup === '新建规则组') {
                const newRuleGroup = {
                    title: newGroupName,
                    key: `0-${ruleGroups.length}`,
                    children: [{ title: values.ruleName, key: `0-${ruleGroups.length}-0` }],
                };
                setRuleGroups([...ruleGroups, newRuleGroup]);
                message.success('新规则组添加成功');
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
                message.success('规则添加成功');
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
        message.success('规则删除成功');
    };

    const handleDeleteRuleGroup = (ruleGroupKey) => {
        const updatedRuleGroups = ruleGroups.filter(group => group.key !== ruleGroupKey);
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
        const updatedRuleGroups = ruleGroups.map(group => {
            if (group.key === currentRuleGroup) {
                return { ...group, title: values.groupName };
            }
            return group;
        });
        setRuleGroups(updatedRuleGroups);
        message.success('规则组名称编辑成功');
        setIsGroupModalVisible(false);
    };

    const handleSave = () => {
        // Save logic for both "基本信息" and "客户端" sections
        message.success('规则保存成功');
    };

    return (
        <div className="data-extraction-strategy-management">
            <div className="header">
                <Button type="primary" onClick={showAddRuleModal}>添加规则</Button>
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
                            {['基本信息', '客户端', 'SQL', '操作对象', '结果', '其他'].map((key, index) => (
                                <Panel header={key} key={index}>
                                    {key === "基本信息" ? (
                                        <Form
                                            layout="vertical"
                                            initialValues={selectedRuleDetails}
                                        >
                                            <Form.Item
                                                label="规则名称"
                                                name="规则名称"
                                                rules={[{ required: true, message: '请输入规则名称' }]}
                                            >
                                                <Input value={selectedRuleDetails ? selectedRuleDetails.规则名称 : ''} />
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
                                                label="规则描述"
                                                name="规则描述"
                                                rules={[{ required: true, message: '请输入规则描述' }]}
                                            >
                                                <Input.TextArea />
                                            </Form.Item>
                                        </Form>
                                    ) : key === "客户端" ? (
                                        <Tabs defaultActiveKey="1">
                                            <TabPane tab="客户端IP" key="1">
                                                <Form layout="vertical">
                                                    <Form.Item label="是否启用" name="是否启用" valuePropName="checked">
                                                        <Switch checkedChildren="ON" unCheckedChildren="OFF" />
                                                    </Form.Item>
                                                    <Form.Item label="关系" name="关系">
                                                        <Select>
                                                            <Option value="包含">包含</Option>
                                                            <Option value="不包含">不包含</Option>
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item label="值" name="值">
                                                        <Input />
                                                    </Form.Item>
                                                </Form>
                                            </TabPane>
                                            <TabPane tab="客户端工具" key="2">
                                                <p>客户端工具内容</p>
                                            </TabPane>
                                            <TabPane tab="客户端操作系统用户" key="3">
                                                <p>客户端操作系统用户内容</p>
                                            </TabPane>
                                            <TabPane tab="客户端操作系统主机名" key="4">
                                                <p>客户端操作系统主机名内容</p>
                                            </TabPane>
                                        </Tabs>
                                    ) : key === "SQL" ? (
                                        <Tabs defaultActiveKey="1">
                                            <TabPane tab="SQL语句" key="1">
                                                <Form layout="vertical">
                                                    <Form.Item label="是否启用" name="是否启用" valuePropName="checked">
                                                        <Switch checkedChildren="ON" unCheckedChildren="OFF" />
                                                    </Form.Item>
                                                    <Form.Item label="值" name="值">
                                                        <Input />
                                                    </Form.Item>
                                                </Form>
                                            </TabPane>
                                            <TabPane tab="SQL关键字" key="2">
                                                <p>SQL关键字内容</p>
                                            </TabPane>
                                            <TabPane tab="SQL正则" key="3">
                                                <p>SQL正则内容</p>
                                            </TabPane>
                                            <TabPane tab="特权操作" key="4">
                                                <p>特权操作内容</p>
                                            </TabPane>
                                            <TabPane tab="操作类型" key="5">
                                                <p>操作类型内容</p>
                                            </TabPane>
                                        </Tabs>
                                    ) : key === "操作对象" ? (
                                        <Tabs defaultActiveKey="1">
                                            <TabPane tab="表组" key="1">
                                                <Form layout="vertical">
                                                    <Form.Item label="是否启用" name="是否启用" valuePropName="checked">
                                                        <Switch checkedChildren="ON" unCheckedChildren="OFF" />
                                                    </Form.Item>
                                                    <Form.Item label="关系" name="关系">
                                                        <Select>
                                                            <Option value="包含">包含</Option>
                                                            <Option value="不包含">不包含</Option>
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item label="值" name="值">
                                                        <Input />
                                                    </Form.Item>
                                                </Form>
                                            </TabPane>
                                            <TabPane tab="字段" key="2">
                                                <p>字段内容</p>
                                            </TabPane>
                                            <TabPane tab="数据库与Schema" key="3">
                                                <p>数据库与Schema内容</p>
                                            </TabPane>
                                            <TabPane tab="目标表" key="4">
                                                <p>目标表内容</p>
                                            </TabPane>
                                        </Tabs>
                                    ) : key === "结果" ? (
                                        <Tabs defaultActiveKey="1">
                                            <TabPane tab="响应时间" key="1">
                                                <Form layout="vertical">
                                                    <Form.Item label="是否启用" name="是否启用" valuePropName="checked">
                                                        <Switch checkedChildren="ON" unCheckedChildren="OFF" />
                                                    </Form.Item>
                                                    <Form.Item label="关系" name="关系">
                                                        <Select>
                                                            <Option value="等于">等于</Option>
                                                            <Option value="大于">大于</Option>
                                                            <Option value="小于">小于</Option>
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item label="值" name="值">
                                                        <Input />
                                                    </Form.Item>
                                                </Form>
                                            </TabPane>
                                            <TabPane tab="影响行数" key="2">
                                                <p>影响行数内容</p>
                                            </TabPane>
                                        </Tabs>
                                    ) : key === "其他" ? (
                                        <Tabs defaultActiveKey="1">
                                            <TabPane tab="查询组" key="1">
                                                <Form layout="vertical">
                                                    <Form.Item label="是否启用" name="是否启用" valuePropName="checked">
                                                        <Switch checkedChildren="ON" unCheckedChildren="OFF" />
                                                    </Form.Item>
                                                    <Form.Item label="关系" name="关系">
                                                        <Select>
                                                            <Option value="包含">包含</Option>
                                                            <Option value="不包含">不包含</Option>
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item label="值" name="值">
                                                        <Input />
                                                    </Form.Item>
                                                </Form>
                                            </TabPane>
                                            <TabPane tab="数据库用户" key="2">
                                                <p>数据库用户内容</p>
                                            </TabPane>
                                        </Tabs>
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
            <Modal
                title={isEdit ? "编辑规则" : "添加规则"}
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
                        label="规则组"
                        name="ruleGroup"
                        rules={[{ required: true, message: '请选择规则组' }]}
                    >
                        <Select onChange={handleRuleGroupChange}>
                            {ruleGroups.map((group) => (
                                <Option key={group.key} value={group.title}>{group.title}</Option>
                            ))}
                            <Option value="新建规则组">新建规则组</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.ruleGroup !== currentValues.ruleGroup}
                    >
                        {({ getFieldValue }) =>
                            getFieldValue('ruleGroup') === '新建规则组' ? (
                                <Form.Item
                                    label="新规则组名称"
                                    name="newRuleGroupName"
                                    rules={[{ required: true, message: '请输入新规则组名称' }]}
                                >
                                    <Input placeholder="请输入新规则组名称" onChange={(e) => setNewGroupName(e.target.value)} />
                                </Form.Item>
                            ) : null
                        }
                    </Form.Item>
                    <Form.Item
                        label="规则名称"
                        name="ruleName"
                        rules={[{ required: true, message: '请输入规则名称' }]}
                    >
                        <Input placeholder="请输入规则名称" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">确定</Button>
                        <Button type="default" onClick={handleCancel} style={{ marginLeft: 8 }}>取消</Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="编辑规则组"
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
                        label="规则组名称"
                        name="groupName"
                        rules={[{ required: true, message: '请输入规则组名称' }]}
                    >
                        <Input placeholder="请输入规则组名称" />
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
