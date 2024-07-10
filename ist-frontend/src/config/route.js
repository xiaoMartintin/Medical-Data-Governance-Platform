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
        meta: {
          icon: <FileTextOutlined />
        }
      }
    ],
  },
  {
    path: '/pdf-analysis',
    label: 'PDF解析',
    component: <PDFPage />,
    meta: {
      icon: <FilePdfOutlined />
    },
    // children: [
    //   {
    //     path: '/text',
    //     component: <PDFPage />,
    //     label: '文本解析',
    //     meta: {
    //       icon: <MoneyCollectOutlined />
    //     }
    //   },
    //   {
    //     path: '/picture',
    //     //component: <DataMapPage />,
    //     label: '图片OCR解析',
    //     meta: {
    //       icon: <ShareAltOutlined />
    //     }
    //   },
    //   {
    //     path: '/edit',
    //     //component: <ModelSimilarityPage />,
    //     label: '解析结果编辑与确认',
    //     meta: {
    //       icon: <FileSearchOutlined />
    //     }
    //   },
    //   {
    //     path: '/multi',
    //     //component: <LLMChatPage />,
    //     label: 'PDF批量解析',
    //     meta: {
    //       icon: <RobotOutlined />
    //     }
    //   }
    // ]
  }
]

export default routes
