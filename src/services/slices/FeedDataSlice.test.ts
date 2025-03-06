import { TOrder } from '@utils-types';
import { feedDataSlice, TStateFeed } from './FeedDataSlice';
import { getFeedData, getOrderByNum } from './FeedDataSlice';

describe('feedDataSlice', () => {
  const initialState: TStateFeed = {
    orders: [],
    total: 0,
    totalToday: 0,
    error: null,
    loading: false,
    modalOrder: null
  };

  const mockOrder: TOrder = {
    _id: '1',
    status: 'done',
    name: 'Order 1',
    createdAt: '2025-01-01',
    updatedAt: '2025-10-01',
    number: 12345,
    ingredients: ['ingredient1', 'ingredient2']
  };

  // Тест для начального состояния
  it('should handle initial state', () => {
    expect(feedDataSlice.reducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  // Тесты для состояний при запросе getFeedData
  it('should handle getFeedData.pending', () => {
    const action = { type: getFeedData.pending.type };
    const state = feedDataSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('should handle getFeedData.fulfilled', () => {
    const mockPayload = {
      orders: [mockOrder],
      total: 100,
      totalToday: 10
    };
    const action = { type: getFeedData.fulfilled.type, payload: mockPayload };
    const state = feedDataSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: mockPayload.orders,
      total: mockPayload.total,
      totalToday: mockPayload.totalToday,
      loading: false
    });
  });

  it('should handle getFeedData.rejected', () => {
    const action = {
      type: getFeedData.rejected.type,
      error: { message: 'Error message' }
    };
    const state = feedDataSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Error message'
    });
  });

  // Тесты для состояний при запросе getOrderByNum
  it('should handle getOrderByNum.pending', () => {
    const action = { type: getOrderByNum.pending.type };
    const state = feedDataSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('should handle getOrderByNum.fulfilled', () => {
    const mockPayload = {
      orders: [mockOrder]
    };
    const action = { type: getOrderByNum.fulfilled.type, payload: mockPayload };
    const state = feedDataSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      modalOrder: mockPayload.orders[0],
      loading: false
    });
  });

  it('should handle getOrderByNum.rejected', () => {
    const action = {
      type: getOrderByNum.rejected.type,
      error: { message: 'Error message' }
    };
    const state = feedDataSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Error message'
    });
  });
});

describe('feedDataSlice selectors', () => {
  const mockOrder: TOrder = {
    _id: '1',
    status: 'done',
    name: 'Order 1',
    createdAt: '2023-10-01',
    updatedAt: '2023-10-01',
    number: 12345,
    ingredients: ['ingredient1', 'ingredient2']
  };

  const state: { feedData: TStateFeed } = {
    feedData: {
      orders: [mockOrder],
      total: 100,
      totalToday: 10,
      error: null,
      loading: false,
      modalOrder: mockOrder
    }
  };

  // Тесты для селекторов
  it('should return feed orders', () => {
    expect(feedDataSlice.selectors.getFeedOrders(state)).toEqual([mockOrder]);
  });

  it('should return total orders', () => {
    expect(feedDataSlice.selectors.getTotalOrders(state)).toEqual(100);
  });

  it('should return total today orders', () => {
    expect(feedDataSlice.selectors.getTotalToday(state)).toEqual(10);
  });

  it('should return loading state', () => {
    expect(feedDataSlice.selectors.getLoading(state)).toEqual(false);
  });

  it('should return error state', () => {
    expect(feedDataSlice.selectors.getError(state)).toEqual(null);
  });

  it('should return modal order', () => {
    expect(feedDataSlice.selectors.selectModalOrder(state)).toEqual(mockOrder);
  });
});
