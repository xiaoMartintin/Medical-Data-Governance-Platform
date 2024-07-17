import React, { useState } from 'react'
import { Upload, Button, Select, Table, Form, Input, Modal, Layout, Space, Row, Col, message, Spin, Popover } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { submitFile, ocr_ct, ocr_mr } from '../service/file'

const { Option } = Select
const { Content, Header } = Layout

const PdfPage = () => {
  const [fileList, setFileList] = useState([])
  const [reportType, setReportType] = useState(null)
  const [editingRecord, setEditingRecord] = useState(null)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isDbModalVisible, setIsDbModalVisible] = useState(false)
  const [ids, setIds] = useState([])
  const [info, setInfo] = useState([])
  const [loading, setLoading] = useState(false)

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

  const handleMultiSubmit = () => {
    if (fileList.length === 0) {
      console.log("No files selected")
      message.error("请选择至少一个文件")
      return
    }
    const newIds = []
    for (let i = 0; i < fileList.length; i++) {
      const formData = new FormData()
      formData.append('file', fileList[i].originFileObj)
      submitFile(formData, (data) => {
        //console.log(formData.get('file'))
        if (data) {
          console.log(data)
          newIds.push(data._id)
          message.success("文件已成功上传")
        }
        else {
          message.error("未能上传文件")
        }
      })
    }
    setIds(newIds)
  }

  const handleParse = () => {
    if (fileList.length === 0) {
      message.error("请先选择文件")
      return
    }
    if (ids.length === 0) {
      message.error("请先上传文件")
      return
    }
    if (reportType === null) {
      message.error("请选择一个报告类型")
      return
    }
    setLoading(true)
    const json = {
      "ids": ids
    }
    switch (reportType) {
      case "CT":
        ocr_ct(json, (response) => {
          setLoading(false)
          if (response.error) {
            message.error('解析失败')
          } else if (response) {
            console.log(response)
            let tmp = []
            for (let i = 0; i < response.results.length; i++) {
              tmp.push({
                "key": i,
                "name": fileList[i].originFileObj.name,
                "type": reportType,
                "content": response.results[i]
              })
            }
            setInfo(tmp)
            message.success('解析成功')
          }
        })
        break
      case "MR":
        ocr_mr(json, (response) => {
          setLoading(false)
          if (response.error) {
            message.error('解析失败')
          } else if (response) {
            console.log(response)
            let tmp = []
            for (let i = 0; i < response.results.length; i++) {
              tmp.push({
                "key": i,
                "name": fileList[i].originFileObj.name,
                "type": reportType,
                "content": response.results[i]
              })
            }
            setInfo(tmp)
            message.success('解析成功')
          }
        })
        break
      default:
        break
    }
    setFileList([])
    setIds([])
  }

  const showEditModal = (record) => {
    setEditingRecord(record)
    setIsEditModalVisible(true)
  }

  const handleEditSave = () => {
    form.validateFields()
      .then(values => {
        const newData = [...info]
        const index = newData.findIndex(item => editingRecord.key === item.key)
        if (index > -1) {
          const item = newData[index]
          newData.splice(index, 1, { ...item, ...values, content: { ...editingRecord.content, ...values.content } })
          setInfo(newData)
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
  const dynamicColumns = info.length > 0
    ? Object.keys(info[0].content).map(key => ({
      title: key.charAt(0).toUpperCase() + key.slice(1),
      dataIndex: ['content', key],
      key: key,
      render: (text) => (
        <Popover content={text} title={key.charAt(0).toUpperCase() + key.slice(1)}>
          <span>{text.length > 15 ? `${text.substring(0, 15)}...` : text}</span>
        </Popover>
      )
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
        <Button type='link' onClick={() => showEditModal(record)}>
          Edit
        </Button>
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
        <Input.TextArea />
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
        setInfo([])
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }

  const handleConfirm = () => {
    if (info.length === 0) {
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
              <Button onClick={handleMultiSubmit}>上传文件</Button>
            </Col>
          </Row>
          <Row gutter={16} style={{ borderRadius: '3px' }}>
            <Col>
              <Select
                placeholder="选择报告类型"
                style={{ width: '200px' }}
                onChange={setReportType}
              >
                <Option value="CT">CT检查报告单</Option>
                <Option value="MR">MR检查报告单</Option>
              </Select>
            </Col>
            <Col>
              <Spin spinning={loading}>
                <Button onClick={handleParse}>
                  OCR解析
                </Button>
              </Spin>
            </Col>
          </Row>
          <Table
            bordered
            dataSource={info}
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
