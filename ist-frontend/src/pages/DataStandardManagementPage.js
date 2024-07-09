import React, { useState } from 'react'
import { Form, Input, Button, Table, Modal, Select, Switch, InputNumber, message } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'

const { Option } = Select

const initialDataStandards = [
  {
    name: 'Standard 1',
    description: 'Description for Standard 1',
    fields: [
      { name: 'Field 1', type: 'varchar', allowNull: false, length: 255, description: 'Description for Field 1' },
      { name: 'Field 2', type: 'integer', allowNull: true, length: 4, description: 'Description for Field 2' },
    ],
  },
  {
    name: 'Standard 2',
    description: 'Description for Standard 2',
    fields: [
      { name: 'Field A', type: 'char', allowNull: false, length: 100, description: 'Description for Field A' },
      { name: 'Field B', type: 'boolean', allowNull: true, length: 1, description: 'Description for Field B' },
    ],
  },
]

const DataStandardManagementPage = () => {
  const [dataStandards, setDataStandards] = useState(initialDataStandards)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [fieldForm] = Form.useForm()
  const [currentStandard, setCurrentStandard] = useState(null)
  const [currentStandardIndex, setCurrentStandardIndex] = useState(-1)
  const [type, setType] = useState('')
  const [isEditingField, setIsEditingField] = useState(false)
  const [editingFieldIndex, setEditingFieldIndex] = useState(-1)
  const [isStandardModalVisible, setIsStandardModalVisible] = useState(false)
  const [standardForm] = Form.useForm()
  const [view, setView] = useState(false)

  const handleEditStandard = (record, index) => {
    setCurrentStandard(record)
    setCurrentStandardIndex(index)
    setIsStandardModalVisible(true)
    standardForm.setFieldsValue(record)
  }

  const handleDeleteStandard = (index) => {
    const newStandards = [...dataStandards]
    newStandards.splice(index, 1)
    setDataStandards(newStandards)
    setCurrentStandard(null)
    message.success('Data standard deleted successfully')
  }

  const handleViewFields = (record, index) => {
    setCurrentStandard(record)
    setCurrentStandardIndex(index)
    setView(true)
  }

  const handleStandardModalOk = () => {
    standardForm.validateFields()
      .then(values => {
        const newStandards = [...dataStandards]
        newStandards[currentStandardIndex] = {
          ...currentStandard,
          name: values.name,
          description: values.description,
        }
        setDataStandards(newStandards)
        setIsStandardModalVisible(false)
      })
      .catch(errorInfo => {
        console.log('Validate Failed:', errorInfo)
      })
  }

  const handleStandardModalCancel = () => {
    standardForm.resetFields()
    setIsStandardModalVisible(false)
  }

  const handleModalOk = () => {
    fieldForm.validateFields()
      .then(values => {
        const newField = {
          name: values.name,
          type: values.type,
          allowNull: values.allowNull ? values.allowNull : false,
          length: values.type === 'char' || values.type === 'varchar' ? values.length : getFieldLength(values.type),
          description: values.description ? values.description : '',
        }
        const newFields = [...currentStandard.fields]
        if (isEditingField) {
          newFields[editingFieldIndex] = newField
        } else {
          newFields.push(newField)
        }
        const newStandard = {
          ...currentStandard,
          fields: newFields,
        }
        const newStandards = [...dataStandards]
        newStandards[currentStandardIndex] = newStandard
        setCurrentStandard(newStandard)
        setDataStandards(newStandards)
        fieldForm.resetFields()
        setIsModalVisible(false)
      })
      .catch(errorInfo => {
        console.log('Validate Failed:', errorInfo)
      })
  }

  const handleModalCancel = () => {
    fieldForm.resetFields()
    setIsModalVisible(false)
  }

  const getFieldLength = (type) => {
    switch (type) {
      case 'boolean':
        return 1
      case 'integer':
        return 4
      case 'float':
        return 4
      case 'double':
        return 8
      case 'date':
        return undefined
      default:
        return 255
    }
  }

  const handleAddField = () => {
    setIsEditingField(false)
    setEditingFieldIndex(-1)
    setType('')
    setIsModalVisible(true)
  }

  const handleEditField = (field, index) => {
    setIsEditingField(true)
    setEditingFieldIndex(index)
    setType(field.type)
    setIsModalVisible(true)
    fieldForm.setFieldsValue(field)
  }

  const handleDeleteField = (index) => {
    const newFields = [...currentStandard.fields]
    newFields.splice(index, 1)
    const newStandard = {
      ...currentStandard,
      fields: newFields,
    }
    const newStandards = [...dataStandards]
    newStandards[currentStandardIndex] = newStandard
    setDataStandards(newStandards)
    message.success('Field deleted successfully')
  }

  const handleChangeType = (value) => {
    fieldForm.setFieldsValue({ length: getFieldLength(value), type: value })
    setType(value)
  }

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record, index) => (
        <>
          <Button type="link" onClick={() => handleEditStandard(record, index)}>
            <EditOutlined /> 编辑
          </Button>
          <Button type="link" onClick={() => handleViewFields(record, index)}>
            <EyeOutlined /> 查看字段
          </Button>
          <Button type="link" danger onClick={() => handleDeleteStandard(index)}>
            <DeleteOutlined /> 删除
          </Button>
        </>
      ),
    },
  ]

  const fieldColumns = [
    {
      title: '字段名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '字段类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '允许为空？',
      dataIndex: 'allowNull',
      key: 'allowNull',
      render: (text, record) => (
        <span>{text ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: '长度',
      dataIndex: 'length',
      key: 'length',
      render: (text, record) => (
        <span>{text ? text : '-'}</span>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record, index) => (
        <>
          <Button type="link" onClick={() => handleEditField(record, index)}>
            <EditOutlined /> 编辑
          </Button>
          <Button type="link" danger onClick={() => handleDeleteField(index)}>
            <DeleteOutlined /> 删除
          </Button>
        </>
      ),
    },
  ]

  return (
    <div style={{ padding: '20px' }}>
      <h1>维护数据标准</h1>

      <Table
        dataSource={dataStandards}
        columns={columns}
        pagination={false}
        bordered
        rowKey={(record, index) => index.toString()}
        style={{ marginTop: '20px' }}
      />

      <Modal
        title="编辑数据标准"
        visible={isStandardModalVisible}
        onOk={handleStandardModalOk}
        onCancel={handleStandardModalCancel}
      >
        <Form form={standardForm} layout="vertical">
          <Form.Item
            name="name"
            label="数据标准名称"
            rules={[{ required: true, message: 'Please enter data standard name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="数据标准描述"
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>

      {currentStandard && view && (
        <>
          <h2>编辑数据标准字段: {currentStandard.name}</h2>
          <Table
            dataSource={currentStandard.fields}
            columns={fieldColumns}
            pagination={false}
            bordered
            rowKey={(record, index) => index.toString()}
            style={{ marginTop: '20px' }}
          />
          <Button icon={<PlusOutlined />} onClick={handleAddField} style={{ marginTop: '20px' }}>
            增加字段
          </Button>
        </>
      )}

      <Modal
        title={isEditingField ? "Edit Field" : "Add Field"}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={fieldForm} layout="vertical">
          <Form.Item
            name="name"
            label="字段名"
            rules={[{ required: true, message: 'Please enter field name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="type"
            label="字段类型"
            rules={[{ required: true, message: 'Please select field type' }]}
          >
            <Select placeholder="选择一个类型" onChange={handleChangeType}>
              <Option value="char">Char</Option>
              <Option value="varchar">Varchar</Option>
              <Option value="integer">Integer</Option>
              <Option value="boolean">Boolean</Option>
              <Option value="date">Date</Option>
              <Option value="text">Text</Option>
              <Option value="float">Float</Option>
              <Option value="double">Double</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="allowNull"
            label="允许为空？"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="length"
            label="长度"
            dependencies={['type']}
          >
            {type === 'char' || type === 'varchar' ?
              <InputNumber min={1} /> : <InputNumber min={1} disabled />}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default DataStandardManagementPage
