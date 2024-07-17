import {
  FileAddOutlined,
  MergeCellsOutlined,
  FilePdfOutlined,
  SettingOutlined,
  BranchesOutlined,
  FileTextOutlined
} from '@ant-design/icons'
import PDFPage from '../pages/PDFPage'
import DataStandardPage from '../pages/DatastandardPage'
import DataStandardManagementPage from '../pages/DataStandardManagementPage'
import InterfaceDocPage from '../pages/InterfaceDocPage'

const routes = [
  {
    path: '/data-norm-define',
    label: '数据标准定义',
    meta: {
      icon: <MergeCellsOutlined />
    },
    children: [
      {
        path: '/human',
        component: <DataStandardPage />,
        label: '数据标准手工定义',
        meta: {
          icon: <FileAddOutlined />
        }
      },
      {
        path: '/maintain',
        component: <DataStandardManagementPage />,
        label: '数据标准维护',
        meta: {
          icon: <SettingOutlined />
        }
      },
      {
        path: '/document',
        label: '接口文档生成',
        component: <InterfaceDocPage />,
        meta: {
          icon: <FileTextOutlined />
        }
      }
    ],
  },
]

export default routes
