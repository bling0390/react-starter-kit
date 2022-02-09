import './index.scss';

import React from 'react';
import LoginForm from 'src/components/loginForm';

const DesktopLogin: React.FC = () => (
  <div className="desktop-login">
    <div className="desktop-login-right">
      <LoginForm className="desktop-login-form" />
    </div>
  </div>
);

export default DesktopLogin;
