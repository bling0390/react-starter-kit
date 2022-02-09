import { AxiosResponse } from 'axios';
import Session from 'src/types/session';
import request from 'src/utils/request';

/**
 * 用户登录
 * @param data
 * @returns Promise<AxiosResponse<Session>>
 */
export const login = (data: {
  mobile: string;
  password: string;
}): Promise<AxiosResponse<Session>> => request.post('/session', data);

/**
 * 获取用户登录详情
 * @returns Promise<AxiosResponse<Session>>
 */
export const getSession = (): Promise<AxiosResponse<Session>> =>
  request.get('/session');

/**
 * 退出登录
 */
export const logout = (): Promise<AxiosResponse> => request.delete('/session');

/**
 * 用户注册
 * @param data
 * @returns Promise<AxiosResponse<User>>
 */
export const registry = (data: {
  name: string;
  mobile: string;
  password: string;
}): Promise<AxiosResponse<Session>> => request.post('/users', data);
