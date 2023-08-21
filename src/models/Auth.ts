export interface ClientFields {
  client_id: string;
  client_secret: string;
}

export interface RefreshTokenFields extends ClientFields {
  refresh_token: string;
  grant_type: string;
}

export interface RefreshTokenResponseFields {
  token_type: string;
  expires_in: number;
  access_token: string | null;
  refresh_token: string | null;
}

export interface AuthState {
  isLogin: boolean;
  isRemember: boolean;
  user_data: any;
  access_token: string | null;
}
