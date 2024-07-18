import {
    CloudOutlined,
    DatabaseFilled,
    DotChartOutlined,
    FileSearchOutlined,
    MergeCellsOutlined,
    MoneyCollectOutlined,
    RobotOutlined, ShareAltOutlined
} from '@ant-design/icons'
import DataModelPage from "../pages/DataModeling/DataModel/DataModelPage";
import ResourceCatalogPage from "../pages/DataModeling/ResourceCatalog/ResourceCatalogPage";
import DataModelDetailPage from "../pages/DataModeling/DataModel/DataModelDetailPage";

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
    }
]

export default routes