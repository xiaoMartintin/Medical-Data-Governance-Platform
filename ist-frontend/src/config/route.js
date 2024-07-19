import {
  CloudOutlined,
  DatabaseFilled,
  DotChartOutlined,
  FileSearchOutlined,
  GlobalOutlined, LineChartOutlined,
  MergeCellsOutlined,
  ShareAltOutlined,
  BookOutlined,
  EyeOutlined, EditOutlined,
  MoneyCollectOutlined, RobotOutlined, SearchOutlined
} from '@ant-design/icons'
import DataAssetPage from "../pages/data-asset/DataAssetPage";
import DataMapPage from "../pages/data-map/DataMapPage";
import DataStatisticsPage from "../pages/data-statistics/DataStatisticsPage";
import DataDictionaryVisualizePage from "../pages/data-dictionary/DataDictionaryVisualizePage";
import DataDictionarySearchPage from "../pages/data-dictionary/DataDictionarySearchPage";
import DataDictionaryManagePage from "../pages/data-dictionary/DataDictionaryManagePage";

const routes = [
  {
    path: '/data-asset-management',
    label: '数据资产管理',
    meta: {
      icon: <MoneyCollectOutlined/>
    },
    children: [
      {
        path: '/overall',
        component: <DataAssetPage/>,
        label: '资产全景',
        meta: {
          icon: <GlobalOutlined />
        }
      },
      /*{
        path: '/query',
        // component: <DataMapPage/>,
        label: '资产查询',
        meta: {
          icon: <SearchOutlined />
        }
      },
      {
        path: '/maintain',
        // component: <DataMapPage/>,
        label: '数据资产维护',
        meta: {
          icon: <MonitorOutlined />
        }
      },*/
      {
        path: '/map',
        component: <DataMapPage/>,
        label: '资产地图',
        meta: {
          icon: <ShareAltOutlined/>
        }
      },
      {
        path: '/statistic',
        component: <DataStatisticsPage/>,
        label: '资产统计',
        meta: {
          icon: <LineChartOutlined />
        }
      }
    ]
  },
  {
    path: '/data-dictionary',
    label: '数据字典管理',
    meta: {
      icon: <BookOutlined />
    },
    children: [
      {
        path: '/manage',
        component: <DataDictionaryManagePage />,
        label: '管理维护',
        meta: {
          icon: <EditOutlined />
        }
      },
      {
        path: '/search',
        component: <DataDictionarySearchPage />,
        label: '检索查询',
        meta: {
          icon: <SearchOutlined />
        }
      },
      {
        path: '/visualize',
        component: <DataDictionaryVisualizePage />,
        label: '可视化',
        meta: {
          icon: <EyeOutlined />
        }
      },
    ]
  }
]

export default routes
