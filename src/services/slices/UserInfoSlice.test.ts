import {
  loginUser,
  logoutUser,
  markAuthChecked,
  registerUser,
  TUserState,
  updateUser,
  userApi,
  userSlice
} from './UserInfoSlice';

import { TUser } from '@utils-types';

describe('userSlice', () => {
  const initialState: TUserState = {
    isAuthChecked: false,
    isLoggedIn: false,
    user: null,
    loginError: null,
    isLoginRequest: false
  };

  const mockUser: TUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  // Тест для начального состояния
  it('should handle initial state', () => {
    expect(userSlice.reducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  // Тест для синхронного действия markAuthChecked
  it('should handle markAuthChecked', () => {
    const action = markAuthChecked();
    const state = userSlice.reducer(initialState, action);
    expect(state.isAuthChecked).toEqual(true);
  });

  // Тесты для состояний при запросе данных пользователя
  it('should handle userApi.pending', () => {
    const action = { type: userApi.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoginRequest: true
    });
  });

  it('should handle userApi.fulfilled', () => {
    const action = {
      type: userApi.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoggedIn: true,
      user: mockUser,
      isAuthChecked: true,
      isLoginRequest: false
    });
  });

  it('should handle userApi.rejected', () => {
    const action = {
      type: userApi.rejected.type,
      error: { message: 'Failed to fetch user data' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loginError: 'Failed to fetch user data',
      isAuthChecked: true,
      isLoginRequest: false
    });
  });

  // Тест для состояния fulfilled при успешной регистрации
  it('should handle registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoggedIn: true,
      user: mockUser,
      isLoginRequest: false
    });
  });

  // Тест для состояния fulfilled при успешном входе
  it('should handle loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoggedIn: true,
      user: mockUser,
      isLoginRequest: false
    });
  });

  // Тест для состояния fulfilled при успешном выходе
  it('should handle logoutUser.fulfilled', () => {
    const stateWithUser = {
      ...initialState,
      isLoggedIn: true,
      user: mockUser
    };
    const action = { type: logoutUser.fulfilled.type };
    const state = userSlice.reducer(stateWithUser, action);
    expect(state).toEqual({
      ...stateWithUser,
      isLoggedIn: false,
      user: null
    });
  });

  // Тест для состояния fulfilled при успешном обновлении данных пользователя
  it('should handle updateUser.fulfilled', () => {
    const updatedUser = { ...mockUser, name: 'Updated User' };
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: updatedUser }
    };
    const state = userSlice.reducer(
      { ...initialState, user: mockUser },
      action
    );
    expect(state.user).toEqual(updatedUser);
  });
});

describe('userSlice selectors', () => {
  const state: { user: TUserState } = {
    user: {
      isAuthChecked: true,
      isLoggedIn: true,
      user: {
        email: 'test@example.com',
        name: 'Test User'
      },
      loginError: null,
      isLoginRequest: false
    }
  };

  // Тест для селектора selectUser
  it('should return user', () => {
    expect(userSlice.selectors.selectUser(state)).toEqual(state.user.user);
  });

  // Тест для селектора selectIsLoggedIn
  it('should return isLoggedIn', () => {
    expect(userSlice.selectors.selectIsLoggedIn(state)).toEqual(true);
  });

  // Тест для селектора selectLoginError
  it('should return loginError', () => {
    expect(userSlice.selectors.selectLoginError(state)).toEqual(null);
  });

  // Тест для селектора selectIsAuthChecked
  it('should return isAuthChecked', () => {
    expect(userSlice.selectors.selectIsAuthChecked(state)).toEqual(true);
  });

  // Тест для селектора selectIsLoginRequest
  it('should return isLoginRequest', () => {
    expect(userSlice.selectors.selectIsLoginRequest(state)).toEqual(false);
  });
});
