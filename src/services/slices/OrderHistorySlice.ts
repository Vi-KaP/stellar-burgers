import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export type TStateOrdersHistory = {
  orders: TOrder[]; // массив заказов
  loading: boolean; // статус загрузки
  error: null | string | undefined;
};

const initialState: TStateOrdersHistory = {
  orders: [],
  loading: false,
  error: null
};

export const ordersHistory = createAsyncThunk(
  'user/fetchOrderHistory',
  getOrdersApi
);

export const ordersHistorySlice = createSlice({
  name: 'userOrdersHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // обр-ка состояния
      .addCase(ordersHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // обр-ка успешного получения данных
      .addCase(ordersHistory.fulfilled, (state, action) => {
        state.orders = action.payload; // сохр. полученные заказы
        state.loading = false;
        state.error = null;
      })
      // обр-ка ошибки получения данных
      .addCase(ordersHistory.rejected, (state, action) => {
        state.error =
          action.error.message || 'Ошибка при получении истории заказов';
        state.loading = false;
      });
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectOrdersError: (state) => state.error,
    selectOrdersLoading: (state) => state.loading
  }
});

export const { selectOrders, selectOrdersError, selectOrdersLoading } =
  ordersHistorySlice.selectors;
