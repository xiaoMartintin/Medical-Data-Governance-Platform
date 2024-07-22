import {
    Button, Modal, Steps, Form, Input, Select, message, Switch, Table, InputNumber, Space, Card, Tag, Empty
} from 'antd';
import React, {useState} from 'react';
import {ReloadOutlined} from '@ant-design/icons';
import config from '../config';
import {addDataModel, querySimilarTags} from '../../../../apis/DataModelingApi';
import {formatVariableType, formatRuleType, formatRuleDetail} from '../methods';

const {Step} = Steps
const {Option} = Select

const AddDataModel = ({visible, onHideModal, onAddModel}) => {
    const modals = config.modelModals
    const modelTypes = config.modelTypes
    const variableTypes = config.variableTypes
    const rules = config.modelRules

    const [currentStep, setCurrentStep] = useState(0)
    const [form, setForm] = useState({})
    // Step 1
    const [infoForm] = Form.useForm()
    // Step 2
    const [fieldForm] = Form.useForm()
    const [fieldsData, setFieldsData] = useState([])
    // Step 3
    const [currentRule, setCurrentRule] = useState({})
    const ruleForms = Array.from({length: 3}).map(() => {
        // TODO: Fix
        // eslint-disable-next-line
        let [ruleForm] = Form.useForm()
        return ruleForm
    })
    const [rulesData, setRulesData] = useState([])
    // Step 4
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

    const ruleColumns = [{
        title: '字段名', children: [{
            title: '左字段',
            dataIndex: 'leftFieldName',
            key: 'leftFieldName',
            align: 'center',
            onCell: (item) => ({
                colSpan: item.rightFieldName ? 1 : 2,
            })
        }, {
            title: '右字段',
            dataIndex: 'rightFieldName',
            key: 'rightFieldName',
            align: 'center',
            onCell: (item) => ({
                colSpan: item.rightFieldName ? 1 : 0,
            })
        }],
    }, {
        dataIndex: 'ruleType',
        key: 'ruleType',
        title: '类型',
        render: (ruleType) => <Tag>{formatRuleType(ruleType)}</Tag>,
    }, {
        dataIndex: 'detail',
        key: 'detail',
        title: '详情',
    }, {
        dataIndex: 'description',
        key: 'description',
        title: '描述',
    }, {
        title: '操作',
        key: 'action',
        fixed: 'right',
        render: (_, row) => (<Button danger onClick={() => handleDeleteRule(row.key)}>删除</Button>)
    }]

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
            if (fieldsData.length > 0) {
                setForm({
                    ...form, fields: fieldsData.map(field => {
                        const {key, ...rest} = field
                        return rest
                    })
                })
                setCurrentStep(currentStep + 1)
            } else {
                message.error('请输入至少一个字段')
            }
        } else if (currentStep === 2) {
            setForm({
                ...form, rules: rulesData.map(rule => {
                    const {key, detail, ...rest} = rule
                    return rest
                })
            })
            handleRecommendTags()
            setCurrentStep(currentStep + 1)
        } else if (currentStep === 3) {
            const loading = message.loading('正在添加数据模型...')
            addDataModel({...form, tag: tags}).then(_ => {
                resetModal()
                onAddModel()
                loading()
                message.success('成功添加数据模型')
            }).catch(error => {
                message.error(`添加模型失败：${error.message}`)
            })
        }
    }

    const resetModal = () => {
        onHideModal()

        setCurrentStep(0)
        setForm({})
        infoForm.resetFields()
        fieldForm.resetFields()
        ruleForms.forEach(form => form.resetFields())

        setFieldsData([])
        setRulesData([])
        setCurrentRule({})

        setTags([])
        setInputTag('')
        setRecommendedTags([])
    }

    const handleAddField = () => {
        fieldForm.validateFields().then(data => {
            setFieldsData([...fieldsData, {...data, key: Date.now()}])
            fieldForm.resetFields()
        }).catch(_ => {
            message.error('请正确填写字段信息')
        })
    }

    const handleDeleteField = (key) => {
        setFieldsData(fieldsData.filter(field => field.key !== key))
    }

    const handleRuleChange = (val) => {
        setCurrentRule(rules.find(item => item.value === val))
    }

    const handleAddRule = (data) => {
        const detail = formatRuleDetail(currentRule, data)
        setRulesData([...rulesData, {ruleType: currentRule.value, rule: data, key: Date.now(), detail}])
        ruleForms.forEach(form => form.resetFields())
    }

    const handleDeleteRule = (key) => {
        setRulesData(rulesData.filter(rule => rule.key !== key))
    }

    const handleInputTagChange = (e) => {
        setInputTag(e.target.value)
    }

    const handleInputTagConfirm = () => {
        if (inputTag && tags.indexOf(inputTag) === -1) {
            setTags([...tags, inputTag])
        }
        setInputTag('')
    }

    const handleDeleteTag = (removedTag) => {
        const newTags = tags.filter(tag => tag !== removedTag)
        setTags(newTags)
    }

    const handleAddRecommendedTag = (tag) => {
        if (tags.indexOf(tag) === -1) {
            setTags([...tags, tag])
        }
    }

    const handleRecommendTags = () => {
        const loading = message.loading('正在推荐标签...', 0)
        querySimilarTags({
            fields: fieldsData.map(item => item.name)
        }).then(data => {
            loading()
            setRecommendedTags(data.data.tags)
        }).catch(error => {
            loading()
            message.error(`标签推荐失败：${error.message}`)
        })
    }

    const validateUniqueField = (_, val) => {
        if (fieldsData.some(field => field.name === val)) {
            return Promise.reject(new Error('字段名称不能重复'))
        }
        return Promise.resolve()
    }

    return (
        <Modal title='添加数据模型' open={visible} onOk={handleOk} onCancel={resetModal} width={800}>
            <Steps current={currentStep} style={{margin: '24px 0'}}>
                <Step title='基本信息'/>
                <Step title='字段信息'/>
                {/*<Step title='质量规则'/>*/}
                {/*<Step title='标签定义'/>*/}
            </Steps>
            {currentStep === 0 && (<Form layout='vertical' form={infoForm}>
                <Form.Item label='模型名称' name='modelName'
                           rules={[{required: true, message: '请输入模型名称'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label='类型' name='type' rules={[{required: true, message: '请选择类型'}]}>
                    <Select>
                        {
                            modelTypes.map((item) => (
                                <Option value={item.value} key={item.value}>{item.label}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item label='模态' name='modal' rules={[{required: true, message: '请选择模态'}]}>
                    <Select>
                        {
                            modals.map((item) => (
                                <Option value={item.value} key={item.value}>{item.label}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item label='业务域' name='domain'
                           rules={[{required: true, message: '请输入业务域'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label='数据采集方式' name='realtime' valuePropName='checked' initialValue={false}>
                    <Switch checkedChildren='实时采集' unCheckedChildren='手动采集'/>
                </Form.Item>
                <Form.Item label='描述' name='description' initialValue=''>
                    <Input.TextArea/>
                </Form.Item>
            </Form>)}
            {currentStep === 1 && (<>
                <Table dataSource={fieldsData} columns={fieldColumns} scroll={{x: 'max-content'}} bordered/>
                <Form layout='vertical' form={fieldForm} style={{marginTop: '20px'}}>
                    <Form.Item name='name' label='字段名称'
                               rules={[{required: true, message: '请输入字段名称'}, {validator: validateUniqueField}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name='type' label='字段类型'
                               rules={[{required: true, message: '请选择字段类型'}]}>
                        <Select>
                            {
                                variableTypes.map((item) => (
                                    <Option value={item.value} key={item.value}>{item.label}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name='description' label='字段描述' initialValue=''>
                        <Input/>
                    </Form.Item>
                    <Form.Item name='sensitive' label='是否敏感' valuePropName='checked' initialValue={false}>
                        <Switch checkedChildren='敏感字段' unCheckedChildren='非敏感字段'/>
                    </Form.Item>
                    <Form.Item name='encrypt' label='是否加密' valuePropName='checked' initialValue={false}>
                        <Switch checkedChildren='进行加密' unCheckedChildren='不进行加密'/>
                    </Form.Item>
                    <Form.Item name='secretLevel' label='字段密级' initialValue={0}>
                        <InputNumber min={0} max={10} precision={0}/>
                    </Form.Item>
                    <Button type='dashed' onClick={handleAddField} style={{width: '100%'}}>
                        添加字段
                    </Button>
                </Form>
            </>)}
            {/*{currentStep === 2 && (<>*/}
            {/*    <Card*/}
            {/*        type={'inner'}*/}
            {/*        title={'选择质量规则'}*/}
            {/*        style={{marginBottom: '20px'}}*/}
            {/*        extra={<Space>*/}
            {/*            <Select placeholder={'请选择规则类型'} onChange={handleRuleChange} options={rules}/>*/}
            {/*        </Space>}*/}
            {/*    >*/}
            {/*        {currentRule.type === 'Binary' && (<Form form={ruleForms[0]} onFinish={(data) => {*/}
            {/*            handleAddRule(data)*/}
            {/*        }}>*/}
            {/*            <Form.Item name='type' label={'规则类型'} rules={[{required: true, message: '请选择规则类型'}]}>*/}
            {/*                <Select placeholder={'请选择规则类型'}>*/}
            {/*                    {currentRule.relations.map(item => <Option key={item.value}*/}
            {/*                                                               value={item.value}>{item.label}</Option>)}*/}
            {/*                </Select>*/}
            {/*            </Form.Item>*/}
            {/*            <Form.Item name='leftFieldName' label={'左字段'}*/}
            {/*                       rules={[{required: true, message: '请选择左字段'}]}>*/}
            {/*                <Select placeholder={'请选择左字段'}>*/}
            {/*                    {fieldsData.map(({name, type, description}) => <Option key={name} value={name}>*/}
            {/*                        <span style={{marginRight: '16px'}}>{name}</span>*/}
            {/*                        <Tag style={{marginRight: '16px'}}>{formatVariableType(type)}</Tag>*/}
            {/*                        <span>{description}</span>*/}
            {/*                    </Option>)}*/}
            {/*                </Select>*/}
            {/*            </Form.Item>*/}
            {/*            <Form.Item name='rightFieldName' label={'右字段'}*/}
            {/*                       rules={[{required: true, message: '请选择右字段'}]}>*/}
            {/*                <Select placeholder={'请选择右字段'}>*/}
            {/*                    {fieldsData.map(({name, type, description}) => <Option key={name} value={name}>*/}
            {/*                        <span style={{marginRight: '16px'}}>{name}</span>*/}
            {/*                        <Tag style={{marginRight: '16px'}}>{formatVariableType(type)}</Tag>*/}
            {/*                        <span>{description}</span>*/}
            {/*                    </Option>)}*/}
            {/*                </Select>*/}
            {/*            </Form.Item>*/}
            {/*            <Form.Item name='description' label={'规则描述'} initialValue=''>*/}
            {/*                <Input.TextArea></Input.TextArea>*/}
            {/*            </Form.Item>*/}
            {/*            <Form.Item style={{display: 'flex', justifyContent: 'flex-end'}}>*/}
            {/*                <Space>*/}
            {/*                    <Button htmlType={'reset'}>清空</Button>*/}
            {/*                    <Button type={'primary'} htmlType={'submit'}>添加规则</Button>*/}
            {/*                </Space>*/}
            {/*            </Form.Item>*/}
            {/*        </Form>)}*/}
            {/*        {currentRule.type === 'Unary' && (<Form form={ruleForms[1]} onFinish={(data) => {*/}
            {/*            handleAddRule(data)*/}
            {/*        }}>*/}
            {/*            <Form.Item name='fieldName' label={'字段选择'}*/}
            {/*                       rules={[{required: true, message: '请选择字段'}]}>*/}
            {/*                <Select placeholder={'请选择字段'}>*/}
            {/*                    {fieldsData.map(({name, type, description}) => <Option key={name} value={name}>*/}
            {/*                        <span style={{marginRight: '16px'}}>{name}</span>*/}
            {/*                        <Tag style={{marginRight: '16px'}}>{formatVariableType(type)}</Tag>*/}
            {/*                        <span>{description}</span>*/}
            {/*                    </Option>)}*/}
            {/*                </Select>*/}
            {/*            </Form.Item>*/}
            {/*            <Form.Item name='description' label={'规则描述'} initialValue=''>*/}
            {/*                <Input.TextArea></Input.TextArea>*/}
            {/*            </Form.Item>*/}
            {/*            <Form.Item style={{display: 'flex', justifyContent: 'flex-end'}}>*/}
            {/*                <Space>*/}
            {/*                    <Button htmlType={'reset'}>清空</Button>*/}
            {/*                    <Button type={'primary'} htmlType={'submit'}>添加规则</Button>*/}
            {/*                </Space>*/}
            {/*            </Form.Item>*/}
            {/*        </Form>)}*/}
            {/*        {currentRule.type === 'Numeric' && (<Form form={ruleForms[2]} onFinish={(data) => {*/}
            {/*            handleAddRule(data)*/}
            {/*        }}>*/}
            {/*            <Form.Item name='fieldName' label={'字段选择'}*/}
            {/*                       rules={[{required: true, message: '请选择字段'}]}>*/}
            {/*                <Select placeholder={'请选择字段'}>*/}
            {/*                    {fieldsData.map(({name, type, description}) => <Option key={name} value={name}>*/}
            {/*                        <span style={{marginRight: '16px'}}>{name}</span>*/}
            {/*                        <Tag style={{marginRight: '16px'}}>{formatVariableType(type)}</Tag>*/}
            {/*                        <span>{description}</span>*/}
            {/*                    </Option>)}*/}
            {/*                </Select>*/}
            {/*            </Form.Item>*/}
            {/*            <Space.Compact>*/}
            {/*                <Form.Item name='min' label={'范围选择'}*/}
            {/*                           rules={[{required: true, message: '请输入最小值'}]}>*/}
            {/*                    <InputNumber precision={0} addonBefore={'MIN'} placeholder={'请输入最小值'}/>*/}
            {/*                </Form.Item>*/}
            {/*                <Form.Item name='max' rules={[{required: true, message: '请输入最大值'}]}>*/}
            {/*                    <InputNumber precision={0} addonAfter={'MAX'} placeholder={'请输入最大值'}/>*/}
            {/*                </Form.Item>*/}
            {/*            </Space.Compact>*/}
            {/*            <Form.Item name='description' label={'规则描述'} initialValue=''>*/}
            {/*                <Input.TextArea/>*/}
            {/*            </Form.Item>*/}
            {/*            <Form.Item style={{display: 'flex', justifyContent: 'flex-end'}}>*/}
            {/*                <Space>*/}
            {/*                    <Button htmlType={'reset'}>清空</Button>*/}
            {/*                    <Button htmlType={'submit'} type={'primary'}>添加规则</Button>*/}
            {/*                </Space>*/}
            {/*            </Form.Item>*/}
            {/*        </Form>)}*/}
            {/*        {!(['Unary', 'Binary', 'Numeric'].includes(currentRule.type)) && <Empty/>}*/}
            {/*    </Card>*/}
            {/*    <Table dataSource={rulesData.map(item => {*/}
            {/*        const type = rules.find(rule => rule.value === item.ruleType).type*/}
            {/*        const {rule, ...rest} = item*/}
            {/*        if (type === 'Unary' || type === 'Numeric') {*/}
            {/*            return {...rule, ...rest, leftFieldName: rule.fieldName}*/}
            {/*        } else {*/}
            {/*            return {...rule, ...rest}*/}
            {/*        }*/}
            {/*    })} columns={ruleColumns} scroll={{x: 'max-content'}} bordered>*/}
            {/*    </Table>*/}
            {/*</>)}*/}
            {/*{currentStep === 3 && (*/}
            {/*    <Form layout='vertical'>*/}
            {/*        <Form.Item label='数据模型标签'>*/}
            {/*            <Space.Compact>*/}
            {/*                <Input*/}
            {/*                    type='text'*/}
            {/*                    value={inputTag}*/}
            {/*                    onChange={handleInputTagChange}*/}
            {/*                />*/}
            {/*                <Button type='primary' onClick={handleInputTagConfirm}>添加</Button>*/}
            {/*            </Space.Compact>*/}
            {/*            <div style={{marginTop: '16px'}}>*/}
            {/*                {tags.map(tag => (*/}
            {/*                    <Tag key={tag} closable onClose={() => handleDeleteTag(tag)}>*/}
            {/*                        {tag}*/}
            {/*                    </Tag>*/}
            {/*                ))}*/}
            {/*            </div>*/}
            {/*        </Form.Item>*/}
            {/*        <Form.Item label='推荐标签'>*/}
            {/*            <div>*/}
            {/*                {recommendedTags.map(tag => (*/}
            {/*                    <Tag key={tag} onClick={() => handleAddRecommendedTag(tag)}>*/}
            {/*                        {tag}*/}
            {/*                    </Tag>*/}
            {/*                ))}*/}
            {/*            </div>*/}
            {/*            <Button icon={<ReloadOutlined/>} type='primary' onClick={handleRecommendTags}*/}
            {/*                    style={{marginTop: '16px'}}>换一批</Button>*/}
            {/*        </Form.Item>*/}
            {/*    </Form>*/}
            {/*)}*/}
        </Modal>
    )
}

export default AddDataModel