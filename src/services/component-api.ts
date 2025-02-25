import { setCookie, deleteCookie } from '../utils/cookie';
import {
  registerUserApi,
  loginUserApi,
  orderBurgerApi,
  getIngredientsApi
} from '../utils/burger-api';
import { TRegisterData } from '../utils/burger-api';

//ingredientSlice
export const requestForIngredients = async () => {
  const response = await getIngredientsApi();
  return response;
};

//userSlice
export const registerNewUser = async ({
  email,
  password,
  name
}: TRegisterData) => {
  const data = await registerUserApi({ email, password, name });
  setCookie('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  return data.user;
};

export const loginExistingUser = async ({
  email,
  password
}: Omit<TRegisterData, 'name'>) => {
  const data = await loginUserApi({ email, password });
  setCookie('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  return data.user;
};

//burgerOrder
export const sendOrderRequest = async (data: string[]) => {
  const response = await orderBurgerApi(data);
  return response;
};
