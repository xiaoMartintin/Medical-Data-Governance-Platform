import React, { useState, version } from 'react'
import { Form, Input, Button, Table, Modal, Select, Switch, InputNumber, message } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'

const { Option } = Select

const DataStandardPage = () => {
  const [dataStandard, setDataStandard] = useState({
    uid: '',
    name: '',
    description: '',
    version: '1.0',
    versionDescription: 'Initial Version',
    fields: [],
  })
  const [fieldForm] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [type, setType] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editingIndex, setEditingIndex] = useState(-1)

  const handleAddField = () => {
    setType('')
    setIsEditing(false)
    setIsModalVisible(true)
  }

  const handleEditField = (record, index) => {
    setType(record.type)
    setIsEditing(true)
    setEditingIndex(index)
    setIsModalVisible(true)
    fieldForm.setFieldsValue(record)
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
        const newFields = [...dataStandard.fields]
        if (isEditing) {
          newFields[editingIndex] = newField
        } else {
          newFields.push(newField)
        }
        setDataStandard({
          ...dataStandard,
          fields: newFields,
        })
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

  const handleDeleteField = (index) => {
    const newFields = [...dataStandard.fields]
    newFields.splice(index, 1)
    setDataStandard({
      ...dataStandard,
      fields: newFields,
    })
    message.success('Field deleted successfully')
  }

  const handleChangeType = (value) => {
    fieldForm.setFieldsValue({ length: getFieldLength(value), type: value })
    setType(value)
  }

  const handleSave = () => {
    if (dataStandard.name === '' || dataStandard.fields.length === 0) {
      message.error('请完整定义后保存')
    }
    else {
      console.log('Saving Data Standard:', dataStandard)
    }
  }

  const columns = [
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
      title: '允许为空',
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
      <h1>定义数据标准</h1>
      <Form layout="vertical">
        <Form.Item
          name="name"
          label="数据标准名称"
          rules={[{ required: true, message: '请输入数据标准名称' }]}
        >
          <Input onChange={(e) => {
            setDataStandard({
              ...dataStandard,
              name: e.target.value,
            })
          }} />
        </Form.Item>
        <Form.Item
          name="description"
          label="数据标准描述"
          rules={[{ required: true, message: '请添加数据标准描述' }]}
        >
          <Input.TextArea onChange={(e) => {
            setDataStandard({
              ...dataStandard,
              description: e.target.value,
            })
          }} />
        </Form.Item>
        <Form.Item
          name="version"
          label="初始版本号"
          rules={[{ required: true, message: '请输入初始版本号' }]}
        >
          <Input defaultValue="1.0" onChange={(e) => {
            setDataStandard({
              ...dataStandard,
              version: e.target.value,
            })
          }} />
        </Form.Item>
        <Form.Item
          name="versionDescription"
          label="初始版本描述"
          rules={[{ required: true, message: '请输入初始版本描述' }]}
        >
          <Input.TextArea defaultValue="Initial Version" onChange={(e) => {
            setDataStandard({
              ...dataStandard,
              versionDescription: e.target.value,
            })
          }} />
        </Form.Item>
      </Form>

      <Button icon={<PlusOutlined />} onClick={handleAddField}>
        增加字段
      </Button>

      <Table
        dataSource={dataStandard.fields}
        columns={columns}
        pagination={false}
        bordered
        rowKey={(record, index) => index.toString()}
        style={{ marginTop: '20px' }}
      />

      <Modal
        title={isEditing ? "Edit Field" : "Add Field"}
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
            label="允许为空"
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

      <Button onClick={handleSave} style={{ marginTop: '20px' }}>
        保存数据标准
      </Button>
    </div>
  )
}

export default DataStandardPage
