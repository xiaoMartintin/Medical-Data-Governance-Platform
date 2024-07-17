import React, { useState } from 'react'
import { Button, Layout, Space, Row, Col, Table, Form, Input, Modal, Select, message, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'

const { Option } = Select
const { Content, Header } = Layout

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

const InterfaceDocPage = () => {
  const [apiList, setApiList] = useState([])
  const [editingApi, setEditingApi] = useState(null)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [form] = Form.useForm()

  const handleAddApi = () => {
    setEditingApi(null)
    form.resetFields()
    setIsEditModalVisible(true)
  }

  const handleEditApi = (record) => {
    setEditingApi(record)
    form.setFieldsValue(record)
    setIsEditModalVisible(true)
  }

  const handleEditSave = (values) => {
    const [inputUuid, inputVersion] = values.inputData.split('-')
    const [outputUuid, outputVersion] = values.outputData.split('-')

    const inputStandard = initialDataStandards.find(standard => standard.uuid === inputUuid && standard.version === inputVersion)
    const outputStandard = initialDataStandards.find(standard => standard.uuid === outputUuid && standard.version === outputVersion)

    if (editingApi) {
      const newList = apiList.map((api) => (api.key === editingApi.key ? { ...values, key: editingApi.key, inputStandard, outputStandard } : api))
      setApiList(newList)
      message.success('成功更新接口')
    } else {
      const newApi = {
        ...values,
        key: Date.now().toString(),
        inputStandard,
        outputStandard,
      }
      setApiList([...apiList, newApi])
      message.success('成功添加接口')
    }
    setIsEditModalVisible(false)
  }

  const handleDeleteApi = (key) => {
    const newList = apiList.filter((api) => api.key !== key)
    setApiList(newList)
    message.success('成功删除接口')
  }

  const handleEditCancel = () => {
    setIsEditModalVisible(false)
    setEditingApi(null)
  }

  const columns = [
    {
      title: '接口名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '方法',
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEditApi(record)}>编辑</Button>
          <Popconfirm title="确定删除?" onConfirm={() => handleDeleteApi(record.key)}>
            <Button danger type="link" icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const expandedRowRender = (record) => {
    const columns = [
      { title: '字段名', dataIndex: 'name', key: 'name' },
      { title: '类型', dataIndex: 'type', key: 'type' },
      { title: '允许为空', dataIndex: 'allowNull', key: 'allowNull', render: (text) => (text ? 'Yes' : 'No') },
      { title: '长度', dataIndex: 'length', key: 'length' },
      { title: '描述', dataIndex: 'description', key: 'description' },
    ]

    return (
      <>
        <h3>输入数据标准: {record.inputStandard.name} - {record.inputStandard.version}</h3>
        <Table
          columns={columns}
          dataSource={record.inputStandard.fields}
          pagination={false}
          rowKey="name"
          size="small"
        />
        <h3>返回数据标准: {record.outputStandard.name} - {record.outputStandard.version}</h3>
        <Table
          columns={columns}
          dataSource={record.outputStandard.fields}
          pagination={false}
          rowKey="name"
          size="small"
        />
      </>
    )
  }

  const renderDataStandardsOptions = () => {
    return initialDataStandards.map((standard, index) => (
      <Option key={index} value={`${standard.uuid}-${standard.version}`}>{`${standard.name} - ${standard.version}`}</Option>
    ))
  }

  return (
    <Layout style={{ minHeight: '100vh', borderRadius: '3px', background: '#fff' }}>
      <Header style={{ padding: '0 20px', borderRadius: '3px', background: '#fff' }}>
        <h1>接口生成</h1>
      </Header>
      <Content style={{ padding: '20px', borderRadius: '10px', marginTop: '5px' }}>
        <Space direction="vertical" style={{ width: '100%', borderRadius: '3px' }}>
          <Row gutter={16}>
            <Col span={4}>
              <Button onClick={handleAddApi} icon={<PlusOutlined />}>
                添加接口
              </Button>
            </Col>
          </Row>
          <Table
            bordered
            dataSource={apiList}
            columns={columns}
            rowClassName="editable-row"
            pagination={false}
            expandable={{
              expandedRowRender: record => expandedRowRender(record),
            }}
          />
        </Space>
        <Modal
          title={editingApi ? '编辑接口详情' : '添加接口'}
          visible={isEditModalVisible}
          onCancel={handleEditCancel}
          footer={null}
        >
          <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            initialValues={editingApi || { method: 'GET' }}
            onFinish={handleEditSave}
          >
            <Form.Item
              name="name"
              label="API Name"
              rules={[{ required: true, message: '请输入接口名称' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="method"
              label="方法"
              rules={[{ required: true, message: '请选择方法' }]}
            >
              <Select>
                <Option value="GET">GET</Option>
                <Option value="POST">POST</Option>
                <Option value="PUT">PUT</Option>
                <Option value="DELETE">DELETE</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="path"
              label="路径"
              rules={[{ required: true, message: '请输入接口路径' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="描述"
              rules={[{ required: true, message: '请输入接口描述' }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="inputData"
              label="输入数据"
              rules={[{ required: true, message: '请选择输入数据' }]}
            >
              <Select placeholder="选择输入数据">
                {renderDataStandardsOptions()}
              </Select>
            </Form.Item>
            <Form.Item
              name="outputData"
              label="返回数据"
              rules={[{ required: true, message: '请选择返回数据' }]}
            >
              <Select placeholder="选择返回数据">
                {renderDataStandardsOptions()}
              </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
              <Button htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  )
}

export default InterfaceDocPage
