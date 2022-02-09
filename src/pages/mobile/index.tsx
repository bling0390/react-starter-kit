import './index.scss';

import { Result, TabBar } from 'antd-mobile';
import { UnorderedListOutline, UserOutline } from 'antd-mobile-icons';
import React, { useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';

import Self from './self';

const Mobile: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tabBarActiveKey, setTabBarActiveKey] = useState<string>(
    `/${location.pathname.split('/')[1] || 'demo'}`
  );

  const Demo = () => <span>main content here.</span>;

  return (
    <main className="mobile-main">
      <section className="mobile-content">
        <Routes>
          <Route path="/" element={<Navigate to="/demo" replace />} />
          <Route path="/demo/*" element={<Demo />} />
          <Route path="/self" element={<Self />} />
          <Route
            path="*"
            element={
              <Result
                status="info"
                title="Sorry, the page you visited does not exist."
              />
            }
          />
        </Routes>
      </section>
      <TabBar
        className="mobile-bottom-nav"
        activeKey={tabBarActiveKey}
        onChange={(value: string) => {
          setTabBarActiveKey(value);
          navigate(value);
        }}
      >
        <TabBar.Item key="/demo" icon={<UnorderedListOutline />} title="主页" />
        <TabBar.Item key="/self" icon={<UserOutline />} title="我的" />
      </TabBar>
    </main>
  );
};

export default Mobile;
