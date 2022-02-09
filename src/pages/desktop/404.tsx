import { Button, Result } from 'antd';
import { createBrowserHistory } from 'history';
import React from 'react';

const NoFoundPage: React.FC = () => {
  const history = createBrowserHistory();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          Back Home
        </Button>
      }
    />
  );
};

export default NoFoundPage;
