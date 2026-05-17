import axios from 'axios';
import { toast } from 'sonner';
import { getValidToken } from './keycloak';
import { ENV } from '../config/env';

export const apiClient = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const publicApiClient = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor để đính kèm token tự động
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getValidToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor để xử lý lỗi chung
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    if (status === 401) {
      toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
    } else if (status === 403) {
      toast.error('Bạn không có quyền thực hiện hành động này.');
    } else if (status >= 500) {
      toast.error('Lỗi hệ thống. Vui lòng thử lại sau.');
    } else {
      toast.error(message || 'Đã có lỗi xảy ra.');
    }

    return Promise.reject(error);
  }
);

