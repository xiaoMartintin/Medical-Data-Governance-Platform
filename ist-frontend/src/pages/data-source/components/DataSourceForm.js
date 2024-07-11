import {Form, Input, message, Modal, Select, Space, Steps} from 'antd'
import React, {useState} from 'react'
import config from '../config'
import validator from 'validator/es'
import {formatDataSourceType} from '../methods'
import {addDataSource, getDataSourceTables} from '../../../apis/data-source'

const {Option} = Select
const {Step} = Steps
const DataSourceForm = ({visible, onHideModal, onAddDataSource}) => {
    const dataSourceTypes = config.dataSourceType
    const [form, setForm] = useState({})
    const [currentStep, setCurrentStep] = useState(0)
    const [dataSourceForm] = Form.useForm()
    const [tableForm] = Form.useForm()
    const [tables, setTables] = useState([])

    const buildDataSourceUrl = ({sourceType, host, port, database, username, password}) => {
        const source = formatDataSourceType(sourceType)
        let url
        if (source === 'PostgreSQL') {
            url = new URL(`jdbc:postgresql://${host}:${port}/${database}`)
            url.searchParams.set('user', username)
            url.searchParams.set('password', password)
        } else if (source === 'MongoDB') {
            url = new URL(`mongodb://${username}:${password}@${host}:${port}/${database}`)
        } else if (source === 'InfluxDB') {
            url = new URL(`http://${username}:${password}@${host}:${port}/${database}`)
        } else {
            // TODO: Directory
            return ''
        }

        return url.toString()
    }
    const handleOk = () => {
        if (currentStep === 0) {
            dataSourceForm.validateFields()
                .then(data => {
                    const url = buildDataSourceUrl(data)
                    const loading = message.loading('正在连接数据库...', 0)
                    getDataSourceTables({
                        sourceType: data.sourceType,
                        url
                    }).then(res => {
                        if (res.length > 0) {
                            const {username, password, host, port, database, ...filteredData} = data
                            setForm({...form, ...filteredData, url})
                            setCurrentStep(currentStep + 1)
                            setTables(res)
                            loading()
                        } else {
                            loading()
                            message.error('数据库为空')
                        }
                    }).catch(error => {
                        loading()
                        message.error(`连接数据库失败：${error.message}`)
                    })

                })
                .catch(_ => {
                    message.error('请正确填写数据源信息')
                })
        } else if (currentStep === 1) {
            const source = formatDataSourceType(form.sourceType)
            const table = tableForm.getFieldValue('table')

            let params = form
            if (source === 'PostgreSQL') {
                let [schemaName, tableName] = table.split('.')
                params.schemaName = schemaName
                params.tableName = tableName
            } else if (source === 'MongoDB') {
                params.collectionName = table
            } else if (source === 'InfluxDB') {
                params.tableName = table
            } else {
                // TODO: Directory
                return
            }

            addDataSource(params).then(_ => {
                resetModal()
                onAddDataSource()
                message.success('成功添加数据源')
            }).catch(error => {
                message.error(`添加数据源失败：${error.message}`)
            })
        }
    }

    const resetModal = () => {
        onHideModal()

        setForm({})
        setCurrentStep(0)

        dataSourceForm.resetFields()
        tableForm.resetFields()
    }

    const validateIP = (_, value) => {
        if (!value || validator.isIP(value)) {
            return Promise.resolve()
        }
        return Promise.reject(new Error('请输入有效的IP地址'))
    }

    const validatePort = (_, value) => {
        if (!value || validator.isPort(value)) {
            return Promise.resolve()
        }
        return Promise.reject(new Error('请输入有效的端口号'))
    }

    return (
        <Modal title='添加数据源' open={visible} onOk={handleOk} onCancel={resetModal} width={500}>
            <Steps current={currentStep} style={{margin: '24px 0'}}>
                <Step title='连接数据源'/>
                <Step title='选择数据表'/>
            </Steps>
            {currentStep === 0 && (
                <Form form={dataSourceForm}>
                    <Form.Item label='数据源类型' name='sourceType'
                               rules={[{required: true, message: '请选择数据源类型'}]}>
                        <Select>
                            {
                                dataSourceTypes.map((item) => (
                                    <Option value={item.value} key={item.value}>{item.label}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label='数据库地址' required={true}>
                        <Space.Compact>
                            <Form.Item
                                name='host' noStyle
                                rules={[{required: true, message: '请输入IP地址'}, {validator: validateIP}]}>
                                <Input style={{width: 'calc(70% - 19px)'}} placeholder='IP地址'/>
                            </Form.Item>
                            <span style={{margin: '0 8px', lineHeight: '32px'}}>:</span>
                            <Form.Item
                                name='port' noStyle
                                rules={[{required: true, message: '请输入端口号'}, {validator: validatePort}]}>
                                <Input style={{width: '30%'}} placeholder='端口'/>
                            </Form.Item>
                        </Space.Compact>
                    </Form.Item>
                    <Form.Item label='数据库名称' name='database'
                               rules={[{required: true, message: '请输入数据库名称'}]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label='用户名' name='username' initialValue=''>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label='密码' name='password' initialValue=''>
                        <Input.Password></Input.Password>
                    </Form.Item>
                    <Form.Item label='标签' name='tag' initialValue=''>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label='描述' name='description' initialValue=''>
                        <Input.TextArea/>
                    </Form.Item>
                </Form>
            )}
            {currentStep === 1 && (
                <Form form={tableForm} layout='vertical'>
                    <Form.Item label='数据表' name='table' rules={[{required: true, message: '请选择数据表'}]}>
                        <Select>
                            {
                                tables.map((table) => (
                                    <Option value={table} key={table}>{table}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                </Form>
            )}
        </Modal>
    )
}

export default DataSourceForm