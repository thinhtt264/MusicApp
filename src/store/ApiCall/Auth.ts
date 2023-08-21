import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginFields, LoginResponseFields } from 'src/models/Auth';
import { NetWorkService } from 'src/networking/RestFulApi';
import { endpoints } from 'src/networking/endpoint';

export const authLogin = createAsyncThunk<LoginResponseFields, LoginFields>(
  'auth/login',
  async (fields, { rejectWithValue }) => {
    try {
      const response =
        await NetWorkService.PostFormUrlencoded<LoginResponseFields>({
          url: endpoints.auth.login,
          body: fields,
          baseUrl: 'https://accounts.spotify.com/',
        });
      console.log(response);
      return response;
    } catch (error: any) {
        console.log(error);
        
      return rejectWithValue(error.data);
    }
  },
);
