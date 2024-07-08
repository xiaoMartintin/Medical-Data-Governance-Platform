import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import routes from '../config/route'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.svg'
import '../style/Sidebar.css'

const Sidebar = () => {
  // 根据路由生成菜单条目，处理Children
  const generateMenuItems = (route, parentPath = '') => {
    return route.map((item) => {
      const path = parentPath + item.path
      if (item.children) {
        return {
          label: item.label,
          key: path,
          icon: item.meta.icon,
          children: generateMenuItems(item.children, path)
        }
      } else if (!item.meta.hidden) {
        return {
          label: <Link to={path}>{item.label}</Link>,
          key: path,
          icon: item.meta.icon,
        }
      }
      return null
    }).filter(item => item)
  }

  const location = useLocation()
  const items = generateMenuItems(routes)
  const [openKeys, setOpenKeys] = useState([])
  const [initialPathname] = useState(location.pathname)

  useEffect(() => {
    const pathSnippets = initialPathname.split('/').filter(i => i)
    const newOpenKeys = pathSnippets.map((_, index, arr) => `/${arr.slice(0, index + 1).join('/')}`)
    setOpenKeys(newOpenKeys)
  }, [initialPathname])

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12
      }}>
        <img className='sider-logo' src={logo} alt='Logo' />
        <span className="sider-logo-text">医疗数据平台</span>
      </div>
      <Menu
        theme='dark'
        mode='inline'
        selectedKeys={[location.pathname]}
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
        items={items}
      >
      </Menu>
    </>
  )
}
export default Sidebar
