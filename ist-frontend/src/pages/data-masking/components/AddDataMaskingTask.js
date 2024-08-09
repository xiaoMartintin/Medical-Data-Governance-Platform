import React, {useEffect, useState} from "react";
import config from "../../data-model/DataModel/config";
import {Button, Form, Input, InputNumber, message, Modal, Radio, Select, Steps, Switch, Table} from "antd";
import {formatVariableType} from "../../data-model/DataModel/methods";
import {mockData} from "../../../apis/mockData_";
import {addDataModel} from "../../../apis/DataModelingApi";
import CryptoJS from "crypto-js";
const {Step} = Steps
const {Option} = Select
const AddDataMaskingTask = ({visible, onHideModal, onAddModel}) => {
    const modals = config.modelModals
    const modelTypes = config.modelTypes
    const variableTypes = config.variableTypes
    const rules = config.modelRules
    const dataCategories = config.dataCategories

    const [currentStep, setCurrentStep] = useState(0)
    const [form, setForm] = useState({})
    // Step 1
    const [infoForm] = Form.useForm()
    // Step 2
    const [categoryForm] = Form.useForm()
    const [sourceForm] = Form.useForm();
    const [tables, setTables] = useState([]);
    const [configForm] = Form.useForm();
    const [currentRule_,setCurrentRule_] = useState("");

    const handleSourceChange = (value) => {
        switch (value) {
            case 'source1':
                setTables(['表1', '表2', '表3']);
                break;
            case 'source2':
                setTables(['表4', '表5', '表6']);
                break;
            default:
                setTables([]);
                break;
        }
    };
    const [selectedCategory, setSelectedCategory] = useState('');
    // Step 3
    const [fieldForm] = Form.useForm()
    const [fieldsData, setFieldsData] = useState([])
    // Step 4
    const [currentRule, setCurrentRule] = useState({})
    const ruleForms = Array.from({length: 3}).map(() => {
        // TODO: Fix
        // eslint-disable-next-line
        let [ruleForm] = Form.useForm()
        return ruleForm
    })
    const [maskingRuleForm] = Form.useForm();
    const [rulesData, setRulesData] = useState([])
    // Step 5
    const [tags, setTags] = useState([])
    const [recommendedTags, setRecommendedTags] = useState([])
    const [inputTag, setInputTag] = useState('')

    const fieldColumns = [{title: '字段名称', dataIndex: 'name', key: 'name'}, {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: formatVariableType
    }, {title: '描述', dataIndex: 'description', key: 'description'}, {
        title: '敏感', dataIndex: 'sensitive', key: 'sensitive', render: (text) => text ? '是' : '否'
    }, {title: '加密', dataIndex: 'encrypt', key: 'encrypt', render: (text) => text ? '是' : '否'}, {
        title: '密级', dataIndex: 'secretLevel', key: 'secretLevel'
    }, {
        title: '操作',
        key: 'action',
        fixed: 'right',
        render: (_, row) => (<Button danger onClick={() => handleDeleteField(row.key)}>删除</Button>)
    }]

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        console.log(selectedCategory)
    }

    const handleOk = () => {
        if (currentStep === 0) {
            infoForm.validateFields()
                .then(data => {
                    setForm({...form, ...data})
                    setCurrentStep(currentStep + 1)
                })
                .catch(_ => {
                    message.error('请正确填写基本信息')
                })
        } else if (currentStep === 1) {
            sourceForm.validateFields()
                .then(data => {
                    const sourceString = String(data.source);
                    const sourceTableString = String(data.sourceTable);
                    const combinedString = `${sourceString}: ${sourceTableString}`;
                    setForm({...form, source:combinedString})
                    setCurrentStep(currentStep + 1)
                })
                .catch(_ => {
                    message.error('请填写脱敏源')
                })
        } else if (currentStep === 2) {
            targetForm.validateFields().then(
                data => {
                    const targetString = String(data.target);
                    const targetTableString = String(data.targetTable);
                    const combinedString = `${targetString}: ${targetTableString}`;
                    setForm({...form, target:combinedString})
                    setCurrentStep(currentStep + 1)
                }
            ).catch(_ =>{
                message.error('请填写目标位置')
            })
        } else if (currentStep === 3) {
            /*if (!localStorage.getItem("mockData")){
                localStorage.setItem("mockData",JSON.stringify(mockData));
                console.log('mockData已经加载到localStorage中')
            }
            let newMockData_ = JSON.parse(localStorage.getItem("mockData"));
            let newModels = newMockData_.models;
            const models_len = newModels.length;
            const newModel = {...form,id:models_len}
            newModels.push(newModel);
            newMockData_.models = newModels
            localStorage.setItem("mockData",JSON.stringify(newMockData_))

            const loading = message.loading('正在添加数据模型...')
            addDataModel({...form, tag: tags}).then(_ => {
                resetModal()
                onAddModel()
                loading()
                message.success('成功添加数据模型')
            }).catch(error => {
                message.error(`添加模型失败：${error.message}`)
            })*/
            configForm.validateFields().then(
                data => {
                    setForm({...form, config:data.config})
                    setCurrentStep(currentStep + 1)
                }
            ).catch(_ =>{
                message.error('请填写脱敏规则')
            })
        }else if (currentStep === 4) {
            maskingRuleForm.validateFields().then(
                data => {
                    console.log({...form})
                    //setForm({...form, ...data})
                    setCurrentRule_(data.处理逻辑)
                    setCurrentStep(currentStep + 1)
                }
            ).catch(_ =>{
                message.error('请填写处理逻辑')
            })
        }
        else if (currentStep === 5){
            if (!localStorage.getItem("maskingConfigs")){
                localStorage.setItem("maskingConfigs",JSON.stringify([]));
                console.log('maskingConfigs已经加载到localStorage中');
            }
            const CryptoJS = require("crypto-js");
            const id = (currentRule_ === "1") ? CryptoJS.MD5(JSON.stringify(form)).toString():CryptoJS.SHA1(JSON.stringify(form)).toString();
            const now = new Date();
            const isoString = now.toISOString();
            const timestamp = isoString.replace('Z', '+00:00');
            let new_maskingConfig =  {...form,id:id,timestamp:timestamp,fail:0,new:0,progress:0,state:0}
            let new_maskingConfigs = JSON.parse(localStorage.getItem("maskingConfigs"));
            new_maskingConfigs.push(new_maskingConfig)
            localStorage.setItem("maskingConfigs",JSON.stringify(new_maskingConfigs))
            console.log(new_maskingConfig)
            const loading = message.loading('正在添加数据模型...')
            addDataModel({...form}).then(_ => {
                resetModal()
                onAddModel()
                loading()
                message.success('成功添加脱敏数据')
            }).catch(error => {
                message.error(`添加添加脱敏数据：${error.message}`)
            })
        }
    }

    const resetModal = () => {
        onHideModal()

        setCurrentStep(0)
        setForm({})
        infoForm.resetFields()
        fieldForm.resetFields()
        sourceForm.resetFields()
        targetForm.resetFields()
        setTables([])
        setTargetTables([])
        categoryForm.resetFields()
        configForm.resetFields()
        ruleForms.forEach(form => form.resetFields())
        maskingRuleForm.resetFields()
        setSelectedCategory('')

        setFieldsData([])
        setRulesData([])
        setCurrentRule({})

        setTags([])
        setInputTag('')
        setRecommendedTags([])
    }
    const handleDeleteField = (key) => {
        setFieldsData(fieldsData.filter(field => field.key !== key))
    }
    const validateUniqueField = (_, val) => {
        if (fieldsData.some(field => field.name === val)) {
            return Promise.reject(new Error('字段名称不能重复'))
        }
        return Promise.resolve()
    }

    const [targetForm] = Form.useForm();
    const [targetTables, setTargetTables] = useState([]);

    const handleTargetChange = (value) => {
        switch (value) {
            case 'target1':
                setTargetTables(['表1', '表2', '表3']);
                break;
            case 'target2':
                setTargetTables(['表4', '表5', '表6']);
                break;
            default:
                setTargetTables([]);
                break;
        }
    };
    return (
        <Modal title='添加数据模型' open={visible} onOk={handleOk} onCancel={resetModal} width={800}>
            <Steps current={currentStep} style={{margin: '24px 0'}}>
                <Step title='任务基本信息'/>
                <Step title='脱敏源配置'/>
                <Step title='目标位置配置'/>
                <Step title='脱敏规则'/>
                <Step title='处理逻辑确认'/>
                <Step title='完成'/>
            </Steps>
            {currentStep === 0 && (<Form layout='vertical' form={infoForm}>
                <Form.Item label='任务名称' name='name'
                           rules={[{required: true, message: '请输入模型名称'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label='备注' name='description' initialValue=''>
                    <Input.TextArea/>
                </Form.Item>
            </Form>)}
            {currentStep === 1 && (<>
                <Form layout='vertical' form={sourceForm}>
                    <Form.Item label='选择数据源' name='source' rules={[{ required: true, message: '请选择数据源' }]}>
                        <Select onChange={handleSourceChange}>
                            <Select.Option value='source1'>数据源1</Select.Option>
                            <Select.Option value='source2'>数据源2</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='源数据表' name='sourceTable' rules={[{ required: true, message: '请选择源数据表' }]}>
                        <Select>
                            {tables.map((table) => (
                                <Select.Option key={table} value={table}>{table}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </>)}
            {currentStep === 2 && (<>
                <Form layout='vertical' form={targetForm}>
                    <Form.Item label='目标位置' name='target' rules={[{ required: true, message: '请选择目标位置' }]}>
                        <Select onChange={handleTargetChange}>
                            <Select.Option value='target1'>目标位置1</Select.Option>
                            <Select.Option value='target2'>目标位置2</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='目标数据表' name='targetTable' rules={[{ required: true, message: '请输入目标数据表' }]}>
                        <Select>
                            {targetTables.map((table) => (
                                <Select.Option key={table} value={table}>{table}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </>)}
            {currentStep === 3 && (<>
                <Form layout='horizontal' form={configForm}>
                    <Form.Item label='任务触发方式' name='config' rules={[{ required: true, message: '请选择任务触发方式' }]} >
                            <Radio.Group>
                                <Radio value="1">定时+人工触发</Radio>
                                <Radio value="2">仅定时触发</Radio>
                                <Radio value="3">仅人工触发</Radio>
                            </Radio.Group>
                    </Form.Item>
                    <Form.Item label='任务触发周期' name='任务触发周期' rules={[{ required: true, message: '请选择任务触发周期' }]} >
                            <Select>
                                <Select.Option value='每小时触发'>每小时触发</Select.Option>
                                <Select.Option value='每天触发'>每天触发</Select.Option>
                                <Select.Option value='每周触发'>每周触发</Select.Option>
                            </Select>
                    </Form.Item>
                    <Form.Item label='并发执行' name='并发执行' rules={[{ required: true, message: '请选择任务触发周期' }]} >
                        <Radio.Group>
                            <Radio value="不并发">不并发</Radio>
                            <Radio value="多表并发">多表并发</Radio>
                            <Radio value="同表并发">同表并发</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </>)}
            {
                currentStep === 4 &&(
                    <>
                        <Form layout='horizontal' form={maskingRuleForm}>
                            <Form.Item label='处理逻辑' name='处理逻辑' rules={[{ required: true, message: '请选择任务触发方式' }]} >
                                <Radio.Group>
                                    <Radio value="1">MD5</Radio>
                                    <Radio value="2">SHA1</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Form>
                    </>
                )
            }
        </Modal>
    )
}
export default AddDataMaskingTask;
