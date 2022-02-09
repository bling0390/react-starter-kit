import { ACCESS_TOKEN } from '../constants';

/**
 * 更新access_token
 * @param token
 * @returns Void
 */
export const updateAccessToken = (token: string) =>
  localStorage.setItem(ACCESS_TOKEN, token);

/**
 * 获取access_token
 * @returns string
 */
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);
