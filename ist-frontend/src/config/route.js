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
  MoneyCollectOutlined, RobotOutlined, SearchOutlined, InsuranceOutlined
} from '@ant-design/icons'
import DataAssetPage from "../pages/data-asset/DataAssetPage";
import DataMapPage from "../pages/data-map/DataMapPage";
import DataStatisticsPage from "../pages/data-statistics/DataStatisticsPage";
import DataDictionaryVisualizePage from "../pages/data-dictionary/DataDictionaryVisualizePage";
import DataDictionarySearchPage from "../pages/data-dictionary/DataDictionarySearchPage";
import DataDictionaryManagePage from "../pages/data-dictionary/DataDictionaryManagePage";
import ResourceCatalogPage from "../pages/data-model/ResourceCatalog/ResourceCatalogPage";
import DataModelDetailPage from "../pages/data-model/DataModel/DataModelDetailPage";
import DataModelPage from "../pages/data-model/DataModel/DataModelPage";
import DataStatisticsDiyPage from "../pages/data-statistics/DataStatisticsDiyPage";
import DataMaskingPage from "../pages/data-masking/DataMaskingPage";

const routes = [
    {
    path: '/data-modeling',
    label: '数据建模',
    meta: {
      icon: <CloudOutlined/>
    },
    children: [
      {
        path: '/resource-catalog',
        component: <ResourceCatalogPage/>,
        label: '资源目录管理',
        meta: {
          icon: <MoneyCollectOutlined/>
        }
      },
      {
        path: '/data-model',
        component: <DataModelPage/>,
        label: '数据模型管理',
        meta: {
          icon: <ShareAltOutlined/>
        }
      },
      {
        path: '/data-model/:modelId',
        component: <DataModelDetailPage/>,
        label: '数据模型详情',
        meta: {
          hidden: true
        }
      },
    ]
  },
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
        path: '/masking',
        component: <DataMaskingPage/>,
        label: '数据脱敏',
        meta: {
          icon: <InsuranceOutlined />
        }
      },
      {
        path: '/statistic',
        component: <DataStatisticsPage/>,
        label: '资产统计',
        meta: {
          icon: <LineChartOutlined />
        }
      },
      {
        path: '/diy',
        component: <DataStatisticsDiyPage/>,
        label: '自定义统计',
        meta: {
          icon: <DotChartOutlined/>
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
