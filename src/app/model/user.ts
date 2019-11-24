export interface UserDetails {
    _id: string;
    email: string;
    name: string;
    exp: number;
    iat: number;
  }

export interface TokenResponse {
    token: string;
    user: object;
  }

export interface TokenPayload {
    email: string;
    password: string;
    name?: string;
    role?: string;
  }
