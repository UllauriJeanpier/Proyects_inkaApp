import axios from 'axios';
import { API_BASE } from '@env';
import * as storage from '@utils/storage';

const API = axios.create({
  baseURL: `${API_BASE}/api`,
});

const api = async ({
  method = 'POST',
  data = {},
  params = {},
  url = '',
  headers = {},
  authorization = false,
}: any) => {
  const session = await storage.getItem('sesion');
  const tempHeaders =
    authorization && session?.token
      ? {
          Authorization: `Bearer ${session?.token}`,
          ...headers,
        }
      : headers;

  return API({ method, url, data, headers: tempHeaders, params });
};

export default api;
