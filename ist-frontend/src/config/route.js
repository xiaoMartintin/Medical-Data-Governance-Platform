import {
  CloudOutlined,
  DatabaseFilled,
  DotChartOutlined,
  FileSearchOutlined,
  MergeCellsOutlined,
  MoneyCollectOutlined,
  RobotOutlined, ShareAltOutlined
} from '@ant-design/icons'

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
        //component: <DataModelPage/>,
        label: '数据标准手工定义',
        meta: {
          icon: <DatabaseFilled />
        }
      },
      {
        path: '/vision',
        //component: <DataModelDetailPage/>,
        label: '数据标准版本管理',
        meta: {
          icon: <DatabaseFilled />
        }
      },
      {
        path: '/maintain',
        //component: <DataSourcePage/>,
        label: '数据标准维护',
        meta: {
          icon: <DotChartOutlined />
        }
      },
      {
        path: '/document',
        label: '接口文档生成',
        meta: {
          icon: <DatabaseFilled />
        }
      }
    ],
  },
  {
    path: '/pdf-analysis',
    label: 'PDF解析',
    meta: {
      icon: <CloudOutlined />
    },
    children: [
      {
        path: '/text',
        //component: <DataAssetPage />,
        label: '文本解析',
        meta: {
          icon: <MoneyCollectOutlined />
        }
      },
      {
        path: '/picture',
        //component: <DataMapPage />,
        label: '图片OCR解析',
        meta: {
          icon: <ShareAltOutlined />
        }
      },
      {
        path: '/edit',
        //component: <ModelSimilarityPage />,
        label: '解析结果编辑与确认',
        meta: {
          icon: <FileSearchOutlined />
        }
      },
      {
        path: '/multi',
        //component: <LLMChatPage />,
        label: 'PDF批量解析',
        meta: {
          icon: <RobotOutlined />
        }
      }
    ]
  }
]

export default routes
