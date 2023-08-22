import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthState } from 'src/models/Auth';

const initialState: AuthState = {
  isLogin: false,
  isRemember: false,
  access_token: null,
  user_data: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onSetLogin: (state: AuthState, { payload }) => {
      state.isLogin = payload;
    },
    onSetUserData: (
      state: AuthState,
      { payload }: PayloadAction<AuthState['user_data']>,
    ) => {
      state.user_data = payload;
    },
    onRemember: (state: AuthState) => {
      state.isRemember = true;      
    },
    onLogout: (state: AuthState) => {
      state.isLogin = false;
      state.isRemember = false;
    },
  },
  extraReducers: builder => {},
});
export const { reducer: authReducer, actions: authActions } = authSlice;
