import React, { useState } from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Layout, Button, theme, ConfigProvider } from 'antd'
import Crumb from './components/Crumb'
import Router from './components/Routers'
import Sidebar from './components/Sidebar'
import { BrowserRouter } from 'react-router-dom'
import zhCN from 'antd/es/locale/zh_CN'

const { Header, Sider, Content } = Layout
const App = () => {
    const [collapsed, setCollapsed] = useState(false)
    const { token: { colorBgContainer } } = theme.useToken()
    return (
        <BrowserRouter>
            <ConfigProvider locale={zhCN}>
                <Layout>
                    <Sider trigger={null} collapsible collapsed={collapsed}>
                        <Sidebar />
                    </Sider>
                    <Layout style={{ height: '100vh' }}>
                        <Header
                            style={{
                                padding: 0,
                                background: colorBgContainer,
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                            <Button
                                type='text'
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }} />
                            <Crumb />
                        </Header>
                        <Content
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                borderRadius: 15,
                                background: colorBgContainer,
                                overflow: 'auto',
                            }}>
                            <Router />
                        </Content>
                    </Layout>
                </Layout>
            </ConfigProvider>
        </BrowserRouter>
    )
}

export default App
