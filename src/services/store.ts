import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsSlice from './slices/IngredientsSlice';
import { burgerConstructorSlice } from './slices/BurgerConstructorSlice';
import { userSlice } from './slices/UserInfoSlice';
import { feedDataSlice } from './slices/FeedDataSlice';
import { ordersHistorySlice } from './slices/OrderHistorySlice';

export const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [feedDataSlice.name]: feedDataSlice.reducer,
  [ordersHistorySlice.name]: ordersHistorySlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
