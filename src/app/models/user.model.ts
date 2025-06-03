export interface User {
  id?: number;
  userName: string;
  passWord?: string;
  email: string;
  fullName?: string;
  role?: string;
}

export interface LoginRequest {
  userName: string;
  passWord: string;
} 
export interface LoginResult {
  userName: string;
  token: string;
  authenticated: boolean;
}

export interface LoginResponse {
  code: number;
  result: LoginResult;
}