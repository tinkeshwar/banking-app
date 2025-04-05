export interface AuthModelInterface {
  login(data: LoginRequestInterface, signal: AbortSignal): Promise<LoginResponseInterface>;
  refresh(data: {
    token: string;
  }, signal: AbortSignal): Promise<LoginResponseInterface>;
}

export interface LoginRequestInterface { 
  username: string;
  password: string;
  user_type: string;
}

export interface LoginResponseInterface {
  data: {
    access_token: string,
    refresh_token: string,
    user: Record<string, string>
  } | null,
  error: string | null
}