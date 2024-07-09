import React, { useState } from 'react'
import { Upload, Button, Select, Table, Form, Input, Modal, Layout, Space, Row, Col, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const { Option } = Select
const { Content, Header } = Layout

//模拟数据
const mockData_A = [
  {
    key: '1',
    name: 'Example File 1',
    type: 'Type A',
    content: { 'name': 'lyican', 'age': 21, 'sex': 'male' },
  },
  {
    key: '2',
    name: 'Example File 2',
    type: 'Type A',
    content: { 'name': 'klx', 'age': 22, 'sex': 'male' },
  },
]

const mockData_B = [
  {
    key: '1',
    name: 'Example File 1',
    type: 'Type B',
    content: { 'verdict': 'anything', 'ct-number': '456', 'time': '2024-7-9 16:00:00' },
  },
  {
    key: '2',
    name: 'Example File 2',
    type: 'Type B',
    content: { 'verdict': 'something', 'ct-number': '123', 'time': '2024-7-9 12:00:00' },
  },
]

const PdfPage = () => {
  const [fileList, setFileList] = useState([])
  const [reportType, setReportType] = useState(null)
  const [parsedData, setParsedData] = useState([])
  const [editingRecord, setEditingRecord] = useState(null)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isDbModalVisible, setIsDbModalVisible] = useState(false)

  const handleBeforeUpload = (file) => {
    setFileList((prevFileList) => [
      ...prevFileList,
      {
        ...file,
        status: 'done'
      }
    ])
    return false // Prevent actual upload
  }

  const handleUpload = () => {
    //upload to mongodb and return ids
    if (fileList.length === 0) {
      message.error('请选择至少一个文件')
    }
    else {
      message.success('文件已成功上传并存储')
    }
  }

  const handleParse = () => {
    //use ids to find the pdf in mongodb and ocr parse
    // Mock parsing logic
    if (fileList.length === 0) {
      message.error("请先选择文件")
      return
    }
    //若ids列表为空，说明并未上传
    // if(ids.length === 0){
    //   message.error('请先上传文件')
    // }
    if (reportType === null) {
      message.error("请先选择一个报告类型")
      return
    }
    else if (reportType === 'typeA') {
      //upload to different flask api according to type
      const hide = message.loading("正在解析...", 0)
      setTimeout(() => {
        hide()
        setParsedData(mockData_A)
        message.success("解析完成")
      }, 2000)
    }
    else {
      const hide = message.loading("正在解析...", 0)
      setTimeout(() => {
        hide()
        setParsedData(mockData_B)
        message.success("解析完成")
      }, 2000)
    }
    setFileList([])
  }

  const showEditModal = (record) => {
    setEditingRecord(record)
    setIsEditModalVisible(true)
  }

  const handleEditSave = () => {
    form.validateFields()
      .then(values => {
        const newData = [...parsedData]
        const index = newData.findIndex(item => editingRecord.key === item.key)
        if (index > -1) {
          const item = newData[index]
          newData.splice(index, 1, { ...item, ...values, content: { ...editingRecord.content, ...values.content } })
          setParsedData(newData)
          setEditingRecord(null)
          setIsEditModalVisible(false)
        }
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }

  const handleEditCancel = () => {
    setEditingRecord(null)
    setIsEditModalVisible(false)
  }

  const baseColumns = [
    {
      title: 'File Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
  ]

  //自适应展示column
  const dynamicColumns = parsedData.length > 0
    ? Object.keys(parsedData[0].content).map(key => ({
      title: key.charAt(0).toUpperCase() + key.slice(1),
      dataIndex: ['content', key],
      key: key,
    }))
    : []

  const columns = [
    ...baseColumns,
    ...dynamicColumns,
    {
      title: 'Operation',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, record) => (
        <a onClick={() => showEditModal(record)}>
          Edit
        </a>
      ),
    },
  ]

  const handleTestConnection = () => {
    form.validateFields(['dbType', 'dbHost', 'dbPort', 'dbName', 'dbUser', 'dbPassword'])
      .then(values => {
        // Mock test connection logic
        message.success('数据库连接成功')
      })
      .catch(error => {
        message.error('数据库连接失败，请检查配置信息')
      })
  }

  const [form] = Form.useForm()
  const [dbForm] = Form.useForm()

  const renderContentFields = () => {
    if (!editingRecord) return null

    return Object.keys(editingRecord.content).map(key => (
      <Form.Item
        key={key}
        name={['content', key]}
        label={key.charAt(0).toUpperCase() + key.slice(1)}
        rules={[{ required: true, message: `Please input ${key}!` }]}
      >
        <Input />
      </Form.Item>
    ))
  }

  const handleDbSubmit = () => {
    dbForm.validateFields()
      .then(values => {
        // Handle database configuration submission here
        // console.log('Database config:', values)
        const hide = message.loading('正在落表...', 0)
        setTimeout(() => {
          hide()
          setIsDbModalVisible(false)
          message.success(`已成功落表`)
        }, 2000)
        setParsedData([])
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }

  const handleConfirm = () => {
    if (parsedData.length === 0) {
      message.error("暂无数据")
    }
    else {
      setIsDbModalVisible(true)
    }
  }

  return (
    <Layout style={{ minHeight: '100vh', borderRadius: '3px', background: '#fff' }}>
      <Header style={{ padding: '0 20px', borderRadius: '3px', background: '#fff' }}>
        <h1>PDF解析处理</h1>
      </Header>
      <Content style={{ padding: '20px', borderRadius: '10px', marginTop: '5px' }}>
        <Space direction="vertical" style={{ width: '100%', borderRadius: '3px' }}>
          <Row gutter={16} style={{ borderRadius: '3px' }}>
            <Col>
              <Upload
                fileList={fileList}
                beforeUpload={handleBeforeUpload}
                onChange={({ fileList }) => setFileList(fileList)}
                multiple
              >
                <Button icon={<UploadOutlined />}>选择PDF文件</Button>
              </Upload>
            </Col>
            <Col>
              <Button onClick={handleUpload}>上传文件</Button>
            </Col>
          </Row>
          <Row gutter={16} style={{ borderRadius: '3px' }}>
            <Col>
              <Select
                placeholder="选择报告类型"
                style={{ width: '200px' }}
                onChange={setReportType}
              >
                <Option value="typeA">Type A</Option>
                <Option value="typeB">Type B</Option>
              </Select>
            </Col>
            <Col>
              <Button onClick={handleParse}>
                OCR解析
              </Button>
            </Col>
          </Row>
          <Table
            bordered
            dataSource={parsedData}
            columns={columns}
            rowClassName="editable-row"
            pagination={false}
          />
        </Space>
        <Button onClick={handleConfirm} style={{ marginTop: '20px' }}>
          确认并落表
        </Button>
        <Modal
          title="Database Configuration"
          open={isDbModalVisible}
          onCancel={() => setIsDbModalVisible(false)}
          onOk={handleDbSubmit}
        >
          <Form form={dbForm} layout="vertical">
            <Form.Item
              name="dbType"
              label="Database Type"
              rules={[{ required: true, message: 'Please select the database type!' }]}
            >
              <Select placeholder="Select database type">
                <Option value="mongo">MongoDB</Option>
                <Option value="mysql">MySQL</Option>
                <Option value="postgres">PostgreSQL</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="dbHost"
              label="Database Host"
              rules={[{ required: true, message: 'Please input the database host!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="dbPort"
              label="Database Port"
              rules={[{ required: true, message: 'Please input the database port!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="dbName"
              label="Database Name"
              rules={[{ required: true, message: 'Please input the database name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="dbUser"
              label="Database Username"
              rules={[{ required: true, message: 'Please input the database username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="dbPassword"
              label="Database Password"
              rules={[{ required: true, message: 'Please input the database password!' }]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
          <Button onClick={handleTestConnection}>测试连接</Button>
        </Modal>
        <Modal
          title="Edit Record"
          open={isEditModalVisible}
          onOk={handleEditSave}
          onCancel={handleEditCancel}
        >
          <Form
            form={form}
            initialValues={editingRecord}
          >
            <Form.Item
              name="name"
              label="File Name"
              rules={[{ required: true, message: 'Please input the file name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: true, message: 'Please select the type!' }]}
            >
              <Select>
                <Option value="Type A">Type A</Option>
                <Option value="Type B">Type B</Option>
              </Select>
            </Form.Item>
            {renderContentFields()}
          </Form>
        </Modal>
      </Content>
    </Layout>
  )
}

export default PdfPage
