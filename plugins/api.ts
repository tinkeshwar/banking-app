import axios, { type InternalAxiosRequestConfig } from "axios";
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  skipAuthRefresh?: boolean;
}

export default defineNuxtPlugin(() => {
  const { apiBaseUrl: baseURL } = useAppConfig();
  const authStore = useAuthStore();
  const api = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });

  let isRefreshing = false;
  let refreshSubscribers: ((token: string) => void)[] = [];

  api.interceptors.request.use(
    async (config: CustomAxiosRequestConfig) => {
      if (authStore.accessToken && !config.skipAuthRefresh && config.headers) {
        config.headers.Authorization =  `Bearer ${authStore.accessToken}`;
      }
      return config;
    },
    (error) => {return Promise.reject(error);}
  );

  api.interceptors.response.use((response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.skipAuthRefresh) {
        if (isRefreshing) {
          return new Promise((resolve) => {
            refreshSubscribers.push((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newToken = await authStore.refresh();
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          refreshSubscribers.forEach(callback => callback(newToken));
          refreshSubscribers = [];
          return api(originalRequest);
        } catch (refreshError) {
          authStore.resetStore();
          refreshSubscribers = [];
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      api,
    },
  };
});
