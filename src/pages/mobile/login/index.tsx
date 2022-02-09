import './index.scss';

import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React from 'react';
import LoginForm from 'src/components/loginForm';

const MobileLogin: React.FC = () => (
  <div className="mobile-login">
    <div>
      <Avatar
        className="mobile-login-avatar"
        size={96}
        shape="circle"
        alt="avatar"
        icon={<UserOutlined size={64} />}
      />
    </div>
    <div>
      <LoginForm className="mobile-login-form" />
    </div>
  </div>
);

export default MobileLogin;
