export interface AuthTokenResponse {
  accessToken: string;
}

export interface AuthUser {
  id: string;
  email?: string;
  name?: string;
  role?: string;
  roles?: string[];
}
