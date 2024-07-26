import React, { useState } from 'react'
import { Button, Layout, Descriptions, Typography, Select } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const { Title } = Typography
const { Option } = Select

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
]

const InterfaceDocPage = () => {
  const [selectedStandard, setSelectedStandard] = useState(null)

  const handleSelectChange = (value) => {
    const selected = initialDataStandards.find(item => item.uuid === value)
    setSelectedStandard(selected)
  }

  const handleDownload = () => {
    if (!selectedStandard) return

    const wb = XLSX.utils.book_new()

    const wsData = [
      ['Field Name', 'Type', 'Nullable', 'Length', 'Description'],
      ...selectedStandard.fields.map(field => [
        field.name,
        field.type,
        field.allowNull ? 'Yes' : 'No',
        field.length || 'N/A',
        field.description
      ])
    ]

    const ws = XLSX.utils.aoa_to_sheet(wsData)
    XLSX.utils.book_append_sheet(wb, ws, selectedStandard.name)

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${selectedStandard.name}.xlsx`)
  }

  return (
    <div>
      <h1>文档生成</h1>
      <div style={{ marginBottom: '20px', maxWidth: '300px' }}>
        <Select
          showSearch
          placeholder="选择一个数据标准"
          optionFilterProp="children"
          onChange={handleSelectChange}
          style={{ width: '100%' }}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {initialDataStandards.map(item => (
            <Option key={item.uuid} value={item.uuid}>{item.name}</Option>
          ))}
        </Select>
      </div>
      {selectedStandard ? (
        <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <Title level={2}>{selectedStandard.name}</Title>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Description">{selectedStandard.description}</Descriptions.Item>
            <Descriptions.Item label="Version">{selectedStandard.version}</Descriptions.Item>
            <Descriptions.Item label="Version Description">{selectedStandard.versionDescription}</Descriptions.Item>
            {selectedStandard.fields.map(field => (
              <Descriptions.Item key={field.name} label={field.name}>
                {field.type} - {field.allowNull ? 'Nullable' : 'Not Nullable'} - {field.length || 'N/A'} - {field.description}
              </Descriptions.Item>
            ))}
          </Descriptions>
          <Button type="primary" icon={<DownloadOutlined />} onClick={handleDownload} style={{ marginTop: '16px' }}>
            生成描述文档
          </Button>
        </div>
      ) : (
        null
      )}
    </div>
  )
}


export default InterfaceDocPage
