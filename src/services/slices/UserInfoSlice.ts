import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { registerNewUser, loginExistingUser } from '../component-api';
import { getUserApi, logoutApi, updateUserApi } from '@api';
import { deleteCookie, getCookie } from '../../utils/cookie';

export type TUserState = {
  isAuthChecked: boolean;
  isLoggedIn: boolean;
  user: TUser | null;
  loginError: null | string;
  isLoginRequest: boolean;
};

const initialState: TUserState = {
  isAuthChecked: false,
  isLoggedIn: false,
  user: null,
  loginError: null,
  isLoginRequest: false
};

export const registerUser = createAsyncThunk('user/register', registerNewUser);
export const loginUser = createAsyncThunk('user/login', loginExistingUser);
export const userApi = createAsyncThunk('user/fetch', getUserApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.clear();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    markAuthChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userApi.pending, (state) => {
        state.isLoginRequest = true;
      })
      .addCase(userApi.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isLoginRequest = false;
      })
      .addCase(userApi.rejected, (state, action) => {
        state.loginError = action.error.message || 'Failed to fetch user data';
        state.isAuthChecked = true;
        state.isLoginRequest = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.isLoginRequest = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.isLoginRequest = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectLoginError: (state) => state.loginError,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectIsLoginRequest: (state) => state.isLoginRequest
  }
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(userApi()).finally(() => {
        dispatch(markAuthChecked());
      });
    } else {
      dispatch(markAuthChecked());
    }
  }
);

export const { markAuthChecked } = userSlice.actions;
export const {
  selectUser,
  selectIsLoggedIn,
  selectLoginError,
  selectIsAuthChecked,
  selectIsLoginRequest
} = userSlice.selectors;
