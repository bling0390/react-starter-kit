import './index.scss';

import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import ProLayout from '@ant-design/pro-layout';
import { MenuDataItem } from '@ant-design/pro-layout/lib/typings';
import { Avatar, Dropdown, Menu, message } from 'antd';
import React, { useContext, useRef } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import SessionContext from 'src/contexts/session';
import { logout } from 'src/services/user';
import { updateAccessToken } from 'src/utils';

import NotFound from './404';

const Desktop: React.FC = () => {
  const navigate = useNavigate();
  const session = useContext(SessionContext);
  const Constants = useRef<{ menus: MenuDataItem[] }>({
    menus: [
      {
        path: '/',
        name: '首页'
      }
    ]
  });

  /**
   * 用户退出登录
   */
  const userLogout = async () => {
    try {
      await logout();

      // 清除access_token
      updateAccessToken('');

      // 重定向至登录页面
      navigate('/login');
    } catch (e) {
      message.error(String(e));
    }
  };

  const Demo = () => <span>main content here.</span>;

  return (
    <ProLayout
      rightContentRender={() => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="logout">
                <span className="menu-item" onClick={() => userLogout()}>
                  <LoginOutlined />
                  <span className="menu-item-name">退出登录</span>
                </span>
              </Menu.Item>
            </Menu>
          }
        >
          <span className="login-user">
            <Avatar shape="circle" alt="Avatar" icon={<UserOutlined />} />
            <span className="login-user-name">{session?.session?.name}</span>
          </span>
        </Dropdown>
      )}
      collapsed={false}
      title="demo"
      layout="top"
      ErrorBoundary={false}
      menuDataRender={() => Constants.current.menus}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/demo" replace />} />
        <Route path="/demo/*" element={<Demo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ProLayout>
  );
};

export default Desktop;
