import React, { useState } from 'react'
import { Button, Layout, Space, Row, Col, Table, Form, Input, Modal, Select, message, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'

const { Option } = Select
const { Content, Header } = Layout

const initialDataStandards = [
  {
    uuid: '1234567890',
    name: 'Patient Admission Data Standard',
    description: 'Standard for patient admission records',
    version: '1.0',
    versionDescription: 'Initial version',
    fields: [
      { name: 'OrgID', type: 'int', allowNull: false, length: null, description: '参照第4章节中关键字段说明' },
      { name: 'OrgPatientGlobalIDType', type: 'int', allowNull: false, length: null, description: '参照第4章节中关键字段说明' },
      { name: 'OrgPatientGlobalID', type: 'varchar', allowNull: false, length: 64, description: '参照第4章节中关键字段说明' },
      { name: 'OrgSystemCode', type: 'varchar', allowNull: false, length: 200, description: '参照第4章节中关键字段说明' },
      { name: 'VisitType', type: 'int', allowNull: false, length: null, description: '参照第4章节中关键字段说明' },
      { name: 'VisitSerialNo', type: 'varchar', allowNull: false, length: 50, description: '参照第4章节中关键字段说明' },
      { name: 'ResidentAdmitNoteID', type: 'varchar', allowNull: false, length: 200, description: '医疗机构内部唯一标识入院记录的ID' },
      { name: 'OutPatientID', type: 'varchar', allowNull: true, length: 64, description: '' },
      { name: 'InPatientID', type: 'varchar', allowNull: true, length: 64, description: '' },
      { name: 'VisitNumber', type: 'varchar', allowNull: true, length: 64, description: '' },
      { name: 'MedicalInsuranceCardNo', type: 'varchar', allowNull: true, length: 64, description: '' },
      { name: 'CitizenSINCardDistrictCode', type: 'varchar', allowNull: true, length: 6, description: '参照国标GB/T2260-2007标准' },
      { name: 'HealthCardNo', type: 'varchar', allowNull: true, length: 64, description: '' },
      { name: 'HealthCardNoDistrictCode', type: 'varchar', allowNull: true, length: 6, description: '参照国标GB/T2260-2007标准' },
      { name: 'Age', type: 'varchar', allowNull: false, length: 30, description: '比如23岁' },
      { name: 'Height', type: 'varchar', allowNull: true, length: 30, description: '带单位cm' },
      { name: 'Weight', type: 'varchar', allowNull: true, length: 30, description: '带单位kg' },
      { name: 'AdmitType', type: 'varchar', allowNull: true, length: 30, description: '区分住院就诊业务类型。' },
      { name: 'MedicalRecordNumber', type: 'varchar', allowNull: false, length: 64, description: '' },
      { name: 'DeptCode', type: 'varchar', allowNull: true, length: 50, description: '' },
      { name: 'DeptName', type: 'nvarchar', allowNull: false, length: 100, description: '' },
      { name: 'AdmitDate', type: 'datetime', allowNull: false, length: null, description: 'yyyyMMddHH:mm:ss' },
      { name: 'Ward', type: 'varchar', allowNull: true, length: 30, description: '' },
      { name: 'BuildNo', type: 'varchar', allowNull: true, length: 30, description: '' },
      { name: 'BedNo', type: 'varchar', allowNull: true, length: 30, description: '' },
      { name: 'HistoryTeller', type: 'varchar', allowNull: true, length: 30, description: '' },
      { name: 'Complaint', type: 'varchar', allowNull: true, length: 'max', description: '' },
      { name: 'HistoryOfPresentIllness', type: 'varchar', allowNull: true, length: 'max', description: '' },
      { name: 'PastMedHistory', type: 'varchar', allowNull: true, length: 'max', description: '' },
      { name: 'PersonalHistory', type: 'varchar', allowNull: true, length: 'max', description: '' },
      { name: 'ObstericalHistory', type: 'varchar', allowNull: true, length: 'max', description: '' },
      { name: 'FamilyHistory', type: 'varchar', allowNull: true, length: 'max', description: '' },
      { name: 'PhysicalExamination', type: 'varchar', allowNull: true, length: 'max', description: '' },
      { name: 'SpecialityCheckup', type: 'varchar', allowNull: true, length: 'max', description: '' },
      { name: 'AuxiliaryExamination', type: 'varchar', allowNull: true, length: 'max', description: '' },
      { name: 'AdmissionDiag', type: 'varchar', allowNull: true, length: 'max', description: '' },
      { name: 'RecordTime', type: 'datetime', allowNull: false, length: null, description: 'yyyyMMddHH:mm:ss' },
      { name: 'RecordContent', type: 'varchar', allowNull: true, length: 'max', description: '若记录内容无法拆分成多个字段，则记录内容存放到该字段' },
      { name: 'XmlData', type: 'varchar', allowNull: true, length: 'max', description: '该记录的 XML格式文件的下载路径' },
      { name: 'XmlDataVersion', type: 'varchar', allowNull: true, length: 20, description: 'XML内容格式对应的版本号' },
      { name: 'FilePath', type: 'varchar', allowNull: true, length: 'max', description: '该记录的 PDF格式文件的下载路径' },
      { name: 'UpdateTime', type: 'datetime', allowNull: false, length: null, description: 'yyyyMMddHH:mm:ss.fff' },
      { name: 'AlterFlag', type: 'int', allowNull: false, length: null, description: '1:正常, 2:撤销', defaultValue: 1 }
    ],
  },
  {
    uuid: '0987654321',
    name: 'Patient Personal Information Data Standard',
    description: 'Standard for patient personal and contact information',
    version: '1.0',
    versionDescription: 'Initial version',
    fields: [
      { name: 'OrgID', type: 'int', allowNull: false, length: null, description: '参照第4章节中关键字段说明' },
      { name: 'OrgPatientGlobalIDType', type: 'int', allowNull: false, length: null, description: '参照第4章节中关键字段说明' },
      { name: 'OrgPatientGlobalID', type: 'varchar', allowNull: false, length: 64, description: '参照第4章节中关键字段说明' },
      { name: 'OrgSystemCode', type: 'varchar', allowNull: false, length: 200, description: '参照第4章节中关键字段说明' },
      { name: 'IdentifyNo', type: 'varchar', allowNull: true, length: 64, description: '' },
      { name: 'IdentifyType', type: 'varchar', allowNull: true, length: 30, description: '参照10.1' },
      { name: 'Sex', type: 'int', allowNull: false, length: null, description: '参照10.2' },
      { name: 'Name', type: 'nvarchar', allowNull: false, length: 64, description: '' },
      { name: 'NamePY', type: 'varchar', allowNull: true, length: 250, description: '' },
      { name: 'PatType', type: 'int', allowNull: false, length: null, description: '1:本市, 2:外地, 3:境外（港澳台）, 4:外国, 5:未知' },
      { name: 'Marriage', type: 'varchar', allowNull: true, length: 30, description: '参照10.3' },
      { name: 'BirthDay', type: 'datetime', allowNull: true, length: null, description: 'yyyyMMdd' },
      { name: 'BirthPlace', type: 'varchar', allowNull: true, length: 1000, description: '参照国标GB/T2260-2007' },
      { name: 'Nation', type: 'varchar', allowNull: true, length: 1000, description: '参照10.4' },
      { name: 'Nationality', type: 'varchar', allowNull: true, length: 1000, description: '参照国标GB/T 2659.1-2022' },
      { name: 'NativePlace', type: 'varchar', allowNull: true, length: 100, description: '参照国标GB/T2260-2007' },
      { name: 'Occupation', type: 'varchar', allowNull: true, length: 100, description: '参照国标GB/T6565-2015' },
      { name: 'Blood', type: 'int', allowNull: true, length: null, description: '1:A, 2:B, 3:0, 4:AB, 5:不详, 6:未查' },
      { name: 'RHBlood', type: 'int', allowNull: true, length: null, description: '1:阴, 2:阳, 3:不详, 4:未查' },
      { name: 'Tel', type: 'varchar', allowNull: true, length: 30, description: '' },
      { name: 'Phone', type: 'varchar', allowNull: false, length: 30, description: '' },
      { name: 'CompyPostalCode', type: 'varchar', allowNull: true, length: 30, description: '' },
      { name: 'CompyName', type: 'varchar', allowNull: true, length: 1000, description: '' },
      { name: 'CompyAdd', type: 'varchar', allowNull: true, length: 1000, description: '' },
      { name: 'CompyTel', type: 'varchar', allowNull: true, length: 30, description: '' },
      { name: 'Address', type: 'varchar', allowNull: true, length: 1000, description: '' },
      { name: 'AddressPCode', type: 'varchar', allowNull: true, length: 30, description: '' },
      { name: 'CitizenLiveDistrictCode', type: 'varchar', allowNull: true, length: 6, description: '参照国标GB/T2260-2007' },
      { name: 'HhAdd', type: 'varchar', allowNull: true, length: 1000, description: '' },
      { name: 'HhPcode', type: 'varchar', allowNull: true, length: 30, description: '' },
      { name: 'CitizenRegistrationDistrictCode', type: 'varchar', allowNull: true, length: 6, description: '参照国标GB/T2260-2007' },
      { name: 'Contacts', type: 'nvarchar', allowNull: true, length: 64, description: '' },
      { name: 'ContactRs', type: 'varchar', allowNull: true, length: 200, description: '参照国标GB/T4761-2008' },
      { name: 'ContactAdd', type: 'varchar', allowNull: true, length: 1000, description: '' },
      { name: 'ContactPcode', type: 'varchar', allowNull: true, length: 30, description: '' },
      { name: 'ContactTel', type: 'varchar', allowNull: true, length: 30, description: '' },
      { name: 'UpdateTime', type: 'datetime', allowNull: false, length: null, description: 'yyyyMMddHH:mm:ss.fff' },
      { name: 'AlterFlag', type: 'int', allowNull: false, length: null, description: '1:正常, 2:撤销', defaultValue: 1 }
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
