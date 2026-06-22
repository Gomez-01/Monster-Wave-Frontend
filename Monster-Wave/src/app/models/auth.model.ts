export interface LoginCredentials {
  username: string;
  password: string;
}
 
export interface RegisterPayload {
  username: string;
  password: string;
}
 
export interface AuthTokens {
  access: string;
  refresh: string;
}
 
export interface DecodedToken {
  user_id: number;
  exp: number;
  iat: number;
  token_type: string;
}
 