import 'antd/dist/antd.css';
import '@ant-design/pro-form/dist/form.css';
import '@ant-design/pro-table/dist/table.css';
import '@ant-design/pro-layout/dist/layout.css';
import './App.scss';

import React from 'react';
import MediaQuery from 'react-responsive';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Desktop from 'src/pages/desktop';
import Mobile from 'src/pages/mobile';

import Authorization from './containers/authorization';
import DesktopLogin from './pages/desktop/login';
import MobileLogin from './pages/mobile/login';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Authorization>
        <MediaQuery query="(min-device-width: 1224px)">
          <Routes>
            <Route path="/login" element={<DesktopLogin />} />
            <Route path="*" element={<Desktop />} />
          </Routes>
        </MediaQuery>
        <MediaQuery query="(max-device-width: 1224px)">
          <Routes>
            <Route path="/login" element={<MobileLogin />} />
            <Route path="*" element={<Mobile />} />
          </Routes>
        </MediaQuery>
      </Authorization>
    </BrowserRouter>
  );
};

export default App;
