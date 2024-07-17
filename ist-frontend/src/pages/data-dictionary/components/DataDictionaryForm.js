import React, {useEffect, useState} from 'react';
import {Steps, Select, Table, Button, Modal, Form, Input, Space, message} from 'antd';
import {dataSources} from "../tmp/data";
import {EditOutlined} from "@ant-design/icons";

const { Step } = Steps;
const { Option } = Select;

const DataDictionaryForm = ({visible, onHideModal, editingDictionary}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedDataSource, setSelectedDataSource] = useState(null);
    const [dictionaryContent, setDictionaryContent] = useState([]);
    // const [isModalVisible, setModalVisible] = useState(false);
    const [editingField, setEditingField] = useState(null);
    const [editingKey, setEditingKey] = useState('');
    const [editingFlag, setEditingFlag] = useState(false);
    const [dictionaryName, setDictionaryName] = useState('');
    const [dictionaryDescription, setDictionaryDescription] = useState('');

    const handleDataSourceChange = value => {
        setSelectedDataSource(value);
        //
        // todo: 这里向后端发送请求，获取对应数据源提取出的字段等信息，目前使用写死的数据
        //
        setDictionaryContent([
            { key: '1', name: 'Field 1', type: 'Type 1', table: 'Table 1', description: 'Description 1' },
        ]);
    };

    const handleNameChange = e => {
        setDictionaryName(e.target.value);
    };

    const handleDescriptionChange = e => {
        setDictionaryDescription(e.target.value);
    };

    const isEditing = record => record.key === editingKey;

    const handleAddField = () => {
        if (editingFlag) {
            message.error('请先保存当前编辑的字段');
            return;
        }
        const newField = { key: Date.now().toString(), name: '', type: '', description: '' };
        setDictionaryContent([...dictionaryContent, newField]);
        setEditingKey(newField.key);
        setEditingFlag(true);
    };

    const handleEditField = field => {
        if (editingFlag) {
            message.error('请先保存当前编辑的字段');
            return;
        }
        setEditingKey(field.key);
        setEditingFlag(true);
    };

    const handleDeleteField = key => {
        setEditingFlag(false);
        setDictionaryContent(dictionaryContent.filter(field => field.key !== key));
    };

    const handleModalOk = values => {

        if (currentStep === 0 && !editingDictionary) {
            if (selectedDataSource === null || dictionaryName === '' ) {
                message.error('请完整填写字典信息');
            }
            else {
                setCurrentStep(1);
            }
        }

        if (currentStep === 1 || editingDictionary) {
            if (dictionaryContent.length === 0) {
                message.error('请添加字段');
                return;
            }
            if (editingFlag) {
                message.error('请先保存当前编辑的字段');
                return;
            }
            if (editingField) {
                setDictionaryContent(
                    dictionaryContent.map(
                        field => field.key === editingField.key ? { ...field, ...values } : field
                    )
                );
            }
            else {
                setDictionaryContent([...dictionaryContent, { key: Date.now().toString(), ...values }]);
            }

            // console.log(dictionary);
            //
            //todo: 这里向后端发送请求，保存数据字典信息
            //

            handleModalClose();
        }
    };

    const handleModalClose = () => {
        onHideModal();

        setCurrentStep(0);
        setDictionaryName('');
        setDictionaryDescription('');
        setSelectedDataSource(null);
        setEditingField(null);
        setEditingKey('');
        setEditingFlag(false);
    }

    const handleModalCancel = () => {
        setDictionaryContent([]);
        handleModalClose();
    };

    const handleFieldChange = (key, field, value) => {
        setDictionaryContent(dictionaryContent.map(item => item.key === key ? { ...item, [field]: value } : item));
    };

    const handleSaveField = key => {
        const field = dictionaryContent.find(item => item.key === key);
        if (!field.name || !field.type || !field.description) {
            message.error('请完整填写字段信息');
        }
        else {
            setEditingKey('');
            setEditingFlag(false);
        }
    };

    const columns = [
        { title: '字段名称', dataIndex: 'name', key: 'name', render: (text) => text },
        { title: '类型', dataIndex: 'type', key: 'type', render: (text) => text },
        { title: '表名', dataIndex: 'table', key: 'table', render: (text) => text },
        { title: '注释', dataIndex: 'description', key: 'description', render: (text, record) => isEditing(record) ? <Input value={text} onChange={e => handleFieldChange(record.key, 'description', e.target.value)} /> : text },
        { title: '操作', key: 'action', render: (_, field) => (
                isEditing(field) ? (
                    <Space>
                        <Button onClick={() => handleSaveField(field.key)}>保存</Button>
                        {/*<Button danger onClick={() => handleDeleteField(field.key)}>删除</Button>*/}
                    </Space>
                ) : (
                    <Space>
                        <Button type={"link"} onClick={() => handleEditField(field)}>
                            <EditOutlined/>编辑注释
                        </Button>
                    </Space>
                )
            )
        },
    ];

    useEffect(() => {
        setDictionaryContent(editingDictionary || []);
    }, [editingDictionary]);

    return (
        <Modal
            title={editingDictionary? "编辑数据字典" : "添加数据字典"}
            open={visible} onOk={handleModalOk}
            onCancel={handleModalCancel}
            width={800}
        >
            {!editingDictionary &&
                <Steps current={currentStep} style={{margin: '24px 0'}}>
                    <Step title="字典信息输入"/>
                    <Step title="生成字典预览"/>
                </Steps>
            }
            {currentStep === 0 && !editingDictionary && (
                <>
                    <Input placeholder="请输入字典名称" value={dictionaryName} onChange={handleNameChange} style={{ marginBottom: '12px' }}/>
                    <Input placeholder="请输入字典注释" value={dictionaryDescription} onChange={handleDescriptionChange} style={{ marginBottom: '12px' }}/>
                    <Select placeholder="请选择数据源" onChange={handleDataSourceChange} value={selectedDataSource}>
                        {dataSources.map(dataSource => (
                            <Option key={dataSource.id} value={dataSource.id}>{dataSource.name}</Option>
                        ))}
                    </Select>
                </>
            )}
            {(currentStep === 1 || editingDictionary) && (
                <>
                    <Table dataSource={dictionaryContent} columns={columns} />
                    {/*<Button type="primary" onClick={handleAddField}>添加字段</Button>*/}
                </>
            )}
        </Modal>
    );
};

export default DataDictionaryForm;
