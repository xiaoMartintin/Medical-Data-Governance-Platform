import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Table, Modal, Select, Switch, InputNumber, message, Space } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, EyeOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons'

const { Option } = Select
const { confirm } = Modal

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


function deepEqual (obj1, obj2) {
  if (obj1 === obj2)
    return true
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false
  }
  let keys1 = Object.keys(obj1)
  let keys2 = Object.keys(obj2)
  if (keys1.length !== keys2.length) {
    return false
  }
  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false
    }
  }
  return true
}

const DataStandardManagementPage = () => {
  const [dataStandards, setDataStandards] = useState(initialDataStandards)
  const [dataIndeed, setDataIndeed] = useState(initialDataStandards)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [fieldForm] = Form.useForm()
  const [currentStandard, setCurrentStandard] = useState(null)
  const [currentStandardIndex, setCurrentStandardIndex] = useState(-1)
  const [type, setType] = useState('')
  const [isEditingField, setIsEditingField] = useState(false)
  const [editingFieldIndex, setEditingFieldIndex] = useState(-1)
  const [isStandardModalVisible, setIsStandardModalVisible] = useState(false)
  const [isVersionModalVisible, setIsVersionModalVisible] = useState(false)
  const [standardForm] = Form.useForm()
  const [versionForm] = Form.useForm()
  const [view, setView] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')

  useEffect(() => {
    // Delay to ensure component is fully rendered
    const timeout = setTimeout(() => {
      const inputElement = document.getElementById(`${searchedColumn}-search-input`)
      if (inputElement) {
        inputElement.select()
      }
    }, 100)

    return () => clearTimeout(timeout)
  }, [searchedColumn])
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          id={`${dataIndex}-search-input`} // Ensure unique id for each input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setSearchedColumn(dataIndex)
      }
    },
  })

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = clearFilters => {
    clearFilters()
    setSearchText('')
  }

  const handleEditStandard = (record, index) => {
    if (!deepEqual(currentStandard, dataIndeed[currentStandardIndex]) && currentStandard !== null && currentStandardIndex !== -1 && currentStandardIndex !== index) {
      message.error("请先保存当前数据标准的更改")
      return
    }
    setCurrentStandard(record)
    setCurrentStandardIndex(index)
    setIsStandardModalVisible(true)
    setView(true)
    standardForm.setFieldsValue(record)
  }

  const handleDeleteStandard = (index) => {
    if (!deepEqual(currentStandard, dataIndeed[currentStandardIndex]) && currentStandard !== null && currentStandardIndex !== -1 && currentStandardIndex !== index) {
      message.error("请先保存当前数据标准的更改")
      return
    }
    const newStandards = [...dataStandards]
    newStandards.splice(index, 1)
    setDataStandards(newStandards)
    setDataIndeed(newStandards)
    setCurrentStandard(null)
    setCurrentStandardIndex(-1)
    message.success('数据标准删除成功')
  }

  const handleViewFields = (record, index) => {
    if (!deepEqual(currentStandard, dataIndeed[currentStandardIndex]) && currentStandard !== null && currentStandardIndex !== -1 && currentStandardIndex !== index) {
      message.error("请先保存当前数据标准的更改")
      return
    }
    setCurrentStandard(record)
    setCurrentStandardIndex(index)
    setView(true)
  }

  const handleStandardModalOk = () => {
    standardForm.validateFields()
      .then(values => {
        const newStandards = [...dataStandards]
        const newStandard = {
          ...currentStandard,
          name: values.name,
          description: values.description,
        }
        newStandards[currentStandardIndex] = newStandard
        setCurrentStandard(newStandard)
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
    setCurrentStandard(newStandard)
    setDataStandards(newStandards)
    message.success('Field deleted successfully')
  }

  const handleChangeType = (value) => {
    fieldForm.setFieldsValue({ length: getFieldLength(value), type: value })
    setType(value)
  }

  const handleSaveVersion = () => {
    versionForm.validateFields()
      .then(values => {
        const newStandard = {
          ...currentStandard,
          version: values.version,
          versionDescription: values.versionDescription,
        }
        const newStandards = [...dataIndeed, newStandard]
        setDataStandards(newStandards)
        setDataIndeed(newStandards)
        setCurrentStandard(null)
        setCurrentStandardIndex(-1)
        setIsVersionModalVisible(false)
        message.success(`成功保存至版本${values.version}`)
      })
      .catch(errorInfo => {
        console.log('Validate Failed:', errorInfo)
      })
  }

  const handleSave = () => {
    setDataIndeed(dataStandards)
    setCurrentStandard(null)
    setCurrentStandardIndex(-1)
    message.success("成功保存至当前版本")
  }

  const handleSave_new = () => {
    setIsVersionModalVisible(true)
    versionForm.setFieldsValue({
      version: currentStandard.version,
      versionDescription: currentStandard.versionDescription,
    })
  }

  const handleCancel = () => {
    confirm({
      title: '确认取消',
      content: '您确定要取消吗？未保存的更改将会丢失。',
      onOk () {
        setDataStandards(dataIndeed)
        setCurrentStandard(null)
        setCurrentStandardIndex(-1)
        setView(false)
      },
    })
  }

  const columns = [
    {
      title: '唯一ID',
      dataIndex: 'uuid',
      key: 'uuid',
      sorter: (a, b) => a.uuid.localeCompare(b.uuid),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '版本号',
      dataIndex: 'version',
      key: 'version',
      sorter: (a, b) => a.version.localeCompare(b.version),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '版本描述',
      dataIndex: 'versionDescription',
      key: 'versionDescription',
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
      <h1>数据标准管理</h1>

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
            rules={[{ required: true, message: '请输入数据标准名称' }]}
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
          <Button icon={<PlusOutlined />} onClick={handleAddField} style={{ marginTop: '5px' }}>
            增加字段
          </Button>
          <Table
            dataSource={currentStandard.fields}
            columns={fieldColumns}
            pagination={false}
            bordered
            rowKey={(record, index) => index.toString()}
            style={{ marginTop: '20px' }}
          />
          <Button icon={<SaveOutlined />} onClick={handleSave} style={{ marginTop: '20px', marginLeft: '10px' }}>
            保存为当前版本
          </Button>

          <Button icon={<SaveOutlined />} onClick={handleSave_new} style={{ marginTop: '20px', marginLeft: '10px' }}>
            保存为新版本
          </Button>

          <Button icon={<DeleteOutlined />} onClick={handleCancel} style={{ marginTop: '20px', marginLeft: '10px' }}>
            取消
          </Button>
        </>
      )}

      <Modal
        title={isEditingField ? "编辑字段" : "增加字段"}
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

      <Modal
        title="保存版本信息"
        visible={isVersionModalVisible}
        onOk={handleSaveVersion}
        onCancel={() => setIsVersionModalVisible(false)}
      >
        <Form form={versionForm} layout="vertical">
          <Form.Item
            name="version"
            label="版本号"
            rules={[{ required: true, message: 'Please enter version number' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="versionDescription"
            label="版本描述"
            rules={[{ required: true, message: 'Please enter version description' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default DataStandardManagementPage
