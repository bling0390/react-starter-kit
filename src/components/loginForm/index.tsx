import { Button, Col, Form, Input, message, Row, Typography } from 'antd';
import md5 from 'js-md5';
import { parse } from 'query-string';
import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useState
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SessionContext from 'src/contexts/session';
import { login, registry } from 'src/services/user';
import { updateAccessToken } from 'src/utils';

interface LoginFormProps {
  className?: string;
}

interface LoginParams {
  name: string;
  mobile: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = (
  props: PropsWithChildren<LoginFormProps>
) => {
  const session = useContext(SessionContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isRegistryMode, setIsRegistryMode] = useState<boolean>(false);
  const [loginFormInstance] = Form.useForm<LoginParams>();

  const onFinished = useCallback(
    async (form: LoginParams) => {
      try {
        if (isRegistryMode) await registry(form);

        const { data } = await login({
          mobile: form.mobile,
          password: md5(form.password)
        });

        // 设置access_token
        updateAccessToken(data.token);

        // 更新context
        session?.updateSession?.(data);

        navigate(`${parse(location.search).from || '/'}`);
      } catch (e: any) {
        let error = String(e);

        if (e?.response?.status === 500) {
          switch (e?.response?.data?.code) {
            case 'userMobileDuplication':
              error = '已存在相同手机号';
              break;
            case 'userNameDuplication':
              error = '已存在相同用户名';
              break;
            case 'loginNameOrPassword':
              error = '用户名或密码错误，请重新输入';
              break;
            default:
              break;
          }
        }

        message.error(error);
      }
    },
    [isRegistryMode]
  );

  return (
    <Form<LoginParams>
      onFinish={onFinished}
      className={props.className}
      form={loginFormInstance}
    >
      <Row gutter={[30, 30]} align="middle">
        <Col span="9" offset="3">
          <h1 className={`${props.className}-h1`}>
            用户{isRegistryMode ? '注册' : '登录'}
          </h1>
        </Col>
        <Col span="6" offset="3">
          <Typography.Text
            style={{ cursor: 'pointer' }}
            underline
            onClick={() => {
              setIsRegistryMode(!isRegistryMode);
              loginFormInstance.resetFields();
            }}
          >
            {isRegistryMode ? '返回登录' : '前往注册'}
          </Typography.Text>
        </Col>
        {isRegistryMode && (
          <Col span="18" offset="3">
            <Form.Item
              required
              name="name"
              rules={[
                {
                  validator: (rule, value) => {
                    if (!value) return Promise.reject('请输入用户名！');

                    if (value.length > 64)
                      return Promise.reject('用户名不能超过64个字符！');

                    return Promise.resolve();
                  }
                }
              ]}
            >
              <Input
                className={`${props.className}-input`}
                placeholder="请输入用户名"
                autoComplete="off"
                size="large"
              />
            </Form.Item>
          </Col>
        )}

        <Col span="18" offset="3">
          <Form.Item
            name="mobile"
            rules={[
              {
                validator: (rule, value) => {
                  if (!value) return Promise.reject('请输入手机号！');

                  if (/\D/.test(value))
                    return Promise.reject('手机号只能为纯数字！');

                  if (value.length !== 11)
                    return Promise.reject('手机号长度为11位！');

                  return Promise.resolve();
                }
              }
            ]}
          >
            <Input
              autoFocus
              className={`${props.className}-input`}
              placeholder="请输入手机号"
              autoComplete="off"
              size="large"
            />
          </Form.Item>
        </Col>
        <Col span="18" offset="3">
          <Form.Item
            required
            name="password"
            rules={[
              {
                validator: (rule, value) => {
                  if (!value) return Promise.reject('请输入密码！');

                  if (value.length < 4)
                    return Promise.reject('密码长度不能少于4位！');

                  if (value.length > 30)
                    return Promise.reject('密码长度不能超过30位！');

                  return Promise.resolve();
                }
              }
            ]}
          >
            <Input
              className={`${props.className}-input`}
              type="password"
              placeholder="请输入密码"
              autoComplete="off"
              size="large"
            />
          </Form.Item>
        </Col>
        <Col span="18" offset="3">
          <Form.Item>
            <Button
              block
              htmlType="submit"
              type="primary"
              className={`${props.className}-submit`}
              size="large"
            >
              {isRegistryMode ? '注 册' : '登 录'}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default LoginForm;
