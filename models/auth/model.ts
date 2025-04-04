import type { Model } from "~/models/interface";
import type { AuthModelInterface, LoginRequestInterface, LoginResponseInterface } from "~/models/auth/interface";
import type { AxiosError } from "axios";

const login = async (
  data: LoginRequestInterface,
  signal: AbortSignal
): Promise<LoginResponseInterface> => {
  try {
    const { $api } = useNuxtApp() as any;
    const response = await $api.post('/api/auth/login', data, { signal });
    
    return {
      data: response.data,
      error: null
    };
  } catch (error) {
    const typedError = error as AxiosError;
    return {
      data: null,
      error: typedError?.response?.data as string || 'Internal server error'
    };
  }
};

const refresh = async (
  data: {
    token: string;
  },
  signal: AbortSignal
): Promise<LoginResponseInterface> => {
  try {
    const { $api } = useNuxtApp() as any;
    const response = await $api.post('/api/auth/refresh-token', data, { signal, skipAuthRefresh: true });

    return {
      data: response.data,
      error: null
    };
  } catch (error) {
    const typedError = error as AxiosError;
    return {
      data: null,
      error: typedError?.response?.data as string || 'Internal server error'
    };
  }
};

export const AuthModel: Model<AuthModelInterface> = {
  login,
  refresh
};
