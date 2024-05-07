'use client'
import './globals.css'
import Script from 'next/script'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { useRouter } from 'next/navigation'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import React from 'react'

import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons'

const { Header, Content, Footer, Sider } = Layout
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}))
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1)
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1
        return {
          key: subKey,
          label: `option${subKey}`,
        }
      }),
    }
  })

export default function RootLayout ({ children }) {
  const router = useRouter()
  const handleMenuClick = ({ item, key, keyPath, domEvent }) => {
  router.push('/dashboard')
}
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  return (
    <html lang="en">
    <body>
    <AntdRegistry>
      <Layout>
        <Script
          async
          src="https://www.googletagservices.com/tag/js/gpt.js"
        />
        <Script id="show-banner">
          {` var googletag = googletag || {}; googletag.cmd = googletag.cmd || [];`}
        </Script>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className="demo-logo"/>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={items1}
            onClick={handleMenuClick}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          />
        </Header>
        <Content
          style={{
            padding: '0 48px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            style={{
              padding: '24px 0',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Sider
              style={{
                background: colorBgContainer,
              }}
              width={200}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{
                  height: '100%',
                }}
                items={items2}
              />
            </Sider>
            <Content
              style={{
                padding: '0 24px',
                minHeight: 280,
              }}
            >

              {children}

            </Content>
          </Layout>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </AntdRegistry>
    </body>
    </html>
  )
}