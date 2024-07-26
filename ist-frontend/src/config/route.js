import {
  FileAddOutlined,
  MergeCellsOutlined,
  FilePdfOutlined,
  SettingOutlined,
  BranchesOutlined,
  FileTextOutlined,
  MoneyCollectOutlined,
  RobotOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  SwapOutlined,
  ScheduleOutlined,
  DatabaseFilled

} from '@ant-design/icons'
import DataStandardPage from '../pages/DatastandardPage'
import DataStandardManagementPage from '../pages/DataStandardManagementPage'
import InterfaceDocPage from '../pages/InterfaceDocPage'

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
        label: '文档生成',
        component: <InterfaceDocPage />,
        meta: {
          icon: <FileTextOutlined />
        }
      }
    ],
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
        meta: {
          icon: <SwapOutlined />
        }
      }
    ]
  }
]

export default routes
