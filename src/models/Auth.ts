export interface ClientFields {
  client_id: string;
  client_secret: string;
}

export interface AuthState {
  isLogin: boolean;
  isRemember: boolean;
  user_data: any;
  access_token: string | null;
}

// Login
export interface LoginFields extends ClientFields {
  grant_type: string;
}

export interface LoginResponseFields {
  token_type: string;
  expires_in: number;
  access_token: string;
}
