import {
  CloudOutlined,
  DatabaseFilled,
  DotChartOutlined,
  FileSearchOutlined,
  MergeCellsOutlined,
  MoneyCollectOutlined,
  RobotOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  SwapOutlined,
  ScheduleOutlined,
  SettingOutlined
} from '@ant-design/icons'

import DataExtractionStrategyManagement from '../components/DataExtractionStrategyManagement'
import DataSourceManagement from '../components/DataSourceManagement'
import DataExtractionSchedulingManagement from '../components/DataExtractionSchedulingManagement'
import MappingRuleManagement from '../components/MappingRuleManagement'


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
  },
  {
    path: '/data-extraction',
    label: '数据抽取',
    meta: {
      icon: <DownloadOutlined />
    },
    children: [
      {
        path: '/source-connection',
        component: <DataSourceManagement />,
        label: '数据源管理',
        meta: {
          icon: <DatabaseFilled />
        }
      },
      {
        path: '/strategy-management',
        component: <DataExtractionStrategyManagement />,
        label: '抽取策略管理',
        meta: {
          icon: <SettingOutlined />
        }
      },
      {
        path: '/schedule-management',
        component: <DataExtractionSchedulingManagement />,
        label: '抽取调度管理',
        meta: {
          icon: <ScheduleOutlined />
        }
      },
      {
        path: '/mapping-management',
        component: <MappingRuleManagement />,
        label: '映射规则管理',
        meta:{
          icon: <SwapOutlined />
        }
      }
    ]
  }
]

export default routes
