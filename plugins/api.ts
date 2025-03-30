import axios from "axios";

const getAuthorizationHeader = async (): Promise<string> => {
  const token = await getJwtToken();
  if (!token) {
    return "";
  }

  return `Bearer ${token}`;
};

export default defineNuxtPlugin(() => {
  const { apiBaseUrl: baseURL } = useAppConfig();

  const api = axios.create({
    baseURL,
  });

  api.interceptors.request.use(
    async (config) => {
      config.headers.Authorization = await getAuthorizationHeader();
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      api,
    },
  };
});
