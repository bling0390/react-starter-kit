import './index.scss';

import { List, Toast } from 'antd-mobile';
import { TravelOutline, UserOutline } from 'antd-mobile-icons';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SessionContext from 'src/contexts/session';
import { logout } from 'src/services/user';
import { updateAccessToken } from 'src/utils';

const MobileSelf: React.FC = () => {
  const navigate = useNavigate();
  const session = useContext(SessionContext);

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
      Toast.show({
        icon: 'fail',
        content: String(e)
      });
    }
  };

  return (
    <div className="self-container">
      <div className="self-info">
        <span className="self-avatar">
          <UserOutline fontSize={64} />
        </span>
        <span className="self-name">你好，{session?.session?.name}</span>
      </div>

      <List header="会话">
        <List.Item
          prefix={<TravelOutline fontSize={24} />}
          onClick={() => userLogout()}
        >
          退出登录
        </List.Item>
      </List>
    </div>
  );
};

export default MobileSelf;
