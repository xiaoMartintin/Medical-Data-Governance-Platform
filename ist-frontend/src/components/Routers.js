import { Routes, Route } from 'react-router-dom'
import routes from '../config/route'

const Router = () => {
  // 根据路由生成路由项，处理Children
  const generateRoutes = (route, parentPath = '') => {
    return route.map(item => {
      const path = parentPath + item.path
      if (item.children && item.children.length > 0) {
        return generateRoutes(item.children, path)
      } else {
        return <Route key={item.path} path={path} element={item.component} />
      }
    })
  }

  const routeItems = generateRoutes(routes)

  return (
    <Routes>
      {routeItems}
    </Routes>
  )
}

export default Router
