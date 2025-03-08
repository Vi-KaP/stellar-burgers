import { TOrder } from '../../utils/types';
import {
  ordersHistory,
  ordersHistorySlice,
  TStateOrdersHistory
} from './OrderHistorySlice';

describe('ordersHistorySlice', () => {
  const initialState: TStateOrdersHistory = {
    orders: [],
    loading: false,
    error: null
  };

  const mockOrder: TOrder = {
    _id: '1',
    ingredients: ['ingredient1', 'ingredient2'],
    status: 'done',
    name: 'Order 1',
    createdAt: '2025-01-01',
    updatedAt: '2025-10-01',
    number: 1
  };

  // Тест для начального состояния
  it('should handle initial state', () => {
    expect(ordersHistorySlice.reducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  // Тесты для состояний при запросе истории заказов
  it('should handle ordersHistory.pending', () => {
    const action = { type: ordersHistory.pending.type };
    const state = ordersHistorySlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });


  it('should handle ordersHistory.fulfilled', () => {
    const mockPayload = [mockOrder];
    const action = { type: ordersHistory.fulfilled.type, payload: mockPayload };
    const state = ordersHistorySlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      orders: mockPayload
    });
  });


  it('should handle ordersHistory.rejected', () => {
    const action = {
      type: ordersHistory.rejected.type,
      error: { message: 'Error message' }
    };
    const state = ordersHistorySlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Error message'
    });
  });
});

describe('ordersHistorySlice selectors', () => {
  const state: { userOrdersHistory: TStateOrdersHistory } = {
    userOrdersHistory: {
      orders: [
        {
          _id: '1',
          ingredients: ['ingredient1', 'ingredient2'],
          status: 'done',
          name: 'Order 1',
          createdAt: '2025-01-01',
          updatedAt: '2025-10-01',
          number: 1
        }
      ],
      loading: false,
      error: null
    }
  };

  // Тесты для селекторов
  it('should return orders', () => {
    expect(ordersHistorySlice.selectors.selectOrders(state)).toEqual(
      state.userOrdersHistory.orders
    );
  });

  it('should return error', () => {
    expect(ordersHistorySlice.selectors.selectOrdersError(state)).toEqual(null);
  });

  it('should return loading status', () => {
    expect(ordersHistorySlice.selectors.selectOrdersLoading(state)).toEqual(
      false
    );
  });
});
