import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { Navigate } from 'react-router-dom';
import {
  loginUser,
  selectIsAuthChecked,
  selectIsLoggedIn
} from '../../services/slices/UserInfoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { TLoginData } from '../../utils/burger-api';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const isAuthenticated = useSelector(selectIsLoggedIn);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const userLoginData: TLoginData = {
      email: email,
      password: password
    };
    dispatch(loginUser(userLoginData));
  };

  if (isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
