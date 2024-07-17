import {
  FilePdfOutlined
} from '@ant-design/icons'
import PDFPage from '../pages/PDFPage'

const routes = [
  {
    path: '/pdf-analysis',
    label: 'PDF解析',
    component: <PDFPage />,
    meta: {
      icon: <FilePdfOutlined />
    },
  }
]

export default routes
