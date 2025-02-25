import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi } from '../../utils/burger-api';

export type TStateFeed = {
  orders: TOrder[]; // массив заказов
  total: number; // общее кол-во заказов
  totalToday: number; // кол-во заказов за сегодня
  error: null | string;
  loading: boolean;
  modalOrder: TOrder | null; // для отображения в модальном окне
};

const initialState: TStateFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  loading: false,
  modalOrder: null
};

export const getFeedData = createAsyncThunk('feed/data', getFeedsApi);

export const getOrderByNum = createAsyncThunk(
  'feed/getOrder',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response;
    } catch (error) {
      return rejectWithValue('Error feed data');
    }
  }
);

export const feedDataSlice = createSlice({
  name: 'feedData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // обр-ка состояний
    builder
      .addCase(getFeedData.pending, (state) => {
        // состояние загрузки
        state.loading = true;
        state.error = null; // сбрасываем ошибку
      })
      .addCase(getFeedData.fulfilled, (state, action) => {
        // обр-ка успешного получения данных
        state.orders = action.payload.orders; // массив заказов
        state.total = action.payload.total; // общее кол-во заказов
        state.totalToday = action.payload.totalToday; //кол-во з. за сегодня
        state.loading = false; // сброс состояния загрузки
      })
      .addCase(getFeedData.rejected, (state, action) => {
        // обр-ка ошибки при получении данных
        state.loading = false; // сброс состояния загрузки
        state.error = action.error.message || 'Feed error'; // сообщ. об ошибке
      })
      .addCase(getOrderByNum.pending, (state) => {
        // состояние загрузки при запросе заказа
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNum.fulfilled, (state, action) => {
        // обр-ка успешного получения заказа
        state.loading = false;
        state.modalOrder = action.payload.orders[0];
      })
      .addCase(getOrderByNum.rejected, (state, action) => {
        // обр-ка ошибки при получении заказа
        state.loading = false;
        state.error = action.error.message || 'Feed error';
      });
  },
  selectors: {
    getFeedOrders: (state) => state.orders,
    getTotalOrders: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
    selectModalOrder: (state) => state.modalOrder
  }
});

export const {
  getFeedOrders,
  getTotalOrders,
  getTotalToday,
  getLoading,
  getError
} = feedDataSlice.selectors;
