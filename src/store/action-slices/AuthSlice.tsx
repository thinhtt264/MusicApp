import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthState } from 'src/models/Auth';
import { authRequestToken } from '../action-thunk';

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
    onSetToken: (state: AuthState, { payload }) => {
      state.access_token = payload
    }
  },
  extraReducers: builder => {
    builder.addCase(authRequestToken.fulfilled, (state, action) => {
      state.access_token = action.payload.access_token;
    });
  },
});
export const { reducer: authReducer, actions: authActions } = authSlice;
