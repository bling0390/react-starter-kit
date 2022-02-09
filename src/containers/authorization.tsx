import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SessionContext from 'src/contexts/session';

import { LOGIN_PAGE_URL } from '../constants';
import { getSession } from '../services/user';
import Session from '../types/session';
import { getAccessToken } from '../utils';

const Authorization = (props: PropsWithChildren<any>) => {
  const [session, setSession] = useState<Session>();
  const navigate = useNavigate();

  /**
   * 尝试通过access_token恢复当前会话
   */
  const checkSession = () => {
    const token = getAccessToken();

    // token不存在的情况下直接重定向为登录模块
    if (!token) navigate(LOGIN_PAGE_URL);

    // token存在但不存在会话
    if (token && !session) getCurrentSession();
  };

  /**
   * 获取当前登录会话
   */
  const getCurrentSession = async () => {
    try {
      const { data } = await getSession();

      updateSession(data);
    } catch (e) {
      navigate(LOGIN_PAGE_URL);
    }
  };

  /**
   * 更新session
   * @params session
   */
  const updateSession = (session: Session) => setSession(session);

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <SessionContext.Provider value={{ session, updateSession }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export default Authorization;
